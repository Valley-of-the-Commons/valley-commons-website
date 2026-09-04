-- Keynote live-quiz schema. Runs in a SEPARATE, isolated Supabase project (not
-- the site's payments/admin Postgres), so the quiz never shares a database with
-- sensitive data. Idempotent: safe to run more than once.
--
-- Rooms are independent by a `slug` column on every table (one slug per talk,
-- e.g. 'w2-d3'). Browsers read state + live aggregates in realtime with the anon
-- key (RLS-restricted); every scoring/state write goes through the Express
-- /api/keynote/* handlers using the service key, which bypasses RLS.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_state (
  slug                text primary key,
  phase               text not null default 'idle'
                        check (phase in ('idle','lobby','question','reveal','leaderboard','ended')),
  current_index       int  not null default 0,
  question_started_at timestamptz,
  -- Correct option for the current item, published ONLY when the host reveals a
  -- quiz item (null otherwise / for polls). Never ship the answer key to clients;
  -- this is set by the host `reveal` action at the moment the window closes.
  revealed_answer     int,
  updated_at          timestamptz not null default now()
);

create table if not exists public.quiz_players (
  id        uuid primary key default gen_random_uuid(),
  slug      text not null,
  nickname  text not null,
  score     int  not null default 0,
  joined_at timestamptz not null default now()
);

create table if not exists public.quiz_answers (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null,
  player_id      uuid not null references public.quiz_players(id) on delete cascade,
  question_index int  not null,
  choice         int  not null,
  is_correct     boolean,            -- null for polls
  points         int  not null default 0,
  answered_at    timestamptz not null default now(),
  unique (player_id, question_index)
);

create table if not exists public.quiz_sessions (
  id       uuid primary key default gen_random_uuid(),
  slug     text not null,
  results  jsonb not null,           -- { standings:[{nickname,score}], aggregates:number[][], playerCount }
  ended_at timestamptz not null default now()
);

create index if not exists quiz_players_slug_idx on public.quiz_players(slug);
create index if not exists quiz_answers_slug_idx on public.quiz_answers(slug);
create index if not exists quiz_sessions_slug_idx on public.quiz_sessions(slug);

-- ---------------------------------------------------------------------------
-- Realtime: clients subscribe to quiz_state (phase machine) and to
-- quiz_players / quiz_answers (live counts + poll aggregates).
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.quiz_state;
alter publication supabase_realtime add table public.quiz_players;
alter publication supabase_realtime add table public.quiz_answers;

-- ---------------------------------------------------------------------------
-- Row Level Security. Realtime delivery respects RLS, so anon needs SELECT.
-- The ONLY anon write is joining as a player; everything else is server-only
-- (the service key bypasses RLS).
-- ---------------------------------------------------------------------------
alter table public.quiz_state   enable row level security;
alter table public.quiz_players enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.quiz_sessions enable row level security;

drop policy if exists "anon read state"    on public.quiz_state;
drop policy if exists "anon read players"  on public.quiz_players;
drop policy if exists "anon read answers"  on public.quiz_answers;
drop policy if exists "anon read sessions" on public.quiz_sessions;
drop policy if exists "anon join"          on public.quiz_players;

create policy "anon read state"    on public.quiz_state   for select using (true);
create policy "anon read players"  on public.quiz_players for select using (true);
create policy "anon read answers"  on public.quiz_answers for select using (true);
create policy "anon read sessions" on public.quiz_sessions for select using (true);
-- Anon may create a player row to join a room, and nothing else. Score updates,
-- answers, state changes and archives all go through the server (service key).
create policy "anon join" on public.quiz_players for insert with check (true);

-- ---------------------------------------------------------------------------
-- Seed one state row per talk that has a live session (Week 2 + evergreen).
-- Week 1 pages are companion-only (no items), so they need no row. The host
-- `open` action upserts anyway, so a missing row self-heals; this is for a clean
-- first run. Keep in sync with the room registry.
-- ---------------------------------------------------------------------------
insert into public.quiz_state (slug, phase, current_index) values
  ('w2-d1', 'idle', 0),
  ('w2-d2', 'idle', 0),
  ('w2-d3', 'idle', 0),
  ('w2-d4', 'idle', 0),
  ('w2-d5', 'idle', 0),
  ('michel', 'idle', 0),
  ('deca',  'idle', 0)
on conflict (slug) do nothing;

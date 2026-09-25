// The Trust Tournament results page (/trust-tournament). Renders the final state
// of the live game played on 19 September 2026 from one static JSON file. The
// visuals come first; the background text sits in collapsible sections below.

const DATA_URL = '/data/trust-tournament-2026-09-19.json';
const app = document.getElementById('app');

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const average = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

/* ----- Hero ----- */

function heroHtml(d) {
  const winner = d.players[0];
  const banished = d.players.filter((p) => p.status === 'banished').length;
  const stats = [
    [d.players.length, 'players'],
    [d.rounds.length, 'rounds'],
    [banished, 'banished'],
  ];
  return `<header class="tt-hero">
      <span class="eyebrow">Valley of the Commons &middot; ${esc(formatDate(d.playedOn))}</span>
      <h1 class="tt-hero__title">The Trust Tournament</h1>
      <p class="tt-hero__sub">One room, played on phones. Seven rounds of cooperate or defect, from pairs to a shared commons, with the power to banish.</p>
      <div class="tt-hero__row">
        <div class="tt-winner">
          <span class="tt-winner__cap">Winner</span>
          <span class="tt-winner__name">${esc(winner.nickname)}</span>
          <span class="tt-winner__score">${winner.score} points</span>
        </div>
        <ul class="tt-stats">${stats
          .map(([n, label]) => `<li><span class="tt-stats__n">${n}</span><span class="tt-stats__l">${label}</span></li>`)
          .join('')}</ul>
      </div>
    </header>`;
}

/* ----- The ring: each player's final score as distance from the centre ----- */

const RING = { size: 640, inner: 74, outer: 262 };

function ringHtml(d) {
  const { lowest, highest, everyoneDefects, everyoneCooperates } = d.reference;
  const c = RING.size / 2;
  const radius = (score) => RING.inner + ((score - lowest) / (highest - lowest)) * (RING.outer - RING.inner);
  const byName = new Map(d.players.map((p) => [p.nickname, p]));
  const winner = d.players[0].nickname;
  const n = d.ringOrder.length;

  const guides = [
    // The inner two rings are named in the legend; only the number sits on the ring.
    { score: everyoneDefects, label: '', cls: 'defect' },
    { score: everyoneCooperates, label: '', cls: 'coop' },
    { score: highest, label: 'highest possible', cls: 'outer' },
  ]
    .map((g) => {
      const r = radius(g.score);
      return `<circle class="tt-guide tt-guide--${g.cls}" cx="${c}" cy="${c}" r="${r}" />
        <text class="tt-guide__label tt-guide__label--${g.cls}" x="${c}" y="${c - r - 6}" text-anchor="middle">${g.score}${g.label ? ` &middot; ${g.label}` : ''}</text>`;
    })
    .join('');

  const players = d.ringOrder
    .map((name, i) => {
      const p = byName.get(name);
      // Offset by half a step so the top of the ring stays clear for the guide labels.
      const angle = -Math.PI / 2 + ((i + 0.5) / n) * Math.PI * 2;
      const r = radius(p.score);
      const x = c + Math.cos(angle) * r;
      const y = c + Math.sin(angle) * r;
      const x0 = c + Math.cos(angle) * RING.inner;
      const y0 = c + Math.sin(angle) * RING.inner;
      const lr = RING.outer + 30;
      const lx = c + Math.cos(angle) * lr;
      const ly = c + Math.sin(angle) * lr;
      const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
      const out = p.status === 'banished';
      const cls = ['tt-p', out ? 'is-out' : '', name === winner ? 'is-winner' : ''].join(' ');
      const mark = out
        ? `<path class="tt-p__x" d="M${x - 4} ${y - 4}L${x + 4} ${y + 4}M${x + 4} ${y - 4}L${x - 4} ${y + 4}" />`
        : '';
      return `<g class="${cls}" style="--i:${i}">
          <line class="tt-p__spoke" x1="${x0}" y1="${y0}" x2="${x}" y2="${y}" />
          <circle class="tt-p__dot" cx="${x}" cy="${y}" r="${name === winner ? 11 : 8}" />
          ${mark}
          <text class="tt-p__name" x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle">${esc(name)}<tspan class="tt-p__score" dx="6">${p.score}</tspan></text>
        </g>`;
    })
    .join('');

  const avg = average(d.players.map((p) => p.score));
  return `<section class="tt-block tt-ringwrap" aria-labelledby="tt-ring-h">
      <div class="tt-block__head">
        <p class="tt-kicker">The room at the end</p>
        <h2 class="tt-h" id="tt-ring-h">Every player, placed by final score</h2>
        <p class="tt-note">The further from the centre, the more points. The green ring is where a player lands if the whole room cooperates every round; the inner ring is where they land if everyone defects. Players sit in the same order they had around the projector's circle.</p>
      </div>
      <figure class="tt-ring">
        <svg viewBox="-70 -20 ${RING.size + 140} ${RING.size + 40}" role="img" aria-label="Radial chart of the 13 final scores, between 19 and 27 points, clustered around the everyone-cooperates ring at 24">
          ${guides}
          <circle class="tt-core" cx="${c}" cy="${c}" r="${RING.inner - 12}" />
          <text class="tt-core__n" x="${c}" y="${c + 4}" text-anchor="middle">${avg.toFixed(1)}</text>
          <text class="tt-core__l" x="${c}" y="${c + 26}" text-anchor="middle">average</text>
          ${players}
        </svg>
        <figcaption class="tt-legend">
          <span><i class="tt-key tt-key--coop"></i>everyone cooperates (${everyoneCooperates})</span>
          <span><i class="tt-key tt-key--defect"></i>everyone defects (${everyoneDefects})</span>
          <span><i class="tt-key tt-key--out"></i>banished</span>
        </figcaption>
      </figure>
    </section>`;
}

/* ----- Standings, with the everyone-cooperates line on every bar ----- */

function standingsHtml(d) {
  const { highest, everyoneCooperates } = d.reference;
  const pct = (v) => `${(v / highest) * 100}%`;
  const rows = d.players
    .map(
      (p) => `<li class="tt-row${p.status === 'banished' ? ' is-out' : ''}${p.rank === 1 ? ' is-winner' : ''}">
          <span class="tt-row__rank">${p.rank}</span>
          <span class="tt-row__name">${esc(p.nickname)}${p.status === 'banished' ? '<span class="tt-row__tag">banished</span>' : ''}</span>
          <span class="tt-row__bar"><span class="tt-row__fill" style="--w:${pct(p.score)}"></span><span class="tt-row__ref" style="left:${pct(everyoneCooperates)}"></span></span>
          <span class="tt-row__score">${p.score}</span>
        </li>`
    )
    .join('');
  return `<section class="tt-block" aria-labelledby="tt-stand-h">
      <div class="tt-block__head">
        <p class="tt-kicker">Final standings</p>
        <h2 class="tt-h" id="tt-stand-h">From 27 to 19 points</h2>
        <p class="tt-note">Bars run from 0 to ${highest}, the most one player could score. The mark on each bar is ${everyoneCooperates}, the everyone-cooperates total. Banished players kept the points they had when they left.</p>
      </div>
      <ol class="tt-rows">${rows}</ol>
    </section>`;
}

/* ----- The purpose: three stages, each adding one incentive ----- */

// The game's argument. Each stage adds one incentive to the same dilemma and
// moves the rational play: first plays are private, then everyone can see who
// defected, then the room can banish. Round numbers index into d.rounds.
const STAGES = [
  {
    name: 'In the dark',
    rounds: [1, 2, 3],
    incentive: 'Plays are private',
    body: 'Whatever your partner does, defecting pays you more (5 instead of 3, or 1 instead of 0). With nobody watching, the rational play for each person is to defect, and if both do, both lose. What pulls the other way is conscience and the minute of conversation.',
  },
  {
    name: 'In the light',
    rounds: [4],
    incentive: 'Everyone sees who defected',
    body: 'Groups become a commons and every play goes up on the projector. Defecting still pays you 1 point more this round, but now the whole room knows, including the people you will be grouped with next. Reputation turns cooperation into the better long-run play.',
  },
  {
    name: 'With consequences',
    rounds: [5, 6, 7],
    incentive: 'The room can banish',
    body: 'After each hand the room can vote a player out, and a banished player scores nothing more. In rounds 5 and 6 a defection can cost you every remaining round, so cooperating becomes self-enforcing. In round 7 the vote comes after the last hand: it costs no points, only your standing, and the ballot is open.',
  },
];

function roundCardHtml(r) {
  const dots = Array.from({ length: r.groupSize }, () => '<i></i>').join('');
  const game = r.game === 'pair' ? 'Pairs' : `Commons of ${r.groupSize}`;
  const tags = [
    `<span class="tt-tag tt-tag--${r.plays}">${r.plays === 'blind' ? 'Plays private' : 'Plays on screen'}</span>`,
    r.banishment ? `<span class="tt-tag tt-tag--banish">Banish vote, ${r.banishment === 'open' ? 'open' : 'secret'} ballot</span>` : '',
  ].join('');
  return `<li class="tt-round tt-round--${r.game}">
      <span class="tt-round__n">Round ${r.round}</span>
      <span class="tt-round__dots" aria-hidden="true">${dots}</span>
      <span class="tt-round__game">${game}</span>
      <span class="tt-round__tags">${tags}</span>
    </li>`;
}

function stagesHtml(d) {
  const { everyoneCooperates, everyoneDefects } = d.reference;
  const avg = average(d.players.map((p) => p.score));
  const stages = STAGES.map(
    (st, i) => `<li class="tt-stage" style="--span:${st.rounds.length}">
        <div class="tt-stage__head">
          <span class="tt-stage__n">Stage ${i + 1}</span>
          <h3 class="tt-stage__name">${st.name}</h3>
          <span class="tt-stage__inc">+ ${st.incentive}</span>
        </div>
        <ol class="tt-stage__rounds">${st.rounds.map((n) => roundCardHtml(d.rounds[n - 1])).join('')}</ol>
        <p class="tt-stage__body">${st.body}</p>
      </li>`
  ).join('');
  return `<section class="tt-block" aria-labelledby="tt-stages-h">
      <div class="tt-block__head tt-block__head--wide">
        <p class="tt-kicker">Why we played it</p>
        <h2 class="tt-h" id="tt-stages-h">Change the incentives, change the equilibrium</h2>
        <p class="tt-note">The game keeps the same temptation to defect from start to finish and adds one incentive at a time: first visibility, so everyone can see who is defecting, then the power to banish. In game theory, the equilibrium is the play nobody gains from changing on their own. Each stage is designed to move it from "everyone defects" towards "everyone cooperates".</p>
      </div>
      <ol class="tt-stages">${stages}</ol>
      <p class="tt-caveat">What the night's data can and cannot show: only the final scores survive, not the plays round by round, so the page cannot show when the room shifted. The final scores average ${avg.toFixed(1)}, close to the ${everyoneCooperates} a player earns if everyone always cooperates and far from the ${everyoneDefects} if everyone always defects: a room that mostly cooperated.</p>
    </section>`;
}

/* ----- The two games: the pair matrix and a live commons calculator ----- */

function gamesHtml(d) {
  const m = d.scoring.pair;
  const cell = (you, them) => `<td class="tt-cell tt-cell--${you}${them}"><b>${m[you + them]}</b><span>for you</span></td>`;
  return `<section class="tt-block" aria-labelledby="tt-games-h">
      <div class="tt-block__head">
        <p class="tt-kicker">The rules of the game</p>
        <h2 class="tt-h" id="tt-games-h">Two games, one temptation</h2>
      </div>
      <div class="tt-games">
        <div class="tt-game">
          <h3 class="tt-game__h">Rounds 1 to 3: the prisoner's dilemma</h3>
          <table class="tt-matrix">
            <thead><tr><th></th><th>They cooperate</th><th>They defect</th></tr></thead>
            <tbody>
              <tr><th>You cooperate</th>${cell('C', 'C')}${cell('C', 'D')}</tr>
              <tr><th>You defect</th>${cell('D', 'C')}${cell('D', 'D')}</tr>
            </tbody>
          </table>
          <p class="tt-game__p">Whatever your partner does, defecting pays you more. If both of you reason that way, you each get 1 instead of 3.</p>
        </div>
        <div class="tt-game" id="tt-commons">
          <h3 class="tt-game__h">Rounds 4 to 7: the commons</h3>
          <div class="tt-calc">
            <label>Group size <output data-out="n"></output>
              <input type="range" data-in="n" min="3" max="5" step="1" value="5" />
            </label>
            <label>Cooperators <output data-out="k"></output>
              <input type="range" data-in="k" min="0" max="5" step="1" value="4" />
            </label>
            <div class="tt-calc__group" data-group aria-hidden="true"></div>
            <p class="tt-calc__res" data-res aria-live="polite"></p>
          </div>
          <p class="tt-game__p">Each cooperator adds ${d.scoring.commons.perCooperatorToEveryone} point for every member of the group. A defector adds nothing and keeps a bonus of ${d.scoring.commons.defectorBonus}. Switching to defect gains you 1 point and costs everyone else in your group 1.</p>
        </div>
      </div>
    </section>`;
}

function wireCommons(d) {
  const root = document.getElementById('tt-commons');
  const nIn = root.querySelector('[data-in="n"]');
  const kIn = root.querySelector('[data-in="k"]');
  const { perCooperatorToEveryone: per, defectorBonus: bonus } = d.scoring.commons;
  const update = () => {
    const n = Number(nIn.value);
    kIn.max = String(n);
    const k = Math.min(Number(kIn.value), n);
    kIn.value = String(k);
    root.querySelector('[data-out="n"]').textContent = n;
    root.querySelector('[data-out="k"]').textContent = k;
    root.querySelector('[data-group]').innerHTML = Array.from(
      { length: n },
      (_, i) => `<i class="${i < k ? 'is-c' : 'is-d'}">${i < k ? 'C' : 'D'}</i>`
    ).join('');
    const coop = per * k;
    const parts = [];
    if (k > 0) parts.push(`each cooperator earns <b>${coop}</b>`);
    if (k < n) parts.push(`each defector earns <b>${coop + bonus}</b>`);
    const sentence = parts.join(', ');
    root.querySelector('[data-res]').innerHTML = `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}. The group makes <b>${coop * n + bonus * (n - k)}</b> in total.`;
  };
  nIn.addEventListener('input', update);
  kIn.addEventListener('input', update);
  update();
}

/* ----- Background: collapsible text, adapted from Agentic Axelrod ----- */

const HISTORY = [
  ['1968', 'Garrett Hardin publishes "The Tragedy of the Commons": shared resources, he argues, are overused by individuals acting in their own interest.', 'https://doi.org/10.1126/science.162.3859.1243'],
  ['1980', "Robert Axelrod's first computer tournament of the iterated prisoner's dilemma: 14 entries. Tit for Tat, submitted by Anatol Rapoport, wins.", 'https://doi.org/10.1177/002200278002400101'],
  ['1980', 'Axelrod\'s second tournament: 62 entries. Tit for Tat wins again.', 'https://doi.org/10.1177/002200278002400301'],
  ['1984', 'Axelrod publishes The Evolution of Cooperation.', 'https://en.wikipedia.org/wiki/The_Evolution_of_Cooperation'],
  ['1987', 'Axelrod uses genetic algorithms to evolve strategies. Boyd and Lorberbaum prove that no pure strategy is evolutionarily stable in the repeated game.', 'https://doi.org/10.1038/327058a0'],
  ['1990', 'Elinor Ostrom publishes Governing the Commons: communities can manage shared resources themselves, with rules they make, monitoring, and graduated sanctions.', null],
  ['1993', 'Nowak and Sigmund show that Win-Stay, Lose-Shift (Pavlov) outperforms Tit for Tat when moves are noisy.', 'https://doi.org/10.1038/364056a0'],
  ['2000', 'Fehr and Gächter find that in public goods games cooperation decays, but holds up when players can punish free riders.', 'https://doi.org/10.1257/aer.90.4.980'],
  ['2004', "A team from the University of Southampton wins the 20th-anniversary tournament with strategies that recognise and collude with each other.", null],
  ['2009', 'Ostrom receives the Nobel Memorial Prize in Economic Sciences for her analysis of economic governance, especially the commons.', 'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/facts/'],
  ['2012', 'Press and Dyson discover zero-determinant strategies, which can unilaterally set the relationship between their own score and their opponent\'s.', 'https://doi.org/10.1073/pnas.1206569109'],
  ['2017', 'Nicky Case releases The Evolution of Trust, an interactive guide to the repeated prisoner\'s dilemma, and the direct inspiration for this game.', 'https://ncase.me/trust/'],
  ['2024', 'Glynatsi, Knight and Harper analyse 195 strategies across 45,686 tournaments. No single strategy wins everywhere; winners are nice, provocable, generous, a little envious, and adapt to their environment.', 'https://doi.org/10.1371/journal.pcbi.1012644'],
  ['2026', 'Thirteen people play the Trust Tournament in one room, on 19 September.', null],
];

const VIDEOS = [
  ['fpg2Zza_u3Q', 'Game Theory of Our Shared Purpose', 'Deca, Valley of the Commons keynote. The talk this game was built for.'],
  ['mScpHTIi-kM', 'This game theory problem will change the way you see the world', 'Veritasium, on the prisoner\'s dilemma and Axelrod\'s tournaments.'],
  ['YNMkADpvO4w', 'Simulating the Evolution of Aggression', 'Primer, on hawks, doves and evolutionary stability.'],
];

function aboutHtml(d) {
  const t = d.timing;
  const sections = [
    [
      'What is this?',
      `<p>A live game of trust, played by thirteen people in one room on ${esc(formatDate(d.playedOn))}. Everyone joined on their phone. Each round, players were grouped with others and chose, in secret, to cooperate or defect. It follows the tradition of Robert Axelrod's iterated prisoner's dilemma tournaments, with two differences: the players are people, not programs, and the game grows from pairs into a shared commons. Its purpose was to show, live, how adding incentives (visibility of who defects, then the power to banish) shifts where a game settles.</p>`,
    ],
    [
      'The research question.',
      `<p>Axelrod showed that cooperation can emerge between self-interested players when they meet again and again. This game asks what happens to a room of real people when the rules around the same dilemma change. Rounds 1 to 3 are private. From round 4, every play is visible, so everyone can see who defected. From round 5, the room can banish. Does each added incentive move the room from defection towards cooperation, as game theory predicts? And unlike Axelrod's programs, these players talk face to face before every decision: does talking build trust, or give cover for defection?</p>`,
    ],
    [
      'How does it work?',
      `<p>Each round has phases:</p>
       <ol class="tt-steps">
         <li><b>Talk</b> (${t.talkSeconds} seconds): the people grouped together this round stand together and talk.</li>
         <li><b>Decide</b> (${t.decideSeconds} seconds): each player taps Cooperate or Defect in secret. No choice in time counts as Defect.</li>
         <li><b>Reveal</b>: payoffs are scored. In rounds 1 to 3 only your partner sees your play; from round 4 every play goes up on the projector.</li>
         <li><b>Banish</b> (rounds 5 to 7): each player may vote to banish one person. If someone reaches a majority of the players still in the game, the room gets ${t.reprieveSeconds} seconds to talk it over and change their votes. Anyone still at a majority when time runs out is banished. The round 7 ballot is open.</li>
       </ol>`,
    ],
    [
      'The history.',
      `<ol class="tt-history">${HISTORY.map(
        ([year, text, url]) =>
          `<li><span class="tt-history__y">${year}</span><span>${esc(text)}${url ? ` <a href="${esc(url)}" target="_blank" rel="noopener noreferrer">Source &#8599;</a>` : ''}</span></li>`
      ).join('')}</ol>`,
    ],
    [
      'Popular videos.',
      `<div class="tt-videos">${VIDEOS.map(
        ([id, title, sub]) =>
          `<a class="tt-video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">
            <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" />
            <span class="tt-video__t">${esc(title)}</span>
            <span class="tt-video__s">${esc(sub)}</span>
          </a>`
      ).join('')}</div>`,
    ],
  ];
  return `<section class="tt-about" aria-label="About the game">
      ${sections
        .map(([h, body]) => `<details class="tt-acc"><summary>${h}</summary><div class="tt-acc__body">${body}</div></details>`)
        .join('')}
    </section>`;
}

function sourceHtml(d) {
  return `<p class="tt-source">${esc(d.source)}</p>
    <a class="cta" href="/keynotes">All the talks</a>`;
}

/* ----- Boot ----- */

async function main() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    app.insertAdjacentHTML(
      'beforeend',
      heroHtml(d) + ringHtml(d) + stagesHtml(d) + standingsHtml(d) + gamesHtml(d) + aboutHtml(d) + sourceHtml(d)
    );
    wireCommons(d);
    // Only one background section open at a time.
    const accs = [...app.querySelectorAll('.tt-acc')];
    accs.forEach((a) =>
      a.addEventListener('toggle', () => {
        if (a.open) accs.forEach((o) => o !== a && (o.open = false));
      })
    );
    // Force a style flush so the reveal transitions run, without waiting on a
    // frame (a background tab never paints one and would stay blank).
    void app.offsetHeight;
    app.classList.add('is-in');
  } catch (err) {
    console.error('trust tournament data failed', err);
    app.insertAdjacentHTML('beforeend', '<p class="tt-note">The results could not load. Please try again.</p>');
  }
}

main();

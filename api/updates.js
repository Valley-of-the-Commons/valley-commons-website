const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
});

const { isAdmin } = require('./admin-auth');

function slugify(input) {
  return String(input)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
}

async function ensureUniqueSlug(base, ignoreId = null) {
  let slug = base || 'update';
  let n = 1;
  while (true) {
    const params = ignoreId ? [slug, ignoreId] : [slug];
    const where = ignoreId ? 'slug = $1 AND id <> $2' : 'slug = $1';
    const r = await pool.query(`SELECT 1 FROM updates WHERE ${where} LIMIT 1`, params);
    if (r.rowCount === 0) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

module.exports = async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const path = url.pathname;

    // Match /api/updates, /api/updates/:slugOrId
    const adminRequest = isAdmin(req);

    // GET list or single
    if (req.method === 'GET') {
      // /api/updates/:slugOrId
      const m = path.match(/^\/api\/updates\/([^/]+)\/?$/);
      if (m) {
        const key = decodeURIComponent(m[1]);
        const isUuid = /^[0-9a-f-]{36}$/i.test(key);
        const where = isUuid ? 'id = $1' : 'slug = $1';
        const r = await pool.query(`SELECT * FROM updates WHERE ${where} LIMIT 1`, [key]);
        if (r.rowCount === 0) return res.status(404).json({ error: 'Not found' });
        const post = r.rows[0];
        if (!post.published && !adminRequest) {
          return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json({ update: post });
      }

      // List
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
      const offset = parseInt(url.searchParams.get('offset') || '0', 10);
      const includeDrafts = url.searchParams.get('drafts') === '1' && adminRequest;

      const where = includeDrafts ? '' : 'WHERE published = TRUE';
      const order = includeDrafts
        ? 'ORDER BY COALESCE(published_at, created_at) DESC'
        : 'ORDER BY published_at DESC';

      const rows = await pool.query(
        `SELECT id, slug, title, summary, cover_image_url, author, published, published_at, created_at, updated_at
         FROM updates ${where} ${order} LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      const count = await pool.query(`SELECT COUNT(*) FROM updates ${where}`);
      return res.status(200).json({
        updates: rows.rows,
        total: parseInt(count.rows[0].count, 10),
        limit,
        offset
      });
    }

    // Mutations require admin
    if (!adminRequest) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { title, summary, body_md, cover_image_url, author, published, slug } = req.body || {};
      if (!title || !body_md) {
        return res.status(400).json({ error: 'title and body_md are required' });
      }
      const baseSlug = slugify(slug || title);
      const finalSlug = await ensureUniqueSlug(baseSlug);
      const publishedBool = !!published;
      const publishedAt = publishedBool ? new Date() : null;

      const r = await pool.query(
        `INSERT INTO updates (slug, title, summary, body_md, cover_image_url, author, published, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [finalSlug, title, summary || null, body_md, cover_image_url || null, author || null, publishedBool, publishedAt]
      );
      return res.status(201).json({ update: r.rows[0] });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const m = path.match(/^\/api\/updates\/([^/]+)\/?$/);
      if (!m) return res.status(400).json({ error: 'Missing id/slug in path' });
      const key = decodeURIComponent(m[1]);
      const isUuid = /^[0-9a-f-]{36}$/i.test(key);
      const lookup = await pool.query(
        `SELECT * FROM updates WHERE ${isUuid ? 'id' : 'slug'} = $1 LIMIT 1`,
        [key]
      );
      if (lookup.rowCount === 0) return res.status(404).json({ error: 'Not found' });
      const existing = lookup.rows[0];

      const { title, summary, body_md, cover_image_url, author, published, slug } = req.body || {};

      let nextSlug = existing.slug;
      if (slug && slug !== existing.slug) {
        nextSlug = await ensureUniqueSlug(slugify(slug), existing.id);
      }

      const willPublish = typeof published === 'boolean' ? published : existing.published;
      let publishedAt = existing.published_at;
      if (willPublish && !existing.published) publishedAt = new Date();
      if (!willPublish) publishedAt = null;

      const r = await pool.query(
        `UPDATE updates SET
           slug = $1,
           title = COALESCE($2, title),
           summary = $3,
           body_md = COALESCE($4, body_md),
           cover_image_url = $5,
           author = $6,
           published = $7,
           published_at = $8,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $9 RETURNING *`,
        [
          nextSlug,
          title ?? null,
          summary ?? existing.summary,
          body_md ?? null,
          cover_image_url ?? existing.cover_image_url,
          author ?? existing.author,
          willPublish,
          publishedAt,
          existing.id
        ]
      );
      return res.status(200).json({ update: r.rows[0] });
    }

    if (req.method === 'DELETE') {
      const m = path.match(/^\/api\/updates\/([^/]+)\/?$/);
      if (!m) return res.status(400).json({ error: 'Missing id/slug in path' });
      const key = decodeURIComponent(m[1]);
      const isUuid = /^[0-9a-f-]{36}$/i.test(key);
      const r = await pool.query(
        `DELETE FROM updates WHERE ${isUuid ? 'id' : 'slug'} = $1 RETURNING id`,
        [key]
      );
      if (r.rowCount === 0) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Updates API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

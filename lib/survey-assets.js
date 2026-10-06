// Cache busting for the survey pages. Cloudflare tells browsers to keep .js and
// .css for 4 hours, so after a deploy returning visitors would run old code
// against new pages. Each survey page is served with its stylesheet and every
// survey module addressed as ?v=<version>; an import map makes the modules'
// relative imports (./api.js) resolve to the same versioned URLs.

/** Rewrites one survey page's HTML so every survey asset carries ?v=version. */
function versionSurveyHtml(html, moduleNames, version) {
  const v = encodeURIComponent(version);
  const imports = Object.fromEntries(moduleNames.map((name) => [`/survey/${name}`, `/survey/${name}?v=${v}`]));
  const importMap = `<script type="importmap">${JSON.stringify({ imports })}</script>\n  `;
  return html
    .replace(/href="(\/home\.css|\/survey\/survey\.css)"/g, `href="$1?v=${v}"`)
    .replace(/<script type="module" src="(\/survey\/[\w-]+\.js)"><\/script>/, `${importMap}<script type="module" src="$1?v=${v}"></script>`);
}

module.exports = { versionSurveyHtml };

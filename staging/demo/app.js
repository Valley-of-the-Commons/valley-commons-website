// Valley of the Commons — responsive demo interactions
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  // Scrim for mobile drawer
  var scrim = document.createElement('div');
  scrim.className = 'nav-scrim';
  document.body.appendChild(scrim);

  function closeNav() {
    nav.classList.remove('open');
    scrim.classList.remove('show');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    nav.classList.add('open');
    scrim.classList.add('show');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function () {
    nav.classList.contains('open') ? closeNav() : openNav();
  });
  scrim.addEventListener('click', closeNav);
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeNav();
  });

  // Header shadow on scroll
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Newsletter — wired to the live VotC Listmonk list.
  // The production /api/newsletter handler sends Access-Control-Allow-Origin: *,
  // so this cross-origin POST from the staging origin works.
  var NEWSLETTER_ENDPOINT = 'https://valleyofthecommons.com/api/newsletter';
  var form = document.getElementById('newsForm');
  var status = document.getElementById('newsStatus');
  var emailEl = document.getElementById('newsEmail');
  if (form) {
    var btn = form.querySelector('button[type="submit"]');
    var setMsg = function (text, ok) {
      status.textContent = text;
      status.style.color = ok ? '#2c3e2d' : '#c4622d';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (emailEl.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMsg('Please enter a valid email address.', false);
        return;
      }
      var label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing…';
      setMsg('', true);
      fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(function (r) {
          return r.json().then(function (d) { return { ok: r.ok, data: d }; });
        })
        .then(function (res) {
          if (res.ok && res.data && res.data.success) {
            setMsg("You're subscribed! We'll keep you updated.", true);
            form.reset();
          } else {
            setMsg((res.data && res.data.error) || 'Something went wrong. Please try again.', false);
          }
        })
        .catch(function () {
          setMsg('Network error. Please try again.', false);
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  }

  // Modules: the bottom "read more" link expands its card (one at a time).
  // The expanded card grows and the others squish — they stay on one row.
  // Clicking elsewhere or pressing Esc collapses it back to normal size.
  var moduleCards = document.querySelectorAll('.module-card');
  function setModule(card, open) {
    card.classList.toggle('is-open', open);
    var btn = card.querySelector('.read-more');
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'read less ‹' : 'read more ›';
    }
  }
  function closeModules(except) {
    Array.prototype.forEach.call(moduleCards, function (c) {
      if (c !== except) setModule(c, false);
    });
  }
  Array.prototype.forEach.call(moduleCards, function (card) {
    var btn = card.querySelector('.read-more');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !card.classList.contains('is-open');
      closeModules(card);
      setModule(card, open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.module-card')) closeModules(null);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModules(null);
  });

  // Map: click the shield to interact; it re-arms when the pointer leaves so
  // scrolling the page over the map never zooms it.
  var mapEmbed = document.getElementById('mapEmbed');
  var mapShield = document.getElementById('mapShield');
  if (mapEmbed && mapShield) {
    var activateMap = function () { mapEmbed.classList.add('is-active'); };
    mapShield.addEventListener('click', activateMap);
    mapShield.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        activateMap();
      }
    });
    mapEmbed.addEventListener('mouseleave', function () {
      mapEmbed.classList.remove('is-active');
    });
  }

  // Collaborators: bios expand on hover (CSS). Click/keyboard also toggles
  // them so touch devices (no hover) can read the bio — mirrors live site.
  var collabCards = document.querySelectorAll('.collab-card');
  Array.prototype.forEach.call(collabCards, function (card) {
    var more = card.querySelector('.collab-more');
    var toggle = function () {
      var open = card.classList.toggle('expanded');
      if (more) more.textContent = open ? 'read less ⌃' : 'read more ⌄';
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggle();
      }
    });
  });
})();

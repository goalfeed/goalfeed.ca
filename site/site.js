/* Goalfeed — vanilla JS, no build step, no dependencies.
   Three independent bits: tab panels (Install), copy-to-clipboard buttons,
   and the "moment" goal-feed demo. Each degrades to a static, honest state
   if JS never runs at all. */

/* ---- tabs (Install section) ---- */
(function () {
  var tabs = document.querySelectorAll('[data-tabs] [role="tab"]');
  if (!tabs.length) return;

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  }

  tabs.forEach(function (tab, idx) {
    tab.addEventListener('click', function () { select(tab); });
    tab.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = tabs[(idx + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      e.preventDefault();
      select(next);
    });
  });

  document.querySelectorAll('[data-tab-link]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var tabId = link.getAttribute('data-tab-link').replace('panel-', 'tab-');
      var tab = document.getElementById(tabId);
      if (tab) select(tab);
    });
  });
})();

/* ---- copy-to-clipboard on code blocks ---- */
(function () {
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;
      var text = target.textContent.trim();
      var done = function () {
        var original = btn.textContent;
        btn.dataset.copied = 'true';
        btn.textContent = 'Copied';
        setTimeout(function () {
          btn.dataset.copied = 'false';
          btn.textContent = original;
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          legacyCopy(text);
          done();
        });
      } else {
        legacyCopy(text);
        done();
      }
    });
  });
})();

/* ---- the moment: simulated goal-feed demo ----
   NHL and MLB only — a score is always worth one point in both, so one score
   change is honestly one event (unlike NFL/CFL, see the callout on the page). */
(function () {
  var feed = document.getElementById('event-feed');
  if (!feed) return;

  var els = {
    awayCode: document.getElementById('away-code'),
    homeCode: document.getElementById('home-code'),
    awayScore: document.getElementById('away-score'),
    homeScore: document.getElementById('home-score'),
    period: document.getElementById('clock-period'),
    clock: document.getElementById('clock-time'),
    away: document.getElementById('team-away'),
    home: document.getElementById('team-home')
  };

  var moments = [
    { away: 'WPG', home: 'TOR', awayScore: 1, homeScore: 3, side: 'home', period: 'P2', clock: '11:05' },
    { away: 'NYY', home: 'BOS', awayScore: 3, homeScore: 4, side: 'home', period: 'T7', clock: '2 outs' },
    { away: 'EDM', home: 'CGY', awayScore: 4, homeScore: 2, side: 'away', period: 'P3', clock: '05:14' },
    { away: 'TOR', home: 'SEA', awayScore: 5, homeScore: 5, side: 'away', period: 'T9', clock: '1 out' }
  ];
  var i = 0;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var m = moments[i % moments.length];
    i++;
    els.awayCode.textContent = m.away;
    els.homeCode.textContent = m.home;
    els.awayScore.textContent = m.awayScore;
    els.homeScore.textContent = m.homeScore;
    els.period.textContent = m.period;
    els.clock.textContent = m.clock;
    els.away.classList.toggle('is-flaring', m.side === 'away');
    els.home.classList.toggle('is-flaring', m.side === 'home');

    var now = new Date();
    var ts = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    var scorer = m.side === 'home' ? m.home : m.away;
    var other = m.side === 'home' ? m.away : m.home;

    var row = document.createElement('li');
    row.className = 'event-row is-goal is-new';
    var ts_el = document.createElement('span');
    ts_el.className = 'ts tabular';
    ts_el.textContent = ts;
    var label = document.createElement('span');
    label.className = 'label';
    label.innerHTML = '<b>GOAL</b> — ' + scorer + ' ' + m.homeScore + '–' + m.awayScore + ' ' + other;
    row.append(ts_el, label);
    feed.insertBefore(row, feed.firstChild);
    while (feed.children.length > 4) feed.removeChild(feed.lastChild);
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // leave the static, server-rendered state alone

  var interval = setInterval(tick, 5500);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) clearInterval(interval);
  });
})();

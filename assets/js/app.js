/* =============================================================================
   Ismaill Eye & General Clinic — app.js
   Vanilla JS. No dependencies. Loaded with `defer`.

   Every feature here is a progressive enhancement. With JavaScript disabled
   the page is fully readable and every action — call, WhatsApp, directions —
   still works, because they are plain links.
   ============================================================================= */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------------------------------------------------------------------------
     1. CLINIC HOURS
     Single source of truth. Replace with the verified schedule.
     0 = Sunday ... 6 = Saturday. Times are 24h local (Asia/Karachi).
     `null` means closed all day.
     --------------------------------------------------------------------------- */
  var HOURS = {
    0: null,                    // Sunday        — PLACEHOLDER
    1: { open: '17:00', close: '21:00' }, // Monday    — PLACEHOLDER
    2: { open: '17:00', close: '21:00' }, // Tuesday   — PLACEHOLDER
    3: { open: '17:00', close: '21:00' }, // Wednesday — PLACEHOLDER
    4: { open: '17:00', close: '21:00' }, // Thursday  — PLACEHOLDER
    5: null,                    // Friday        — PLACEHOLDER, must be its own row
    6: { open: '17:00', close: '21:00' }  // Saturday  — PLACEHOLDER
  };

  var CLOSING_SOON_MINUTES = 60;

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function formatTime(hhmm, lang) {
    var m = toMinutes(hhmm);
    var h24 = Math.floor(m / 60);
    var min = m % 60;
    var h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    var suffix = h24 < 12 ? (lang === 'ur' ? 'صبح' : 'AM') : (lang === 'ur' ? 'شام' : 'PM');
    var mm = min === 0 ? '' : ':' + (min < 10 ? '0' + min : min);
    return lang === 'ur' ? (suffix + ' ' + h12 + mm) : (h12 + mm + ' ' + suffix);
  }

  /* Returns { state, closesAt, opensAt, opensTomorrow } */
  function clinicStatus(now) {
    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day];

    if (today) {
      var o = toMinutes(today.open);
      var c = toMinutes(today.close);
      if (mins >= o && mins < c) {
        return {
          state: (c - mins) <= CLOSING_SOON_MINUTES ? 'closing' : 'open',
          closesAt: today.close
        };
      }
      if (mins < o) return { state: 'closed', opensAt: today.open, opensTomorrow: false };
    }
    for (var i = 1; i <= 7; i++) {
      var next = HOURS[(day + i) % 7];
      if (next) return { state: 'closed', opensAt: next.open, opensTomorrow: i === 1, daysAhead: i };
    }
    return { state: 'closed' };
  }

  function renderStatus() {
    var pills = document.querySelectorAll('[data-status-pill]');
    if (!pills.length) return;

    var lang = root.getAttribute('lang') === 'ur' ? 'ur' : 'en';
    var s = clinicStatus(new Date());

    var text;
    if (s.state === 'open') {
      text = lang === 'ur'
        ? 'ابھی کھلا ہے — ' + formatTime(s.closesAt, 'ur') + ' تک'
        : 'Open now — until ' + formatTime(s.closesAt, 'en');
    } else if (s.state === 'closing') {
      text = lang === 'ur'
        ? formatTime(s.closesAt, 'ur') + ' پر بند ہو گا'
        : 'Closing at ' + formatTime(s.closesAt, 'en');
    } else if (s.opensAt && s.opensTomorrow) {
      text = lang === 'ur'
        ? 'آج بند ہے — کل ' + formatTime(s.opensAt, 'ur') + ' پر کھلے گا'
        : 'Closed today — opens tomorrow ' + formatTime(s.opensAt, 'en');
    } else if (s.opensAt) {
      text = lang === 'ur'
        ? 'ابھی بند ہے — ' + formatTime(s.opensAt, 'ur') + ' پر کھلے گا'
        : 'Closed — opens ' + formatTime(s.opensAt, 'en');
    } else {
      text = lang === 'ur' ? 'اوقات دیکھیں' : 'See opening hours';
    }

    Array.prototype.forEach.call(pills, function (pill) {
      pill.setAttribute('data-state', s.state);
      var label = pill.querySelector('[data-status-text]');
      if (label) label.textContent = text;
    });

    /* Status-aware CTA labels. Honest expectation-setting prevents the
       frustration of an unanswered call, which is the worst first impression
       available to us. */
    var closed = s.state === 'closed';
    Array.prototype.forEach.call(document.querySelectorAll('[data-cta-call]'), function (el) {
      var open = el.getAttribute('data-label-open');
      var shut = el.getAttribute('data-label-closed');
      if (open && shut) el.textContent = closed ? shut : open;
    });

    /* Today's row in the hours table */
    var todayIndex = new Date().getDay();
    Array.prototype.forEach.call(document.querySelectorAll('[data-day]'), function (row) {
      var days = row.getAttribute('data-day').split(',');
      row.setAttribute('data-today', days.indexOf(String(todayIndex)) !== -1 ? 'true' : 'false');
    });
  }

  /* ---------------------------------------------------------------------------
     2. ACUITY SCALE — text size control
     The signature element and a genuine accessibility feature.
     Persisted, because someone who needs 150% needs it on every visit.
     --------------------------------------------------------------------------- */
  var TEXT_KEY = 'iec-textsize';
  var CONTRAST_KEY = 'iec-contrast';

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function recall(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function applyTextSize(size) {
    root.setAttribute('data-textsize', size);
    Array.prototype.forEach.call(document.querySelectorAll('[data-textsize-btn]'), function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-textsize-btn') === size ? 'true' : 'false');
    });
  }

  function initTextSize() {
    var saved = recall(TEXT_KEY) || '100';
    applyTextSize(saved);
    Array.prototype.forEach.call(document.querySelectorAll('[data-textsize-btn]'), function (btn) {
      btn.addEventListener('click', function () {
        var size = btn.getAttribute('data-textsize-btn');
        applyTextSize(size);
        store(TEXT_KEY, size);
      });
    });
  }

  function initContrast() {
    var saved = recall(CONTRAST_KEY);
    if (saved === 'high') root.setAttribute('data-contrast', 'high');
    Array.prototype.forEach.call(document.querySelectorAll('[data-contrast-toggle]'), function (btn) {
      function sync() {
        var on = root.getAttribute('data-contrast') === 'high';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      sync();
      btn.addEventListener('click', function () {
        var on = root.getAttribute('data-contrast') === 'high';
        if (on) { root.removeAttribute('data-contrast'); store(CONTRAST_KEY, 'normal'); }
        else { root.setAttribute('data-contrast', 'high'); store(CONTRAST_KEY, 'high'); }
        sync();
      });
    });
  }

  /* ---------------------------------------------------------------------------
     3. MENU SHEET
     Full screen, not a drawer — a drawer cannot hold 150% text without
     horizontal scroll. Android back button closes it.
     --------------------------------------------------------------------------- */
  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var sheet = document.getElementById('menu-sheet');
    if (!toggle || !sheet) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      sheet.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = sheet.querySelector('button, a');
      if (first) first.focus();
      if (window.history && window.history.pushState) {
        window.history.pushState({ menu: true }, '');
      }
    }
    function close(fromPop) {
      sheet.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
      if (!fromPop && window.history.state && window.history.state.menu) {
        window.history.back();
      }
    }

    toggle.addEventListener('click', function () {
      sheet.hidden ? open() : close();
    });
    Array.prototype.forEach.call(sheet.querySelectorAll('[data-menu-close]'), function (btn) {
      btn.addEventListener('click', function () { close(); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !sheet.hidden) close();
    });
    window.addEventListener('popstate', function () {
      if (!sheet.hidden) close(true);
    });

    /* Focus trap */
    sheet.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var items = sheet.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------------------------------------------------------------------------
     4. FAQ ACCORDION — single expand, bound to FAQPage schema in the markup
     --------------------------------------------------------------------------- */
  function initFaq() {
    var questions = document.querySelectorAll('[data-faq-q]');
    Array.prototype.forEach.call(questions, function (q) {
      q.addEventListener('click', function () {
        var expanded = q.getAttribute('aria-expanded') === 'true';
        Array.prototype.forEach.call(questions, function (other) {
          other.setAttribute('aria-expanded', 'false');
          var panel = document.getElementById(other.getAttribute('aria-controls'));
          if (panel) panel.hidden = true;
        });
        if (!expanded) {
          q.setAttribute('aria-expanded', 'true');
          var own = document.getElementById(q.getAttribute('aria-controls'));
          if (own) own.hidden = false;
        }
      });
    });
  }

  /* ---------------------------------------------------------------------------
     5. HEADER — hides on scroll down, reveals on scroll up.
     Returns 64px of reading area on a short screen.
     --------------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var last = 0, ticking = false;

    function update() {
      var y = window.scrollY;
      header.setAttribute('data-scrolled', y > 8 ? 'true' : 'false');
      if (y > 200 && y > last) header.setAttribute('data-hidden', 'true');
      else header.setAttribute('data-hidden', 'false');
      last = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  /* ---------------------------------------------------------------------------
     6. ACTION BAR — hides while a form field has focus, otherwise the
     on-screen keyboard pushes it over the active input.
     --------------------------------------------------------------------------- */
  function initActionBar() {
    var bar = document.querySelector('[data-action-bar]');
    if (!bar) return;
    function suppress(on) { bar.setAttribute('data-suppressed', on ? 'true' : 'false'); }
    document.addEventListener('focusin', function (e) {
      var t = e.target;
      if (t.matches('input, textarea, select')) suppress(true);
    });
    document.addEventListener('focusout', function (e) {
      var t = e.target;
      if (t.matches('input, textarea, select')) {
        window.setTimeout(function () {
          var a = document.activeElement;
          if (!a || !a.matches('input, textarea, select')) suppress(false);
        }, 80);
      }
    });
  }

  /* ---------------------------------------------------------------------------
     7. MAP FACADE — the real map loads only on tap, protecting LCP
     --------------------------------------------------------------------------- */
  function initMap() {
    var facade = document.querySelector('[data-map-facade]');
    if (!facade) return;
    var btn = facade.querySelector('button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var src = facade.getAttribute('data-map-src');
      var title = facade.getAttribute('data-map-title') || 'Map';
      if (!src) return;
      var frame = document.createElement('iframe');
      frame.src = src;
      frame.title = title;
      frame.loading = 'lazy';
      frame.width = '100%';
      frame.height = '320';
      frame.style.border = '0';
      frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      facade.replaceChildren(frame);
    });
  }

  /* ---------------------------------------------------------------------------
     8. CHART REVEAL — the one orchestrated moment on the site.
     Opacity only, no movement, once per page load, and skipped entirely
     under prefers-reduced-motion.
     --------------------------------------------------------------------------- */
  function initChartReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var lines = document.querySelectorAll('[data-chart-line]');
    if (!lines.length) return;
    Array.prototype.forEach.call(lines, function (line, i) {
      line.style.opacity = '0';
      line.style.transition = 'opacity 260ms cubic-bezier(0.16,1,0.3,1) ' + (i * 90) + 'ms';
    });
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        Array.prototype.forEach.call(lines, function (line) { line.style.opacity = '1'; });
      });
    });
  }


  /* ---------------------------------------------------------------------------
     9. CALLBACK FORM
     Validation on blur, never on keystroke. Errors instruct rather than
     apologise. On failed submit the summary receives focus and each item
     links to its field.

     Without JavaScript the form submits natively, so the page degrades to a
     server round-trip. The endpoint is set on data-endpoint and is empty until
     it is connected — see PLACEHOLDERS.md.
     --------------------------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById('callback-form');
    if (!form) return;

    var summary  = document.getElementById('error-summary');
    var countEl  = summary.querySelector('[data-error-count]');
    var listEl   = summary.querySelector('[data-error-list]');
    var success  = document.getElementById('appt-success');
    var submit   = form.querySelector('button[type="submit"]');
    var msg = function (k) { return form.getAttribute('data-msg-' + k) || ''; };

    function show(id, wrap, text) {
      var box = document.getElementById(id + '-error');
      if (box) {
        box.querySelector('span').textContent = text || '';
        box.hidden = !text;
      }
      if (wrap) {
        if (text) wrap.setAttribute('aria-invalid', 'true');
        else wrap.removeAttribute('aria-invalid');
      }
    }

    function checkName() {
      var f = document.getElementById('f-name');
      var ok = f.value.trim().length > 0;
      show('f-name', f, ok ? '' : msg('name'));
      return ok ? null : { id: 'f-name', text: msg('name') };
    }

    function checkPhone() {
      var f = document.getElementById('f-phone');
      var wrap = form.querySelector('[data-phone-wrap]');
      var v = f.value.replace(/\D/g, '');
      var text = !v ? msg('phone-empty') : (v.length !== 11 ? msg('phone') : '');
      show('f-phone', wrap, text);
      return text ? { id: 'f-phone', text: text } : null;
    }

    function checkWhen() {
      var chosen = form.querySelector('input[name="when"]:checked');
      var text = chosen ? '' : msg('time');
      show('f-when', null, text);
      return text ? { id: 'f-when', text: text } : null;
    }

    /* Validate on blur, never on keystroke */
    document.getElementById('f-name').addEventListener('blur', checkName);
    document.getElementById('f-phone').addEventListener('blur', checkPhone);
    Array.prototype.forEach.call(form.querySelectorAll('input[name="when"]'), function (r) {
      r.addEventListener('change', checkWhen);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot — a real person never fills a field they cannot see */
      var hp = document.getElementById('f-website');
      if (hp && hp.value) { form.hidden = true; success.hidden = false; return; }

      var errors = [checkName(), checkPhone(), checkWhen()].filter(Boolean);

      if (errors.length) {
        if (countEl) countEl.textContent = errors.length;
        listEl.replaceChildren();
        errors.forEach(function (err) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + err.id;
          a.textContent = err.text;
          a.addEventListener('click', function (ev) {
            ev.preventDefault();
            var t = document.getElementById(err.id);
            if (t.tagName === 'DIV') { var r = t.querySelector('input'); if (r) r.focus(); }
            else t.focus();
          });
          li.appendChild(a);
          listEl.appendChild(li);
        });
        summary.hidden = false;
        summary.focus();
        return;
      }

      summary.hidden = true;
      var label = submit.textContent;
      submit.disabled = true;
      submit.textContent = form.getAttribute('data-sending') || label;

      var endpoint = form.getAttribute('data-endpoint');

      function done() {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        success.scrollIntoView({ block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
      function fail() {
        submit.disabled = false;
        submit.textContent = form.getAttribute('data-submit') || label;
        if (countEl) countEl.textContent = 1;
        listEl.replaceChildren();
        var li = document.createElement('li');
        li.textContent = msg('send');
        listEl.appendChild(li);
        summary.hidden = false;
        summary.focus();
      }

      /* No endpoint connected yet: show the confirmation so the flow can be
         tested end to end. Once data-endpoint is set, this posts for real. */
      if (!endpoint) { window.setTimeout(done, 400); return; }

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (r) { if (r.ok) done(); else fail(); }).catch(fail);
    });
  }

  /* ---------------------------------------------------------------------------
     10. EXTERNAL LINKS
     Announce to screen reader users that a link opens elsewhere, without
     forcing a new tab — forced new tabs break the Android back button.
     --------------------------------------------------------------------------- */
  function initExternalLinks() {
    var lang = root.getAttribute('lang') === 'ur' ? 'ur' : 'en';
    var note = lang === 'ur'
      ? '\u06CC\u06C1 \u0644\u0646\u06A9 \u062F\u0648\u0633\u0631\u06CC \u0648\u06CC\u0628 \u0633\u0627\u0626\u0679 \u067E\u0631 \u0644\u06D2 \u062C\u0627\u0626\u06D2 \u06AF\u0627'
      : 'opens another website';
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="http"]'), function (a) {
      if (a.hostname === window.location.hostname) return;
      if (a.querySelector('.visually-hidden')) return;
      var s = document.createElement('span');
      s.className = 'visually-hidden';
      s.textContent = ' (' + note + ')';
      a.appendChild(s);
    });
  }

  /* ---------------------------------------------------------------------------
     11. TEL LINKS ON DESKTOP
     A desktop user who cannot dial should still be able to read the number.
     --------------------------------------------------------------------------- */
  function initTelLinks() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="tel:"]'), function (a) {
      a.setAttribute('title', a.getAttribute('href').replace('tel:', ''));
    });
  }

  /* --------------------------------------------------------------------------- */
  function init() {
    initTextSize();
    initContrast();
    initMenu();
    initFaq();
    initHeader();
    initActionBar();
    initMap();
    renderStatus();
    initChartReveal();
    initForm();
    initExternalLinks();
    initTelLinks();
    window.setInterval(renderStatus, 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

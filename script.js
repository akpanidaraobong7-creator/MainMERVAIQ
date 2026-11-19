(function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  var pages = [['index.html', 'Home'], ['how-it-works.html', 'How it works'], ['about.html', 'About'], ['contact.html', 'Contact']];
  var links = pages.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === path ? ' class="on"' : '') + '>' + p[1] + '</a>'; }).join('');
  var logo = '<a class="logo" href="index.html"><i>M</i><b>MERVA<span>IQ</span></b></a>';
  var u = null; try { u = JSON.parse(localStorage.getItem('mq_user') || 'null'); } catch (e) {}
  var signed = !!(u && u.signedIn);
  var actions = signed ? '<a class="btn sm" href="dashboard.html">Open app</a>' : '<a class="btn sm ghost" href="login.html">Sign in</a><a class="btn sm" href="signup.html">Sign up</a>';

  var nav = document.getElementById('site-nav');
  if (nav) nav.outerHTML = '<nav><div class="wrap">' + logo + '<div class="links" id="links">' + links + '</div><div class="nav-actions">' + actions + '<button class="burger" id="burger" aria-label="Menu"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></svg></button></div></div></nav>';
  var foot = document.getElementById('site-foot');
  if (foot) foot.outerHTML = '<footer><div class="wrap">' + logo + '<div class="flinks">' + links + '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div><div>© 2026 MERVAIQ. Remember. Organise. Get it done.</div></div></footer>';

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-auth]');
    if (b) location.href = signed ? 'dashboard.html' : (b.getAttribute('data-auth') === 'signin' ? 'login.html' : 'signup.html');
    if (e.target.closest('#burger')) document.getElementById('links').classList.toggle('open');
  });
  /* ---- Mascot guide: walks to the section it is talking about, looks at it and points at it ---- */
  var MASCOT = '<svg viewBox="0 0 120 130" width="100%" aria-hidden="true"><ellipse class="mshadow" cx="60" cy="122" rx="26" ry="5" fill="#123F32" opacity=".18"/><g class="leaf"><path d="M60 22c-1-10 3-17 10-20" stroke="#123F32" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M68 4c6-6 15-4 17 3-6 5-15 4-17-3z" fill="#9ad7a0"/></g><path d="M60 20c28 0 44 18 44 46 0 26-16 46-44 46S16 92 16 66C16 38 32 20 60 20z" fill="#2E7D32"/><path d="M30 40c6-9 16-14 30-14" stroke="#fff" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse class="armL" cx="14" cy="76" rx="7" ry="11" fill="#2E7D32" transform="rotate(12 14 76)"/><ellipse class="armR wave" cx="106" cy="76" rx="7" ry="11" fill="#2E7D32" transform="rotate(-12 106 76)"/><g class="point"><line x1="0" y1="0" x2="30" y2="0" stroke="#2E7D32" stroke-width="12" stroke-linecap="round"/><circle cx="34" cy="0" r="7.5" fill="#3f9244"/></g><ellipse cx="60" cy="66" rx="31" ry="25" fill="#F8F6ED"/><g class="eyes"><ellipse class="eye" cx="49" cy="62" rx="4.2" ry="6" fill="#1F1F1F"/><ellipse class="eye" cx="71" cy="62" rx="4.2" ry="6" fill="#1F1F1F"/></g><path class="mouth n" d="M52 76q8 7 16 0" stroke="#1F1F1F" stroke-width="3" fill="none" stroke-linecap="round"/><path class="mouth h" d="M50 74q10 14 20 0z" fill="#1F1F1F"/></svg>';
  var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var dp = document.body.getAttribute('data-page');
  var cursor = { x: innerWidth / 2, y: innerHeight / 2 };
  document.addEventListener('pointermove', function (e) { cursor.x = e.clientX; cursor.y = e.clientY; });
  var buddy = null, posEl = null, eyesB = null, arm = null, bub = null, target = null, timer, greeted = false, ti = 0, pos = { x: innerWidth + 20, y: innerHeight - 110 };
  var tips = ['Capture it once, find it when you need it.', 'I only suggest. You stay in charge.', 'Nothing is marked done unless you say so.', 'One thing at a time. You’ve got this.', 'Reminders, your way.'];
  if (['login', 'signup', 'forgot'].indexOf(dp) < 0) {
    posEl = document.createElement('div'); posEl.className = 'buddy-pos';
    buddy = document.createElement('div'); buddy.className = 'mascot buddy'; buddy.tabIndex = 0; buddy.setAttribute('role', 'button'); buddy.setAttribute('aria-label', 'Mascot. Press for a tip.');
    buddy.innerHTML = '<div class="bubble" aria-hidden="true"></div>' + MASCOT;
    posEl.appendChild(buddy); document.body.appendChild(posEl);
    bub = buddy.firstChild; eyesB = buddy.querySelector('.eyes'); arm = buddy.querySelector('.point');
    var hero = document.querySelector('.device .mascot');
    var stopSay = function () { target = null; buddy.classList.remove('say', 'happy', 'pl', 'pr'); };
    var say = function (t, el) { bub.textContent = t; buddy.classList.add('say', 'happy'); target = el || null; clearTimeout(timer); timer = setTimeout(stopSay, 4800); };
    var hop = function () { if (reduce) return; buddy.classList.remove('hop'); void buddy.offsetWidth; buddy.classList.add('hop'); setTimeout(function () { buddy.classList.remove('hop'); }, 650); };
    var tipNow = function () { say(tips[ti++ % tips.length], null); hop(); };
    buddy.addEventListener('click', tipNow);
    buddy.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tipNow(); } });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting && !posEl.classList.contains('away')) { say(en.target.getAttribute('data-tip'), en.target.querySelector('h1,h2') || en.target); hop(); } });
      }, { threshold: 0.55 });
      document.querySelectorAll('[data-tip]').forEach(function (n) { io.observe(n); });
      if (hero) {
        posEl.classList.add('away');
        new IntersectionObserver(function (es) {
          var inHero = es[0].isIntersecting; posEl.classList.toggle('away', inHero);
          if (!inHero && !greeted) { greeted = true; say('I’ll tag along. Click me for a tip.', null); hop(); }
        }, { threshold: 0.2 }).observe(hero);
      }
    }
  }
  var goal = function () {
    var w = posEl.offsetWidth || 84, h = w * 130 / 120, rest = { x: innerWidth - w - 16, y: innerHeight - h - 16, right: true, look: null };
    if (!target) return rest;
    var r = target.getBoundingClientRect();
    if (r.bottom < 70 || r.top > innerHeight - 10) { clearTimeout(timer); buddy.classList.remove('say', 'happy', 'pl', 'pr'); target = null; return rest; }
    var cx = r.left + r.width / 2, right = innerWidth <= 520 || cx < innerWidth * 0.55;
    if (innerWidth <= 520) return { x: rest.x, y: rest.y, right: true, look: { x: cx, y: r.top + r.height / 2 } };
    return { x: right ? innerWidth - w - 16 : 16, y: Math.min(innerHeight - h - 12, Math.max(76, r.top + r.height / 2 - h / 2)), right: right, look: { x: cx, y: r.top + r.height / 2 } };
  };
  var aim = function (eyes, look) {
    var r = eyes.getBoundingClientRect(), dx = look.x - (r.left + r.width / 2), dy = look.y - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 200) * 2.5;
    eyes.style.transform = 'translate(' + (dx / d * k).toFixed(2) + 'px,' + (dy / d * k).toFixed(2) + 'px)';
  };
  var allEyes = document.querySelectorAll('.mascot .eyes');
  var frame = function () {
    var g = null;
    if (buddy) {
      var w = posEl.offsetWidth || 84, h = w * 130 / 120; g = goal();
      var dx = g.x - pos.x, dy = g.y - pos.y, k = reduce ? 1 : 0.12;
      pos.x += dx * k; pos.y += dy * k;
      buddy.classList.toggle('walking', !reduce && Math.abs(dx) + Math.abs(dy) > 12);
      posEl.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px,0)';
      posEl.classList.toggle('dl', !g.right);
      if (g.look) {
        var right = g.look.x > pos.x + w / 2, sx = pos.x + w * (right ? 0.83 : 0.17), sy = pos.y + h * 0.57, ang = Math.atan2(g.look.y - sy, g.look.x - sx) * 180 / Math.PI;
        arm.setAttribute('transform', 'translate(' + (right ? 100 : 20) + ' 74) rotate(' + ang.toFixed(1) + ')');
        buddy.classList.toggle('pr', right); buddy.classList.toggle('pl', !right);
      }
    }
    allEyes.forEach(function (eyes) {
      var look = (buddy && eyes === eyesB && g && g.look) ? g.look : cursor;
      if (reduce && look === cursor) return;
      aim(eyes, look);
    });
    requestAnimationFrame(frame);
  };
  if (allEyes.length) requestAnimationFrame(frame);
  var cf = document.getElementById('contactForm');
  if (cf) cf.addEventListener('submit', function (e) {
    e.preventDefault();
    // TODO: connect to your email service or backend here.
    document.getElementById('contactMsg').textContent = 'Thanks! Your message has been received.';
    cf.reset();
  });
})();

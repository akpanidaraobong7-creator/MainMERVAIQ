/* MERVAIQ app prototype. Data lives in this browser (localStorage).
   TODO: swap the load/save/auth helpers for Supabase when the backend is ready. */
(function () {
  'use strict';
  var K = 'mq_items', U = 'mq_user';
  var CATS = ['Personal', 'Work', 'Bills', 'Appointments', 'Errands', 'Other'];
  var REM = [['none', 'No reminder'], ['0', 'At the time'], ['60', '1 hour before'], ['1440', '1 day before'], ['2880', '2 days before']];
  var DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var MON = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  var MONRE = 'january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec';
  var LABEL = { overdue: 'Overdue', today: 'Today', upcoming: 'Upcoming', done: 'Completed' };
  var NAV = [['dashboard.html', 'Dashboard', 'home'], ['memory.html', 'Memory', 'memory'], ['memory-new.html', 'Add memory', 'add'], ['upcoming.html', 'Upcoming', 'cal'], ['completed.html', 'Completed', 'done'], ['settings.html', 'Settings', 'gear']];
  var TABS = [['dashboard.html', 'Home', 'home'], ['memory.html', 'Memory', 'memory'], ['memory-new.html', 'Add', 'add'], ['upcoming.html', 'Upcoming', 'cal'], ['settings.html', 'Settings', 'gear']];
var IC = {home:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',memory:'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',add:'<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',cal:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',done:'<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>',gear:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',menu:'<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',sliders:'<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',lock:'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'};
  function ico(n) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + '</svg>'; }
  var page = document.body.getAttribute('data-page');
  var root = document.getElementById('app');
  var views = {}, editing = false, draft = null, mode = 'new', qv = '', cv = '', sv = 'open';

  function $(s) { return document.querySelector(s); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function user() { return load(U, null); }
  function setUser(u) { save(U, u); }
  function items() { return load(K, []); }
  function put(a) { save(K, a); }
  function uid() { return 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function ds(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function pd(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function detectTz() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Lagos'; } catch (e) { return 'Africa/Lagos'; } }
  function fmtDate(s) { return pd(s).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }); }
  function fmtTime(t) { if (!t) return ''; var p = t.split(':'), h = +p[0]; return (h % 12 || 12) + ':' + p[1] + ' ' + (h < 12 ? 'AM' : 'PM'); }
  function when(it) { return fmtDate(it.date) + (it.time ? ' · ' + fmtTime(it.time) : ''); }
  function dueAt(it) { var d = pd(it.date); if (it.time) { var p = it.time.split(':'); d.setHours(+p[0], +p[1]); } else d.setHours(23, 59, 59); return d; }
  function status(it) { if (it.done) return 'done'; var n = new Date(); if (dueAt(it) < n) return 'overdue'; if (it.date === ds(n)) return 'today'; return 'upcoming'; }
  function byDue(a, b) { return dueAt(a) - dueAt(b); }
  function nextDate(s, rec) {
    var d = pd(s);
    if (rec === 'daily') return ds(addDays(d, 1));
    if (rec === 'weekly') return ds(addDays(d, 7));
    var n = new Date(d.getFullYear(), d.getMonth() + 1, 1), last = new Date(n.getFullYear(), n.getMonth() + 1, 0).getDate();
    n.setDate(Math.min(d.getDate(), last)); return ds(n);
  }

  /* ---------- natural-language capture (always confirmed by the user) ---------- */
  function monIdx(n) { n = n.toLowerCase().slice(0, 3); for (var i = 0; i < 12; i++) if (MON[i].slice(0, 3) === n) return i; return -1; }
  function guess(t) {
    t = t.toLowerCase();
    if (/\b(bill|rent|electric|subscription|renew|pay|invoice|tax)\b/.test(t)) return 'Bills';
    if (/\b(dentist|doctor|appointment|clinic|hospital|checkup)\b/.test(t)) return 'Appointments';
    if (/\b(buy|groceries|grocery|pick up|shop|errand|collect)\b/.test(t)) return 'Errands';
    if (/\b(client|report|meeting|email|boss|office|work|deadline)\b/.test(t)) return 'Work';
    return 'Personal';
  }
  function parse(text) {
    var s = ' ' + text.trim() + ' ', m, date = null, time = '', rec = 'none', notes = [];
    var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    function cut(re) { var r = s.match(re); if (r) s = s.replace(r[0], ' '); return r; }
    s = s.replace(/^\s*(please\s+)?remind me (to|about)\s+/i, ' ');
    if (cut(/\bevery day\b|\bdaily\b/i)) rec = 'daily';
    else if (cut(/\bevery week\b|\bweekly\b/i)) rec = 'weekly';
    else if (cut(/\bevery month\b|\bmonthly\b/i)) rec = 'monthly';
    if ((m = cut(/\b(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i))) { var h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; time = pad(h) + ':' + (m[2] || '00'); }
    else if ((m = cut(/\bat\s+(\d{1,2}):(\d{2})\b/i))) time = pad(+m[1]) + ':' + m[2];
    else if (cut(/\bat noon\b/i)) time = '12:00';
    if (cut(/\b(today|tonight)\b/i)) date = today;
    else if (cut(/\btomorrow\b/i)) date = addDays(today, 1);
    else if ((m = cut(/\bin (\d+) (day|week)s?\b/i))) date = addDays(today, +m[1] * (m[2].toLowerCase() === 'week' ? 7 : 1));
    else if ((m = cut(new RegExp('\\b(?:on\\s+)?(?:the\\s+)?(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(' + MONRE + ')\\b', 'i')))) date = new Date(today.getFullYear(), monIdx(m[2]), +m[1]);
    else if ((m = cut(new RegExp('\\b(?:on\\s+)?(' + MONRE + ')\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b', 'i')))) date = new Date(today.getFullYear(), monIdx(m[1]), +m[2]);
    else if ((m = cut(/\b(?:on\s+)?(next\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i))) {
      var diff = (DAYS.indexOf(m[2].toLowerCase()) - today.getDay() + 7) % 7; if (diff === 0) diff = 7;
      date = addDays(today, diff);
      if (m[1] || diff === 7) notes.push('“' + m[0].trim() + '” can mean different dates');
    }
    if (date && date < today) { date = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate()); notes.push('That date had already passed this year, so I used next year'); }
    var note = '';
    if (date) { if (notes.length) note = notes.join('. ') + '. I read it as ' + fmtDate(ds(date)) + '. Please confirm.'; }
    else note = 'I couldn’t find a date. Please choose one.';
    var title = s.replace(/\s+/g, ' ').replace(/^\s*(to|about)\s+/i, '').replace(/\s*\b(on|at|by|for|every|in|the)\s*$/i, '').replace(/[\s,.;:]+$/, '').trim() || text.trim();
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return { title: title, date: date ? ds(date) : '', time: time, rec: rec, cat: guess(title), note: note };
  }
  window.MQ = { parse: parse };

  /* ---------- data actions ---------- */
  function blank() { return { id: '', title: '', desc: '', cat: 'Personal', date: '', time: '', rem: (user() || {}).lead || '1440', pri: 'normal', rec: 'none', done: false }; }
  function setDone(id, v) {
    var a = items();
    a.forEach(function (i) {
      if (i.id !== id) return;
      i.done = v; i.completedAt = v ? new Date().toISOString() : null;
      if (v && i.rec !== 'none') { var n = JSON.parse(JSON.stringify(i)); n.id = uid(); n.done = false; n.completedAt = null; n.date = nextDate(i.date, i.rec); n.createdAt = new Date().toISOString(); a.push(n); }
    });
    put(a);
  }
  function readForm(it) {
    it.title = $('#f_title').value.trim(); it.desc = $('#f_desc').value.trim(); it.cat = $('#f_cat').value; it.pri = $('#f_pri').value;
    it.date = $('#f_date').value; it.time = $('#f_time').value; it.rem = $('#f_rem').value; it.rec = $('#f_rec').value; return it;
  }
  function saveDraft() {
    var a = items(); readForm(draft);
    if (mode === 'new') { draft.id = uid(); draft.createdAt = new Date().toISOString(); a.push(draft); }
    else a = a.map(function (i) { return i.id === draft.id ? draft : i; });
    put(a); return draft;
  }
  function sample() {
    var t = new Date(), a = items();
    function mk(title, cat, off, time, rec, pri) { a.push({ id: uid(), title: title, desc: '', cat: cat, date: ds(addDays(t, off)), time: time, rem: '1440', pri: pri || 'normal', rec: rec || 'none', done: false, createdAt: new Date().toISOString() }); }
    mk('Pay electricity bill', 'Bills', 3, '09:00'); mk('Submit client report', 'Work', 0, '23:00', 'none', 'high'); mk('Book dentist appointment', 'Appointments', -1, '');
    mk('Buy groceries', 'Errands', 2, '17:00'); mk('Pay rent', 'Bills', 10, '', 'monthly'); put(a);
  }

  /* ---------- html helpers ---------- */
  function opt(list, val) { return list.map(function (o) { var v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : o; return '<option value="' + esc(v) + '"' + (String(v) === String(val) ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join(''); }
  function formHTML(it, note, label) {
    return '<form class="card form" id="mf">' + (note ? '<p class="note">' + esc(note) + '</p>' : '') +
      '<label for="f_title">Title</label><input id="f_title" required value="' + esc(it.title) + '">' +
      '<label for="f_desc">Notes</label><textarea id="f_desc">' + esc(it.desc) + '</textarea>' +
      '<div class="row2"><div><label for="f_cat">Category</label><select id="f_cat">' + opt(CATS, it.cat) + '</select></div><div><label for="f_pri">Priority</label><select id="f_pri">' + opt([['normal', 'Normal'], ['high', 'High']], it.pri) + '</select></div></div>' +
      '<div class="row2"><div><label for="f_date">Due date</label><input id="f_date" type="date" required value="' + esc(it.date) + '"></div><div><label for="f_time">Due time</label><input id="f_time" type="time" value="' + esc(it.time) + '"></div></div>' +
      '<div class="row2"><div><label for="f_rem">Reminder</label><select id="f_rem">' + opt(REM, it.rem) + '</select></div><div><label for="f_rec">Repeats</label><select id="f_rec">' + opt([['none', 'Does not repeat'], ['daily', 'Daily'], ['weekly', 'Weekly'], ['monthly', 'Monthly']], it.rec) + '</select></div></div>' +
      '<button class="btn" type="submit">' + label + '</button></form>';
  }
  function card(it) {
    var s = status(it);
    return '<div class="mem"><a href="memory-detail.html?id=' + it.id + '"><b>' + esc(it.title) + (it.pri === 'high' ? ' <span class="hi" title="High priority">' + ico('flag') + '</span>' : '') + '</b><span>' + esc(it.cat) + ' · ' + when(it) + (it.rec !== 'none' ? ' · repeats ' + it.rec : '') + '</span></a><em class="b ' + s + '">' + LABEL[s] + '</em>' +
      (it.done ? '<button class="btn sm ghost" data-reopen="' + it.id + '">Reopen</button>' : '<button class="btn sm ghost" data-done="' + it.id + '">Done</button>') + '</div>';
  }
  function list(a, empty) { return a.length ? a.map(card).join('') : '<div class="empty">' + empty + '</div>'; }
  function capture(req) { return '<form class="capture" id="qc"><input class="fi" id="qtext" ' + (req ? 'required ' : '') + 'placeholder="e.g. Remind me to pay my electricity bill on Friday…" aria-label="What’s on your mind?"><button class="btn" type="submit">' + (req ? 'Save memory' : 'Fill form') + '</button></form>'; }

  /* ---------- views ---------- */
  views.dashboard = function () {
    var u = user(), a = items(), open = a.filter(function (i) { return !i.done; }).sort(byDue), now = new Date(), hr = now.getHours();
    var od = open.filter(function (i) { return status(i) === 'overdue'; }), td = open.filter(function (i) { return status(i) === 'today'; }), up = open.filter(function (i) { return status(i) === 'upcoming'; });
    var g = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
    var heads = open.filter(function (i) { return i.rem !== 'none' && status(i) !== 'overdue' && dueAt(i) - (+i.rem) * 60000 <= now; });
    var h = '<h1>' + g + ', ' + esc((u.name || '').split(' ')[0]) + '.</h1><p class="sub">Here’s what needs your attention.</p>' +
      '<div class="counts2"><div class="stat"><b>' + pad(td.length) + '</b><span>Today</span></div><div class="stat"><b>' + pad(up.length) + '</b><span>Upcoming</span></div><div class="stat' + (od.length ? ' warn' : '') + '"><b>' + pad(od.length) + '</b><span>Overdue</span></div></div>' +
      '<h2 class="sec">Quick capture</h2>' + capture(true) + '<div id="confirm"></div>';
    if (!a.length) return h + '<div class="empty" style="margin-top:24px"><p>Nothing saved yet. Capture your first commitment above.</p><p style="margin-top:12px"><button class="btn sm ghost" id="sample">Add sample commitments</button></p></div>';
    if (heads.length) h += '<h2 class="sec">Reminders</h2>' + heads.map(function (i) { return '<div class="note">' + ico('clock') + ' <b>' + esc(i.title) + '</b> is due ' + when(i) + '</div>'; }).join('');
    if (od.length) h += '<h2 class="sec">Overdue</h2>' + list(od, '');
    h += '<h2 class="sec">Today</h2>' + list(td, 'Nothing else due today.');
    h += '<h2 class="sec">Next up</h2>' + list(up.slice(0, 5), 'Nothing coming up yet.') + (up.length > 5 ? '<p><a class="back" href="upcoming.html">View all upcoming →</a></p>' : '');
    return h;
  };
  views.memory = function () {
    return '<h1>Memory</h1><p class="sub">Everything you’ve saved, searchable.</p><div class="toolbar"><input class="fi" id="q" placeholder="Search your memories…" aria-label="Search"><select class="fi" id="fc"><option value="">All categories</option>' + opt(CATS, '') + '</select><select class="fi" id="fs"><option value="open">Open</option><option value="all">All</option><option value="done">Completed</option></select></div><div id="list"></div>';
  };
  function fillList() {
    var q = qv.toLowerCase(), a = items().filter(function (i) {
      if (sv === 'open' && i.done) return false; if (sv === 'done' && !i.done) return false; if (cv && i.cat !== cv) return false;
      return !q || (i.title + ' ' + i.desc + ' ' + i.cat).toLowerCase().indexOf(q) > -1;
    }).sort(byDue);
    $('#list').innerHTML = list(a, 'No memories match. <a class="back" href="memory-new.html">Add one →</a>');
  }
  views['new'] = function () { return '<h1>Add memory</h1><p class="sub">Type it the way you’d say it, or fill in the form yourself.</p>' + capture(false) + '<div id="confirm">' + formHTML(draft, '', 'Save memory') + '</div>'; };
  views.detail = function () {
    var id = new URLSearchParams(location.search).get('id'), it = items().filter(function (i) { return i.id === id; })[0];
    if (!it) return '<h1>Not found</h1><p class="sub">That memory doesn’t exist or was deleted.</p><p style="margin-top:16px"><a class="btn" href="memory.html">Back to memory</a></p>';
    if (editing) return '<a class="back" href="#" data-act="canceledit">← Cancel</a><h1>Edit memory</h1>' + formHTML(draft, '', 'Save changes');
    var s = status(it), remL = (REM.filter(function (r) { return r[0] === it.rem; })[0] || ['', '—'])[1];
    return '<a class="back" href="memory.html">← Memory</a><h1>' + esc(it.title) + '</h1><p><em class="b ' + s + '">' + LABEL[s] + '</em></p>' +
      '<div class="card" style="margin-top:16px"><dl class="dl"><dt>Category</dt><dd>' + esc(it.cat) + '</dd><dt>Due</dt><dd>' + when(it) + '</dd><dt>Reminder</dt><dd>' + remL + '</dd><dt>Repeats</dt><dd>' + (it.rec === 'none' ? 'No' : esc(it.rec)) + '</dd><dt>Priority</dt><dd>' + esc(it.pri) + '</dd><dt>Notes</dt><dd>' + (esc(it.desc) || '—') + '</dd></dl></div>' +
      '<div class="actions">' + (it.done ? '<button class="btn" data-act="reopen">Reopen</button>' : '<button class="btn" data-act="complete">Mark complete</button>') + '<button class="btn ghost" data-act="edit">Edit</button>' +
      (it.done ? '' : '<button class="btn ghost" data-act="tomorrow">Move to tomorrow</button><button class="btn ghost" data-act="week">Move to next week</button>') + '<button class="btn ghost" data-act="delete">Delete</button></div>';
  };
  views.upcoming = function () {
    var t0 = new Date(); t0 = new Date(t0.getFullYear(), t0.getMonth(), t0.getDate());
    var fut = items().filter(function (i) { return !i.done && status(i) !== 'overdue'; }).sort(byDue), strip = '';
    for (var k = 0; k < 7; k++) { var d = addDays(t0, k), c = fut.filter(function (i) { return i.date === ds(d); }).length; strip += '<div><span>' + d.toLocaleDateString('en-GB', { weekday: 'short' }) + '</span><b>' + d.getDate() + '</b>' + (c ? '<i>' + c + ' due</i>' : '&nbsp;') + '</div>'; }
    var g = { 'Today': [], 'Tomorrow': [], 'This week': [], 'Later': [] };
    fut.forEach(function (i) { var n = Math.round((pd(i.date) - t0) / 864e5); (n <= 0 ? g['Today'] : n === 1 ? g['Tomorrow'] : n <= 7 ? g['This week'] : g['Later']).push(i); });
    var out = ''; Object.keys(g).forEach(function (k2) { if (g[k2].length) out += '<h2 class="sec">' + k2 + '</h2>' + g[k2].map(card).join(''); });
    return '<h1>Upcoming</h1><p class="sub">What’s coming, by date.</p><div class="strip">' + strip + '</div>' + (out || '<div class="empty">Nothing coming up. <a class="back" href="memory-new.html">Add a memory →</a></div>');
  };
  views.completed = function () {
    var a = items().filter(function (i) { return i.done; }).sort(function (x, y) { return (y.completedAt || '').localeCompare(x.completedAt || ''); });
    return '<h1>Completed</h1><p class="sub">Everything you’ve followed through on.</p>' + list(a, 'Nothing completed yet.');
  };
  views.settings = function () {
    var u = user(), tzs = ['Africa/Lagos', 'Africa/Accra', 'Africa/Nairobi', 'Africa/Johannesburg', 'Europe/London', 'America/New_York', 'Asia/Dubai'];
    if (u.tz && tzs.indexOf(u.tz) < 0) tzs.unshift(u.tz);
    return '<h1>Settings</h1><p class="sub">Your profile and reminder preferences.</p><form class="card form" id="sf">' +
      '<label for="s_name">Name</label><input id="s_name" required value="' + esc(u.name) + '"><label for="s_email">Email</label><input id="s_email" value="' + esc(u.email) + '" disabled>' +
      '<label for="s_tz">Timezone</label><select id="s_tz">' + opt(tzs, u.tz || 'Africa/Lagos') + '</select><label for="s_lead">Default reminder</label><select id="s_lead">' + opt(REM, u.lead || '1440') + '</select>' +
      '<label><input type="checkbox" disabled> Email reminders (available once the backend is connected)</label><button class="btn" type="submit">Save settings</button><div id="sfmsg" class="ok"></div></form>' +
      '<h2 class="sec">Your data</h2><div class="actions"><button class="btn ghost" id="export">Export my data</button><button class="btn ghost" id="wipe">Delete all my memories</button><button class="btn ghost" id="delacct">Delete my account</button></div>' +
      '<p class="demo" style="text-align:left">Prototype note: your data is stored in this browser only, and reminders appear in the app using your device’s clock.</p>';
  };

  function shell(inner) {
    var u = user(), cur = location.pathname.split('/').pop() || 'dashboard.html'; if (cur === 'memory-detail.html') cur = 'memory.html';
    var side = NAV.map(function (n) { return '<a class="nl' + (n[0] === cur ? ' on' : '') + '" href="' + n[0] + '"><span>' + n[2] + '</span>' + n[1] + '</a>'; }).join('');
    var tabs = TABS.map(function (n) { return '<a class="' + (n[0] === cur ? 'on' : '') + '" href="' + n[0] + '"><span>' + n[2] + '</span>' + n[1] + '</a>'; }).join('');
    root.innerHTML = '<div class="app"><aside class="side"><a class="logo" href="dashboard.html"><i>M</i><b>MERVA<span>IQ</span></b></a>' + side + '<div class="me"><b>' + esc(u.name) + '</b><br>' + esc(u.email) + '<br><button class="btn sm ghost" id="out" style="margin-top:10px">Sign out</button></div></aside><main class="main">' + inner + '</main></div><nav class="tabbar">' + tabs + '</nav>';
  }
  function render() {
    if (!views[page]) return; shell(views[page]());
    if (page === 'memory') { $('#q').value = qv; $('#fc').value = cv; $('#fs').value = sv; fillList(); }
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button,a'); if (!t) return;
    var id = t.getAttribute('data-done'), rid = t.getAttribute('data-reopen'), act = t.getAttribute('data-act');
    if (id) { setDone(id, true); render(); return; }
    if (rid) { setDone(rid, false); render(); return; }
    if (act) {
      e.preventDefault(); var cur = new URLSearchParams(location.search).get('id'), a = items();
      if (act === 'complete') setDone(cur, true);
      else if (act === 'reopen') setDone(cur, false);
      else if (act === 'edit') { draft = JSON.parse(JSON.stringify(a.filter(function (i) { return i.id === cur; })[0])); mode = 'edit'; editing = true; }
      else if (act === 'canceledit') editing = false;
      else if (act === 'tomorrow' || act === 'week') { a.forEach(function (i) { if (i.id === cur) i.date = ds(addDays(new Date(), act === 'tomorrow' ? 1 : 7)); }); put(a); }
      else if (act === 'delete') { if (confirm('Delete this memory? This can’t be undone.')) { put(a.filter(function (i) { return i.id !== cur; })); location.href = 'memory.html'; return; } }
      render(); return;
    }
    if (t.id === 'out') { var u = user(); if (u) { u.signedIn = false; setUser(u); } location.href = 'login.html'; }
    else if (t.id === 'sample') { sample(); render(); }
    else if (t.id === 'cancelc') { $('#confirm').innerHTML = ''; }
    else if (t.id === 'export') {
      var blob = new Blob([JSON.stringify({ profile: user(), memories: items() }, null, 2)], { type: 'application/json' }), l = document.createElement('a');
      l.href = URL.createObjectURL(blob); l.download = 'mervaiq-data.json'; l.click();
    }
    else if (t.id === 'wipe') { if (confirm('Delete all your memories? This can’t be undone.')) { put([]); render(); } }
    else if (t.id === 'delacct') { if (confirm('Delete your account and all data on this device?')) { try { localStorage.removeItem(K); localStorage.removeItem(U); } catch (er) {} location.href = 'index.html'; } }
  });
  document.addEventListener('input', function (e) {
    if (page === 'memory' && e.target.closest('.toolbar')) { qv = $('#q').value; cv = $('#fc').value; sv = $('#fs').value; fillList(); }
  });
  function err(m) { var x = $('#autherr'); if (x) x.textContent = m; }
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (['qc', 'mf', 'sf', 'signupForm', 'loginForm', 'forgotForm'].indexOf(f.id) < 0) return;
    e.preventDefault();
    if (f.id === 'qc') {
      var text = $('#qtext').value.trim(); if (!text) return;
      var p = parse(text), dash = page === 'dashboard'; draft = blank(); draft.title = p.title; draft.date = p.date; draft.time = p.time; draft.rec = p.rec; draft.cat = p.cat; mode = 'new';
      $('#confirm').innerHTML = (dash ? '<h2 class="sec">Confirm the details</h2>' : '') + formHTML(draft, p.note, dash ? 'Confirm and save' : 'Save memory') + (dash ? '<button class="btn ghost sm" id="cancelc" type="button" style="margin-top:10px">Cancel</button>' : '');
      $('#qtext').value = ''; $('#f_title').focus();
    } else if (f.id === 'mf') {
      var it = saveDraft(); if (page === 'new') location.href = 'memory-detail.html?id=' + it.id; else { editing = false; render(); }
    } else if (f.id === 'sf') {
      var u = user(); u.name = $('#s_name').value.trim(); u.tz = $('#s_tz').value; u.lead = $('#s_lead').value; setUser(u); render(); $('#sfmsg').textContent = 'Saved.';
    } else if (f.id === 'signupForm') {
      if ($('#su_pass').value.length < 8) { err('Use at least 8 characters for your password.'); return; }
      if (!$('#su_terms').checked) { err('Please accept the Terms and Privacy Policy.'); return; }
      var old = user() || {}; setUser({ name: $('#su_name').value.trim(), email: $('#su_email').value.trim().toLowerCase(), tz: old.tz || detectTz(), lead: old.lead || '1440', signedIn: true }); location.href = 'dashboard.html';
    } else if (f.id === 'loginForm') {
      var cu = user(), em = $('#li_email').value.trim().toLowerCase();
      if (!cu) { err('No account on this device yet. Please sign up first.'); return; }
      if (cu.email !== em) { err('That email doesn’t match the account on this device.'); return; }
      cu.signedIn = true; setUser(cu); location.href = 'dashboard.html';
    } else if (f.id === 'forgotForm') {
      $('#fgmsg').textContent = 'If an account exists for that email, a reset link will be sent. (Demo: no email is sent yet.)';
    }
  });

  var appPages = ['dashboard', 'memory', 'new', 'detail', 'upcoming', 'completed', 'settings'], u0 = user();
  if (appPages.indexOf(page) > -1) {
    if (!u0 || !u0.signedIn) { location.replace('login.html'); return; }
    if (page === 'new') { draft = blank(); mode = 'new'; }
    render();
  } else if ((page === 'login' || page === 'signup') && u0 && u0.signedIn) location.replace('dashboard.html');
})();

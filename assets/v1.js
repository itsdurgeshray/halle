/* MLU Halle-Wittenberg landing page */
(function () {
  'use strict';
  var root = document.documentElement;
  var FIGMA = root.classList.contains('figma');
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------ i18n */
  var EN = {
    'nav.study': 'Study', 'nav.research': 'Research', 'nav.history': 'History', 'nav.halle': 'Halle', 'nav.intl': 'International', 'nav.apply': 'Apply',
    'cta.apply': 'Apply now', 'cta.find': 'Find your programme', 'cta.advice': 'Student advisory',
    'hero.eyebrow': 'Martin Luther University Halle-Wittenberg', 'hero.l1': 'Creating knowledge.', 'hero.l2': 'Since 1502.',
    'hero.lede': 'More than 150 degree programmes, nine faculties and a tradition that reaches from Wittenberg to Halle. Welcome to the largest university in Saxony-Anhalt.',
    'f.students': 'students', 'f.programmes': 'undergraduate programmes', 'f.faculties': 'faculties', 'f.partners': 'partner universities worldwide',
    'st.text': 'For more than 500 years, Martin Luther University Halle-Wittenberg has stood for research and teaching at the highest level. It is a place where knowledge is created, critical thinking is nurtured and academic freedom is lived.',
    'st.united': 'United 1817',
    'ch.eyebrow': 'Chronicle', 'ch.title': 'Two cities. One university.',
    'ch.lede': 'From the Leucorea in Wittenberg and the Friedrichs-Universität in Halle grew the largest and most traditional university in Saxony-Anhalt.',
    'e1.t': 'The Leucorea is founded', 'e1.p': 'Elector Frederick the Wise founds a university in Wittenberg. Its name, Leucorea, is the Greek for the white mountain that gave the town its name.',
    'e2.t': 'A lecture hall changes the world', 'e2.p': 'Martin Luther, professor of theology at the Leucorea, publishes his 95 Theses. A year later Philipp Melanchthon arrives in Wittenberg. From here the Reformation spreads across Europe.',
    'e3.t': 'The Friedrichs-Universität in Halle', 'e3.p': 'A new university opens in Halle. With Christian Thomasius, August Hermann Francke and Christian Wolff it becomes a centre of the German Enlightenment.',
    'e4.t': 'The first woman doctor of medicine', 'e4.p': 'Dorothea Christiane Erxleben earns her doctorate in medicine in Halle, the first woman in Germany to do so. Today the Faculty of Medicine’s learning centre bears her name.',
    'e5.t': 'Two traditions, one university', 'e5.p': 'Wittenberg and Halle are united as one university. In 1834 it moves into its main building on Universitätsplatz, the Löwengebäude, still the university’s emblem today.',
    'e6.t': 'Excellent in research', 'e6.p': 'Nine faculties, around 350 professors and a Cluster of Excellence: at the Center for Chiral Electronics, the electronics of tomorrow are taking shape.',
    'fi.eyebrow': 'Study', 'fi.title': 'Find your degree programme.', 'fi.lede': 'More than 150 undergraduate and almost 80 graduate programmes, arranged in nine faculties.',
    'fi.label': 'Search programmes', 'fi.ph': 'Subject, degree or interest', 'fi.c3': 'Teacher training', 'fi.c4': 'State examination', 'fi.c5': 'Continuing education',
    'fi.crown': 'Faculties I to IX', 'fi.fac': 'Faculty', 'fi.sel': 'Selected programmes', 'fi.all': 'View programmes', 'fi.adv': 'Subject advisory',
    'fac0.s': 'Theology', 'fac1.s': 'Law and Economics', 'fac2.s': 'Medicine', 'fac3.s': 'History and Society', 'fac4.s': 'Languages, Media, Music',
    'fac5.s': 'Education', 'fac6.s': 'Biosciences', 'fac7.s': 'Chemistry, Physics, Maths', 'fac8.s': 'Agri, Geo, Computing',
    'pa.eyebrow': 'Admission', 'pa.title': 'Four steps to your first semester.',
    's1.t': 'Explore', 's1.p': 'Browse the programme catalogue and get to know the university at the Open Day, the Long Night of Science or in online formats.', 's1.a': 'Orientation events',
    's2.t': 'Get advice', 's2.p': 'General and subject advisory services answer your questions about subjects, admission and organising your studies, in person or online.', 's2.a': 'Student advisory',
    's3.t': 'Apply', 's3.p': 'Applications and enrolment are handled online by the Registrar’s Office. Deadlines and documents depend on your programme.',
    's4.t': 'Arrive', 's4.p': 'The Welcome Portal helps you with housing, formalities and your first days in Halle. Welcome to the university.', 's4.a': 'Welcome Portal',
    're.eyebrow': 'Research', 're.title': 'Excellent in research, strong for the region.', 're.p2': 'Sustainability', 're.p3': 'Cultures of knowledge and education',
    'r1': 'Plurality, participation, enlightenment', 'r2': 'Health and society in transformation', 'r3': 'From the plant to the macromolecule', 'r4': 'From mineral raw materials to nanoelectronics',
    'cl.eyebrow': 'Cluster of Excellence', 'cl.p': 'Together with partners in Regensburg and Berlin, the university studies how the handedness of molecules and materials can power a new, energy-efficient electronics.',
    'cl.news': 'Spintronics: researchers describe a new type of atomic oscillation', 'cl.a': 'Research at MLU',
    'ci.eyebrow': 'Location', 'ci.title': 'Halle on the Saale.', 'ci.lede': 'Around one of the most beautiful university squares in Europe lies a city with more than 1,200 years of history, short distances and green riverbanks along the Saale.',
    'a1.t': 'The old town', 'a1.p': 'The market square with the Red Tower and the four towers of the Marktkirche is the heart of the city.',
    'a2.t': 'The Francke Foundations', 'a2.p': 'A Baroque ensemble and home to theology and educational sciences.',
    'a3.t': 'The collections', 'a3.p': 'More than 40 collections and museums, among them the Meckel Collections and the Geiseltal Collection.',
    'a4.t': 'The Saale', 'a4.p': 'Giebichenstein Castle, Peißnitz island and the riverbank: nature starts right outside the lecture hall.',
    'va.eyebrow': 'Open to the world', 'va.title': 'The University of Halle stands for democracy, diversity, tolerance and open-mindedness.',
    'va.s1': 'international students', 'va.s2': 'partner universities', 'va.s3': 'universities in the Central German University Alliance: Halle, Jena, Leipzig',
    'ne.title': 'From the university', 'ne.date': 'Monday, 23 November 2026', 'ne.k1': 'Research', 'ne.read': 'Read the story',
    'ne.h1': 'Spintronics: researchers describe a new type of atomic oscillation',
    'ne.h2': 'Research for practice: MLU awards its transfer prizes',
    'ne.h3': 'Digital teaching: MLU builds a state-wide competence centre for teachers',
    'ne.h4': '90 new Deutschlandstipendium scholarships for students in Halle',
    'ne.h5': 'Chiral electronics: researchers find a disruptive interlayer in a promising material system',
    'ne.all': 'All news',
    'be.eyebrow': 'Your studies', 'be.title': 'Your chapter begins in Halle.', 'be.lede': 'Choose your next step. We will guide you from your first idea to enrolment.',
    'be.r1': 'Browse the programmes', 'be.r2': 'Contact student advisory', 'be.r3': 'Apply online',
    'fo.addr': 'Address', 'fo.l1': 'Degree programmes', 'fo.l3': 'Application and enrolment', 'fo.uni': 'University', 'fo.u1': 'Faculties', 'fo.u3': 'Careers', 'fo.u4': 'Press',
    'fo.follow': 'Follow', 'fo.imp': 'Imprint', 'fo.dsg': 'Privacy', 'fo.bf': 'Accessibility', 'fo.motto': 'Creating knowledge. Since 1502.'
  };

  var FAC = [
    { de: ['Theologische Fakultät', ['Evangelische Theologie', 'Evangelische Religion (Lehramt)']], en: ['Faculty of Theology', ['Protestant Theology', 'Protestant Religion (teacher training)']], addr: 'Franckeplatz 1, Haus 30' },
    { de: ['Juristische und Wirtschaftswissenschaftliche Fakultät', ['Rechtswissenschaft', 'Betriebswirtschaftslehre', 'Volkswirtschaftslehre', 'Wirtschaftsinformatik']], en: ['Faculty of Law and Economics', ['Law', 'Business Administration', 'Economics', 'Business Informatics']], addr: 'Universitätsplatz 10 a' },
    { de: ['Medizinische Fakultät', ['Humanmedizin', 'Zahnmedizin', 'Gesundheits- und Pflegewissenschaften']], en: ['Faculty of Medicine', ['Medicine', 'Dentistry', 'Health and Nursing Sciences']], addr: 'Magdeburger Straße 8' },
    { de: ['Philosophische Fakultät I', ['Geschichte', 'Politikwissenschaft', 'Soziologie', 'Philosophie']], en: ['Faculty of Philosophy I', ['History', 'Political Science', 'Sociology', 'Philosophy']], addr: 'Emil-Abderhalden-Straße 6' },
    { de: ['Philosophische Fakultät II', ['Germanistik', 'Anglistik und Amerikanistik', 'Medien- und Kommunikationswissenschaft', 'Musikwissenschaft']], en: ['Faculty of Philosophy II', ['German Studies', 'English and American Studies', 'Media and Communication', 'Musicology']], addr: 'Universitätsring 4' },
    { de: ['Philosophische Fakultät III', ['Erziehungswissenschaft', 'Lehramt an Grundschulen', 'Lehramt an Förderschulen']], en: ['Faculty of Philosophy III', ['Educational Science', 'Primary School Teaching', 'Special Needs Teaching']], addr: 'Franckeplatz 1, Haus 3' },
    { de: ['Naturwissenschaftliche Fakultät I', ['Biologie', 'Biochemie', 'Pharmazie']], en: ['Faculty of Natural Sciences I', ['Biology', 'Biochemistry', 'Pharmacy']], addr: 'Kurt-Mothes-Straße 3' },
    { de: ['Naturwissenschaftliche Fakultät II', ['Chemie', 'Physik', 'Mathematik']], en: ['Faculty of Natural Sciences II', ['Chemistry', 'Physics', 'Mathematics']], addr: 'Von-Danckelmann-Platz 3' },
    { de: ['Naturwissenschaftliche Fakultät III', ['Informatik', 'Geographie', 'Agrarwissenschaften', 'Ernährungswissenschaften']], en: ['Faculty of Natural Sciences III', ['Computer Science', 'Geography', 'Agricultural Sciences', 'Nutritional Sciences']], addr: 'Von-Seckendorff-Platz 3' }
  ];
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  var DE = {}, DEPH = {};
  $$('[data-i18n]').forEach(function (el) { DE[el.getAttribute('data-i18n')] = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(function (el) { DEPH[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder'); });
  var lang = 'de';
  try { if (localStorage.getItem('mlu-lang') === 'en') lang = 'en'; } catch (e) {}

  function setLang(l, init) {
    lang = l; root.lang = l;
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); var v = l === 'en' ? EN[k] : DE[k];
      if (v != null) el.innerHTML = v;
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph'); el.setAttribute('placeholder', l === 'en' ? EN[k] : DEPH[k]);
    });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    try { localStorage.setItem('mlu-lang', l); } catch (e) {}
    renderCard(current, true);
    splitStatement();
    if (!init && window.ScrollTrigger) ScrollTrigger.refresh();
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* --------------------------------------------------------- faculty card */
  var current = 0;
  var card = $('.card');
  function renderCard(i, instant) {
    current = i;
    var f = FAC[i][lang], c = card;
    function fill() {
      $('.card__roman', c).textContent = ROMAN[i];
      $('.card__title', c).textContent = f[0];
      $('.card__list', c).innerHTML = f[1].map(function (s) { return '<li>' + s + '</li>'; }).join('');
      $('.card__place', c).textContent = FAC[i].addr;
    }
    if (instant) { fill(); return; }
    c.classList.add('is-swapping');
    setTimeout(function () { fill(); c.classList.remove('is-swapping'); }, 280);
  }
  $$('.drawer').forEach(function (d) {
    d.addEventListener('click', function () {
      var i = +d.dataset.fac; if (i === current) return;
      $$('.drawer').forEach(function (x) { x.classList.remove('is-open'); x.setAttribute('aria-selected', 'false'); });
      d.classList.add('is-open'); d.setAttribute('aria-selected', 'true');
      renderCard(i);
    });
  });

  /* ------------------------------------------------------ statement split */
  var stmt = $('.statement__text');
  function splitStatement() {
    if (!stmt || FIGMA) return;
    var txt = stmt.textContent.trim();
    stmt.innerHTML = txt.split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    paintWords();
  }
  function paintWords() {
    if (!stmt) return;
    var ws = $$('.w', stmt); if (!ws.length) return;
    var r = stmt.getBoundingClientRect(), vh = window.innerHeight;
    var p = (vh * 0.82 - r.top) / (r.height + vh * 0.38);
    p = Math.max(0, Math.min(1, p));
    var n = p * ws.length;
    ws.forEach(function (w, i) { var o = Math.max(0, Math.min(1, n - i)); w.style.opacity = (0.16 + o * 0.84).toFixed(3); });
  }

  /* ---------------------------------------------------------- odometer */
  var digits = $$('.odo__d');
  var placeEl = $('.odo__placetext');
  var ticks = $$('.odo__ticks li');
  function setYear(y, place, idx) {
    String(y).split('').forEach(function (d, i) { if (digits[i]) digits[i].style.transform = 'translateY(' + (-d) + 'em)'; });
    if (placeEl && placeEl.dataset.want !== place) {
      placeEl.dataset.want = place;
      if (window.gsap) {
        gsap.killTweensOf(placeEl);
        gsap.timeline().to(placeEl, { yPercent: -110, opacity: 0, duration: .3, ease: 'power2.in' })
          .add(function () { placeEl.textContent = placeEl.dataset.want; })
          .fromTo(placeEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'expo.out' });
      } else { placeEl.textContent = place; }
    }
    ticks.forEach(function (t, i) { t.classList.toggle('on', i <= idx); });
  }
  setYear(1502, 'Wittenberg', 0);

  /* ---------------------------------------------------------- nav + menu */
  var nav = $('.nav'), burger = $('.burger'), dock = $('.dock');
  var lastY = 0;
  function onScroll(y) {
    var hero = window.innerHeight * 0.82;
    nav.classList.toggle('is-solid', y > hero - 80);
    if (!nav.classList.contains('is-menu')) nav.classList.toggle('is-hidden', y > hero && y > lastY + 4);
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
    if (dock) dock.classList.toggle('is-on', y > hero && (document.body.scrollHeight - y - window.innerHeight) > 900);
    paintWords();
  }
  burger.addEventListener('click', function () {
    var open = !nav.classList.contains('is-menu');
    nav.classList.toggle('is-menu', open);
    burger.setAttribute('aria-expanded', String(open));
    $('.menu').setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  $$('.menu a').forEach(function (a) { a.addEventListener('click', function () { if (nav.classList.contains('is-menu')) burger.click(); }); });

  /* ------------------------------------------------------- smooth scroll */
  var lenis = null;
  if (!FIGMA && !REDUCED && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    window.__lenis = lenis;
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href'); if (id.length < 2) { e.preventDefault(); lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var t = $(id); if (!t) return; e.preventDefault();
      lenis ? lenis.scrollTo(t, { offset: id === '#leitbild' ? 0 : -40 }) : t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  setLang(lang, true);

  if (FIGMA) { $$('.count').forEach(function (c) { c.textContent = fmt(+c.dataset.to); }); return; }

  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) {
    root.classList.add('figma');
    window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
    var lo = $('.loader'); if (lo) lo.remove();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', function (e) { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  } else {
    window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
  }

  function fmt(n) { return lang === 'en' ? n.toLocaleString('en-GB') : n.toLocaleString('de-DE'); }

  /* --------------------------------------------------------- intro */
  var loader = $('.loader');
  var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  var circles = $$('.loader .draw');
  circles.forEach(function (c) { var L = c.getTotalLength(); c.style.strokeDasharray = L; c.style.strokeDashoffset = L; });
  var yr = { v: 1502 }, ly = $('.ly');
  tl.to(circles, { strokeDashoffset: 0, duration: 1.5, stagger: .12, ease: 'power2.inOut' }, 0)
    .to(yr, { v: 2026, duration: 1.5, ease: 'power3.inOut', onUpdate: function () { ly.textContent = Math.round(yr.v); } }, 0.1)
    .from('.loader__line', { opacity: 0, y: 10, duration: .8 }, 0.4)
    .to('.loader__inner', { opacity: 0, y: -20, duration: .6, ease: 'power2.in' }, 1.85)
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, 2.15)
    .fromTo('.hero__media', { scale: 1.16 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 2.2)
    .to('.hero__title .ln>span', { y: 0, yPercent: 0, duration: 1.4, stagger: .1 }, 2.55)
    .fromTo('.hero__eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.1 }, 2.6)
    .fromTo('.hero__lede', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 }, 2.85)
    .fromTo('.hero__ctas', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.2 }, 2.95)
    .fromTo('.hero__facts', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 3.05)
    .add(function () {
      loader.remove(); if (lenis) lenis.start();
      $$('.count').forEach(function (c) {
        var o = { v: 0 }, to = +c.dataset.to;
        gsap.to(o, { v: to, duration: to > 1000 ? 2.2 : 1.6, ease: 'power3.out', onUpdate: function () { c.textContent = fmt(Math.round(o.v)); } });
      });
    }, 3.0);
  $$('.hero__title .ln>span').forEach(function (s) { s.style.transform = 'translateY(105%)'; });

  /* --------------------------------------------------------- hero scroll */
  gsap.to('.hero__media', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__inner', { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  var heroImg = $('.hero__media img');
  if (window.matchMedia('(pointer:fine)').matches) {
    var qx = gsap.quickTo(heroImg, 'x', { duration: 1.6, ease: 'power3' }), qy = gsap.quickTo(heroImg, 'y', { duration: 1.6, ease: 'power3' });
    $('.hero').addEventListener('pointermove', function (e) {
      qx((e.clientX / window.innerWidth - .5) * -22); qy((e.clientY / window.innerHeight - .5) * -14);
    });
  }

  /* --------------------------------------------------------- reveals */
  var revealSel = ['.sec-head', '.seal', '.statement__sig', '.entry', '.finder__search', '.cabinet', '.card', '.step', '.foci li', '.armillary', '.cluster', '.arch', '.banner-wrap', '.values__body > *', '.gazette__mast', '.lead', '.briefs li', '.begin__body > *', '.begin__media', '.foot__word', '.foot__col'];
  revealSel.forEach(function (sel) {
    $$(sel).forEach(function (el) {
      if (el.closest('.hero')) return;
      el.classList.add('rv');
      gsap.to(el, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', delay: (el.matches('.briefs li, .foci li, .arch, .foot__col') ? ($$(sel).indexOf(el) % 4) * 0.08 : 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
  });

  /* --------------------------------------------------------- chronicle */
  $$('.entry').forEach(function (en, i) {
    ScrollTrigger.create({ trigger: en, start: 'top 55%', end: 'bottom 55%',
      onEnter: function () { setYear(en.dataset.year, en.dataset.place, i); },
      onEnterBack: function () { setYear(en.dataset.year, en.dataset.place, i); } });
    var img = $('.print img, .photo img', en);
    if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: en, start: 'top bottom', end: 'center center', scrub: true } });
  });

  /* --------------------------------------------------------- path */
  var frames = $$('.frame img');
  var steps = $$('.step');
  function setStep(i) {
    steps.forEach(function (s, j) { s.classList.toggle('is-on', j === i); });
    frames.forEach(function (f, j) {
      if (j === i) { f.classList.remove('was'); f.style.zIndex = 2; f.classList.add('is-on'); }
      else if (f.classList.contains('is-on')) { f.classList.remove('is-on'); f.classList.add('was'); f.style.zIndex = 1; setTimeout(function () { if (!f.classList.contains('is-on')) { f.classList.remove('was'); f.style.zIndex = 0; } }, 1150); }
    });
  }
  steps.forEach(function (s, i) {
    ScrollTrigger.create({ trigger: s, start: 'top 60%', end: 'bottom 60%', onEnter: function () { setStep(i); }, onEnterBack: function () { setStep(i); } });
  });
  setStep(0);

  /* --------------------------------------------------------- armillary */
  var arm = $('.arm');
  if (arm && window.matchMedia('(pointer:fine)').matches) {
    $('.research').addEventListener('pointermove', function (e) {
      var r = arm.getBoundingClientRect();
      arm.style.setProperty('--ry', ((e.clientX - (r.left + r.width / 2)) / window.innerWidth * 30).toFixed(2) + 'deg');
      arm.style.setProperty('--rx', ((e.clientY - (r.top + r.height / 2)) / window.innerHeight * -16).toFixed(2) + 'deg');
    });
  }
  gsap.fromTo('.arm__stage', { scale: .86, rotate: -8 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.orrery', start: 'top bottom', end: 'center center', scrub: true } });

  /* --------------------------------------------------------- arches + begin */
  $$('.arch img').forEach(function (img, i) {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.fromTo('.begin__media img', { scale: 1 }, { scale: 1.28, ease: 'none', scrollTrigger: { trigger: '.begin', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.cluster__img img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.cluster', start: 'top bottom', end: 'center center', scrub: true } });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();

/* MLU Halle-Wittenberg landing page · v2 */
(function () {
  'use strict';
  var root = document.documentElement;
  var FIGMA = root.classList.contains('figma');
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var mqMobile = window.matchMedia('(max-width: 760px)');
  var isMobile = function () { return mqMobile.matches; };

  /* ------------------------------------------------------------------ data */
  var FAC = [
    { latin: 'Theologia', addr: 'Franckeplatz 1, Haus 30',
      de: { n: 'Theologische Fakultät', d: 'Theologie in der Tradition Luthers und Melanchthons, mitten im barocken Ensemble der Franckeschen Stiftungen.', p: [['Evangelische Theologie', 'Kirchliches Examen'], ['Evangelische Religion', 'Lehramt']] },
      en: { n: 'Faculty of Theology', d: 'Theology in the tradition of Luther and Melanchthon, at the heart of the Baroque ensemble of the Francke Foundations.', p: [['Protestant Theology', 'Church examination'], ['Protestant Religion', 'Teacher training']] } },
    { latin: 'Ius', addr: 'Universitätsplatz 10 a',
      de: { n: 'Juristische und Wirtschaftswissenschaftliche Fakultät', d: 'Recht und Wirtschaft im historischen Herzen der Universität, direkt am Universitätsplatz.', p: [['Rechtswissenschaft', 'Staatsexamen'], ['Betriebswirtschaftslehre', 'Bachelor'], ['Volkswirtschaftslehre', 'Bachelor'], ['Wirtschaftsinformatik', 'Bachelor']] },
      en: { n: 'Faculty of Law and Economics', d: 'Law and economics in the historic heart of the university, right on Universitätsplatz.', p: [['Law', 'State examination'], ['Business Administration', 'Bachelor'], ['Economics', 'Bachelor'], ['Business Informatics', 'Bachelor']] } },
    { latin: 'Medicina', addr: 'Magdeburger Straße 8',
      de: { n: 'Medizinische Fakultät', d: 'Medizin am Universitätsklinikum Halle, mit dem Dorothea Erxleben Lernzentrum für praktisches Training.', p: [['Humanmedizin', 'Staatsexamen'], ['Zahnmedizin', 'Staatsexamen'], ['Evidenzbasierte Pflege', 'Bachelor']] },
      en: { n: 'Faculty of Medicine', d: 'Medicine at Halle University Hospital, with the Dorothea Erxleben Learning Centre for practical training.', p: [['Medicine', 'State examination'], ['Dentistry', 'State examination'], ['Evidence-based Nursing', 'Bachelor']] } },
    { latin: 'Historia', addr: 'Emil-Abderhalden-Straße 6',
      de: { n: 'Philosophische Fakultät I', d: 'Geschichte, Gesellschaft und Philosophie: Fächer, die verstehen wollen, wie wir wurden, wer wir sind.', p: [['Geschichte', 'Bachelor'], ['Politikwissenschaft', 'Bachelor'], ['Soziologie', 'Bachelor'], ['Philosophie', 'Bachelor']] },
      en: { n: 'Faculty of Philosophy I', d: 'History, society and philosophy: subjects that ask how we became who we are.', p: [['History', 'Bachelor'], ['Political Science', 'Bachelor'], ['Sociology', 'Bachelor'], ['Philosophy', 'Bachelor']] } },
    { latin: 'Litterae', addr: 'Universitätsring 4',
      de: { n: 'Philosophische Fakultät II', d: 'Sprachen, Literaturen, Medien und Musik im lebendigen Dialog zwischen Tradition und Gegenwart.', p: [['Germanistik', 'Bachelor'], ['Anglistik und Amerikanistik', 'Bachelor'], ['Medien- und Kommunikationswissenschaft', 'Bachelor'], ['Musikwissenschaft', 'Bachelor']] },
      en: { n: 'Faculty of Philosophy II', d: 'Languages, literatures, media and music in a living dialogue between tradition and the present.', p: [['German Studies', 'Bachelor'], ['English and American Studies', 'Bachelor'], ['Media and Communication', 'Bachelor'], ['Musicology', 'Bachelor']] } },
    { latin: 'Paedagogia', addr: 'Franckeplatz 1, Haus 3',
      de: { n: 'Philosophische Fakultät III', d: 'Die Ausbildung von Lehrerinnen und Lehrern, in der Tradition des Pädagogen August Hermann Francke.', p: [['Erziehungswissenschaft', 'Bachelor'], ['Lehramt an Grundschulen', 'Staatsexamen'], ['Lehramt an Förderschulen', 'Staatsexamen']] },
      en: { n: 'Faculty of Philosophy III', d: 'Educating teachers in the tradition of the pedagogue August Hermann Francke.', p: [['Educational Science', 'Bachelor'], ['Primary School Teaching', 'State examination'], ['Special Needs Teaching', 'State examination']] } },
    { latin: 'Biologia', addr: 'Kurt-Mothes-Straße 3',
      de: { n: 'Naturwissenschaftliche Fakultät I', d: 'Biologie, Biochemie und Pharmazie: das Leben verstehen, von der Zelle bis zum Ökosystem.', p: [['Biologie', 'Bachelor'], ['Biochemie', 'Bachelor'], ['Pharmazie', 'Staatsexamen']] },
      en: { n: 'Faculty of Natural Sciences I', d: 'Biology, biochemistry and pharmacy: understanding life, from the cell to the ecosystem.', p: [['Biology', 'Bachelor'], ['Biochemistry', 'Bachelor'], ['Pharmacy', 'State examination']] } },
    { latin: 'Physica', addr: 'Von-Danckelmann-Platz 3',
      de: { n: 'Naturwissenschaftliche Fakultät II', d: 'Chemie, Physik und Mathematik, beteiligt am Exzellenzcluster Center for Chiral Electronics.', p: [['Chemie', 'Bachelor'], ['Physik', 'Bachelor'], ['Mathematik', 'Bachelor']] },
      en: { n: 'Faculty of Natural Sciences II', d: 'Chemistry, physics and mathematics, part of the Cluster of Excellence Center for Chiral Electronics.', p: [['Chemistry', 'Bachelor'], ['Physics', 'Bachelor'], ['Mathematics', 'Bachelor']] } },
    { latin: 'Terra', addr: 'Von-Seckendorff-Platz 3',
      de: { n: 'Naturwissenschaftliche Fakultät III', d: 'Agrar- und Ernährungswissenschaften, Geowissenschaften und Informatik für die Fragen der Zukunft.', p: [['Informatik', 'Bachelor'], ['Geographie', 'Bachelor'], ['Agrarwissenschaften', 'Bachelor'], ['Ernährungswissenschaften', 'Bachelor']] },
      en: { n: 'Faculty of Natural Sciences III', d: 'Agricultural and nutritional sciences, earth sciences and computer science for the questions of the future.', p: [['Computer Science', 'Bachelor'], ['Geography', 'Bachelor'], ['Agricultural Sciences', 'Bachelor'], ['Nutritional Sciences', 'Bachelor']] } }
  ];
  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  var ROMAN_L = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii'];

  var EN = {
    'be.lede2': 'Find your degree programme in seconds and apply online.',
    'be.p1': 'degree programmes',
    'be.p2': 'faculties',
    'be.p3': 'partner universities',
    'be.ft': 'Find your programme',
    'be.deg': 'Degree',
    'be.ph': 'Subject or interest, e.g. Biology',
    'be.go': 'Show matching programmes',
    'be.tel': 'Student advisory',
    'np.ear1': 'Halle (Saale) edition',
    'np.ear2': 'Since 1502',
    'np.dl': 'News from Martin Luther University Halle-Wittenberg',
    'np.k1': 'Research · Spintronics',
    'np.h1': 'Researchers describe a new type of atomic oscillation',
    'np.cap1': 'In the lab: research on new materials for electronics',
    'np.b1': 'Researchers at Martin Luther University Halle-Wittenberg have described a new type of atomic oscillation. The findings matter for spintronics, a field that aims to use the spin of electrons for energy-efficient electronics. With the Cluster of Excellence Center for Chiral Electronics, Halle is one of the centres of this research in Germany.',
    'np.sec': 'From the university',
    'np.h2': '90 new Deutschlandstipendium scholarships',
    'np.b2': '90 students at the University of Halle receive a Deutschlandstipendium. The certificates will be presented at a ceremony on 24 November.',
    'np.h3': 'Research for practice: MLU awards transfer prizes',
    'np.b3': 'With its transfer prizes, the university honours research that finds its way into practice. Awards are made in five categories.',
    'np.h4': 'Competence centre for digital teaching',
    'np.b4': 'MLU is building a state-wide competence centre that supports teachers in Saxony-Anhalt with digital teaching.',
    'np.box': 'MLU in figures',
    'np.f1': 'students',
    'np.f2': 'international students',
    'np.f3': 'professorships',
    'np.f4': 'faculties',
    'np.f5': 'partner universities',
    'fn8': 'Faculty of Natural Sciences III',
    'fn7': 'Faculty of Natural Sciences II',
    'fn6': 'Faculty of Natural Sciences I',
    'fn5': 'Faculty of Philosophy III',
    'fn4': 'Faculty of Philosophy II',
    'fn3': 'Faculty of Philosophy I',
    'fn2': 'Faculty of Medicine',
    'fn1': 'Faculty of Law and Economics',
    'fn0': 'Faculty of Theology',
    'li.all': 'All degree programmes at a glance',
    'le.from': 'General Student Advisory · Universitätsplatz 10 · 06108 Halle (Saale)',
    'le.regards': 'With warm regards',
    'nav.study': 'Study', 'nav.research': 'Research', 'nav.history': 'History', 'nav.halle': 'Halle', 'nav.intl': 'International', 'nav.apply': 'Apply',
    'cta.apply': 'Apply now', 'cta.find': 'Find your programme', 'cta.advice': 'Student advisory',
    'hero.eyebrow': 'Martin Luther University Halle-Wittenberg', 'hero.since': 'Since 1502', 'hero.w1': 'Creating', 'hero.w2': 'knowledge.',
    'hero.lede': 'More than 150 degree programmes, nine faculties and a tradition that reaches from Wittenberg to Halle.', 'hero.cue': 'Step inside',
    'hero.in1': 'Welcome', 'hero.in2': 'Step inside.',
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
    'li.eyebrow': 'Study', 'li.title': 'Nine faculties. Choose your volume.', 'li.lede': 'More than 150 undergraduate and almost 80 graduate programmes. Take a volume from the shelf and open it.',
    'li.hint': 'Click to open', 'li.close': 'Close the book', 'fi.label': 'Search programmes', 'fi.ph': 'Subject, degree or interest',
    'le.eyebrow': 'Admission', 'le.title': 'A letter from Halle, for you.', 'le.lede': 'Four steps stand between you and your first semester. Student advisory accompanies you through every one of them.',
    'le.date': 'Halle (Saale), November 2026', 'le.salut': 'Dear future student,', 'le.intro': 'four steps stand between you and your first semester at one of Germany\u2019s oldest universities. We are glad to accompany you through every one of them.',
    'le.to': 'To you', 'le.bye': 'We look forward to welcoming you to Halle.', 'le.sig': 'Your General Student Advisory Service',
    's1.t': 'Explore.', 's1.p': 'Browse the <a href="https://studienangebot.uni-halle.de/" target="_blank" rel="noopener">programme catalogue</a> and get to know us at the Open Day, the Long Night of Science or online.', 's1.a': 'Orientation events',
    's2.t': 'Get advice.', 's2.p': '<a href="http://studienberatung.verwaltung.uni-halle.de/" target="_blank" rel="noopener">Student advisory</a> answers your questions about subjects, admission and organising your studies.', 's2.a': 'Student advisory',
    's3.t': 'Apply.', 's3.p': 'Applications and enrolment are handled <a href="http://immaamt.verwaltung.uni-halle.de/bewerbung/" target="_blank" rel="noopener">online by the Registrar\u2019s Office</a>. Deadlines and documents depend on your programme.',
    's4.t': 'Arrive.', 's4.p': 'The <a href="https://www.mlu.de/welcome" target="_blank" rel="noopener">Welcome Portal</a> helps you with housing, formalities and your first days in Halle.', 's4.a': 'Welcome Portal',
    're.eyebrow': 'Research', 're.title': 'Excellent in research, strong for the region.', 're.p2': 'Sustainability', 're.p3': 'Cultures of knowledge and education',
    'r1': 'Plurality, participation, enlightenment', 'r2': 'Health and society in transformation', 'r3': 'From the plant to the macromolecule', 'r4': 'From mineral raw materials to nanoelectronics',
    'pl.t1': 'Plate I', 'pl.t2': 'Plate II', 'pl.t3': 'Plate III', 'pl.t4': 'Plate IV', 'pl.m1': 'Drawn yesterday.', 'pl.m2': 'Measured today.',
    're.d1': 'Halle was a cradle of the German Enlightenment. Today research asks how we can live together in diversity.',
    're.d2': 'From heart muscle to nursing care: research for a society that is growing older and more diverse.',
    're.d3': 'Plants, proteins and polymers: the building blocks of the future, studied from the leaf to the molecule.',
    're.d4': 'New materials for energy-efficient electronics, in the Cluster of Excellence Center for Chiral Electronics.',
    'ci.eyebrow': 'Location', 'ci.title': 'Halle on the Saale.', 'ci.lede': 'Around one of the most beautiful university squares in Europe lies a city with more than 1,200 years of history, short distances and green riverbanks along the Saale.',
    'ci.walk': 'A walk through the city',
    'v1.t': 'Giebichenstein Castle', 'v1.p': 'The Saale, Peißnitz island and the riverbank: nature starts right outside the lecture hall.',
    'v2.t': 'The market square', 'v2.p': 'The Red Tower and the Marktkirche: the heart of a city with more than 1,200 years of history.',
    'v3.t': 'Francke Foundations', 'v3.p': 'A Baroque ensemble and home to theology and educational sciences.',
    'v4.t': 'Universitätsplatz', 'v4.p': 'One of the most beautiful university squares in Europe, with the Löwengebäude.',
    'va.eyebrow': 'Open to the world', 'va.title': 'The University of Halle stands for democracy, diversity, tolerance and open-mindedness.',
    'va.s1': 'international students', 'va.s2': 'partner universities worldwide', 'va.s3': 'universities in the Central German University Alliance: Halle, Jena, Leipzig', 'va.hint': 'Turn the globe',
    'ne.m1': 'News from the university', 'ne.date': 'Monday, 23 November 2026', 'ne.m3': 'Halle (Saale)', 'ne.m4': 'Martin Luther University Halle-Wittenberg',
    'ne.k1': 'Research', 'ne.k2': 'Transfer', 'ne.k3': 'Teaching', 'ne.k4': 'Study', 'ne.read': 'Read the story', 'ne.all': 'All news',
    'ne.h1': 'Spintronics: researchers describe a new type of atomic oscillation',
    'ne.h2': 'Research for practice: MLU awards its transfer prizes',
    'ne.h3': 'Digital teaching: MLU builds a state-wide competence centre for teachers',
    'ne.h4': '90 new Deutschlandstipendium scholarships for students in Halle',
    'ne.h5': 'Chiral electronics: researchers find a disruptive interlayer in a promising material system',
    'be.eyebrow': 'Your studies', 'be.title': 'Your chapter begins in Halle.', 'be.lede': 'Choose your next step. We will guide you from your first idea to enrolment.',
    'be.r1': 'Browse the programmes', 'be.r2': 'Contact student advisory', 'be.r3': 'Apply online', 'be.cue': 'The door opens',
    'fo.addr': 'Address', 'fo.l1': 'Degree programmes', 'fo.l3': 'Application and enrolment', 'fo.uni': 'University', 'fo.u1': 'Faculties', 'fo.u3': 'Careers', 'fo.u4': 'Press',
    'fo.follow': 'Follow', 'fo.imp': 'Imprint', 'fo.dsg': 'Privacy', 'fo.bf': 'Accessibility', 'fo.motto': 'Creating knowledge. Since 1502.'
  };
  var UI = {
    de: { fac: 'Fakultät', sel: 'Ausgewählte Studiengänge', all: 'Studiengänge ansehen', adv: 'Fachstudienberatung' },
    en: { fac: 'Faculty', sel: 'Selected programmes', all: 'View programmes', adv: 'Subject advisory' }
  };

  /* ------------------------------------------------------------------ i18n */
  var DE = {}, DEPH = {};
  $$('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in DE)) DE[k] = el.innerHTML; });
  $$('[data-i18n-ph]').forEach(function (el) { DEPH[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder'); });
  var lang = 'de';
  try { if (localStorage.getItem('mlu-lang') === 'en') lang = 'en'; } catch (e) {}

  function setLang(l, init) {
    lang = l; root.lang = l;
    $$('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); var v = l === 'en' ? EN[k] : DE[k]; if (v != null) el.innerHTML = v; });
    $$('[data-i18n-ph]').forEach(function (el) { var k = el.getAttribute('data-i18n-ph'); el.setAttribute('placeholder', l === 'en' ? EN[k] : DEPH[k]); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    try { localStorage.setItem('mlu-lang', l); } catch (e) {}
    shelfLabel(hoverIdx);
    if (reader.classList.contains('is-open')) fillSpread(cur);
    splitStatement();
    if (!init) { sizePortal(); if (window.ScrollTrigger) ScrollTrigger.refresh(); }
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.lang); }); });

  /* ------------------------------------------------------------------ portal sizing */
  var stage = $('.portal__stage');
  function sizePortal() {
    var W = window.innerWidth, H = window.innerHeight, mob = W < 761;
    var fw = Math.max(W, H * (mob ? 0.6 : 0.7) * 16 / 9), fh = fw * 9 / 16;
    var OG = root.classList.contains('og');
    var minSky = OG ? 64 : (mob ? H * 0.36 : Math.max(120, H * 0.14));
    var ft = Math.max(minSky, H - fh);
    var navH = OG ? 10 : (mob ? 72 : 92);
    var avail = ft + fh * 0.183 - navH - (mob ? 56 : 48);
    var fs = mob ? Math.min(W * 0.21, avail / 1.75) : Math.min(W * 0.108, avail / 0.84);
    stage.style.setProperty('--ft', ft + 'px');
    stage.style.setProperty('--fw', fw + 'px');
    stage.style.setProperty('--fh', fh + 'px');
    stage.style.setProperty('--fs', Math.max(40, fs) + 'px');
    stage.dataset.doorY = ft + fh * 0.6985;
    stage._g = { W: W, H: H, ft: ft, fw: fw, fh: fh };
    if (stage._render) stage._render();
  }
  sizePortal();

  /* ------------------------------------------------------------------ statement */
  var stmt = $('.statement__text');
  function splitStatement() {
    if (!stmt || FIGMA) return;
    stmt.innerHTML = stmt.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    paintWords();
  }
  function paintWords() {
    if (!stmt) return;
    var ws = $$('.w', stmt); if (!ws.length) return;
    var r = stmt.getBoundingClientRect(), vh = window.innerHeight;
    if (r.bottom < -200 || r.top > vh + 200) return;
    var p = Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (r.height + vh * 0.38))), n = p * ws.length;
    ws.forEach(function (w, i) { var o = Math.max(0, Math.min(1, n - i)); w.style.opacity = (0.16 + o * 0.84).toFixed(3); });
  }

  /* ------------------------------------------------------------------ odometer */
  var digits = $$('.odo__d'), placeEl = $('.odo__placetext'), ticks = $$('.odo__ticks li');
  function setYear(y, place, idx) {
    String(y).split('').forEach(function (d, i) { if (digits[i]) digits[i].style.transform = 'translateY(' + (-d) + 'em)'; });
    if (placeEl && placeEl.dataset.want !== place) {
      placeEl.dataset.want = place;
      if (window.gsap) {
        gsap.killTweensOf(placeEl);
        gsap.timeline().to(placeEl, { yPercent: -110, opacity: 0, duration: .3, ease: 'power2.in' })
          .add(function () { placeEl.textContent = placeEl.dataset.want; })
          .fromTo(placeEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'expo.out' });
      } else placeEl.textContent = place;
    }
    ticks.forEach(function (t, i) { t.classList.toggle('on', i <= idx); });
  }
  setYear(1502, 'Wittenberg', 0);

  /* ------------------------------------------------------------------ library */
  var shelf = $('.shelf'), spines = $$('.spine'), fxs = $$('.fx');
  var hoverIdx = 0;
  function shelfLabel(i) {
    hoverIdx = i;
    var no = $('.shelf__no'), nm = $('.shelf__name');
    if (no) no.textContent = ROMAN[i];
    if (nm) nm.textContent = FAC[i][lang].n;
  }
  function hot(i) {
    shelf.classList.toggle('is-hot', i >= 0);
    spines.forEach(function (s, j) { s.classList.toggle('is-hot', j === i); });
    fxs.forEach(function (f, j) { f.classList.toggle('is-hot', j === i); });
    if (i >= 0) shelfLabel(i);
  }
  spines.concat(fxs).forEach(function (el) {
    var i = +el.dataset.fac;
    el.addEventListener('mouseenter', function () { hot(i); });
    el.addEventListener('focus', function () { hot(i); });
    el.addEventListener('mouseleave', function () { hot(-1); });
    el.addEventListener('blur', function () { hot(-1); });
    el.addEventListener('click', function () { openReader(i); });
  });

  var reader = $('.reader'), tome = $('.tome'), leaf = $('.leaf'), flyer = $('.flyer'), bcover = $('.bcover'), thumbs = $('.thumbs');
  var cur = 0, busy = false;
  thumbs.innerHTML = ROMAN.map(function (r, i) { return '<li><button type="button" data-t="' + i + '" aria-label="' + r + '">' + r + '</button></li>'; }).join('');
  $$('button', thumbs).forEach(function (b) { b.addEventListener('click', function () { var t = +b.dataset.t; if (t !== cur) flip(t > cur ? 1 : -1, t); }); });
  function leftHTML(i) {
    var f = FAC[i][lang], u = UI[lang];
    return '<p class="pg__kick">' + u.fac + ' ' + ROMAN[i] + '</p>' +
      '<h3 class="pg__title">' + f.n + '</h3><p class="pg__latin">' + FAC[i].latin + '</p>' +
      '<svg class="pg__fl"><use href="#fleuron"/></svg>' +
      '<p class="pg__sub">' + u.sel + '</p><ol class="toc">' +
      f.p.map(function (p) { return '<li><span>' + p[0] + '</span><i></i><em>' + p[1] + '</em></li>'; }).join('') + '</ol>' +
      '<p class="pg__addr"><svg class="ic"><use href="#i-pin"/></svg>' + FAC[i].addr + '</p>' +
      '<p class="pg__folio">' + ROMAN_L[i * 2] + '</p>';
  }
  function rightHTML(i) {
    var f = FAC[i][lang], u = UI[lang];
    return '<img class="pg__emb" src="assets/img/em-' + i + '.png" alt="">' +
      '<p class="pg__desc">' + f.d + '</p>' +
      '<div class="pg__ctas"><a class="btn btn--forest" href="https://studienangebot.uni-halle.de/" target="_blank" rel="noopener"><span>' + u.all + '</span><svg class="ic"><use href="#i-arrow"/></svg></a>' +
      '<a class="tlink" href="https://studienangebot.uni-halle.de/fachstudienberatung" target="_blank" rel="noopener"><span>' + u.adv + '</span><svg class="ic"><use href="#i-arrow"/></svg></a></div>' +
      '<p class="pg__folio">' + ROMAN_L[i * 2 + 1] + '</p>';
  }
  function fillSpread(i) {
    cur = i;
    if (isMobile()) {
      $('.pr').innerHTML = leftHTML(i).replace(/<p class="pg__folio">.*?<\/p>/, '') + '<div class="pg__gap"></div>' + rightHTML(i).replace(/<p class="pg__folio">.*?<\/p>/, '');
    } else {
      $('.pl').innerHTML = leftHTML(i);
      $('.pr').innerHTML = rightHTML(i);
    }
    $('.bcover__latin').textContent = FAC[i].latin;
    $('.bcover__roman').textContent = ROMAN[i];
    $$('button', thumbs).forEach(function (b, j) { b.classList.toggle('is-on', j === i); });
    var pv = $('.reader__prev'), nx = $('.reader__next'), u = UI[lang];
    pv.disabled = i === 0; nx.disabled = i === FAC.length - 1;
    $('span', pv).textContent = i > 0 ? u.fac + ' ' + ROMAN[i - 1] : '';
    $('span', nx).textContent = i < FAC.length - 1 ? u.fac + ' ' + ROMAN[i + 1] : '';
  }
  var cov = { a: 0 }, openTl = null;
  function setCover(a) {
    cov.a = a;
    gsap.set(bcover, { rotationY: -a });
    var reveal = a <= 90 ? 49.5 : Math.max(0, 49.5 - 49.5 * Math.sin((a - 90) * Math.PI / 180));
    gsap.set('.tome__img', { clipPath: 'inset(0% 0% 0% ' + reveal.toFixed(2) + '%)' });
    bcover.style.visibility = a >= 179.5 ? 'hidden' : '';
  }
  function openReader(i) {
    if (busy || !window.gsap) return;
    busy = true; hot(-1);
    var mob = isMobile(), sp = spines[i];
    fillSpread(i);
    spines.forEach(function (x) { x.classList.remove('is-taken'); });
    sp.classList.add('is-taken');
    reader.classList.add('is-open'); reader.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
    gsap.set('.reader__nav, .reader__close', { opacity: 0 });
    gsap.set('.pg .page__in > *, .thumbs li', { opacity: 0 });
    gsap.set('.reader__desk', { scale: 1.1 });
    gsap.set(tome, { y: -70, scale: 1.05, rotationX: 0 });
    if (mob) { bcover.style.visibility = 'hidden'; } else { setCover(0); }
    var tl = openTl = gsap.timeline({ onComplete: function () { busy = false; openTl = null; $('.reader__next').focus({ preventScroll: true }); } });
    tl.to('.reader__backdrop', { opacity: 1, duration: .7, ease: 'power2.out' }, 0)
      .to('.reader__desk', { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .to(tome, { y: 0, scale: 1, duration: 1.1, ease: 'expo.out' }, .2);
    if (!mob) {
      tl.to(cov, { a: 180, duration: 1.5, ease: 'power2.inOut', onUpdate: function () { setCover(cov.a); } }, 1.05)
        .to('.thumbs li', { opacity: 1, duration: .45, stagger: .035 }, 2.45)
        .to('.pg .page__in > *', { opacity: 1, duration: .7, stagger: .05, ease: 'power1.out' }, 2.4)
        .to('.reader__nav, .reader__close', { opacity: 1, duration: .5 }, 2.7);
    } else {
      tl.to('.pg .page__in > *', { opacity: 1, duration: .6, stagger: .04 }, .8)
        .to('.reader__nav, .reader__close', { opacity: 1, duration: .5 }, 1.1);
    }
  }
  function closeReader() {
    if (!reader.classList.contains('is-open')) return;
    if (openTl) { openTl.progress(1); openTl = null; busy = false; }
    if (busy) return;
    busy = true;
    var mob = isMobile();
    var tl = gsap.timeline({ onComplete: function () {
      reader.classList.remove('is-open'); reader.setAttribute('aria-hidden', 'true');
      bcover.style.visibility = ''; leaf.style.display = 'none';
      spines.forEach(function (x) { x.classList.remove('is-taken'); });
      busy = false; if (lenis) lenis.start(); spines[cur].focus({ preventScroll: true });
    } });
    tl.to('.reader__nav, .reader__close, .thumbs li', { opacity: 0, duration: .25 }, 0)
      .to('.pg .page__in > *', { opacity: 0, duration: .3 }, 0);
    if (!mob) {
      tl.add(function () { $('.bcover__latin').textContent = FAC[cur].latin; $('.bcover__roman').textContent = ROMAN[cur]; }, 0)
        .to(cov, { a: 0, duration: 1.05, ease: 'power2.inOut', onUpdate: function () { setCover(cov.a); } }, .2);
    }
    tl.to(tome, { y: -60, scale: 1.04, duration: .55, ease: 'power2.in' }, mob ? .2 : 1.2)
      .to('.reader__backdrop', { opacity: 0, duration: .5 }, mob ? .45 : 1.45)
      .to({}, { duration: .15 }, mob ? .8 : 1.8);
  }
  var PAGE = { l: [.065, .022, .429, .797], r: [.506, .022, .42, .797] };
  function pageRect(side) { var t = tome.getBoundingClientRect(), p = PAGE[side]; return { l: p[0] * t.width, t: p[1] * t.height, w: p[2] * t.width, h: p[3] * t.height, tw: t.width, th: t.height }; }
  function faceBg(face, r) { face.style.backgroundImage = 'url(assets/img/book-open.webp)'; face.style.backgroundSize = r.tw + 'px ' + r.th + 'px'; face.style.backgroundPosition = (-r.l) + 'px ' + (-r.t) + 'px'; }
  function textBox(face, side, r) {
    var pg = $(side === 'l' ? '.pg--l' : '.pg--r').getBoundingClientRect(), t = tome.getBoundingClientRect(), inn = $('.page__in', face);
    inn.style.left = (pg.left - t.left - r.l) + 'px'; inn.style.top = (pg.top - t.top - r.t) + 'px'; inn.style.width = pg.width + 'px'; inn.style.height = pg.height + 'px';
  }
  function flip(dir, target) {
    var nxt = target != null ? target : cur + dir;
    if (busy || nxt < 0 || nxt >= FAC.length || nxt === cur) return;
    busy = true;
    if (isMobile()) {
      gsap.timeline({ onComplete: function () { busy = false; } })
        .to('.pr', { opacity: 0, x: -30 * dir, duration: .3 })
        .add(function () { fillSpread(nxt); $('.pg--r .page__in').scrollTop = 0; })
        .fromTo('.pr', { x: 30 * dir }, { opacity: 1, x: 0, duration: .45, ease: 'power3.out' });
      return;
    }
    var src = pageRect(dir > 0 ? 'r' : 'l'), dst = pageRect(dir > 0 ? 'l' : 'r');
    var front = $('.leaf__front'), back = $('.leaf__back');
    leaf.style.left = src.l + 'px'; leaf.style.top = src.t + 'px'; leaf.style.width = src.w + 'px'; leaf.style.height = src.h + 'px';
    leaf.style.transformOrigin = dir > 0 ? '0 50%' : '100% 50%';
    faceBg(front, src); faceBg(back, dst);
    back.style.backgroundPosition = (-dst.l) + 'px ' + (-dst.t) + 'px';
    textBox(front, dir > 0 ? 'r' : 'l', src); textBox(back, dir > 0 ? 'l' : 'r', dst);
    var fIn = $('.page__in', front), bIn = $('.page__in', back);
    if (dir > 0) {
      fIn.innerHTML = $('.pr').innerHTML; bIn.innerHTML = leftHTML(nxt);
      $('.pr').innerHTML = rightHTML(nxt);
      bIn.style.left = (dst.w - (parseFloat(bIn.style.left) + parseFloat(bIn.style.width))) + 'px';
    } else {
      fIn.innerHTML = $('.pl').innerHTML; bIn.innerHTML = rightHTML(nxt);
      $('.pl').innerHTML = leftHTML(nxt);
    }
    back.style.backgroundPosition = (-dst.l) + 'px ' + (-dst.t) + 'px';
    leaf.style.display = 'block';
    $$('button', thumbs).forEach(function (b, j) { b.classList.toggle('is-on', j === nxt); });
    gsap.fromTo(leaf, { rotationY: 0 }, { rotationY: dir > 0 ? -180 : 180, duration: 1.15, ease: 'power2.inOut', onComplete: function () {
      fillSpread(nxt); leaf.style.display = 'none'; gsap.set(leaf, { rotationY: 0 }); busy = false;
    } });
  }
  $('.reader__close').addEventListener('click', closeReader);
  $('.reader__backdrop').addEventListener('click', closeReader);
  $('.reader__prev').addEventListener('click', function () { flip(-1); });
  $('.reader__next').addEventListener('click', function () { flip(1); });
  document.addEventListener('keydown', function (e) {
    if (!reader.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeReader();
    if (e.key === 'ArrowRight') flip(1);
    if (e.key === 'ArrowLeft') flip(-1);
  });

  /* ------------------------------------------------------------------ nav + menu */
  var nav = $('.nav'), burger = $('.burger'), dock = $('.dock'), lastY = 0;
  function onScroll(y) {
    nav.classList.toggle('is-solid', y > 40);
    if (!nav.classList.contains('is-menu')) {
      if (y > window.innerHeight * 0.6 && y > lastY + 4) nav.classList.add('is-hidden');
      if (y < lastY - 4 || y < 60) nav.classList.remove('is-hidden');
    }
    lastY = y;
    if (dock) { var gt = document.querySelector('.gate'); dock.classList.toggle('is-on', y > window.innerHeight * 2.2 && (!gt || y < gt.offsetTop - window.innerHeight * .6)); }
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

  /* ------------------------------------------------------------------ smooth scroll */
  var lenis = null;
  if (!FIGMA && !REDUCED && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    window.__lenis = lenis;
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href'), t = id.length > 1 ? $(id) : null;
      if (id === '#top' || id === '#') { e.preventDefault(); lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (!t) return; e.preventDefault();
      lenis ? lenis.scrollTo(t, { offset: 0 }) : t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  setLang(lang, true);
  shelfLabel(0);

  if (FIGMA) return;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) {
    root.classList.add('figma');
    window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', function (e) { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });
  }
  var mm = gsap.matchMedia();

  /* ------------------------------------------------------------------ I. portal */
  var facade = $('.portal__facade'), aula = $('.portal__aula img'), fimg = $('.portal__facade img');
  var cvs = document.createElement('canvas'); cvs.className = 'portal__canvas'; cvs.setAttribute('aria-hidden', 'true');
  facade.parentNode.insertBefore(cvs, facade);
  var ctx = cvs.getContext('2d'), inscr = $('.portal__inscr');
  stage.insertBefore(inscr, facade.nextSibling);
  root.classList.add('has-canvas');
  var intro = { z: 1.06 };
  function sizeCanvas() {
    var g = stage._g; if (!g) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cvs.width = Math.round(g.W * dpr); cvs.height = Math.round(g.H * dpr);
    cvs._dpr = dpr;
  }
  gsap.timeline({ delay: .15, defaults: { ease: 'expo.out' } })
    .to(intro, { z: 1, duration: 2.4, onUpdate: function () { renderDoor(); } }, 0)
    .to('.portal__title .pw>span', { yPercent: 0, y: 0, duration: 1.6, stagger: .12 }, 0.25)
    .fromTo('.portal__eyebrow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1.2 }, 0.6)
    .fromTo('.portal__base', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2 }, 0.8);
  var door = { p: 0 }, aulaWrap = $('.portal__aula');
  var DOOR = { x0: .4609, x1: .5378, y0: .5856, y1: .8125, ox: .499, oy: .6985 };
  var doorsEl = $('.portal__doors'), leafL = $('.pd--l'), leafR = $('.pd--r');
  function renderDoor() {
    var g = stage._g; if (!g) return;
    if (!cvs._dpr || cvs.width !== Math.round(g.W * Math.min(window.devicePixelRatio || 1, 2))) sizeCanvas();
    var p = door.p, ease = function (t) { return t * t * (3 - 2 * t); };
    var s = (1 + 15 * Math.pow(p, 2.3)) * intro.z;
    var shift = (g.H / 2 - (g.ft + g.fh * DOOR.oy)) * ease(Math.min(1, p * 1.6));
    var L = g.W / 2 - g.fw / 2, ox = DOOR.ox * g.fw, oy = DOOR.oy * g.fh;
    var mapX = function (fx) { return L + ox + (fx * g.fw - ox) * s; };
    var mapY = function (fy) { return g.ft + shift + oy + (fy * g.fh - oy) * s; };
    var dx0 = mapX(DOOR.x0), dx1 = mapX(DOOR.x1), dy0 = mapY(DOOR.y0), dy1 = mapY(DOOR.y1);
    var t = Math.max(0, dy0), b = Math.max(0, g.H - dy1), l = Math.max(0, dx0), r = Math.max(0, g.W - dx1);
    /* facade drawn into a viewport-sized canvas: only the visible part is ever rasterised */
    var d = cvs._dpr || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    if (p < .97 && fimg.complete && fimg.naturalWidth) {
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      var X0 = mapX(0), Y0 = mapY(0), X1 = mapX(1), Y1 = mapY(1);
      var iw = fimg.naturalWidth, ih = fimg.naturalHeight;
      var cx0 = Math.max(0, X0), cy0 = Math.max(0, Y0), cx1 = Math.min(g.W, X1), cy1 = Math.min(g.H, Y1);
      if (cx1 > cx0 && cy1 > cy0) {
        var sx = (cx0 - X0) / (X1 - X0) * iw, sy = (cy0 - Y0) / (Y1 - Y0) * ih;
        var sw = (cx1 - cx0) / (X1 - X0) * iw, sh = (cy1 - cy0) / (Y1 - Y0) * ih;
        ctx.drawImage(fimg, sx, sy, Math.max(1, sw), Math.max(1, sh), cx0 * d, cy0 * d, (cx1 - cx0) * d, (cy1 - cy0) * d);
      }
    }
    if (inscr) {
      var ix = mapX(.5), iy = mapY(.254), fz = g.fh * .03 * s;
      inscr.style.transform = 'translate3d(' + ix.toFixed(1) + 'px,' + iy.toFixed(1) + 'px,0) translate(-50%,-50%)';
      inscr.style.fontSize = fz.toFixed(2) + 'px';
      inscr.style.opacity = s > 2.2 ? 0 : 1;
    }
    aulaWrap.style.clipPath = 'inset(' + t.toFixed(1) + 'px ' + r.toFixed(1) + 'px ' + b.toFixed(1) + 'px ' + l.toFixed(1) + 'px)';
    aula.style.transform = 'scale(' + (1.9 - .9 * ease(p)).toFixed(4) + ')';
    aula.style.filter = 'brightness(' + (.34 + .66 * ease(Math.min(1, p * 1.15))).toFixed(3) + ')';
    var dp = Math.min(1, p / .17), da = 108 * (1 - Math.pow(1 - dp, 2.2));
    doorsEl.style.left = dx0.toFixed(1) + 'px'; doorsEl.style.top = dy0.toFixed(1) + 'px';
    doorsEl.style.width = (dx1 - dx0).toFixed(1) + 'px'; doorsEl.style.height = (dy1 - dy0).toFixed(1) + 'px';
    leafL.style.transform = 'rotateY(' + da.toFixed(2) + 'deg)'; leafR.style.transform = 'rotateY(' + (-da).toFixed(2) + 'deg)';
    doorsEl.style.visibility = p > .47 ? 'hidden' : 'visible';
    aulaWrap.style.visibility = dp > 0.02 ? 'visible' : 'hidden';
  }
  if (!(fimg.complete && fimg.naturalWidth)) fimg.addEventListener('load', function () { renderDoor(); });
  stage._render = renderDoor;
  renderDoor();
  var ptl = gsap.timeline({ scrollTrigger: { trigger: '.portal', start: 'top top', end: 'bottom bottom', scrub: .6, invalidateOnRefresh: true } });
  ptl.to('.portal__base', { opacity: 0, y: 40, duration: .08, ease: 'none' }, 0)
    .to('.portal__head', { y: function () { return -window.innerHeight * .08; }, opacity: 0, duration: .16, ease: 'power1.in' }, 0.02)
    .to(door, { p: 1, duration: .62, ease: 'power1.in', onUpdate: renderDoor }, 0.05)
    .fromTo('.portal__inside', { opacity: 0 }, { opacity: 1, duration: .12, ease: 'none' }, 0.7)
    .fromTo('.portal__inside-title', { y: 50 }, { y: 0, duration: .2, ease: 'power2.out' }, 0.7)
    .fromTo('.portal__aula', { scale: 1 }, { scale: 1.06, duration: .3, ease: 'none' }, 0.7);

  /* ------------------------------------------------------------------ reveals */
  ['.statement .seal', '.statement__sig', '.chronik .sec-head', '.entry', '.library .sec-head', '.shelf', '.findex li', '.post__intro > *', '.world__text > *', '.foot__word', '.foot__col'].forEach(function (sel) {
    $$(sel).forEach(function (el, i) {
      el.classList.add('rv');
      gsap.to(el, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', delay: el.matches('.foot__col, .world__text > *, .findex li, .post__intro > *') ? (i % 4) * .08 : 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
  });

  /* ------------------------------------------------------------------ chronicle */
  $$('.entry').forEach(function (en, i) {
    ScrollTrigger.create({ trigger: en, start: 'top 55%', end: 'bottom 55%',
      onEnter: function () { setYear(en.dataset.year, en.dataset.place, i); },
      onEnterBack: function () { setYear(en.dataset.year, en.dataset.place, i); } });
    var img = $('.print img, .photo img', en);
    if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: en, start: 'top bottom', end: 'center center', scrub: true } });
  });

  /* ------------------------------------------------------------------ V. envelope */
  (function () {
    var post = $('.post'), desk = $('.desk'), env = $('.env'), sheet = $('.letter-sheet');
    var fOut = $('.env__flap--out'), fIn = $('.env__flap--in');
    gsap.set(env, { y: 50, opacity: 0, rotation: -4 });
    function play() {
      var D = desk.getBoundingClientRect(), E = env.getBoundingClientRect();
      gsap.set(env, { y: 0, rotation: 0 });
      E = env.getBoundingClientRect(); gsap.set(env, { y: 50, rotation: -4 });
      var L = { l: sheet.offsetLeft, t: sheet.offsetTop, w: sheet.offsetWidth, h: sheet.offsetHeight };
      var Sr = sheet.getBoundingClientRect();
      var ew = E.width, hinge = E.top + ew * .468 - D.top, bodyH = ew * .7224;
      var s0 = (ew * .86) / L.w;
      var x0 = (E.left - D.left + ew * .07) - (Sr.left - D.left);
      var yIn = hinge + 8 - (Sr.top - D.top);
      var yOut = hinge - L.h * s0 - (Sr.top - D.top);
      var st = { t: 0 }, out = false;
      var P0 = { x: x0, y: yIn, s: s0 }, P1 = { x: x0, y: yOut - L.h * s0 * .34 - 30, s: s0 * 1.02 }, P3 = { x: 0, y: 0, s: 1 };
      var P2 = { x: x0 * .3, y: Math.min(P1.y, P3.y) - 40, s: (s0 + 1) / 2 };
      function bez(a, b, c, d, t) { var u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; }
      function draw() {
        var t = st.t, x = bez(P0.x, P1.x, P2.x, P3.x, t), y = bez(P0.y, P1.y, P2.y, P3.y, t), sc = bez(P0.s, P1.s, P2.s, P3.s, t);
        var topNow = (Sr.top - D.top) + y, visible = (hinge - topNow) / sc, cut = Math.max(0, L.h - visible);
        if (cut <= 0) out = true;
        sheet.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) scale(' + sc.toFixed(4) + ')';
        sheet.style.clipPath = out ? 'none' : 'inset(0 0 ' + Math.min(L.h, cut).toFixed(1) + 'px 0)';
      }
      draw(); post.classList.add('is-open');
      var tl = gsap.timeline();
      tl.to(env, { y: 0, opacity: 1, rotation: 0, duration: 1.1, ease: 'expo.out' }, 0)
        .to('.wax', { scale: 1.06, duration: .14, ease: 'power1.in' }, .7)
        .to('.wax__mono', { opacity: 0, duration: .14 }, .84)
        .to('.wax__half--l', { x: -ew * .3, y: ew * .3, rotation: -38, duration: .75, ease: 'power2.in' }, .84)
        .to('.wax__half--r', { x: ew * .32, y: ew * .36, rotation: 30, duration: .8, ease: 'power2.in' }, .88)
        .to(fOut, { rotationX: 90, duration: .38, ease: 'sine.in' }, 1.1)
        .set(fOut, { visibility: 'hidden' }, 1.48)
        .set(fIn, { visibility: 'visible' }, 1.48)
        .fromTo(fIn, { rotationX: -90 }, { rotationX: 0, duration: .5, ease: 'sine.out' }, 1.48)
        .to(st, { t: 1, duration: 2.6, ease: 'power2.inOut', onUpdate: draw, onComplete: function () { sheet.style.clipPath = 'none'; sheet.style.transform = 'none'; } }, 1.85)
        .to(env, { x: ew * .42, y: ew * .32, rotation: 7, scale: .9, duration: 1.8, ease: 'power2.inOut' }, 2.65);
    }
    if (FIGMA) { post.classList.add('is-open'); return; }
    ScrollTrigger.create({ trigger: post, start: 'top 45%', once: true, onEnter: play });
  })();

  /* ------------------------------------------------------------------ VI. microscope */
  var plates = $$('.plate'), foci = $$('.foci li'), area = -1;
  function setArea(i) {
    if (i === area) return; area = i;
    plates.forEach(function (p, j) { p.classList.toggle('is-on', j === i); });
    foci.forEach(function (f, j) { f.classList.toggle('is-on', j === i); });
    var lens = $('.lens', plates[i]);
    if (lens) { lens.classList.add('is-blur'); setTimeout(function () { lens.classList.remove('is-blur'); }, 120); }
  }
  mm.add('(min-width: 761px)', function () {
    setArea(0);
    var SN = [0, 1 / 3, 2 / 3, 1], snapT = null;
    var st = ScrollTrigger.create({ trigger: '.micro', start: 'top top', end: 'bottom bottom',
      onUpdate: function (s) { setArea(Math.min(3, Math.round(s.progress * 3))); } });
    function snap() {
      var y = lenis ? lenis.scroll : window.scrollY;
      if (y <= st.start + 2 || y >= st.end - 2) return;
      var p = (y - st.start) / (st.end - st.start), best = SN.reduce(function (a, c) { return Math.abs(c - p) < Math.abs(a - p) ? c : a; });
      var ty = st.start + best * (st.end - st.start);
      if (Math.abs(ty - y) > 4) lenis ? lenis.scrollTo(ty, { duration: .8, easing: function (t) { return 1 - Math.pow(1 - t, 3); } }) : window.scrollTo({ top: ty, behavior: 'smooth' });
    }
    var onS = function () { clearTimeout(snapT); snapT = setTimeout(snap, 160); };
    var unsub = lenis ? lenis.on('scroll', onS) : (window.addEventListener('scroll', onS, { passive: true }), null);
    foci.forEach(function (f, i) {
      f.onclick = function () { var y = st.start + (st.end - st.start) * SN[i]; lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: 'smooth' }); };
    });
    return function () { if (typeof unsub === 'function') unsub(); else window.removeEventListener('scroll', onS); plates.forEach(function (p) { p.classList.add('is-on'); }); area = -1; };
  });
  var lensState = plates.map(function (p, i) {
    var card = $('.plate__card', p), lens = $('.lens', p);
    var s = { card: card, lens: lens, x: .5, y: .5, tx: .5, ty: .5, hover: false, seed: i * 1.7, vis: false };
    card.addEventListener('pointermove', function (e) { var r = card.getBoundingClientRect(); s.hover = true; s.tx = (e.clientX - r.left) / r.width; s.ty = (e.clientY - r.top) / r.height; });
    card.addEventListener('pointerleave', function () { s.hover = false; });
    return s;
  });
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { lensState.forEach(function (s) { if (s.card === e.target) s.vis = e.isIntersecting; }); }); });
  lensState.forEach(function (s) { io.observe(s.card); });
  gsap.ticker.add(function (t) {
    lensState.forEach(function (s, i) {
      if (!s.vis || (!isMobile() && i !== area)) return;
      if (!s.hover) { s.tx = .5 + .22 * Math.sin(t * .23 + s.seed); s.ty = .49 + .17 * Math.sin(t * .31 + s.seed * 2.1); }
      s.x += (s.tx - s.x) * .07; s.y += (s.ty - s.y) * .07;
      var w = s.card.clientWidth, h = s.card.clientHeight;
      s.lens.style.transform = 'translate3d(' + (s.x * w).toFixed(1) + 'px,' + (s.y * h).toFixed(1) + 'px,0)';
      s.lens.style.backgroundPosition = (s.x * 100).toFixed(2) + '% ' + (s.y * 100).toFixed(2) + '%';
    });
  });

  /* ------------------------------------------------------------------ VII. vista */
  var track = $('.vista__track'), vista = $('.vista'), pins = $$('.pin'), pano = $('.vista__pano');
  function panDist() { return Math.max(0, pano.offsetLeft + pano.offsetWidth + window.innerWidth * (isMobile() ? .5 : .22) - window.innerWidth); }
  function sizeVista() { vista.style.height = (window.innerHeight + panDist() * 1.15) + 'px'; }
  sizeVista();
  function vistaPins() {
    var vw = window.innerWidth, pr = pano.getBoundingClientRect();
    pins.forEach(function (p) { var x = p.getBoundingClientRect().left; p.classList.toggle('is-on', x < vw * 0.9 && x > -vw * 0.25); });
    var rev = Math.max(0, Math.min(1, (vw * 0.85 - pr.left) / pr.width));
    pano.style.setProperty('--route', ((1 - rev) * 100).toFixed(2) + '%');
  }
  gsap.to(track, { x: function () { return -panDist(); }, ease: 'none', onUpdate: vistaPins,
    scrollTrigger: { trigger: vista, start: 'top top', end: 'bottom bottom', scrub: .8, invalidateOnRefresh: true, onRefreshInit: sizeVista } });

  /* ------------------------------------------------------------------ VIII. globe photo */
  gsap.fromTo('.world__zoom', { scale: 1.26, yPercent: 2 }, { scale: 1.14, yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.world', start: 'top bottom', end: 'bottom top', scrub: true } });

  ScrollTrigger.create({ trigger: '.world__photo', start: 'top 70%', once: true, onEnter: function () { $('.world').classList.add('is-live'); } });

  /* ------------------------------------------------------------------ IX. press */
  gsap.fromTo('.sheet', { rotationX: 24, y: 90, scale: .92 }, { rotationX: 0, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: '.press', start: 'top bottom', end: 'top 15%', scrub: .6 } });

  /* ------------------------------------------------------------------ X. gate */
  var gtl = gsap.timeline({ scrollTrigger: { trigger: '.gate', start: 'top top', end: 'bottom bottom', scrub: .7 } });
  gtl.to('.gate__cue', { opacity: 0, duration: .06 }, 0.02)
    .fromTo('.gate__doors', { scale: 1 }, { scale: 1.05, duration: .14, ease: 'power1.inOut' }, 0)
    .fromTo('.gate__scene img', { scale: 1.32, filter: 'brightness(1.6)' }, { scale: 1, filter: 'brightness(1)', duration: .75, ease: 'power2.out' }, 0.08)
    .to('.door--l', { rotationY: 108, duration: .5, ease: 'power2.inOut' }, 0.1)
    .to('.door--r', { rotationY: -108, duration: .5, ease: 'power2.inOut' }, 0.1)
    .fromTo('.door__face', { '--dark': 0 }, { '--dark': .55, duration: .5, ease: 'none' }, 0.1)
    .set('.gate__doors', { autoAlpha: 0 }, 0.62)
    .fromTo('.gate__cta > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .22, stagger: .04, ease: 'power2.out' }, 0.5)
    .to('.gate__lintel', { yPercent: -100, duration: .2, ease: 'power2.in' }, 0.55)
    .to({}, { duration: .2 }, 0.8);

  /* ------------------------------------------------------------------ footer city */
  gsap.fromTo('.foot__city img', { yPercent: 12 }, { yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true } });

  var rz;
  window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { sizePortal(); sizeVista(); ScrollTrigger.refresh(); }, 150); });
  window.addEventListener('load', function () { sizeVista(); ScrollTrigger.refresh(); });
})();

/* Maison Beauté Rouen : interactions légères (aucune dépendance). */
(function () {
  'use strict';
  var d = document;

  // Menu mobile
  var burger = d.querySelector('.burger'), nav = d.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
  }

  // Apparition au défilement
  var els = d.querySelectorAll('.reveal:not(.in)');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // Carrousels
  d.querySelectorAll('[data-carousel]').forEach(function (c) {
    var t = c.querySelector('.track');
    function step(dir) { var card = t.firstElementChild; var w = card ? card.getBoundingClientRect().width + 18 : t.clientWidth; t.scrollBy({ left: dir * w, behavior: 'smooth' }); }
    var p = c.querySelector('[data-prev]'), n = c.querySelector('[data-next]');
    if (p) p.addEventListener('click', function () { step(-1); });
    if (n) n.addEventListener('click', function () { step(1); });
  });

  // Compteur animé (le chiffre réel est déjà dans le HTML)
  var cpt = d.querySelector('[data-count]');
  if (cpt && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var target = +cpt.getAttribute('data-count'), done = false;
    new IntersectionObserver(function (en, o) {
      if (!en[0].isIntersecting || done) return; done = true; o.disconnect();
      var t0 = performance.now(), dur = 1600;
      (function tick(now) {
        var k = Math.min(1, (now - t0) / dur), v = Math.round(target * (1 - Math.pow(1 - k, 3)));
        cpt.innerHTML = '<span>+</span>' + v.toLocaleString('fr-FR');
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: .4 }).observe(cpt);
  }


  // En-tête transparent sur la bannière, plein après défilement
  var over = d.querySelector('.top--over');
  if (over) {
    var tick = function () { over.classList.toggle('is-scrolled', window.scrollY > 40); };
    tick(); window.addEventListener('scroll', tick, { passive: true });
  }

  // Menu de réservation : se referme au clic ailleurs ou à Échap
  d.addEventListener('click', function (e) {
    d.querySelectorAll('details.book[open]').forEach(function (x) { if (!x.contains(e.target)) x.open = false; });
  });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') d.querySelectorAll('details.book[open]').forEach(function (x) { x.open = false; });
  });

  // Parallaxe douce des photos (désactivée si l'utilisateur préfère moins de mouvement)
  var par = d.querySelectorAll('[data-parallax]');
  if (par.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var busy = false;
    var run = function () {
      busy = false;
      var vh = window.innerHeight;
      par.forEach(function (img) {
        var box = img.parentElement.getBoundingClientRect();
        if (box.bottom < -50 || box.top > vh + 50) return;
        var k = (box.top + box.height / 2 - vh / 2) / vh;
        img.style.transform = 'translate3d(0,' + (k * -7).toFixed(2) + '%,0)';
      });
    };
    window.addEventListener('scroll', function () { if (!busy) { busy = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  // Suivi des clics : envoie un évènement à GA4 / GTM s'ils sont installés.
  // Important : un clic Planity = un clic sortant, PAS une réservation confirmée.
  window.dataLayer = window.dataLayer || [];
  d.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]'); if (!a) return;
    var ev = {
      event: 'mbr_' + a.getAttribute('data-track'),
      salon: a.getAttribute('data-salon') || '',
      emplacement: a.getAttribute('data-emplacement') || '',
      plateforme: a.getAttribute('data-plateforme') || '',
      cible: a.getAttribute('data-cible') || '',
      lien: a.href || ''
    };
    window.dataLayer.push(ev);
    if (typeof window.gtag === 'function') window.gtag('event', ev.event, ev);
  });
})();

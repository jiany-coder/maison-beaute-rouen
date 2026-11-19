// Générateur statique des 5 sites Maison Beauté Rouen.
// node build.mjs            -> dist/ (pré-publication : un seul domaine, sous-dossiers, noindex)
// node build.mjs --prod     -> dist-prod/<site>/ (un dossier par domaine, prêt à déployer)
import fs from 'node:fs';
import path from 'node:path';
import { marques, SOURCE_TARIFS } from './src/contenu.mjs';

const PROD = process.argv.includes('--prod');
const OUT = PROD ? 'dist-prod' : 'dist';
const ROOT = path.dirname(new URL(import.meta.url).pathname);
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/etablissements.json'), 'utf8'));
const avis = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/avis.json'), 'utf8'));
const baseCss = fs.readFileSync(path.join(ROOT, 'src/base.css'), 'utf8');
const appJs = fs.readFileSync(path.join(ROOT, 'src/app.js'), 'utf8');
const G = data.groupe;
const ETS = data.etablissements;
const VERSION = Date.now().toString(36);

/* ---------- utilitaires ---------- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fr1 = (n) => n.toFixed(1).replace('.', ',');
const frInt = (n) => n.toLocaleString('fr-FR').replace(/ | /g, ' ');
const dateFr = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const write = (rel, content) => { const f = path.join(ROOT, OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content); };
const PLAT = { google: 'Google', pagesjaunes: 'PagesJaunes', planity: 'Planity' };
const PLATS = ['google', 'pagesjaunes', 'planity'];

const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" width="13" height="13"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};
const LOGO_PLAT = {
  google: '<span class="plat__logo plat__logo--google" aria-hidden="true"><svg viewBox="0 0 48 48" width="16" height="16"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 7.1-10 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.6 42.6 14.6 48 24 48z"/></svg></span>',
  pagesjaunes: '<span class="plat__logo plat__logo--pagesjaunes" aria-hidden="true">PJ</span>',
  planity: '<span class="plat__logo plat__logo--planity" aria-hidden="true">P</span>'
};

const mapsUrl = (e) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.nom + ' ' + e.adresse.rue + ' Rouen')}&query_place_id=${e.google_place_id}`;
const reviewWriteUrl = (e) => `https://search.google.com/local/writereview?placeid=${e.google_place_id}`;
const platUrl = (e, p) => p === 'google' ? mapsUrl(e) : avis.etablissements[e.slug][p].url;

function stats(slugs) {
  const per = {}; let total = 0, somme = 0;
  for (const p of PLATS) per[p] = { n: 0, s: 0 };
  for (const s of slugs) for (const p of PLATS) {
    const a = avis.etablissements[s][p]; if (!a || !a.nombre) continue;
    per[p].n += a.nombre; per[p].s += a.note * a.nombre; total += a.nombre; somme += a.note * a.nombre;
  }
  for (const p of PLATS) per[p].note = per[p].n ? per[p].s / per[p].n : null;
  return { per, total, note: total ? somme / total : null };
}
const methodeTxt = (a) => PLATS.map((p) => `${PLAT[p]} : ${a[p].methode === 'api-google-places' ? 'API officielle Google' : 'relevé manuel'} du ${dateFr(a[p].releve_le)}.`).join(' ');
const starsHtml = (note, label = true) => `<span class="stars" style="--p:${Math.round((note / 5) * 100)}%"${label ? ` role="img" aria-label="${fr1(note)} sur 5"` : ' aria-hidden="true"'}></span>`;

/* ---------- liens entre sites ---------- */
function siteBase(slug) { return PROD ? '/' : (slug === 'groupe' ? '/' : `/${slug}/`); }
function siteHref(slug, p = '') {
  const e = slug === 'groupe' ? G : ETS.find((x) => x.slug === slug);
  if (PROD) return e.domaine + '/' + p;
  return siteBase(slug) + p;
}
const canonical = (slug, p = '') => (slug === 'groupe' ? G.domaine : ETS.find((x) => x.slug === slug).domaine) + '/' + p;

/* ---------- briques communes ---------- */
function track(type, salon, extra = '') { return `data-track="${type}" data-salon="${salon}"${extra}`; }

function head({ title, description, slug, p, theme, css, schema, ogImage }) {
  const fonts = theme.fonts;
  return `<!doctype html>
<html lang="fr" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${PROD ? '<meta name="robots" content="index,follow,max-image-preview:large">' : '<meta name="robots" content="noindex,nofollow">'}
<link rel="canonical" href="${canonical(slug, p)}">
<meta property="og:type" content="website"><meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical(slug, p)}">${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
<meta name="theme-color" content="${theme.bg}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">
<link rel="stylesheet" href="${css}?v=${VERSION}">
<script>document.documentElement.classList.replace('no-js','js')</script>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>`;
}

function themeVars(t) {
  return `:root{--c-bg:${t.bg};--c-surface:${t.surface};--c-surface2:${t.surface2};--c-text:${t.text};--c-muted:${t.muted};--c-accent:${t.accent};--c-accent-text:${t.accentText};--c-line:${t.line};--c-line-strong:${t.dark ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.2)'};--f-display:${t.display};--f-body:${t.body};--t-case:${t.titleCase};--t-track:${t.titleTrack};--radius:${t.radius};--radius-lg:calc(${t.radius} * 1.6);color-scheme:${t.dark ? 'dark' : 'light'}}`;
}

function horairesList(e) {
  return `<ul class="hrs">${e.horaires.map((h) => `<li><span>${h.label}</span><span>${h.ouvre.replace(':', 'h')} à ${h.ferme.replace(':', 'h')}</span></li>`).join('')}${e.horaires.some((h) => h.jours.includes('Sunday')) ? '' : '<li><span>Dimanche</span><span>Fermé</span></li>'}</ul>`;
}

function avisModule(e, opts = {}) {
  const a = avis.etablissements[e.slug];
  const st = stats([e.slug]);
  const tem = avis.temoignages[e.slug] || [];
  const rel = dateFr(avis.derniere_verification);
  return `<section class="sec ${opts.alt ? 'sec--alt' : ''}" id="avis" aria-labelledby="avis-t">
<div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Avis clients vérifiables</span><h2 id="avis-t">${frInt(st.total)} avis sur Google, PagesJaunes et Planity</h2></div><p>Chaque note est reliée à sa plateforme d’origine : cliquez pour lire tous les avis, les bons comme les moins bons.</p></div>
<div class="avis">
<aside class="avis__total reveal">
<div class="avis__big" data-avis="${e.slug}.total">${frInt(st.total)} <small>avis</small></div>
<p class="avis__sub">Note moyenne pondérée <strong>${fr1(st.note)}/5</strong> ${starsHtml(st.note)}</p>
<ul class="plat">
${PLATS.map((p) => `<li>${LOGO_PLAT[p]}<div><div class="plat__name"><a href="${platUrl(e, p)}" target="_blank" rel="noopener" ${track('avis_voir', e.slug, ` data-plateforme="${p}"`)}>${PLAT[p]} ${I.ext}</a></div><div class="plat__meta" data-avis="${e.slug}.${p}.nombre">${frInt(a[p].nombre)} avis</div></div><div class="plat__note" data-avis="${e.slug}.${p}.note">${fr1(a[p].note)}<span class="sr"> sur 5</span>${starsHtml(a[p].note, false)}</div></li>`).join('')}
</ul>
<div class="avis__cta">
<a class="btn" href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('avis_voir', e.slug, ' data-plateforme="google"')}>Lire les avis Google</a>
<a class="btn btn--ghost" href="${reviewWriteUrl(e)}" target="_blank" rel="noopener" ${track('avis_laisser', e.slug, ' data-plateforme="google"')}>Laisser un avis</a>
</div>
<p class="avis__methode">${methodeTxt(a)} Note pondérée = somme (note × nombre d’avis) ÷ total des avis, toutes les plateformes notant sur 5. Ces chiffres ne sont pas en temps réel.</p>
</aside>
<div class="carousel reveal" data-carousel>
<div class="track" tabindex="0" aria-label="Témoignages clients">
${tem.map((t) => temoin(t, e)).join('')}
</div>
<div class="car__nav"><button class="car__btn" type="button" data-prev aria-label="Avis précédent">${I.left}</button><button class="car__btn" type="button" data-next aria-label="Avis suivant">${I.arrow}</button><span class="car__hint">Avis recopiés tels que publiés.</span></div>
</div>
</div>
</div>
</section>`;
}

function temoin(t, e, showSalon = false) {
  return `<article class="temoin">
${showSalon ? `<span class="temoin__salon">${esc(e.nom)}</span>` : ''}
<div>${starsHtml(t.note)}</div>
<blockquote>${esc(t.texte)}${t.extrait ? ' […]' : ''}</blockquote>
<footer><span><cite>${esc(t.auteur)}</cite><br><span class="muted">${esc(t.date)}</span></span><a class="src" href="${platUrl(e, t.plateforme)}" target="_blank" rel="noopener" ${track('avis_voir', e.slug, ` data-plateforme="${t.plateforme}"`)}>${LOGO_PLAT[t.plateforme]} ${PLAT[t.plateforme]}</a></footer>
</article>`;
}

function infosPratiques(e, alt) {
  return `<section class="sec ${alt ? 'sec--alt' : ''}" id="contact" aria-labelledby="contact-t">
<div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Infos pratiques</span><h2 id="contact-t">Venir chez ${esc(e.nom)}</h2></div></div>
<div class="infos">
<div class="info reveal"><h3>Adresse</h3><p class="big">${esc(e.adresse.rue)}</p><p>${e.adresse.cp} ${e.adresse.ville}${e.adresse.complement ? `<br><span class="muted">${esc(e.adresse.complement)}</span>` : ''}</p><p style="margin-top:1rem"><a class="link" href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug)}>Itinéraire Google Maps</a></p></div>
<div class="info reveal"><h3>Horaires</h3>${horairesList(e)}<p class="muted" style="font-size:.78rem;margin-top:.8rem">Source : ${esc(e.horaires_source.split(' (')[0])}.</p></div>
<div class="info reveal"><h3>Réserver</h3><a class="big" href="tel:${e.telephone_e164}" ${track('telephone', e.slug)}>${e.telephone}</a><p class="muted">Ou en ligne, 24h/24 :</p><a class="btn" style="margin-top:.6rem" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="infos"')}>Réserver en ligne</a></div>
</div>
</div>
</section>`;
}

function groupeBloc(e) {
  const autres = ETS.filter((x) => x.slug !== e.slug);
  return `<section class="sec" aria-labelledby="grp-t"><div class="wrap"><div class="groupe reveal">
<div><span class="kicker">Maison Beauté Rouen</span><h2 id="grp-t" style="font-size:clamp(1.4rem,2.6vw,2rem)">Un établissement du groupe Maison Beauté Rouen</h2><p class="muted" style="margin:0">Quatre salons spécialisés, à quelques pas les uns des autres sur la rive gauche.</p></div>
<div><div class="groupe__list">${autres.map((x) => `<a href="${siteHref(x.slug)}" ${track('lien_groupe', e.slug, ` data-cible="${x.slug}"`)}>${esc(x.nom)} · ${esc(x.metier.split(',')[0])}</a>`).join('')}<a href="${siteHref('groupe')}" ${track('lien_groupe', e.slug, ' data-cible="groupe"')}>Découvrir le groupe</a></div></div>
</div></div></section>`;
}

function header(e, base, isHome) {
  const logo = e.logo ? `<img src="${e.logo}" alt="Logo ${esc(e.nom)}" width="140" height="46" ${e.logo_fond === 'clair' ? 'style="border-radius:6px"' : ''}>` : '';
  const name = e.logo && e.logo_fond !== 'clair' ? `<span class="sr">${esc(e.nom)}</span>` : `<span>${esc(e.nom)}</span>`;
  const h = (a) => (isHome ? a : base + a);
  return `<a class="skip" href="#main">Aller au contenu</a>
${PROD ? '' : `<div class="prepub">Pré-publication : version de travail, non indexée. Données d’avis relevées le ${dateFr(avis.derniere_verification)}.</div>`}
<header class="top"><div class="wrap top__in">
<a class="brand" href="${base}" aria-label="${esc(e.nom)}, accueil">${logo}${name}</a>
<nav class="nav" id="nav" aria-label="Navigation principale">
<a href="${h('#prestations')}">Prestations</a><a href="${h('#tarifs')}">Tarifs</a><a href="${h('#avis')}">Avis</a><a href="${h('#realisations')}">Réalisations</a><a href="${h('#contact')}">Contact</a>
</nav>
<a class="btn btn--book" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="header"')}>${I.cal} Prendre rendez-vous</a>
<button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Ouvrir le menu"><span></span><span></span></button>
</div></header>`;
}

function footer(e, m, base) {
  return `<footer class="foot"><div class="wrap">
<div class="foot__grid">
<div><strong style="font:600 1.4rem/1 var(--f-display);color:var(--c-text)">${esc(e.nom)}</strong><p style="margin-top:.8rem">${esc(e.metier)} à Rouen.<br>${esc(e.adresse.rue)}, ${e.adresse.cp} ${e.adresse.ville}<br><a href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="footer"')}>${e.telephone}</a></p><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="footer"')}>Réserver en ligne</a></div>
<div><h4>Prestations</h4><ul>${m.pages.map((pg) => `<li><a href="${base}${pg.slug}/">${esc(pg.fil)}</a></li>`).join('')}<li><a href="${base}#tarifs">Tous les tarifs</a></li></ul></div>
<div><h4>Retrouvez-nous</h4><ul><li><a href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug, ' data-emplacement="footer"')}>Fiche Google</a></li><li><a href="${e.pagesjaunes}" target="_blank" rel="noopener">PagesJaunes</a></li><li><a href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="footer-liens"')}>Planity</a></li>${e.facebook ? `<li><a href="${e.facebook}" target="_blank" rel="noopener">Facebook</a></li>` : ''}${e.instagram ? `<li><a href="${e.instagram}" target="_blank" rel="noopener">Instagram</a></li>` : ''}${e.tiktok ? `<li><a href="${e.tiktok}" target="_blank" rel="noopener">TikTok</a></li>` : ''}</ul></div>
<div><h4>Le groupe</h4><ul><li><a href="${siteHref('groupe')}">Maison Beauté Rouen</a></li>${ETS.filter((x) => x.slug !== e.slug).map((x) => `<li><a href="${siteHref(x.slug)}">${esc(x.nom)}</a></li>`).join('')}</ul></div>
</div>
<div class="foot__bottom"><span>© ${new Date().getFullYear()} ${esc(e.nom)}, membre de Maison Beauté Rouen</span><span><a href="${siteHref('groupe', 'mentions-legales/')}">Mentions légales</a></span></div>
</div></footer>
<nav class="mbar" aria-label="Actions rapides">
<a href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="barre-mobile"')}>${I.phone}Appeler</a>
<a href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug, ' data-emplacement="barre-mobile"')}>${I.pin}Itinéraire</a>
<a class="mbar__book" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="barre-mobile"')}>${I.cal} Réserver</a>
</nav>
<script src="${base}assets/app.js?v=${VERSION}" defer></script>
</body></html>`;
}

/* ---------- schema.org ---------- */
function businessSchema(e, m) {
  const id = e.domaine + '/#etablissement';
  return {
    '@context': 'https://schema.org', '@type': e.type_schema, '@id': id, name: e.nom, url: e.domaine + '/',
    description: m.seo.description, telephone: e.telephone_e164,
    image: m.hero.image, ...(e.logo ? { logo: e.logo } : {}),
    address: { '@type': 'PostalAddress', streetAddress: e.adresse.rue.replace(/^(\d+) rue/, '$1 rue'), postalCode: e.adresse.cp, addressLocality: e.adresse.ville, addressRegion: 'Normandie', addressCountry: 'FR' },
    geo: { '@type': 'GeoCoordinates', latitude: e.geo.lat, longitude: e.geo.lng },
    openingHoursSpecification: e.horaires.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.jours, opens: h.ouvre, closes: h.ferme })),
    hasMap: mapsUrl(e), areaServed: { '@type': 'City', name: 'Rouen' },
    sameAs: [mapsUrl(e), e.pagesjaunes, e.planity, e.facebook, e.instagram, e.tiktok].filter(Boolean),
    parentOrganization: { '@id': G.domaine + '/#organisation' },
    potentialAction: { '@type': 'ReserveAction', target: e.planity }
  };
}
const faqSchema = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: u })) });

/* ---------- sites des 4 marques ---------- */
function tarifsTable(rows, caption = SOURCE_TARIFS) {
  return `<table class="tarifs"><caption>${esc(caption)}</caption><thead><tr><th scope="col">Prestation</th><th scope="col">Durée</th><th scope="col">Prix</th></tr></thead><tbody>${rows.map(([a, b, c]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</tbody></table>`;
}
function faqHtml(faq) { return `<div class="faq">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`; }

function buildMarque(e) {
  const m = marques[e.slug];
  const base = siteBase(e.slug);
  const pre = PROD ? e.slug + '/' : (base === '/' ? '' : e.slug + '/');
  const css = themeVars(m.theme) + '\n' + baseCss + (m.theme.gold ? `\n.kicker{color:${m.theme.gold}}` : '');
  write(pre + 'assets/site.css', css);
  write(pre + 'assets/app.js', appJs);
  const st = stats([e.slug]);
  const bizSchema = businessSchema(e, m);

  // Accueil
  const home = `${head({ title: m.seo.title, description: m.seo.description, slug: e.slug, p: '', theme: m.theme, css: base + 'assets/site.css', ogImage: m.hero.image, schema: [bizSchema, faqSchema(m.faq)] })}
<body>
${header(e, base, true)}
<main id="main">
<section class="hero"><div class="wrap hero__grid">
<div class="reveal in">
<span class="kicker">${esc(m.hero.kicker)}</span>
<h1>${esc(m.hero.h1)}</h1>
<p class="hero__lead">${esc(m.hero.lead)}</p>
<div class="btns">
<a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="hero"')}>${I.cal} Réserver en ligne</a>
<a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="hero"')}>${I.phone} ${e.telephone}</a>
</div>
<div class="hero__facts"><span>${I.pin}${esc(e.adresse.rue)}, Rouen</span><span>${I.clock}${esc(e.horaires[0].label)} ${e.horaires[0].ouvre.replace(':', 'h')} à ${e.horaires[0].ferme.replace(':', 'h')}</span><a href="#prestations" class="link">Découvrir nos prestations</a></div>
</div>
<div class="hero__media"><img src="${m.hero.image}" alt="${esc(m.hero.imageAlt)}" width="900" height="1125" fetchpriority="high" decoding="async">
<a class="hero__badge" href="#avis" style="text-decoration:none"><strong>${fr1(avis.etablissements[e.slug].google.note)}</strong><span>${starsHtml(avis.etablissements[e.slug].google.note)}<br>${frInt(st.total)} avis Google, PagesJaunes et Planity</span></a></div>
</div></section>

<div class="wrap"><div class="atouts">${m.atouts.map(([t, d]) => `<div class="reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div>

${avisModule(e)}

<section class="sec sec--alt" id="prestations" aria-labelledby="presta-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">${esc(m.accroche)}</span><h2 id="presta-t">Nos prestations</h2></div><p>Prix et durées relevés sur notre page de réservation Planity. Chaque prestation est détaillée sur sa page.</p></div>
<div class="cards">${m.services.map((s, i) => `<a class="card reveal" href="${s.lien.startsWith('#') ? s.lien : base + s.lien}"><span class="card__n">0${i + 1}</span><span class="card__go">${I.arrow}</span><h3>${esc(s.titre)}</h3><p>${esc(s.texte)}</p><span class="card__foot"><span class="card__prix">${esc(s.prix)}</span><span class="card__duree">${esc(s.duree)}</span></span></a>`).join('')}</div>
</div></section>

<section class="sec" id="tarifs" aria-labelledby="tarifs-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Tarifs</span><h2 id="tarifs-t">Nos tarifs</h2></div></div>
<div class="tarifs-wrap"><div class="reveal">${tarifsTable(m.tarifs)}</div>
<aside class="tarifs-aside reveal"><h3>Réservez votre créneau</h3><p class="muted">Choisissez votre prestation et votre horaire en ligne, confirmation immédiate et paiement au salon.</p><div class="btns"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="tarifs"')}>${I.cal} Réserver en ligne</a><a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="tarifs"')}>${I.phone} Appeler</a></div></aside></div>
</div></section>

<section class="sec sec--alt" id="realisations" aria-labelledby="real-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Réalisations</span><h2 id="real-t">Le travail du salon</h2></div><p>Photos de réalisations publiées par le salon.</p></div>
<div class="galerie">${m.galerie.map(([src, alt], i) => `<figure class="reveal"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async" width="600" height="${i % 6 === 0 ? 800 : 600}"></figure>`).join('')}</div>
${m.equipe ? `<p class="muted" style="margin-top:1.8rem">L’équipe : ${m.equipe.map(esc).join(', ')}.</p>` : ''}
</div></section>

<section class="sec" id="faq" aria-labelledby="faq-t"><div class="narrow">
<div class="reveal"><span class="kicker">Questions fréquentes</span><h2 id="faq-t">Vos questions</h2></div>
${faqHtml(m.faq)}
</div></section>

${infosPratiques(e, true)}
${groupeBloc(e)}
</main>
${footer(e, m, base)}`;
  write(pre + 'index.html', home);

  // Pages prestations
  for (const pg of m.pages) {
    const rows = pg.tarifsLibres || (pg.tarifsCles || []).map((i) => m.tarifs[i]);
    const autres = m.pages.filter((x) => x !== pg);
    const crumbs = [['Accueil', canonical(e.slug)], [pg.fil, canonical(e.slug, pg.slug + '/')]];
    const svc = { '@context': 'https://schema.org', '@type': 'Service', name: pg.h1, serviceType: pg.fil, description: pg.description, provider: { '@id': e.domaine + '/#etablissement' }, areaServed: { '@type': 'City', name: 'Rouen' }, url: canonical(e.slug, pg.slug + '/') };
    const tems = (avis.temoignages[e.slug] || []).slice(0, 3);
    const html = `${head({ title: pg.title, description: pg.description, slug: e.slug, p: pg.slug + '/', theme: m.theme, css: base + 'assets/site.css', ogImage: pg.image[0], schema: [bizSchema, svc, faqSchema(pg.faq), crumbSchema(crumbs)] })}
<body>
${header(e, base, false)}
<main id="main">
<div class="wrap"><nav class="crumbs" aria-label="Fil d’Ariane"><a href="${base}">${esc(e.nom)}</a> / <span aria-current="page">${esc(pg.fil)}</span></nav>
<div class="page-hero"><div class="reveal in"><span class="kicker">${esc(e.nom)} · Rouen</span><h1>${esc(pg.h1)}</h1>
<div class="btns" style="margin-top:1.6rem"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ` data-emplacement="page-${pg.slug}"`)}>${I.cal} Prendre rendez-vous</a><a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ` data-emplacement="page-${pg.slug}"`)}>${I.phone} ${e.telephone}</a></div>
<p class="muted" style="margin-top:1.2rem;font-size:.92rem">${starsHtml(st.note)} ${fr1(st.note)}/5 sur ${frInt(st.total)} avis vérifiables · <a class="link" href="${base}#avis">voir les avis</a></p></div>
<figure><img src="${pg.image[0]}" alt="${esc(pg.image[1])}" width="800" height="800" fetchpriority="high"></figure></div></div>
<div class="narrow prose">
<p class="answer reveal in">${esc(pg.intro)}</p>
${pg.sections.map(([h, t], i) => `<h2${pg.ancreBarbe === i ? ' id="barbe"' : ''}>${esc(h)}</h2><p>${esc(t)}</p>`).join('\n')}
${pg.nailArt ? `<h2 id="nail-art">Nail art et suppléments</h2><p>Baby boomer ou dégradé de couleur sur les 10 ongles (10 €), french (5 €), paillettes et strass (5 € par main) : le nail art se réserve en complément d’une pose.</p>` : ''}
<h2>Tarifs ${esc(pg.fil.toLowerCase())} chez ${esc(e.nom)}</h2>
${tarifsTable(rows)}
<h2>Pourquoi choisir ${esc(e.nom)} ?</h2>
<ul class="liste-check">${m.atouts.map(([t, d]) => `<li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('')}</ul>
<h2>Ce qu’en disent nos clients</h2>
</div>
<div class="wrap" style="margin-top:1rem"><div class="carousel" data-carousel><div class="track" tabindex="0" aria-label="Témoignages">${tems.map((t) => temoin(t, e)).join('')}</div></div></div>
<div class="narrow prose" style="margin-top:2rem">
<h2>Questions fréquentes</h2>
${faqHtml(pg.faq)}
<h2>À voir aussi</h2>
<div class="related">${autres.map((x) => `<a href="${base}${x.slug}/">${esc(x.fil)}</a>`).join('')}<a href="${base}#tarifs">Tous les tarifs</a><a href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug)}>Notre fiche Google</a></div>
</div>
<section class="cta-band" style="margin-top:4rem"><div class="wrap"><h2>Prête, prêt ? Réservez en ligne</h2><p>Choisissez votre créneau sur Planity, 24h/24, ou appelez le salon au ${e.telephone}.</p><div class="btns"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ` data-emplacement="bandeau-${pg.slug}"`)}>${I.cal} Réserver en ligne</a><a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="bandeau"')}>${I.phone} Appeler</a></div></div></section>
${infosPratiques(e, false)}
</main>
${footer(e, m, base)}`;
    write(pre + pg.slug + '/index.html', html);
  }

  // robots, sitemap (prod), 404
  const urls = ['', ...m.pages.map((p) => p.slug + '/')];
  if (PROD) {
    write(pre + 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${e.domaine}/sitemap.xml\n`);
    write(pre + 'sitemap.xml', sitemap(e.domaine, urls));
    write(pre + 'llms.txt', llms(e, m));
  }
}

const sitemap = (dom, urls) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${dom}/${u}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
const llms = (e, m) => `# ${e.nom}\n\n> ${m.seo.description}\n\n- Adresse : ${e.adresse.rue}, ${e.adresse.cp} ${e.adresse.ville}\n- Téléphone : ${e.telephone}\n- Réservation : ${e.planity}\n- Groupe : Maison Beauté Rouen (${G.domaine})\n\n## Prestations\n${m.pages.map((p) => `- [${p.fil}](${e.domaine}/${p.slug}/)`).join('\n')}\n`;

/* ---------- site groupe ---------- */
const GT = {
  fonts: 'family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600',
  display: "'Cormorant Garamond', Garamond, Georgia, serif", body: "'Manrope', system-ui, sans-serif",
  bg: '#0b0a09', surface: '#13110f', surface2: '#1a1714', text: '#f3ece0', muted: '#a89f90',
  accent: '#c9a45c', accentText: '#0b0a09', line: 'rgba(201,164,92,.16)', dark: true, titleCase: 'none', titleTrack: '0', radius: '2px'
};
const groupeCss = `
.top{border-bottom-color:rgba(201,164,92,.18)}
.brand img{height:40px}
h1,h2{font-weight:500}
h1{font-size:clamp(2.6rem,6.4vw,5.4rem);line-height:1.02}
h1 em,h2 em{font-style:italic;color:var(--c-accent)}
.ghero{position:relative;min-height:min(92vh,860px);display:grid;align-items:center;padding:5rem 0;overflow:hidden;text-align:center}
.ghero::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 38%,rgba(201,164,92,.13),transparent 70%)}
.ghero__logo{width:min(440px,78vw);margin:0 auto 2.2rem;animation:heroIn 1.6s cubic-bezier(.2,.7,.2,1) both}
.ghero .hero__lead{margin:0 auto 2.2rem;text-align:center}
.ghero .btns{justify-content:center}
.ghero__line{display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:3rem;font-size:.78rem;letter-spacing:.3em;text-transform:uppercase;color:var(--c-muted)}
.ghero__line::before,.ghero__line::after{content:"";width:60px;height:1px;background:var(--c-accent);opacity:.6}
.compteur{text-align:center;padding:clamp(4rem,9vw,7rem) 0;border-top:1px solid var(--c-line);border-bottom:1px solid var(--c-line);background:var(--c-surface)}
.compteur__n{font:500 clamp(4.5rem,15vw,10rem)/.9 var(--f-display);color:var(--c-accent);letter-spacing:-.02em;font-variant-numeric:lining-nums tabular-nums}
.compteur__n span{font-size:.45em;vertical-align:.55em;margin-right:.08em}
.compteur__l{font:500 clamp(1.2rem,2.4vw,1.7rem)/1.3 var(--f-display);font-style:italic;margin:.6rem 0 2.5rem}
.compteur__meta{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem 2.2rem;font-size:.78rem;letter-spacing:.26em;text-transform:uppercase;color:var(--c-muted)}
.repart{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--c-line);border:1px solid var(--c-line);margin-top:3rem;text-align:left}
.repart>div{background:var(--c-surface);padding:1.7rem}
.repart .lbl{display:flex;align-items:center;gap:.7rem;font-weight:600;margin-bottom:1rem}
.repart .num{font:500 2.6rem/1 var(--f-display)}
.repart .sub{color:var(--c-muted);font-size:.88rem;margin-top:.4rem}
@media (max-width:760px){.repart{grid-template-columns:1fr}}
.tbl-avis{width:100%;border-collapse:collapse;margin-top:3rem;font-size:.95rem;text-align:left}
.tbl-avis th,.tbl-avis td{padding:1rem .6rem;border-bottom:1px solid var(--c-line)}
.tbl-avis thead th{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--c-muted);font-weight:600}
.tbl-avis td:not(:first-child),.tbl-avis th:not(:first-child){text-align:right;white-space:nowrap}
.tbl-avis tfoot td{font-weight:700;color:var(--c-accent);border-bottom:0}
.tbl-wrap{overflow-x:auto}
.salons{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem}
.salon{position:relative;display:grid;grid-template-rows:auto 1fr;border:1px solid var(--c-line);background:var(--c-surface);overflow:hidden;transition:border-color .4s}
.salon:hover{border-color:var(--c-accent)}
.salon__img{aspect-ratio:16/10;overflow:hidden;position:relative}
.salon__img img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1);filter:saturate(.92)}
.salon:hover .salon__img img{transform:scale(1.05)}
.salon__tag{position:absolute;top:1rem;left:1rem;padding:.45rem .8rem;background:rgba(11,10,9,.8);backdrop-filter:blur(8px);font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--c-accent)}
.salon__body{padding:1.8rem;display:flex;flex-direction:column;gap:.9rem}
.salon__body h3{font-size:2rem;margin:0}
.salon__body p{margin:0;color:var(--c-muted)}
.salon__note{display:flex;align-items:center;gap:.6rem;font-size:.9rem}
.salon__acts{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:auto;padding-top:.6rem}
.salon__acts .btn{min-height:44px;padding:.7rem 1rem;font-size:.74rem}
.salon__addr{font-size:.88rem;display:flex;gap:.5rem;align-items:center}
.salon__addr svg{width:15px;height:15px;color:var(--c-accent)}
@media (max-width:860px){.salons{grid-template-columns:1fr}}
.mot{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,6vw,5rem);align-items:center}
.mot blockquote{margin:0;font:400 clamp(1.5rem,3vw,2.3rem)/1.3 var(--f-display);font-style:italic}
@media (max-width:860px){.mot{grid-template-columns:1fr}}
.plan{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--c-line);border:1px solid var(--c-line)}
.plan>div{background:var(--c-bg);padding:1.5rem}
.plan strong{display:block;font:500 1.4rem/1.1 var(--f-display);margin-bottom:.3rem}
@media (max-width:860px){.plan{grid-template-columns:1fr 1fr}}
`;

function groupHeader(home) {
  const h = (a) => (home ? a : '/' + a).replace('//', '/');
  const b = PROD ? '/' : '/';
  return `<a class="skip" href="#main">Aller au contenu</a>
${PROD ? '' : `<div class="prepub">Pré-publication : version de travail, non indexée. Données d’avis relevées le ${dateFr(avis.derniere_verification)}.</div>`}
<header class="top"><div class="wrap top__in">
<a class="brand" href="${b}" aria-label="Maison Beauté Rouen, accueil"><img src="${b}assets/mbr-monogramme.webp" alt="" width="70" height="40"><span>Maison Beauté Rouen</span></a>
<nav class="nav" id="nav" aria-label="Navigation principale"><a href="${h('#etablissements')}">Nos établissements</a><a href="${h('#avis')}">Avis clients</a><a href="${h('#maison')}">La maison</a><a href="${h('#contact')}">Accès</a></nav>
<a class="btn btn--book" href="${h('#etablissements')}">Prendre rendez-vous</a>
<button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Ouvrir le menu"><span></span><span></span></button>
</div></header>`;
}
function groupFooter() {
  return `<footer class="foot"><div class="wrap">
<div class="foot__grid">
<div><img src="/assets/mbr-logo.webp" alt="Maison Beauté Rouen, coiffure, beauté, onglerie" width="220" height="132" loading="lazy" style="width:220px"><p style="margin-top:1rem">${esc(G.description)}</p></div>
${ETS.map((e) => `<div><h4>${esc(e.nom)}</h4><ul><li>${esc(e.adresse.rue)}, Rouen</li><li><a href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="groupe-footer"')}>${e.telephone}</a></li><li><a href="${siteHref(e.slug)}">Site du salon</a></li><li><a href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="groupe-footer"')}>Réserver</a></li></ul></div>`).join('').replace(/<\/div><div><h4>/, '</div><div><h4>')}
</div>
<div class="foot__bottom"><span>© ${new Date().getFullYear()} Maison Beauté Rouen</span><span><a href="/avis/">Méthode de calcul des avis</a> · <a href="/mentions-legales/">Mentions légales</a></span></div>
</div></footer>
<script src="/assets/app.js?v=${VERSION}" defer></script>
</body></html>`;
}

const IMG_SALON = { 'le-continent': marques['le-continent'].galerie[0], 'o-les-femmes': marques['o-les-femmes'].galerie[0], 'beaute-fatale': marques['beaute-fatale'].galerie[0], 'b-zen': marques['b-zen'].galerie[1] };

function buildGroupe() {
  const pre = PROD ? 'groupe/' : '';
  write(pre + 'assets/site.css', themeVars(GT) + '\n' + baseCss + groupeCss + '\n.foot__grid{grid-template-columns:1.4fr repeat(4,1fr)}@media (max-width:1000px){.foot__grid{grid-template-columns:1fr 1fr}}');
  write(pre + 'assets/app.js', appJs);
  for (const f of fs.readdirSync(path.join(ROOT, 'static/assets'))) fs.copyFileSync(path.join(ROOT, 'static/assets', f), path.join(ROOT, OUT, pre + 'assets', f));
  fs.copyFileSync(path.join(ROOT, 'static/favicon.ico'), path.join(ROOT, OUT, pre + 'favicon.ico'));
  const all = stats(ETS.map((e) => e.slug));
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': G.domaine + '/#organisation', name: G.nom, url: G.domaine + '/',
    logo: G.domaine + '/assets/mbr-logo.webp', description: G.description,
    subOrganization: ETS.map((e) => ({ '@id': e.domaine + '/#etablissement' })),
    address: { '@type': 'PostalAddress', addressLocality: 'Rouen', postalCode: '76100', addressCountry: 'FR' }
  };
  const list = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Établissements Maison Beauté Rouen', itemListElement: ETS.map((e, i) => ({ '@type': 'ListItem', position: i + 1, item: businessSchema(e, marques[e.slug]) })) };
  const gfaq = [
    ['Qu’est-ce que Maison Beauté Rouen ?', 'Maison Beauté Rouen est le groupe qui réunit quatre établissements indépendants de la rive gauche de Rouen : Le Continent (coiffeur homme et barber), Ô Les Femmes (coiffure femme et tresses), Beauté Fatale (coiffure afro, locks et extensions) et B-Zen (onglerie).'],
    ['Où sont situés les salons ?', 'Le Continent au 87 rue Lafayette, Ô Les Femmes et B-Zen au 113 rue Lafayette, Beauté Fatale au 34 rue Pavée (accès 106 rue Lafayette), tous à Rouen (76100).'],
    ['Comment réserver ?', 'Chaque établissement a sa propre page de réservation Planity, accessible depuis ce site et depuis le site de chaque salon. Vous pouvez aussi appeler directement le salon.'],
    ['Comment est calculé le nombre d’avis ?', `C’est la somme des avis publiés sur Google, PagesJaunes et Planity pour les quatre établissements, relevés le ${dateFr(avis.derniere_verification)}. La note globale est une moyenne pondérée par le nombre d’avis.`]
  ];
  const tems = ETS.flatMap((e) => (avis.temoignages[e.slug] || []).slice(0, 2).map((t) => [t, e]));
  const html = `${head({ title: 'Maison Beauté Rouen : 4 salons de coiffure, beauté et onglerie', description: `Maison Beauté Rouen réunit Le Continent, Ô Les Femmes, Beauté Fatale et B-Zen, rue Lafayette à Rouen. ${frInt(all.total)} avis clients sur Google, PagesJaunes et Planity.`, slug: 'groupe', p: '', theme: GT, css: '/assets/site.css', ogImage: G.domaine + '/assets/og-maison-beaute-rouen.jpg', schema: [org, list, faqSchema(gfaq)] })}
<body>
${groupHeader(true)}
<main id="main">
<section class="ghero"><div class="wrap">
<img class="ghero__logo" src="/assets/mbr-logo.webp" alt="Maison Beauté Rouen" width="900" height="542" fetchpriority="high">
<h1 class="sr">Maison Beauté Rouen, groupe de salons de coiffure, beauté et onglerie à Rouen</h1>
<p class="hero__lead">Quatre maisons spécialisées, une même exigence. Coiffure homme, coiffure femme et afro, locks et extensions, onglerie : chaque salon garde son identité, son équipe et son savoir-faire, à quelques pas les uns des autres sur la rive gauche de Rouen.</p>
<div class="btns"><a class="btn" href="#etablissements">Découvrir nos établissements</a><a class="btn btn--ghost" href="#avis">${frInt(all.total)} avis clients</a></div>
<p class="ghero__line">Coiffure · Beauté · Onglerie</p>
</div></section>

<section class="compteur" id="avis" aria-labelledby="cpt-t"><div class="wrap">
<span class="kicker" style="justify-content:center">La confiance de nos clients fait notre réputation</span>
<h2 id="cpt-t" class="sr">Nombre total d’avis clients des quatre établissements</h2>
<div class="compteur__n" data-count="${all.total}" data-avis="groupe.total"><span>+</span>${frInt(all.total)}</div>
<p class="compteur__l">avis clients</p>
<div class="compteur__meta"><span>4 établissements</span><span>Google · PagesJaunes · Planity</span><span>Note pondérée ${fr1(all.note)}/5</span></div>
<div class="repart">${PLATS.map((p) => `<div>${''}<div class="lbl">${LOGO_PLAT[p]} ${PLAT[p]}</div><div class="num" data-avis="groupe.${p}.nombre">${frInt(all.per[p].n)}</div><div class="sub">avis · note moyenne ${fr1(all.per[p].note)}/5 ${starsHtml(all.per[p].note)}</div></div>`).join('')}</div>
<div class="tbl-wrap"><table class="tbl-avis"><caption class="sr">Détail des avis par établissement et par plateforme</caption>
<thead><tr><th scope="col">Établissement</th>${PLATS.map((p) => `<th scope="col">${PLAT[p]}</th>`).join('')}<th scope="col">Total</th></tr></thead>
<tbody>${ETS.map((e) => { const a = avis.etablissements[e.slug]; const s = stats([e.slug]); return `<tr><th scope="row" style="text-align:left;font-weight:600"><a href="${siteHref(e.slug)}" style="text-decoration:none">${esc(e.nom)}</a></th>${PLATS.map((p) => `<td><a href="${platUrl(e, p)}" target="_blank" rel="noopener" style="text-decoration:none" ${track('avis_voir', e.slug, ` data-plateforme="${p}" data-emplacement="groupe"`)}>${frInt(a[p].nombre)} <span class="muted">· ${fr1(a[p].note)}/5</span></a></td>`).join('')}<td>${frInt(s.total)}</td></tr>`; }).join('')}</tbody>
<tfoot><tr><td>Total groupe</td>${PLATS.map((p) => `<td>${frInt(all.per[p].n)}</td>`).join('')}<td>${frInt(all.total)}</td></tr></tfoot></table></div>
<p class="avis__methode" style="max-width:70ch;margin:1.5rem auto 0">Relevé manuel effectué sur chaque plateforme le ${dateFr(avis.derniere_verification)}. Total = somme des avis des quatre établissements sur les trois plateformes. Notes moyennes pondérées par le nombre d’avis (toutes les plateformes notent sur 5). <a class="link" href="/avis/">Détail de la méthode</a></p>
</div></section>

<section class="sec" id="etablissements" aria-labelledby="eta-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Nos établissements</span><h2 id="eta-t">Quatre maisons, <em>quatre savoir-faire</em></h2></div><p>Choisissez le salon qui correspond à votre envie : chacun a son site, ses tarifs et sa réservation en ligne.</p></div>
<div class="salons">${ETS.map((e) => { const s = stats([e.slug]); const [img, alt] = IMG_SALON[e.slug]; return `<article class="salon reveal"><div class="salon__img"><img src="${img}" alt="${esc(alt)}" loading="lazy" width="800" height="500"><span class="salon__tag">${esc(marques[e.slug].accroche)}</span></div>
<div class="salon__body"><h3>${esc(e.nom)}</h3><p>${esc(marques[e.slug].hero.lead.split(':')[0])}.</p>
<div class="salon__note">${starsHtml(s.note)} <strong>${fr1(s.note)}/5</strong> <span class="muted">· ${frInt(s.total)} avis</span></div>
<div class="salon__addr">${I.pin} ${esc(e.adresse.rue)}, ${e.adresse.cp} Rouen · <a href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="groupe-carte"')}>${e.telephone}</a></div>
<div class="salon__acts"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="groupe-carte"')}>${I.cal} Réserver</a><a class="btn btn--ghost" href="${siteHref(e.slug)}" ${track('lien_groupe', 'groupe', ` data-cible="${e.slug}"`)}>Voir le site</a></div></div></article>`; }).join('')}</div>
</div></section>

<section class="sec sec--alt" aria-labelledby="tem-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Témoignages</span><h2 id="tem-t">Ils parlent de nos salons</h2></div><p>Extraits d’avis publics, recopiés tels quels et reliés à leur plateforme.</p></div>
<div class="carousel reveal" data-carousel><div class="track" tabindex="0" aria-label="Témoignages des quatre établissements">${tems.map(([t, e]) => temoin(t, e, true)).join('')}</div>
<div class="car__nav"><button class="car__btn" type="button" data-prev aria-label="Avis précédent">${I.left}</button><button class="car__btn" type="button" data-next aria-label="Avis suivant">${I.arrow}</button></div></div>
</div></section>

<section class="sec" id="maison" aria-labelledby="mai-t"><div class="wrap mot">
<div class="reveal"><span class="kicker">La maison</span><h2 id="mai-t">Un groupe, <em>des identités fortes</em></h2><p class="muted">Maison Beauté Rouen n’est pas un salon de plus : c’est la réunion de quatre établissements qui partagent la même rue, la même exigence d’accueil et ${esc(G.experience)}. Chaque maison garde son nom, son équipe et sa spécialité. Le groupe vous aide simplement à trouver la bonne adresse pour chaque envie.</p></div>
<blockquote class="reveal">« Un homme pour son dégradé, une femme pour ses tresses ou son chignon, un enfant pour sa première coupe, une cliente pour ses ongles : à Rouen, il y a une maison pour chacun. »</blockquote>
</div></section>

<section class="sec sec--alt" id="contact" aria-labelledby="acc-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Accès</span><h2 id="acc-t">Rue Lafayette et rue Pavée, Rouen rive gauche</h2></div><p>Les quatre établissements sont à quelques minutes à pied les uns des autres, près du pont Boieldieu.</p></div>
<div class="plan">${ETS.map((e) => `<div class="reveal"><strong>${esc(e.nom)}</strong><p class="muted" style="margin:0 0 .8rem">${esc(e.adresse.rue)}<br>${e.adresse.cp} Rouen</p>${horairesList(e)}<p style="margin-top:1rem"><a class="link" href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug, ' data-emplacement="groupe"')}>Itinéraire</a></p></div>`).join('')}</div>
</div></section>

<section class="sec" aria-labelledby="gfaq-t"><div class="narrow"><span class="kicker">Questions fréquentes</span><h2 id="gfaq-t">À propos du groupe</h2>${faqHtml(gfaq)}</div></section>
</main>
${groupFooter()}`;
  write(pre + 'index.html', html);

  // Page méthode des avis
  const meth = `${head({ title: 'Avis clients : méthode de calcul | Maison Beauté Rouen', description: 'Comment Maison Beauté Rouen calcule le total des avis Google, PagesJaunes et Planity de ses quatre établissements, et la date du dernier relevé.', slug: 'groupe', p: 'avis/', theme: GT, css: '/assets/site.css', schema: [crumbSchema([['Accueil', G.domaine + '/'], ['Avis clients', G.domaine + '/avis/']])] })}
<body>${groupHeader(false)}<main id="main"><div class="narrow prose" style="padding:4rem 0">
<span class="kicker">Transparence</span><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Nos avis clients : chiffres et méthode</h1>
<p class="answer">Au ${dateFr(avis.derniere_verification)}, les quatre établissements Maison Beauté Rouen totalisent ${frInt(all.total)} avis publics sur Google, PagesJaunes et Planity, pour une note moyenne pondérée de ${fr1(all.note)}/5.</p>
<h2>Comment le total est-il calculé ?</h2><p>Le total additionne le nombre d’avis affiché par chaque plateforme pour chaque établissement. Aucun avis n’est filtré ni ajouté.</p>
<h2>Comment la note est-elle calculée ?</h2><p>Chaque note est multipliée par son nombre d’avis ; la somme est divisée par le total des avis. Les trois plateformes notant sur 5, les notes sont comparables. Une simple moyenne des notes donnerait trop de poids aux plateformes qui comptent peu d’avis.</p>
<h2>Les chiffres sont-ils en temps réel ?</h2><p>Non. Ils sont relevés sur chaque plateforme et mis à jour régulièrement ; la date du dernier relevé est toujours indiquée. Pour lire les avis à jour, ouvrez la plateforme d’origine depuis le tableau ci-dessous.</p>
<div class="tbl-wrap"><table class="tbl-avis"><thead><tr><th>Établissement</th>${PLATS.map((p) => `<th>${PLAT[p]}</th>`).join('')}</tr></thead><tbody>${ETS.map((e) => `<tr><th scope="row" style="text-align:left">${esc(e.nom)}</th>${PLATS.map((p) => { const a = avis.etablissements[e.slug][p]; return `<td><a href="${platUrl(e, p)}" target="_blank" rel="noopener">${frInt(a.nombre)} avis · ${fr1(a.note)}/5</a><br><span class="muted" style="font-size:.78rem">relevé le ${dateFr(a.releve_le)}</span></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
</div></main>${groupFooter()}`;
  write(pre + 'avis/index.html', meth);

  const ml = `${head({ title: 'Mentions légales | Maison Beauté Rouen', description: 'Mentions légales du site Maison Beauté Rouen.', slug: 'groupe', p: 'mentions-legales/', theme: GT, css: '/assets/site.css', schema: [] })}
<body>${groupHeader(false)}<main id="main"><div class="narrow prose" style="padding:4rem 0"><h1 style="font-size:clamp(2rem,4vw,3rem)">Mentions légales</h1>
<h2>Éditeur</h2><p>Maison Beauté Rouen. Raison sociale, forme juridique, SIRET, adresse du siège et directeur de la publication : informations à fournir par le client avant mise en ligne.</p>
<h2>Établissements</h2>${ETS.map((e) => `<p><strong>${esc(e.nom)}</strong>, ${esc(e.adresse.rue)}, ${e.adresse.cp} ${e.adresse.ville}, tél. ${e.telephone}.</p>`).join('')}
<h2>Hébergement</h2><p>Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis.</p>
<h2>Avis clients</h2><p>Les avis affichés proviennent de Google, PagesJaunes et Planity. Ils sont recopiés sans modification, avec un lien vers leur source. Les marques citées appartiennent à leurs propriétaires.</p>
<h2>Mesure d’audience</h2><p>Les clics sur les boutons d’appel, de réservation et d’itinéraire peuvent être mesurés de façon anonyme, uniquement après votre consentement si un outil de mesure soumis à consentement est activé.</p>
</div></main>${groupFooter()}`;
  write(pre + 'mentions-legales/index.html', ml);

  if (PROD) {
    write(pre + 'robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${G.domaine}/sitemap.xml\n`);
    write(pre + 'sitemap.xml', sitemap(G.domaine, ['', 'avis/', 'mentions-legales/']));
  }
}

/* ---------- 404 + en-têtes ---------- */
function build404() {
  const html = `${head({ title: 'Page introuvable | Maison Beauté Rouen', description: 'Cette page n’existe pas.', slug: 'groupe', p: '404', theme: GT, css: '/assets/site.css', schema: [] })}
<body>${groupHeader(false)}<main id="main"><div class="narrow" style="padding:6rem 0;text-align:center"><span class="kicker" style="justify-content:center">Erreur 404</span><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Cette page n’existe pas</h1><p class="muted">Retrouvez nos établissements depuis l’accueil.</p><div class="btns" style="justify-content:center"><a class="btn" href="/">Accueil</a>${ETS.map((e) => `<a class="btn btn--ghost" href="${siteHref(e.slug)}">${esc(e.nom)}</a>`).join('')}</div></div></main>${groupFooter()}`;
  write(PROD ? 'groupe/404.html' : '404.html', html);
  if (!PROD) write('_headers', `/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/*/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
}

fs.rmSync(path.join(ROOT, OUT), { recursive: true, force: true });
buildGroupe();
for (const e of ETS) buildMarque(e);
build404();
write((PROD ? 'groupe/' : '') + 'data/avis.json', JSON.stringify(avis));
const all = stats(ETS.map((e) => e.slug));
console.log(`Build ${PROD ? 'prod' : 'pré-publication'} OK -> ${OUT}/  | total avis groupe = ${all.total} | note pondérée = ${all.note.toFixed(3)}`);
for (const e of ETS) { const s = stats([e.slug]); console.log(`  ${e.nom}: ${s.total} avis, ${s.note.toFixed(3)}/5`); }

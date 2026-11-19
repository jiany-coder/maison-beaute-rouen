// Générateur statique des 5 sites Maison Beauté Rouen.
// node build.mjs            -> dist/ (pré-publication : un seul domaine, sous-dossiers, noindex)
// node build.mjs --prod     -> dist-prod/<site>/ (un dossier par domaine, prêt à déployer)
import { makeGroupe } from './src/groupe.mjs';
import { makeMarqueHome } from './src/marquehome.mjs';
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
  const brandCss = fs.readFileSync(path.join(ROOT, `src/brand-${e.slug}.css`), 'utf8');
  const css = themeVars(m.theme) + '\n' + baseCss + (m.theme.gold ? `\n.kicker{color:${m.theme.gold}}` : '') + '\n' + brandCss;
  write(pre + 'assets/site.css', css);
  write(pre + 'assets/app.js', appJs);
  const st = stats([e.slug]);
  const bizSchema = businessSchema(e, m);

  // Accueil
  const home = `${head({ title: m.seo.title, description: m.seo.description, slug: e.slug, p: '', theme: m.theme, css: base + 'assets/site.css', ogImage: m.hero.image, schema: [bizSchema, faqSchema(m.faq)] })}
<body class="b-${e.slug}">
${header(e, base, true)}
<main id="main">
${MH.hero(e, m)}

<div class="wrap"><div class="atouts">${m.atouts.map(([t, d]) => `<div class="reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div></div>

${avisModule(e)}

${MH.presta(e, m, base)}

<section class="sec" id="tarifs" aria-labelledby="tarifs-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">Tarifs</span><h2 id="tarifs-t">Nos tarifs</h2></div></div>
<div class="tarifs-wrap"><div class="reveal">${tarifsTable(m.tarifs)}</div>
<aside class="tarifs-aside reveal"><h3>Réservez votre créneau</h3><p class="muted">Choisissez votre prestation et votre horaire en ligne, confirmation immédiate et paiement au salon.</p><div class="btns"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="tarifs"')}>${I.cal} Réserver en ligne</a><a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="tarifs"')}>${I.phone} Appeler</a></div></aside></div>
</div></section>

${MH.real(e, m)}

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
<body class="b-${e.slug}">
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
const { GT, groupHeader, groupFooter, buildGroupe } = makeGroupe({ PROD, ROOT, fs, path, write, OUT, themeVars, baseCss, appJs, stats, ETS, G, head, esc, fr1, frInt, dateFr, starsHtml, LOGO_PLAT, PLAT, PLATS, platUrl, track, I, temoin, horairesList, faqHtml, mapsUrl, siteHref, businessSchema, marques, faqSchema, crumbSchema, sitemap, avis, VERSION });

const MH = makeMarqueHome({ esc, fr1, frInt, I, track, starsHtml, avis, stats });

/* ---------- 404 + en-têtes ---------- */
function build404() {
  const html = `${head({ title: 'Page introuvable | Maison Beauté Rouen', description: 'Cette page n’existe pas.', slug: 'groupe', p: '404', theme: GT, css: '/assets/site.css', schema: [] })}
<body class="b-groupe">${groupHeader(false)}<main id="main"><div class="narrow" style="padding:6rem 0;text-align:center"><span class="kicker" style="justify-content:center">Erreur 404</span><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Cette page n’existe pas</h1><p class="muted">Retrouvez nos établissements depuis l’accueil.</p><div class="btns" style="justify-content:center"><a class="btn" href="/">Accueil</a>${ETS.map((e) => `<a class="btn btn--ghost" href="${siteHref(e.slug)}">${esc(e.nom)}</a>`).join('')}</div></div></main>${groupFooter()}`;
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

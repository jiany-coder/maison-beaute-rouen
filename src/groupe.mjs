// Site groupe Maison Beauté Rouen (direction artistique V2). Reçoit les utilitaires de build.mjs.
export function makeGroupe(c) {
  const { PROD, ROOT, fs, path, write, OUT, themeVars, baseCss, appJs, stats, ETS, G, head, esc, fr1, frInt, dateFr, starsHtml, LOGO_PLAT, PLAT, PLATS, platUrl, track, I, temoin, horairesList, faqHtml, mapsUrl, siteHref, businessSchema, marques, faqSchema, crumbSchema, sitemap, avis, VERSION } = c;
const GT = {
  fonts: 'family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Manrope:wght@300;400;500;600',
  display: "'Cormorant Garamond', Garamond, Georgia, serif", body: "'Manrope', system-ui, sans-serif",
  bg: '#0b0a09', surface: '#13110f', surface2: '#1a1714', text: '#f3ece0', muted: '#a89f90',
  accent: '#c9a45c', accentText: '#0b0a09', line: 'rgba(201,164,92,.16)', dark: true, titleCase: 'none', titleTrack: '0', radius: '2px'
};
const groupeCss = fs.readFileSync(path.join(ROOT, 'src/groupe.css'), 'utf8');

function groupHeader(home) {
  const h = (a) => (home ? a : '/' + a).replace('//', '/');
  const b = '/';
  const menu = `<details class="book"><summary class="btn btn--book">Prendre rendez-vous</summary><div class="book__menu">${ETS.map((e) => `<a href="${e.planity}" target="_blank" rel="noopener" style="--k:${KEY[e.slug]}" ${track('planity', e.slug, ' data-emplacement="groupe-menu"')}><i></i><strong>${esc(e.nom)}</strong><small>${esc(e.metier.split(',')[0])} · ${esc(e.adresse.rue)}</small><span>Réserver</span></a>`).join('')}</div></details>`;
  return `<a class="skip" href="#main">Aller au contenu</a>
${PROD ? '' : `<div class="prepub">Pré-publication : version de travail, non indexée. Données d’avis relevées le ${dateFr(avis.derniere_verification)}.</div>`}
<header class="top${home ? ' top--over' : ''}${PROD ? '' : ' has-pp'}"><div class="wrap top__in">
<a class="brand" href="${b}" aria-label="Maison Beauté Rouen, accueil"><img src="${b}assets/mbr-monogramme.webp" alt="" width="70" height="40"><span>Maison Beauté Rouen</span></a>
<nav class="nav" id="nav" aria-label="Navigation principale"><a href="${h('#etablissements')}">Nos établissements</a><a href="${h('#avis')}">Avis clients</a><a href="${h('#maison')}">La maison</a><a href="${h('#contact')}">Accès</a></nav>
${menu}
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

const KEY = { 'le-continent': '#c8935a', 'o-les-femmes': '#d98b6a', 'beaute-fatale': '#d6a990', 'b-zen': '#b79adb' };
const WP = 'https://www.beautefatale-rouen.fr/wp-content/uploads/';
const SB = 'https://files.sbcdnsb.com/images/YkbzvHeq4gxQhRzv4BqtkA/content/';
const PL = (id, w = 1400) => `https://mms.cdn.global.prodsharedsvc.planityapp.com/planity/image/upload/c_limit,w_${w},f_auto/${id}`;
const PANEL = {
  'le-continent': { img: marques['le-continent'].hero.image, pos: '60% 22%', alt: marques['le-continent'].hero.imageAlt, row: WP + '2026/11/IMG-20261118-WA0033.jpg', rowPos: '55% 30%', rowAlt: 'Dégradé et barbe taillée, coiffure homme à Rouen', desc: 'Dégradés nets, dégradé à blanc, contours et barbe à la tondeuse, pour les hommes et les garçons.' },
  'o-les-femmes': { img: SB + '1765792137/6892040/1000/2025-11-2020251212-568654-6e0ugi.jpeg', pos: '50% 35%', alt: 'Tresses collées blondes vues de profil, salon Ô Les Femmes à Rouen', row: SB + '1765792137/6892040/1000/2025-11-2020251212-568654-6e0ugi.jpeg', rowPos: '50% 32%', rowAlt: 'Tresses collées blondes vues de profil, salon Ô Les Femmes à Rouen', desc: 'Tresses collées, knotless et boho braids, perruques, tissages et chignons de mariage.' },
  'beaute-fatale': { img: WP + '2025/09/FB_IMG_1756300205445.jpg', pos: '50% 30%', alt: 'Boho braids longues avec perles, réalisées chez Beauté Fatale à Rouen', row: WP + '2025/09/Nouveau-projet-21.webp', rowPos: '50% 38%', rowAlt: 'Locks courts et sourire, coiffure afro chez Beauté Fatale à Rouen', desc: 'Locks, tresses, tissages et extensions à la kératine, pour femmes, hommes et enfants.' },
  'b-zen': { img: PL('lj1eu0xqdyq8fzww8wjc'), pos: '50% 40%', alt: 'Mains manucurées nude avec nail art doré sur fourrure blanche, onglerie B-Zen à Rouen', row: PL('ld7kqb73iddjio6zhi7x'), rowPos: '50% 45%', rowAlt: 'Ongles nude rosé amande sur fourrure blanche, onglerie B-Zen à Rouen', desc: 'Pose gel, capsules, vernis semi-permanent, nail art et beauté des pieds.' }
};
for (const k of Object.keys(PANEL)) PANEL[k].metier = marques[k].accroche;
const BAND = ['Coiffure homme', 'Barber', 'Tresses et braids', 'Perruques et tissages', 'Locks', 'Extensions kératine', 'Coiffure de mariage', 'Pose gel', 'Vernis semi-permanent', 'Nail art', 'Beauté des pieds'];

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
<body class="b-groupe">
${groupHeader(true)}
<main id="main">
<section class="gh" aria-labelledby="gh-t">
<div class="gh__panels">
${ETS.map((e, i) => { const p = PANEL[e.slug]; return `<a class="gh__p" style="--k:${KEY[e.slug]};--i:${i};--pos:${p.pos}" href="${siteHref(e.slug)}" ${track('lien_groupe', 'groupe', ` data-cible="${e.slug}" data-emplacement="bannière"`)}><img src="${p.img}" alt="${esc(p.alt)}" width="900" height="1200" ${i === 0 ? 'fetchpriority="high"' : 'loading="eager"'} decoding="async"><span class="gh__cap"><span class="gh__n">0${i + 1}</span><small>${esc(p.metier)}</small><strong>${esc(e.nom)}</strong><span class="gh__go">Découvrir ${I.arrow}</span></span></a>`; }).join('')}
</div>
<div class="gh__grain" aria-hidden="true"></div>
<div class="gh__intro">
<h1 id="gh-t"><span class="gh__brand">Maison Beauté Rouen</span><span class="gh__tag">Quatre maisons,<i>une même exigence.</i></span></h1>
<div class="gh__side"><p>Coiffure homme, coiffure femme et afro, locks et extensions, onglerie : quatre établissements spécialisés, rue Lafayette et rue Pavée, sur la rive gauche de Rouen.</p>
<div class="btns"><a class="btn" href="#etablissements">Découvrir les maisons</a><a class="btn btn--ghost" href="#avis">${frInt(all.total)} avis</a></div></div>
</div>
<span class="gh__scroll" aria-hidden="true"></span>
</section>

<div class="band" aria-hidden="true"><div class="band__in">${[0, 1].map(() => BAND.map((t) => `<span>${t}</span>`).join('')).join('')}</div></div>

<section class="gc" id="avis" aria-labelledby="cpt-t"><div class="wrap gc__grid">
<div class="reveal">
<span class="kicker">La confiance de nos clients</span>
<h2 id="cpt-t" class="sr">Nombre total d’avis clients des quatre établissements</h2>
<div class="gc__n" data-count="${all.total}" data-avis="groupe.total"><span>+</span>${frInt(all.total)}</div>
<p class="gc__l">avis clients, quatre maisons</p>
<div class="gc__meta"><span>Note pondérée ${fr1(all.note)}/5</span><span>Google · PagesJaunes · Planity</span></div>
</div>
<div class="reveal">
<div class="gc__plats">${PLATS.map((p) => `<div><div class="lbl">${LOGO_PLAT[p]} ${PLAT[p]}</div><div class="num" data-avis="groupe.${p}.nombre">${frInt(all.per[p].n)}</div><div class="sub">avis · note moyenne ${fr1(all.per[p].note)}/5 ${starsHtml(all.per[p].note)}</div></div>`).join('')}</div>
<details><summary>Détail par établissement</summary>
<div class="tbl-wrap"><table class="tbl-avis"><caption class="sr">Détail des avis par établissement et par plateforme</caption>
<thead><tr><th scope="col">Établissement</th>${PLATS.map((p) => `<th scope="col">${PLAT[p]}</th>`).join('')}<th scope="col">Total</th></tr></thead>
<tbody>${ETS.map((e) => { const a = avis.etablissements[e.slug]; const s = stats([e.slug]); return `<tr><th scope="row" style="text-align:left;font-weight:500"><a href="${siteHref(e.slug)}" style="text-decoration:none">${esc(e.nom)}</a></th>${PLATS.map((p) => `<td><a href="${platUrl(e, p)}" target="_blank" rel="noopener" style="text-decoration:none" ${track('avis_voir', 'groupe', ` data-plateforme="${p}" data-cible="${e.slug}"`)}>${frInt(a[p].nombre)} · ${fr1(a[p].note)}/5</a></td>`).join('')}<td>${frInt(s.total)}</td></tr>`; }).join('')}</tbody>
<tfoot><tr><td>Total groupe</td>${PLATS.map((p) => `<td>${frInt(all.per[p].n)}</td>`).join('')}<td>${frInt(all.total)}</td></tr></tfoot></table></div>
</details>
<p class="gc__note">Relevé manuel effectué sur chaque plateforme le ${dateFr(avis.derniere_verification)}. Total = somme des avis des quatre établissements sur les trois plateformes. Notes moyennes pondérées par le nombre d’avis. <a href="/avis/">Méthode de calcul</a></p>
</div>
</div></section>

<section class="gm-sec" id="etablissements" aria-labelledby="eta-t">
<div class="gm-head reveal"><div><span class="kicker">Nos établissements</span><h2 id="eta-t">Quatre maisons, <em>quatre savoir-faire</em></h2></div><p>Choisissez la maison qui correspond à votre envie : chacune a son site, ses tarifs et sa réservation en ligne.</p></div>
${ETS.map((e, i) => { const s = stats([e.slug]); const p = PANEL[e.slug]; return `<article class="gm ${i % 2 ? 'gm--r' : ''}" style="--k:${KEY[e.slug]}">
<figure class="gm__img reveal" style="--pos:${p.rowPos}"><img src="${p.row}" alt="${esc(p.rowAlt)}" loading="lazy" decoding="async" width="1200" height="900" data-parallax></figure>
<div class="gm__card reveal"><span class="gm__n">0${i + 1}</span><p class="gm__metier">${esc(p.metier)}</p><h3>${esc(e.nom)}</h3><p>${esc(p.desc)}</p>
<div class="gm__note">${starsHtml(s.note)} <strong>${fr1(s.note)}/5</strong> <span>· ${frInt(s.total)} avis</span></div>
<div class="gm__addr">${I.pin}<span>${esc(e.adresse.rue)}, ${e.adresse.cp} Rouen · <a href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="groupe-carte"')}>${e.telephone}</a></span></div>
<div class="gm__acts"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ' data-emplacement="groupe-carte"')}>${I.cal} Réserver</a><a class="btn btn--ghost" href="${siteHref(e.slug)}" ${track('lien_groupe', 'groupe', ` data-cible="${e.slug}"`)}>Voir le site</a></div></div>
</article>`; }).join('')}
</section>

<section class="gt" aria-labelledby="tem-t"><div class="wrap">
<span class="kicker">Témoignages</span><h2 id="tem-t">Ils parlent de nos maisons</h2>
<div class="carousel" data-carousel><div class="track" tabindex="0" aria-label="Témoignages des quatre établissements">${tems.map(([t, e]) => temoin(t, e, true)).join('')}</div>
<div class="car__nav"><button class="car__btn" type="button" data-prev aria-label="Avis précédent">${I.left}</button><button class="car__btn" type="button" data-next aria-label="Avis suivant">${I.arrow}</button></div></div>
<p class="gc__note" style="margin:1.6rem auto 0">Extraits d’avis publics, recopiés tels quels et reliés à leur plateforme.</p>
</div></section>

<section class="gx" id="maison" aria-labelledby="mai-t">
<span class="kicker" style="justify-content:center">La maison</span>
<h2 id="mai-t" class="gx__t reveal">Une rue, <em>quatre identités</em> fortes.</h2>
<p class="gx__p reveal">Maison Beauté Rouen n’est pas un salon de plus : c’est la réunion de quatre établissements qui partagent la même rue, la même exigence d’accueil et ${esc(G.experience)}. Chaque maison garde son équipe, son style et son savoir-faire.</p>
<div class="gx__nums reveal"><div><b>4</b><span>maisons spécialisées</span></div><div><b>2</b><span>rues, rive gauche</span></div><div><b>${frInt(all.total)}</b><span>avis publics</span></div></div>
</section>

<section class="gr" id="contact" aria-labelledby="acc-t">
<div class="gr__head"><h2 id="acc-t">Rue Lafayette <em>&amp; rue Pavée</em></h2><p>Les quatre établissements sont à quelques minutes à pied les uns des autres, près du pont Boieldieu.</p></div>
<div class="gr__grid">${ETS.map((e) => `<div class="gr__c reveal" style="--k:${KEY[e.slug]}"><span class="kicker" style="color:${KEY[e.slug]}">${esc(PANEL[e.slug].metier)}</span><strong>${esc(e.nom)}</strong><address>${esc(e.adresse.rue)}<br>${e.adresse.cp} Rouen</address>${horairesList(e)}<p style="margin-top:1rem"><a class="link" href="${mapsUrl(e)}" target="_blank" rel="noopener" ${track('maps', e.slug, ' data-emplacement="groupe-acces"')}>Itinéraire</a> · <a class="link" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ' data-emplacement="groupe-acces"')}>${e.telephone}</a></p></div>`).join('')}</div>
</section>

<section class="sec" aria-labelledby="gfaq-t"><div class="narrow"><span class="kicker">Questions fréquentes</span><h2 id="gfaq-t">À propos du groupe</h2>${faqHtml(gfaq)}</div></section>
</main>
${groupFooter()}`;
  write(pre + 'index.html', html);

  // Page méthode des avis
  const meth = `${head({ title: 'Avis clients : méthode de calcul | Maison Beauté Rouen', description: 'Comment Maison Beauté Rouen calcule le total des avis Google, PagesJaunes et Planity de ses quatre établissements, et la date du dernier relevé.', slug: 'groupe', p: 'avis/', theme: GT, css: '/assets/site.css', schema: [crumbSchema([['Accueil', G.domaine + '/'], ['Avis clients', G.domaine + '/avis/']])] })}
<body class="b-groupe">${groupHeader(false)}<main id="main"><div class="narrow prose" style="padding:4rem 0">
<span class="kicker">Transparence</span><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Nos avis clients : chiffres et méthode</h1>
<p class="answer">Au ${dateFr(avis.derniere_verification)}, les quatre établissements Maison Beauté Rouen totalisent ${frInt(all.total)} avis publics sur Google, PagesJaunes et Planity, pour une note moyenne pondérée de ${fr1(all.note)}/5.</p>
<h2>Comment le total est-il calculé ?</h2><p>Le total additionne le nombre d’avis affiché par chaque plateforme pour chaque établissement. Aucun avis n’est filtré ni ajouté.</p>
<h2>Comment la note est-elle calculée ?</h2><p>Chaque note est multipliée par son nombre d’avis ; la somme est divisée par le total des avis. Les trois plateformes notant sur 5, les notes sont comparables. Une simple moyenne des notes donnerait trop de poids aux plateformes qui comptent peu d’avis.</p>
<h2>Les chiffres sont-ils en temps réel ?</h2><p>Non. Ils sont relevés sur chaque plateforme et mis à jour régulièrement ; la date du dernier relevé est toujours indiquée. Pour lire les avis à jour, ouvrez la plateforme d’origine depuis le tableau ci-dessous.</p>
<div class="tbl-wrap"><table class="tbl-avis"><thead><tr><th>Établissement</th>${PLATS.map((p) => `<th>${PLAT[p]}</th>`).join('')}</tr></thead><tbody>${ETS.map((e) => `<tr><th scope="row" style="text-align:left">${esc(e.nom)}</th>${PLATS.map((p) => { const a = avis.etablissements[e.slug][p]; return `<td><a href="${platUrl(e, p)}" target="_blank" rel="noopener">${frInt(a.nombre)} avis · ${fr1(a.note)}/5</a><br><span class="muted" style="font-size:.78rem">relevé le ${dateFr(a.releve_le)}</span></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
</div></main>${groupFooter()}`;
  write(pre + 'avis/index.html', meth);

  const ml = `${head({ title: 'Mentions légales | Maison Beauté Rouen', description: 'Mentions légales du site Maison Beauté Rouen.', slug: 'groupe', p: 'mentions-legales/', theme: GT, css: '/assets/site.css', schema: [] })}
<body class="b-groupe">${groupHeader(false)}<main id="main"><div class="narrow prose" style="padding:4rem 0"><h1 style="font-size:clamp(2rem,4vw,3rem)">Mentions légales</h1>
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

  return { GT, groupHeader, groupFooter, buildGroupe };
}

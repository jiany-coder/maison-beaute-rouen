// Accueils des 4 marques : chaque marque a sa propre composition (hero, prestations, réalisations).
export function makeMarqueHome(c) {
  const { esc, fr1, frInt, I, track, starsHtml, avis, stats } = c;
  const fact = (e) => `${esc(e.adresse.rue)}, Rouen`;
  const heure = (e) => `${esc(e.horaires[0].label)} ${e.horaires[0].ouvre.replace(':', 'h')}–${e.horaires[0].ferme.replace(':', 'h')}`;
  const btns = (e, emp, ghost = true) => `<div class="btns"><a class="btn" href="${e.planity}" target="_blank" rel="noopener" ${track('planity', e.slug, ` data-emplacement="${emp}"`)}>${I.cal} Réserver en ligne</a>${ghost ? `<a class="btn btn--ghost" href="tel:${e.telephone_e164}" ${track('telephone', e.slug, ` data-emplacement="${emp}"`)}>${I.phone} ${e.telephone}</a>` : ''}</div>`;
  const note = (e) => { const st = stats([e.slug]); return { st, g: avis.etablissements[e.slug].google.note }; };
  const lien = (s, base) => (s.lien.startsWith('#') ? s.lien : base + s.lien);
  const img = (src, alt, extra = '') => `<img src="${src}" alt="${esc(alt)}" decoding="async" ${extra}>`;
  const G = (m, i) => m.galerie[i % m.galerie.length];

  const H = {};
  const P = {};
  const R = {};

  /* ---------- Le Continent : barber, noir et acier ---------- */
  H['le-continent'] = (e, m) => { const { st, g } = note(e); return `<section class="lc-hero">
<img class="lc-hero__bg" src="${m.hero.image}" alt="${esc(m.hero.imageAlt)}" fetchpriority="high" decoding="async">
<div class="lc-hero__shade"></div>
<div class="wrap lc-hero__in">
<span class="lc-87" aria-hidden="true">87</span>
<div class="lc-hero__txt reveal in"><span class="kicker">${esc(m.hero.kicker)}</span><h1>${esc(m.hero.h1)}</h1><p class="hero__lead">${esc(m.hero.lead)}</p>${btns(e, 'hero')}</div>
</div>
<div class="lc-bar"><div class="wrap lc-bar__in"><span>${I.pin} ${fact(e)}</span><span>${I.clock} ${heure(e)}</span><a href="#avis" style="text-decoration:none">${starsHtml(g, false)} <strong>${fr1(g)}</strong> · ${frInt(st.total)} avis</a></div></div>
</section>`; };
  P['le-continent'] = (e, m, base) => `<section class="sec" id="prestations" aria-labelledby="presta-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">${esc(m.accroche)}</span><h2 id="presta-t">La carte</h2></div><p>Prix et durées relevés sur notre page de réservation Planity.</p></div>
<ol class="lc-menu">${m.services.map((s, i) => `<li class="reveal"><a href="${lien(s, base)}"><span class="lc-menu__n">0${i + 1}</span><span class="lc-menu__t"><strong>${esc(s.titre)}</strong><small>${esc(s.texte)}</small></span><span class="lc-menu__d">${esc(s.duree)}</span><span class="lc-menu__p">${esc(s.prix)}</span><span class="lc-menu__go">${I.arrow}</span></a></li>`).join('')}</ol>
</div></section>`;
  R['le-continent'] = (e, m) => `<section class="sec" id="realisations" aria-labelledby="real-t"><div class="wrap"><div class="sec__head reveal"><div><span class="kicker">Réalisations</span><h2 id="real-t">Le travail du salon</h2></div><p>Photos publiées par le salon. Survolez pour passer en couleur.</p></div></div>
<div class="lc-strip">${m.galerie.map(([src, alt]) => `<figure>${img(src, alt, 'loading="lazy" width="500" height="700"')}</figure>`).join('')}</div>
${m.equipe ? `<div class="wrap"><p class="muted" style="margin-top:1.6rem">L’équipe : ${m.equipe.map(esc).join(', ')}.</p></div>` : ''}</section>`;

  /* ---------- Ô Les Femmes : éditorial rose, ivoire, chocolat ---------- */
  H['o-les-femmes'] = (e, m) => { const { st, g } = note(e); const [s2, a2] = G(m, 2); return `<section class="of-hero"><div class="wrap of-hero__grid">
<div class="of-hero__txt reveal in"><span class="kicker">${esc(m.hero.kicker)}</span><h1>${esc(m.hero.h1)}</h1><p class="hero__lead">${esc(m.hero.lead)}</p>${btns(e, 'hero')}
<p class="of-hero__note">${starsHtml(g, false)} <strong>${fr1(g)}/5</strong> · ${frInt(st.total)} avis · ${fact(e)}</p></div>
<div class="of-hero__pics"><figure class="of-p1">${img(m.hero.image, m.hero.imageAlt, 'fetchpriority="high" width="800" height="1000"')}</figure><figure class="of-p2">${img(s2, a2, 'loading="lazy" width="500" height="600"')}</figure><span class="of-tag" aria-hidden="true">Ô</span></div>
</div></section>`; };
  P['o-les-femmes'] = (e, m, base) => `<section class="sec of-presta" id="prestations" aria-labelledby="presta-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">${esc(m.accroche)}</span><h2 id="presta-t">Nos prestations</h2></div><p>Chaque prestation est détaillée sur sa page, avec tarifs et durées.</p></div>
${m.services.map((s, i) => { const [src, alt] = G(m, i + 3); return `<article class="of-row ${i % 2 ? 'of-row--r' : ''} reveal"><figure>${img(src, alt, 'loading="lazy" width="700" height="560"')}</figure><div><span class="of-row__n">0${i + 1}</span><h3>${esc(s.titre)}</h3><p>${esc(s.texte)}</p><p class="of-row__meta"><strong>${esc(s.prix)}</strong> · ${esc(s.duree)}</p><a class="link" href="${lien(s, base)}">Voir la prestation ${I.arrow}</a></div></article>`; }).join('')}
</div></section>`;
  R['o-les-femmes'] = (e, m) => `<section class="sec sec--alt" id="realisations" aria-labelledby="real-t"><div class="wrap"><div class="sec__head reveal"><div><span class="kicker">Réalisations</span><h2 id="real-t">Le travail du salon</h2></div><p>Photos de réalisations publiées par le salon.</p></div>
<div class="of-mason">${m.galerie.map(([src, alt]) => `<figure class="reveal">${img(src, alt, 'loading="lazy" width="600" height="750"')}</figure>`).join('')}</div>
${m.equipe ? `<p class="muted" style="margin-top:1.6rem">L’équipe : ${m.equipe.map(esc).join(', ')}.</p>` : ''}</div></section>`;

  /* ---------- Beauté Fatale : lookbook brun et cuivre ---------- */
  H['beaute-fatale'] = (e, m) => { const { st, g } = note(e); return `<section class="bf-hero"><div class="bf-hero__txt reveal in">
<span class="kicker">${esc(m.hero.kicker)}</span><h1>${esc(m.hero.h1)}</h1><p class="hero__lead">${esc(m.hero.lead)}</p>${btns(e, 'hero')}
<p class="bf-hero__note">${starsHtml(g, false)} <strong>${fr1(g)}/5</strong> · ${frInt(st.total)} avis · ${fact(e)}</p></div>
<figure class="bf-hero__img">${img(m.hero.image, m.hero.imageAlt, 'fetchpriority="high" width="900" height="1200"')}<figcaption>${esc(m.accroche)}</figcaption></figure>
</section>`; };
  P['beaute-fatale'] = (e, m, base) => `<section class="sec" id="prestations" aria-labelledby="presta-t"><div class="wrap bf-chap">
<div class="bf-chap__side"><span class="kicker">${esc(m.accroche)}</span><h2 id="presta-t">Nos spécialités</h2><p class="muted">Prix et durées relevés sur notre page de réservation Planity.</p></div>
<div class="bf-chap__list">${m.services.map((s, i) => `<a class="bf-ch reveal" href="${lien(s, base)}"><span class="bf-ch__n">0${i + 1}</span><span class="bf-ch__b"><h3>${esc(s.titre)}</h3><p>${esc(s.texte)}</p></span><span class="bf-ch__p"><strong>${esc(s.prix)}</strong><small>${esc(s.duree)}</small></span></a>`).join('')}</div>
</div></section>`;
  R['beaute-fatale'] = (e, m) => `<section class="sec sec--alt" id="realisations" aria-labelledby="real-t"><div class="wrap"><div class="sec__head reveal"><div><span class="kicker">Lookbook</span><h2 id="real-t">Réalisations</h2></div><p>Photos publiées par le salon.</p></div>
<div class="bf-look">${m.galerie.map(([src, alt]) => `<figure class="reveal">${img(src, alt, 'loading="lazy" width="600" height="800"')}</figure>`).join('')}</div>
${m.equipe ? `<p class="muted" style="margin-top:1.6rem">L’équipe : ${m.equipe.map(esc).join(', ')}.</p>` : ''}</div></section>`;

  /* ---------- B-Zen : institut, ivoire, nude, macro ---------- */
  H['b-zen'] = (e, m) => { const { st, g } = note(e); return `<section class="bz-hero"><div class="wrap">
<div class="bz-hero__txt reveal in"><span class="kicker">${esc(m.hero.kicker)}</span><h1>${esc(m.hero.h1)}</h1><p class="hero__lead">${esc(m.hero.lead)}</p>${btns(e, 'hero')}</div>
<figure class="bz-hero__img">${img(m.hero.image, m.hero.imageAlt, 'fetchpriority="high" width="1400" height="700"')}<figcaption>${starsHtml(g, false)} <strong>${fr1(g)}/5</strong> · ${frInt(st.total)} avis · ${fact(e)}</figcaption></figure>
</div></section>`; };
  P['b-zen'] = (e, m, base) => `<section class="sec" id="prestations" aria-labelledby="presta-t"><div class="wrap">
<div class="sec__head reveal"><div><span class="kicker">${esc(m.accroche)}</span><h2 id="presta-t">Les techniques</h2></div><p>Prix et durées relevés sur notre page de réservation Planity.</p></div>
<div class="bz-tech">${m.services.map((s, i) => { const [src, alt] = G(m, i + 1); return `<a class="bz-t reveal" href="${lien(s, base)}"><figure>${img(src, alt, 'loading="lazy" width="600" height="600"')}</figure><span class="bz-t__n">0${i + 1}</span><h3>${esc(s.titre)}</h3><p>${esc(s.texte)}</p><span class="bz-t__f"><strong>${esc(s.prix)}</strong><small>${esc(s.duree)}</small></span></a>`; }).join('')}</div>
</div></section>`;
  R['b-zen'] = (e, m) => `<section class="sec sec--alt" id="realisations" aria-labelledby="real-t"><div class="wrap"><div class="sec__head reveal"><div><span class="kicker">Réalisations</span><h2 id="real-t">Les mains du salon</h2></div><p>Photos publiées par le salon. Faites défiler.</p></div></div>
<div class="bz-rail" tabindex="0" aria-label="Réalisations">${m.galerie.map(([src, alt]) => `<figure>${img(src, alt, 'loading="lazy" width="520" height="650"')}</figure>`).join('')}</div>
${m.equipe ? `<div class="wrap"><p class="muted" style="margin-top:1.6rem">L’équipe : ${m.equipe.map(esc).join(', ')}.</p></div>` : ''}</section>`;

  return { hero: (e, m) => H[e.slug](e, m), presta: (e, m, base) => P[e.slug](e, m, base), real: (e, m) => R[e.slug](e, m) };
}

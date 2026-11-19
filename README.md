# Maison Beauté Rouen : écosystème des 5 sites

Générateur statique sans dépendance (Node 18+). Un seul jeu de données alimente les 5 sites.

| Site | Domaine de production | Dossier de pré-publication |
| --- | --- | --- |
| Maison Beauté Rouen (groupe) | à valider : www.maison-beaute-rouen.fr | `/` |
| Le Continent | www.lecontinent87.fr | `/le-continent/` |
| Ô Les Femmes | www.olesfemmes.fr | `/o-les-femmes/` |
| Beauté Fatale | www.beautefatale-rouen.fr | `/beaute-fatale/` |
| B-Zen | www.onglerie-rouen.fr | `/b-zen/` |

## Commandes

```bash
node build.mjs          # pré-publication -> dist/ (noindex, un seul domaine)
node build.mjs --prod   # production -> dist-prod/<site>/ (un dossier par domaine, sitemap, robots, llms.txt)
```

Cloudflare Pages (pré-publication) : commande de build `node build.mjs`, dossier de sortie `dist`.

## Où modifier quoi

| Donnée | Fichier |
| --- | --- |
| Adresses, téléphones, horaires, liens Planity / Google / PagesJaunes, logos | `data/etablissements.json` |
| Notes, nombres d'avis, dates de relevé, témoignages | `data/avis.json` |
| Textes, prestations, tarifs, FAQ, photos, couleurs et polices de chaque marque | `src/contenu.mjs` |
| Styles communs | `src/base.css` |
| Interactions (menu, carrousel, compteur, suivi des clics) | `src/app.js` |

Chaque modification poussée sur GitHub reconstruit automatiquement le site.

## Avis : fonctionnement réel

| Plateforme | Récupération | Détail |
| --- | --- | --- |
| Google | Automatique possible (API officielle Google Places, hebdomadaire) | Workflow `.github/workflows/avis-google.yml`. Ajouter le secret GitHub `GOOGLE_PLACES_API_KEY` (clé restreinte à l'API Places, jamais dans le code). Sans clé : mise à jour manuelle. |
| PagesJaunes | Manuelle | Pas d'API publique ouverte aux établissements. Relever note et nombre sur la fiche `/pros/<id>` puis modifier `data/avis.json`. |
| Planity | Manuelle | Pas d'API publique. Relever note et nombre sur la page Planity puis modifier `data/avis.json`. |

Règles appliquées par le code :
- le total groupe additionne les 12 compteurs (4 établissements x 3 plateformes) ;
- la note globale est une moyenne pondérée par le nombre d'avis (jamais une moyenne simple) ;
- la date de relevé de chaque plateforme est affichée ; rien n'est présenté comme « temps réel » ;
- les témoignages sont recopiés tels quels, avec la plateforme et un lien vers la source ;
- aucune note n'est placée dans les données structurées (les avis tiers ne sont pas autorisés en `AggregateRating` par Google).

En cas d'échec de l'API Google, la valeur précédente est conservée et l'erreur est notée dans `data/avis.json` (`google.erreur`, `synchronisation.erreurs`).

## Mesure d'audience

Chaque lien utile porte `data-track` : `planity`, `telephone`, `maps`, `avis_voir`, `avis_laisser`, `lien_groupe`, avec `data-salon` et `data-emplacement`. `src/app.js` pousse un évènement `mbr_<type>` dans `dataLayer` (GTM) et l'envoie à `gtag` si GA4 est installé. Un clic Planity est un clic sortant, pas une réservation : les réservations confirmées se lisent dans l'espace pro Planity.

À faire : créer une propriété GA4 par site (ou un flux par domaine), installer GTM (B-Zen a déjà `GTM-MXSP8CKM`), déclarer les évènements `mbr_*` comme conversions, ajouter un bandeau de consentement avant toute mesure soumise à consentement.

## Images

En pré-publication, les photos sont chargées depuis les sites actuels des salons. Avant la mise en production, les rapatrier dans `static/` (WebP, 1200 px max) et mettre à jour les chemins dans `src/contenu.mjs`.

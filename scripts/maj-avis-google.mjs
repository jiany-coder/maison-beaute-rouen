// Met à jour la note et le nombre d'avis Google des 4 établissements via l'API officielle
// Google Places (New). Nécessite la variable d'environnement GOOGLE_PLACES_API_KEY.
// PagesJaunes et Planity n'ont pas d'API publique : mise à jour manuelle dans data/avis.json.
import fs from 'node:fs';
const KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!KEY) { console.log('GOOGLE_PLACES_API_KEY absente : aucune mise à jour automatique.'); process.exit(0); }
const file = new URL('../data/avis.json', import.meta.url);
const avis = JSON.parse(fs.readFileSync(file, 'utf8'));
const today = new Date().toISOString().slice(0, 10);
let erreurs = [];
for (const [slug, a] of Object.entries(avis.etablissements)) {
  const id = a.google.place_id;
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${id}`, { headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    if (typeof j.rating !== 'number' || typeof j.userRatingCount !== 'number') throw new Error('réponse incomplète');
    a.google.note = j.rating; a.google.nombre = j.userRatingCount; a.google.releve_le = today; a.google.methode = 'api-google-places';
    delete a.google.erreur;
    console.log(`${slug}: ${j.rating} / ${j.userRatingCount}`);
  } catch (e) { a.google.erreur = `${today} : ${e.message}`; erreurs.push(slug); console.error(`${slug}: échec (${e.message}), valeur précédente conservée`); }
}
avis.derniere_verification = today;
avis.synchronisation = { date: today, erreurs };
fs.writeFileSync(file, JSON.stringify(avis, null, 2) + '\n');

// Contenus éditoriaux des 4 marques. Tarifs = relevés sur Planity le 19/11/2026 (aucun tarif inventé).
const D = 'https://le-de.cdn-website.com/c09de1074a214887af1b0889bd73d68a/dms3rep/multi/opt/';
const W = 'https://www.beautefatale-rouen.fr/wp-content/uploads/';
const O = (p) => `https://files.sbcdnsb.com/images/YkbzvHeq4gxQhRzv4BqtkA/content/${p.replace('/2000/', '/1000/')}`;
const P = (id, w = 1400) => `https://mms.cdn.global.prodsharedsvc.planityapp.com/planity/image/upload/c_limit,w_${w},f_auto/${id}`;
const Z = (p) => `https://files.sbcdnsb.com/images/Qyg-LbODqfkEZzZxX3MyIQ/content/${p}`;

export const SOURCE_TARIFS = 'Tarifs relevés sur Planity le 19 novembre 2026. Le tarif final dépend de la longueur, de la densité et du travail demandé : il est confirmé au salon.';

export const marques = {
  'le-continent': {
    theme: {
      fonts: 'family=Big+Shoulders+Display:wght@600;800&family=Inter:wght@400;500;600',
      display: "'Big Shoulders Display', Impact, sans-serif", body: "'Inter', system-ui, sans-serif",
      bg: '#0d0d0e', surface: '#161618', surface2: '#1f1f22', text: '#ece9e3', muted: '#a3a09a',
      accent: '#c2bdb2', accentText: '#0d0d0e', line: 'rgba(236,233,227,.12)', dark: true,
      titleCase: 'uppercase', titleTrack: '.02em', radius: '0px'
    },
    accroche: 'Barber & coiffeur homme',
    seo: { title: 'Coiffeur homme et barber à Rouen, dégradés | Le Continent', description: 'Le Continent, coiffeur homme et barber au 87 rue Lafayette à Rouen : dégradés, dégradé à blanc, barbe, coupes enfants. Réservation en ligne sur Planity.' },
    hero: {
      h1: 'Coiffeur homme et barber à Rouen',
      kicker: '87 rue Lafayette · Rive gauche',
      lead: 'Dégradés nets, dégradé à blanc, contours et barbe à la tondeuse : Le Continent coiffe les hommes et les garçons de Rouen, sur rendez-vous ou en passage, avec une équipe qui prend le temps de comprendre la coupe que vous voulez.',
      image: D + 'IMG_2902-2227w.jpeg', imageAlt: 'Intérieur du salon Le Continent, fauteuils et miroirs, rue Lafayette à Rouen'
    },
    atouts: [
      ['Dégradés précis', 'Du dégradé bas au dégradé à blanc, travaillé à la tondeuse et aux ciseaux.'],
      ['Enfants bienvenus', 'Coupes dégradées pour les moins de 12 ans, à 10 €.'],
      ['Tous types de cheveux', 'Cheveux afro, frisés, lisses : le salon coiffe toutes les textures.'],
      ['Ouvert tard', 'Jusqu’à 22h30 du lundi au samedi selon Planity.']
    ],
    services: [
      { titre: 'Coupe homme dégradé', texte: 'Shampoing, dégradé et finitions au rasoir selon votre style.', prix: '15 €', duree: '45 min', lien: 'coupe-homme-degrade-rouen/' },
      { titre: 'Dégradé à blanc', texte: 'Le fade le plus net, fondu jusqu’à la peau.', prix: '12 €', duree: '45 min', lien: 'coupe-homme-degrade-rouen/' },
      { titre: 'Barbe à la tondeuse', texte: 'Taille, contours et symétrie de la barbe.', prix: '7 €', duree: '35 min', lien: 'coupe-homme-degrade-rouen/#barbe' },
      { titre: 'Coupe enfant dégradé', texte: 'Pour les garçons de moins de 12 ans.', prix: '10 €', duree: '30 à 40 min', lien: 'coupe-enfant-rouen/' }
    ],
    tarifs: [
      ['Coupe homme dégradé', '45 min', '15 €'],
      ['Coupe dégradée à blanc', '45 min', '12 €'],
      ['Barbe tondeuse', '35 min', '7 €'],
      ['Teinture noire', '45 min', '15 €'],
      ['Coupe enfant (moins de 12 ans) dégradé', '40 min', '10 €'],
      ['Coupe enfant dégradé', '30 min', '10 €']
    ],
    galerie: [
      [D + 'IMG_20260513_WA0024-eabb04b8-808w.jpg', 'Garçon avec une coupe courte dégradée et ondulations au salon Le Continent'],
      [W + '2026/11/IMG-20261118-WA0035.jpg', 'Coupe homme dégradée réalisée à Rouen'],
      [W + '2026/11/IMG-20261118-WA0033.jpg', 'Dégradé et barbe taillée, coiffure homme à Rouen'],
      [D + '1000579273_os_480-1920w.jpg', 'Barbier au travail avec un client au salon Le Continent'],
      [W + '2026/11/IMG-20261118-WA0041.jpg', 'Coupe enfant dégradée réalisée à Rouen'],
      [W + '2026/11/IMG-20261118-WA0047.jpg', 'Coupe enfant avec contours nets']
    ],
    faq: [
      ['Faut-il prendre rendez-vous chez Le Continent ?', 'Le rendez-vous en ligne sur Planity est le plus sûr pour choisir votre créneau. Le salon accueille aussi en passage selon l’affluence : appelez le 09 82 12 81 77 pour vérifier l’attente.'],
      ['Combien coûte une coupe homme dégradé à Rouen chez Le Continent ?', 'La coupe homme dégradé est à 15 € et le dégradé à blanc à 12 €, pour environ 45 minutes (tarifs Planity relevés le 19/11/2026). La barbe à la tondeuse est à 7 €.'],
      ['Coupez-vous les cheveux afro et frisés ?', 'Oui. Le salon travaille toutes les textures : cheveux afro, frisés, ondulés ou lisses. Plusieurs clients aux cheveux lisses le soulignent dans leurs avis Google.'],
      ['Où se garer près du 87 rue Lafayette ?', 'Le salon est sur la rive gauche, à quelques minutes à pied du pont Boieldieu. Itinéraire : ouvrez la fiche Google du salon depuis le bouton « Itinéraire ».'],
      ['Le Continent coiffe-t-il aussi les femmes ?', 'Le Continent est un salon mixte. Pour les tresses, perruques, tissages ou locks, les salons partenaires du groupe Maison Beauté Rouen, Ô Les Femmes et Beauté Fatale, sont à deux pas.']
    ],
    pages: [
      {
        slug: 'coupe-homme-degrade-rouen',
        title: 'Coupe homme dégradé à Rouen, dès 12 € | Le Continent',
        description: 'Coupe homme dégradé, dégradé à blanc et barbe au 87 rue Lafayette à Rouen. Tarifs : 15 €, 12 € et 7 €. Réservez votre créneau sur Planity.',
        h1: 'Coupe homme dégradé et barbe à Rouen',
        fil: 'Coupe homme dégradé',
        image: [W + '2026/11/IMG-20261118-WA0033.jpg', 'Coupe homme dégradée avec barbe taillée, salon Le Continent Rouen'],
        intro: 'Un dégradé est une coupe où la longueur diminue progressivement de haut en bas, jusqu’à la peau pour un dégradé à blanc. Chez Le Continent, au 87 rue Lafayette à Rouen, la coupe homme dégradé coûte 15 €, le dégradé à blanc 12 € et la barbe à la tondeuse 7 €, pour 35 à 45 minutes de travail.',
        sections: [
          ['Quel dégradé choisir ?', 'Le dégradé bas reste discret et convient aux environnements professionnels. Le dégradé moyen marque davantage le contraste avec le dessus. Le dégradé à blanc, fondu jusqu’à la peau, donne l’effet le plus net et demande un entretien plus régulier. Le barbier vous conseille selon la forme du visage, l’implantation et la texture de vos cheveux.'],
          ['Comment se déroule la coupe ?', 'Le coiffeur échange d’abord avec vous sur la hauteur du dégradé et la longueur du dessus. Il travaille ensuite à la tondeuse en plusieurs passes, fond les transitions, puis réalise les contours et la ligne de nuque. La coupe se termine par le coiffage.'],
          ['Combien de temps tient un dégradé ?', 'Un dégradé à blanc reste net environ deux semaines, un dégradé bas trois à quatre semaines. Pour garder des contours propres, beaucoup de clients reviennent toutes les deux à trois semaines.'],
          ['Et la barbe ?', 'La taille de barbe à la tondeuse (7 €, 35 minutes) comprend la mise à longueur, les contours des joues et du cou et l’équilibre avec le dégradé. Elle peut être réservée seule ou avec la coupe.']
        ],
        ancreBarbe: 3,
        tarifsCles: [0, 1, 2, 3],
        faq: [
          ['Quelle différence entre dégradé et dégradé à blanc ?', 'Le dégradé classique s’arrête à une longueur courte sur les côtés. Le dégradé à blanc descend jusqu’à la peau, sans longueur visible en bas.'],
          ['Faut-il venir les cheveux lavés ?', 'Ce n’est pas nécessaire : indiquez simplement au coiffeur si vous souhaitez un shampoing.'],
          ['Peut-on faire la coupe et la barbe dans le même rendez-vous ?', 'Oui, réservez les deux prestations à la suite sur Planity ou demandez-le à l’accueil.']
        ]
      },
      {
        slug: 'coupe-enfant-rouen',
        title: 'Coupe enfant garçon à Rouen, 10 € | Le Continent',
        description: 'Coupe enfant dégradé pour les garçons de moins de 12 ans au 87 rue Lafayette à Rouen : 10 €, 30 à 40 minutes. Réservation en ligne.',
        h1: 'Coupe enfant et dégradé garçon à Rouen',
        fil: 'Coupe enfant',
        image: [W + '2026/11/IMG-20261118-WA0041.jpg', 'Coupe enfant dégradée, salon Le Continent à Rouen'],
        intro: 'La coupe enfant dégradé est une coupe courte adaptée aux garçons de moins de 12 ans, avec des côtés fondus et un dessus plus long. Au Continent, rue Lafayette à Rouen, elle coûte 10 € et dure 30 à 40 minutes, dans un salon où les familles viennent régulièrement.',
        sections: [
          ['Comment se passe une coupe enfant ?', 'Le coiffeur prend le temps de mettre l’enfant à l’aise, échange avec le parent sur la longueur souhaitée puis travaille à la tondeuse et aux ciseaux. Les contours sont faits en douceur pour les plus jeunes.'],
          ['Quelle coupe pour un garçon ?', 'Le dégradé bas avec un dessus un peu long est le plus facile à porter au quotidien. Pour les cheveux frisés ou afro, un dégradé avec un dessus travaillé en boucles est très demandé.'],
          ['À quelle fréquence revenir ?', 'Chez l’enfant, les cheveux poussent vite : une coupe toutes les quatre à six semaines garde un dégradé propre.']
        ],
        tarifsCles: [4, 5],
        faq: [
          ['À partir de quel âge ?', 'Le salon coiffe les jeunes enfants dès qu’ils peuvent rester assis le temps de la coupe. Le tarif enfant s’applique jusqu’à 12 ans.'],
          ['Un parent peut-il rester à côté ?', 'Oui, les parents peuvent rester près de l’enfant pendant toute la coupe.']
        ]
      }
    ]
  },

  'o-les-femmes': {
    theme: {
      fonts: 'family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@400;500;700',
      display: "'Playfair Display', Georgia, serif", body: "'DM Sans', system-ui, sans-serif",
      bg: '#f4ebe3', surface: '#fbf6f1', surface2: '#ead9cd', text: '#3b2a22', muted: '#7a655a',
      accent: '#4a3228', accentText: '#fbf6f1', gold: '#9c7a45', line: 'rgba(59,42,34,.14)', dark: false,
      titleCase: 'none', titleTrack: '-.01em', radius: '0px'
    },
    accroche: 'Coiffure femme · tresses · perruques',
    seo: { title: 'Coiffeur femme et tresses africaines à Rouen | Ô Les Femmes', description: 'Ô Les Femmes, 113 rue Lafayette à Rouen : tresses, knotless, boho braids, perruques, tissages, coiffure de mariage, lissage. Tous types de cheveux. RDV Planity.' },
    hero: {
      h1: 'Salon de coiffure femme et tresses à Rouen',
      kicker: '113 rue Lafayette · Rouen',
      lead: 'Tresses collées, knotless et boho braids, perruques, tissages, chignons de mariage ou simple brushing : Ô Les Femmes coiffe toutes les femmes, cheveux crépus, bouclés ou lisses, dans un salon chaleureux où l’on vous propose un café.',
      image: O('1765792136/6892036/2000/2025-11-2020251212-568654-6vlv1d.jpeg'), imageAlt: 'Tresses collées réalisées au salon Ô Les Femmes à Rouen'
    },
    atouts: [
      ['Toutes les chevelures', 'Cheveux crépus, bouclés, frisés ou lisses : chaque cliente est accueillie.'],
      ['Tresses sur mesure', 'Knotless, boho, Fulani, tresses collées : longueur et grosseur au choix.'],
      ['Mariage et événements', 'Coiffures de mariée avec ou sans perruque, essai possible.'],
      ['Accueil chaleureux', 'Un café offert et une équipe à l’écoute, saluée dans les avis.']
    ],
    services: [
      { titre: 'Tresses et braids', texte: 'Tresses collées, knotless, boho braids, Fulani, faux locks.', prix: 'dès 25 €', duree: '45 min à 7h30', lien: 'tresses-africaines-rouen/' },
      { titre: 'Perruques et tissages', texte: 'Pose de perruque closure ou frontale, tissage, clip, ponytail.', prix: 'dès 30 €', duree: '45 min à 2h', lien: 'perruque-tissage-rouen/' },
      { titre: 'Mariage et événement', texte: 'Boucles, Hollywood waves, chignons avec ou sans perruque.', prix: 'dès 70 €', duree: '1h25 à 3h', lien: 'coiffure-mariage-rouen/' },
      { titre: 'Coiffure tous cheveux', texte: 'Chignon, boucles, lissage brésilien, indien ou nigel.', prix: 'dès 15 €', duree: '30 min à 3h', lien: '#tarifs' }
    ],
    tarifs: [
      ['2 à 4 tresses collées sans extensions', '45 min', '25 €'],
      ['6 à 10 tresses collées avec extensions', '1h50', '55 €'],
      ['Short boho braids', '3h', '90 €'],
      ['Boho braids knotless longues fines', '7h30', '170 €'],
      ['Fulani braids, longueur épaule', '1h30', '100 €'],
      ['Crochet braids vanilles ou braids', '2h10', '60 €'],
      ['Faux locks medium', '4h', '80 €'],
      ['Pose de perruque frontale sans colle', '1h45', '60 €'],
      ['Pose de perruque closure avec customisation', '1h20', '60 €'],
      ['Pose de 3 lignes de tissage', '45 min', '40 €'],
      ['Pose de clip', '45 min', '30 €'],
      ['Coiffure de mariage, boucles simples', '1h25', 'dès 70 €'],
      ['Hollywood waves', '1h45', 'dès 180 €'],
      ['Chignon sur cheveux naturels', '45 min', '36 €'],
      ['Lissage rapide', '30 min', '15 €'],
      ['Lissage brésilien, indien ou nigel', '3h', '80 à 160 €']
    ],
    galerie: [
      [O('1765792137/6892040/2000/2025-11-2020251212-568654-6e0ugi.jpeg'), 'Tresses collées blondes et noires réalisées chez Ô Les Femmes'],
      [O('1765792135/6892032/2000/2025-11-2020251212-568654-k44s8m.jpeg'), 'Longues tresses fines, salon Ô Les Femmes Rouen'],
      [O('1765792135/6892030/2000/2025-11-2020251212-568654-phqecu.jpeg'), 'Braids colorées roses et blanches réalisées à Rouen'],
      [O('1765792133/6892024/2000/1000255971.jpeg'), 'Boho braids bouclées, coiffure femme Rouen'],
      [O('1765792132/6892020/2000/1000269929.jpeg'), 'Knotless braids longues, salon Ô Les Femmes'],
      [O('1765205830/6867514/2000/100024476820251202-1254733-11wang.jpeg'), 'Coiffure lissée et wavy sur cheveux naturels'],
      [O('1765205829/6867508/2000/100000461420251202-2582955-sb1xy2.jpeg'), 'Tresses avec rajouts, vue de dos'],
      [O('1765205827/6867501/2000/100005343220251202-2582955-83njca.jpeg'), 'Twists courts réalisés au salon']
    ],
    faq: [
      ['Ô Les Femmes coiffe-t-il les cheveux lisses ?', 'Oui. Le salon accueille toutes les femmes : chignons, boucles, lissages, coiffures de mariage sur cheveux lisses, ondulés, bouclés ou crépus.'],
      ['Combien coûtent des tresses chez Ô Les Femmes ?', 'De 25 € pour 2 à 4 tresses collées sans extensions à 170 € pour des boho braids knotless longues et fines (tarifs Planity relevés le 19/11/2026). Le prix dépend de la longueur et de la finesse.'],
      ['Les mèches sont-elles comprises ?', 'Cela dépend de la prestation : demandez au salon lors de la réservation ou au 09 80 08 18 89 si vous devez apporter vos extensions.'],
      ['Peut-on venir sans rendez-vous ?', 'Le salon accepte parfois des clientes sans rendez-vous selon les disponibilités, mais les tresses longues demandent de réserver sur Planity.'],
      ['Faites-vous des essais pour un mariage ?', 'Oui, le salon propose un essai avant le jour J pour les coiffures de mariage, avec ou sans perruque.']
    ],
    pages: [
      {
        slug: 'tresses-africaines-rouen',
        title: 'Tresses africaines et knotless braids à Rouen | Ô Les Femmes',
        description: 'Tresses collées, knotless, boho braids, Fulani et faux locks au 113 rue Lafayette à Rouen. De 25 € à 170 € selon longueur. Réservation Planity.',
        h1: 'Tresses africaines, knotless et boho braids à Rouen',
        fil: 'Tresses africaines',
        image: [O('1765792132/6892020/2000/1000269929.jpeg'), 'Knotless braids longues réalisées chez Ô Les Femmes à Rouen'],
        intro: 'Les tresses africaines sont des coiffures protectrices qui tressent le cheveu naturel, avec ou sans extensions, pour le protéger plusieurs semaines. Chez Ô Les Femmes, 113 rue Lafayette à Rouen, elles coûtent de 25 € (2 à 4 tresses collées) à 170 € (boho braids knotless longues et fines), selon la longueur et la finesse.',
        sections: [
          ['Quelles tresses choisir ?', 'Les tresses collées, plaquées sur le cuir chevelu, conviennent aux coiffures courtes ou sous perruque. Les knotless braids partent du cheveu naturel sans nœud à la racine : plus légères, elles tirent moins. Les boho braids laissent des mèches bouclées libres pour un effet bohème. Les Fulani braids associent tresses collées et tresses libres.'],
          ['Combien de temps dure la pose ?', 'De 45 minutes pour quelques tresses collées à 7h30 pour des knotless longues et fines. Prévoyez la demi-journée pour des braids longues et réservez de préférence en début de journée.'],
          ['Combien de temps tiennent les tresses ?', 'Bien entretenues, des knotless tiennent en moyenne quatre à six semaines, des tresses collées deux à trois semaines. Au-delà, la repousse fragilise la racine : il vaut mieux défaire et laisser respirer le cheveu.'],
          ['Comment entretenir ses tresses ?', 'Dormez avec un foulard ou une taie en satin, hydratez le cuir chevelu avec un spray léger et évitez les produits lourds qui laissent des dépôts. Votre coiffeuse vous donne ses conseils à la fin de la pose.']
        ],
        tarifsCles: [0, 1, 2, 3, 4, 5, 6],
        faq: [
          ['Les tresses abîment-elles les cheveux ?', 'Une pose trop serrée ou gardée trop longtemps peut fragiliser les lisières. Les knotless et une tension adaptée limitent ce risque.'],
          ['Peut-on faire des tresses sur cheveux courts ?', 'Oui, avec des extensions. Une cliente le souligne dans son avis Google : des tresses collées longues réalisées sur cheveux courts.'],
          ['Faut-il venir avec les cheveux lavés et démêlés ?', 'Oui, de préférence : cela réduit le temps de pose. Précisez-le lors de la réservation si ce n’est pas possible.']
        ]
      },
      {
        slug: 'perruque-tissage-rouen',
        title: 'Pose de perruque et tissage à Rouen | Ô Les Femmes',
        description: 'Pose de perruque closure ou frontale sans colle, tissage, clip et ponytail au 113 rue Lafayette à Rouen. Dès 30 €. Réservez sur Planity.',
        h1: 'Pose de perruque, tissage et extensions à Rouen',
        fil: 'Perruques et tissages',
        image: [O('1765205830/6867514/2000/100024476820251202-1254733-11wang.jpeg'), 'Coiffure lissée réalisée au salon Ô Les Femmes à Rouen'],
        intro: 'La pose de perruque consiste à préparer le cheveu naturel en nattes plaquées puis à fixer et personnaliser une perruque closure ou frontale. Chez Ô Les Femmes, à Rouen, une pose de perruque frontale sans colle coûte 60 €, une pose de clip 30 € et trois lignes de tissage 40 €.',
        sections: [
          ['Closure ou frontale : quelle différence ?', 'La closure couvre une petite zone sur le dessus de la tête et permet une raie naturelle. La frontale va d’une oreille à l’autre et offre plus de liberté de coiffage, raie et dégagement du front. La pose sans colle préserve les lisières.'],
          ['Qu’est-ce que la customisation ?', 'C’est l’ajustement de la perruque à votre visage : épilation de la raie, réglage de la densité, coupe et coiffage. Elle rend la perruque plus naturelle.'],
          ['Tissage ou perruque ?', 'Le tissage est cousu sur des nattes et reste en place plusieurs semaines. La perruque se retire facilement et protège davantage le cheveu naturel. La coiffeuse vous oriente selon votre rythme et votre budget.']
        ],
        tarifsCles: [7, 8, 9, 10],
        faq: [
          ['Puis-je apporter ma propre perruque ?', 'Oui, la pose se fait sur votre perruque. Indiquez son type (closure, frontale) lors de la réservation.'],
          ['Combien de temps tient une pose de perruque ?', 'Une pose sans colle se garde en général une à deux semaines avant d’être reprise ; la repose est proposée sur Planity.']
        ]
      },
      {
        slug: 'coiffure-mariage-rouen',
        title: 'Coiffure de mariage à Rouen, essai possible | Ô Les Femmes',
        description: 'Coiffure de mariée et d’événement à Rouen : boucles, Hollywood waves, chignons avec ou sans perruque. Dès 70 €, essai avant le jour J. Ô Les Femmes.',
        h1: 'Coiffure de mariage et d’événement à Rouen',
        fil: 'Coiffure de mariage',
        image: [O('1765792137/6892038/2000/2025-11-2020251212-568654-280s3m.jpeg'), 'Coiffure lisse et élégante réalisée chez Ô Les Femmes'],
        intro: 'Une coiffure de mariage est une coiffure travaillée pour tenir toute une journée et rester belle sur les photos. Ô Les Femmes, à Rouen, réalise des coiffures de mariée et d’invitée, avec ou sans perruque, de 70 € pour des boucles simples à 250 € pour un chignon travaillé avec pose de perruque.',
        sections: [
          ['Quelles coiffures pour un mariage ?', 'Boucles simples, Hollywood waves, chignon bas ou travaillé : le choix dépend de la robe, de l’encolure et de la texture du cheveu. Sur cheveux crépus comme sur cheveux lisses, le salon adapte la technique.'],
          ['Pourquoi faire un essai ?', 'L’essai valide la coiffure, le temps nécessaire et les accessoires. Il évite les surprises le jour J et permet d’ajuster la tenue.'],
          ['Quand réserver ?', 'Pour une date en haute saison, réservez plusieurs semaines à l’avance, essai compris.']
        ],
        tarifsLibres: [
          ['Coiffure de mariage, boucles simples', '1h25', 'dès 70 €'],
          ['Boucles simples avec pose de perruque', '2h45', 'dès 120 €'],
          ['Hollywood waves', '1h45', 'dès 180 €'],
          ['Chignon simple avec pose de perruque', '2h', 'dès 200 €'],
          ['Chignon travaillé avec pose de perruque', '3h', 'dès 250 €']
        ],
        faq: [
          ['Coiffez-vous aussi les invitées ?', 'Oui, les mêmes prestations sont proposées pour les invitées et les demoiselles d’honneur.'],
          ['Le salon se déplace-t-il ?', 'Renseignez-vous directement au 09 80 08 18 89 : la coiffure à domicile n’est pas listée sur Planity pour ce salon.']
        ]
      }
    ]
  },

  'beaute-fatale': {
    theme: {
      fonts: 'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Jost:wght@400;500;600',
      display: "'Bodoni Moda', Didot, Georgia, serif", body: "'Jost', system-ui, sans-serif",
      bg: '#1a110c', surface: '#241811', surface2: '#2f2017', text: '#f1e6da', muted: '#b59f8e',
      accent: '#c8814f', accentText: '#1a0f09', line: 'rgba(241,230,218,.12)', dark: true,
      titleCase: 'none', titleTrack: '0', radius: '0px'
    },
    accroche: 'Coiffure afro · locks · extensions',
    seo: { title: 'Coiffure afro, locks et tissage à Rouen | Beauté Fatale', description: 'Beauté Fatale, 34 rue Pavée à Rouen : locks, tresses, tissages, extensions kératine, lissage, maquillage. 817 avis Google, note 4,8/5. Réservez sur Planity.' },
    hero: {
      h1: 'Salon de coiffure afro, locks et extensions à Rouen',
      kicker: '34 rue Pavée · 106 rue Lafayette',
      lead: 'Création et entretien de locks, tresses, tissages, extensions à la kératine et coiffures d’exception : Beauté Fatale met plus de 27 ans de savoir-faire au service de toutes les textures, au cœur de la rive gauche.',
      image: W + '2026/03/1000399322.webp', imageAlt: 'Tresses africaines longues réalisées au salon Beauté Fatale à Rouen'
    },
    atouts: [
      ['Spécialiste des locks', 'Création, reprise, extension et décapage de locks.'],
      ['817 avis Google', 'Note moyenne de 4,8/5, relevée le 19/11/2026.'],
      ['Extensions kératine', 'Pose mèche à mèche, dès 2 € la mèche.'],
      ['Femmes, hommes, enfants', 'Toutes les textures et tous les âges sont accueillis.']
    ],
    services: [
      { titre: 'Locks', texte: 'Création, reprise et extension de locks.', prix: '70 à 450 €', duree: '3h10 à 3h50', lien: 'locks-rouen/' },
      { titre: 'Tissages et extensions', texte: 'Tissage ouvert ou fermé, lace frontale, extensions kératine.', prix: 'dès 50 €', duree: '1h45 à 2h10', lien: 'tissage-extensions-rouen/' },
      { titre: 'Tresses africaines', texte: 'Tresses multiples, nattes américaines, bread braids.', prix: '40 à 180 €', duree: '1h40 à 3h', lien: '#tarifs' },
      { titre: 'Lissage et maquillage', texte: 'Lissage brésilien, maquillage soir et mariée.', prix: '60 à 160 €', duree: '1h10 à 3h', lien: 'coiffure-evenementielle-rouen/' }
    ],
    tarifs: [
      ['Création locks classique', '3h10', '90 à 350 €'],
      ['Construction, reprise ou extension de locks', '3h30', '70 à 450 €'],
      ['Tissage lignes, ouvert, avec closure', '1h50', '50 à 80 €'],
      ['Extension de tissage ouvert ou fermé', '1h45', '50 €'],
      ['Extension de tissage lace frontale ou closure + coiffage', '1h45', '60 à 100 €'],
      ['Rajout ou extension de tissage naturel + coiffage', '2h10', '50 à 120 €'],
      ['Extension kératine (dès 2 € la mèche)', '1h38', '90 à 400 €'],
      ['Tresses africaines multiples', '2h30', '70 à 160 €'],
      ['Tresses collées avec rajouts, nattes américaines', '1h40', '40 à 140 €'],
      ['Tresse bread selon la longueur', '3h', '60 à 180 €'],
      ['Lissage brésilien, indien ou nigel', '3h', '80 à 160 €'],
      ['Maquillage soir', '1h10', '60 à 80 €'],
      ['Maquillage mariée à domicile', '2h20', 'sur devis'],
      ['Shampoing + brushing cheveux courts', '30 min', '53 €']
    ],
    galerie: [
      [W + '2026/03/1000399320.webp', 'Nattes collées réalisées chez Beauté Fatale à Rouen'],
      [W + '2026/03/1000270121.webp', 'Tresses collées vues de dessus, salon Beauté Fatale'],
      [W + '2024/10/2024-10-06.webp', 'Boho braids blondes réalisées à Rouen'],
      [W + '2024/11/IMG-20241015-WA0070.webp', 'Tresses longues réalisées au salon'],
      [W + '2024/11/e41d865ee38ba0ade59cbe16307457a7.webp', 'Nattes collées géométriques'],
      [W + '2024/11/IMG-20240423-WA0022-1.webp', 'Tresses rouges et noires, Beauté Fatale Rouen'],
      [W + '2025/09/Nouveau-projet-21.webp', 'Coiffure tressée longue réalisée au salon'],
      [W + '2025/09/FB_IMG_1756300205445.jpg', 'Braids réalisées chez Beauté Fatale']
    ],
    equipe: ['Fortune', 'Michael', 'Princesse', 'Fanta'],
    faq: [
      ['Quel est le prix d’une création de locks à Rouen ?', 'Chez Beauté Fatale, la création de locks classique est affichée de 90 à 350 € pour environ 3h10, et la construction, reprise ou extension de 70 à 450 € (Planity, relevé le 19/11/2026). Le prix dépend de la longueur et du nombre de locks.'],
      ['Où se trouve Beauté Fatale ?', 'Au 34 rue Pavée, 76100 Rouen, avec un accès au 106 rue Lafayette, sur la rive gauche.'],
      ['Faites-vous les coiffures hommes et enfants ?', 'Oui. Le salon coiffe femmes, hommes et enfants : dégradés, vanilles, tresses pour enfants.'],
      ['Comment réserver ?', 'En ligne sur Planity, 24h/24, ou par téléphone au 02 27 08 80 69.'],
      ['Proposez-vous aussi l’onglerie ?', 'Le groupe dispose d’une onglerie dédiée, B-Zen, au 113 rue Lafayette, à deux pas du salon.']
    ],
    pages: [
      {
        slug: 'locks-rouen',
        title: 'Création et entretien de locks à Rouen | Beauté Fatale',
        description: 'Création de locks, reprise, extension et décapage au 34 rue Pavée à Rouen. Locks dès 70 €. Salon noté 4,8/5 sur 817 avis Google. RDV Planity.',
        h1: 'Création, reprise et extension de locks à Rouen',
        fil: 'Locks',
        image: [W + '2025/09/Nouveau-projet-22.webp', 'Coiffure longue réalisée au salon Beauté Fatale à Rouen'],
        intro: 'Les locks sont des mèches de cheveux qui s’emmêlent volontairement pour former des cordons durables. Chez Beauté Fatale, 34 rue Pavée à Rouen, la création de locks classique coûte de 90 à 350 € et la reprise ou l’extension de 70 à 450 €, selon la longueur et le nombre de locks.',
        sections: [
          ['Comment se crée une lock ?', 'La coiffeuse sectionne le cheveu en carrés réguliers puis forme chaque lock au crochet ou par torsade, selon la texture. La taille des sections détermine l’épaisseur finale : plus elles sont petites, plus les locks sont fines et nombreuses.'],
          ['À quelle fréquence faire la reprise ?', 'Une reprise des racines toutes les quatre à huit semaines garde des locks propres et régulières. Des reprises trop fréquentes ou trop serrées fragilisent la racine.'],
          ['Peut-on rallonger ses locks ?', 'Oui, l’extension de locks ajoute de la longueur ou du volume en raccordant des mèches. Elle se fait dans la même séance qu’une reprise.'],
          ['Qu’est-ce que le décapage ?', 'Le décapage nettoie en profondeur les locks pour retirer les résidus de produits. Le salon le propose de 50 à 90 € pour environ 40 minutes.']
        ],
        tarifsLibres: [
          ['Création locks classique', '3h10', '90 à 350 €'],
          ['Construction, reprise ou extension de locks', '3h30', '70 à 450 €']
        ],
        faq: [
          ['Faut-il des cheveux longs pour créer des locks ?', 'Une longueur de quelques centimètres suffit pour démarrer, mais les locks gagnent en tenue avec la longueur.'],
          ['Peut-on laver ses locks ?', 'Oui, avec un shampoing sans résidu et un séchage complet pour éviter les odeurs.']
        ]
      },
      {
        slug: 'tissage-extensions-rouen',
        title: 'Tissage et extensions kératine à Rouen | Beauté Fatale',
        description: 'Tissage ouvert ou fermé, lace frontale, closure et extensions à la kératine au 34 rue Pavée à Rouen. Dès 50 €. Réservation Planity.',
        h1: 'Tissage et extensions à la kératine à Rouen',
        fil: 'Tissage et extensions',
        image: [W + '2026/03/1000399322.webp', 'Longueurs et volume réalisés au salon Beauté Fatale à Rouen'],
        intro: 'Le tissage consiste à coudre des mèches sur des nattes plaquées pour ajouter longueur et volume ; l’extension à la kératine fixe les mèches une à une au cheveu naturel. Chez Beauté Fatale à Rouen, un tissage coûte de 50 à 120 € et les extensions kératine de 90 à 400 €, à partir de 2 € la mèche.',
        sections: [
          ['Tissage ouvert ou fermé ?', 'Le tissage ouvert laisse une partie du cheveu naturel visible pour le fondre avec les mèches. Le tissage fermé couvre toute la tête, souvent avec une closure ou une lace frontale, et protège davantage le cheveu.'],
          ['Comment se passe une pose de kératine ?', 'Chaque mèche est soudée à une fine section de cheveu avec un point de kératine chauffé. La pose est longue mais le rendu est très naturel et se porte attaché.'],
          ['Combien de temps tiennent les extensions ?', 'Un tissage se garde en moyenne six à huit semaines. Les extensions kératine tiennent environ trois mois avant une remontée.']
        ],
        tarifsCles: [2, 3, 4, 5, 6],
        faq: [
          ['Les mèches sont-elles fournies ?', 'Demandez-le au moment de la réservation : selon la prestation, vous pouvez apporter vos mèches ou les acheter au salon.'],
          ['Peut-on teindre des extensions kératine ?', 'Les mèches naturelles peuvent être colorées ; parlez-en à votre coiffeuse avant la pose.']
        ]
      },
      {
        slug: 'coiffure-evenementielle-rouen',
        title: 'Coiffure événementielle, lissage et maquillage à Rouen | Beauté Fatale',
        description: 'Lissage brésilien, coiffure et maquillage de soirée ou de mariée au 34 rue Pavée à Rouen. Maquillage soir 60 à 80 €, mariée sur devis.',
        h1: 'Coiffure événementielle, lissage et maquillage à Rouen',
        fil: 'Coiffure événementielle',
        image: [W + '2024/11/IMG_20240826_174753_689.webp', 'Coiffure soignée réalisée au salon Beauté Fatale à Rouen'],
        intro: 'Une coiffure événementielle est une mise en beauté préparée pour une soirée, une cérémonie ou un mariage, souvent associée au maquillage. Beauté Fatale, à Rouen, propose le maquillage de soirée de 60 à 80 €, le maquillage de mariée à domicile sur devis et le lissage brésilien, indien ou nigel de 80 à 160 €.',
        sections: [
          ['Quelle prestation pour une soirée ?', 'Un brushing ou un lissage pour un rendu net, un chignon, ou des tresses travaillées : la coiffeuse compose avec votre tenue. Le maquillage de soirée dure environ 1h10.'],
          ['Que comprend le maquillage de mariée ?', 'Le maquillage de mariée se fait à domicile et se chiffre sur devis selon le nombre de personnes et le lieu.'],
          ['Combien de temps tient un lissage brésilien ?', 'Selon la texture et l’entretien, un lissage brésilien tient généralement plusieurs semaines à quelques mois. Utilisez ensuite un shampoing sans sulfate.']
        ],
        tarifsCles: [10, 11, 12, 13],
        faq: [
          ['Proposez-vous la coiffure à domicile ?', 'Le maquillage de mariée est proposé à domicile. Pour la coiffure, contactez le salon au 02 27 08 80 69.']
        ]
      }
    ]
  },

  'b-zen': {
    theme: {
      fonts: 'family=Marcellus&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700',
      display: "'Marcellus', Georgia, serif", body: "'Nunito Sans', system-ui, sans-serif",
      bg: '#f6f0e8', surface: '#fffdf9', surface2: '#ece0d6', text: '#3a322d', muted: '#7d716a',
      accent: '#6f5f55', accentText: '#fffdf9', gold: '#9c7a45', line: 'rgba(58,50,45,.12)', dark: false,
      titleCase: 'none', titleTrack: '.01em', radius: '0px'
    },
    accroche: 'Onglerie · manucure · beauté des pieds',
    seo: { title: 'Onglerie à Rouen : pose gel, semi-permanent | B-Zen', description: 'B-Zen, onglerie au 113 rue Lafayette à Rouen : pose gel, capsules, vernis semi-permanent, nail art, beauté des pieds. Note 4,8/5 sur 357 avis Google.' },
    hero: {
      h1: 'Onglerie et prothésiste ongulaire à Rouen',
      kicker: '113 rue Lafayette · Rive gauche',
      lead: 'Pose gel, capsules, vernis semi-permanent, nail art et soins des pieds : chez B-Zen, chaque pose est travaillée avec minutie, dans un institut cosy avec fauteuils de massage pour les pieds, thé et café offerts.',
      image: P('lj1eu0xqdyq8fzww8wjc'), imageAlt: 'Mains manucurées nude avec nail art doré sur fourrure blanche, onglerie B-Zen à Rouen'
    },
    atouts: [
      ['357 avis Google', 'Note moyenne de 4,8/5, relevée le 19/11/2026.'],
      ['Poses minutieuses', 'Gel, capsules, Gel X : la précision est citée dans les avis.'],
      ['Mains et pieds', 'Manucure, pédicure, semi-permanent et BBL Toes.'],
      ['Moment détente', 'Fauteuils de massage des pieds, thé et café offerts.']
    ],
    services: [
      { titre: 'Pose gel et capsules', texte: 'Pose complète gel, Gel X, remplissage, gainage.', prix: '45 à 70 €', duree: '1h à 2h30', lien: 'pose-gel-rouen/' },
      { titre: 'Vernis semi-permanent', texte: 'Pose renforcée, dépose et nouvelle pose, mains et pieds.', prix: 'dès 35 €', duree: '40 min à 1h30', lien: 'vernis-semi-permanent-rouen/' },
      { titre: 'Beauté des pieds', texte: 'Semi-permanent, gel et BBL Toes pour les pieds.', prix: '45 à 60 €', duree: '45 min à 1h40', lien: 'beaute-des-pieds-rouen/' },
      { titre: 'Nail art', texte: 'Baby boomer, french, paillettes et strass.', prix: 'dès 5 €', duree: '20 à 30 min', lien: 'pose-gel-rouen/#nail-art' }
    ],
    tarifs: [
      ['Pose de vernis semi-permanent renforcé', '40 min', '35 €'],
      ['Dépose semi-permanent et nouvelle pose, mains', '1h', '45 €'],
      ['Manucure complète', '30 min', '30 €'],
      ['Semi-permanent mains et pieds', '1h', '70 €'],
      ['Gainage ongle naturel', '30 min', '45 €'],
      ['Remplissage gel S/M', '1h30', '45 €'],
      ['Remplissage gel L/XL', '2h', '55 €'],
      ['Gel X, pose d’ongles', '1h', '50 €'],
      ['Pose complète gel S/M', '2h', '50 €'],
      ['Pose complète gel L', '2h30', '55 €'],
      ['Pose complète gel XL', '2h30', '60 €'],
      ['Forfait dépose + nouvelle pose', '2h30', '70 €'],
      ['Réparation d’un ongle cassé', '20 min', '5 €'],
      ['Dépose d’ongles', '30 min', '15 €'],
      ['Pieds : dépose et nouvelle pose semi-permanent', '45 min', '50 €'],
      ['Pieds : pose en gel', '50 min', '45 €'],
      ['Pieds : dépose et nouvelle pose en gel', '1h', '55 €'],
      ['BBL Toes, restructuration acrygel + semi-permanent', '1h40', '60 €'],
      ['Baby boomer / dégradé (10 ongles)', '30 min', '10 €'],
      ['French', '20 min', '5 €'],
      ['Paillettes et strass', '30 min', '5 € par main']
    ],
    galerie: [
      [P('ld7kqb73iddjio6zhi7x'), 'Ongles nude rosé amande sur fourrure blanche, onglerie B-Zen à Rouen'],
      [P('c7m8iv06iqq0n4sawksw'), 'French blanche avec nœuds 3D roses, pose gel B-Zen à Rouen'],
      [P('rgg6mq5jqd6sgto0ocvs'), 'Vernis rouge brillant avec nail art cœur, B-Zen à Rouen'],
      [P('zamgowhuhtescj54fsii'), 'Ongles dégradé nude et touches dorées, B-Zen à Rouen'],
      [P('kingvvm9ftyj8hmllujt'), 'Ongles roses avec nœud, strass et motif léopard, B-Zen à Rouen'],
      [P('zozwi6jtuoicr0umsaji'), 'French nacrée avec strass, pose gel B-Zen à Rouen'],
      [P('dthn2jhxer5lktgsh5iw'), 'Ongles bordeaux mat avec détails nail art, B-Zen à Rouen'],
      [P('rwv6okyrz5gygubzsbd5'), 'Façade de l’institut B-Zen, rue Lafayette à Rouen'],
      [P('ig3mfppsmcyznur7qehu'), 'Le salon B-Zen : postes de manucure et équipe au travail, Rouen']
    ],
    equipe: ['Véronique', 'Amandine', 'Princesse', 'Angela', 'Fanta', 'Mbintou', 'Blandine'],
    faq: [
      ['Quelle différence entre gel et semi-permanent ?', 'Le vernis semi-permanent colore l’ongle naturel et tient deux à trois semaines. Le gel construit ou renforce l’ongle et peut l’allonger ; il se remplit toutes les trois à quatre semaines.'],
      ['Combien coûte une pose gel chez B-Zen ?', 'La pose complète gel coûte 50 € en taille S/M, 55 € en L et 60 € en XL ; le remplissage 45 à 55 € (Planity, relevé le 19/11/2026).'],
      ['Acceptez-vous les clientes sans rendez-vous ?', 'Selon les disponibilités, oui. Pour être sûre d’avoir votre créneau, réservez sur Planity ou appelez le 02 27 08 80 69.'],
      ['Où se trouve B-Zen ?', 'Au 113 rue Lafayette, 76100 Rouen, sur la rive gauche.'],
      ['Faites-vous aussi les cils ?', 'Le site actuel de l’institut mentionne les extensions de cils : renseignez-vous au salon pour les disponibilités.']
    ],
    pages: [
      {
        slug: 'pose-gel-rouen',
        title: 'Pose gel et capsules à Rouen, dès 45 € | B-Zen',
        description: 'Pose complète gel, Gel X, capsules et remplissage au 113 rue Lafayette à Rouen : de 45 à 70 €. Nail art dès 5 €. Onglerie B-Zen, réservation Planity.',
        h1: 'Pose gel, capsules et Gel X à Rouen',
        fil: 'Pose gel',
        image: [P('c7m8iv06iqq0n4sawksw'), 'Pose gel longue réalisée chez B-Zen à Rouen'],
        intro: 'La pose gel est une technique de prothésie ongulaire qui construit un ongle solide en gel, sur l’ongle naturel ou avec une capsule pour l’allonger. Chez B-Zen, 113 rue Lafayette à Rouen, la pose complète gel coûte de 50 à 60 € selon la taille et le remplissage de 45 à 55 €.',
        sections: [
          ['Gel, capsules ou Gel X ?', 'Le gainage renforce l’ongle naturel sans l’allonger. Les capsules ajoutent de la longueur avant d’être recouvertes de gel. Le Gel X est une capsule en gel souple, posée entière, plus rapide et plus légère (50 €, environ 1h).'],
          ['Combien de temps tient une pose gel ?', 'Une pose gel tient trois à quatre semaines avant remplissage, le temps que l’ongle pousse. Un remplissage régulier évite que la pose se décolle.'],
          ['Comment choisir la forme ?', 'Amande, carrée, ballerine ou stiletto : la prothésiste vous conseille selon la forme de vos doigts et votre quotidien. Les formes courtes sont plus pratiques au travail.']
        ],
        nailArt: true,
        tarifsCles: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        faq: [
          ['La pose gel abîme-t-elle les ongles ?', 'Bien posée et déposée par une professionnelle, elle ne les abîme pas. Évitez d’arracher le gel vous-même.'],
          ['Que faire si un ongle casse ?', 'Le salon répare un ongle cassé pour 5 €, en 20 minutes environ.']
        ]
      },
      {
        slug: 'vernis-semi-permanent-rouen',
        title: 'Vernis semi-permanent à Rouen, dès 35 € | B-Zen',
        description: 'Vernis semi-permanent renforcé, manucure, dépose et nouvelle pose, mains et pieds au 113 rue Lafayette à Rouen. Dès 35 €. Onglerie B-Zen.',
        h1: 'Vernis semi-permanent et manucure à Rouen',
        fil: 'Semi-permanent',
        image: [P('zozwi6jtuoicr0umsaji'), 'Manucure semi-permanent réalisée chez B-Zen à Rouen'],
        intro: 'Le vernis semi-permanent est un vernis gel qui sèche sous lampe UV ou LED et tient deux à trois semaines sans s’écailler. Chez B-Zen, à Rouen, la pose renforcée coûte 35 €, la dépose avec nouvelle pose 45 € et la formule mains et pieds 70 €.',
        sections: [
          ['Semi-permanent ou vernis classique ?', 'Le vernis classique sèche à l’air et s’écaille en quelques jours. Le semi-permanent reste brillant deux à trois semaines et protège légèrement l’ongle.'],
          ['Qu’est-ce qu’une pose renforcée ?', 'Une base de renfort est ajoutée avant la couleur pour solidifier les ongles fins ou cassants.'],
          ['Comment faire durer le semi-permanent ?', 'Portez des gants pour la vaisselle et le ménage, hydratez les cuticules et ne retirez pas le vernis vous-même : la dépose au salon préserve l’ongle.']
        ],
        tarifsCles: [0, 1, 2, 3],
        faq: [
          ['Peut-on faire le semi-permanent sur ongles courts ?', 'Oui, il convient à toutes les longueurs.'],
          ['La manucure est-elle comprise ?', 'La manucure complète est aussi proposée seule, à 30 € pour 30 minutes.']
        ]
      },
      {
        slug: 'beaute-des-pieds-rouen',
        title: 'Beauté des pieds, semi-permanent et BBL Toes à Rouen | B-Zen',
        description: 'Semi-permanent pieds, pose gel pieds et BBL Toes au 113 rue Lafayette à Rouen, dans des fauteuils de massage. De 45 à 60 €. Onglerie B-Zen.',
        h1: 'Beauté des pieds et pédicure à Rouen',
        fil: 'Beauté des pieds',
        image: [P('rgg6mq5jqd6sgto0ocvs'), 'Réalisation de l’onglerie B-Zen à Rouen'],
        intro: 'La beauté des pieds regroupe la mise en beauté des ongles de pieds : vernis semi-permanent, pose en gel ou restructuration. Chez B-Zen, à Rouen, elle se fait dans des fauteuils de massage, de 45 € pour une pose gel à 60 € pour un BBL Toes.',
        sections: [
          ['Qu’est-ce que le BBL Toes ?', 'C’est une restructuration des ongles de pieds à l’acrygel, suivie d’un vernis semi-permanent. Elle redonne une forme harmonieuse aux ongles abîmés ou courts (60 €, environ 1h40).'],
          ['Gel ou semi-permanent pour les pieds ?', 'Le semi-permanent suffit pour colorer et faire briller. Le gel tient plus longtemps et protège davantage l’ongle.'],
          ['Combien de temps tient une pose sur les pieds ?', 'Les ongles de pieds poussent plus lentement : une pose tient généralement plus longtemps que sur les mains.']
        ],
        tarifsCles: [14, 15, 16, 17],
        faq: [
          ['Peut-on combiner mains et pieds ?', 'Oui, la formule semi-permanent mains et pieds est proposée à 70 €.']
        ]
      }
    ]
  }
};

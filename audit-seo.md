# Audit SEO & Migration

## Canonical URLs problématiques
Le code ne génère pas de balise canonique dans "createPage".
Pourtant, WordPress retourne bien :

```
  seo {
    title
    metaDesc
    canonical
  }
```
Cela présente un risque élevé de contenu dupliqué (prévisualisations, anciennes URLs).
Google ne sait pas quelle version de la page indexer ; du coup, il ne met peut-être pas la bonne page en haut des résultats.


## Open Graph incomplet
Aucune donnée OG n’est transmise aux templates

```
  og:title
  og:description
  og:image
  og:url
```

Les partages sur Facebook, LinkedIn ou WhatsApp n’affichent ni titre correct, ni description, ni image.
Cela engendre une perte d’opportunités de trafic via les réseaux sociaux et de visibilité.

## Meta tags manquants (robots, dates, auteur)

<meta name="robots" content="index, follow">
Si la balise "robots" est manquante, les moteurs de recherche ne savent pas exactement comment indexer la page.

<meta name="date" content="2025-11-17" scheme="YYYY-MM-DD">
Sans cette balise, les pages apparaissent moins pertinentes dans les résultats pour les contenus récents.

<meta name="author" content="Nom de l'auteur">
Certains réseaux sociaux ne peuvent pas associer l’article à un auteur fiable (ce qui confère plus de crédibilité).

<meta name="last-modified" content="2025-11-17" scheme="YYYY-MM-DD">
Sans cette balise, les moteurs ne savent pas quand la page a été mise à jour.


# Test Technique Migration Gatsby → Framework Moderne (V2)

## Choix de Stack / Next.js

J’ai choisi Next.js avec l’App Router parce que c’est le framework React le plus utilisé, qu’il bénéficie de mises à jour régulières et qu’il offre une vision pérenne à long terme.

Le fait qu’il soit basé sur React va me permettre de réintégrer les composants en réécrivant moins de code. Je pourrai ainsi me concentrer sur l’optimisation (performances, SEO, accessibilité).

## Stratégie de Rendering / SSG (Static Site Generation)

Les pages sont générées au build puis servies comme de simples fichiers statiques.
Les chargements sont alors quasi instantanés, ce qui améliore la qualité du SEO et l’expérience utilisateur.



## Stratégie de Caching 

Grâce à "generateStaticParams", je peux générer toutes les pages statiques au moment du build.
L’option dynamic = 'force-static' force Next.js à servir ces pages comme du contenu entièrement statique, stocké et mis en cache. Elles ne seront régénérées qu’en cas de revalidation manuelle.

Ensuite, il sera possible de mettre à jour une page spécifique sans rebuild toute l'application grâce à une requête POST vers l’endpoint /api/revalidate, qui déclenchera la régénération de la page concernée.
Celle-ci pourra être utilisée depuis un webhook dans WordPress.

## Implémentation SEO

J’utilise generateMetadata pour créer toutes les balises meta ainsi que le lien canonical.

## Instructions d'installation

### renomer le ".env.exemple" en ".env"
```
  nvm use && npm install
```

### Installer les dépendances
```
  nvm use && npm install
```

### Lancer le build
```
  nvm use && npm build
```

### Lancer le serveur en production
```
  nvm use && npm start
```

### Mise à jour d'une page spécifique
Dans postman utiliser la route POST "http://localhost:3000/api/revalidate" avec le payload
```
{
    "secret": "SECRET",
    "slug": "test-article"
}
```




# Analyse Critique du Code Gatsby

## 1. Appels API non optimisés : un goulet d’étranglement pendant le build

- Les temps de build sont fortement rallongés (potentiellement plusieurs secondes/minutes juste pour attendre l'API Trustpilot ou l'API rates).
- Si une API plante, ralentit ou renvoie une erreur, la mise en production échoue (les conséquences d’un build lent ou instable deviennent beaucoup plus coûteuses quand on a 500k visiteurs/mois).
- Même si les données ne changent pas, Gatsby refait exactement les mêmes appels à chaque build, ce qui est un énorme gaspillage de temps et de ressources.

## 2. Génération de pages WordPress

- Chaque build régénère la totalité des pages, même si un seul article change, ce qui augmente considérablement le temps de build. Les équipes de rédaction doivent ainsi attendre plusieurs minutes avant de pouvoir visualiser la page publiée ou mise à jour.

## 3. Génération de fichiers (sitemap + RSS) pendant le build

- Le code génère manuellement le sitemap et le RSS, ce qui augmente la durée du build.
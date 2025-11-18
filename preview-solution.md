# Preview WordPress

l'idée est de faire un route "/preview/slug"

````
  /preview
    /[slug]
      page.tsx
````

mais de ne pas l'indexer en via "generateMetadata()"

````
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page privée',
    robots: {
      index: false, // n’indexe pas la page
      follow: false // ne suit pas les liens
    }
  };
}
````
ainsi qu'un "robots.txt"

````
User-agent: *
Disallow: /preview/
Allow: /
````
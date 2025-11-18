import article from '@/constants/article.json';

export async function fetchPosts(isFake: boolean = false) {
  if (isFake) {
    return [article];
  }
  const res = await fetch(`${process.env.WORDPRESS_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetPosts {
          posts(first: 10) {
            nodes {
              id
              slug
            }
          }
        }
      `,
    }),
  });

  if (!res.ok || !res) throw new Error(`Erreur lors de la récupération de l'articles`);

  return null;
}

export async function fetchPostBySlug(slug: string, isFake: boolean = false) {
  if (isFake) {
    return article;
  }
  const res = await fetch(`${process.env.WORDPRESS_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetPostBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
            id
            title
            content
            date
            slug
          }
        }
      `,
      variables: { slug },
    }),
  });

  if (!res.ok || !res) throw new Error(`Erreur lors de la récupération de l'article : ${slug}`);

  return null;
}

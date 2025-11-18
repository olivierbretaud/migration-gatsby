import { fetchPostBySlug, fetchPosts } from '@/lib/wordpress';
import { Article, PostPageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Mode statique : la page sera générée au build
// Revalidation uniquement via l'API /api/revalidate
export const dynamic = 'force-static';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: Article | null = await fetchPostBySlug(slug, slug === 'test-article' ? true : false);


  if (!post || post?.status !== 'publish') {
    return {
      title: 'Article non trouvé',
      description: 'Article non trouvé',
    };
  }

  const canonical: string = `${process.env.NEXT_PUBLIC_APP_URL}/actualites/${slug}`;
  const siteName: string = process.env.NEXT_PUBLIC_APP_NAME || 'Pretto';
  const publishedTime: string = post?.yoast_head_json?.schema?.datePublished || new Date(post?.date).toISOString();
  const modifiedTime: string = post?.yoast_head_json?.schema?.dateModified || new Date(post?.date).toISOString();
  const publishedFormatted: string = new Date(publishedTime).toISOString();
  const modifiedFormatted: string = new Date(modifiedTime).toISOString();
  const siteLogo: string = `${process.env.NEXT_PUBLIC_APP_URL}/pretto.svg`
  const author: string = post?.yoast_head_json?.schema?.author?.name || 'Pretto';
  const publisher: string = post?.yoast_head_json?.schema?.publisher?.name || 'Pretto';

  return {
    title: post.meta_title,
    description: post.meta_description,
    // ---------------------
    // Canonical
    // ---------------------
    alternates: {
      canonical,
    },

    // ---------------------
    //  Open Graph
    // ---------------------
    openGraph: {
      title: post.meta_title,
      description: post.meta_description,
      url: canonical,
      type: "article",
      siteName,
      images: [
        {
          url: post?.yoast_head_json?.schema?.image[0]
        }
      ],
      publishedTime: publishedFormatted,
      modifiedTime: modifiedFormatted
    },

    // ---------------------
    // Meta Robots
    // ---------------------
    robots: {
      index: true,
      follow: true
    },

    // ---------------------
    // JSON-LD Structured Data (Google)
    // ---------------------
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.meta_title,
        description: post.meta_description,
        datePublished: new Date(publishedTime).toISOString(),
        dateModified: new Date(modifiedTime).toISOString(),
        author: {
          "@type": "Person",
          name: author
        },
        publisher: {
          "@type": "Organization",
          name: publisher,
          logo: {
            "@type": "ImageObject",
            url: siteLogo
          }
        }
      })
    }
  };
};


export async function generateStaticParams() {
  const posts: Article[] | null = await fetchPosts(true);
  return posts?.map(post => ({ slug: post.slug })) || [];
}

export default async function ActualitePage({ params }: PostPageProps) {
  const { slug } = await params;
  const post: Article | null = await fetchPostBySlug(slug, slug === 'test-article' ? true : false);

  if (!post || post?.status !== 'publish') {
    notFound();
  }

  return (
    <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 sm:items-start">
      <h1 className='text-3xl'>{post.title.rendered}</h1>
      <p className='my-8'>Dernier build de la page : {new Date().toISOString()}</p>
      <article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}
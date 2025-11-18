import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { fetchPostBySlug } from '@/lib/wordpress';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Secret invalide' }, { status: 401 });
  }

  const slug = body.slug;

  try {
    const post = await fetchPostBySlug(slug, slug === 'test-article' ? true : false);
    if (!post) {
      return NextResponse.json({ message: 'Article non trouvé' }, { status: 404 });
    }
    await revalidatePath(`/actualites/${slug}`);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Erreur lors de la revalidation', error: err }, { status: 500 });
  }
}
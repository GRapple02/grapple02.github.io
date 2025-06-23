import PostLayout from '@/layouts/PostLayout';
import { getPostData, getPostsData } from '@/lib/posts';
import { allEtcs } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = Promise<{ slug: string; }>;

export async function generateStaticParams() {
  const posts = getPostsData('etc');
  
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {
  const post = await getPostData('etc', (await params).slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({ params }: { params: PageProps }) {
  const slug = decodeURI((await params).slug)
  const postIndex = allEtcs.findIndex((p) => p.slug === slug);

  const post = allEtcs[postIndex] || null;
  const next = allEtcs[postIndex + 1] || null;
  const prev = allEtcs[postIndex - 1] || null;

  if (!post) {
    return notFound();
  }

  return (
    <PostLayout content={post} next={next} prev={prev} type='travels' />
  );
}

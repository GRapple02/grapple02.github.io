import { getPostData, getPostsData } from '@/lib/posts';
import { Metadata } from 'next';
import { allTravels } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import PostLayout from '@/layouts/PostLayout';

type PageProps = Promise<{ slug: string; }>;

export async function generateStaticParams() {
  const posts = getPostsData('travels');
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {
  const post = await getPostData('travels', (await params).slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({ params }: { params: PageProps }) {
  const slug = decodeURIComponent((await params).slug)
  const postIndex = allTravels.findIndex((p) => p.slug === slug);

  const post = allTravels[postIndex] || null;
  const next = allTravels[postIndex + 1] || null;
  const prev = allTravels[postIndex - 1] || null;

  if (!post) {
    return notFound();
  }

  return (
    <PostLayout content={post} next={next} prev={prev} type='travels' />
  );
}

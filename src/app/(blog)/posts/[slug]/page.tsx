import PostLayout from '@/layouts/PostLayout';
import { getPostData, getPostsData } from '@/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';

type PageProps = Promise<{ slug: string; }>;

export async function generateStaticParams() {
  const posts = getPostsData();
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {
  const post = await getPostData('posts', (await params).slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({ params }: { params: PageProps }) {
  const slug = decodeURI((await params).slug)
  const postIndex = allBlogs.findIndex((p) => p.slug === slug);

  const post = allBlogs[postIndex] || null;
  const next = allBlogs[postIndex + 1] || null;
  const prev = allBlogs[postIndex - 1] || null;

  if (!post) {
    return notFound();
  }

  return (
    <PostLayout content={post} next={next} prev={prev} type='posts' />
  );
}

import { getPostData, getPostsData } from '@/lib/posts';
import { Metadata } from 'next';

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
  const post = await getPostData('travels', (await params).slug);

  return (
    <article className="prose prose-lg max-w-3xl mx-auto p-4">
      <h1>{post.title}</h1>
      <p className="text-gray-500 text-sm">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

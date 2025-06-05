import Link from '@/components/Link'
import siteMetadata from 'data/siteMetadata'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import Card from '@/components/Card'

const MAX_DISPLAY = 10

export default function Home({ posts }: { posts: CoreContent<Blog>[] }) {
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <p className="text-l leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14 dark:text-gray-100">
          최신글 보기
        </p>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>
      <div className="grid gap-8 grid-cols-2">
        {!posts.length && <div className="col-span-full text-center">최신 글이 없습니다...</div>}
        {posts.slice(0, MAX_DISPLAY).map((post) => (
          <Card
            key={post.slug}
            title={post.title}
            imgSrc={post.images && post.images[0]}
            href={`/posts/${post.slug}`}
            date={post.date}
            tag={post.tags?.[0]}
          />
        ))}
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium mt-8">
          <Link
            href="/posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            전체 글 보기 &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

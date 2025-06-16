'use client'

import Link from '@/components/Link'
import siteMetadata from 'data/siteMetadata'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import Card from '@/components/Card'
import { useState } from 'react'
import MainTag from '@/components/MainTag'

const MAX_DISPLAY = 12

export default function Home({ posts, tags }: { posts: CoreContent<Blog>[], tags: string[] }) {
  const [selectedTag, setSelectedTag] = useState<string>()

  // 태그 클릭 시 선택/해제
  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) =>
      prev === tag ? undefined : tag
    )
  }

  // 선택된 태그가 있으면 해당 태그가 모두 포함된 포스트만 필터링
  const filteredPosts = !selectedTag
    ? posts
    : posts.filter((post) =>
      post.tags && post.tags.includes(selectedTag)
    )

  return (
    <>
      <div className='space-y-2 pt-6 pb-4 md:space-y-5'>
        <p className="text-2xl leading-9 font-extrabold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          태그
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <MainTag key={tag} tag={tag} handleTagClick={handleTagClick} selectedTag={selectedTag} />
        ))}
      </div>
      <div className="space-y-2 pt-6 pb-4 md:space-y-5">
        <p className="text-2xl leading-9 font-extrabold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          최신글
        </p>
      </div>
      <div className="grid gap-8 grid-cols-3">
        {filteredPosts.slice(0, MAX_DISPLAY).map((post) => (
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
      {filteredPosts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium mt-8">
          <Link
            href="/posts"
            className="text-emerald-500 hover:text-emerald-400"
            aria-label="All posts"
          >
            전체 글 보기 &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

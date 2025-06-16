import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allEtcs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { POSTS_PER_PAGE } from '@/constants/config'
import tagData from 'tags/etc/tag-data.json'

export const metadata = genPageMetadata({ title: 'Etc' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allEtcs))
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      type='etc'
      tagCounts={tagData as Record<string, number>}
      pagination={pagination}
      title="주저리 주저리"
    />
  )
}

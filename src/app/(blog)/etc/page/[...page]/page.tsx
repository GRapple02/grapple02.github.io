import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allEtcs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { POSTS_PER_PAGE } from '@/constants/config'
import { slug } from 'github-slugger'
import tagData from 'tags/etc/tag-data.json'
import { encodeURIComponentWhenLocal } from '@/lib/utils'

export const generateStaticParams = async () => {
  const params: { page: string[] }[] = []

  // 1. 태그별 페이지네이션 경로 생성
  const tagSet = new Set<string>()
  allEtcs.forEach(post => post.tags?.forEach(tag => tagSet.add(slug(tag))))
  const tags = Array.from(tagSet)

  // 태그가 있는 경우: [tag, pageNumber]
  tags.forEach(tag => {
    const posts = allCoreContent(
      sortPosts(allEtcs.filter(post => post.tags?.map(t => slug(t)).includes(tag)))
    )
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
    for (let i = 1; i <= totalPages; i++) {
      params.push({ page: [encodeURIComponentWhenLocal(tag), i.toString()] })
    }
  })

  // 태그가 없는 경우: [pageNumber]
  const totalPages = Math.ceil(allEtcs.length / POSTS_PER_PAGE)
  for (let i = 1; i <= totalPages; i++) {
    params.push({ page: [i.toString()] })
  }

  return params
}

export default async function Page(props: { params: Promise<{ page: string[] }> }) {
  const params = await props.params
    const tag = decodeURIComponent(params.page[0])
    const filteredPosts = allCoreContent(
      sortPosts(allEtcs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
    )
    const pageNumber = parseInt(params.page[1] as string)
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  
    // Return 404 for invalid page numbers or empty pages
    if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
      return notFound()
    }
    const initialDisplayPosts = filteredPosts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
      currentPage: pageNumber,
      totalPages: totalPages,
    }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      type='etc'
      tagCounts={tagData as Record<string, number>}
      tag={tag}
      pagination={pagination}
      title="주저리 주저리"
    />
  )
}

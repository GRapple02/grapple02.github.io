import { formatDate } from 'pliny/utils/formatDate'
import { useMDXComponent } from 'pliny/mdx-components'
import type { DocumentTypes } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from 'data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { components } from '@/components/MDXComponents'
import Tag from '@/components/Tag'
import { useMemo } from 'react'

interface LayoutProps {
  content: DocumentTypes
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  type: 'posts' | 'travels' | 'etc'
}

export default function PostLayout({ content, next, prev, type }: LayoutProps) {
  const { path, slug, date, title } = content
  const MDXContent = useMDXComponent(content.body.code)

  // #, ## 제목 추출 및 계층 구조 TOC 생성
  const toc = useMemo(() => {
    const raw = content.body.raw || ''
    const lines = raw.split('\n')
    const tocArr: { text: string; id: string; children?: { text: string; id: string }[] }[] = []
    let lastH1: { text: string; id: string; children: { text: string; id: string }[] } | null = null
    for (const line of lines) {
      const h1Match = /^#\s+(.+)/.exec(line)
      const h2Match = /^##\s+(.+)/.exec(line)
      if (h1Match) {
        const text = h1Match[1].trim()
        const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        lastH1 = { text, id, children: [] }
        tocArr.push(lastH1)
      } else if (h2Match) {
        const text = h2Match[1].trim()
        const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
        if (lastH1) {
          lastH1.children.push({ text, id })
        } else {
          // h1 없이 h2만 있는 경우도 처리
          tocArr.push({ text: '', id: '', children: [{ text, id }] })
        }
      }
    }
    return tocArr
  }, [content.body.raw])

  // MDX h1, h2에 id 자동 부여
  const componentsWithHeading = useMemo(() => ({
    ...components,
    h1: (props: any) => {
      const text = typeof props.children === 'string' ? props.children : ''
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
      return <h1 id={id} {...props} />
    },
    h2: (props: any) => {
      const text = typeof props.children === 'string' ? props.children : ''
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-')
      return <h2 id={id} {...props} />
    },
  }), [])

  return (
    <>
      <ScrollTopAndComment />
      <article>
        {/* 헤더 영역 */}
        <div className="space-y-1 pb-10 text-center dark:border-gray-700">
          <div className="w-full">
            <div
              className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-screen overflow-hidden h-80 flex flex-col items-center justify-center"
              style={{
                backgroundImage: `url('/images/눈사람.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <PageTitle>{title}</PageTitle>
              <div className='font-bold text-lg mt-2'>{formatDate(date, 'ko')}</div>
              <div className="flex flex-wrap justify-center mt-2">
                {content.tags?.map((tag) => <Tag key={tag} text={tag} type={type} />)}
              </div>
            </div>
          </div>
        </div>
        {/* 본문+TOC flex row */}
        <div className="flex flex-col md:flex-row">
          {/* 본문 영역 */}
          <div className="flex-1 min-w-0">
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 divide-gray-700">
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 divide-gray-700">
                <div className="post-mdx">
                  <MDXContent components={componentsWithHeading} />
                </div>
              </div>
              {siteMetadata.comments && (
                <div className="pt-6 pb-6 text-center text-gray-700 text-gray-300" id="comment">
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-emerald-500 hover:text-emerald-600"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8 ml-auto">
                      <Link
                        href={`/${next.path}`}
                        className="text-emerald-500 hover:text-emerald-600"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
          {/* 우측 목차(TOC) */}
          {toc.length > 0 && (
            <nav className="hidden md:block max-w-1/4 p-4 ml-1 sticky top-24 self-start border-l border-emerald-600">
              <ul className="space-y-2">
                {toc.map((item, i) => (
                  <li key={item.id || i}>
                    {item.text && (
                      <a href={`#${item.id}`} className="font-bold text-gray-700 hover:text-emerald-600 dark:text-gray-300">
                        {item.text}
                      </a>
                    )}
                    {item.children && item.children.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <a href={`#${child.id}`} className="text-gray-700 hover:text-emerald-600 dark:text-gray-300">
                              {child.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  )
}

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
import Head from 'next/head'

interface LayoutProps {
  content: DocumentTypes
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  type: 'posts' | 'travels' | 'etc'
}

export default function PostLayout({ content, next, prev, type }: LayoutProps) {
  const { path, slug, date, title } = content
  const MDXContent = useMDXComponent(content.body.code)

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
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
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:divide-y-0 divide-gray-700">
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 divide-gray-700">
              <div className="post-mdx">
                <MDXContent components={components} />
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
                      className="text-primary-500 hover:text-primary-600"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && next.path && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary-500 hover:text-primary-600"
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
      </article>
    </SectionContainer>
  )
}

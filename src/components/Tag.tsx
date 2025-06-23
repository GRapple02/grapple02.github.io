import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
  activate?: boolean
  type: 'posts' | 'travels' | 'etc'
}

const Tag = ({ text, activate, type }: Props) => {
  return (
    !activate ? (
      <Link
        href={`/${type}/page/${slug(text)}/1`}
        className="text-emerald-500 hover:text-emerald-400 mr-3 text-sm font-medium"
      >
        {text.split(' ').join('-')}
      </Link>
    ) : (
      <p className='text-emerald-500 mr-3 text-sm font-medium'>
        {text.split(' ').join('-')}
      </p>
    )
  )
}

export default Tag

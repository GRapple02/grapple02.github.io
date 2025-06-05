import Image from './Image'
import Link from './Link'

// CardProps에 author, subtitle, date, tags 등 확장 가능
// 기본 구조는 title, description, imgSrc, href만 사용

type CardProps = {
  title: string
  imgSrc?: string
  href: string
  date: string
  tag?: string
}

const Card = ({ title, imgSrc, href, date, tag }: CardProps) => (
  <Link
    href={href}
    className="rounded-3xl overflow-hidden shadow-lg bg-gray-900/95 flex flex-col w-full h-96"
    aria-label={`Link to ${title}`}
  >
    {/* 상단 이미지 영역 */}
    <div className="bg-[#f5f5eb] relative h-4/5">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={title}
          // width={120}
          // height={120}
          fill={true}
          className="mb-3"
        />
      )}
    </div>
    {/* 하단 제목 영역 */}
    <div className="bg-gray-900 px-6 py-4 flex flex-col gap-2 rounded-b-3xl max-h-2/5">
      <div>
        {title && <span className="text-gray-200 text-xl font-semibold">{title}</span>}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-gray-300 text-base font-semibold">
          {date ? new Date(date).toISOString().slice(0, 10) : ''}
        </span>
        {tag && <span className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded">{tag}</span>}
      </div>
    </div>
  </Link>
)

export default Card

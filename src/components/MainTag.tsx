interface Props {
  tag: string
  handleTagClick: (tag: string) => void
  selectedTag?: string
}

const MainTag = ({ tag, handleTagClick, selectedTag }: Props) => {
  return (
    <button
      key={tag}
      type="button"
      onClick={() => handleTagClick(tag)}
      className={`text-emerald-500 hover:text-emerald-400 text-base font-bold border rounded-3xl px-4 py-1 transition border-emerald-600
        inline-flex w-auto min-w-fit max-w-full justify-center items-center
              ${selectedTag === tag
          ? 'bg-emerald-600 text-black hover:text-black font-bold'
          : ''}`}
    >
      {tag}
    </button>
  )
}

export default MainTag

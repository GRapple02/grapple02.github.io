import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10 md:text-7xl md:leading-14">
      {children}
    </h1>
  )
}

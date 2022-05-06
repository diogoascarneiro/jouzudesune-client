import React from 'react'

export const SectionHeader = ({children}) => {
  return (
    <h1 className='border-0 rounded-xl w-full text-center text-3xl px-12 py-3 my-2 bg-secondary'>{children}</h1>
  )
}

import React from 'react'

export const SectionHeader = ({children, className}) => {
  
  const classlist = "border-0 rounded-xl w-full text-center text-3xl px-12 py-3 my-2 bg-secondary";

  return (
    <h1 className={className ? className + " " + classlist : classlist}>{children}</h1>
  )
}

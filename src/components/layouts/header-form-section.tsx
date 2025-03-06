import React from 'react'

interface HeaderFormSectionProps {
  title?: string
  description?: string
  hideBorder?: boolean
}

export const HeaderFormSection = (props: HeaderFormSectionProps) => {
  const { title, description, hideBorder } = props

  return (
    <header>
      <main>
        <h1 className="font-bold">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </main>
      {!hideBorder && <hr className="my-4 border-t border-gray-300" />}
    </header>
  )
}

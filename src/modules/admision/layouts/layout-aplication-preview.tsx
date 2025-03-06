import React from 'react'

export const LayoutAplicationPreview = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const childrenArray = React.Children.toArray(children)

  const asideComponent = childrenArray.find(
    (child) =>
      React.isValidElement(child) && child.type === LayoutAplicationAside
  )

  const mainContent = childrenArray.filter((child) => child !== asideComponent)

  return (
    <section className="bg-gray-100 w-full">
      <main className="flex flex-col md:flex-row container py-8 gap-4">
        <section className="flex-1 md:pr-4 w-full ">
          {mainContent}
        </section>
        {asideComponent && (
          <aside className="flex-1 md:pl-4 w-full h-fit md:sticky md:top-16 md:max-w-md">
            {React.isValidElement(asideComponent) &&
              asideComponent.props.children}
          </aside>
        )}
      </main>
    </section>
  )
}

export const LayoutAplicationAside = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

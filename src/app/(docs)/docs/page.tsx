export default function Page() {
  return (
    <main className="w-full flex flex-col gap-24 justify-center items-center py-48">
      <section id="logo">
        <img
          src="/brands/escudo-epg.webp"
          alt="Logo"
          className="w-16 h-24 mx-auto rounded-lg"
        />
      </section>
      <section className="w-full max-w-4xl">
        <h1 className="text-7xl text-center text-gray-800 font-medium dark:text-white">
          Escuela de
          <span className="font-bold"> Posgrado </span>
          de la UNAP
        </h1>
      </section>
      <section
        id="code"
        className="bg-black rounded-md text-white p-4 w-full max-w-4xl"
      >
        <code>
          git clone \ https://github.com/daylerjeff199906/epg-unap.git
        </code>
      </section>
    </main>
  )
}

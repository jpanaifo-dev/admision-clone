import {
  Grid3X3,
  Layers,
  Sparkles,
  Palette,
  Sliders,
  Code2,
} from 'lucide-react'

export const Featuressection = () => {
  const features = [
    {
      icon: Grid3X3,
      title: 'Crafted for Startups',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
    {
      icon: Layers,
      title: 'High-quality Design',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
    {
      icon: Sparkles,
      title: 'Next.js 14 (Latest)',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
    {
      icon: Palette,
      title: 'Tailwind CSS',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
    {
      icon: Sliders,
      title: 'Fully Customizable',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
    {
      icon: Code2,
      title: 'Free and Open-Source',
      description:
        'Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellat ut maiores.',
    },
  ]
  return (
    <section className="bg-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-[42px] font-black text-center mb-4">
          Main Features
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          There are many variations of passages of Lorem Ipsum available but the
          majority have suffered alteration in some form.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-gray-800 mb-4">
                <feature.icon className="w-12 h-12 text-blue-500 " />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const services = [
    {
      title: 'Flexible Design',
      description: 'Adaptive interfaces that work seamlessly across all devices and screen sizes.'
    },
    {
      title: 'Fast Development',
      description: 'Rapid iteration and delivery without compromising on code quality.'
    },
    {
      title: 'High Performance',
      description: 'Optimized for speed and efficiency with lightning-fast load times.'
    },
    {
      title: 'Scalable Solutions',
      description: 'Built with growth in mind, ready to scale as your needs evolve.'
    }
  ]

  return (
    <section id="services" className="py-20 md:py-32 px-6 bg-accent">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What I offer
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="text-lg text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

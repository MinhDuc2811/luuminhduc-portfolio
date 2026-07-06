export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 md:pb-32 md:pt-40">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6 md:space-y-8">
          <p className="text-secondary text-lg md:text-base tracking-wide">Hey there,</p>
          
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight">
              I&apos;m a designer and developer crafting beautiful digital experiences.
            </h1>
          </div>

          <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl">
            I specialize in creating websites and applications that combine stunning design with robust functionality. Let&apos;s build something exceptional together.
          </p>

          <div className="pt-4">
            <a 
              href="#contact"
              className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

import Header from '@/components/header'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Projects from '@/components/projects'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

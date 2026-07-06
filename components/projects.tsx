'use client'

import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A modern e-commerce solution with seamless checkout and real-time inventory management.',
      tags: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with real-time data visualization and user management system.',
      tags: ['Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Mobile App Design',
      description: 'Complete design system and mobile app for fitness tracking with social features.',
      tags: ['Figma', 'React Native', 'Firebase'],
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      title: 'Brand Website Redesign',
      description: 'Comprehensive website redesign for a tech startup with improved conversion rates.',
      tags: ['Web Design', 'Next.js', 'Tailwind CSS', 'Conversion Optimization'],
      image: '/placeholder.svg?height=400&width=600'
    }
  ]

  return (
    <section id="work" className="py-20 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Featured work
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="mb-6 overflow-hidden rounded-lg bg-accent">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {project.title}
              </h3>
              
              <p className="text-lg text-secondary mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-sm font-medium bg-accent text-foreground rounded-full border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

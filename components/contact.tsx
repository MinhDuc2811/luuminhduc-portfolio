'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-6 bg-accent">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Let&apos;s work together
            </h2>
            <p className="text-lg md:text-xl text-secondary max-w-2xl">
              Have a project in mind? I&apos;d love to hear about it. Get in touch and let&apos;s create something amazing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-colors"
                placeholder="Tell me about your project..."
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                {submitted ? 'Message sent!' : 'Send message'}
              </button>
            </div>
          </form>

          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <p className="text-sm font-medium text-secondary mb-2">Email</p>
              <a href="mailto:hello@example.com" className="text-foreground hover:text-secondary transition-colors">
                hello@example.com
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary mb-2">Phone</p>
              <a href="tel:+1234567890" className="text-foreground hover:text-secondary transition-colors">
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary mb-2">Social</p>
              <div className="flex gap-4">
                <a href="#" className="text-foreground hover:text-secondary transition-colors">Twitter</a>
                <a href="#" className="text-foreground hover:text-secondary transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

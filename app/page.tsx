'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              ZA
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform ${
                      activeSection === item.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden md:block px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all glow-hover"
            >
              Get in Touch
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 animate-fadeInDown">
              <div className="flex flex-col gap-4">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fadeInUp">
              <div className="space-y-4">
                <p className="text-primary font-semibold text-lg">Hi, I'm</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  Zuned <span className="text-gradient">Aalim</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                  Full Stack Developer
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                From frontend interactions to backend APIs, I build complete web solutions. 
                I work with modern stacks to deliver apps that are scalable, maintainable, 
                and ready for real-world users.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all glow-hover shine-effect"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-border rounded-lg font-semibold hover:border-primary transition-all"
                >
                  Contact Me
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 pt-4">
                {[
                  { name: 'GitHub', icon: 'G' },
                  { name: 'LinkedIn', icon: 'in' },
                  { name: 'Twitter', icon: 'X' },
                  { name: 'Email', icon: '@' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <span className="font-bold">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="relative animate-fadeIn delay-300">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-border bg-card">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-card to-secondary">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted"></div>
                      <p className="text-sm">[Profile Image]</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-float delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What I <span className="text-gradient">Do</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I specialize in building comprehensive solutions across the full development stack
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Full Stack Development',
                description: 'From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
                skills: ['React, Node.js, Express.js', 'REST APIs, Firebase, Docker', 'Git, GitHub, Postman'],
                icon: '💻'
              },
              {
                title: 'UI/UX Design',
                description: 'Design is more than looks — it\'s about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.',
                skills: ['NextJs, TailwindCSS, GSAP', 'Figma to Code', 'HTML, CSS, JavaScript'],
                icon: '🎨'
              },
              {
                title: 'Data & Algorithms',
                description: 'Beyond handling data, I\'m driven by the challenge of turning complex raw inputs into reliable, usable systems. I enjoy designing pipelines that power insights and apply core CS principles to build for scale, speed, and stability.',
                skills: ['Data Structures & Algorithms', 'DBMS, OOP, OS Fundamentals', 'Data Pipelines, ETL, and Scalability'],
                icon: '⚙️'
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className="text-5xl">{service.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold">{service.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2 pt-4">
                    {service.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              My <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'] },
              { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'Firebase', 'MongoDB'] },
              { category: 'Tools', skills: ['Git', 'Docker', 'Postman', 'Figma', 'VS Code'] },
              { category: 'Core', skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'System Design'] }
            ].map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all animate-scaleIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{group.category}</h3>
                <div className="space-y-3">
                  {group.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of my recent works
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-card/50"></div>
                      <p className="text-sm">[Project Image]</p>
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-4">
                      <a href="#" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Live Demo
                      </a>
                      <a href="#" className="px-4 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:border-primary transition-colors">
                        View Code
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    Project Title {idx + 1}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A comprehensive web application built with modern technologies, featuring responsive design and seamless user experience.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'MongoDB'].map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-block px-8 py-4 border-2 border-border rounded-lg font-semibold hover:border-primary transition-all"
            >
              View All Projects →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '📧', label: 'Email', value: 'hello@zunedaalim.com' },
              { icon: '📍', label: 'Location', value: 'Remote / Global' },
              { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' }
            ].map((contact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-all animate-scaleIn"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl mb-3">{contact.icon}</div>
                <p className="text-sm text-muted-foreground mb-2">{contact.label}</p>
                <p className="font-medium text-sm">{contact.value}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all glow-hover"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gradient mb-2">Zuned Aalim</p>
              <p className="text-sm text-muted-foreground">
                © 2025 All rights reserved.
              </p>
            </div>

            <div className="flex gap-6">
              {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isScrolled && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all glow-hover shadow-lg animate-fadeIn z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
// Personal details and links are placeholders. Replace them before publishing.
window.PORTFOLIO_CONFIG = {
  profile: {
    name: 'Surafel Bekele',
    initials: 'SB',
    location: 'Adama, Ethiopia',
    established: 2017,
    yearsExperience: 3,
    projectsCompleted: 22,
    happyClients: 7,
  },
  contact: {
    email: 'hello@yourname.design',
    whatsapp: 'https://wa.me/+251985339523',
    telegram: 'https://t.me/@Suraw23',
    // Set this to your HTTPS form-service endpoint to enable online submissions.
    contactEndpoint: '',
    socials: [
      { name: 'Instagram', url: 'https://www.instagram.com/surafel3510?gwpx=MWF0N3dmMHhmYmNkcg==', icon: 'fa-instagram' },
      { name: 'Facebook', url: 'https://facebook.com/', icon: 'fa-facebook-f' },
      { name: 'Telegram', url: 'https://t.me/@Suraw23', icon: 'fa-telegram' },
      { name: 'WhatsApp', url: 'https://wa.me/+251985339523', icon: 'fa-whatsapp' },
      { name: 'LinkedIn', url: 'https://linkedin.com/', icon: 'fa-linkedin-in' },
    ],
  },
  services: [
    { title: 'Brand identity', description: 'The big idea, beautifully made real. A complete visual language that feels like you.', icon: 'fa-shapes' },
    { title: 'Logo design', description: 'A memorable mark with meaning, made to work everywhere your brand needs to be.', icon: 'fa-pen-nib' },
    { title: 'Social media', description: 'Scroll-stopping templates and campaigns that sound, look, and feel unmistakably yours.', icon: 'fa-photo-film' },
    { title: 'Posters & flyers', description: 'Big ideas with a little paper magic. Art-directed to make people pause and look.', icon: 'fa-file-image' },
    { title: 'Advertising', description: 'Campaign creative that connects the right story to the right people.', icon: 'fa-arrow-trend-up' },
    { title: 'Packaging', description: 'Shelf-worthy, thoughtful packaging that turns a first impression into a feeling.', icon: 'fa-box-open' },
    { title: 'Business card design', description: 'A small but memorable first impression, designed to feel like the brand in your hands.', icon: 'fa-address-card' },
    { title: 'Photo manipulation', description: 'Thoughtful retouching and image-making that turns a good visual idea into a great one.', icon: 'fa-wand-magic-sparkles' },
  ],
  tools: [
    { name: 'Photoshop', mark: 'Ps', level: 94 },
    { name: 'Illustrator', mark: 'Ai', level: 92 },
    { name: 'Premiere Pro', mark: 'Pr', level: 70 },
  ],
  testimonials: [
    {
      quote: 'The designer understood the feeling we wanted to create before we had the words for it. The result feels exactly like us, only more us.',
      name: 'Saba M.',
      role: 'Founder, Flora Botanicals',
      project: 'Brand identity',
      initials: 'SM',
    },
    {
      quote: 'The whole process was thoughtful, collaborative, and genuinely fun. We finally have an identity we are excited to put everywhere.',
      name: 'Daniel K.',
      role: 'Creative director, FORMA',
      project: 'Logo & art direction',
      initials: 'DK',
    },
    {
      quote: 'Every detail felt considered. Our campaign looked incredible, connected with our audience, and sold out opening weekend.',
      name: 'Liya T.',
      role: 'Producer, Afterhours',
      project: 'Campaign & posters',
      initials: 'LT',
    },
  ],
};

(() => {
  'use strict'

  const config = window.PORTFOLIO_CONFIG
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])

  function safeLink(value) {
    try {
      const url = new URL(value, window.location.href)
      return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? url.href : ''
    } catch {
      return ''
    }
  }

  function renderProfile() {
    document.querySelectorAll('[data-profile]').forEach((element) => {
      const key = element.dataset.profile
      const value = config.profile[key]
      if (value !== undefined) element.textContent = key === 'location' ? value.toUpperCase() : value
    })

    document.querySelectorAll('.wordmark, .footer__mark').forEach((element) => {
      element.innerHTML = `${escapeHTML(config.profile.initials)}<span>®</span>`
    })
    document.querySelectorAll('[data-contact-email]').forEach((element) => {
      element.href = `mailto:${config.contact.email}`
      element.firstChild.textContent = config.contact.email
    })

    document.querySelector('[data-counter="years"]').dataset.target = config.profile.yearsExperience
    document.querySelector('[data-counter="projects"]').dataset.target = config.profile.projectsCompleted
    document.querySelector('[data-counter="clients"]').dataset.target = config.profile.happyClients
    document.querySelector('#current-year').textContent = new Date().getFullYear()
  }

  function renderServices() {
    document.querySelector('#services-grid').innerHTML = config.services.map((service, index) => `
      <article class="service-card" style="--card-index:${index}">
        <span class="service-card__number">${String(index + 1).padStart(2, '0')}</span>
        <i class="service-card__icon fa-solid ${escapeHTML(service.icon)}" aria-hidden="true"></i>
        <h3>${escapeHTML(service.title)}</h3>
        <p>${escapeHTML(service.description)}</p>
        <i class="service-card__arrow fa-solid fa-arrow-down" aria-hidden="true"></i>
      </article>
    `).join('')
  }

  function renderTools() {
    document.querySelector('#tools-grid').innerHTML = config.tools.map((tool, index) => `
      <article class="tool-item" style="--tool-index:${index}">
        <span class="tool-mark tool-mark--${index}" aria-hidden="true">${escapeHTML(tool.mark)}</span>
        <div class="tool-item__details">
          <div><h3>${escapeHTML(tool.name)}</h3><span>${Number(tool.level)}%</span></div>
          <div class="skill-track" role="meter" aria-label="${escapeHTML(tool.name)} proficiency" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Number(tool.level)}">
            <span style="--skill-level:${Math.max(0, Math.min(100, Number(tool.level)))}%"></span>
          </div>
        </div>
        <i class="tool-item__arrow fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </article>
    `).join('')
  }

  function renderSocialLinks() {
    const links = config.contact.socials
      .map((social) => ({ ...social, href: safeLink(social.url) }))
      .filter((social) => social.href)

    document.querySelector('#social-links').innerHTML = links.map((social) => `
      <a href="${escapeHTML(social.href)}" target="_blank" rel="noopener noreferrer"
        aria-label="${escapeHTML(social.name)}">
        <i class="fa-brands ${escapeHTML(social.icon)}" aria-hidden="true"></i>${escapeHTML(social.name)}
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
    `).join('')

    document.querySelector('#contact-links').innerHTML = [
      { name: 'WhatsApp', href: safeLink(config.contact.whatsapp), icon: 'fa-whatsapp' },
      { name: 'Telegram', href: safeLink(config.contact.telegram), icon: 'fa-telegram' },
      { name: 'Email', href: `mailto:${config.contact.email}`, icon: '' },
    ].filter((link) => link.href).map((link) => `
      <a href="${escapeHTML(link.href)}"${link.name === 'Email' ? '' : ' target="_blank" rel="noopener noreferrer"'}>
        ${link.icon ? `<i class="fa-brands ${escapeHTML(link.icon)}" aria-hidden="true"></i>` : ''}${escapeHTML(link.name)}
        <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
    `).join('')
  }

  function initializeMenu() {
    const toggle = document.querySelector('.menu-toggle')
    const menu = document.querySelector('#mobile-menu')

    function setMenuOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen))
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
      toggle.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}" aria-hidden="true"></i>`
      menu.inert = !isOpen
      document.body.classList.toggle('menu-open', isOpen)
    }

    toggle.addEventListener('click', () => {
      setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true')
    })
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false)
    })
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false)
        toggle.focus()
      }
    })
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMenuOpen(false)
    })
  }

  function initializeTestimonials() {
    const container = document.querySelector('#testimonial-content')
    const count = document.querySelector('#testimonial-count')
    const testimonials = config.testimonials
    let activeIndex = 0

    function showTestimonial(index) {
      activeIndex = (index + testimonials.length) % testimonials.length
      const testimonial = testimonials[activeIndex]
      container.innerHTML = `
        <span class="client-avatar" aria-hidden="true">${escapeHTML(testimonial.initials)}</span>
        <blockquote>${escapeHTML(testimonial.quote)}</blockquote>
        <figcaption class="testimonial__client">
          <span><strong>${escapeHTML(testimonial.name)}</strong><small>${escapeHTML(testimonial.role)}</small></span>
          <span class="testimonial__project">${escapeHTML(testimonial.project)}</span>
        </figcaption>
      `
      count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}`
      container.classList.remove('is-changing')
      void container.offsetWidth
      container.classList.add('is-changing')
    }

    document.querySelector('#testimonial-prev').addEventListener('click', () => showTestimonial(activeIndex - 1))
    document.querySelector('#testimonial-next').addEventListener('click', () => showTestimonial(activeIndex + 1))
    showTestimonial(0)
  }

  function initializeContactForm() {
    const form = document.querySelector('#contact-form')
    const status = document.querySelector('#form-status')
    const submitButton = form.querySelector('[type="submit"]')

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      status.replaceChildren()
      status.hidden = false
      status.classList.remove('form-status--error')

      if (!config.contact.contactEndpoint) {
        status.classList.add('form-status--error')
        status.append('The form isn’t connected yet. Please email ')
        const emailLink = document.createElement('a')
        emailLink.href = `mailto:${config.contact.email}`
        emailLink.textContent = config.contact.email
        status.append(emailLink, ' directly.')
        return
      }

      let endpoint
      try {
        endpoint = new URL(config.contact.contactEndpoint)
      } catch {
        endpoint = null
      }
      if (!endpoint || endpoint.protocol !== 'https:') {
        status.classList.add('form-status--error')
        status.textContent = 'The configured contact endpoint must use HTTPS. Please check the contact settings.'
        return
      }

      submitButton.disabled = true
      status.textContent = 'Sending your note…'
      try {
        const response = await fetch(endpoint.href, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        })
        if (!response.ok) throw new Error(`The contact service responded with ${response.status}.`)
        form.reset()
        status.textContent = 'Your note is on its way. I’ll be in touch soon.'
      } catch (error) {
        status.classList.add('form-status--error')
        status.textContent = error instanceof Error ? error.message : 'Something went wrong. Please email me directly.'
      } finally {
        submitButton.disabled = false
      }
    })
  }

  function initializeNavigation() {
    const sections = document.querySelectorAll('main section[id]')
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
          const current = link.hash === `#${entry.target.id}`
          if (current) link.setAttribute('aria-current', 'location')
          else link.removeAttribute('aria-current')
        })
      })
    }, { rootMargin: '-30% 0px -65% 0px' })

    sections.forEach((section) => observer.observe(section))
  }

  renderProfile()
  renderServices()
  renderTools()
  renderSocialLinks()
  window.PortfolioGallery.initialize(() => window.refreshPortfolioAnimations?.())
  initializeMenu()
  initializeTestimonials()
  initializeContactForm()
  initializeNavigation()
  window.initializePortfolioAnimations()
})()

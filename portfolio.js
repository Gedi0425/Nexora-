// Edit these project details to update the gallery. Categories must match a filter below.
window.PORTFOLIO_PROJECTS = [
  {
    id: 'holland-campaign',
    title: 'Holland yoghurt campaign',
    category: 'Social Media',
    client: 'Holland',
    year: '2026',
    description: 'A bright, family-focused product campaign celebrating Holland yoghurt.',
    image: 'all holland.png',
    imageAlt: 'Holland yoghurt campaign collage with product and lifestyle ads',
    color: '#d8d0bc',
  },
  {
    id: 'holland-product-poster',
    title: 'A taste of Holland',
    category: 'Poster Design',
    client: 'Holland',
    year: '2026',
    description: 'A product-led yoghurt poster with a fresh green palette and bold local typography.',
    image: 'both holland.png',
    imageAlt: 'Holland yoghurt product poster in a green campaign style',
    color: '#b8d7a1',
  },
  {
    id: 'ultimate-bite-poster',
    title: 'The ultimate bite',
    category: 'Poster Design',
    client: 'Food campaign',
    year: '2026',
    description: 'An appetite-led burger promotion built around a bold orange field and oversized product photography.',
    image: 'burger post design.png',
    imageAlt: 'Burger promotion poster with an orange background',
    color: '#f0a52e',
  },
  {
    id: 'ai-tools-campaign',
    title: 'Learn AI tools',
    category: 'Social Media',
    client: 'Digital campaign',
    year: '2026',
    description: 'A high-contrast creator graphic introducing a new set of AI tools.',
    image: 'photo_2026-11-20_21-41-00.jpg',
    imageAlt: 'AI tools social graphic featuring a creator against a purple background',
    color: '#5531a3',
  },
  {
    id: 'creator-earnings',
    title: 'Make your content count',
    category: 'Social Media',
    client: 'Creator campaign',
    year: '2026',
    description: 'A punchy creator-economy graphic comparing platform earnings at a glance.',
    image: 'photo_2026-11-20_21-41-05.jpg',
    imageAlt: 'Creator campaign graphic comparing YouTube and TikTok earnings',
    color: '#ee8d00',
  },
  {
    id: 'fitness-mark',
    title: 'Strength in motion',
    category: 'Logo Design',
    client: 'Fitness brand',
    year: '2026',
    description: 'A compact, high-energy mark built around movement and power.',
    image: 'photo_2026-11-20_21-41-51.jpg',
    imageAlt: 'Fitness identity mark with a lightning bolt over a training scene',
    color: '#161818',
  },
  {
    id: 'business-cards',
    title: 'A mark you can hold',
    category: 'Print Design',
    client: 'Identity project',
    year: '2026',
    description: 'A tactile business-card suite pairing a confident symbol with a crisp red-and-white palette.',
    image: 'photo_2026-11-20_21-42-41.jpg',
    imageAlt: 'Red and white business card identity mockups',
    color: '#a7595a',
  },
  {
    id: 'ela-coffee',
    title: 'Ela Coffee Delivery',
    category: 'Logo Design',
    client: 'Ela Coffee',
    year: '2026',
    description: 'A warm, memorable identity for a coffee delivery service.',
    image: 'photo_2026-11-20_21-42-49.jpg',
    imageAlt: 'Ela Coffee Delivery logo on a white background',
    color: '#f0eee7',
  },
  {
    id: 'unic-stationery',
    title: 'UNiC, in every detail',
    category: 'Print Design',
    client: 'UNiC Insurance',
    year: '2026',
    description: 'A branded stationery system bringing a clear insurance identity into everyday touchpoints.',
    image: 'photo_2026-11-20_21-43-34.jpg',
    imageAlt: 'UNiC Insurance stationery and business card mockups',
    color: '#f47719',
  },
  {
    id: 'ethom-identity',
    title: 'ETHOM Construction identity',
    category: 'Branding',
    client: 'ETHOM Construction',
    year: '2026',
    description: 'A practical construction identity shown across apparel, stationery, and digital applications.',
    image: 'photo_2026-11-20_21-43-43.jpg',
    imageAlt: 'ETHOM Construction identity applications and branded apparel',
    color: '#1e3350',
  },
  {
    id: 'ethom-mark',
    title: 'Built to stand strong',
    category: 'Logo Design',
    client: 'ETHOM Construction',
    year: '2026',
    description: 'A geometric construction mark designed to feel stable, modern, and unmistakable.',
    image: 'photo_2026-11-20_21-43-51.jpg',
    imageAlt: 'ETHOM Construction logo on a white background',
    color: '#f3f1eb',
  },
  {
    id: 'unic-mark',
    title: 'A mark built on trust',
    category: 'Logo Design',
    client: 'UNiC Insurance',
    year: '2026',
    description: 'A bold, legible insurance identity designed to carry across print and digital formats.',
    image: 'photo_2026-11-20_21-44-08.jpg',
    imageAlt: 'UNiC Insurance logo on an orange background',
    color: '#f47719',
  },
  {
    id: 'food-poster',
    title: 'A slice of something good',
    category: 'Poster Design',
    client: 'Food campaign',
    year: '2026',
    description: 'A lively restaurant promotion pairing generous food photography with clear offers.',
    image: 'photo_2026-11-20_21-46-59.jpg',
    imageAlt: 'Restaurant poster featuring a burger and a bowl meal',
    color: '#f3b01d',
  },
  {
    id: 'food-social-campaign',
    title: 'Good food, good mood',
    category: 'Social Media',
    client: 'Food campaign',
    year: '2026',
    description: 'A coordinated set of food-led campaign graphics made for a social feed.',
    image: 'photo_2026-11-20_21-47-21.jpg',
    imageAlt: 'Food campaign collage featuring burger and bowl promotions',
    color: '#e8a820',
  },
]

window.PORTFOLIO_CATEGORIES = [
  'All',
  'Branding',
  'Logo Design',
  'Poster Design',
  'Social Media',
  'Print Design',
]

window.PortfolioGallery = (() => {
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])

  const safeURL = (value, fallback = '') => {
    if (!value) return fallback
    try {
      const url = new URL(value, window.location.href)
      return ['https:', 'http:'].includes(url.protocol)
        || (url.protocol === 'file:' && window.location.protocol === 'file:')
        ? url.href
        : fallback
    } catch {
      return fallback
    }
  }

  function initialize(onProjectsChanged) {
    const filterList = document.querySelector('#project-filters')
    const track = document.querySelector('#projects-track')
    const total = document.querySelector('#project-total')
    const dialog = document.querySelector('#project-dialog')
    const closeButton = dialog.querySelector('.modal-close')
    let activeCategory = 'All'

    filterList.innerHTML = window.PORTFOLIO_CATEGORIES.map((category, index) => `
      <button class="filter-chip${index === 0 ? ' is-active' : ''}" type="button"
        data-category="${escapeHTML(category)}" aria-pressed="${index === 0}">
        ${escapeHTML(category)}
      </button>
    `).join('')

    function renderProjects() {
      const visibleProjects = activeCategory === 'All'
        ? window.PORTFOLIO_PROJECTS
        : window.PORTFOLIO_PROJECTS.filter((project) => project.category === activeCategory)

      total.textContent = `${String(visibleProjects.length).padStart(2, '0')} PROJECTS`
      track.innerHTML = visibleProjects.map((project, index) => {
        const imageURL = safeURL(project.image)
        const color = /^#[\da-f]{6}$/i.test(project.color) ? project.color : '#272720'
        return `
          <button class="project-card" type="button" data-project-id="${escapeHTML(project.id)}"
            aria-label="View ${escapeHTML(project.title)}, ${escapeHTML(project.category)} project">
            <span class="project-card__scene">
              <span class="project-card__art" aria-hidden="true">
                <span class="project-card__image-wrap" style="--project-color:${color}">
                  <img src="${escapeHTML(imageURL)}" alt="" loading="lazy" decoding="async">
                  <span class="project-card__view">View project <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
                  <span class="project-card__index">${String(index + 1).padStart(2, '0')}</span>
                </span>
              </span>
            </span>
            <span class="project-card__info">
              <span><span class="project-card__title">${escapeHTML(project.title)}</span>
                <span class="project-card__client">${escapeHTML(project.client)}</span></span>
              <span class="project-category">${escapeHTML(project.category)}</span>
            </span>
          </button>
        `
      }).join('')

      if (typeof onProjectsChanged === 'function') onProjectsChanged()
      window.dispatchEvent(new CustomEvent('portfolio:projects-rendered'))
    }

    function openProject(project) {
      if (!project) return
      const modalImage = document.querySelector('#modal-image')
      modalImage.src = safeURL(project.image)
      modalImage.alt = project.imageAlt
      document.querySelector('#modal-meta').innerHTML = `<span class="eyebrow-dot"></span>${escapeHTML(project.category)} · ${escapeHTML(project.year)}`
      document.querySelector('#modal-title').textContent = project.title
      document.querySelector('#modal-description').textContent = project.description
      document.querySelector('#modal-client').textContent = `Made for ${project.client}`
      if (!dialog.open) dialog.showModal()
      closeButton.focus()
    }

    filterList.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-category]')
      if (!button) return
      activeCategory = button.dataset.category
      filterList.querySelectorAll('button[data-category]').forEach((item) => {
        const selected = item === button
        item.classList.toggle('is-active', selected)
        item.setAttribute('aria-pressed', String(selected))
      })
      renderProjects()
    })

    track.addEventListener('click', (event) => {
      const card = event.target.closest('button[data-project-id]')
      if (!card) return
      openProject(window.PORTFOLIO_PROJECTS.find((project) => project.id === card.dataset.projectId))
    })

    closeButton.addEventListener('click', () => dialog.close())
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close()
    })
    let opener
    track.addEventListener('click', (event) => {
      opener = event.target.closest('button[data-project-id]')
    }, true)
    dialog.addEventListener('close', () => {
      if (opener?.isConnected) opener.focus()
      else track.querySelector('.project-card')?.focus()
    })

    renderProjects()
    return renderProjects
  }

  return { initialize }
})()

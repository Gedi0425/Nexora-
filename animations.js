(() => {
  'use strict'

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let resizeTimer
  let initialized = false
  let projectRevealObserver
  let basicProgressCleanup

  function refreshBasicProjectReveals() {
    projectRevealObserver?.disconnect()
    document.body.classList.add('project-reveals-ready')

    const cards = document.querySelectorAll('.project-card')
    const artworks = document.querySelectorAll('.project-card__art')
    cards.forEach((card) => card.classList.remove('is-visible'))

    if (motionPreference.matches || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'))
      return
    }

    const isMobile = window.matchMedia('(max-width: 760px)').matches
    projectRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.closest('.project-card')?.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, {
      threshold: 0.14,
      rootMargin: isMobile ? '-10% 0px -68% 0px' : '-38% 0px -38% 0px',
    })

    artworks.forEach((artwork) => projectRevealObserver.observe(artwork))
  }

  function initializeAnimations() {
    if (initialized) return
    initialized = true
    const progress = document.querySelector('.scroll-progress')
    const hasGSAP = Boolean(window.gsap && window.ScrollTrigger)

    if (!hasGSAP) {
      document.body.classList.add('animations-ready')
      if (!motionPreference.matches) {
        window.refreshPortfolioAnimations = refreshBasicProjectReveals
        refreshBasicProjectReveals()
      }
      return
    }

    basicProgressCleanup?.()
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      basicProgressCleanup?.()
      document.body.classList.add('animations-ready')
      document.body.classList.add('gsap-active')

      gsap.fromTo('main', { autoAlpha: 0, y: 10 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'transform',
      })

      gsap.fromTo('.hero__topline, .hero__intro, .hero__bottom', {
        autoAlpha: 0,
        y: 24,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.12,
      })

      gsap.fromTo('.hero-line__inner', {
        yPercent: 110,
        rotate: 1.5,
      }, {
        yPercent: 0,
        rotate: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.16,
      })

      gsap.fromTo('.hero__title-third', { autoAlpha: 0, y: 22 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.42,
      })

      gsap.fromTo('.hero__side-note, .scroll-cue', {
        autoAlpha: 0,
      }, {
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.12,
        delay: 0.65,
      })

      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          id: 'page-progress',
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      })

      gsap.fromTo('.hero__content', {
        yPercent: 0,
        scale: 1,
        autoAlpha: 1,
      }, {
        yPercent: 18,
        scale: 0.96,
        autoAlpha: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      gsap.to('.hero__orbit--one', {
        yPercent: 18,
        rotate: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      })

      gsap.to('.hero__orbit--two', {
        yPercent: -14,
        rotate: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.utils.toArray('.reveal:not(.service-card)').forEach((element) => {
        gsap.fromTo(element, {
          autoAlpha: 0,
          x: element.classList.contains('reveal--left') ? -32 : element.classList.contains('reveal--right') ? 32 : 0,
          y: element.classList.contains('reveal--left') || element.classList.contains('reveal--right') ? 0 : 24,
        }, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.78,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        })
      })

      const travelingPortrait = document.querySelector('.about-photo-wrap')
      const portraitTools = travelingPortrait?.querySelector('.about-photo__tools')
      const travelingCircle = travelingPortrait?.querySelector('.about-photo')
      const portraitOrbit = travelingPortrait?.querySelector('.about-photo__orbit')
      let portraitJourney
      const rebuildPortraitJourney = () => {
        if (!travelingPortrait) return
        portraitJourney?.scrollTrigger?.kill()
        portraitJourney?.kill()
        gsap.set(travelingPortrait, { clearProps: 'transform' })
        gsap.set(portraitTools, { clearProps: 'transform,opacity,visibility,marginTop' })
        gsap.set(travelingCircle, { clearProps: 'borderRadius' })
        gsap.set(portraitOrbit, { clearProps: 'opacity,visibility' })

        const hero = document.querySelector('.hero')
        const toolsSection = document.querySelector('.tools')
        const toolsGrid = document.querySelector('.tools__grid')
        const portraitBounds = travelingPortrait.getBoundingClientRect()
        const toolsBounds = toolsSection.getBoundingClientRect()
        const toolsGridBounds = toolsGrid.getBoundingClientRect()
        const illustratorBounds = document.querySelectorAll('.tool-item')[1].getBoundingClientRect()
        const heroOrbit = hero.querySelector('.hero__orbit--one')
        const orbitBounds = heroOrbit.getBoundingClientRect()
        const orbitSize = heroOrbit.offsetWidth
        const orbitCenterX = orbitBounds.left + orbitBounds.width / 2
        const orbitCenterY = orbitBounds.top + orbitBounds.height / 2
        const isMobile = window.matchMedia('(max-width: 760px)').matches
        const scale = Math.min(
          isMobile ? 0.6 : 1.08,
          orbitSize * (isMobile ? 0.74 : 0.86) / portraitBounds.width,
        )
        const startSize = portraitBounds.width * scale
        const startRadius = startSize / 2
        const portraitDocumentTop = portraitBounds.top + window.scrollY
        const startCenterX = Math.max(startRadius + 8, Math.min(window.innerWidth - startRadius - 8, orbitCenterX))
        const startCenterY = orbitCenterY - (isMobile ? 0 : startSize * 0.015)
        const journeyEnd = Math.max(1, document.querySelector('.about__grid').getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35)
        const passStart = Math.max(0, toolsBounds.top + window.scrollY - window.innerHeight * 0.25)
        const passEnd = Math.min(journeyEnd, Math.max(passStart + 1, toolsGridBounds.bottom + window.scrollY - window.innerHeight * 0.08))
        const transitSize = isMobile ? 68 : Math.min(108, Math.max(64, window.innerWidth - toolsGridBounds.right - 24))
        const transitScale = transitSize / portraitBounds.width
        const transitX = illustratorBounds.left + (illustratorBounds.width - transitSize) / 2 - portraitBounds.left
        const transitY = Math.min(window.innerHeight * 0.28, window.innerHeight - transitSize - 24)
        const passStartProgress = Math.min(1, passStart / journeyEnd)
        const passEndProgress = Math.min(1, passEnd / journeyEnd)
        portraitJourney = gsap.timeline({
          scrollTrigger: {
            start: 0,
            end: journeyEnd,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })
        portraitJourney.fromTo(travelingPortrait, {
          x: startCenterX - startRadius - portraitBounds.left,
          y: startCenterY - startRadius - portraitBounds.top,
          scale,
          transformOrigin: 'top left',
        }, {
          x: transitX,
          y: passStart + transitY - portraitDocumentTop,
          scale: transitScale,
          ease: 'none',
          duration: passStartProgress,
        }, 0)
        portraitJourney.to(travelingPortrait, {
          x: transitX,
          y: passEnd + transitY - portraitDocumentTop,
          scale: transitScale,
          ease: 'none',
          duration: passEndProgress - passStartProgress,
        }, passStartProgress)
        portraitJourney.to(travelingPortrait, {
          x: 0,
          y: 0,
          scale: 1,
          ease: 'none',
          duration: 1 - passEndProgress,
        }, passEndProgress)
        portraitJourney.fromTo(travelingCircle, {
          borderRadius: '50%',
        }, {
          borderRadius: '0%',
          ease: 'none',
        }, 0)
        portraitJourney.fromTo(portraitOrbit, {
          autoAlpha: 1,
        }, {
          autoAlpha: 0,
          ease: 'none',
        }, 0)
        portraitJourney.fromTo(portraitTools, {
          scale: 1 / scale,
          x: isMobile ? 0 : 170,
          y: isMobile ? 0 : -10,
          marginTop: 0,
          transformOrigin: 'left top',
        }, {
          scale: 1,
          x: isMobile ? 0 : 170,
          y: isMobile ? 0 : -10,
          marginTop: 0,
          ease: 'none',
        }, 0)
        const badgeFadeEnd = 0.9
        const badgeFadeStart = Math.min(Math.max(passEndProgress, 0.78), badgeFadeEnd - 0.01)
        portraitJourney.fromTo(portraitTools, {
          autoAlpha: 1,
        }, {
          autoAlpha: 0,
          duration: badgeFadeEnd - badgeFadeStart,
          ease: 'none',
        }, badgeFadeStart)
      }
      rebuildPortraitJourney()

      const aboutLead = document.querySelector('.about__lead')
      if (aboutLead) {
        gsap.fromTo(aboutLead.querySelectorAll('.scroll-line > *'), {
          yPercent: 115,
          autoAlpha: 0,
        }, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.78,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutLead, start: 'top 84%', once: true },
        })
      }

      gsap.utils.toArray('[data-counter]').forEach((counter) => {
        const target = Number(counter.dataset.target)
        const state = { value: 0 }
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          once: true,
          onEnter: () => gsap.to(state, {
            value: target,
            duration: 1.45,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = `${Math.round(state.value)}+`
            },
          }),
        })
      })

      window.refreshPortfolioAnimations = () => {
        refreshBasicProjectReveals()
        ScrollTrigger.refresh()
      }

      gsap.fromTo('.service-card', {
        autoAlpha: 0,
        y: 32,
        scale: 0.98,
      }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        stagger: 0.075,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services__grid',
          start: 'top 82%',
          once: true,
        },
      })

      gsap.utils.toArray('.tool-item').forEach((item) => {
        gsap.fromTo(item, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        })
        gsap.fromTo(item.querySelector('.skill-track span'), { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        })
      })

      gsap.fromTo('.contact-form label, .contact-form__footer', {
        autoAlpha: 0,
        y: 17,
      }, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.58,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true },
      })

      const pointerFine = window.matchMedia('(pointer: fine)')
      if (pointerFine.matches) {
        gsap.utils.toArray('.button--lime').forEach((button) => {
          const quickX = gsap.quickTo(button, 'x', { duration: 0.3, ease: 'power2.out' })
          const quickY = gsap.quickTo(button, 'y', { duration: 0.3, ease: 'power2.out' })
          button.addEventListener('pointermove', (event) => {
            const bounds = button.getBoundingClientRect()
            quickX((event.clientX - bounds.left - bounds.width / 2) * 0.08)
            quickY((event.clientY - bounds.top - bounds.height / 2) * 0.12)
          })
          button.addEventListener('pointerleave', () => {
            quickX(0)
            quickY(0)
          })
        })
      }

      gsap.utils.toArray('.service-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
          if (event.pointerType !== 'mouse') return
          const bounds = card.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width - 0.5
          const y = (event.clientY - bounds.top) / bounds.height - 0.5
          card.style.setProperty('--tilt-x', `${-y * 5}deg`)
          card.style.setProperty('--tilt-y', `${x * 5}deg`)
        })
        card.addEventListener('pointerleave', () => {
          card.style.setProperty('--tilt-x', '0deg')
          card.style.setProperty('--tilt-y', '0deg')
        })
      })

      const resizeHandler = () => {
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(() => {
          if (typeof window.refreshPortfolioAnimations === 'function') {
            window.refreshPortfolioAnimations()
          }
          rebuildPortraitJourney()
          ScrollTrigger.refresh()
        }, 160)
      }
      let scrolledFromTop = window.scrollY > 0
      const refreshAtTop = () => {
        if (window.scrollY > 0) {
          scrolledFromTop = true
        } else if (scrolledFromTop) {
          scrolledFromTop = false
          ScrollTrigger.refresh()
        }
      }
      window.addEventListener('resize', resizeHandler, { passive: true })
      window.addEventListener('scroll', refreshAtTop, { passive: true })
      const motionPreferenceHandler = (event) => {
        if (event.matches) {
          refreshBasicProjectReveals()
          document.querySelectorAll('[data-counter]').forEach((counter) => {
            counter.textContent = `${counter.dataset.target}+`
          })
        } else if (typeof window.refreshPortfolioAnimations === 'function') {
          window.refreshPortfolioAnimations()
        }
      }
      if (typeof motionPreference.addEventListener === 'function') {
        motionPreference.addEventListener('change', motionPreferenceHandler)
      } else {
        motionPreference.addListener(motionPreferenceHandler)
      }
      window.refreshPortfolioAnimations()

      return () => {
        window.removeEventListener('resize', resizeHandler)
        window.removeEventListener('scroll', refreshAtTop)
        if (typeof motionPreference.removeEventListener === 'function') {
          motionPreference.removeEventListener('change', motionPreferenceHandler)
        } else {
          motionPreference.removeListener(motionPreferenceHandler)
        }
        window.clearTimeout(resizeTimer)
        if (motionPreference.matches) {
          refreshBasicProjectReveals()
          document.querySelectorAll('[data-counter]').forEach((counter) => {
            counter.textContent = `${counter.dataset.target}+`
          })
          document.body.classList.add('reduced-motion')
          initializeBasicProgress()
        } else {
          document.body.classList.remove('reduced-motion')
          basicProgressCleanup?.()
        }
        document.body.classList.remove('animations-ready')
        document.body.classList.remove('gsap-active')
      }
    })
  }

  function start() {
    if (!motionPreference.matches && window.gsap && window.ScrollTrigger) {
      initializeAnimations()
      return
    }

    if (motionPreference.matches) {
      document.body.classList.add('animations-ready', 'reduced-motion')
      document.querySelectorAll('[data-counter]').forEach((counter) => {
        counter.textContent = `${counter.dataset.target}+`
      })
      if (typeof motionPreference.addEventListener === 'function') {
        motionPreference.addEventListener('change', initializeAnimations, { once: true })
      } else {
        motionPreference.addListener(initializeAnimations)
      }
      initializeBasicProgress()
      return
    }

    document.body.classList.add('animations-ready')
    window.refreshPortfolioAnimations = refreshBasicProjectReveals
    refreshBasicProjectReveals()
    initializeBasicProgress()
  }

  function initializeBasicProgress() {
    if (basicProgressCleanup) return
    const progress = document.querySelector('.scroll-progress')
    let ticking = false

    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0
      progress.style.transform = `scaleX(${Math.max(0, Math.min(1, amount))})`
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()
    basicProgressCleanup = () => {
      window.removeEventListener('scroll', handleScroll)
      basicProgressCleanup = undefined
    }
  }

  window.initializePortfolioAnimations = start
})()

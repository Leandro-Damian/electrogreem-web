/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER HOME ===============*/
const swiperHome = new Swiper('.home__swiper', {
    loop: true,
    slidesPerView: 'auto',
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
const bgHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header')
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', bgHeader)

/*=============== SWIPER TESTIMONIAL ===============*/
const swiperTestimonial = new Swiper('.testimonial__swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 48,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

 autoplay: {
     delay: 3000,
     disableOnInteraction: false,
 }
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll') 
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill'


if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true, // Animations repeat
})

sr.reveal(`.hero__content, .services__header, .footer__container, .footer__copy`)
sr.reveal(`.hero__mascot, .services__slider`, {delay: 600})
sr.reveal(`.home__description, .collection-point, .services__trust`, {delay: 900})
sr.reveal(`.home__data .button`, {delay: 1200})
sr.reveal(`.about__container`, {interval: 100})
sr.reveal(`.raee__definition, .raee-problem__card, .contact__data`, {origin: 'left'})
sr.reveal(`.raee__stats, .raee-solution__card, .contact__map`, {origin: 'right'})

/*=============== SERVICES FADE SLIDER ===============*/

const servicesSlides = document.querySelectorAll('.services__slide')
const prevServiceBtn = document.querySelector('.services__arrow--prev')
const nextServiceBtn = document.querySelector('.services__arrow--next')

let currentServiceIndex = 0
let servicesInterval = null
const SERVICES_DELAY = 4000

/* Show slide */
function showServiceSlide(index) {
  servicesSlides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index)
  })
}

/* Next slide */
function nextServiceSlide() {
  currentServiceIndex =
    (currentServiceIndex + 1) % servicesSlides.length
  showServiceSlide(currentServiceIndex)
}

/* Previous slide */
function prevServiceSlide() {
  currentServiceIndex =
    (currentServiceIndex - 1 + servicesSlides.length) % servicesSlides.length
  showServiceSlide(currentServiceIndex)
}

/* Autoplay */
function startServicesAutoplay() {
  stopServicesAutoplay()
  servicesInterval = setInterval(nextServiceSlide, SERVICES_DELAY)
}

/* Stop autoplay */
function stopServicesAutoplay() {
  if (servicesInterval) {
    clearInterval(servicesInterval)
    servicesInterval = null
  }
}

/* Restart autoplay after interaction */
function restartServicesAutoplay() {
  stopServicesAutoplay()
  startServicesAutoplay()
}

/* Events */
if (servicesSlides.length) {
  // Init
  showServiceSlide(currentServiceIndex)
  startServicesAutoplay()

  // Arrows
  if (nextServiceBtn) {
    nextServiceBtn.addEventListener('click', () => {
      nextServiceSlide()
      restartServicesAutoplay()
    })
  }

  if (prevServiceBtn) {
    prevServiceBtn.addEventListener('click', () => {
      prevServiceSlide()
      restartServicesAutoplay()
    })
  }

  // Pause on hover (desktop only)
  const servicesSlider = document.querySelector('.services__slider')

  if (servicesSlider) {
    servicesSlider.addEventListener('mouseenter', stopServicesAutoplay)
    servicesSlider.addEventListener('mouseleave', startServicesAutoplay)
  }
}

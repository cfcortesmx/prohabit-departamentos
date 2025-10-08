/**
 * MAR NUEVO DEPARTAMENTOS - Script Principal
 * Inicialización de librerías y funcionalidades generales
 */

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 100,
  });

  // Inicializar Navbar
  initNavbar();

  // Inicializar Hero Slider
  initHeroSlider();

  // Inicializar animaciones GSAP
  initGSAPAnimations();

  // Inicializar efectos parallax
  initParallaxEffects();

  // Inicializar smooth scroll para enlaces internos
  initSmoothScroll();

  // Inicializar navegación sticky
  initStickyNav();

  // Inicializar galería de proyecto
  initProjectGallery();

  // Inicializar lightbox de galería
  initGalleryLightbox();

  // Carrusel de características deshabilitado - ahora es lista simple
  // initFeaturesCarousel();

  console.log('✅ Mar Nuevo Departamentos - Sitio inicializado correctamente');
});

/**
 * Inicialización del Navbar con comportamiento de scroll
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuIcon = document.getElementById('mobileMenuIcon');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const scrollProgress = document.getElementById('scrollProgress');
  const topBar = document.getElementById('topBar');
  
  if (!navbar) return;
  
  let lastScrollTop = 0;
  let scrollDirection = 'up';
  
  function updateNavbar() {
    const heroSection = document.getElementById('hero');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = heroSection ? heroSection.offsetHeight : 700;
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    // Detectar dirección de scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    
    // Scroll Progress Bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / windowHeight);
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${scrollPercent})`;
      scrollProgress.setAttribute('aria-valuenow', Math.round(scrollPercent * 100));
    }
    
    // Auto-hide navbar en mobile (solo cuando scrolleas down)
    if (isMobile) {
      if (scrollDirection === 'down' && scrollTop > 200) {
        navbar.classList.add('hide-navbar');
      } else {
        navbar.classList.remove('hide-navbar');
      }
    } else {
      navbar.classList.remove('hide-navbar'); // Siempre visible en desktop
    }
    
    // Agregar clase 'scrolled' después del hero o 100px de scroll
    if (scrollTop > Math.min(heroHeight - 100, 100)) {
      navbar.classList.add('scrolled');
      
      // TopBar siempre oculto en mobile, solo mostrar en desktop
      if (!isMobile && topBar) {
        topBar.classList.add('hidden');
      }
    } else {
      navbar.classList.remove('scrolled');
      
      // TopBar solo visible en desktop, nunca en mobile
      if (!isMobile && topBar) {
        topBar.classList.remove('hidden');
      }
    }
    
    lastScrollTop = scrollTop;
  }
  
  // Actualizar navbar al hacer scroll
  window.addEventListener('scroll', updateNavbar);
  
  // Actualizar navbar al cargar la página
  updateNavbar();
  
  // Toggle mobile menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
      const isExpanded = mobileMenu.classList.contains('show');
      
      // Update aria-expanded for accessibility
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
      mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      
      if (mobileMenuIcon) {
        if (isExpanded) {
          mobileMenuIcon.classList.remove('fa-bars');
          mobileMenuIcon.classList.add('fa-times');
        } else {
          mobileMenuIcon.classList.remove('fa-times');
          mobileMenuIcon.classList.add('fa-bars');
        }
      }
    });
  }
  
  // Cerrar mobile menu al hacer click en un link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      // Update aria-expanded when closing
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
      }
      if (mobileMenuIcon) {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
      }
    });
  });
  
  // Active link indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Inicializar Hero Slider con efecto Ken Burns
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const slideInterval = 6000; // 6 segundos por slide
  let autoplayInterval;

  // Activar el primer slide
  if (slides.length > 0) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
  }

  // Función para cambiar a un slide específico
  function goToSlide(index) {
    // Remover clase active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activar el slide seleccionado
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  // Función para avanzar al siguiente slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  // Auto-avance automático
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, slideInterval);
  }

  // Detener autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Event listeners para los dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoplay();
      startAutoplay(); // Reiniciar autoplay después del click
    });
  });

  // Pausar en hover (opcional, mejor UX)
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);
  }

  // Iniciar autoplay
  startAutoplay();
}

/**
 * Utilidad para detectar swipe/touch en elementos
 */
function addSwipeSupport(element, onSwipeLeft, onSwipeRight) {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isSwiping = false;
  const minSwipeDistance = 30; // Reducido de 50 a 30 para mayor sensibilidad
  
  element.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
  }, { passive: true });
  
  element.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const diffX = touchCurrentX - touchStartX;
    const diffY = touchCurrentY - touchStartY;
    
    // Si el swipe es principalmente horizontal, prevenir scroll vertical
    // Reducir threshold para detectar swipe horizontal más fácilmente
    if (Math.abs(diffX) > Math.abs(diffY) * 0.5) {
      e.preventDefault();
    }
  }, { passive: false }); // Necesitamos passive: false para preventDefault
  
  element.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
    isSwiping = false;
  }, { passive: true });
  
  function handleSwipe() {
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = touchEndY - touchStartY;
    
    // Solo procesar si el swipe horizontal es mayor que el vertical
    // Reducir ratio para ser más permisivo con swipes diagonales
    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) * 0.5) {
      if (Math.abs(swipeDistanceX) > minSwipeDistance) {
        if (swipeDistanceX > 0) {
          // Swipe derecha (anterior)
          onSwipeRight && onSwipeRight();
        } else {
          // Swipe izquierda (siguiente)
          onSwipeLeft && onSwipeLeft();
        }
      }
    }
  }
}

/**
 * Inicializar animaciones con GSAP
 */
function initGSAPAnimations() {
  // Registrar el plugin ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Las animaciones específicas se definen en animations.js
  console.log('🎬 GSAP inicializado');
}

/**
 * Inicializar efectos parallax
 */
function initParallaxEffects() {
  // Los efectos parallax se definen en parallax.js
  console.log('✨ Parallax inicializado');
}

/**
 * Smooth scroll para enlaces internos
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Ajustar según la altura del header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Navegación sticky con efecto al hacer scroll
 */
function initStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase cuando se hace scroll
    if (currentScroll > 100) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Ocultar/mostrar navegación al hacer scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Utilidad para mostrar notificaciones con Toastify
 */
function showNotification(message, type = 'success') {
  const backgroundColor = type === 'success' 
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : type === 'error'
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)';

  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      borderRadius: '8px',
      fontFamily: 'Inter, sans-serif',
    },
  }).showToast();
}

/**
 * Utilidad para lazy loading de imágenes
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Contador animado para números
 */
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
}

/**
 * Inicializar galería de proyecto con navegación infinita
 */
function initProjectGallery() {
  const isMobile = window.innerWidth < 768;
  const totalSlides = isMobile ? 10 : 5; // 10 slides en móvil, 5 en desktop
  let currentIndex = 1; // Empezamos en índice 1 (primera slide real después del clon)
  let isTransitioning = false;

  const galleryTrack = document.querySelector('.gallery-track');
  const navButtons = document.querySelectorAll('.gallery-nav-btn');
  const progressBar = document.querySelector('.gallery-navigation .bg-primary-500');
  const pageCounter = document.querySelector('.gallery-navigation .text-primary-900');
  
  if (!galleryTrack || navButtons.length === 0) return;

  // Función para contar slides visibles
  function getVisibleSlides() {
    return Array.from(galleryTrack.querySelectorAll('.gallery-slide')).filter(slide => {
      const style = window.getComputedStyle(slide);
      return style.display !== 'none';
    });
  }

  // Clonar primera y última slide para efecto infinito
  function setupClones() {
    // Eliminar clones existentes si los hay
    const existingClones = galleryTrack.querySelectorAll('.gallery-slide-clone');
    existingClones.forEach(clone => clone.remove());

    const slides = getVisibleSlides();
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    firstClone.classList.add('gallery-slide-clone');
    lastClone.classList.add('gallery-slide-clone');
    
    // Agregar clones
    galleryTrack.appendChild(firstClone);
    galleryTrack.insertBefore(lastClone, slides[0]);
  }
  
  // Setup inicial
  setupClones();
  
  // Función para obtener el índice real (sin contar clones)
  function getRealIndex(index) {
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    if (index === 0) return currentTotal - 1; // Último clon
    if (index === currentTotal + 1) return 0; // Primer clon
    return index - 1; // Slides reales
  }
  
  // Función para actualizar la galería con smooth scroll
  function updateGallery(transition = true) {
    const slideWidth = galleryTrack.querySelector('.gallery-slide').offsetWidth;
    const gap = window.innerWidth >= 768 ? 24 : 16; // gap-6 o gap-4
    const offset = -(currentIndex * (slideWidth + gap));
    
    // Aplicar o remover transición
    if (transition) {
      galleryTrack.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      galleryTrack.style.transition = 'none';
    }
    
    // Aplicar transformación
    galleryTrack.style.transform = `translateX(${offset}px)`;
    
    // Actualizar UI con índice real
    const realIndex = getRealIndex(currentIndex);
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    
    if (pageCounter) {
      pageCounter.textContent = String(realIndex + 1).padStart(2, '0');
    }
    
    if (progressBar) {
      const percentage = ((realIndex + 1) / currentTotal) * 100;
      progressBar.style.width = percentage + '%';
    }
  }

  // Manejar el loop infinito después de la transición
  function handleTransitionEnd() {
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    if (currentIndex === 0) {
      // Estamos en el último clon, saltar a la última slide real
      isTransitioning = true;
      currentIndex = currentTotal;
      updateGallery(false);
      setTimeout(() => { isTransitioning = false; }, 50);
    } else if (currentIndex === currentTotal + 1) {
      // Estamos en el primer clon, saltar a la primera slide real
      isTransitioning = true;
      currentIndex = 1;
      updateGallery(false);
      setTimeout(() => { isTransitioning = false; }, 50);
    }
  }

  // Listener para el fin de la transición
  galleryTrack.addEventListener('transitionend', handleTransitionEnd);

  // Navegación anterior
  navButtons[0].addEventListener('click', () => {
    if (isTransitioning) return;
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    // Solo permitir hasta el clon anterior (índice 0)
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery(true);
    }
  });

  // Navegación siguiente
  navButtons[1].addEventListener('click', () => {
    if (isTransitioning) return;
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    // Solo permitir hasta el clon siguiente (índice totalSlides + 1)
    if (currentIndex < currentTotal + 1) {
      currentIndex++;
      updateGallery(true);
    }
  });

  // Agregar soporte para swipe/touch en móvil
  addSwipeSupport(
    galleryTrack,
    // Swipe izquierda (siguiente)
    () => {
      if (isTransitioning) return;
      const currentTotal = window.innerWidth < 768 ? 10 : 5;
      if (currentIndex < currentTotal + 1) {
        currentIndex++;
        updateGallery(true);
      }
    },
    // Swipe derecha (anterior)
    () => {
      if (isTransitioning) return;
      const currentTotal = window.innerWidth < 768 ? 10 : 5;
      if (currentIndex > 0) {
        currentIndex--;
        updateGallery(true);
      }
    }
  );

  // Actualizar en resize para mantener posición correcta
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasMobile = totalSlides === 10;
      const nowMobile = window.innerWidth < 768;
      
      if (wasMobile !== nowMobile) {
        // Si cambió de móvil a desktop o viceversa, reiniciar
        currentIndex = 1;
        setupClones();
      }
      updateGallery(false);
    }, 250);
  });

  // Posicionar en la primera slide real al inicio
  updateGallery(false);

  // Generar navigation dots
  function generateGalleryDots() {
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    
    // Solo mostrar 5 dots máximo para evitar cluttering
    const maxDots = Math.min(currentTotal, 5);
    
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot';
      dot.textContent = i + 1;
      dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
      
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex = i + 1; // +1 porque índice 0 es el clon
        updateGallery(true);
      });
      
      dotsContainer.appendChild(dot);
    }
    
    updateActiveDot();
  }

  // Actualizar dot activo
  function updateActiveDot() {
    const dots = document.querySelectorAll('.gallery-dot');
    const realIndex = getRealIndex(currentIndex);
    const currentTotal = window.innerWidth < 768 ? 10 : 5;
    const maxDots = Math.min(currentTotal, 5);
    
    dots.forEach((dot, index) => {
      if (index === realIndex && index < maxDots) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Sobrescribir updateGallery para incluir dots
  const originalUpdateGallery = updateGallery;
  updateGallery = function(transition = true) {
    originalUpdateGallery(transition);
    updateActiveDot();
  };

  // Generar dots inicialmente
  generateGalleryDots();

  // Regenerar dots en resize
  let dotsResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(dotsResizeTimer);
    dotsResizeTimer = setTimeout(() => {
      generateGalleryDots();
    }, 300);
  });

  console.log('🖼️ Galería de proyecto con scroll infinito inicializada');
}

/**
 * Inicializar carrusel de características para móvil
 */
function initFeaturesCarousel() {
  const totalSlides = 3; // 3 slides con 4 características cada una en grid 2x2
  let currentIndex = 1; // Empezamos en índice 1 (primera slide real después del clon)
  let isTransitioning = false;

  const featuresTrack = document.querySelector('.features-track');
  const prevBtn = document.querySelector('.features-prev');
  const nextBtn = document.querySelector('.features-next');
  const progressBar = document.querySelector('.features-progress-bar');
  const pageCounter = document.querySelector('.features-page-counter');
  
  if (!featuresTrack || !prevBtn || !nextBtn) return;

  // Clonar primera y última slide para efecto infinito
  const slides = Array.from(featuresTrack.querySelectorAll('.features-slide'));
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  // Agregar clones
  featuresTrack.appendChild(firstClone);
  featuresTrack.insertBefore(lastClone, slides[0]);
  
  // Función para obtener el índice real (sin contar clones)
  function getRealIndex(index) {
    if (index === 0) return totalSlides - 1; // Último clon
    if (index === totalSlides + 1) return 0; // Primer clon
    return index - 1; // Slides reales
  }
  
  // Función para actualizar el carrusel
  function updateCarousel(transition = true) {
    const slideWidth = featuresTrack.querySelector('.features-slide').offsetWidth;
    const gap = 16; // gap-4 = 16px
    const containerPadding = 32; // px-8 = 32px (2rem)
    
    // Calcular offset para centrar el slide actual
    const offset = -(currentIndex * (slideWidth + gap)) + containerPadding;
    
    // Aplicar o remover transición
    if (transition) {
      featuresTrack.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      featuresTrack.style.transition = 'none';
    }
    
    // Aplicar transformación
    featuresTrack.style.transform = `translateX(${offset}px)`;
    
    // Actualizar clases para efecto visual peek
    const allSlides = featuresTrack.querySelectorAll('.features-slide');
    allSlides.forEach((slide, index) => {
      slide.classList.remove('active-slide');
      if (index === currentIndex) {
        slide.classList.add('active-slide');
      }
    });
    
    // Actualizar UI con índice real
    const realIndex = getRealIndex(currentIndex);
    
    if (pageCounter) {
      pageCounter.textContent = String(realIndex + 1).padStart(2, '0');
    }
    
    if (progressBar) {
      const percentage = ((realIndex + 1) / totalSlides) * 100;
      progressBar.style.width = percentage + '%';
    }
  }

  // Manejar el loop infinito después de la transición
  function handleTransitionEnd() {
    if (currentIndex === 0) {
      // Estamos en el último clon, saltar a la última slide real
      isTransitioning = true;
      currentIndex = totalSlides;
      updateCarousel(false);
      setTimeout(() => { isTransitioning = false; }, 50);
    } else if (currentIndex === totalSlides + 1) {
      // Estamos en el primer clon, saltar a la primera slide real
      isTransitioning = true;
      currentIndex = 1;
      updateCarousel(false);
      setTimeout(() => { isTransitioning = false; }, 50);
    }
  }

  // Listener para el fin de la transición
  featuresTrack.addEventListener('transitionend', handleTransitionEnd);

  // Navegación anterior
  prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    // Solo permitir hasta el clon anterior (índice 0)
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel(true);
    }
  });

  // Navegación siguiente
  nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    // Solo permitir hasta el clon siguiente (índice totalSlides + 1)
    if (currentIndex < totalSlides + 1) {
      currentIndex++;
      updateCarousel(true);
    }
  });

  // Agregar soporte para swipe/touch en móvil
  addSwipeSupport(
    featuresTrack,
    // Swipe izquierda (siguiente)
    () => {
      if (isTransitioning) return;
      if (currentIndex < totalSlides + 1) {
        currentIndex++;
        updateCarousel(true);
      }
    },
    // Swipe derecha (anterior)
    () => {
      if (isTransitioning) return;
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel(true);
      }
    }
  );

  // Actualizar en resize para mantener posición correcta
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateCarousel(false);
    }, 250);
  });

  // Posicionar en la primera slide real al inicio
  updateCarousel(false);

  console.log('📱 Carrusel de características móvil inicializado');
}

/**
 * Toggle para menú móvil
 */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger');
  
  if (mobileMenu && hamburger) {
    mobileMenu.classList.toggle('hidden');
    hamburger.classList.toggle('active');
  }
}

/**
 * Lightbox Modal para Galería
 */
function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTotal = document.getElementById('lightboxTotal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxThumbnails = document.getElementById('lightboxThumbnails');

  if (!lightbox) return;

  // Array para almacenar todas las imágenes de la galería
  let galleryImages = [];
  let currentLightboxIndex = 0;

  // Recopilar todas las imágenes de la galería
  function collectGalleryImages() {
    galleryImages = [];
    const imageContainers = document.querySelectorAll('.gallery-image-container');
    
    imageContainers.forEach((container, index) => {
      const img = container.querySelector('img');
      const titleEl = container.querySelector('.text-white.font-heading');
      const descEl = container.querySelector('.text-white\\/90');
      
      if (img) {
        // Verificar si el contenedor es visible
        const isVisible = window.getComputedStyle(container).display !== 'none';
        
        galleryImages.push({
          src: img.src,
          alt: img.alt,
          title: titleEl ? titleEl.textContent : '',
          description: descEl ? descEl.textContent : '',
          isVisible: isVisible
        });
      }
    });

    // Filtrar solo las imágenes visibles para evitar duplicados
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      // En desktop, eliminar duplicados basados en src
      const seen = new Set();
      galleryImages = galleryImages.filter(img => {
        if (seen.has(img.src)) return false;
        seen.add(img.src);
        return true;
      });
    }

    lightboxTotal.textContent = galleryImages.length;
  }

  // Generar thumbnails
  function generateThumbnails() {
    lightboxThumbnails.innerHTML = '';
    galleryImages.forEach((img, index) => {
      const thumb = document.createElement('img');
      thumb.src = img.src;
      thumb.alt = img.alt;
      thumb.className = 'lightbox-thumbnail';
      thumb.dataset.index = index;
      
      thumb.addEventListener('click', () => {
        currentLightboxIndex = index;
        updateLightbox();
      });
      
      lightboxThumbnails.appendChild(thumb);
    });
  }

  // Abrir lightbox
  function openLightbox(index) {
    collectGalleryImages();
    generateThumbnails();
    currentLightboxIndex = index;
    updateLightbox();
    
    lightbox.classList.remove('hidden');
    document.body.classList.add('lightbox-open');
    
    // Fade in con pequeño delay
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
  }

  // Cerrar lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 300);
  }

  // Actualizar contenido del lightbox
  function updateLightbox() {
    const currentImage = galleryImages[currentLightboxIndex];
    
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
    lightboxTitle.textContent = currentImage.title;
    lightboxDescription.textContent = currentImage.description;
    lightboxCounter.textContent = currentLightboxIndex + 1;

    // Actualizar thumbnails activos
    const thumbnails = lightboxThumbnails.querySelectorAll('.lightbox-thumbnail');
    thumbnails.forEach((thumb, index) => {
      if (index === currentLightboxIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });

    // Scroll al thumbnail activo
    const activeThumbnail = thumbnails[currentLightboxIndex];
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Navegar a la imagen anterior
  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  // Navegar a la siguiente imagen
  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  });

  // Cerrar al hacer click fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Agregar click listeners a todas las imágenes de la galería
  document.addEventListener('click', (e) => {
    const container = e.target.closest('.gallery-image-container');
    if (!container) return;

    const img = container.querySelector('img');
    if (!img) return;

    // Encontrar el índice de esta imagen en el array
    collectGalleryImages();
    const index = galleryImages.findIndex(galleryImg => galleryImg.src === img.src);
    
    if (index !== -1) {
      openLightbox(index);
    }
  });

  console.log('🖼️ Lightbox de galería inicializado');
}

// Exponer funciones globalmente si es necesario
window.showNotification = showNotification;
window.toggleMobileMenu = toggleMobileMenu;
window.animateCounter = animateCounter;

/**
 * Inicializar indicadores de swipe en móvil
 * Se ocultan después de la primera interacción
 */
function initSwipeIndicators() {
  const heroIndicator = document.querySelector('.hero-section .animate-bounce');
  const galleryIndicator = document.querySelector('.gallery-track').previousElementSibling;
  
  let heroInteracted = false;
  let galleryInteracted = false;
  
  // Ocultar indicador de hero después de interacción
  if (heroIndicator) {
    const heroSlider = document.querySelector('.hero-slider');
    
    const hideHeroIndicator = () => {
      if (!heroInteracted) {
        heroIndicator.style.opacity = '0';
        heroIndicator.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          heroIndicator.style.display = 'none';
        }, 500);
        heroInteracted = true;
      }
    };
    
    // Eventos touch
    heroSlider.addEventListener('touchstart', hideHeroIndicator, { once: true });
    
    // Ocultar después de 5 segundos automáticamente
    setTimeout(hideHeroIndicator, 5000);
  }
  
  // Ocultar indicador de galería después de interacción
  if (galleryIndicator && galleryIndicator.querySelector('.fa-hand-pointer')) {
    const galleryTrack = document.querySelector('.gallery-track');
    
    const hideGalleryIndicator = () => {
      if (!galleryInteracted) {
        galleryIndicator.style.opacity = '0';
        galleryIndicator.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          galleryIndicator.style.display = 'none';
        }, 500);
        galleryInteracted = true;
      }
    };
    
    // Eventos touch en la galería
    galleryTrack.addEventListener('touchstart', hideGalleryIndicator, { once: true });
    
    // Eventos click en botones de navegación
    const navButtons = document.querySelectorAll('.gallery-nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', hideGalleryIndicator, { once: true });
    });
    
    // Ocultar después de 4 segundos automáticamente
    setTimeout(hideGalleryIndicator, 4000);
  }
  
  console.log('👆 Indicadores de swipe inicializados');
}

// Inicializar indicadores de swipe
if (window.innerWidth < 768) {
  initSwipeIndicators();
}

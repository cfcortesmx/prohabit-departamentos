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

  // Inicializar carrusel de características (móvil)
  initFeaturesCarousel();

  console.log('✅ Mar Nuevo Departamentos - Sitio inicializado correctamente');
});

/**
 * Utilidad para detectar swipe/touch en elementos
 */
function addSwipeSupport(element, onSwipeLeft, onSwipeRight) {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isSwiping = false;
  const minSwipeDistance = 50; // Mínimo de píxeles para considerar un swipe
  
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
    if (Math.abs(diffX) > Math.abs(diffY)) {
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
    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
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

  console.log('🖼️ Galería de proyecto con scroll infinito inicializada');
}

/**
 * Inicializar carrusel de características para móvil
 */
function initFeaturesCarousel() {
  const totalSlides = 6; // 6 slides con 2 características cada una
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

// Exponer funciones globalmente si es necesario
window.showNotification = showNotification;
window.toggleMobileMenu = toggleMobileMenu;
window.animateCounter = animateCounter;

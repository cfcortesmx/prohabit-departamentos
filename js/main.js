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

  console.log('✅ Mar Nuevo Departamentos - Sitio inicializado correctamente');
});

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
  const totalSlides = 5;
  let currentIndex = 1; // Empezamos en índice 1 (primera slide real después del clon)
  let isTransitioning = false;

  const galleryTrack = document.querySelector('.gallery-track');
  const navButtons = document.querySelectorAll('.gallery-nav-btn');
  const progressBar = document.querySelector('.gallery-navigation .bg-primary-500');
  const pageCounter = document.querySelector('.gallery-navigation .text-primary-900');
  
  if (!galleryTrack || navButtons.length === 0) return;

  // Clonar primera y última slide para efecto infinito
  const slides = Array.from(galleryTrack.querySelectorAll('.gallery-slide'));
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  // Agregar clones
  galleryTrack.appendChild(firstClone);
  galleryTrack.insertBefore(lastClone, slides[0]);
  
  // Función para obtener el índice real (sin contar clones)
  function getRealIndex(index) {
    if (index === 0) return totalSlides - 1; // Último clon
    if (index === totalSlides + 1) return 0; // Primer clon
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
      updateGallery(false);
      setTimeout(() => { isTransitioning = false; }, 50);
    } else if (currentIndex === totalSlides + 1) {
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
    currentIndex--;
    updateGallery(true);
  });

  // Navegación siguiente
  navButtons[1].addEventListener('click', () => {
    if (isTransitioning) return;
    currentIndex++;
    updateGallery(true);
  });

  // Actualizar en resize para mantener posición correcta
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateGallery(false);
    }, 250);
  });

  // Posicionar en la primera slide real al inicio
  updateGallery(false);

  console.log('🖼️ Galería de proyecto con scroll infinito inicializada');
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

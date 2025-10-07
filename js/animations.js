/**
 * NOVA CONDOMINIUM - Animaciones GSAP
 * Definición de animaciones avanzadas con GSAP y ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Verificar que GSAP esté cargado
  if (typeof gsap === 'undefined') {
    console.error('GSAP no está cargado');
    return;
  }

  // Animación del hero principal
  animateHero();

  // Animaciones de secciones con scroll
  animateSections();

  // Animaciones de cards
  animateCards();

  // Animaciones de contadores/estadísticas
  animateCounters();

  console.log('🎬 Animaciones GSAP configuradas');
});

/**
 * Animación del hero principal
 */
function animateHero() {
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButton = document.querySelector('.hero-button');
  const heroImage = document.querySelector('.hero-image');

  if (heroTitle) {
    gsap.from(heroTitle, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  if (heroSubtitle) {
    gsap.from(heroSubtitle, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out'
    });
  }

  if (heroButton) {
    gsap.from(heroButton, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.9,
      ease: 'power3.out'
    });
  }

  if (heroImage) {
    gsap.from(heroImage, {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      delay: 0.5,
      ease: 'power3.out'
    });
  }
}

/**
 * Animaciones de secciones al hacer scroll
 */
function animateSections() {
  // Fade in desde abajo para títulos de sección
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Fade in para subtítulos
  gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
    gsap.from(subtitle, {
      scrollTrigger: {
        trigger: subtitle,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });
  });

  // Animación de reveal para imágenes
  gsap.utils.toArray('.reveal-image').forEach(img => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

/**
 * Animaciones para cards/tarjetas
 */
function animateCards() {
  gsap.utils.toArray('.feature-card, .amenity-card, .plan-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
}

/**
 * Animación de contadores numéricos
 */
function animateCounters() {
  gsap.utils.toArray('.counter-number').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    
    gsap.from(counter, {
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      textContent: 0,
      duration: 2,
      ease: 'power1.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        counter.textContent = Math.ceil(counter.textContent);
      }
    });
  });
}

/**
 * Animación de parallax para elementos específicos
 */
function createParallaxEffect(selector, speed = 0.5) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none'
    });
  });
}

/**
 * Animación de reveal con línea/barra
 */
function animateLineReveal(selector) {
  gsap.utils.toArray(selector).forEach(element => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0ea5e9;
      z-index: 2;
    `;
    
    element.style.position = 'relative';
    element.appendChild(overlay);
    
    gsap.to(overlay, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      scaleX: 0,
      transformOrigin: 'right',
      duration: 1,
      ease: 'power3.inOut'
    });
  });
}

/**
 * Animación de texto carácter por carácter
 */
function animateTextReveal(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    const chars = text.split('');
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
    
    gsap.from(element.children, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
  });
}

/**
 * Animación de hover 3D para cards
 */
function init3DCardEffect() {
  const cards = document.querySelectorAll('.card-3d-effect');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// Inicializar efectos 3D si existen elementos
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.card-3d-effect')) {
    init3DCardEffect();
  }
});

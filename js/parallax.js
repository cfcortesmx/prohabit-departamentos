/**
 * NOVA CONDOMINIUM - Efectos Parallax
 * Implementación de efectos parallax con GSAP ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Verificar que GSAP y ScrollTrigger estén cargados
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP o ScrollTrigger no están cargados');
    return;
  }

  // Registrar el plugin
  gsap.registerPlugin(ScrollTrigger);

  // Inicializar diferentes efectos parallax
  initBackgroundParallax();
  initElementParallax();
  initHeroParallax();
  initSectionParallax();

  console.log('✨ Efectos parallax configurados');
});

/**
 * Parallax para fondos de sección
 */
function initBackgroundParallax() {
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  
  parallaxBgs.forEach(bg => {
    gsap.to(bg, {
      scrollTrigger: {
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: (i, target) => {
        const speed = target.dataset.speed || 0.5;
        return `${speed * 100}%`;
      },
      ease: 'none'
    });
  });
}

/**
 * Parallax para elementos individuales
 */
function initElementParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.5;
    const direction = element.dataset.parallaxDirection || 'vertical';
    
    const animation = {};
    
    if (direction === 'vertical') {
      animation.y = `${speed * 100}%`;
    } else if (direction === 'horizontal') {
      animation.x = `${speed * 100}%`;
    }
    
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      ...animation,
      ease: 'none'
    });
  });
}

/**
 * Parallax específico para la sección hero
 */
function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const heroContent = hero.querySelector('.hero-content');
  const heroBg = hero.querySelector('.hero-bg');

  // Parallax sutil del contenido del hero (fade out al hacer scroll)
  if (heroContent) {
    gsap.to(heroContent, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 50,
      opacity: 0,
      ease: 'power1.out'
    });
  }

  // El formulario NO tiene parallax - se mantiene fijo
  // Removido el parallax del heroImage

  // Parallax muy sutil del fondo del hero (efecto de profundidad)
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: '15%',
      scale: 1.05,
      ease: 'none'
    });
  }
}

/**
 * Parallax para secciones completas
 */
function initSectionParallax() {
  const sections = document.querySelectorAll('.parallax-section');
  
  sections.forEach((section, index) => {
    const isEven = index % 2 === 0;
    
    // Elementos dentro de la sección
    const images = section.querySelectorAll('img');
    const content = section.querySelector('.section-content');
    
    // Parallax para imágenes
    images.forEach(img => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: isEven ? '-20%' : '20%',
        ease: 'none'
      });
    });
    
    // Parallax para contenido
    if (content) {
      gsap.to(content, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: isEven ? '10%' : '-10%',
        ease: 'none'
      });
    }
  });
}

/**
 * Efecto parallax de múltiples capas (profundidad)
 */
function initLayeredParallax(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const layers = container.querySelectorAll('[data-depth]');
  
  layers.forEach(layer => {
    const depth = parseFloat(layer.dataset.depth) || 0.5;
    
    gsap.to(layer, {
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: (i, target) => -ScrollTrigger.maxScroll(window) * depth * 0.1,
      ease: 'none'
    });
  });
}

/**
 * Efecto parallax con rotación
 */
function initRotationParallax(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      rotation: 360,
      ease: 'none'
    });
  });
}

/**
 * Efecto parallax con escala
 */
function initScaleParallax(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.fromTo(element,
      {
        scale: 0.8
      },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        },
        scale: 1,
        ease: 'none'
      }
    );
  });
}

/**
 * Parallax horizontal para galerías
 */
function initHorizontalParallax(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const items = container.querySelectorAll('.parallax-item');
  const totalWidth = container.scrollWidth;
  
  gsap.to(items, {
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      scrub: true,
      pin: true,
      anticipatePin: 1
    },
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none'
  });
}

/**
 * Efecto de clip-path parallax (reveal)
 */
function initClipPathParallax(selector) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    gsap.fromTo(element,
      {
        clipPath: 'inset(100% 0 0 0)'
      },
      {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true
        },
        clipPath: 'inset(0% 0 0 0)',
        ease: 'none'
      }
    );
  });
}

/**
 * Parallax con mouse move (efecto 3D)
 */
function initMouseParallax(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const layers = container.querySelectorAll('[data-mouse-parallax]');
  
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.mouseParallax) || 1;
      
      gsap.to(layer, {
        x: x * speed * 50,
        y: y * speed * 50,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
  
  container.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// Exponer funciones para uso externo si es necesario
window.initLayeredParallax = initLayeredParallax;
window.initHorizontalParallax = initHorizontalParallax;
window.initMouseParallax = initMouseParallax;

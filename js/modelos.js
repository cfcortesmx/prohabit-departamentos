/**
 * modelos.js - JavaScript para página de Modelos
 * Maneja smooth scroll, active states y formulario de contacto
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SMOOTH SCROLL PARA NAVEGACIÓN =====
  const modeloTabLinks = document.querySelectorAll('.modelo-tab-link');
  
  modeloTabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calcular offset para sticky nav
        const navHeight = document.getElementById('modelosNav').offsetHeight + document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== ACTIVE STATE EN STICKY NAV =====
  function updateActiveTab() {
    const sections = document.querySelectorAll('[id^="modelo-"], #comparar');
    const navHeight = document.getElementById('navbar').offsetHeight + document.getElementById('modelosNav').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.modelo-tab-link[href="#${sectionId}"]`);
      
      if (correspondingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Remover active de todos
          modeloTabLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Agregar active al actual
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  // Ejecutar al hacer scroll
  window.addEventListener('scroll', updateActiveTab);
  
  // Ejecutar al cargar
  updateActiveTab();

  // ===== MANEJO DEL FORMULARIO =====
  const modelosForm = document.getElementById('modelosContactForm');
  
  if (modelosForm) {
    modelosForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Elementos del botón
      const submitBtn = document.getElementById('submitBtn');
      const btnText = document.getElementById('btnText');
      const btnLoading = document.getElementById('btnLoading');
      
      // Mostrar loading state
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      
      // Obtener datos del formulario
      const formData = new FormData(modelosForm);
      const datos = {
        modelo: formData.get('modelo'),
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        fecha: formData.get('fecha') || 'No especificada',
        mensaje: formData.get('mensaje') || 'Sin mensaje adicional'
      };
      
      // Construir mensaje para WhatsApp
      const modeloTexto = datos.modelo === 'oceano' ? 'Modelo Océano' : 
                         datos.modelo === 'marina' ? 'Modelo Marina' : 
                         'Ambos Modelos';
      
      const whatsappMessage = `Hola, me interesa obtener más información:

📋 *Información de Contacto*
• Nombre: ${datos.nombre}
• Teléfono: ${datos.telefono}
• Email: ${datos.email}

🏠 *Modelo de Interés*
${modeloTexto}

📅 *Fecha Preferida para Visita*
${datos.fecha}

💬 *Mensaje*
${datos.mensaje}

Quedo al pendiente de su respuesta. ¡Gracias!`;

      // Codificar mensaje para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/523121009988?text=${encodedMessage}`;
      
      // Simular delay de envío (500ms) para mostrar loading
      setTimeout(() => {
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Mostrar notificación (si Toastify está disponible)
        if (typeof Toastify !== 'undefined') {
          Toastify({
            text: "Redirigiendo a WhatsApp...",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #10b981, #059669)",
            }
          }).showToast();
        }
        
        // Restaurar estado del botón
        submitBtn.disabled = false;
        btnLoading.classList.add('hidden');
        btnText.classList.remove('hidden');
        
        // Resetear formulario después de 1 segundo
        setTimeout(() => {
          modelosForm.reset();
        }, 1000);
      }, 500);
    });
  }

  // ===== LIGHTBOX PARA GALERÍA =====
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevImageBtn = document.getElementById('prevImage');
  const nextImageBtn = document.getElementById('nextImage');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  let currentImageIndex = 0;
  let galleryImages = [];

  // Función para abrir lightbox
  function openLightbox(index, images) {
    galleryImages = images;
    currentImageIndex = index;
    updateLightboxImage();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar lightbox
  function closeLightboxFunc() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Función para actualizar imagen
  function updateLightboxImage() {
    const currentImage = galleryImages[currentImageIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
    lightboxTitle.textContent = currentImage.alt;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
  }

  // Navegación anterior
  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }

  // Navegación siguiente
  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }

  // Event listeners
  closeLightbox.addEventListener('click', closeLightboxFunc);
  lightboxBackdrop.addEventListener('click', closeLightboxFunc);
  prevImageBtn.addEventListener('click', showPrevImage);
  nextImageBtn.addEventListener('click', showNextImage);

  // Soporte de teclado
  document.addEventListener('keydown', function(e) {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightboxFunc();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });

  // Agregar click a imágenes principales y galerías de cada modelo
  // Modelo Océano
  const oceanoSection = document.getElementById('modelo-oceano');
  if (oceanoSection) {
    const oceanoMainImage = oceanoSection.querySelector('.relative.rounded-2xl.overflow-hidden.shadow-2xl img');
    const oceanoGallery = oceanoSection.querySelectorAll('.grid.grid-cols-3.gap-4 img');
    const oceanoPlano = oceanoSection.querySelector('img[alt*="Plano arquitectónico"]');
    
    if (oceanoMainImage) {
      // Array con todas las imágenes: principal + galería (sin plano)
      const oceanoImages = [oceanoMainImage, ...Array.from(oceanoGallery)];
      
      oceanoImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
          openLightbox(index, oceanoImages);
        });
      });
      
      // Plano separado (abre solo él en lightbox)
      if (oceanoPlano) {
        oceanoPlano.style.cursor = 'pointer';
        oceanoPlano.addEventListener('click', function() {
          openLightbox(0, [oceanoPlano]);
        });
      }
    }
  }

  // Modelo Marina
  const marinaSection = document.getElementById('modelo-marina');
  if (marinaSection) {
    const marinaMainImage = marinaSection.querySelector('.relative.rounded-2xl.overflow-hidden.shadow-2xl img');
    const marinaGallery = marinaSection.querySelectorAll('.grid.grid-cols-3.gap-4 img');
    const marinaPlano = marinaSection.querySelector('img[alt*="Plano arquitectónico"]');
    
    if (marinaMainImage) {
      // Array con todas las imágenes: principal + galería (sin plano)
      const marinaImages = [marinaMainImage, ...Array.from(marinaGallery)];
      
      marinaImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
          openLightbox(index, marinaImages);
        });
      });
      
      // Plano separado (abre solo él en lightbox)
      if (marinaPlano) {
        marinaPlano.style.cursor = 'pointer';
        marinaPlano.addEventListener('click', function() {
          openLightbox(0, [marinaPlano]);
        });
      }
    }
  }

  // ===== ANIMACIÓN DE NÚMEROS EN STATS (opcional) =====
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // ===== SCROLL TO TOP AL CAMBIAR DE MODELO =====
  const quickNavButtons = document.querySelectorAll('a[href^="#modelo-"]');
  
  quickNavButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('✅ modelos.js cargado correctamente');
});

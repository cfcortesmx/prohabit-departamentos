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
            link.classList.remove('bg-primary-500', 'text-white');
            link.classList.add('text-slate-700');
          });
          
          // Agregar active al actual
          correspondingLink.classList.add('bg-primary-500', 'text-white');
          correspondingLink.classList.remove('text-slate-700');
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
      
      // Resetear formulario después de 1 segundo
      setTimeout(() => {
        modelosForm.reset();
      }, 1000);
    });
  }

  // ===== LIGHTBOX PARA GALERÍA (opcional) =====
  const galleryImages = document.querySelectorAll('.gallery-image-container img');
  
  galleryImages.forEach(img => {
    img.addEventListener('click', function() {
      // Aquí se puede implementar un lightbox si se requiere
      console.log('Imagen clickeada:', this.alt);
    });
  });

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

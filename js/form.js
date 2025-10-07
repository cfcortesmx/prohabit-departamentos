/**
 * NOVA CONDOMINIUM - Validación y manejo de formularios
 * Implementación con Just Validate y Toastify
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Verificar que Just Validate esté cargado
  if (typeof JustValidate === 'undefined') {
    console.error('Just Validate no está cargado');
    return;
  }

  // Inicializar formulario del hero
  initHeroForm();

  // Inicializar formulario de contacto
  initContactForm();

  // Inicializar nuevo formulario de contacto (sección contacto)
  initContactFormSection();

  // Inicializar formulario de newsletter
  initNewsletterForm();

  // Inicializar formulario de consulta
  initInquiryForm();

  console.log('📝 Formularios inicializados');
});

/**
 * Formulario del Hero
 */
function initHeroForm() {
  const form = document.getElementById('hero-form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'border-red-500',
    errorLabelStyle: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    successFieldCssClass: 'border-green-500',
  });

  validator
    .addField('#hero-name', [
      {
        rule: 'required',
        errorMessage: 'El nombre es obligatorio'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Mínimo 2 caracteres'
      }
    ])
    .addField('#hero-email', [
      {
        rule: 'required',
        errorMessage: 'El email es obligatorio'
      },
      {
        rule: 'email',
        errorMessage: 'Email inválido'
      }
    ])
    .addField('#hero-phone', [
      {
        rule: 'required',
        errorMessage: 'El teléfono es obligatorio'
      },
      {
        validator: (value) => {
          const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          return phoneRegex.test(value);
        },
        errorMessage: 'Teléfono inválido'
      }
    ])
    .addField('#hero-consent', [
      {
        rule: 'required',
        errorMessage: 'Debe aceptar la política de privacidad'
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleHeroFormSubmit(event.target);
    });
}

/**
 * Manejar envío del formulario del hero
 */
async function handleHeroFormSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  form.classList.add('loading');
  
  try {
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Solicitud de información:', data);
    
    showNotification('¡Gracias! Nos comunicaremos contigo pronto.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Error al enviar:', error);
    showNotification('Error al enviar. Por favor intente nuevamente.', 'error');
    
  } finally {
    form.classList.remove('loading');
  }
}

/**
 * Formulario de contacto principal
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'border-red-500',
    errorLabelStyle: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    successFieldCssClass: 'border-green-500',
  });

  validator
    .addField('#contact-name', [
      {
        rule: 'required',
        errorMessage: 'El nombre es obligatorio'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'El nombre debe tener al menos 2 caracteres'
      }
    ])
    .addField('#contact-email', [
      {
        rule: 'required',
        errorMessage: 'El email es obligatorio'
      },
      {
        rule: 'email',
        errorMessage: 'Por favor ingrese un email válido'
      }
    ])
    .addField('#contact-phone', [
      {
        rule: 'required',
        errorMessage: 'El teléfono es obligatorio'
      },
      {
        validator: (value) => {
          const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          return phoneRegex.test(value);
        },
        errorMessage: 'Por favor ingrese un teléfono válido'
      }
    ])
    .addField('#contact-message', [
      {
        rule: 'required',
        errorMessage: 'El mensaje es obligatorio'
      },
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'El mensaje debe tener al menos 10 caracteres'
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleContactSubmit(event.target);
    });
}

/**
 * Manejar envío del formulario de contacto
 */
async function handleContactSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Agregar clase de loading
  form.classList.add('loading');
  
  try {
    // Aquí iría la llamada al backend/API
    // Por ahora simulamos con un timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulación de respuesta exitosa
    console.log('Datos del formulario:', data);
    
    // Mostrar notificación de éxito
    showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.', 'success');
    
    // Resetear formulario
    form.reset();
    
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    showNotification('Hubo un error al enviar el mensaje. Por favor intente nuevamente.', 'error');
    
  } finally {
    form.classList.remove('loading');
  }
}

/**
 * Formulario de newsletter
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'border-red-500',
    successFieldCssClass: 'border-green-500',
  });

  validator
    .addField('#newsletter-email', [
      {
        rule: 'required',
        errorMessage: 'El email es obligatorio'
      },
      {
        rule: 'email',
        errorMessage: 'Por favor ingrese un email válido'
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleNewsletterSubmit(event.target);
    });
}

/**
 * Manejar envío del formulario de newsletter
 */
async function handleNewsletterSubmit(form) {
  const formData = new FormData(form);
  const email = formData.get('email');

  form.classList.add('loading');
  
  try {
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Suscripción newsletter:', email);
    
    showNotification('¡Gracias por suscribirte! Recibirás nuestras novedades.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Error en newsletter:', error);
    showNotification('Error al suscribirse. Por favor intente nuevamente.', 'error');
    
  } finally {
    form.classList.remove('loading');
  }
}

/**
 * Formulario de consulta/inquiry
 */
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'border-red-500',
    successFieldCssClass: 'border-green-500',
  });

  validator
    .addField('#inquiry-name', [
      {
        rule: 'required',
        errorMessage: 'El nombre es obligatorio'
      }
    ])
    .addField('#inquiry-email', [
      {
        rule: 'required',
        errorMessage: 'El email es obligatorio'
      },
      {
        rule: 'email',
        errorMessage: 'Email inválido'
      }
    ])
    .addField('#inquiry-interest', [
      {
        rule: 'required',
        errorMessage: 'Por favor seleccione una opción'
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleInquirySubmit(event.target);
    });
}

/**
 * Manejar envío del formulario de consulta
 */
async function handleInquirySubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  form.classList.add('loading');
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Consulta enviada:', data);
    
    showNotification('¡Consulta enviada! Un asesor se comunicará con usted.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Error en consulta:', error);
    showNotification('Error al enviar consulta. Intente nuevamente.', 'error');
    
  } finally {
    form.classList.remove('loading');
  }
}

/**
 * Validación en tiempo real para inputs específicos
 */
function addRealTimeValidation(inputId, validationFn, errorMessage) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener('blur', function() {
    const isValid = validationFn(this.value);
    
    if (!isValid && this.value) {
      this.classList.add('border-red-500');
      showInputError(this, errorMessage);
    } else {
      this.classList.remove('border-red-500');
      removeInputError(this);
    }
  });
}

/**
 * Mostrar error en input
 */
function showInputError(input, message) {
  removeInputError(input);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  errorDiv.id = `${input.id}-error`;
  
  input.parentNode.appendChild(errorDiv);
}

/**
 * Remover error de input
 */
function removeInputError(input) {
  const existingError = document.getElementById(`${input.id}-error`);
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Formato automático para teléfono
 */
function formatPhoneNumber(input) {
  input.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    
    e.target.value = value;
  });
}

// Aplicar formato de teléfono a los inputs correspondientes
document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => formatPhoneNumber(input));
});

/**
 * Prevenir envío múltiple de formularios
 */
function preventMultipleSubmit(form) {
  let isSubmitting = false;
  
  form.addEventListener('submit', function(e) {
    if (isSubmitting) {
      e.preventDefault();
      return false;
    }
    
    isSubmitting = true;
    
    setTimeout(() => {
      isSubmitting = false;
    }, 3000);
  });
}

// Aplicar prevención a todos los formularios
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => preventMultipleSubmit(form));
});

/**
 * Formulario de contacto en la sección de contacto
 */
function initContactFormSection() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'border-red-500',
    errorLabelStyle: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    successFieldCssClass: 'border-green-500',
  });

  validator
    .addField('#nombre', [
      {
        rule: 'required',
        errorMessage: 'El nombre es obligatorio'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'El nombre debe tener al menos 2 caracteres'
      }
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'El email es obligatorio'
      },
      {
        rule: 'email',
        errorMessage: 'Por favor ingrese un email válido'
      }
    ])
    .addField('#telefono', [
      {
        rule: 'required',
        errorMessage: 'El teléfono es obligatorio'
      },
      {
        validator: (value) => {
          const phoneRegex = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/;
          return phoneRegex.test(value.replace(/\s/g, ''));
        },
        errorMessage: 'Por favor ingrese un teléfono válido'
      }
    ])
    .addField('#mensaje', [
      {
        rule: 'required',
        errorMessage: 'El mensaje es obligatorio'
      },
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'El mensaje debe tener al menos 10 caracteres'
      }
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleContactFormSectionSubmit(event.target);
    });
}

/**
 * Manejar envío del formulario de contacto de la sección
 */
async function handleContactFormSectionSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Obtener modelos de interés seleccionados
  const modelosInteres = [];
  form.querySelectorAll('input[name="modelo"]:checked').forEach(checkbox => {
    modelosInteres.push(checkbox.value);
  });
  data.modelosInteres = modelosInteres;

  // Agregar clase de loading
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
  
  try {
    // Simulación de envío al backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Datos del formulario de contacto:', data);
    
    showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
    form.reset();
    
  } catch (error) {
    console.error('Error al enviar:', error);
    showNotification('Error al enviar el mensaje. Por favor intente nuevamente.', 'error');
    
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

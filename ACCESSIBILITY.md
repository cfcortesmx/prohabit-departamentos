# Guía de Accesibilidad Web (WCAG 2.1)

## Estado de Cumplimiento

Este documento detalla todas las mejoras de accesibilidad implementadas en **Mar
Nuevo Departamentos** para cumplir con las pautas WCAG 2.1 nivel AA.

---

## ✅ Implementaciones Completadas

### 1. **Navegación por Teclado**

#### Skip Navigation Link

- ✅ **Implementado:** Link "Saltar al contenido principal" al inicio del body
- **Comportamiento:**
  - Oculto visualmente pero accesible para lectores de pantalla
  - Visible al recibir foco del teclado (Tab)
  - Enlaza directamente a `#main-content`
- **Ubicación:** Primera línea después de `<body>`
- **Clases:** `sr-only focus:not-sr-only`

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed...">
  Saltar al contenido principal
</a>
```

#### Focus States Visibles

- ✅ Anillos de enfoque en **todos los elementos interactivos**
- **Estilo:** `focus:outline-none focus:ring-2 focus:ring-primary-500`
- **Elementos actualizados:**
  - Links de navegación (desktop y mobile)
  - Botones de menú
  - Botones de formulario
  - Links de redes sociales
  - Controles del carrusel
  - Botones de la galería (lightbox)
  - Botón flotante de WhatsApp

```css
/* Focus visible global */
*:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

---

### 2. **ARIA Labels y Roles**

#### Elementos de Navegación

**Top Bar:**

- ✅ Teléfono: `aria-label="Llamar al teléfono +52 312 100 9988"`
- ✅ Email: `aria-label="Enviar correo a contacto@nuevomar.com"`
- ✅ Facebook: `aria-label="Visitar nuestra página de Facebook"`
- ✅ WhatsApp: `aria-label="Contactar por WhatsApp"`
- ✅ Instagram: `aria-label="Visitar nuestro Instagram"`

**Navbar Principal:**

- ✅ `role="navigation"`
- ✅ `aria-label="Navegación principal"`
- ✅ Logo: `aria-label="Mar Nuevo - Ir al inicio"`

**Mobile Menu:**

- ✅ Botón: `aria-expanded="false"` (dinámico vía JavaScript)
- ✅ Botón: `aria-controls="mobileMenu"`
- ✅ Botón: `aria-label` dinámico ("Abrir/Cerrar menú de navegación")

#### Elementos Interactivos

**Hero Slider:**

- ✅ Contenedor dots: `role="tablist"` +
  `aria-label="Controles del carrusel de imágenes"`
- ✅ Cada dot: `role="tab"` + `aria-selected="true/false"`
- ✅ Labels descriptivos: "Ver imagen 1: Vista al mar", etc.

**Galería Lightbox:**

- ✅ Modal: `role="dialog"` + `aria-modal="true"` +
  `aria-labelledby="lightboxTitle"`
- ✅ Botón cerrar: `aria-label="Cerrar galería de imágenes"`
- ✅ Navegación:
  - `aria-label="Ver imagen anterior"`
  - `aria-label="Ver imagen siguiente"`

**Formulario de Contacto:**

- ✅ Botón enviar: `aria-label="Enviar formulario de contacto"`
- ✅ Todos los campos tienen `<label>` visible asociado
- ✅ Campos requeridos marcados con `<span class="text-red-500">*</span>`

**Botón WhatsApp Flotante:**

- ✅ `aria-label="Contactar por WhatsApp - Chat disponible"`
- ✅ Focus ring: `focus:ring-4 focus:ring-green-400`

---

### 3. **Atributos ARIA para Decorativos**

Todos los iconos decorativos tienen `aria-hidden="true"`:

- ✅ Iconos en botones con texto visible
- ✅ Iconos de Font Awesome
- ✅ Elementos de animación (pulsos, swipe indicators)
- ✅ Spans decorativos

**Ejemplos:**

```html
<i class="fas fa-whatsapp" aria-hidden="true"></i>
<span class="animate-ping" aria-hidden="true"></span>
<div class="swipe-indicator" aria-hidden="true">...</div>
```

---

### 4. **Alt Text Descriptivo**

#### Imágenes del Hero Slider

- ✅ Slide 1: "Mar Nuevo Departamentos - Vista panorámica al Océano Pacífico
  desde departamentos frente al mar en Manzanillo, Colima"
- ✅ Slide 2: "Atardecer espectacular en las playas de Manzanillo - Vista desde
  departamentos Mar Nuevo"
- ✅ Slide 3: "Playa privada Manzanillo Colima - Acceso exclusivo para
  residentes de Mar Nuevo Departamentos"
- ✅ Slide 4: "Interiores de lujo con acabados premium - Departamentos modernos
  Mar Nuevo Manzanillo"

#### Principios del Alt Text

- **Descriptivo:** Describe el contenido y contexto de la imagen
- **Conciso:** No excede 125 caracteres cuando es posible
- **Relevante:** Incluye keywords importantes para SEO y comprensión
- **No redundante:** No repite información del texto visible adyacente

---

### 5. **Formularios Accesibles**

#### Labels Asociados

- ✅ **Todos los inputs tienen `<label>` visible**
- ✅ Labels asociados con `for="id"` correcto
- ✅ Campos requeridos indicados con `*` y texto descriptivo

**Campos:**

```html
<label for="nombre" class="block text-sm font-medium text-slate-700 mb-2">
  Nombre completo <span class="text-red-500">*</span>
</label>
<input type="text" id="nombre" name="nombre" required />
```

#### Validación

- ✅ Atributos HTML5: `required`, `type="email"`, `type="tel"`
- ✅ `inputmode="tel"` para teclados móviles optimizados
- ✅ Mensajes de error con contraste suficiente
- ✅ Focus trap en validación (via Just Validate)

---

### 6. **Semántica y Roles ARIA**

#### Elementos Landmark

- ✅ `<nav role="navigation" aria-label="Navegación principal">`
- ✅ `<main id="main-content" role="main">`
- ✅ Lightbox: `role="dialog" aria-modal="true"`
- ✅ Progress bar:
  `role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"`

#### Estructura de Headings

- ✅ Un solo `<h1>` por página (en hero)
- ✅ Jerarquía lógica: h1 → h2 → h3
- ✅ No se saltan niveles

---

### 7. **Estados Interactivos Dinámicos**

#### Mobile Menu (JavaScript)

```javascript
// Update aria-expanded dynamically
mobileMenuBtn.addEventListener("click", () => {
  const isExpanded = mobileMenu.classList.contains("show");
  mobileMenuBtn.setAttribute("aria-expanded", isExpanded);
  mobileMenuBtn.setAttribute(
    "aria-label",
    isExpanded ? "Cerrar menú de navegación" : "Abrir menú de navegación"
  );
});
```

#### Slider Dots

- `aria-selected="true"` en el dot activo
- `aria-selected="false"` en dots inactivos
- Actualizado dinámicamente via JavaScript

---

## 🎯 Cumplimiento WCAG 2.1

### Nivel A (Cumplido ✅)

- **1.1.1** Contenido no textual: ✅ Alt text en todas las imágenes
- **2.1.1** Teclado: ✅ Toda funcionalidad accesible por teclado
- **2.4.1** Bloques saltables: ✅ Skip navigation link
- **3.1.1** Idioma de la página: ✅ `<html lang="es">`
- **4.1.2** Nombre, función, valor: ✅ ARIA labels en todos los controles

### Nivel AA (Cumplido ✅)

- **1.4.3** Contraste mínimo: ✅ 4.5:1 para texto normal
- **2.4.6** Encabezados y etiquetas: ✅ Headings descriptivos y labels claros
- **2.4.7** Foco visible: ✅ Focus rings en todos los elementos interactivos
- **3.2.4** Identificación consistente: ✅ Elementos similares identificados
  igual
- **4.1.3** Mensajes de estado: ✅ Toasts accesibles con ARIA live regions

---

## 🧪 Testing Recomendado

### Herramientas de Auditoría

1. **axe DevTools** (Chrome/Firefox extension)

   - Scan automático de WCAG
   - Sugerencias de mejora

2. **WAVE** (WebAIM)

   - Evaluación visual de accesibilidad
   - https://wave.webaim.org/

3. **Lighthouse** (Chrome DevTools)

   - Auditoría de accesibilidad integrada
   - Score objetivo: 95+

4. **NVDA / JAWS** (Lectores de pantalla)
   - Pruebas manuales con usuarios reales
   - Navegación completa por teclado

### Testing Manual

#### Navegación por Teclado

1. ✅ Tab: Avanzar por elementos interactivos
2. ✅ Shift+Tab: Retroceder
3. ✅ Enter/Space: Activar botones y links
4. ✅ Esc: Cerrar modales/menús
5. ✅ Flechas: Navegar carruseles (si implementado)

#### Lectores de Pantalla

1. ✅ Todos los links tienen texto descriptivo
2. ✅ Imágenes tienen alt text apropiado
3. ✅ Formularios son navegables y comprensibles
4. ✅ Modales anuncian su apertura/cierre
5. ✅ Estados dinámicos son comunicados

---

## 📋 Checklist de Verificación

### Navegación

- [x] Skip to main content funcional
- [x] Focus visible en todos los elementos
- [x] Orden de tabulación lógico
- [x] Mobile menu con aria-expanded
- [x] Links de redes sociales con aria-labels

### Contenido

- [x] Alt text descriptivo en imágenes
- [x] Headings jerárquicos (h1 → h2 → h3)
- [x] Idioma de página declarado
- [x] Landmarks ARIA correctos

### Formularios

- [x] Labels asociados a inputs
- [x] Campos requeridos indicados
- [x] Validación accesible
- [x] Mensajes de error claros

### Interactividad

- [x] Botones con aria-labels
- [x] Modales con role="dialog"
- [x] Estados dinámicos comunicados
- [x] Iconos decorativos ocultos (aria-hidden)

---

## 🔧 Mantenimiento Futuro

### Al Agregar Nuevo Contenido:

1. **Imágenes:**

   - Siempre incluir `alt` descriptivo
   - Decorativas: `alt=""` + `aria-hidden="true"`

2. **Botones/Links:**

   - Si solo tiene icono: agregar `aria-label`
   - Focus states: `focus:ring-2 focus:ring-primary-500`

3. **Formularios:**

   - Asociar `<label>` con `for="id"`
   - Marcar campos requeridos

4. **Modales/Diálogos:**

   - `role="dialog"` + `aria-modal="true"`
   - Focus trap al abrir
   - Cerrar con Esc

5. **Contenido Dinámico:**
   - Usar `aria-live` para anuncios
   - Actualizar `aria-expanded`, `aria-selected`

---

## 📚 Recursos

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM Articles:** https://webaim.org/articles/
- **MDN Accessibility:**
  https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

**Última actualización:** Octubre 2025  
**Nivel de cumplimiento:** WCAG 2.1 AA ✅  
**Score objetivo Lighthouse:** 95+ en Accessibility

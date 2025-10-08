# Guía de Optimización de Rendimiento

## Estado Actual

### ✅ **Optimizaciones Implementadas:**

#### 1. **Optimización de Recursos CSS**

- ✅ **Preload de fuentes críticas:** Montserrat e Inter se precargan como WOFF2
- ✅ **DNS Prefetch:** Resolución anticipada para fonts.googleapis.com,
  cdnjs.cloudflare.com, unpkg.com
- ✅ **Lazy Loading de CSS no crítico:**
  - AOS CSS: Carga diferida con `preload` + `onload`
  - Toastify CSS: Media query trick (`media="print"`)
  - Font Awesome: Lazy loading (900KB diferidos)
- ✅ **Noscript fallbacks:** Garantiza funcionalidad sin JavaScript

#### 2. **Optimización de Recursos JavaScript** ⚡ NUEVO

- ✅ **Atributo `defer` en todas las bibliotecas:**
  - GSAP + ScrollTrigger
  - AOS
  - Just Validate
  - Toastify
- ✅ **Scripts propios con `defer`:**
  - animations.js
  - parallax.js
  - form.js
  - main.js
- ✅ **Beneficios:**
  - Descarga en paralelo sin bloquear el parser HTML
  - Ejecución en orden correcto (respeta dependencias)
  - Compatible con `DOMContentLoaded` (ya implementado en los scripts)

#### 3. **Documentación de Font Awesome**

- ✅ **35 iconos identificados** de 1,500+ disponibles
- ✅ **Comentarios inline** con lista completa de iconos usados
- ✅ **Preparado para subset:** Reducción potencial de 900KB → 20KB

---

## 📊 Impacto de Rendimiento

### **Antes de Optimizaciones:**

| Recurso         | Tamaño   | Bloquea Render            |
| --------------- | -------- | ------------------------- |
| Tailwind CDN    | ~3MB     | ❌ Sí (JS en `<head>`)    |
| Font Awesome    | ~900KB   | ❌ Sí                     |
| AOS CSS         | ~50KB    | ❌ Sí                     |
| GSAP            | ~150KB   | ❌ Sí (scripts síncronos) |
| Scripts propios | ~30KB    | ❌ Sí                     |
| **TOTAL CSS**   | **~4MB** | **Bloqueo crítico**       |

### **Después de Optimizaciones (Actual):**

| Recurso         | Tamaño                | Bloquea Render                  |
| --------------- | --------------------- | ------------------------------- |
| Tailwind CDN    | ~3MB                  | ⚠️ Parcial (necesario para CDN) |
| Font Awesome    | ~900KB                | ✅ No (lazy loaded)             |
| AOS CSS         | ~50KB                 | ✅ No (preload async)           |
| GSAP            | ~150KB                | ✅ No (defer)                   |
| Scripts propios | ~30KB                 | ✅ No (defer)                   |
| **Mejora**      | **950KB no-blocking** | **~1.1MB diferidos**            |

### **Potencial con Próximos Pasos:**

| Recurso      | Actual  | Optimizado     | Reducción |
| ------------ | ------- | -------------- | --------- |
| Tailwind     | 3MB CDN | 30KB compilado | **99%**   |
| Font Awesome | 900KB   | 20KB subset    | **97%**   |
| **TOTAL**    | **4MB** | **~100KB**     | **97%**   |

---

## ⏳ Próximos Pasos Recomendados

### **1. Compilar Tailwind CSS** ⭐ ALTA PRIORIDAD

**Impacto:** Reducción de 3MB → 30KB (99% menos)

#### Instalación:

```bash
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

#### `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
        },
        accent: {
          500: "#10b981",
          600: "#059669",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
};
```

#### `package.json` - Scripts:

```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./css/input.css -o ./css/tailwind.css --minify",
    "watch:css": "tailwindcss -i ./css/input.css -o ./css/tailwind.css --watch"
  }
}
```

#### `css/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Reemplazar en HTML:

```html
<!-- ANTES -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    /* ... */
  };
</script>

<!-- DESPUÉS -->
<link rel="stylesheet" href="css/tailwind.css" />
```

---

### **2. Crear Subset de Font Awesome** 🎯 MEDIA PRIORIDAD

**Impacto:** Reducción de 900KB → 20KB (97% menos)

#### Iconos Utilizados (35 total):

```
fa-water, fa-gem, fa-map-marked-alt, fa-shield-alt, fa-umbrella-beach,
fa-building, fa-hand-holding-usd, fa-file-signature, fa-check, fa-couch,
fa-utensils, fa-bed, fa-bath, fa-door-open, fa-car, fa-tree, fa-warehouse,
fa-map-marker-alt, fa-phone, fa-whatsapp, fa-facebook-f, fa-instagram,
fa-youtube, fa-certificate, fa-check-circle, fa-hand-pointer,
fa-arrows-alt-h, fa-chevron-left, fa-chevron-right, fa-times,
fa-chevron-down, fa-paper-plane, fa-lock, fa-phone-alt, fa-close
```

#### Opción A: Fontello.com

1. Visita https://fontello.com/
2. Busca y selecciona los 35 iconos
3. Descarga el paquete
4. Reemplaza Font Awesome CDN

#### Opción B: IcoMoon

1. Visita https://icomoon.io/app/
2. Importa Font Awesome y selecciona iconos
3. Genera y descarga fuente
4. Hospeda localmente

#### Opción C: SVG Sprites (Recomendado)

```html
<!-- Crear sprite SVG -->
<svg style="display:none">
  <symbol id="icon-whatsapp" viewBox="0 0 448 512">
    <!-- Path del icono -->
  </symbol>
</svg>

<!-- Uso -->
<svg class="w-6 h-6"><use href="#icon-whatsapp"></use></svg>
```

---

### **3. Self-Host Google Fonts** 🔒 BAJA PRIORIDAD

**Beneficios:**

- Reduce DNS lookups
- Mejor control de caché
- Cumplimiento GDPR

**Herramienta:** https://google-webfonts-helper.herokuapp.com/

1. Selecciona Montserrat + Inter
2. Descarga fuentes
3. Agrega reglas `@font-face` a CSS
4. Elimina link de Google Fonts

---

## 🛠️ Herramientas de Testing

- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **WebPageTest:** https://www.webpagetest.org/
- **Lighthouse:** Chrome DevTools (F12 → Lighthouse)
- **GTmetrix:** https://gtmetrix.com/

---

## 📋 Prioridad de Implementación

1. **🔥 ALTA:** Compilar Tailwind CSS (mayor impacto)
2. **⭐ MEDIA:** Subset de Font Awesome o SVG sprites
3. **💡 BAJA:** Self-host fonts (impacto mínimo)

---

## 🚀 Comandos de Referencia Rápida

```bash
# Compilar Tailwind para producción
npm run build:css

# Modo watch para desarrollo
npm run watch:css

# Build con minificación manual
npx tailwindcss -i ./css/input.css -o ./css/tailwind.css --minify

# Ver tamaño del bundle
du -h css/tailwind.css
```

---

## 📈 Métricas Clave a Monitorear

| Métrica                            | Objetivo | Actual               |
| ---------------------------------- | -------- | -------------------- |
| **LCP (Largest Contentful Paint)** | < 2.5s   | Medir                |
| **FID (First Input Delay)**        | < 100ms  | Medir                |
| **CLS (Cumulative Layout Shift)**  | < 0.1    | Medir                |
| **Time to Interactive**            | < 3.8s   | Medir                |
| **Total Blocking Time**            | < 200ms  | Mejorado con `defer` |

---

## ✨ Resumen de Optimizaciones Actuales

### **CSS:**

- ✅ Preload de fuentes críticas
- ✅ Lazy loading de Font Awesome (900KB)
- ✅ Lazy loading de AOS y Toastify
- ✅ DNS prefetch para CDNs

### **JavaScript:**

- ✅ `defer` en todas las bibliotecas externas
- ✅ `defer` en scripts propios
- ✅ Descarga paralela sin bloqueo
- ✅ Ejecución ordenada garantizada

### **Próximos Pasos:**

- ⏳ Compilar Tailwind (3MB → 30KB)
- ⏳ Crear subset Font Awesome (900KB → 20KB)
- ⏳ Optional: Self-host fonts

---

**Última actualización:** Diciembre 2024  
**Reducción potencial total:** 4MB → 100KB (97%)  
**Estado:** Optimizaciones base implementadas ✅

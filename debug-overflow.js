/**
 * SCRIPT DE DIAGNÓSTICO PARA OVERFLOW HORIZONTAL
 * 
 * CÓMO USAR:
 * 1. Abre la página en tu celular o en Chrome DevTools modo mobile
 * 2. Abre la consola (3 puntos verticales > Más herramientas > Herramientas de desarrollador)
 * 3. Ve a la pestaña "Console"
 * 4. Copia y pega todo este código
 * 5. Presiona Enter
 * 6. Revisa los resultados que te mostrará
 */

console.clear();
console.log('%c🔍 DIAGNÓSTICO DE OVERFLOW HORIZONTAL', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');
console.log('═══════════════════════════════════════════════════════════\n');

// 1. Información del viewport
const viewportWidth = window.innerWidth;
const documentWidth = document.documentElement.scrollWidth;
const bodyWidth = document.body.scrollWidth;

console.log('%c📏 DIMENSIONES DEL VIEWPORT:', 'font-weight: bold; color: #10b981;');
console.log(`   Viewport width: ${viewportWidth}px`);
console.log(`   Document scrollWidth: ${documentWidth}px`);
console.log(`   Body scrollWidth: ${bodyWidth}px`);
console.log(`   Overflow detectado: ${documentWidth > viewportWidth ? '❌ SÍ' : '✅ NO'}`);
console.log(`   Exceso: ${Math.max(0, documentWidth - viewportWidth)}px\n`);

// 2. Encontrar elementos que exceden el viewport
console.log('%c🎯 ELEMENTOS QUE EXCEDEN EL VIEWPORT:', 'font-weight: bold; color: #f59e0b;');

const allElements = document.querySelectorAll('*');
const overflowingElements = [];

allElements.forEach(el => {
  const rect = el.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(el);
  
  // Verificar si el elemento se extiende más allá del viewport
  if (rect.right > viewportWidth || rect.left < 0) {
    const overflow = Math.max(
      rect.right - viewportWidth,
      Math.abs(Math.min(0, rect.left))
    );
    
    if (overflow > 0) {
      overflowingElements.push({
        element: el,
        tagName: el.tagName,
        id: el.id || '(sin id)',
        classes: el.className || '(sin clases)',
        width: rect.width,
        left: rect.left,
        right: rect.right,
        overflow: overflow,
        computedWidth: computedStyle.width,
        boxSizing: computedStyle.boxSizing,
        paddingLeft: computedStyle.paddingLeft,
        paddingRight: computedStyle.paddingRight,
        marginLeft: computedStyle.marginLeft,
        marginRight: computedStyle.marginRight
      });
    }
  }
});

// Ordenar por cantidad de overflow (mayor a menor)
overflowingElements.sort((a, b) => b.overflow - a.overflow);

if (overflowingElements.length === 0) {
  console.log('   ✅ No se encontraron elementos que excedan el viewport');
} else {
  console.log(`   ❌ Encontrados ${overflowingElements.length} elementos problemáticos:\n`);
  
  overflowingElements.slice(0, 10).forEach((item, index) => {
    console.log(`   ${index + 1}. <${item.tagName}>${item.id !== '(sin id)' ? ` id="${item.id}"` : ''}`);
    console.log(`      📊 Width: ${item.width.toFixed(2)}px (computed: ${item.computedWidth})`);
    console.log(`      📍 Left: ${item.left.toFixed(2)}px, Right: ${item.right.toFixed(2)}px`);
    console.log(`      ⚠️  Overflow: ${item.overflow.toFixed(2)}px más allá del viewport`);
    console.log(`      📦 Box-sizing: ${item.boxSizing}`);
    console.log(`      🔲 Padding: ${item.paddingLeft} (izq) + ${item.paddingRight} (der)`);
    console.log(`      ↔️  Margin: ${item.marginLeft} (izq) + ${item.marginRight} (der)`);
    console.log(`      🏷️  Classes: ${item.classes}`);
    console.log('');
  });
}

// 3. Análisis específico del navbar
console.log('\n%c🧭 ANÁLISIS ESPECÍFICO DEL NAVBAR:', 'font-weight: bold; color: #ef4444;');

const navbar = document.getElementById('navbar');
if (navbar) {
  const navbarRect = navbar.getBoundingClientRect();
  const navbarStyle = window.getComputedStyle(navbar);
  
  console.log(`   Width: ${navbarRect.width.toFixed(2)}px (computed: ${navbarStyle.width})`);
  console.log(`   Left: ${navbarRect.left.toFixed(2)}px`);
  console.log(`   Right: ${navbarRect.right.toFixed(2)}px`);
  console.log(`   Viewport: ${viewportWidth}px`);
  console.log(`   ¿Excede viewport? ${navbarRect.right > viewportWidth ? '❌ SÍ' : '✅ NO'}`);
  if (navbarRect.right > viewportWidth) {
    console.log(`   Exceso: ${(navbarRect.right - viewportWidth).toFixed(2)}px`);
  }
  console.log(`   Box-sizing: ${navbarStyle.boxSizing}`);
  console.log(`   Position: ${navbarStyle.position}`);
  console.log(`   Padding: ${navbarStyle.paddingLeft} (izq) + ${navbarStyle.paddingRight} (der)`);
  console.log(`   Margin: ${navbarStyle.marginLeft} (izq) + ${navbarStyle.marginRight} (der)`);
  
  // Análisis de hijos directos del navbar
  console.log('\n   📦 HIJOS DIRECTOS DEL NAVBAR:');
  const navbarChildren = navbar.children;
  for (let i = 0; i < navbarChildren.length; i++) {
    const child = navbarChildren[i];
    const childRect = child.getBoundingClientRect();
    const childStyle = window.getComputedStyle(child);
    
    console.log(`   ${i + 1}. <${child.tagName}>${child.id ? ` id="${child.id}"` : ''}`);
    console.log(`      Width: ${childRect.width.toFixed(2)}px (computed: ${childStyle.width})`);
    console.log(`      Padding: ${childStyle.paddingLeft} (izq) + ${childStyle.paddingRight} (der)`);
    console.log(`      Classes: ${child.className}`);
    
    // Analizar nietos (elementos dentro de navbarContent)
    if (child.id === 'navbarContent') {
      console.log('      \n      🔍 ELEMENTOS DENTRO DE navbarContent:');
      const grandchildren = child.children;
      for (let j = 0; j < grandchildren.length; j++) {
        const grandchild = grandchildren[j];
        const gcRect = grandchild.getBoundingClientRect();
        const gcStyle = window.getComputedStyle(grandchild);
        
        console.log(`         ${j + 1}. <${grandchild.tagName}>${grandchild.id ? ` id="${grandchild.id}"` : ''}`);
        console.log(`            Width: ${gcRect.width.toFixed(2)}px`);
        console.log(`            Flex-shrink: ${gcStyle.flexShrink}`);
        console.log(`            Classes: ${grandchild.className}`);
        
        // Si es el logo o los botones, analizar aún más profundo
        if (grandchild.children.length > 0) {
          const totalChildWidth = Array.from(grandchild.children).reduce((sum, c) => {
            return sum + c.getBoundingClientRect().width;
          }, 0);
          const gap = parseFloat(gcStyle.gap) || 0;
          const expectedWidth = totalChildWidth + (gap * (grandchild.children.length - 1));
          console.log(`            Suma de hijos: ${totalChildWidth.toFixed(2)}px`);
          console.log(`            Gap: ${gap}px`);
          console.log(`            Width esperado: ${expectedWidth.toFixed(2)}px`);
          console.log(`            Width real: ${gcRect.width.toFixed(2)}px`);
          console.log(`            Diferencia: ${(gcRect.width - expectedWidth).toFixed(2)}px`);
        }
      }
    }
  }
} else {
  console.log('   ❌ No se encontró el elemento #navbar');
}

// 4. Recomendaciones
console.log('\n%c💡 RECOMENDACIONES:', 'font-weight: bold; color: #8b5cf6;');

if (overflowingElements.length > 0) {
  const mainCulprit = overflowingElements[0];
  console.log(`   🎯 Principal culpable: <${mainCulprit.tagName}> ${mainCulprit.id !== '(sin id)' ? `id="${mainCulprit.id}"` : ''}`);
  console.log(`      con ${mainCulprit.overflow.toFixed(2)}px de overflow`);
  console.log('\n   📝 Posibles soluciones:');
  
  if (mainCulprit.boxSizing !== 'border-box') {
    console.log('      1. Agregar box-sizing: border-box; al elemento');
  }
  
  if (parseFloat(mainCulprit.paddingLeft) > 0 || parseFloat(mainCulprit.paddingRight) > 0) {
    console.log('      2. Reducir el padding lateral');
  }
  
  if (parseFloat(mainCulprit.marginLeft) !== 0 || parseFloat(mainCulprit.marginRight) !== 0) {
    console.log('      3. Eliminar margins laterales');
  }
  
  console.log('      4. Aplicar max-width: 100vw; al elemento');
  console.log('      5. Usar width: 100%; en lugar de dimensiones fijas');
  
} else {
  console.log('   ✅ No se detectó overflow. El problema puede ser:');
  console.log('      - Específico del dispositivo real vs emulación');
  console.log('      - Causado por animaciones/transiciones');
  console.log('      - Relacionado con el zoom del navegador');
  console.log('      - Pseudo-elementos (::before, ::after) no detectables con JS');
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('%c✅ DIAGNÓSTICO COMPLETO', 'font-size: 16px; font-weight: bold; color: #10b981;');
console.log('\n💾 Puedes hacer screenshot de estos resultados para compartir');

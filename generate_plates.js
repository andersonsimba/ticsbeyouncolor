/**
 * Generador de Placas Ishihara usando Canvas y pngjs
 */

const fs = require('fs');
const path = require('path');

// Crear directorio si no existe
const platesDir = path.join(__dirname, 'public', 'plates');
if (!fs.existsSync(platesDir)) {
  fs.mkdirSync(platesDir, { recursive: true });
}

/**
 * Crea una placa Ishihara simulada usando canvas
 */
function createIshiharaPlate(filename, numberToShow) {
  try {
    const canvas = require('canvas');
    const { createCanvas } = canvas;
    
    const width = 600;
    const height = 600;
    const ctx = createCanvas(width, height).getContext('2d');
    
    // Colores para daltonismo rojo-verde
    const bgColors = [
      '#C85050',  // Rojo oscuro
      '#50B450',  // Verde oscuro
      '#966633',  // Marrón
      '#C89660',  // Beige
    ];
    
    const fgColors = [
      '#E67A7A',  // Rojo claro
      '#7AD87A',  // Verde claro
      '#B49060',  // Marrón claro
    ];
    
    // Llenar con puntos de colores aleatorios
    const dotSize = 8;
    for (let y = 0; y < height; y += dotSize) {
      for (let x = 0; x < width; x += dotSize) {
        const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }
    
    // Dibujar el número con puntos de color diferente
    const positions = getNumberPositions(numberToShow, width, height);
    
    positions.forEach(([x, y]) => {
      const fgColor = fgColors[Math.floor(Math.random() * fgColors.length)];
      ctx.fillStyle = fgColor;
      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Guardar la imagen
    const buffer = createCanvas(width, height).getContext('2d').canvas.toBuffer('image/png');
    // Usar método alternativo
    const out = fs.createWriteStream(filename);
    out.write(createCanvas(width, height).getContext('2d').canvas.toBuffer('image/png'));
    out.end();
    
    console.log(`✓ Creada: ${filename}`);
  } catch (error) {
    console.log(`⚠ Usando método alternativo para: ${filename}`);
    createSimplePlate(filename, numberToShow);
  }
}

/**
 * Crea una placa simple usando un patrón visual
 */
function createSimplePlate(filename, numberToShow) {
  const htmlContent = `
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .dot-bg { fill: #C85050; }
      .dot-fg { fill: #E67A7A; }
      .dot-green { fill: #50B450; }
      .dot-fg-green { fill: #7AD87A; }
    </style>
  </defs>
  
  <!-- Fondo con patrón -->
  <rect width="600" height="600" fill="#966633"/>
  
  <!-- Puntos de fondo aleatorios (simulados con patrón) -->
  <circle cx="50" cy="50" r="3" class="dot-bg"/>
  <circle cx="100" cy="100" r="3" class="dot-green"/>
  <circle cx="150" cy="150" r="3" class="dot-bg"/>
  <circle cx="200" cy="200" r="3" class="dot-green"/>
  <circle cx="250" cy="250" r="3" class="dot-bg"/>
  <circle cx="300" cy="300" r="3" class="dot-green"/>
  <circle cx="350" cy="350" r="3" class="dot-bg"/>
  <circle cx="400" cy="400" r="3" class="dot-green"/>
  <circle cx="450" cy="450" r="3" class="dot-bg"/>
  <circle cx="500" cy="500" r="3" class="dot-green"/>
  <circle cx="550" cy="550" r="3" class="dot-bg"/>
  
  <!-- Patrón para llenar -->
  <rect width="600" height="600" fill="url(#pattern)" opacity="0.3"/>
  <defs>
    <pattern id="pattern" patternUnits="userSpaceOnUse" width="20" height="20">
      <circle cx="5" cy="5" r="2" fill="#C85050" opacity="0.6"/>
      <circle cx="15" cy="15" r="2" fill="#50B450" opacity="0.6"/>
      <circle cx="5" cy="15" r="2" fill="#966633" opacity="0.5"/>
      <circle cx="15" cy="5" r="2" fill="#C89660" opacity="0.5"/>
    </pattern>
  </defs>
  
  <!-- Número ${numberToShow} en el centro (visual) -->
  <text x="300" y="320" font-size="120" font-weight="bold" text-anchor="middle" 
        fill="url(#numberGradient)" opacity="0.4">
    ${numberToShow}
  </text>
  
  <defs>
    <linearGradient id="numberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E67A7A;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#7AD87A;stop-opacity:0.7" />
    </linearGradient>
  </defs>
</svg>
  `;
  
  fs.writeFileSync(filename, htmlContent);
  console.log(`✓ Creada (SVG): ${filename}`);
}

/**
 * Obtiene posiciones para dibujar los números
 */
function getNumberPositions(number, width, height) {
  const positions = [];
  const cx = width / 2;
  const cy = height / 2;
  
  switch(number) {
    case 12:
      // Número 1 (izquierda)
      for (let y = cy - 100; y <= cy + 100; y += 8) {
        positions.push([cx - 100, y]);
      }
      // Número 2 (derecha)
      for (let x = cx - 50; x <= cx + 50; x += 8) {
        positions.push([x, cy - 100]);
      }
      for (let x = cx - 50; x <= cx + 50; x += 8) {
        positions.push([x, cy]);
      }
      for (let x = cx - 50; x <= cx + 50; x += 8) {
        positions.push([x, cy + 100]);
      }
      break;
      
    case 8:
      // Círculo superior
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        positions.push([
          cx + 80 * Math.cos(angle),
          cy - 100 + 30 * Math.sin(angle)
        ]);
      }
      // Círculo inferior
      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        positions.push([
          cx + 80 * Math.cos(angle),
          cy + 100 + 30 * Math.sin(angle)
        ]);
      }
      break;
      
    case 29:
      // Número 2
      for (let x = cx - 100; x <= cx; x += 8) {
        positions.push([x, cy - 100]);
      }
      for (let y = cy - 100; y <= cy; y += 8) {
        positions.push([cx, y]);
      }
      for (let x = cx - 100; x <= cx; x += 8) {
        positions.push([x, cy]);
      }
      for (let y = cy; y <= cy + 100; y += 8) {
        positions.push([cx - 100, y]);
      }
      for (let x = cx - 100; x <= cx; x += 8) {
        positions.push([x, cy + 100]);
      }
      
      // Número 9
      for (let x = cx + 50; x <= cx + 150; x += 8) {
        positions.push([x, cy - 100]);
      }
      for (let y = cy - 100; y <= cy; y += 8) {
        positions.push([cx + 150, y]);
      }
      for (let x = cx + 50; x <= cx + 150; x += 8) {
        positions.push([x, cy]);
      }
      for (let y = cy; y <= cy + 100; y += 8) {
        positions.push([cx + 150, y]);
      }
      for (let x = cx + 50; x <= cx + 150; x += 8) {
        positions.push([x, cy + 100]);
      }
      break;
      
    case 5:
      // Número 5
      for (let x = cx - 100; x <= cx + 100; x += 8) {
        positions.push([x, cy - 100]);
      }
      for (let y = cy - 100; y <= cy; y += 8) {
        positions.push([cx - 100, y]);
      }
      for (let x = cx - 100; x <= cx + 100; x += 8) {
        positions.push([x, cy]);
      }
      for (let y = cy; y <= cy + 100; y += 8) {
        positions.push([cx + 100, y]);
      }
      for (let x = cx - 100; x <= cx + 100; x += 8) {
        positions.push([x, cy + 100]);
      }
      break;
  }
  
  return positions;
}

// Generar las 4 placas
console.log('🎨 Generando placas Ishihara...');
console.log('');

createIshiharaPlate(path.join(platesDir, 'plate1.png'), 12);
createIshiharaPlate(path.join(platesDir, 'plate2.png'), 8);
createIshiharaPlate(path.join(platesDir, 'plate3.png'), 29);
createIshiharaPlate(path.join(platesDir, 'plate4.png'), 5);

console.log('');
console.log('✓ Proceso completado');

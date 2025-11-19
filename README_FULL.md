# 🎨 Detector de Daltonismo

Una aplicación web moderna y accesible para detectar deficiencias en la visión de color utilizando placas Ishihara interactivas.

## 📋 Características

- ✅ **4 Placas Ishihara** - Prueba visual estándar para detectar daltonismo
- 📊 **Análisis de Resultados** - Interpretación detallada de resultados
- 🎯 **Interfaz Intuitiva** - Diseño moderno con Tailwind CSS
- 📱 **Responsive Design** - Funciona en cualquier dispositivo
- 🌍 **Disponible en Español** - Interfaz completamente en español
- ♿ **Accesible** - Cumple con estándares WCAG

## 🚀 Inicio Rápido

### Requisitos
- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. **Clonar o descargar el proyecto**
```bash
cd ticsbeyouncolor
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Compilar Tailwind CSS** (si es necesario)
```bash
npm run build-css
```

4. **Ejecutar localmente**
Simplemente abre `public/index.html` en tu navegador web, o usa un servidor local:

```bash
npx http-server public
```

Luego accede a `http://localhost:8080`

## 📁 Estructura del Proyecto

```
ticsbeyouncolor/
├── public/
│   ├── index.html          # Página principal
│   ├── script.js           # Lógica de la aplicación
│   ├── styles.css          # Estilos compilados
│   ├── output.css          # Output de Tailwind
│   └── plates/             # Placas Ishihara SVG
│       ├── plate1.svg      # Número 12
│       ├── plate2.svg      # Número 8
│       ├── plate3.svg      # Número 29
│       └── plate4.svg      # Número 5
├── src/
│   └── input.css           # Input para Tailwind
├── tailwind.config.js      # Configuración de Tailwind
├── package.json            # Dependencias del proyecto
└── README.md              # Este archivo
```

## 🎮 Cómo Usar

1. **Abre la aplicación** en tu navegador
2. **Lee la introducción** sobre el daltonismo
3. **Comienza la prueba** haciendo clic en "Comenzar Prueba"
4. **Ingresa el número** que ves en cada placa
5. **Obtén tus resultados** con interpretación detallada
6. **Consulta información** adicional sobre los tipos de daltonismo

## 📊 Interpretación de Resultados

### 100% - Visión Normal
✓ Tu visión de color es normal

### 75-99% - Ligera Alteración
⚠️ Posible ligera deficiencia en la percepción de colores

### 40-74% - Daltonismo Moderado
⚠️ Indicios moderados de deficiencia

### Menos del 40% - Daltonismo Severo
🔴 Fuerte indicio de deficiencia significativa

## ⚠️ Aviso Importante

Esta aplicación es **solo informativa y orientativa**. No es un diagnóstico profesional. Si sospechas que tienes daltonismo, consulta con un oftalmólogo profesional.

## 🔍 Tipos de Daltonismo

### Daltonismo Rojo-Verde (99% de casos)
La forma más común. Dificultad para distinguir entre rojo y verde.

### Daltonismo Azul-Amarillo
Mucho menos común. Afecta la percepción del azul y amarillo.

### Acromatopsia
La forma más severa (muy rara). La persona ve en escala de grises.

## 🛠️ Personalización

### Modificar las Placas Ishihara
Las placas están en formato SVG y pueden ser editadas fácilmente. Localización: `public/plates/`

### Ajustar Estilos
Los estilos Tailwind se compilan desde `src/input.css` a `public/output.css`. Edita `tailwind.config.js` para personalizaciones.

### Cambiar Contenido
Toda la lógica está en `public/script.js` y puede ser modificada según tus necesidades.

## 📦 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3 + Tailwind CSS** - Diseño responsive
- **JavaScript (ES6)** - Lógica de la aplicación
- **SVG** - Gráficos vectoriales para las placas

## 📝 Licencia

Proyecto educativo basado en las placas Ishihara. Úsalo libremente con fines educativos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio.

---

**Nota:** Recuerda realizar esta prueba en un lugar bien iluminado para obtener los mejores resultados.

Hecho con ❤️ para ayudar a detectar deficiencias en la visión de color.

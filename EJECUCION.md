# 🚀 Guía de Ejecución - BEYOUND COLOR

## Requisitos
- ✅ Navegador web moderno (Chrome, Firefox, Edge, Safari)
- ✅ Acceso a los archivos del proyecto

## Opción 1: Ejecución Directa (Más Fácil)

1. **Navega a la carpeta del proyecto**
   ```
   C:\Users\maria\OneDrive\Desktop\BeyonColor\ticsbeyouncolor
   ```

2. **Abre `public/index.html` directamente en tu navegador**
   - Haz doble clic en `index.html`
   - O arrastra el archivo a tu navegador

3. ¡La aplicación está lista! 🎉

---

## Opción 2: Con Servidor Local (Recomendado)

Si usas Node.js instalado:

```powershell
# Navega a la carpeta
cd "C:\Users\maria\OneDrive\Desktop\BeyonColor\ticsbeyouncolor"

# Inicia servidor (requiere Node.js)
npx http-server public

# Accede en navegador
http://localhost:8080
```

---

## Opción 3: Python (Si tienes Python)

```powershell
# Navega a public
cd "C:\Users\maria\OneDrive\Desktop\BeyonColor\ticsbeyouncolor\public"

# Python 3
python -m http.server 8000

# O Python 2
python -m SimpleHTTPServer 8000

# Accede en navegador
http://localhost:8000
```

---

## 🎮 Cómo Usar la Aplicación

### Paso 1: Pantalla de Inicio
- Ingresa tu nombre completo
- Haz clic en "Iniciar Test"
- O accede al panel de administrador con contraseña `admin123`

### Paso 2: Test de Visión
- Se mostrará una placa Ishihara
- Lee la pista (hint) para orientarte
- Ingresa el número que ves
- Presiona "Siguiente" o Enter
- Recibirás feedback inmediato (✓ correcto / ✗ incorrecto)

### Paso 3: Resultados
- Verás tu puntuación total
- Diagnóstico detallado según tu porcentaje
- Opciones para:
  - **Guardar Resultado**: Almacena en localStorage
  - **Ver Panel de Control**: Muestra estadísticas
  - **Exportar PDF**: Descarga un informe

### Paso 4: Panel de Estadísticas
- Historial de pruebas
- Gráfico de progreso
- Datos por usuario
- Opciones para exportar y borrar datos

---

## 📊 Interpretación de Resultados

| Puntuación | Diagnóstico | Acción |
|-----------|-------------|--------|
| 90%+ | ✓ Visión normal | Sin acción necesaria |
| 70-89% | ⚠ Ligera deficiencia | Monitorear |
| 50-69% | ⚠⚠ Deficiencia moderada | Consultar oftalmólogo |
| <50% | 🔴 Deficiencia severa | Consulta urgente |

---

## 🔑 Credenciales Admin

- **Usuario**: Administrador
- **Contraseña**: `admin123`
- **Acciones**: Exportar CSV, ver todos los datos

⚠️ **IMPORTANTE**: Cambiar la contraseña en producción editando `public/script.js` línea 24

---

## 🐛 Solución de Problemas

### "No se cargan las imágenes"
- ✅ Verifica que `img/ishihara_*.jpeg` existan
- ✅ Comprueba que estés usando la opción de servidor local

### "El archivo no responde"
- ✅ Recarga la página (Ctrl+F5 en Windows)
- ✅ Limpia caché del navegador (Ctrl+Shift+Del)
- ✅ Prueba otro navegador

### "localStorage no funciona"
- ✅ Desactiva navegación privada/incógnito
- ✅ Revisa configuración de cookies en navegador

### "PDF no se descarga"
- ✅ Desactiva bloqueador de popups para este sitio
- ✅ Verifica permisos de descarga

---

## 📁 Estructura de Archivos

```
public/
├── index.html          ← Abrir este archivo
├── script.js           ← Lógica de la app
├── styles.css          ← Estilos
├── output.css          ← Tailwind (opcional)
└── img/
    ├── ishihara_*.jpeg ← Placas de prueba
    └── logo.png        ← Logo del proyecto
```

---

## 💡 Tips

✨ **Realiza la prueba en un lugar bien iluminado**
✨ **Evita luz reflejada en la pantalla**
✨ **Mantén distancia normal de lectura**
✨ **Los resultados son indicativos, no diagnósticos**
✨ **Consulta a un oftalmólogo ante cualquier duda**

---

## 📞 Soporte

Para reportar problemas:
1. Abre la consola del navegador (F12)
2. Copia los errores que aparezcan
3. Verifica que todos los archivos estén presentes
4. Intenta en otro navegador

---

**Estado**: ✅ LISTA PARA USAR


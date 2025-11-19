"""
Generador de Placas Ishihara para Detector de Daltonismo
Crea 4 placas de prueba para detectar daltonismo
"""

from PIL import Image, ImageDraw
import random
import math

def create_ishihara_plate(filename, number_to_show, width=500, height=500):
    """
    Crea una placa Ishihara simulada
    """
    # Crear imagen con fondo
    img = Image.new('RGB', (width, height), color=(200, 150, 100))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Paleta de colores para daltonismo rojo-verde
    colors_normal = [
        (200, 80, 80),      # Rojo
        (80, 180, 80),      # Verde
        (150, 120, 90),     # Fondo base
        (200, 150, 100),    # Beige
    ]
    
    # Colores más claros para la placa
    colors_visible = [
        (230, 120, 120),    # Rojo más claro
        (120, 200, 120),    # Verde más claro
        (180, 150, 120),    # Fondo
    ]
    
    # Llenar con puntos de colores aleatorios
    dot_size = 8
    for x in range(0, width, dot_size):
        for y in range(0, height, dot_size):
            # Color de fondo aleatorio
            color = random.choice(colors_normal)
            draw.ellipse(
                [x, y, x + dot_size, y + dot_size],
                fill=color
            )
    
    # Dibujar el número con puntos de color diferente
    font_size = 80
    number_str = str(number_to_show)
    
    # Puntos para formar el número (posiciones aproximadas)
    if number_to_show == 12:
        positions = draw_number_12(width, height, font_size)
    elif number_to_show == 8:
        positions = draw_number_8(width, height, font_size)
    elif number_to_show == 29:
        positions = draw_number_29(width, height, font_size)
    elif number_to_show == 5:
        positions = draw_number_5(width, height, font_size)
    else:
        positions = []
    
    # Dibujar los puntos del número
    for x, y in positions:
        color = random.choice(colors_visible)
        draw.ellipse(
            [x - dot_size//2, y - dot_size//2, x + dot_size//2, y + dot_size//2],
            fill=color
        )
    
    img.save(filename)
    print(f"✓ Creada: {filename}")

def draw_number_12(w, h, size):
    """Posiciones para el número 12"""
    points = []
    # Número 1 (lado izquierdo)
    for y in range(h//4, 3*h//4, 10):
        points.append((w//3, y))
    # Número 2 (lado derecho)
    for x in range(w//3, 2*w//3, 10):
        points.append((x, h//4))
    for x in range(w//3, 2*w//3, 10):
        points.append((x, h//2))
    for x in range(w//3, 2*w//3, 10):
        points.append((x, 3*h//4))
    for y in range(h//4, h//2, 10):
        points.append((2*w//3, y))
    return points

def draw_number_8(w, h, size):
    """Posiciones para el número 8"""
    points = []
    center_x, center_y = w//2, h//2
    radius = 80
    # Dos círculos
    for angle in range(0, 360, 5):
        rad = math.radians(angle)
        x = center_x + radius * math.cos(rad)
        y = center_y - radius * math.sin(rad) // 2
        points.append((int(x), int(y)))
        x = center_x + radius * math.cos(rad)
        y = center_y + radius * math.sin(rad) // 2
        points.append((int(x), int(y)))
    return points

def draw_number_29(w, h, size):
    """Posiciones para el número 29"""
    points = []
    # Número 2
    for x in range(w//4, w//2, 10):
        points.append((x, h//4))
    for y in range(h//4, h//2, 10):
        points.append((w//2, y))
    for x in range(w//4, w//2, 10):
        points.append((x, h//2))
    for y in range(h//2, 3*h//4, 10):
        points.append((w//4, y))
    for x in range(w//4, w//2, 10):
        points.append((x, 3*h//4))
    # Número 9
    for x in range(w//2, 3*w//4, 10):
        points.append((x, h//4))
    for y in range(h//4, h//2, 10):
        points.append((3*w//4, y))
    for x in range(w//2, 3*w//4, 10):
        points.append((x, h//2))
    for y in range(h//2, 3*h//4, 10):
        points.append((3*w//4, y))
    for x in range(w//2, 3*w//4, 10):
        points.append((x, 3*h//4))
    return points

def draw_number_5(w, h, size):
    """Posiciones para el número 5"""
    points = []
    # Número 5
    for x in range(w//4, 3*w//4, 10):
        points.append((x, h//4))
    for y in range(h//4, h//2, 10):
        points.append((w//4, y))
    for x in range(w//4, 3*w//4, 10):
        points.append((x, h//2))
    for y in range(h//2, 3*h//4, 10):
        points.append((3*w//4, y))
    for x in range(w//4, 3*w//4, 10):
        points.append((x, 3*h//4))
    return points

# Crear las 4 placas
print("🎨 Generando placas Ishihara...")
print()

create_ishihara_plate(
    "public/plates/plate1.png",
    12,
    width=600,
    height=600
)

create_ishihara_plate(
    "public/plates/plate2.png",
    8,
    width=600,
    height=600
)

create_ishihara_plate(
    "public/plates/plate3.png",
    29,
    width=600,
    height=600
)

create_ishihara_plate(
    "public/plates/plate4.png",
    5,
    width=600,
    height=600
)

print()
print("✓ Todas las placas han sido generadas exitosamente")
print("Ubicación: public/plates/")

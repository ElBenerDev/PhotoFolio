import os
import json
from pathlib import Path

def create_image_index(directory):
    # Extensiones de imagen permitidas
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
    
    # Obtener todos los archivos de imagen en el directorio
    images = []
    for file in os.listdir(directory):
        if any(file.lower().endswith(ext) for ext in image_extensions):
            images.append(file)
    
    # Crear el archivo index.json
    index_path = os.path.join(directory, 'index.json')
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump({'images': sorted(images)}, f, indent=2)

def main():
    # Rutas de las carpetas de imágenes
    base_path = Path('assets/img/gallery')
    public_path = base_path / 'public'
    premium_path = base_path / 'premium'
    
    # Crear índices para ambas carpetas
    for path in [public_path, premium_path]:
        if path.exists():
            create_image_index(str(path))
            print(f'Created index.json in {path}')

if __name__ == '__main__':
    main()
    
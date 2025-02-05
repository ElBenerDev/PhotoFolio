document.addEventListener('DOMContentLoaded', function() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    
    // Array con los nombres de las imágenes
    const imageNames = [
        'gallery-1.jpg',
        'gallery-2.jpg',
        'gallery-3.jpg',
        'gallery-4.jpg',
        'gallery-5.jpg',
        'gallery-6.jpg',
        'gallery-7.jpg',
        'gallery-8.jpg'
    ];

    // Cargar cada imagen
    imageNames.forEach((imageName, index) => {
        const imageRef = storageRef.child(`gallery/${imageName}`);
        const imgElement = document.querySelector(`.gallery-item:nth-child(${index + 1}) img`);
        
        if (imgElement) {
            imageRef.getDownloadURL()
                .then((url) => {
                    imgElement.src = url;
                    console.log(`Imagen ${imageName} cargada correctamente`);
                })
                .catch((error) => {
                    console.error(`Error cargando ${imageName}:`, error);
                    imgElement.alt = 'Error cargando imagen';
                    imgElement.style.backgroundColor = '#333';
                });
        }
    });
});
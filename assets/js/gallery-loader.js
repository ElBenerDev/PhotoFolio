class GalleryLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.basePath = 'assets/img/gallery/';
        this.publicPath = this.basePath + 'public/';
        this.premiumPath = this.basePath + 'premium/';
        this.loadGallery();
    }

    createGalleryItem(imagePath, isPremium = false) {
        const col = document.createElement('div');
        col.className = 'col-xl-3 col-lg-4 col-md-6';
        
        const premiumClass = isPremium ? 'premium-content' : '';
        
        const img = new Image();
        img.className = 'img-fluid';
        img.loading = 'lazy';
        
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item h-100 ${premiumClass}`;
        
        const galleryLinks = document.createElement('div');
        galleryLinks.className = 'gallery-links d-flex align-items-center justify-content-center';
        
        img.onerror = () => {
            col.remove(); // Eliminar el elemento si la imagen no se puede cargar
        };
        
        img.onload = () => {
            galleryLinks.innerHTML = `
                <a href="${isPremium ? '#' : imagePath}" class="glightbox preview-link ${isPremium ? 'disabled' : ''}" ${isPremium ? 'onclick="return false;"' : ''}>
                    <i class="bi bi-arrows-angle-expand"></i>
                </a>
                ${isPremium ? '<a href="premium.html" class="premium-link"><i class="bi bi-star-fill"></i></a>' : ''}
            `;
            galleryItem.appendChild(img);
            galleryItem.appendChild(galleryLinks);
        };
        
        img.src = imagePath;
        col.appendChild(galleryItem);
        return col;
    }

    async loadImagesFromDirectory(directoryPath, isPremium = false) {
        try {
            // Intenta cargar el archivo index.json que contiene la lista de imágenes
            const response = await fetch(`${directoryPath}index.json`);
            if (!response.ok) throw new Error('No se pudo cargar el índice de imágenes');
            
            const data = await response.json();
            data.images.forEach(imageName => {
                const imagePath = `${directoryPath}${imageName}`;
                const galleryItem = this.createGalleryItem(imagePath, isPremium);
                this.container.appendChild(galleryItem);
            });
        } catch (error) {
            console.error('Error loading directory:', error);
        }
    }

    async loadGallery() {
        try {
            // Mostrar loader
            this.container.innerHTML = `
                <div class="gallery-loader">
                    <i class="bi bi-arrow-repeat"></i>
                    <p>Loading gallery...</p>
                </div>
            `;

            // Cargar imágenes de ambas carpetas
            await Promise.all([
                this.loadImagesFromDirectory(this.publicPath, false),
                this.loadImagesFromDirectory(this.premiumPath, true)
            ]);

            // Eliminar loader
            const loader = this.container.querySelector('.gallery-loader');
            if (loader) loader.remove();

            // Inicializar GLightbox
            GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });

        } catch (error) {
            console.error('Error loading gallery:', error);
            this.container.innerHTML = `
                <div class="alert alert-danger">
                    Error loading gallery: ${error.message}
                </div>
            `;
        }
    }

    shuffleGallery() {
        const items = Array.from(this.container.children);
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            this.container.appendChild(items[j]);
        }
    }
}
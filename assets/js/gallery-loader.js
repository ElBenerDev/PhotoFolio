class GalleryLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.basePath = 'assets/img/gallery/';
        this.publicPath = this.basePath + 'public/';
        this.premiumPath = this.basePath + 'premium/';
        this.loadGallery();
    }

    createGalleryItem(imagePath, isPremium = false) {
        // Columna principal
        const col = document.createElement('div');
        col.className = 'col-xl-3 col-lg-4 col-md-6';
        
        // Contenedor del item de galería
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item h-100`;
        
        if (isPremium) {
            galleryItem.classList.add('premium');
        }
        
        // Imagen
        const img = document.createElement('img');
        img.className = 'img-fluid';
        img.alt = 'Gallery Image';
        img.src = imagePath;
        
        // Links de la galería
        const galleryLinks = document.createElement('div');
        galleryLinks.className = 'gallery-links d-flex align-items-center justify-content-center';
        
        if (isPremium) {
            // Contenedor centrado para el badge y el botón
            const premiumContainer = document.createElement('div');
            premiumContainer.className = 'premium-container text-center';
            
            // Badge premium como botón
            const premiumBadge = document.createElement('a');
            premiumBadge.href = 'https://pay.coingate.com/pay/PremiumPayment';
            premiumBadge.target = '_blank';
            premiumBadge.rel = 'noopener noreferrer nofollow';
            premiumBadge.className = 'premium-badge';
            
            // Contenido del badge
            premiumBadge.innerHTML = `
                <span class="badge-text">PREMIUM</span>
                <img src="https://assets.coingate.com/images/buttons/2.png" alt="CoinGate Payment Button" class="payment-button">
            `;
            
            premiumContainer.appendChild(premiumBadge);
            galleryItem.appendChild(premiumContainer);
        } else {
            galleryLinks.innerHTML = `
                <a href="${imagePath}" title="Gallery Image" class="glightbox preview-link">
                    <i class="bi bi-arrows-angle-expand"></i>
                </a>
            `;
        }
        
        // Agregar elementos al DOM
        galleryItem.appendChild(img);
        galleryItem.appendChild(galleryLinks);
        col.appendChild(galleryItem);
        
        return col;
    }

    async loadImagesFromDirectory(directoryPath, isPremium = false) {
        try {
            const response = await fetch(`${directoryPath}index.json`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar el índice de imágenes de ${directoryPath}`);
            }
            
            const data = await response.json();
            data.images.forEach(imageName => {
                const imagePath = `${directoryPath}${imageName}`;
                const galleryItem = this.createGalleryItem(imagePath, isPremium);
                this.container.appendChild(galleryItem);
            });
        } catch (error) {
            console.error('Error loading images:', error);
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

            // Cargar imágenes públicas y premium
            await Promise.all([
                this.loadImagesFromDirectory(this.publicPath, false),
                this.loadImagesFromDirectory(this.premiumPath, true)
            ]);

            // Remover loader
            const loader = this.container.querySelector('.gallery-loader');
            if (loader) loader.remove();

            // Inicializar GLightbox solo para imágenes no premium
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
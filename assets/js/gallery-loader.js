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
        
        col.innerHTML = `
            <div class="gallery-item h-100 ${premiumClass}">
                <img src="${imagePath}" class="img-fluid" alt="">
                <div class="gallery-links d-flex align-items-center justify-content-center">
                    <a href="${imagePath}" class="glightbox preview-link">
                        <i class="bi bi-arrows-angle-expand"></i>
                    </a>
                </div>
            </div>
        `;

        return col;
    }

    isPremiumUser() {
        return localStorage.getItem('isPremiumUser') === 'true';
    }

    async loadGallery() {
        try {
            const response = await fetch('assets/php/get-images.php');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Verificar si hay errores en la respuesta
            if (data.error) {
                throw new Error(data.error);
            }
    
            // Limpiar el contenedor
            this.container.innerHTML = '';
            
            // Cargar imágenes públicas
            if (Array.isArray(data.images)) {
                data.images.forEach(imagePath => {
                    const galleryItem = this.createGalleryItem(this.publicPath + imagePath);
                    this.container.appendChild(galleryItem);
                });
            }
    
            // Cargar imágenes premium
            if (Array.isArray(data.premium_images)) {
                data.premium_images.forEach(imagePath => {
                    const galleryItem = this.createGalleryItem(this.premiumPath + imagePath, true);
                    this.container.appendChild(galleryItem);
                });
            }
    
            // Reinicializar GLightbox
            const lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
    
            // Aplicar bloqueo a contenido premium
            this.updatePremiumContent();
    
        } catch (error) {
            console.error('Error loading gallery:', error);
            this.container.innerHTML = `<div class="alert alert-danger">Error loading gallery: ${error.message}</div>`;
        }
    }
}
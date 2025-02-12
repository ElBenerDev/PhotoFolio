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
        // Verificar si el usuario tiene acceso premium
        // Esto podría ser mediante localStorage, Firebase, o tu sistema de autenticación
        return localStorage.getItem('isPremiumUser') === 'true';
    }

    async loadGallery() {
        try {
            const response = await fetch('assets/js/gallery-config.json');
            const data = await response.json();
            
            // Limpiar el contenedor
            this.container.innerHTML = '';
            
            // Cargar imágenes públicas
            data.public_images.forEach(imageName => {
                const galleryItem = this.createGalleryItem(this.publicPath + imageName);
                this.container.appendChild(galleryItem);
            });

            // Cargar imágenes premium
            data.premium_images.forEach(imageName => {
                const galleryItem = this.createGalleryItem(this.premiumPath + imageName, true);
                this.container.appendChild(galleryItem);
            });

            // Reinicializar GLightbox
            const lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });

            // Aplicar bloqueo a contenido premium si el usuario no es premium
            this.updatePremiumContent();

        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    updatePremiumContent() {
        const premiumItems = document.querySelectorAll('.premium-content');
        const isPremium = this.isPremiumUser();

        premiumItems.forEach(item => {
            if (!isPremium) {
                item.classList.add('premium-overlay');
            } else {
                item.classList.remove('premium-overlay');
            }
        });
    }
}
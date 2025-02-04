/**
 * Main JavaScript file for PhotoFolio
 */

(function() {
    "use strict";
  
    /**
     * Mobile nav toggle
     */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu');
  
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function(e) {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  
    /**
     * Toggle mobile nav dropdowns
     */
    const navDropdowns = document.querySelectorAll('.navmenu .dropdown > a');
  
    navDropdowns.forEach(el => {
      el.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle('dropdown-active');
        }
      });
    });
  
    /**
     * Scroll event listener
     */
    window.addEventListener('scroll', function() {
      // Toggle header on scroll
      const selectHeader = document.querySelector('#header');
      if (selectHeader) {
        window.scrollY > 100 ? selectHeader.classList.add('header-scrolled') 
                            : selectHeader.classList.remove('header-scrolled');
      }
  
      // Toggle back to top button
      const backToTop = document.querySelector('#scroll-top');
      if (backToTop) {
        window.scrollY > 100 ? backToTop.classList.add('active') 
                            : backToTop.classList.remove('active');
      }
    });
  
    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  
    /**
     * Click events
     */
    document.addEventListener('click', function(e) {
      // Close mobile nav when clicking outside
      if (document.querySelector('.mobile-nav-active')) {
        if (!e.target.closest('.navmenu') && !e.target.closest('.mobile-nav-toggle')) {
          document.querySelector('body').classList.remove('mobile-nav-active');
          document.querySelector('.mobile-nav-toggle').classList.remove('bi-x');
          document.querySelector('.mobile-nav-toggle').classList.add('bi-list');
        }
      }
  
      // Scroll to top
      if (e.target.closest('#scroll-top')) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

    // Cuando el documento esté listo
    document.addEventListener('DOMContentLoaded', function() {
      // Detectar iOS para aplicar fixes específicos
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
          document.body.classList.add('ios-scroll-fix');
      }
  
      // Mejorar el comportamiento del scroll en móviles
      const smoothScroll = function(target) {
          const element = document.querySelector(target);
          if (element) {
              window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      };
  
      // Ajustar altura del hero en móviles
      const adjustHeroHeight = function() {
          const hero = document.querySelector('.hero');
          if (hero && window.innerWidth <= 768) {
              const windowHeight = window.innerHeight;
              hero.style.minHeight = `${windowHeight * 0.7}px`;
          }
      };
  
      // Llamar a la función al cargar y al redimensionar
      adjustHeroHeight();
      window.addEventListener('resize', adjustHeroHeight);
  });
  }); 
})();
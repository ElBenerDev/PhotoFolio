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
      const startButton = document.querySelector('.btn-get-started');
      if (startButton) {
          startButton.addEventListener('click', function(e) {
              e.preventDefault();
              // Verificar si el usuario está autenticado
              firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                      // Si está autenticado, ir a la galería
                      window.location.href = 'gallery.html';
                  } else {
                      // Si no está autenticado, ir al login
                      window.location.href = 'login.html';
                  }
              });
          });
      }
    });
  }); 
})();
// Agregar este código a tu archivo JavaScript existente

function checkPremiumAccess() {
    const hasPremiumAccess = localStorage.getItem('premium_access') === 'true';
    const premiumContent = document.querySelectorAll('.premium-content');
    
    premiumContent.forEach(element => {
        if (!hasPremiumAccess) {
            element.classList.add('blurred');
            element.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/payment.html';
            });
        } else {
            element.classList.remove('blurred');
        }
    });
}

document.addEventListener('DOMContentLoaded', checkPremiumAccess);
 // INTERACTIVE TOOLTIP SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    // SEMUA ELEMEN YANG BISA TOOLTIP
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        // BUAT TOOLTIP DIV
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.dataset.tooltip;
        element.appendChild(tooltip);
        
        // MOUSE ENTER
        element.addEventListener('mouseenter', function(e) {
            const tooltip = this.querySelector('.tooltip');
            tooltip.classList.add('show');
            
            // POSISI TOOLTIP
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // ATAS ATAU BAWAH
            if (window.innerHeight - rect.bottom < 100) {
                tooltip.style.top = (rect.top - tooltipRect.height - 10) + 'px';
                tooltip.style.bottom = 'auto';
                tooltip.style.transformOrigin = 'bottom center';
                tooltip.style.setProperty('--arrow-pos', 'top');
            } else {
                tooltip.style.top = (rect.bottom + 10) + 'px';
                tooltip.style.bottom = 'auto';
                tooltip.style.transformOrigin = 'top center';
            }
            
            // KIRI ATAU KANAN
            if (rect.left + tooltipRect.width > window.innerWidth) {
                tooltip.style.left = (rect.right - tooltipRect.width) + 'px';
            } else {
                tooltip.style.left = rect.left + 'px';
            }
        });
        
        // MOUSE LEAVE
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            tooltip.classList.remove('show');
        });
        
        // MOBILE TOUCH
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const tooltip = this.querySelector('.tooltip');
            tooltip.classList.toggle('show');
        });
    });
    
    // SMOOTH SCROLL & EXTRA EFFECTS
    document.querySelector('.profile-card').addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    console.log('🚀 Interactive Profile Loaded! Hover tags & profil!');
});

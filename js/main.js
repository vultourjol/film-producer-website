const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

function deferNonEssentialScripts() {
    if (isMobile) {
        // Для мобильных устройств приоритизируем скорость загрузки
        window.addEventListener('load', initializeCustomCursor);
        window.addEventListener('load', initializeParallaxEffects);
    } else {
        initializeCustomCursor();
        initializeParallaxEffects();
    }
}

function initializeCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Cursor hover effect
    const links = document.querySelectorAll('a, button, input, textarea, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
}

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 640) return; // Отключаем эффект на мобильных
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = (scrollPosition - elementPosition) * 0.1;
                
            if (scrollPosition > elementPosition - window.innerHeight && 
                scrollPosition < elementPosition + element.offsetHeight) {
                element.style.transform = `translateY(${distance}px)`;
            }
        });
    });
}

deferNonEssentialScripts();

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('bg-black', 'bg-opacity-90', 'shadow-lg');
        } else {
            header.classList.remove('bg-black', 'bg-opacity-90', 'shadow-lg');
        }
    });
            
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
            
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        document.body.classList.toggle('overflow-hidden');
    });
            
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        });
    });
            
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
                    
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
                    
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = (scrollPosition - elementPosition) * 0.1;
                    
            if (scrollPosition > elementPosition - window.innerHeight && 
                scrollPosition < elementPosition + element.offsetHeight) {
                element.style.transform = `translateY(${distance}px)`;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
            
    if (!cursor || !cursorDot) return;
            
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
                
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, button, input, textarea, .project-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
        });
                
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
});

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        const originalContent = element.innerHTML;
        element.innerHTML = 'Скопировано! <i class="ri-check-line ml-2 text-sm"></i>';
        element.classList.add('text-primary');
                
        setTimeout(function() {
            element.innerHTML = originalContent;
            element.classList.remove('text-primary');
        }, 2000);
    }).catch(function(err) {
        console.error('Ошибка при копировании: ', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const body = document.body;
    
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const modalId = `modal-project-${index + 1}`;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modalBackdrop.classList.remove('hidden');
                modal.classList.remove('hidden');
                body.classList.add('overflow-hidden');
                
                setTimeout(() => {
                    modalBackdrop.classList.add('opacity-100');
                    modal.classList.add('scale-100');
                }, 10);
            }
        });
    });
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    modalOverlay.addEventListener('click', closeAllModals);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    function closeAllModals() {
        const openModals = document.querySelectorAll('.project-modal-content:not(.hidden)');
        openModals.forEach(modal => {
            modal.classList.add('hidden');
        });
        
        modalBackdrop.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const projectSwiper = new Swiper('.project-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        }
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        const projectId = card.getAttribute('data-project-id');
        card.addEventListener('click', function() {
            const modalId = `modal-project-${projectId}`;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                const modalBackdrop = document.getElementById('modal-backdrop');
                modalBackdrop.classList.remove('hidden');
                modal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
                
                setTimeout(() => {
                    modalBackdrop.classList.add('opacity-100');
                    modal.classList.add('scale-100');
                }, 10);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('orientationchange', function() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    });
    
    if (window.innerWidth <= 640) {
        const projectSwiper = document.querySelector('.project-swiper').swiper;
        if (projectSwiper) {
            projectSwiper.params.slidesPerView = 1.2;
            projectSwiper.params.spaceBetween = 10;
            projectSwiper.update();
        }
    }
    
    const teamSwiper = new Swiper('.team-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        pagination: {
            el: '.swiper-pagination-team',
            clickable: true,
        },
        
        navigation: {
            nextEl: '.swiper-button-next-team',
            prevEl: '.swiper-button-prev-team',
        }
    });
    
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card) => {
        const memberId = card.getAttribute('data-member-id');
        card.addEventListener('click', function() {
            const modalId = `modal-member-${memberId}`;
            const modal = document.getElementById(modalId);
            
            if (modal) {
                const modalBackdrop = document.getElementById('modal-backdrop');
                modalBackdrop.classList.remove('hidden');
                modal.classList.remove('hidden');
                
                document.querySelectorAll('.team-modal-content').forEach(otherModal => {
                    if (otherModal !== modal) {
                        otherModal.classList.add('hidden');
                    }
                });
                
                document.body.classList.add('overflow-hidden');
            }
        });
    });
    
    const allModalCloseButtons = document.querySelectorAll('.modal-close');
    allModalCloseButtons.forEach((closeBtn) => {
        closeBtn.addEventListener('click', function() {
            const modalBackdrop = document.getElementById('modal-backdrop');
            modalBackdrop.classList.add('hidden');
            
            document.querySelectorAll('.project-modal-content').forEach(modal => {
                modal.classList.add('hidden');
            });
            
            document.querySelectorAll('.team-modal-content').forEach(modal => {
                modal.classList.add('hidden');
            });
            
            document.body.classList.remove('overflow-hidden');
        });
    });
    
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            const modalBackdrop = document.getElementById('modal-backdrop');
            modalBackdrop.classList.add('hidden');
            
            document.querySelectorAll('.project-modal-content').forEach(modal => {
                modal.classList.add('hidden');
            });
            
            document.querySelectorAll('.team-modal-content').forEach(modal => {
                modal.classList.add('hidden');
            });
            
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.innerWidth <= 640) {
        document.querySelectorAll('.floating').forEach(element => {
            element.style.animationDuration = '0s';
        });
    }
});
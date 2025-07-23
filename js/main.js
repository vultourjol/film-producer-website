const isMobile = false; 

function deferNonEssentialScripts() {
    if (isMobile) {
        // window.addEventListener("load", initializeCustomCursor);
        window.addEventListener("load", initializeParallaxEffects);
    } else {
        // initializeCustomCursor();
        initializeParallaxEffects();
    }
}

// function initializeCustomCursor() {    
//     const cursor = document.querySelector(".custom-cursor");
//     const cursorDot = document.querySelector(".custom-cursor-dot");
    
//     if (!cursor || !cursorDot) return;
    
//     let hasMouseMoved = false;

//     function showCursorOnFirstMove(e) {
//         if (!hasMouseMoved) {
//             hasMouseMoved = true;
            
//             cursor.style.left = e.clientX + "px";
//             cursor.style.top = e.clientY + "px";
//             cursorDot.style.left = e.clientX + "px";
//             cursorDot.style.top = e.clientY + "px";
            
//             setTimeout(() => {
//                 cursor.classList.add('active');
//                 cursorDot.classList.add('active');
//             }, 100);
            
//             document.removeEventListener('mousemove', showCursorOnFirstMove);
            
//             // Добавляем основной обработчик движения мыши
//             document.addEventListener("mousemove", function(e) {
//                 cursor.style.left = e.clientX + "px";
//                 cursor.style.top = e.clientY + "px";
//                 cursorDot.style.left = e.clientX + "px";
//                 cursorDot.style.top = e.clientY + "px";
//             });
//         }
//     }

//     document.addEventListener('mousemove', showCursorOnFirstMove);
    
//     // Обработчики для hover эффектов
//     const links = document.querySelectorAll("a, button, input, textarea, .project-card, [data-project-id]");
//     links.forEach(link => {
//         link.addEventListener("mouseenter", function() {
//             cursor.classList.add('hover');
//             cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
//             cursor.style.opacity = "0.5";
//         });
        
//         link.addEventListener("mouseleave", function() {
//             cursor.classList.remove('hover');
//             cursor.style.transform = "translate(-50%, -50%) scale(1)";
//             cursor.style.opacity = "1";
//         });
//     });
// }

function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", function() {
        if (window.innerWidth <= 640) return; 
        
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

function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(function() {
        const originalText = element.innerHTML;
        element.innerHTML = '<span class="text-primary">Скопировано! <i class=\"ri-check-line ml-2 text-lg\"></i></span>';

        setTimeout(function() {
            element.innerHTML = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Ошибка копирования: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = element.innerHTML;
        element.innerHTML = '<span class="text-primary">Скопировано! <i class=\"ri-check-line ml-2 text-lg\"></span>';
        
        setTimeout(function() {
            element.innerHTML = originalText;
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            header.classList.add("bg-black", "shadow-lg");
        } else {
            header.classList.remove("bg-black", "shadow-lg");
        }
    });
            
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");
            
    hamburger.addEventListener("click", function() {
        hamburger.classList.toggle("active");
        
        if (mobileMenu.classList.contains("translate-x-full")) {
            mobileMenu.classList.remove("translate-x-full");
            document.body.classList.add("overflow-hidden");
        } else {
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        }
    });

    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", function() {
            hamburger.classList.remove("active");
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        });
    });
            
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
                    
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
                    
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const parallaxElements = document.querySelectorAll(".parallax");
    window.addEventListener("scroll", function() {
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

    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalOverlay = document.getElementById("modal-overlay");
    const body = document.body;

    function closeAllModals() {
        document.querySelectorAll(".project-modal-content, .team-modal-content").forEach(modal => {
            modal.classList.add("hidden");
            modal.classList.remove("opacity-100", "scale-100"); 
        });
        if (modalBackdrop) {
            modalBackdrop.classList.add("hidden");
            modalBackdrop.classList.remove("opacity-100", "show");
        }
        body.classList.remove("overflow-hidden");
    }

    document.querySelectorAll(".modal-close").forEach(button => {
        button.addEventListener("click", closeAllModals);
    });

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeAllModals);
    }

   document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closeAllModals();
    });

    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", function() {
            const projectId = card.getAttribute("data-project-id");
            const modalId = `modal-project-${projectId}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                closeAllModals(); 
                modalBackdrop.classList.remove("hidden");
                modal.classList.remove("hidden");
                body.classList.add("overflow-hidden");
                setTimeout(() => {
                    modalBackdrop.classList.add("opacity-100", "show"); 
                    modal.classList.add("opacity-100", "scale-100");
                }, 10);
            }
        });
    });

    const projectSwiper = new Swiper(".project-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        
        navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
        }
    });

    window.addEventListener("orientationchange", function() {
        const hamburger = document.querySelector(".hamburger-menu");
        const mobileMenu = document.querySelector(".mobile-menu");
        
        if (hamburger.classList.contains("active")) {
            hamburger.classList.remove("active");
            mobileMenu.classList.add("translate-x-full");
            document.body.classList.remove("overflow-hidden");
        }
    });
    
    if (window.innerWidth <= 640) {
        const projectSwiperInstance = document.querySelector(".project-swiper").swiper;
        if (projectSwiperInstance) {
            projectSwiperInstance.params.slidesPerView = 1;
            projectSwiperInstance.params.spaceBetween = 10;
            projectSwiperInstance.update();
        }
    }
});

window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.classList.remove("-translate-y-full");
        header.classList.add("translate-y-0");
    } else {
        header.classList.add("-translate-y-full");
        header.classList.remove("translate-y-0");
    }
});
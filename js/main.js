        document.addEventListener('DOMContentLoaded', function() {
            // Header scroll effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('bg-black', 'bg-opacity-90', 'shadow-lg');
                } else {
                    header.classList.remove('bg-black', 'bg-opacity-90', 'shadow-lg');
                }
            });
            
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger-menu');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('flex');
                document.body.classList.toggle('overflow-hidden');
            });
            
            // Mobile menu links close menu when clicked
            const mobileLinks = document.querySelectorAll('.mobile-menu a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    document.body.classList.remove('overflow-hidden');
                });
            });
            
            // Smooth scrolling for anchor links
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
            
            // Back to top button
            const backToTop = document.querySelector('.back-to-top');
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Parallax effect
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
        
        // Custom cursor
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
        });

        function copyToClipboard(text, element) {
            navigator.clipboard.writeText(text).then(function() {
                // Временно изменяем содержимое для обратной связи
                const originalContent = element.innerHTML;
                element.innerHTML = 'Скопировано! <i class="ri-check-line ml-2 text-sm"></i>';
                element.classList.add('text-primary');
                
                // Через 2 секунды возвращаем оригинальное содержимое
                setTimeout(function() {
                    element.innerHTML = originalContent;
                    element.classList.remove('text-primary');
                }, 2000);
            }).catch(function(err) {
                console.error('Ошибка при копировании: ', err);
            });
        }
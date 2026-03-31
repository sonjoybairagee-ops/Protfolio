/**
 * Modern Video Editor Portfolio - Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileToggle.querySelector('i');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Animate progress bars if the skills section is visible
                if (entry.target.classList.contains('about-skills')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        // Add a slight delay for visual effect
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
                
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // --- 5. Contact Form Handling (Submit to Google Sheets) ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzk9qPDsCnKlxagRTpZl5_5ms7KXvgGJ2WiENKPXuMEC7cG269hJ1fBY7dLPq1kmUJT/exec'; // User replaced this
    const form = document.forms['google-sheet'];
    const submitBtn = document.querySelector('.submit-btn');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Change button state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 8px;"></i>';
            submitBtn.disabled = true;
            formStatus.style.display = 'none';

            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    // Success handling
                    formStatus.innerText = "Message sent successfully! I'll be in touch soon.";
                    formStatus.style.color = "var(--accent)";
                    formStatus.style.display = "block";
                    form.reset();
                    
                    // Reset button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
                    }, 1000);
                })
                .catch(error => {
                    // Error handling
                    console.error('Error!', error.message);
                    formStatus.innerText = "Error sending message. Please try another method.";
                    formStatus.style.color = "var(--accent-secondary)";
                    formStatus.style.display = "block";
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 5. Custom 3D Hero Particles & Parallax ---
    const scene = document.getElementById('scene');
    const floatingElements = document.querySelector('.floating-elements');
    const particlesLayer = document.getElementById('particles-js');

    if (scene && floatingElements && particlesLayer) {
        // --- Parallax Effect ---
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            // Apply slight rotation to the floating container based on mouse position
            floatingElements.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            floatingElements.style.transform = `translate(-50%, -50%) rotateY(0deg) rotateX(0deg)`;
            floatingElements.style.transition = 'transform 0.5s ease-out';
            setTimeout(() => {
                floatingElements.style.transition = 'none'; // remove transition for smooth tracking again
            }, 500);
        });

        // --- Custom Lightweight Particles ---
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            
            // Random styling
            const size = Math.random() * 3 + 1; // 1 to 4px
            const posX = Math.random() * 100; // 0 to 100vw
            const posY = Math.random() * 100; // 0 to 100vh
            const opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
            const duration = Math.random() * 20 + 10; // 10s to 30s
            const delay = Math.random() * 5;
            
            // Base styles
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = '#ffffff';
            particle.style.borderRadius = '50%';
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.boxShadow = `0 0 ${size * 2}px rgba(255,255,255,0.8)`;
            
            // Animation via JS API for better performance and randomness than static CSS
            particle.animate([
                { transform: `translate(0, 0) scale(1)`, opacity: 0 },
                { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px) scale(1.5)`, opacity: opacity },
                { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -300 - 150}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                delay: delay * 1000,
                easing: 'ease-in-out'
            });

            particlesLayer.appendChild(particle);
        }
    }

    // --- 7. Portfolio Filtering & Hover Play ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            
            // If clicking the already active button, deselect it (show all)
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                
                // Show all cards
                portfolioCards.forEach(card => {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    }, 50);
                });
            } else {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Filter cards
                portfolioCards.forEach(card => {
                    if (card.classList.contains(filterValue)) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                            card.style.display = 'none';
                        }, 400); // Matches CSS transition duration
                    }
                });
            }
        });
    });

    // Initialize display state: Because HTML has JS-reliant hidden classes on some elements, 
    // let's ensure the default UI state matches having NO active filters (showing all)
    filterBtns.forEach(b => b.classList.remove('active'));
    portfolioCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    // Hover to Play Logic
    const previewContainers = document.querySelectorAll('.video-preview-container');
    
    previewContainers.forEach(container => {
        let playTimeout;
        const videoId = container.getAttribute('data-video-id');
        const parentCard = container.closest('.portfolio-card');
        
        container.addEventListener('mouseenter', () => {
            // Don't play if card is hidden by filter
            if(parentCard.classList.contains('hidden')) return;
            
            // Wait 400ms before starting playback to avoid flash on quick passes
            playTimeout = setTimeout(() => {
                if(!container.querySelector('iframe')) {
                    const isVertical = parentCard.classList.contains('vertical');
                    const iframe = document.createElement('iframe');
                    
                    // Base YouTube URL
                    let srcUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`;
                    
                    iframe.src = srcUrl;
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    iframe.setAttribute('allowfullscreen', 'true');
                    
                    container.appendChild(iframe);
                }
                container.classList.add('playing');
            }, 400);
        });
        
        container.addEventListener('mouseleave', () => {
            clearTimeout(playTimeout);
            if(container.classList.contains('playing')) {
                container.classList.remove('playing');
                // Give iframe time to fade out before destroying to prevent harsh snap
                setTimeout(() => {
                    const iframe = container.querySelector('iframe');
                    if(iframe && !container.classList.contains('playing')) iframe.remove();
                }, 500);
            }
        });
    });

});

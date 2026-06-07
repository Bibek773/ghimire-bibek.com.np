let isLoading = true;
let currentFilter = '*';
let typedTextSpan = null;
let cursorSpan = null;
let textArray = ["Software Developer", "Sketch Artist", "Computer Engineering Student"];
let textArrayIndex = 0;
let charIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    handlePreloader();
    
    initializeNavigation();
    
    initializeTypingAnimation();
    
    initializeAOS();
    
    initializePortfolioFilters();

    initializeLightbox();
  
    initializeContactForm();
    
    initializeBackToTop();
    
    initializeSkillBars();
    
    
    initializeSmoothScrolling();
    
    
    initializeParticleEffects();
    
    
    initializeLoadingAnimations();
}


function handlePreloader() {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                    isLoading = false;
                    document.body.style.overflow = 'visible';
                }, 500);
            }
        }, 1500); 
    });
}


function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}


function initializeTypingAnimation() {
    typedTextSpan = document.querySelector(".typed-text");
    cursorSpan = document.querySelector(".cursor");
    
    if (typedTextSpan) {
        typeText();
    }
}

function typeText() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(typeText, 1000);
    }
}
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
}


function initializePortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === '*' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

function openLightbox(imageSrc, title, date) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDate = document.getElementById('lightbox-date');
    
    if (lightbox && lightboxImg && lightboxTitle && lightboxDate) {
        lightboxImg.src = imageSrc;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxDate.textContent = date;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
       
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
      
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
            ${message}
        </div>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeSkillBars() {
    const observeSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeSkillBars);
    } else {
        observeSkillBars();
    }
}

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; 
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeParticleEffects() {
    const particleContainer = document.querySelector('.hero-particles');
    
    if (particleContainer) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particleContainer.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        });
    }
}

function initializeLoadingAnimations() {

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
}

function showCommissionModal() {
    const modal = new bootstrap.Modal(document.getElementById('commissionModal'));
    modal.show();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(setViewportHeight, 100));
setViewportHeight();

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });
            
            if (document.getElementById('lightbox').style.display === 'block') {
                closeLightbox();
            }
        }
        
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);

});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);

});

function initializeAccessibility() {

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}


function trackEvent(category, action, label) {

    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardNavigation();
    initializeAccessibility();
    initializeLazyLoading();
    
    trackEvent('Page', 'Load', 'Portfolio');
});

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;
  
    showInstallPromotion();
});

function showInstallPromotion() {
    
    const installBanner = document.createElement('div');
    installBanner.innerHTML = `
        <div class="install-banner" style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
        ">
            <div>
                <strong>Install Portfolio App</strong>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Add to your home screen for quick access!</p>
            </div>
            <button id="installBtn" class="btn btn-light btn-sm">Install</button>
            <button id="dismissBtn" class="btn btn-outline-light btn-sm ms-2">×</button>
        </div>
    `;
    
    document.body.appendChild(installBanner);
    
    document.getElementById('installBtn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
        }
        installBanner.remove();
    });
    
    document.getElementById('dismissBtn').addEventListener('click', () => {
        installBanner.remove();
    });
   
    setTimeout(() => {
        if (installBanner.parentNode) {
            installBanner.remove();
        }
    }, 10000);
}

window.portfolioFunctions = {
    openLightbox,
    closeLightbox,
    showCommissionModal,
    trackEvent
};
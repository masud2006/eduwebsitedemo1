// ===== ডকুমেন্ট রেডি ইভেন্ট =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== মোবাইল মেনু টগল =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // ক্লিক করে মেনু বন্ধ করার জন্য
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ===== হিরো স্লাইডার লজিক =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    
    // স্লাইডার ইনিশিয়ালাইজ
    function initSlider() {
        if (slides.length === 0) return;
        
        // প্রথম স্লাইড সক্রিয় করুন
        showSlide(currentSlide);
        
        // অটো স্লাইডিং শুরু করুন
        startAutoSlide();
        
        // পূর্ববর্তী বাটন ইভেন্ট
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }
        
        // পরবর্তী বাটন ইভেন্ট
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }
        
        // ডট ক্লিক ইভেন্ট
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = index;
                showSlide(currentSlide);
                startAutoSlide();
            });
        });
        
        // টাচ সোয়াইপ ইভেন্ট (মোবাইলের জন্য)
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            sliderContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // ডানে সোয়াইপ (পরবর্তী স্লাইড)
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            } else if (touchEndX > touchStartX + 50) {
                // বামে সোয়াইপ (পূর্ববর্তী স্লাইড)
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            }
        }
    }
    
    // নির্দিষ্ট স্লাইড দেখানো
    function showSlide(index) {
        // সমস্ত স্লাইড লুকান
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // সমস্ত ডট অ্যাক্টিভেশন রিমুভ করুন
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // বর্তমান স্লাইড ও ডট সক্রিয় করুন
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    // পরবর্তী স্লাইড
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // পূর্ববর্তী স্লাইড
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // অটো স্লাইডিং শুরু
    function startAutoSlide() {
        stopAutoSlide(); // প্রথমে থামান (যদি চলমান থাকে)
        slideInterval = setInterval(nextSlide, 5000); // প্রতি ৫ সেকেন্ডে
    }
    
    // অটো স্লাইডিং থামান
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // স্লাইডারে হোভার করলে অটো স্লাইড থামবে
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // স্লাইডার ইনিশিয়ালাইজ করুন
    initSlider();
    
    // ===== পরিসংখ্যান কাউন্টার =====
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats-section');
        
        if (!statNumbers.length || !statsSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        const increment = target / 100;
                        let current = 0;
                        
                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                stat.textContent = Math.floor(current).toLocaleString('bn-BD');
                                setTimeout(updateCounter, 20);
                            } else {
                                stat.textContent = target.toLocaleString('bn-BD');
                            }
                        };
                        
                        updateCounter();
                    });
                    
                    // একবার দেখলে পরপরবার আর observe করা লাগবে না
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    initCounters();
    
    // ===== স্ক্রোল এনিমেশন =====
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .academic-card, .branch-card, .result-card, .contact-card, .notice-item');
        
        if (!animatedElements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // ভিন্ন ভিন্ন এলিমেন্টের জন্য আলাদা এনিমেশন
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.style.transform = 'perspective(1000px) rotateX(0deg)';
                    }
                    if (entry.target.classList.contains('academic-card')) {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }
                    if (entry.target.classList.contains('branch-card')) {
                        entry.target.style.transform = 'perspective(1000px) rotateY(0deg)';
                    }
                    
                    // একবার দেখলে পরপরবার আর observe করা লাগবে না
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // প্রাথমিক স্টাইল সেট করুন
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // ভিন্ন ভিন্ন এলিমেন্টের জন্য আলাদা ট্রান্সফর্ম
            if (el.classList.contains('feature-card')) {
                el.style.transform = 'perspective(1000px) rotateX(10deg)';
            } else if (el.classList.contains('academic-card')) {
                el.style.transform = 'translateY(50px) scale(0.95)';
            } else if (el.classList.contains('branch-card')) {
                el.style.transform = 'perspective(1000px) rotateY(15deg)';
            } else {
                el.style.transform = 'translateY(30px)';
            }
            
            observer.observe(el);
        });
    }
    
    initScrollAnimations();
    
    // ===== স্মুথ স্ক্রোলিং নেভিগেশন =====
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link:not(.login-btn)');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // মোবাইল মেনু বন্ধ করুন (যদি খোলা থাকে)
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                        
                        // সক্রিয় নেভ লিংক আপডেট করুন
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                        
                        // স্মুথ স্ক্রোলিং
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // স্ক্রোল পজিশন অনুযায়ী সক্রিয় নেভ লিংক আপডেট করুন
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); // প্রাথমিক কল
    }
    
    initSmoothScroll();
    
    // ===== কন্টাক্ট ফর্ম হ্যান্ডলিং =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ফর্ম ভ্যালিডেশন
            const name = this.querySelector('input[type="text"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelector('select').value;
            const message = this.querySelector('textarea').value.trim();
            
            // সহজ ভ্যালিডেশন
            if (!name || !phone || !email || !subject || !message) {
                showNotification('দয়া করে সকল তথ্য প্রদান করুন', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('সঠিক ইমেইল ঠিকানা প্রদান করুন', 'error');
                return;
            }
            
            if (!isValidPhone(phone)) {
                showNotification('সঠিক ফোন নম্বর প্রদান করুন', 'error');
                return;
            }
            
            // সিমুলেটেড সাবমিশন (আসল এপিআই কলে রিপ্লেস হবে)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'পাঠানো হচ্ছে...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // সফল সাবমিশন নোটিফিকেশন
                showNotification('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।', 'success');
                
                // ফর্ম রিসেট
                this.reset();
                
                // বাটন রিসেট
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // নোটিফিকেশন অটো বন্ধ
                setTimeout(() => {
                    const notification = document.querySelector('.notification');
                    if (notification) {
                        notification.remove();
                    }
                }, 5000);
                
            }, 1500);
        });
    }
    
    // ইমেইল ভ্যালিডেশন
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ফোন নম্বর ভ্যালিডেশন (বাংলাদেশী ফরম্যাট)
    function isValidPhone(phone) {
        const phoneRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
        return phoneRegex.test(phone);
    }
    
    // নোটিফিকেশন শো করার ফাংশন
    function showNotification(message, type = 'success') {
        // বিদ্যমান নোটিফিকেশন মুছে ফেলুন
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // নোটিফিকেশন এলিমেন্ট তৈরি করুন
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // আইকন সেট করুন
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${icon}</div>
                <div class="notification-text">${message}</div>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // স্টাইল যোগ করুন
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00ff00, #00cc00)' : 'linear-gradient(135deg, #ff0000, #cc0000)'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        `;
        
        // নোটিফিকেশন কন্টেন্ট স্টাইল
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        // নোটিফিকেশন আইকন স্টাইল
        const notificationIcon = notification.querySelector('.notification-icon');
        notificationIcon.style.cssText = `
            font-size: 24px;
        `;
        
        // নোটিফিকেশন টেক্সট স্টাইল
        const notificationText = notification.querySelector('.notification-text');
        notificationText.style.cssText = `
            flex: 1;
            font-size: 16px;
            line-height: 1.4;
        `;
        
        // ক্লোজ বাটন স্টাইল
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 18px;
            padding: 0;
            margin-left: 10px;
        `;
        
        // ক্লোজ বাটন ইভেন্ট
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // ডকুমেন্টে যুক্ত করুন
        document.body.appendChild(notification);
        
        // অটো রিমুভ টাইমার
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
        
        // এনিমেশন ক্লাস যোগ করুন
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // ===== ফ্লোটিং বাটন এনিমেশন =====
    const floatingBtns = document.querySelectorAll('.floating-btn');
    floatingBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
        
        // টাচ ডিভাইসের জন্য
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1) translateY(0)';
            }, 100);
        });
    });
    
    // ===== ফুটার নিউজলেটার ফর্ম =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                showNotification('সঠিক ইমেইল ঠিকানা প্রদান করুন', 'error');
                return;
            }
            
            // সিমুলেটেড সাবস্ক্রিপশন
            const submitBtn = this.querySelector('button');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('আপনাকে ধন্যবাদ! নিউজলেটারের জন্য সাবস্ক্রাইব করেছেন।', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===== ফেইড ইন এনিমেশন স্ক্রোলের সময় =====
    function initFadeInOnScroll() {
        const fadeElements = document.querySelectorAll('.section-title, .section-subtitle, .digital-text, .cta-content');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            fadeObserver.observe(el);
        });
    }
    
    initFadeInOnScroll();
    
    // ===== নোটিশ আইটেম ক্লিক এনিমেশন =====
    const noticeItems = document.querySelectorAll('.notice-item');
    noticeItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ===== লগইন বাটন ক্লিক ইভেন্ট =====
    const loginBtns = document.querySelectorAll('.login-btn, .nav-link.login-btn');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('login-btn')) {
                e.preventDefault();
                showNotification('লগইন সিস্টেমটি শীঘ্রই চালু হবে।', 'success');
            }
        });
    });
    
    // ===== উইন্ডো রিসাইজ হ্যান্ডলিং =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // মোবাইল মেনু বন্ধ করুন যখন স্ক্রিন সাইজ বড় হয়
            if (window.innerWidth > 991 && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }, 250);
    });
    
    // ===== লোডিং এনিমেশন =====
    window.addEventListener('load', function() {
        // লোডিং শেষে বডিতে ক্লাস যোগ করুন
        document.body.classList.add('loaded');
        
        // স্লাইডার নিশ্চিত করুন যে সক্রিয় স্লাইড দেখাচ্ছে
        setTimeout(() => {
            if (slides.length > 0) {
                showSlide(currentSlide);
            }
        }, 100);
    });
    
    // ===== হটকি-স শর্টকাট =====
    document.addEventListener('keydown', function(e) {
        // ESC দিয়ে মোবাইল মেনু বন্ধ করুন
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // স্পেস বার দিয়ে স্লাইডার থামান/চালান
        if (e.code === 'Space' && !e.target.matches('input, textarea, select')) {
            e.preventDefault();
            if (slideInterval) {
                stopAutoSlide();
                showNotification('স্লাইডার থামানো হয়েছে।', 'success');
            } else {
                startAutoSlide();
                showNotification('স্লাইডার চালু করা হয়েছে।', 'success');
            }
        }
    });
    
    // ===== পারফরম্যান্স অপ্টিমাইজেশন =====
    // থ্রটল ফাংশন
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
        };
    }
    
    // স্ক্রোল ইভেন্ট থ্রটলিং
    const throttledScroll = throttle(updateActiveNavLink, 100);
    window.addEventListener('scroll', throttledScroll);
});

// ===== সার্ভিস ওয়ার্কার রেজিস্ট্রেশন (ঐচ্ছিক) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(
            function(registration) {
                console.log('ServiceWorker registration successful');
            },
            function(err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}

// ===== অফলাইন সাপোর্ট ডিটেকশন =====
window.addEventListener('online', function() {
    showNotification('ইন্টারনেট সংযোগ পুনরায় সক্রিয় হয়েছে।', 'success');
});

window.addEventListener('offline', function() {
    showNotification('ইন্টারনেট সংযোগ বিচ্ছিন্ন হয়েছে। কিছু বৈশিষ্ট্য কাজ নাও করতে পারে।', 'error');
});

// ===== পেজ ভিজিবিলিটি API =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // যখন ট্যাব/উইন্ডো হিডেন
        stopAutoSlide();
    } else {
        // যখন ট্যাব/উইন্ডো ভিজিবল
        startAutoSlide();
    }
});
// Performance Optimizations
(function() {
    'use strict';
    
    // Lazy Load Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Prefetch Links on Hover
    const prefetchLink = (url) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);
    };
    
    // Prefetch internal links on hover (desktop only)
    if (window.innerWidth > 768) {
        const prefetchedLinks = new Set();
        
        document.addEventListener('mouseover', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const url = link.href;
            if (!url || prefetchedLinks.has(url)) return;
            if (!url.startsWith(window.location.origin)) return;
            if (url.includes('#')) return;
            
            prefetchedLinks.add(url);
            prefetchLink(url);
        }, { passive: true });
    }
    
    // Service Worker Registration (optional - uncomment if you create a SW)
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker registration failed'));
        });
    }
    */
    
    // Resource Hints
    const addResourceHint = (rel, href, as) => {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (as) link.as = as;
        document.head.appendChild(link);
    };
    
    // Preconnect to external domains
    const externalDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
    ];
    
    externalDomains.forEach(domain => {
        addResourceHint('preconnect', domain);
    });
    
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                // Track LCP (optional - integrate with analytics)
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'web_vitals', {
                        event_category: 'Web Vitals',
                        event_label: 'LCP',
                        value: Math.round(lastEntry.renderTime || lastEntry.loadTime)
                    });
                }
            });
            
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // LCP observer not supported
        }
        
        // First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    const fid = entry.processingStart - entry.startTime;
                    console.log('FID:', fid);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            event_category: 'Web Vitals',
                            event_label: 'FID',
                            value: Math.round(fid)
                        });
                    }
                });
            });
            
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            // FID observer not supported
        }
        
        // Cumulative Layout Shift (CLS)
        try {
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                    }
                }
            });
            
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
            // Report CLS on page visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    console.log('CLS:', clsScore);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'web_vitals', {
                            event_category: 'Web Vitals',
                            event_label: 'CLS',
                            value: Math.round(clsScore * 1000)
                        });
                    }
                }
            });
        } catch (e) {
            // CLS observer not supported
        }
    }
    
    // Optimize Font Loading
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1rem Inter'),
            document.fonts.load('700 1rem Poppins')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
    
    // Battery API - reduce animations on low battery
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 && !battery.charging) {
                document.documentElement.classList.add('low-battery');
                // Disable heavy animations
                document.querySelectorAll('[class*="animate"]').forEach(el => {
                    el.style.animation = 'none';
                });
            }
        });
    }
    
    // Connection Speed Detection
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.classList.add('slow-connection');
            // Reduce quality of images or disable some features
        }
    }
})();

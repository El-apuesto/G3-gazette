// Blog Enhancements JavaScript
(function() {
    'use strict';
    
    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        initReadingProgress();
        initBackToTop();
        initReadingTime();
        initScrollReveal();
        initSocialShare();
        initTableOfContents();
        initImageLoading();
    });
    
    // Reading Progress Bar
    function initReadingProgress() {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.insertBefore(progressBar, document.body.firstChild);
        
        // Update progress on scroll
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }
    
    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
        
        // Show/hide on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Calculate and Display Reading Time
    function initReadingTime() {
        const content = document.querySelector('.post-content');
        if (!content) return;
        
        const text = content.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
        
        // Find or create reading time element
        let readingTimeEl = document.querySelector('.reading-time');
        if (!readingTimeEl) {
            const metaDiv = document.querySelector('.post-meta');
            if (metaDiv) {
                readingTimeEl = document.createElement('div');
                readingTimeEl.className = 'reading-time';
                metaDiv.appendChild(readingTimeEl);
            }
        }
        
        if (readingTimeEl) {
            readingTimeEl.innerHTML = `${readingTime} min read`;
        }
    }
    
    // Scroll Reveal Animation
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        if (reveals.length === 0) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.15
        });
        
        reveals.forEach(element => revealObserver.observe(element));
    }
    
    // Social Share Functionality
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('.share-button');
        if (shareButtons.length === 0) return;
        
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.classList.contains('twitter') ? 'twitter' :
                               this.classList.contains('linkedin') ? 'linkedin' :
                               this.classList.contains('facebook') ? 'facebook' :
                               this.classList.contains('email') ? 'email' :
                               this.classList.contains('copy') ? 'copy' : '';
                
                let shareUrl = '';
                
                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                        window.open(shareUrl, '_blank', 'width=550,height=420');
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                        window.open(shareUrl, '_blank', 'width=550,height=420');
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                        window.open(shareUrl, '_blank', 'width=550,height=420');
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${pageTitle}&body=${pageUrl}`;
                        window.location.href = shareUrl;
                        break;
                    case 'copy':
                        copyToClipboard(window.location.href);
                        showCopyNotification(this);
                        break;
                }
            });
        });
    }
    
    // Copy to Clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }
    
    // Show Copy Notification
    function showCopyNotification(button) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '✓';
        button.style.background = 'var(--primary-color)';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
    
    // Table of Contents Generator
    function initTableOfContents() {
        const content = document.querySelector('.post-content');
        const tocContainer = document.querySelector('.table-of-contents');
        if (!content || !tocContainer) return;
        
        const headings = content.querySelectorAll('h2, h3');
        if (headings.length === 0) return;
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';
        
        headings.forEach((heading, index) => {
            // Add ID to heading if it doesn't have one
            if (!heading.id) {
                heading.id = 'heading-' + index;
            }
            
            const tocItem = document.createElement('li');
            tocItem.className = 'toc-item';
            
            const tocLink = document.createElement('a');
            tocLink.className = 'toc-link';
            tocLink.href = '#' + heading.id;
            tocLink.textContent = heading.textContent;
            tocLink.style.paddingLeft = heading.tagName === 'H3' ? '1.5rem' : '0.75rem';
            
            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
            
            // Smooth scroll on click
            tocLink.addEventListener('click', function(e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active state
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        tocContainer.appendChild(tocList);
        
        // Highlight active section on scroll
        window.addEventListener('scroll', function() {
            let current = '';
            
            headings.forEach(heading => {
                const sectionTop = heading.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = heading.id;
                }
            });
            
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
                if (link.href.includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Lazy Load Images with Fade In
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
        
        // Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
})();

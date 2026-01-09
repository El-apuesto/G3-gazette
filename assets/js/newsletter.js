// Newsletter Functionality
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        initNewsletterForms();
        initNewsletterModal();
    });
    
    // Initialize all newsletter forms
    function initNewsletterForms() {
        const forms = document.querySelectorAll('.newsletter-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', handleNewsletterSubmit);
        });
    }
    
    // Handle newsletter form submission
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = form.querySelector('.newsletter-input');
        const submitButton = form.querySelector('.newsletter-button');
        const email = emailInput.value.trim();
        
        // Validate email
        if (!isValidEmail(email)) {
            showMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable button and show loading
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="newsletter-loading"></span> Subscribing...';
        
        // Submit to your newsletter service
        // Replace this with your actual newsletter service endpoint
        submitToNewsletterService(email)
            .then(() => {
                showMessage(form, '🎉 Success! Check your email to confirm subscription.', 'success');
                emailInput.value = '';
                
                // Track subscription (optional)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'engagement',
                        'event_label': 'Newsletter Subscription'
                    });
                }
            })
            .catch(error => {
                showMessage(form, 'Oops! Something went wrong. Please try again.', 'error');
                console.error('Newsletter subscription error:', error);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success/error message
    function showMessage(form, message, type) {
        // Remove existing message
        const existingMessage = form.parentElement.querySelector('.newsletter-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.textContent = message;
        
        form.parentElement.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // Submit to newsletter service
    // IMPORTANT: Replace this with your actual newsletter service integration
    // Examples: Mailchimp, ConvertKit, Buttondown, Substack, etc.
    function submitToNewsletterService(email) {
        return new Promise((resolve, reject) => {
            // Example: Using Mailchimp
            // Replace with your Mailchimp form action URL
            const mailchimpURL = 'YOUR_MAILCHIMP_URL_HERE';
            
            // Example: Using ConvertKit
            // const convertKitURL = 'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe';
            // const convertKitAPIKey = 'YOUR_API_KEY';
            
            // Example: Using a custom backend endpoint
            const endpoint = '/api/newsletter/subscribe'; // Your backend endpoint
            
            // For now, simulate success (remove this in production)
            setTimeout(() => {
                // Comment out the line below and uncomment your service integration
                resolve({ success: true });
                
                // Example fetch to your backend:
                /*
                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        resolve(data);
                    } else {
                        reject(new Error(data.message));
                    }
                })
                .catch(error => reject(error));
                */
            }, 1500);
        });
    }
    
    // Newsletter Modal (Exit Intent or Timed)
    function initNewsletterModal() {
        // Check if modal should be shown
        if (hasSeenNewsletterModal()) {
            return;
        }
        
        // Create modal if it doesn't exist
        let modal = document.querySelector('.newsletter-modal');
        if (!modal) {
            modal = createNewsletterModal();
            document.body.appendChild(modal);
        }
        
        // Show modal on exit intent (desktop)
        if (window.innerWidth > 768) {
            document.addEventListener('mouseout', function(e) {
                if (e.clientY <= 0) {
                    showNewsletterModal(modal);
                }
            }, { once: true });
        }
        
        // Or show after scroll (mobile)
        let hasTriggered = false;
        window.addEventListener('scroll', function() {
            if (hasTriggered) return;
            
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50) {
                hasTriggered = true;
                setTimeout(() => showNewsletterModal(modal), 1000);
            }
        });
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.newsletter-modal-close');
        const overlay = modal.querySelector('.newsletter-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeNewsletterModal(modal));
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeNewsletterModal(modal);
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeNewsletterModal(modal);
            }
        });
    }
    
    function createNewsletterModal() {
        const modal = document.createElement('div');
        modal.className = 'newsletter-modal';
        modal.innerHTML = `
            <div class="newsletter-modal-content">
                <button class="newsletter-modal-close" aria-label="Close">&times;</button>
                <span class="newsletter-badge">Free Newsletter</span>
                <h3>Never Miss an Update!</h3>
                <p>Get weekly grant opportunities, funding tips, and success stories delivered to your inbox.</p>
                <form class="newsletter-form">
                    <input type="email" 
                           class="newsletter-input" 
                           placeholder="Enter your email address" 
                           required>
                    <button type="submit" class="newsletter-button">Subscribe Now</button>
                </form>
                <p class="newsletter-privacy">
                    We respect your privacy. Unsubscribe anytime.<br>
                    <a href="/privacy">Privacy Policy</a>
                </p>
                <div class="newsletter-stats">Join 5,000+ grant seekers</div>
            </div>
        `;
        
        // Initialize the form in the modal
        const form = modal.querySelector('.newsletter-form');
        form.addEventListener('submit', handleNewsletterSubmit);
        
        return modal;
    }
    
    function showNewsletterModal(modal) {
        if (hasSeenNewsletterModal()) return;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track that user has seen the modal
        markNewsletterModalAsSeen();
    }
    
    function closeNewsletterModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // LocalStorage helpers to prevent showing modal too often
    function hasSeenNewsletterModal() {
        const lastSeen = localStorage.getItem('newsletter_modal_seen');
        if (!lastSeen) return false;
        
        // Show again after 7 days
        const daysSinceLastSeen = (Date.now() - parseInt(lastSeen)) / (1000 * 60 * 60 * 24);
        return daysSinceLastSeen < 7;
    }
    
    function markNewsletterModalAsSeen() {
        localStorage.setItem('newsletter_modal_seen', Date.now().toString());
    }
    
    // Public API for manual triggering
    window.showNewsletterPopup = function() {
        let modal = document.querySelector('.newsletter-modal');
        if (!modal) {
            modal = createNewsletterModal();
            document.body.appendChild(modal);
        }
        showNewsletterModal(modal);
    };
})();

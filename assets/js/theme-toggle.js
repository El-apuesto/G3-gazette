// Dark Mode Toggle with LocalStorage Persistence
(function() {
    'use strict';
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Wait for DOM to load before adding toggle button
    document.addEventListener('DOMContentLoaded', function() {
        // Create theme toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        toggleButton.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        
        // Insert toggle button into page
        document.body.appendChild(toggleButton);
        
        // Toggle theme function
        function toggleTheme() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button icon
            toggleButton.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
            
            // Add animation class
            toggleButton.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                toggleButton.style.transform = '';
            }, 300);
        }
        
        // Add click event listener
        toggleButton.addEventListener('click', toggleTheme);
        
        // Optional: Add keyboard support for accessibility
        toggleButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // Listen for system theme changes (optional)
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            darkModeQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    toggleButton.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
                }
            });
        }
    });
})();

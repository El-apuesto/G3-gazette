// Blog Search Functionality
(function() {
    'use strict';
    
    let postsData = [];
    let searchIndex = [];
    
    document.addEventListener('DOMContentLoaded', function() {
        initSearch();
    });
    
    function initSearch() {
        // Create search interface
        createSearchUI();
        
        // Fetch posts data
        fetchPostsData();
    }
    
    function createSearchUI() {
        const nav = document.querySelector('.nav-menu');
        if (!nav) return;
        
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'nav-search';
        searchContainer.innerHTML = `
            <button class="search-trigger" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                </svg>
            </button>
        `;
        
        // Insert before Newsletter link
        const newsletterLink = nav.querySelector('.nav-cta');
        if (newsletterLink) {
            nav.insertBefore(searchContainer, newsletterLink);
        } else {
            nav.appendChild(searchContainer);
        }
        
        // Create search modal
        const searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-overlay"></div>
            <div class="search-modal-content">
                <div class="search-header">
                    <input type="text" class="search-input" placeholder="Search posts..." autocomplete="off">
                    <button class="search-close" aria-label="Close search">&times;</button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        document.body.appendChild(searchModal);
        
        // Event listeners
        const trigger = searchContainer.querySelector('.search-trigger');
        const modal = searchModal;
        const overlay = searchModal.querySelector('.search-modal-overlay');
        const closeBtn = searchModal.querySelector('.search-close');
        const input = searchModal.querySelector('.search-input');
        const results = searchModal.querySelector('.search-results');
        
        trigger.addEventListener('click', () => openSearch());
        overlay.addEventListener('click', () => closeSearch());
        closeBtn.addEventListener('click', () => closeSearch());
        
        input.addEventListener('input', (e) => performSearch(e.target.value, results));
        
        // Keyboard shortcut: Ctrl+K or Cmd+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeSearch();
            }
        });
        
        function openSearch() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => input.focus(), 100);
        }
        
        function closeSearch() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            input.value = '';
            results.innerHTML = '';
        }
    }
    
    function fetchPostsData() {
        // Try to fetch from Jekyll's search.json
        fetch('/search.json')
            .then(response => response.json())
            .then(data => {
                postsData = data;
                buildSearchIndex();
            })
            .catch(error => {
                console.log('Search data not available yet');
                // Fallback: scrape current page for post links
                scrapePostsFromPage();
            });
    }
    
    function scrapePostsFromPage() {
        const postCards = document.querySelectorAll('.blog-card, .news-card');
        postsData = Array.from(postCards).map(card => {
            const title = card.querySelector('h3')?.textContent || '';
            const excerpt = card.querySelector('p')?.textContent || '';
            const category = card.querySelector('.blog-category, .news-tag')?.textContent || '';
            const link = card.querySelector('a')?.href || card.href || '#';
            
            return { title, excerpt, category, url: link };
        });
        buildSearchIndex();
    }
    
    function buildSearchIndex() {
        searchIndex = postsData.map(post => ({
            ...post,
            searchText: `${post.title} ${post.excerpt} ${post.category}`.toLowerCase()
        }));
    }
    
    function performSearch(query, resultsContainer) {
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '<div class="search-prompt">Type to search posts...</div>';
            return;
        }
        
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        
        const matches = searchIndex.filter(post => {
            return searchTerms.some(term => post.searchText.includes(term));
        }).map(post => {
            // Calculate relevance score
            let score = 0;
            searchTerms.forEach(term => {
                if (post.title.toLowerCase().includes(term)) score += 10;
                if (post.category.toLowerCase().includes(term)) score += 5;
                if (post.searchText.includes(term)) score += 1;
            });
            return { ...post, score };
        }).sort((a, b) => b.score - a.score);
        
        displayResults(matches, query, resultsContainer);
    }
    
    function displayResults(matches, query, resultsContainer) {
        if (matches.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-no-results">
                    <p>No results found for "${escapeHtml(query)}"</p>
                    <p class="search-tip">Try different keywords or check your spelling</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = matches.slice(0, 10).map(post => `
            <a href="${post.url}" class="search-result-item">
                <div class="search-result-header">
                    <h3 class="search-result-title">${highlightMatch(post.title, query)}</h3>
                    ${post.category ? `<span class="search-result-category">${post.category}</span>` : ''}
                </div>
                <p class="search-result-excerpt">${highlightMatch(truncate(post.excerpt, 150), query)}</p>
            </a>
        `).join('');
        
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <p>${matches.length} result${matches.length !== 1 ? 's' : ''} found</p>
            </div>
            ${resultsHTML}
        `;
    }
    
    function highlightMatch(text, query) {
        if (!query) return escapeHtml(text);
        
        const terms = query.toLowerCase().split(' ').filter(t => t.length > 1);
        let result = escapeHtml(text);
        
        terms.forEach(term => {
            const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        
        return result;
    }
    
    function truncate(text, length) {
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + '...';
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
})();

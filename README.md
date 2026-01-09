# G³ Gazette - Grant Genie Blog

![G3 Gazette Banner](https://img.shields.io/badge/Grant-Genie-22c55e?style=for-the-badge)
![Jekyll](https://img.shields.io/badge/Jekyll-4.3-CC0000?style=for-the-badge&logo=jekyll)
![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)

The official blog for Grant Genie (Grant Geenie Gazette), featuring daily automated content about grants, funding opportunities, and nonprofit resources.

## 🎉 Recent Major Update - January 2026

Complete aesthetic overhaul with modern design, advanced features, and enhanced user experience.

## ✨ Key Features

### Typography & Readability
- **Google Fonts**: Poppins (headings) + Inter (body text)
- **Drop Caps**: Elegant first-letter styling
- **Pull Quotes**: Styled blockquotes with emerald accents
- **Perfect Spacing**: Line heights and margins optimized for reading

### Visual Enhancements
- **Smooth Animations**: Fade-in on scroll, staggered card reveals
- **Glassmorphism**: Frosted glass effects on key UI elements
- **Gradient Text**: Eye-catching gradients on hero sections
- **Card Hover Effects**: Lift animations with emerald glow
- **Loading Skeletons**: Shimmer effects while content loads

### Blog Post Features
- **Reading Progress Bar**: Track position in article
- **Auto Reading Time**: Calculated from word count
- **Social Share Buttons**: Sticky sidebar with all major platforms
- **Table of Contents**: Auto-generated, with active section highlighting
- **Back to Top Button**: Smooth scroll to top
- **Author Bio Cards**: Professional author information
- **Related Posts**: Smart algorithm matches by tags/category
- **Breadcrumb Navigation**: SEO-friendly path display

### Search & Navigation
- **Modal Search**: Full-featured search with Ctrl+K shortcut
- **Real-time Filtering**: Instant results as you type
- **Highlighted Matches**: Visual emphasis on search terms
- **Smart Ranking**: Weighs titles > categories > content
- **Mobile Menu**: Smooth hamburger animation
- **Category Filters**: Visual pills for content filtering

### Dark Mode
- **Complete Theme**: Full dark mode support
- **Toggle Button**: Fixed top-right corner
- **LocalStorage**: Remembers user preference
- **System Detection**: Respects OS theme
- **Smooth Transitions**: All colors fade smoothly

## 📁 Project Structure

```
G3-gazette/
├── _layouts/
│   ├── default.html          # Main layout with all CSS/JS
│   └── post.html             # Enhanced post layout
├── _posts/                   # Blog posts (Markdown)
├── assets/
│   ├── css/
│   │   ├── main.css             # Core styles & colors
│   │   ├── typography.css       # Fonts & text styles
│   │   ├── animations.css       # Visual effects
│   │   ├── blog-enhancements.css # Post features
│   │   ├── search-and-nav.css   # Search & navigation
│   │   ├── landing.css          # Homepage styles
│   │   └── custom.css           # Additional customizations
│   ├── js/
│   │   ├── theme-toggle.js      # Dark mode
│   │   ├── blog-enhancements.js # Post features (progress, TOC, etc.)
│   │   ├── search.js            # Search functionality
│   │   └── navigation.js        # Mobile menu
│   └── images/               # Images and media
├── archive.html             # All posts page with filtering
├── newsletter.html          # Newsletter signup
├── search.json              # Jekyll search data
├── _config.yml              # Jekyll configuration
└── index.html               # Homepage
```

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+
- Jekyll 4.3+
- Bundler

### Local Development

```bash
# Clone the repository
git clone https://github.com/El-apuesto/G3-gazette.git
cd G3-gazette

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# View at http://localhost:4000
```

### Creating a New Post

```bash
# Create file in _posts/
# Format: YYYY-MM-DD-title-slug.md
```

**Post Front Matter Template**:

```yaml
---
layout: post
title: "Your Post Title Here"
date: 2026-01-09 10:00:00 -0600
author: "Author Name"
author_title: "Author Role"
author_bio: "Brief bio about the author..."
author_avatar: "/assets/images/authors/name.jpg"
category: "Category Name"
tags: [tag1, tag2, tag3]
featured_image: "/assets/images/blog/post-image.jpg"
excerpt: "Brief description for previews and SEO..."
---

Your content here...
```

## 🎨 Customization

### Colors

Edit `assets/css/main.css`:

```css
:root {
  --primary-500: #22c55e;  /* Main brand color */
  --primary-600: #16a34a;  /* Darker shade */
  --primary-700: #15803d;  /* Even darker */
  /* ... */
}
```

### Fonts

Edit `assets/css/typography.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font');

body {
  font-family: 'Your Font', sans-serif;
}
```

### Navigation

Edit `_layouts/default.html`:

```html
<div class="nav-menu">
  <a href="/your-page" class="nav-link">Your Page</a>
  <!-- Add more links -->
</div>
```

## 📝 Content Guidelines

### Blog Categories

- **Feature Friday**: Highlight platform features
- **Grant Tips**: How-to guides and best practices
- **Success Stories**: Funded organization profiles
- **News**: Updates and announcements
- **Resources**: Tools, templates, guides

### SEO Best Practices

1. Use descriptive titles (50-60 characters)
2. Write compelling excerpts (150-160 characters)
3. Include relevant tags (5-8 per post)
4. Add alt text to images
5. Use headings hierarchically (H2, H3)
6. Internal linking to related posts

### Image Specifications

- **Featured Images**: 1200x630px (2:1 ratio)
- **Author Avatars**: 200x200px (square)
- **In-post Images**: Max width 1200px
- **Format**: JPG or PNG
- **Compression**: Optimize for web (<200KB)

## 🔍 Search Configuration

Search data auto-generates from Jekyll posts. To customize:

Edit `search.json`:

```liquid
[
  {% for post in site.posts %}
    {
      "title": {{ post.title | jsonify }},
      "excerpt": {{ post.excerpt | jsonify }},
      "url": {{ post.url | jsonify }}
      # Add more fields as needed
    }
  {% endfor %}
]
```

## 🌐 Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions builds automatically
3. Live in 2-3 minutes at `https://El-apuesto.github.io/G3-gazette`

### Custom Domain

Add `CNAME` file:

```
blog.granthustle.org
```

Configure DNS:

```
CNAME blog.granthustle.org -> El-apuesto.github.io
```

## ⚙️ Configuration

### Jekyll (_config.yml)

```yaml
title: G³ Gazette
description: Your daily source for grant funding insights
url: "https://blog.granthustle.org"
baseurl: ""

# Build settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Comments (Giscus)
comments:
  enabled: true
  giscus:
    repo: "El-apuesto/G3-gazette"
    repo_id: "your-repo-id"
    category: "Announcements"
    category_id: "your-category-id"
```

## 🧑‍💻 Development

### Adding New Features

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test locally: `bundle exec jekyll serve`
4. Commit: `git commit -am "Description"`
5. Push: `git push origin feature/name`
6. Create pull request

### Testing Checklist

- [ ] All pages load without errors
- [ ] Search works (Ctrl+K)
- [ ] Dark mode toggles properly
- [ ] Mobile menu functions
- [ ] Links work (no 404s)
- [ ] Images load and display
- [ ] Forms submit correctly
- [ ] SEO meta tags present
- [ ] Responsive on mobile/tablet
- [ ] Browser compatibility (Chrome, Firefox, Safari)

## 🐛 Known Issues

None currently. Report issues at: https://github.com/El-apuesto/G3-gazette/issues

## 📊 Analytics

Add Google Analytics in `_layouts/default.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔐 Security

- No user authentication required
- Static site (no server-side vulnerabilities)
- HTTPS enforced via GitHub Pages
- Regular dependency updates

## 📜 License

Copyright © 2026 Grant Hustle. All rights reserved.

## 👥 Team

- **El-apuesto** - Lead Developer
- **Grant Genie Team** - Content & Strategy

## 📧 Contact

- Website: https://granthustle.org
- Email: support@granthustle.org
- Twitter: @GrantGenie

## 🚀 Roadmap

### Q1 2026
- [x] Complete design overhaul
- [x] Search functionality
- [x] Dark mode
- [ ] Newsletter integration
- [ ] Interactive grant finder

### Q2 2026
- [ ] Webinar series pages
- [ ] User comments (Giscus)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Built with ❤️ by the Grant Genie Team**

For daily grant opportunities and funding insights, visit [Grant Geenie App](https://app.granthustle.org)

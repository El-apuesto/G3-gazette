# G³ - Grant Genie Gazette

Automated blog with AI-powered content generation, comment moderation, and weekly article features.

## Features

### ✅ Implemented
- **Jekyll-based static site** hosted on GitHub Pages
- **Automated deployment** via GitHub Actions
- **Comment system** using GitHub Discussions (giscus)
- **Comment moderation** with automated filtering
- **Daily categories** (7-day themed structure)
- **Weekly article highlighting** on homepage
- **Archive system** for older posts
- **Social sharing** buttons (Twitter, Facebook, LinkedIn, Copy Link)
- **SEO optimization** with meta tags and sitemaps
- **Responsive design** for mobile and desktop
- **Author placeholders** ready for customization

### 🚧 To Be Enhanced with Perplexity
- **Automated content generation** from research
- **AI image generation** for article headers
- **Topic sourcing** for daily articles
- **Advanced analytics** and monitoring

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"

### 2. Enable Discussions (for Comments)
1. Go to repository Settings
2. Scroll to Features section
3. Check "Discussions"
4. Create a category called "Comments"

### 3. Configure Giscus
1. Visit [giscus.app](https://giscus.app)
2. Enter your repository: `El-apuesto/G3-gazette`
3. Copy the generated configuration
4. Update `_config.yml` with your repo_id and category_id

### 4. Customize Content
- Edit `_config.yml` to update site details
- Replace author information
- Modify daily category names if desired
- Update color scheme in `assets/css/custom.css`

## Automated Workflows

### Daily Deployment
- Runs at 9 AM UTC daily
- Checks for scheduled posts
- Rebuilds and deploys site

### Weekly Post Generation
- Runs every Monday at 6 AM UTC
- Creates post template for the week
- Can be triggered manually with custom topics

### Comment Moderation
- Triggered on every new comment
- Filters inappropriate content
- Flags suspicious comments for review
- Creates moderation issues automatically

## Creating Posts

### Manual Method
Create a file in `_posts/` with format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-01-03 09:00:00 -0600
category: Innovation Monday
author: Grant Genie Team
featured_image: /assets/images/your-image.jpg
tags: [innovation, research]
excerpt: "A brief description"
---

Your content here...
```

### Automated Method
1. Go to Actions tab
2. Select "Generate Weekly Blog Post"
3. Click "Run workflow"
4. Enter optional custom topic
5. Select day of week

## Monitoring & Moderation

- Check the Issues tab for flagged comments
- Review comments with `moderation` and `needs-review` labels
- Manually approve or delete flagged content in Discussions

## Next Steps

1. **Enable GitHub Pages** in repository settings
2. **Enable Discussions** for comment system
3. **Configure giscus** with correct IDs
4. **Customize branding** and colors
5. **Integrate Perplexity** for content generation
6. **Add image generation** workflow
7. **Set up analytics** (Google Analytics, Plausible, etc.)

## License

MIT License - Feel free to customize and use!

---

**Built with ❤️ using Jekyll, GitHub Actions, and AI automation**
# Daily Blog Automation Setup Guide

## Overview

Your G³ Gazette blog now has fully automated daily content generation! The system:
- Runs every day at 6 AM UTC (1 AM EST / 12 AM CST)
- Researches current grant trends and news using Perplexity
- Generates complete, well-written blog posts using Perplexity
- Commits and publishes automatically

## Required Setup

### 1. Add API Key to GitHub Secrets

You need to add **ONE** API key to your repository secrets:

**Perplexity API Key**
1. Go to [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
2. Create an API key
3. In GitHub: Settings → Secrets and variables → Actions → New repository secret
4. Name: `PERPLEXITY_API_KEY`
5. Value: Your Perplexity API key

### 2. How It Works

**Daily Schedule:**
- **Monday**: Innovation Monday - Latest grant innovations and new programs
- **Tuesday**: Tutorial Tuesday - How-to guides and step-by-step tutorials
- **Wednesday**: Wisdom Wednesday - Expert insights and grant strategies
- **Thursday**: Thought Thursday - Analysis and trend predictions
- **Friday**: Feature Friday - Success stories and grant spotlights
- **Saturday**: Strategy Saturday - Planning and portfolio management
- **Sunday**: Summary Sunday - Weekly roundups and news

**Content Generation Process:**
1. Workflow triggers at scheduled time
2. System determines today's category based on day of week
3. Perplexity's `llama-3.1-sonar-large-128k-online` model researches the topic AND writes the full article in one step
4. Post is committed to `_posts/` folder
5. Jekyll automatically rebuilds and publishes the site

### 3. Manual Triggering

You can also manually generate posts:

1. Go to Actions tab in GitHub
2. Select "Daily Blog Post Generation"
3. Click "Run workflow"
4. Optional: Enter a custom topic
5. Optional: Override the day of week

### 4. Cost Estimation

**Perplexity API:**
- Uses Perplexity's online models for research + writing
- ~$0.15-0.25 per post depending on length
- ~$5-8/month for daily posts

**No OpenAI Required**
- This setup runs entirely on Perplexity.

## Troubleshooting

**Posts not generating:**
- Check if `PERPLEXITY_API_KEY` is correctly set in repository secrets
- Verify API key is valid and has credits
- Check Actions logs for error messages

**Content quality issues:**
- The prompt is configured to be professional and authoritative.
- If you need changes, edit `.github/workflows/daily-post-generation.yml`

---

## Ready to Go!

Once you add the single `PERPLEXITY_API_KEY`, your blog will automatically:
✅ Research trending grant topics daily
✅ Generate high-quality, informative articles
✅ Publish new content every single day
✅ Keep your blog fresh and engaging

No manual work required - just sit back and watch your blog grow!

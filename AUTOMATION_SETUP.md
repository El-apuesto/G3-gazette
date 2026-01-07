# Daily Blog Automation Setup Guide

## Overview

Your G³ Gazette blog now has fully automated daily content generation! The system:
- Runs every day at 6 AM UTC (1 AM EST / 12 AM CST)
- Researches current grant trends and news
- Generates complete, well-written blog posts
- Commits and publishes automatically

## Required Setup

### 1. Add API Keys to GitHub Secrets

You need to add two API keys to your repository secrets:

**Perplexity API Key** (for research)
1. Go to [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
2. Create an API key
3. In GitHub: Settings → Secrets and variables → Actions → New repository secret
4. Name: `PERPLEXITY_API_KEY`
5. Value: Your Perplexity API key

**OpenAI API Key** (for content generation)
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create an API key
3. In GitHub: Settings → Secrets and variables → Actions → New repository secret
4. Name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key

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
3. Perplexity API researches current grant topics and trends
4. OpenAI GPT-4 generates a comprehensive 800-1200 word article
5. Post is committed to `_posts/` folder
6. Jekyll automatically rebuilds and publishes the site

### 3. Manual Triggering

You can also manually generate posts:

1. Go to Actions tab in GitHub
2. Select "Daily Blog Post Generation"
3. Click "Run workflow"
4. Optional: Enter a custom topic
5. Optional: Override the day of week

### 4. Research Topics by Category

The system automatically researches relevant topics:

- **Innovation Monday**: Latest grant funding innovations, new programs, tech developments
- **Tutorial Tuesday**: Grant writing tips, application processes, best practices
- **Wisdom Wednesday**: Expert insights, successful strategies, funding wisdom
- **Thought Thursday**: Trend analysis, future predictions, ecosystem changes
- **Feature Friday**: Success stories, grant spotlights, featured opportunities
- **Strategy Saturday**: Application strategies, portfolio planning, funding approaches
- **Summary Sunday**: Weekly news roundup, deadline summaries, grant highlights

### 5. Fallback Behavior

If API keys are not configured or research fails:
- A basic template post is created
- An issue is automatically created for manual review
- You'll get a notification to add content manually

## Cost Estimation

**Perplexity API:**
- ~$0.20 per post (research)
- ~$6/month for daily posts

**OpenAI API (GPT-4):**
- ~$0.30-0.50 per post (content generation)
- ~$9-15/month for daily posts

**Total: ~$15-21/month for fully automated daily content**

## Customization

Edit `.github/workflows/daily-post-generation.yml` to:
- Change posting schedule (modify `cron` expression)
- Adjust research queries for each category
- Modify post length and style
- Change AI models (use GPT-3.5 to reduce costs)

## Monitoring

- Check Actions tab for workflow runs
- Failed runs automatically create GitHub issues
- Review generated posts in `_posts/` folder
- Posts publish immediately after generation

## Alternative: Use Perplexity Only

If you want to reduce costs, you can use only Perplexity for both research and generation:
- Perplexity's Sonar models can generate full articles
- Adjust the workflow to skip OpenAI calls
- Cost: ~$6-8/month instead of ~$15-21/month

## Testing

Test the automation:
1. Go to Actions → Daily Blog Post Generation
2. Click "Run workflow"
3. Enter a test topic like "Grant writing tips for beginners"
4. Check if post appears in `_posts/`
5. Verify it displays correctly on your blog

## Troubleshooting

**Posts not generating:**
- Check if API keys are correctly set in repository secrets
- Verify API keys are valid and have credits
- Check Actions logs for error messages

**Content quality issues:**
- Adjust the prompts in the workflow file
- Try different AI models
- Modify temperature settings for more/less creativity

**Scheduling issues:**
- GitHub Actions can have 10-15 minute delays
- Check timezone settings (currently UTC)
- Verify cron syntax is correct

---

## Ready to Go!

Once you add the two API keys, your blog will automatically:
✅ Research trending grant topics daily
✅ Generate high-quality, informative articles
✅ Publish new content every single day
✅ Keep your blog fresh and engaging

No manual work required - just sit back and watch your blog grow!

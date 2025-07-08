# Portfolio Website

A modern, responsive portfolio website built with Next.js and powered by Cosmic CMS. This portfolio showcases projects, skills, work experience, and client testimonials with a clean, professional design.

![Portfolio Website](https://imgix.cosmicjs.com/48dcc270-5bb9-11f0-a051-23c10f41277a-photo-1556742049-0cfed4f6a45d-1751951179387.jpg?w=1200&h=600&fit=crop&auto=format,compress)

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-first approach with smooth animations
- 🚀 Built with Next.js 15 and TypeScript for performance
- 💼 Dynamic project showcase with filtering capabilities
- 🛠️ Skills organized by category with proficiency levels
- 👔 Work experience timeline with company details
- 💬 Client testimonials with ratings and photos
- 🔍 SEO optimized with proper meta tags
- ⚡ Fast loading with optimized images using imgix
- 📊 Interactive components and smooth user experience

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=portfolio-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" to cosmic config"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Grid, Flexbox
- **CMS**: Cosmic CMS with staging environment
- **Deployment**: Vercel-ready configuration
- **Icons**: Lucide React for consistent iconography
- **Images**: Imgix optimization for fast loading
- **Fonts**: Inter font family for modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your portfolio content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Projects
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills by Category
```typescript
const { objects: skills } = await cosmic.objects
  .find({ 
    type: 'skills',
    'metadata.category': 'frontend'
  })
  .props(['title', 'metadata'])
```

### Getting Work Experience
```typescript
const { objects: experience } = await cosmic.objects
  .find({ type: 'work-experience' })
  .sort({ 'metadata.start_date': -1 })
  .depth(1)
```

## Cosmic CMS Integration

This portfolio connects to your Cosmic bucket to dynamically display:

- **Projects**: Showcase your development work with images, technologies, and links
- **Skills**: Display technical skills organized by category and proficiency level
- **Work Experience**: Professional timeline with company details and descriptions
- **Testimonials**: Client feedback with photos, ratings, and company information

The content is automatically updated when you modify objects in your Cosmic dashboard.

## Deployment Options

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in your Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY` 
   - `COSMIC_WRITE_KEY`
3. Deploy automatically with every push to main branch

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

For production deployments, ensure all environment variables are properly configured in your hosting platform.
<!-- README_END -->
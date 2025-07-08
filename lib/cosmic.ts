import { createBucketClient } from '@cosmicjs/sdk';
import { Project, Skill, WorkExperience, Testimonial } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Project[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

// Fetch all skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Skill[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch skills:', error);
    return [];
  }
}

// Fetch skills by category
export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'skills',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Skill[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch skills by category:', error);
    return [];
  }
}

// Fetch work experience
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('-metadata.start_date')
      .depth(1);
    return response.objects as WorkExperience[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch work experience:', error);
    return [];
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
}

// Fetch single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'projects',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as Project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Failed to fetch project:', error);
    return null;
  }
}
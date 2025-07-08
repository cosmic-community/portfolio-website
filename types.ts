// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type_slug: 'projects';
  metadata: {
    project_name?: string;
    description?: string;
    technologies?: string;
    live_url?: string;
    github_url?: string;
    project_image?: {
      url: string;
      imgix_url: string;
    };
    project_status?: {
      key: ProjectStatus;
      value: string;
    };
  };
}

// Skill interface
export interface Skill extends CosmicObject {
  type_slug: 'skills';
  metadata: {
    skill_name?: string;
    category?: {
      key: SkillCategory;
      value: string;
    };
    proficiency_level?: {
      key: ProficiencyLevel;
      value: string;
    };
    description?: string;
  };
}

// Work Experience interface
export interface WorkExperience extends CosmicObject {
  type_slug: 'work-experience';
  metadata: {
    company_name?: string;
    job_title?: string;
    start_date?: string;
    end_date?: string | null;
    is_current?: boolean;
    job_description?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    location?: string;
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type_slug: 'testimonials';
  metadata: {
    client_name?: string;
    client_position?: string;
    company?: string;
    testimonial_quote?: string;
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    rating?: {
      key: string;
      value: string;
    };
  };
}

// Type literals for select-dropdown values
export type ProjectStatus = 'completed' | 'in_progress' | 'planned';
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'design';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type_slug === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type_slug === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type_slug === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type_slug === 'testimonials';
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  className?: string;
}

export interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export interface ExperienceCardProps {
  experience: WorkExperience;
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}
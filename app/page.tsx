import { cosmic } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'

async function getPortfolioData() {
  try {
    // Fetch all portfolio data in parallel
    const [projectsResponse, skillsResponse, experienceResponse, testimonialsResponse] = await Promise.all([
      cosmic.objects.find({ type: 'projects' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({ type: 'skills' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({ type: 'work-experience' }).props(['id', 'title', 'slug', 'metadata']).depth(1),
      cosmic.objects.find({ type: 'testimonials' }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    ])

    return {
      projects: projectsResponse.objects as Project[],
      skills: skillsResponse.objects as Skill[],
      experience: experienceResponse.objects as WorkExperience[],
      testimonials: testimonialsResponse.objects as Testimonial[]
    }
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    // Return empty arrays if there's an error
    return {
      projects: [] as Project[],
      skills: [] as Skill[],
      experience: [] as WorkExperience[],
      testimonials: [] as Testimonial[]
    }
  }
}

export default async function Home() {
  const { projects, skills, experience, testimonials } = await getPortfolioData()

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experience} />
      <TestimonialsSection testimonials={testimonials} />
      <Footer />
    </main>
  )
}
import Hero from '@/components/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'

export default async function Home() {
  // Fetch all data in parallel
  const [projects, skills, experience, testimonials] = await Promise.all([
    getProjects() as Promise<Project[]>,
    getSkills() as Promise<Skill[]>,
    getWorkExperience() as Promise<WorkExperience[]>,
    getTestimonials() as Promise<Testimonial[]>
  ])

  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <TestimonialsSection testimonials={testimonials} />
      <Footer />
    </main>
  )
}
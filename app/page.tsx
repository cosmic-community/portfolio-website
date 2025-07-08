import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'
import Hero from '@/components/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const [projects, skills, experience, testimonials] = await Promise.all([
    getProjects(),
    getSkills(),
    getWorkExperience(),
    getTestimonials(),
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      
      <ProjectsSection projects={projects as Project[]} />
      
      <SkillsSection skills={skills as Skill[]} />
      
      <ExperienceSection experience={experience as WorkExperience[]} />
      
      <TestimonialsSection testimonials={testimonials as Testimonial[]} />
      
      <Footer />
    </main>
  )
}
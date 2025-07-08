import { Skill } from '@/types'

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.metadata.category?.value || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getProficiencyColor = (level?: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500'
      case 'advanced':
        return 'bg-blue-500'
      case 'intermediate':
        return 'bg-yellow-500'
      case 'beginner':
        return 'bg-gray-500'
      default:
        return 'bg-gray-400'
    }
  }

  if (skills.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{skill.metadata.skill_name}</h4>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs text-white ${getProficiencyColor(skill.metadata.proficiency_level?.key)}`}
                      >
                        {skill.metadata.proficiency_level?.value}
                      </span>
                    </div>
                    {skill.metadata.description && (
                      <p className="text-sm text-gray-600">{skill.metadata.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
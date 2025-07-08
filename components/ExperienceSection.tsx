import { WorkExperience } from '@/types'

interface ExperienceSectionProps {
  experiences: WorkExperience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.metadata.start_date || '').getTime()
    const dateB = new Date(b.metadata.start_date || '').getTime()
    return dateB - dateA
  })

  if (experiences.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and key accomplishments in various roles.
          </p>
        </div>

        <div className="space-y-8">
          {sortedExperiences.map((experience, index) => (
            <div key={experience.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4">
                {experience.metadata.company_logo?.imgix_url && (
                  <img
                    src={`${experience.metadata.company_logo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={experience.metadata.company_name || 'Company logo'}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {experience.metadata.job_title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {experience.metadata.company_name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 md:mt-0">
                      <p>
                        {formatDate(experience.metadata.start_date)} - {formatDate(experience.metadata.end_date)}
                      </p>
                      {experience.metadata.location && (
                        <p>{experience.metadata.location}</p>
                      )}
                      {experience.metadata.is_current && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                          Current Position
                        </span>
                      )}
                    </div>
                  </div>
                  {experience.metadata.job_description && (
                    <p className="text-gray-700 leading-relaxed">
                      {experience.metadata.job_description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
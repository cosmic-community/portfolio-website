import { WorkExperience } from '@/types'

interface ExperienceSectionProps {
  experience: WorkExperience[]
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
  }

  const calculateDuration = (startDate?: string, endDate?: string | null) => {
    if (!startDate) return ''
    
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My professional journey and the roles that have shaped my expertise in software development.
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline line */}
              {index < experience.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-300" />
              )}
              
              <div className="flex items-start space-x-4">
                {/* Timeline dot */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  exp.metadata.is_current ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {exp.metadata.company_logo?.imgix_url ? (
                    <img 
                      src={`${exp.metadata.company_logo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                      alt={`${exp.metadata.company_name} logo`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-4 h-4 bg-white rounded-full" />
                  )}
                </div>

                {/* Experience card */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.metadata.job_title}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.metadata.company_name}
                      </p>
                      {exp.metadata.location && (
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.metadata.location}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-0 text-sm text-gray-500 sm:text-right">
                      <p className="font-medium">
                        {formatDate(exp.metadata.start_date)} - {formatDate(exp.metadata.end_date)}
                      </p>
                      <p className="text-xs">
                        {calculateDuration(exp.metadata.start_date, exp.metadata.end_date)}
                      </p>
                      {exp.metadata.is_current && (
                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {exp.metadata.job_description && (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {exp.metadata.job_description}
                      </p>
                    </div>
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
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const technologies = project.metadata.technologies?.split(',').map(tech => tech.trim()) || []
  
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'planned':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Project Image */}
      {project.metadata.project_image?.imgix_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={`${project.metadata.project_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={project.metadata.project_name || project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {project.metadata.project_name || project.title}
          </h3>
          {project.metadata.project_status && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.metadata.project_status.key)}`}>
              {project.metadata.project_status.value}
            </span>
          )}
        </div>

        {/* Description */}
        {project.metadata.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.metadata.description}
          </p>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 6 && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                  +{technologies.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {project.metadata.live_url && (
            <a
              href={project.metadata.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.metadata.github_url && (
            <a
              href={project.metadata.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
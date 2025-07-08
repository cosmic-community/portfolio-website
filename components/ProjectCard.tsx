import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const technologies = project.metadata.technologies?.split(',').map(tech => tech.trim()) || []

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      {/* Project Image */}
      {project.metadata.project_image?.imgix_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${project.metadata.project_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={project.metadata.project_name || project.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {project.metadata.project_status && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.metadata.project_status.key === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : project.metadata.project_status.key === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {project.metadata.project_status.value}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {project.metadata.project_name || project.title}
        </h3>
        
        {project.metadata.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.metadata.description}
          </p>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.metadata.live_url && (
            <a
              href={project.metadata.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
import { Testimonial } from '@/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const renderStars = (rating?: { key: string; value: string }) => {
    const numStars = rating ? parseInt(rating.key) : 5
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < numStars ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What clients and colleagues say about working with me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.metadata.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6">
                <p className="italic">"{testimonial.metadata.testimonial_quote}"</p>
              </blockquote>

              {/* Client info */}
              <div className="flex items-center">
                {testimonial.metadata.client_photo?.imgix_url && (
                  <img
                    src={`${testimonial.metadata.client_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={testimonial.metadata.client_name || 'Client'}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.metadata.client_name}
                  </p>
                  {testimonial.metadata.client_position && (
                    <p className="text-sm text-gray-600">
                      {testimonial.metadata.client_position}
                      {testimonial.metadata.company && (
                        <span> at {testimonial.metadata.company}</span>
                      )}
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
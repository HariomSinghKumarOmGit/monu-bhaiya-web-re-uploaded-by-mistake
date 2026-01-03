import React from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, Award, ChevronLeft } from 'lucide-react'
import { menPowerServices } from '../data/menPowerData'
import Header from '../components/Header'

const MenPowerList = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-[#0A1128] mb-6 font-semibold transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0A1128]">All Workforce Services</h1>
            <p className="text-slate-500 mt-2">{menPowerServices.length} services available</p>
          </div>

          <div className="space-y-6">
            {menPowerServices.map((service) => (
              <Link
                key={service.id}
                to={`/men-power/${service.id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                      {service.type}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-[#0A1128] mb-2">
                          {service.title}
                        </h2>
                        <p className="text-slate-500 font-medium mb-4">
                          📍 {service.location}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm font-semibold">{service.teamSize}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-semibold">{service.experience}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {service.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {service.skills.length > 4 && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                              +{service.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <span className="px-6 py-2.5 bg-slate-50 text-[#0A1128] rounded-lg font-bold text-sm hover:bg-orange-600 hover:text-white transition-all">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MenPowerList

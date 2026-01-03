import React from 'react'
import { Link } from 'react-router-dom'
import { Bed, Bath, Square, ChevronLeft } from 'lucide-react'
import { properties } from '../data/propertyData'
import Header from '../components/Header'

const PropertyList = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24 pb-16 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-[#0A1128] mb-6 font-semibold transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0A1128]">All Properties</h1>
            <p className="text-slate-500 mt-2">{properties.length} properties available for sale</p>
          </div>

          {/* Property List - Stacked View */}
          <div className="space-y-6">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/buy-rent/${property.id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Property Image */}
                  <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      {property.type}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-[#0A1128] mb-2">
                          {property.title}
                        </h2>
                        <p className="text-slate-500 font-medium mb-4">
                          📍 {property.location}
                        </p>

                        {/* Property Stats */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Bed className="w-4 h-4" />
                            <span className="text-sm font-semibold">{property.bedrooms} Beds</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Bath className="w-4 h-4" />
                            <span className="text-sm font-semibold">{property.bathrooms} Baths</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Square className="w-4 h-4" />
                            <span className="text-sm font-semibold">{property.area} sq ft</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {property.features.slice(0, 4).map((feature, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {property.features.length > 4 && (
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                              +{property.features.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="mt-4 flex justify-end">
                        <span className="px-6 py-2.5 bg-slate-50 text-[#0A1128] rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-all">
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

export default PropertyList

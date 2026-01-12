import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Phone, Mail, X, User, MessageSquare } from 'lucide-react'

const ContactModal = ({ isOpen, onClose, title = "Contact Us" }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const contactName = "Prabhat kr Jha"
  const contactNumber = "9953330277"
  const contactEmail = "prabhat58236@gmail.com"

  // Using Portal to render at body level to ensure perfect centering and solve all scroll/parent issues
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Centered every time */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full transition-all z-10 active:scale-90 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="bg-[#0A1128] p-8 pt-10 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
          <h2 className="text-3xl font-black tracking-tight">{title}</h2>
          <p className="text-blue-300/80 mt-2 font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Direct Consultation
          </p>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Agent Profile Block */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-tr from-blue-600 to-teal-400 rounded-full blur opacity-25" />
              <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                <div className="bg-blue-50 w-full h-full flex items-center justify-center text-blue-600">
                  <User size={48} strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-black text-[#0A1128]">{contactName}</h3>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] bg-blue-50 px-3 py-1 rounded-full mt-2 inline-block">
                Principal Consultant
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <a 
              href={`tel:${contactNumber}`}
              className="group flex items-center justify-between w-full p-5 bg-[#0A1128] text-white rounded-2xl font-bold hover:bg-blue-600 transition-all transform hover:-translate-y-1 active:scale-[0.98] shadow-xl shadow-blue-950/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-blue-300 text-[10px] uppercase tracking-wider font-bold">Call Now</p>
                  <p className="text-lg">+91 {contactNumber}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                <span className="text-xl">→</span>
              </div>
            </a>

            <a 
              href={`mailto:${contactEmail}`}
              className="group flex items-center justify-between w-full p-5 bg-slate-50 text-[#0A1128] rounded-2xl font-bold hover:bg-slate-100 transition-all transform hover:-translate-y-1 active:scale-[0.98] border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Send Email</p>
                  <p className="text-sm font-bold text-slate-700">{contactEmail}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-400 transition-colors">
                <span className="text-xl">→</span>
              </div>
            </a>
          </div>

          <p className="text-center text-slate-400 text-xs font-medium">
            Available 24/7 for premium real estate inquiries.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ContactModal

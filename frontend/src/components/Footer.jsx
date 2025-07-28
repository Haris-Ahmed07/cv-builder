import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-lg rounded-t-lg py-6 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* copyright text with current year */}
        <p className="text-gray-700 text-sm">
          © {new Date().getFullYear()} CV Builder Pro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

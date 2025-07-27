import React from 'react'

export default function Footer() {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-6">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} CV Builder Pro. All rights reserved.
                    </p>
                </div>
            </footer></div>
    )
}

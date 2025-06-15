import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader
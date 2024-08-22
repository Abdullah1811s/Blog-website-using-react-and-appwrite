import React from 'react';

function Button({ children, className = '', bgColor = 'bg-orange-600', ...props }) {
    return (
        <button 
            className={`text-white px-6 py-2 rounded-lg h-10 text-center font-semibold shadow-md ${bgColor} hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-200 ease-in-out ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;

import React, { useId, forwardRef } from 'react';

const Select = forwardRef(({
    className = '',
    options,
    label,
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="w-full flex items-center justify-center">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-bold text-white-700 mb-2"
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`${className} block w-full px-3 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none focus:ring-0 focus:border-gray-900 duration-200`}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option} className="text-white-700 bg-gray">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;

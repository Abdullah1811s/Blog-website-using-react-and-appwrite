import React, { useId, forwardRef } from 'react';

const Input = forwardRef((
  {
    label,
    type = 'text',
    className = '',
    ...props
  }, ref
) => {
  const id = useId();
  return (
    <div className="w-full flex">
      {label &&
        <label className="inline-block mr-3 m-2 font-bold   "
          htmlFor={id}>
          {label}
        </label>
      }
      <input type={type} id={id}
         className={`${className} px-3 py-2 bg-transparent text-black outline-none border-b-2 border-gray-300 focus:border-green-500
         duration-200 w-full`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;

import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ type = "text", className = "", label, ...props }, ref) => {
    const id = useId();
    return (
      <div>
        {label && (
          <label className="inline-block mb-1 pl-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          {...props}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        />
      </div>
    );
  }
);

export default Input;
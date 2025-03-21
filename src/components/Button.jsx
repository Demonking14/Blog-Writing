import React from 'react';

function Button({
    children, 
    type = 'button',
    className = '',
    textColor = 'text-white',
    bgColor = 'bg-blue-600',
    ...props
}) {
  return (
    <button 
      type={type} 
      className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
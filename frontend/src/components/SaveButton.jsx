import React from 'react';

const SaveButton = ({ className = '', children = 'Save Resume' }) => {
  const handleSave = () => {
    // Save functionality will be implemented here
    console.log('Saving resume...');
  };

  return (
    <button 
      onClick={handleSave}
      className={`
        bg-blue-600 hover:bg-blue-700 
        text-white font-semibold 
        rounded-lg w-full h-full 
        transition-all duration-200 
        transform hover:scale-[1.02] active:scale-[0.98]
        flex items-center justify-center
        ${className}
      `}
    >
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};

export default SaveButton;

import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className='hidden lg:flex flex-col items-center justify-center bg-base-200 p-12'>
      {/* Grid of squares */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`w-16 aspect-square rounded-2xl bg-blue-500/10 ${i % 2 === 0 ? "animate-pulse" : ""}`}
          />
        ))}
      </div>
      {/* Title and Subtitle */}
      <h2 className='text-2xl font-bold mb-2'>{title}</h2>
      <p className='text-base-content/60 text-center'>{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;

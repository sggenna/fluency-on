import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showTagline = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Graphic Icon */}
      <div className="relative flex-shrink-0 w-10 h-12">
        {/* Dark gray rounded rectangle (bottom, tilted counter-clockwise) */}
        <div 
          className="absolute bottom-0 left-0 w-8 h-10 rounded-md transform -rotate-3"
          style={{ backgroundColor: '#253439' }}
        />
        {/* Gold yellow rounded rectangle (top, slightly above and to the right, also tilted) */}
        <div 
          className="absolute top-1 left-1.5 w-6 h-8 rounded-md transform rotate-1 relative flex items-center justify-center"
          style={{ backgroundColor: '#fbb80f' }}
        >
          {/* Speech bubble icon outline inside the gold yellow shape */}
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            style={{ color: '#253439' }}
            className="relative"
          >
            <path
              d="M1 1h10v7H4l-3 3V8H1V1z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        {/* Light yellow circle (smaller, on top-right) */}
        <div 
          className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: '#fbee0f' }}
        />
        {/* Gold yellow circle (larger, slightly overlapping with light yellow) */}
        <div 
          className="absolute top-0.5 right-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: '#fbb80f' }}
        />
      </div>

      {/* Text Elements */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span 
            className="text-xl md:text-2xl font-bold leading-tight"
            style={{ color: '#253439' }}
          >
            Fluency
          </span>
          <span 
            className="text-xl md:text-2xl font-bold leading-tight"
            style={{ color: '#fbb80f' }}
          >
            On
          </span>
        </div>
        {showTagline && (
          <>
            {/* Gold yellow thin horizontal line */}
            <div 
              className="h-0.5 mt-0.5 mb-1"
              style={{ backgroundColor: '#fbb80f', width: '60px' }}
            />
            <span 
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: '#7c898b' }}
            >
              ESCOLA DIGITAL
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Logo;


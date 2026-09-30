'use client';

import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number; // kept in the interface so existing callers don't break, but not used
}

// Simple card with a subtle hover lift — no GSAP, no 3D math
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        // Slight lift on hover
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px) scale(1.02)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
      }}
      onMouseLeave={(e) => {
        // Reset back to normal
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '';
      }}
    >
      {children}
    </div>
  );
};




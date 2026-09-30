'use client';

import React from 'react';

interface ThreeMascotProps {
  isTyping?: boolean;
  isSpeaking?: boolean;
}

// Simple shoe mascot using CSS animations — no Three.js, no WebGL
export const ThreeMascot: React.FC<ThreeMascotProps> = ({ isTyping = false }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 select-none">

      {/* Big shoe emoji with CSS float animation */}
      <div
        style={{
          fontSize: '80px',
          lineHeight: 1,
          filter: 'drop-shadow(0 8px 24px rgba(59,130,246,0.5))',
          animation: isTyping
            ? 'mascot-bounce 0.4s ease-in-out infinite alternate'
            : 'mascot-float 3s ease-in-out infinite',
        }}
      >
        👟
      </div>

      {/* Soft glow shadow below the shoe */}
      <div
        style={{
          width: '80px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(59,130,246,0.3)',
          filter: 'blur(8px)',
          marginTop: '8px',
          animation: 'mascot-shadow 3s ease-in-out infinite',
        }}
      />

      {/* Small status label */}
      <p
        style={{
          marginTop: '12px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        {isTyping ? '✨ Thinking...' : 'Comfort Footwear AI'}
      </p>

      {/* CSS keyframes — scoped to this component via a style tag */}
      <style>{`
        @keyframes mascot-float {
          0%   { transform: translateY(0px);   }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0px);   }
        }
        @keyframes mascot-bounce {
          0%   { transform: translateY(0px) scale(1);     }
          100% { transform: translateY(-6px) scale(1.06); }
        }
        @keyframes mascot-shadow {
          0%   { opacity: 0.8; transform: scaleX(1);   }
          50%  { opacity: 0.3; transform: scaleX(0.6); }
          100% { opacity: 0.8; transform: scaleX(1);   }
        }
      `}</style>
    </div>
  );
};




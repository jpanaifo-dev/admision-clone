import React from 'react';

interface BackgroundGradientProps {
  hideOverlay?: boolean;
  [key: string]: unknown
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ hideOverlay, ...props }) => {
  const colors = [
    '#1f2937', // bg-primary-800
    '#3b82f6', // bg-secondary-500
    '#06b6d4', // bg-cyan-500
    '#14b8a6', // bg-teal-500
  ];

  const fallbackBackground = `
    radial-gradient(at top left, ${colors[0]} 30%, transparent 80%),
    radial-gradient(at bottom, ${colors[1]} 0%, transparent 60%),
    radial-gradient(at bottom left, ${colors[2]} 0%, transparent 50%),
    radial-gradient(at top right, ${colors[3]} 0%, transparent),
    radial-gradient(at bottom right, ${colors[0]} 0%, transparent 50%)
  `;

  const gradientOverlay = `linear-gradient(0deg, ${hideOverlay ? 'transparent' : 'rgba(255, 255, 255, 0.6)'} 60%, rgba(0, 0, 0, 0) 100%)`;

  return (
    <div
      className="absolute top-0 left-0 z-0 w-full h-screen pointer-events-none dark:opacity-50 opacity-30"
      style={{
        backgroundImage: fallbackBackground,
        backgroundBlendMode: 'saturation',
      }}
      {...props}
    >
      {!hideOverlay && (
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: gradientOverlay,
          }}
        ></div>
      )}
    </div>
  );
};

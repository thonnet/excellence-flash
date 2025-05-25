
import React, { useState, useEffect } from 'react';

interface AlternatingBaselineProps {
  baselines: string[];
  interval?: number;
  className?: string;
}

export const AlternatingBaseline: React.FC<AlternatingBaselineProps> = ({
  baselines,
  interval = 7000, // 7 seconds total (3s transition + 4s pause)
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || baselines.length <= 1) return;

    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % baselines.length);
        setIsVisible(true);
      }, 300); // Fade out duration
      
    }, interval);

    return () => clearInterval(timer);
  }, [baselines.length, interval, isPaused]);

  if (baselines.length === 0) return null;

  return (
    <div 
      className={`alternating-baseline ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <p 
        className={`baseline-text ${isVisible ? 'visible' : 'hidden'}`}
        style={{ color: 'var(--text-muted)' }}
      >
        <em>{baselines[currentIndex]}</em>
      </p>
    </div>
  );
};

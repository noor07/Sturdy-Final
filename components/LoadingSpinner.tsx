
import React from 'react';

interface LoadingSpinnerProps {
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "AI is thinking..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-300 text-base">{text}</p>
    </div>
  );
};

export default LoadingSpinner;

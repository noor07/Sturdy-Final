import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
         <span className="text-sm font-semibold text-slate-300">Topic Mastery</span>
         <span className="text-sm font-bold text-cyan-300">{`${Math.round(progress)}%`}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-cyan-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

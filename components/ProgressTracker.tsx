
import React from 'react';
import type { Progress } from '../types';
import { CheckCircleIcon, PuzzlePieceIcon, ClockIcon } from './icons/Icons';

interface ProgressTrackerProps {
  progress: Progress;
  notesGenerated: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress, notesGenerated }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl ring-1 ring-white/10">
      <h3 className="text-lg font-bold mb-4 text-white">Your Progress</h3>
      <div className="grid grid-cols-1 gap-3">
        <ProgressItem 
          icon={<CheckCircleIcon colorClass={notesGenerated ? 'text-green-400' : 'text-slate-500'} />}
          label="Study Notes"
          value={notesGenerated ? 'Generated' : 'Not Yet'}
          colorClass={notesGenerated ? 'text-green-400' : 'text-slate-500'}
        />
        <ProgressItem 
          icon={<PuzzlePieceIcon colorClass={progress.quizzesTaken > 0 ? 'text-cyan-400' : 'text-slate-500'}/>}
          label="Quizzes Taken"
          value={progress.quizzesTaken}
          colorClass={progress.quizzesTaken > 0 ? 'text-cyan-300' : 'text-slate-400'}
        />
        <ProgressItem 
          icon={<ClockIcon colorClass={progress.studySessions > 0 ? 'text-purple-400' : 'text-slate-500'}/>}
          label="Focus Sessions"
          value={progress.studySessions}
          colorClass={progress.studySessions > 0 ? 'text-purple-300' : 'text-slate-400'}
        />
      </div>
    </div>
  );
};

interface ProgressItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    colorClass: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ icon, label, value, colorClass }) => (
    <div className="bg-slate-900/50 p-3 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
            {icon}
            <span className="ml-3 text-slate-300 font-semibold text-sm">{label}</span>
        </div>
        <p className={`text-lg font-bold ${colorClass}`}>{value}</p>
    </div>
);


export default ProgressTracker;


import React from 'react';
import type { QuizQuestion, Progress } from '../types';
import { ViewState } from '../types';
import StudyNotes from './StudyNotes';
import Quiz from './Quiz';
import StudyTimer from './StudyTimer';
import ProgressTracker from './ProgressTracker';
import { BookOpenIcon, ClipboardCheckIcon, ClockIcon } from './icons/Icons';

interface DashboardProps {
  onGenerateNotes: () => void;
  onGenerateQuiz: () => void;
  onShowTimer: () => void;
  onQuizComplete: () => void;
  onSessionComplete: () => void;
  onBack: () => void;
  currentView: ViewState;
  studyNotes: string;
  quiz: QuizQuestion[];
  progress: Progress;
}

const Dashboard: React.FC<DashboardProps> = ({
  onGenerateNotes,
  onGenerateQuiz,
  onShowTimer,
  onQuizComplete,
  onSessionComplete,
  onBack,
  currentView,
  studyNotes,
  quiz,
  progress,
}) => {
  if (currentView === ViewState.NOTES) {
    return <StudyNotes notes={studyNotes} onBack={onBack} />;
  }
  if (currentView === ViewState.QUIZ) {
    return <Quiz questions={quiz} onComplete={onQuizComplete} />;
  }
  if (currentView === ViewState.TIMER) {
    return <StudyTimer onBack={onBack} onSessionComplete={onSessionComplete} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <DashboardCard
          title="Generate Study Notes"
          description="Create a comprehensive study guide for your topic."
          icon={<BookOpenIcon />}
          onClick={onGenerateNotes}
        />
        <DashboardCard
          title="Create a Quiz"
          description="Test your knowledge with a multiple-choice quiz."
          icon={<ClipboardCheckIcon />}
          onClick={onGenerateQuiz}
        />
        <DashboardCard
          title="Focus Timer"
          description="Start a Pomodoro session to study without distractions."
          icon={<ClockIcon />}
          onClick={onShowTimer}
        />
      </div>
      <ProgressTracker progress={progress} notesGenerated={!!studyNotes} />
    </div>
  );
};


interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-slate-800 p-6 rounded-xl text-left hover:bg-slate-700/80 transition-all duration-200 transform hover:-translate-y-1 ring-1 ring-white/10 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
  >
    <div className="flex items-center mb-3">
      <div className="bg-slate-700 p-2 rounded-lg mr-4">{icon}</div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
    <p className="text-slate-400 text-sm">{description}</p>
  </button>
);

export default Dashboard;

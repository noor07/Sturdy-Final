import React from 'react';
import type { Screen } from '../App';
import { HomeIcon, FlashcardIcon, NotesIcon, TimetableIcon } from './icons/Icons';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/5' : 'hover:bg-white/10'}`}
  >
    {icon}
    <span className={`text-[10px] transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
  </button>
);

interface BottomNavBarProps {
    activeTab: Screen;
    onNavigate: (screen: Screen) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onNavigate }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
      <div className="glass-card rounded-full p-1 shadow-2xl">
        <div className="flex justify-around items-center">
          <NavItem
            icon={<HomeIcon isActive={activeTab === 'home'} className="w-5 h-5 mb-0.5" />}
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => onNavigate('home')}
          />
          <NavItem
            icon={<FlashcardIcon isActive={activeTab === 'flashcards'} className="w-5 h-5 mb-0.5" />}
            label="Flashcards"
            isActive={activeTab === 'flashcards'}
            onClick={() => onNavigate('flashcards')}
          />
          <NavItem
            icon={<NotesIcon isActive={activeTab === 'notes'} className="w-5 h-5 mb-0.5" />}
            label="Notes"
            isActive={activeTab === 'notes'}
            onClick={() => onNavigate('notes')}
          />
          <NavItem
            icon={<TimetableIcon isActive={activeTab === 'timetable'} className="w-5 h-5 mb-0.5" />}
            label="Timetable"
            isActive={activeTab === 'timetable'}
            onClick={() => onNavigate('timetable')}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
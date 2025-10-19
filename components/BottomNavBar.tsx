import React from 'react';
import type { Screen } from '../App';

const MaterialIcon: React.FC<{ name: string, isActive: boolean, isFilled?: boolean }> = ({ name, isActive, isFilled = false }) => (
    <span 
      className={`material-symbols-outlined transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-400'}`}
      style={{ fontVariationSettings: `'FILL' ${isFilled && isActive ? 1 : 0}`}}
    >
      {name}
    </span>
);

const NavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-[70px] h-[52px] rounded-xl transition-all duration-300 ${isActive ? '' : 'hover:bg-white/10'}`}
  >
    <MaterialIcon name={icon} isActive={isActive} isFilled />
    <span className={`text-[11px] mt-0.5 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
  </button>
);

interface BottomNavBarProps {
    activeTab: Screen;
    onNavigate: (screen: Screen) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onNavigate }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
      <div className="glass-card rounded-full p-1.5 shadow-2xl">
        <div className="flex justify-around items-center">
          <NavItem
            icon="home"
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => onNavigate('home')}
          />
          <NavItem
            icon="style"
            label="Flashcards"
            isActive={activeTab === 'flashcards'}
            onClick={() => onNavigate('flashcards')}
          />
          <NavItem
            icon="description"
            label="Notes"
            isActive={activeTab === 'notes'}
            onClick={() => onNavigate('notes')}
          />
          <NavItem
            icon="calendar_today"
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
import React from 'react';

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

const BottomNavBar: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
      <div className="glass-card rounded-full p-1.5 shadow-2xl">
        <div className="flex justify-around items-center">
          <NavItem
            icon="home"
            label="Home"
            isActive={activeTab === 'Home'}
            onClick={() => setActiveTab('Home')}
          />
          <NavItem
            icon="style"
            label="Flashcards"
            isActive={activeTab === 'Flashcards'}
            onClick={() => setActiveTab('Flashcards')}
          />
          <NavItem
            icon="description"
            label="Notes"
            // Fix: Corrected typo from `active-tab` to `activeTab`. This resolves the `active`, `tab`, and comparison errors.
            isActive={activeTab === 'Notes'}
            onClick={() => setActiveTab('Notes')}
          />
          <NavItem
            icon="calendar_today"
            label="Timetable"
            isActive={activeTab === 'Timetable'}
            onClick={() => setActiveTab('Timetable')}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
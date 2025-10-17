import React from 'react';

interface PersonalizationWelcomeProps {
  onReady: () => void;
}

const PersonalizationWelcome: React.FC<PersonalizationWelcomeProps> = ({ onReady }) => {
  return (
    <div className="min-h-screen bg-[#222428] text-white flex flex-col justify-between p-8 relative overflow-hidden">
      {/* Decorative shape top left */}
      <div className="absolute -top-12 -left-24 w-56 h-56 bg-[#403B5D] rounded-full opacity-60"></div>

      {/* Decorative shape bottom right */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#7D743D] opacity-80 transform rotate-45 rounded-3xl"></div>

      <div className="flex-grow flex flex-col justify-start pt-24 z-10">
        <h1 className="text-4xl font-bold text-white leading-tight max-w-xs">
          Just 5 questions to personalize your path.
        </h1>
      </div>

      <div className="w-full z-10">
        <button
          onClick={onReady}
          className="w-full bg-white text-black font-bold py-4 px-4 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          I'm Ready!
        </button>
      </div>
    </div>
  );
};

export default PersonalizationWelcome;

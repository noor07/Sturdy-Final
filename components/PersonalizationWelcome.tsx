import React from 'react';

interface PersonalizationWelcomeProps {
  onReady: () => void;
}

const PersonalizationWelcome: React.FC<PersonalizationWelcomeProps> = ({ onReady }) => {
  return (
    <div className="h-screen bg-[#1A1C20] text-white flex flex-col justify-center items-center p-8 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-12 -left-24 w-64 h-64 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 glass-card rounded-3xl p-8 max-w-sm w-full flex flex-col text-center shadow-2xl">
        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Just 5 questions to personalize your path.
          </h1>
        </div>

        <div className="mt-12">
          <button
            onClick={onReady}
            className="w-full bg-white text-black font-bold py-4 px-4 rounded-full text-lg transition-transform transform hover:scale-105 active:scale-100 shadow-lg shadow-white/20"
          >
            I'm Ready!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationWelcome;
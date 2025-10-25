import React, { useState } from 'react';
import { Avatars } from './icons/Avatars';

interface PersonalizationQuizProps {
  onComplete: (data: { name: string; avatar: number }) => void;
}

const currentStatusOptions = [
  '10th', '11th', '12th', 'Pursuing Undergraduate',
  'Pursuing Postgraduate', 'Pursuing Doctoral programs', 'Preparing for exams'
];

const mainGoalOptions: Record<string, string[]> = {
  'School-Level & Foundational Exams': [
    'Class 10 Board Exams', 'Class 12 Board Exams',
    'NTSE (National Talent Search Exam)', 'Science/Math Olympiads'
  ],
  'Engineering': [
    'JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'
  ]
};

const lessonTimeOptions = [
  '4 hours/day', '6 hours/day', '8 hours/day', '10 hours/day'
];

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


const PersonalizationQuiz: React.FC<PersonalizationQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    avatar: 8,
    name: '',
    birthYear: '2007',
    currentStatus: '',
    mainGoal: '',
    lessonTime: '6 hours/day'
  });

  const handleNext = () => setStep(prev => prev + 1);

  const handleSelectOptionAndNext = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    handleNext();
  };

  const years = Array.from({ length: 40 }, (_, i) => (new Date().getFullYear() - 10 - i).toString());
  
  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col h-full glass-card p-6 rounded-2xl">
            <div className="flex-grow flex flex-col">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Tell us about you</h1>
                <p className="text-slate-400 text-sm mt-1">This will help us personalize your experience.</p>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden">
                  {React.createElement(Avatars[userData.avatar], { className: 'w-24 h-24' })}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Choose your avatar</label>
                  <div className="grid grid-cols-5 gap-3">
                    {Avatars.map((_, index) => (
                      <button key={index} onClick={() => setUserData(prev => ({ ...prev, avatar: index }))} className={`rounded-full transition-all duration-200 aspect-square transform active:scale-95 ${userData.avatar === index ? 'ring-2 ring-purple-400 scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}>
                        {React.createElement(Avatars[index], { className: 'w-full h-full' })}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="text-sm font-medium text-slate-300 mb-2 block">What should we call you?</label>
                  <input
                    id="name"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g. Alex"
                    className="w-full glass-input text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="birthYear" className="text-sm font-medium text-slate-300 mb-2 block">When were you born?</label>
                  <div className="relative">
                    <select
                      id="birthYear"
                      value={userData.birthYear}
                      onChange={(e) => setUserData(prev => ({...prev, birthYear: e.target.value}))}
                      className="w-full glass-input text-white appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    >
                      {years.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <ChevronDownIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 mt-auto">
              <button onClick={handleNext} disabled={!userData.name} className="w-full bg-slate-200/90 text-slate-900 disabled:bg-slate-700 disabled:text-slate-500 font-bold py-3 px-4 rounded-xl transition-all hover:bg-white transform hover:scale-105 active:scale-100">
                Next
              </button>
            </div>
          </div>
        );
      case 2:
      case 3:
        const isStep2 = step === 2;
        const title = isStep2 ? "What are you currently doing?" : "What's your main goal?";
        const field: keyof typeof userData = isStep2 ? 'currentStatus' : 'mainGoal';

        return (
          <div className="flex flex-col h-full justify-center glass-card p-6 rounded-2xl">
            <h1 className="text-2xl font-bold text-center mb-8">{title}</h1>
            <div className="space-y-3 overflow-y-auto">
              {isStep2 ? (
                currentStatusOptions.map(option => (
                  <button key={option} onClick={() => handleSelectOptionAndNext(field, option)} className="w-full glass-input p-4 rounded-xl text-left hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:-translate-y-1">
                    <span className="text-slate-200 font-medium">{option}</span>
                  </button>
                ))
              ) : (
                Object.entries(mainGoalOptions).map(([category, catOptions]) => (
                  <div key={category}>
                    <h2 className="text-sm font-semibold text-slate-400 my-3 px-1 uppercase tracking-wider">{category}</h2>
                    <div className="space-y-3">
                    {catOptions.map(option => (
                      <button key={option} onClick={() => handleSelectOptionAndNext(field, option)} className="w-full glass-input p-4 rounded-xl text-left hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:-translate-y-1">
                        <span className="text-slate-200 font-medium">{option}</span>
                      </button>
                    ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col h-full glass-card p-6 rounded-2xl">
            <div className="flex-grow flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Select your daily lesson time</h1>
                <p className="text-slate-400 text-sm mt-1">You can change this later in settings.</p>
              </div>
              <div className="space-y-3">
                {lessonTimeOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => setUserData(prev => ({...prev, lessonTime: option}))}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ring-1 focus:outline-none focus:ring-2 focus:ring-purple-400 transform hover:-translate-y-1 ${
                      userData.lessonTime === option ? 'bg-purple-500/40 ring-purple-400' : 'glass-input ring-transparent hover:bg-white/20'
                    }`}
                  >
                    <span className="text-slate-200 font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6 mt-auto">
              <button onClick={() => onComplete({ name: userData.name, avatar: userData.avatar })} className="w-full bg-white text-black font-bold py-4 px-4 rounded-full text-lg transition-transform transform hover:scale-105 active:scale-100 shadow-lg shadow-white/20">
                Start Learning
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C20] text-white p-4 flex flex-col">
       <div className="w-full bg-white/10 rounded-full h-1.5 mb-6 mt-2">
        <div
          className="bg-white h-1.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex-grow flex flex-col">
        {renderStep()}
      </div>
    </div>
  );
};

export default PersonalizationQuiz;
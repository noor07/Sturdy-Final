import React, { useState } from 'react';

interface PersonalizationQuizProps {
  onComplete: () => void;
}

const personalizationQuestions = [
  {
    question: "What's your primary goal for using Studyfy?",
    options: ["Ace my exams", "Learn a new skill", "Help with homework", "Curiosity"],
  },
  {
    question: "How do you prefer to learn?",
    options: ["Visually, with diagrams", "By doing, with examples", "Reading detailed notes", "Listening to explanations"],
  },
  {
    question: "What's your biggest study challenge?",
    options: ["Staying focused", "Understanding complex topics", "Finding motivation", "Memorizing facts"],
  },
  {
    question: "How much time do you usually have for a study session?",
    options: ["Quick bursts (15-30 mins)", "Standard sessions (30-60 mins)", "Deep dives (1 hour+)", "It varies a lot"],
  },
  {
    question: "When you get a question wrong, what's most helpful?",
    options: ["A detailed explanation", "A link to the study material", "Seeing a similar example", "Trying another question"],
  },
];

const PersonalizationQuiz: React.FC<PersonalizationQuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSelectOption = () => {
    if (currentQuestionIndex < personalizationQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentQuestion = personalizationQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / personalizationQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-[#222428] text-white flex flex-col justify-between p-8">
      <div className="flex-grow flex flex-col justify-center">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-purple-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-200 mb-8 max-w-md mx-auto">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 max-w-md mx-auto w-full">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={handleSelectOption}
              className="w-full bg-slate-800/70 p-4 rounded-xl text-left hover:bg-slate-700/80 transition-all duration-200 ring-1 ring-white/10 hover:ring-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <span className="text-slate-300 font-medium">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizationQuiz;

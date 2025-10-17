
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (option: string) => {
    if (selectedAnswers[currentQuestionIndex] !== null) return; // Prevent changing answer
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const score = selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    return (
      <div className="bg-slate-800 p-6 rounded-xl text-center ring-1 ring-white/10">
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Quiz Complete!</h2>
        <p className="text-5xl font-extrabold mb-2">
          {score} <span className="text-xl font-medium text-slate-400">/ {questions.length}</span>
        </p>
        <p className="text-base text-slate-300 mb-6">You got {score} questions right.</p>
        <button onClick={onComplete} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <div className="bg-slate-800 p-4 rounded-xl ring-1 ring-white/10">
      <h2 className="text-xl font-bold text-white mb-1">Quiz Time!</h2>
      <p className="text-slate-400 mb-4 text-sm">Question {currentQuestionIndex + 1} of {questions.length}</p>

      <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
        <p className="text-lg text-slate-200">{currentQuestion.question}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = currentQuestion.correctAnswer === option;
          let buttonClass = 'bg-slate-700 hover:bg-slate-600';
          if (selectedAnswer !== null) {
            if (isCorrect) {
              buttonClass = 'bg-green-500/80 ring-2 ring-green-400';
            } else if (isSelected) {
              buttonClass = 'bg-red-500/80 ring-2 ring-red-400';
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-left transition-all duration-200 text-sm ${buttonClass} ${selectedAnswer === null ? '' : 'cursor-not-allowed'}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="text-right mt-6">
          <button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

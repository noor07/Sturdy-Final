import React, { useState, useCallback, useMemo } from 'react';
import type { QuizQuestion, Progress } from './types';
import { ViewState } from './types';
import { generateStudyNotes, generateQuiz } from './services/geminiService';
import TopicInput from './components/TopicInput';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import Auth from './components/Auth';
import PersonalizationWelcome from './components/PersonalizationWelcome';
import PersonalizationQuiz from './components/PersonalizationQuiz';
import ProgressBar from './components/ProgressBar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete'>('welcome');

  const [topic, setTopic] = useState<string>('');
  const [studyNotes, setStudyNotes] = useState<string>('');
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.IDLE);
  const [progress, setProgress] = useState<Progress>({ quizzesTaken: 0, studySessions: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleStartPersonalization = () => {
    setPersonalizationStep('quiz');
  };

  const handlePersonalizationComplete = () => {
    setPersonalizationStep('complete');
  };

  const handleTopicSubmit = (newTopic: string) => {
    setTopic(newTopic);
    setStudyNotes('');
    setQuiz([]);
    setCurrentView(ViewState.IDLE);
    setProgress({ quizzesTaken: 0, studySessions: 0 });
    setError(null);
  };

  const handleGenerateNotes = useCallback(async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setCurrentView(ViewState.IDLE);
    try {
      const notes = await generateStudyNotes(topic);
      setStudyNotes(notes);
      setCurrentView(ViewState.NOTES);
    } catch (err) {
      setError('Failed to generate study notes. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleGenerateQuiz = useCallback(async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setCurrentView(ViewState.IDLE);
    try {
      const quizQuestions = await generateQuiz(topic);
      setQuiz(quizQuestions);
      setCurrentView(ViewState.QUIZ);
    } catch (err) {
      setError('Failed to generate a quiz. The model may be unable to create questions for this topic. Please try again or with a different topic.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);
  
  const handleShowTimer = () => {
    setCurrentView(ViewState.TIMER);
  };
  
  const handleQuizComplete = () => {
    setProgress(prev => ({...prev, quizzesTaken: prev.quizzesTaken + 1 }));
    setCurrentView(ViewState.IDLE);
  };

  const handleSessionComplete = () => {
    setProgress(prev => ({ ...prev, studySessions: prev.studySessions + 1}));
  };

  const handleBackToDashboard = () => {
    setCurrentView(ViewState.IDLE);
  };
  
  const progressPercentage = useMemo(() => {
      if (!topic) return 0;
      let stepsCompleted = 0;
      const totalSteps = 3;

      if (studyNotes) {
          stepsCompleted++;
      }
      if (progress.quizzesTaken > 0) {
          stepsCompleted++;
      }
      if (progress.studySessions > 0) {
          stepsCompleted++;
      }

      return (stepsCompleted / totalSteps) * 100;
  }, [topic, studyNotes, progress]);


  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (personalizationStep !== 'complete') {
    if (personalizationStep === 'welcome') {
      return <PersonalizationWelcome onReady={handleStartPersonalization} />;
    }
    if (personalizationStep === 'quiz') {
      return <PersonalizationQuiz onComplete={handlePersonalizationComplete} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#222428] text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
           <h1 className="text-5xl font-bold">
              <span style={{color: '#A499F8'}}>Study</span><span style={{color: '#F8D147'}}>fy</span>
           </h1>
          <p className="text-slate-400 mt-2 text-base">Your personal study companion</p>
        </header>

        {!topic ? (
          <TopicInput onSubmit={handleTopicSubmit} />
        ) : (
          <main>
            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 flex flex-col justify-between items-center ring-1 ring-white/10">
              <div>
                <h2 className="text-sm text-slate-400 text-center">Current Topic</h2>
                <p className="text-xl font-bold text-cyan-300 text-center">{topic}</p>
              </div>
              <button
                onClick={() => handleTopicSubmit('')}
                className="mt-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full"
              >
                Change Topic
              </button>
            </div>
            
            <ProgressBar progress={progressPercentage} />

            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg mb-6 text-center">
                <p><strong>Oops! Something went wrong.</strong></p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {isLoading && <div className="flex justify-center my-8"><LoadingSpinner /></div>}

            {!isLoading && (
              <Dashboard
                onGenerateNotes={handleGenerateNotes}
                onGenerateQuiz={handleGenerateQuiz}
                onShowTimer={handleShowTimer}
                currentView={currentView}
                studyNotes={studyNotes}
                quiz={quiz}
                progress={progress}
                onQuizComplete={handleQuizComplete}
                onSessionComplete={handleSessionComplete}
                onBack={handleBackToDashboard}
              />
            )}
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
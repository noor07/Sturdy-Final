import React, { useState } from 'react';
import Auth from './components/Auth';
import PersonalizationWelcome from './components/PersonalizationWelcome';
import PersonalizationQuiz from './components/PersonalizationQuiz';
import HomeScreen from './components/HomeScreen';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete'>('welcome');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleStartPersonalization = () => {
    setPersonalizationStep('quiz');
  };

  const handlePersonalizationComplete = () => {
    setPersonalizationStep('complete');
  };

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

  return <HomeScreen />;
};

export default App;

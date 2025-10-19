import React, { useState } from 'react';
import Auth from './components/Auth';
import PersonalizationWelcome from './components/PersonalizationWelcome';
import PersonalizationQuiz from './components/PersonalizationQuiz';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import type { Subject } from './types';

// Moved from HomeScreen so it can be shared with SettingsScreen
const MOCK_DATA: Subject[] = [
  {
    id: 'sci',
    name: 'Science',
    progress: 3,
    timeSpent: '00h 00m',
    isExpanded: true,
    topics: [
      {
        id: 'sci-1',
        name: 'Chemical Reactions and Equations',
        progress: 33,
        isExpanded: true,
        subTopics: [
          { id: 'sci-1-0', name: 'New Topic', completed: true },
          { id: 'sci-1-1', name: 'Balancing chemical equations', completed: true },
          { id: 'sci-1-2', name: 'Types of chemical reactions (Combination, Decomposition, Displacement, etc.)', completed: false },
          { id: 'sci-1-3', name: 'Redox reactions (Oxidation and Reduction)', completed: false },
        ]
      },
      {
        id: 'sci-2',
        name: 'Acids, Bases and Salts',
        progress: 0,
        isExpanded: false,
        subTopics: []
      }
    ]
  },
    { id: 'math', name: 'Mathematics', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] },
    { id: 'eng', name: 'English - Reading Skills', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] },
    { id: 'biz', name: 'Business Studies', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] },
    { id: 'eco', name: 'Economics', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] },
    { id: 'hist', name: 'History', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] },
    { id: 'pol', name: 'Political Science', progress: 0, timeSpent: '00h 00m', isExpanded: false, topics: [] }
];


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete'>('welcome');
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<number>(8);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'settings'>('home');
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_DATA);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleStartPersonalization = () => {
    setPersonalizationStep('quiz');
  };

  const handlePersonalizationComplete = (data: { name: string; avatar: number }) => {
    setUserName(data.name);
    setUserAvatar(data.avatar);
    setPersonalizationStep('complete');
  };

  const handleAddSubject = (name: string) => {
    const newSubject: Subject = {
        id: `subject-${Date.now()}`,
        name,
        progress: 0,
        timeSpent: '00h 00m',
        isExpanded: true,
        topics: []
    };
    setSubjects(prevSubjects => [...prevSubjects, newSubject]);
  };

  const handleDeleteSubject = (id: string) => {
      setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== id));
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

  if (currentScreen === 'settings') {
      return <SettingsScreen 
        subjects={subjects}
        onAddSubject={handleAddSubject}
        onDeleteSubject={handleDeleteSubject}
        onBack={() => setCurrentScreen('home')}
      />
  }

  return <HomeScreen 
    userName={userName} 
    userAvatar={userAvatar}
    subjects={subjects}
    setSubjects={setSubjects}
    onNavigateToSettings={() => setCurrentScreen('settings')}
   />;
};

export default App;
import React, { useState, useEffect } from 'react';
import PersonalizationWelcome from './components/PersonalizationWelcome';
import PersonalizationQuiz from './components/PersonalizationQuiz';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import FlashcardsScreen from './components/FlashcardsScreen';
import NotesScreen from './components/NotesScreen';
import TimetableScreen from './components/TimetableScreen';
import BottomNavBar from './components/BottomNavBar';
import NoteDetailScreen from './components/NoteDetailScreen';
import type { Subject, Note, TimetableEvent, FlashcardSet, Flashcard, Topic } from './types';
import { generateFlashcards as generateFlashcardsFromAPI } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import { SYLLABUS_DATA } from './data/syllabusData';

export type Screen = 'home' | 'flashcards' | 'notes' | 'timetable' | 'settings';

interface Profile {
    username: string;
    avatar_id: number;
    daily_goal: number;
    exam_goal: string;
    onboarding_complete: boolean;
}

export interface UserData {
    profile: Profile;
    subjects: Subject[];
    notes: Note[];
    timetableEvents: TimetableEvent[];
    flashcardSets: Record<string, FlashcardSet>;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete' | 'pending'>('pending');
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

   useEffect(() => {
    setLoading(true);
    try {
      const storedData = localStorage.getItem('studyfy_data');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.profile?.onboarding_complete) {
            setUserData(parsedData);
            setPersonalizationStep('complete');
        } else {
             setPersonalizationStep('welcome');
        }
      } else {
        setPersonalizationStep('welcome');
      }
    } catch (error) {
      console.error("Failed to load data from local storage", error);
      setPersonalizationStep('welcome');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserData = (newUserData: UserData) => {
      localStorage.setItem('studyfy_data', JSON.stringify(newUserData));
      setUserData(newUserData);
  };

  const handleStartPersonalization = () => {
    setPersonalizationStep('quiz');
  };
  
  const seedInitialSubjects = (goal: string): Subject[] => {
    const syllabus = SYLLABUS_DATA[goal];
    if (!syllabus) return [];

    return syllabus.map(subjectData => ({
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        name: subjectData.name,
        progress: 0,
        time_spent: '00h 00m',
        is_expanded: true,
        topics: subjectData.topics.map((topicData) => ({
            id: crypto.randomUUID(),
            name: topicData.name,
            progress: 0,
            is_expanded: true,
            sub_topics: topicData.subTopics.map((subTopicData) => ({
                id: crypto.randomUUID(),
                name: subTopicData.name,
                completed: false,
            })),
        })),
    }));
  };

  const handlePersonalizationComplete = (data: { name: string; avatar: number; examGoal: string; dailyGoal: number; }) => {
    const newSubjects = seedInitialSubjects(data.examGoal);
    const newProfile: Profile = {
        username: data.name,
        avatar_id: data.avatar,
        daily_goal: data.dailyGoal,
        exam_goal: data.examGoal,
        onboarding_complete: true
    };
    
    const newUserData: UserData = {
        profile: newProfile,
        subjects: newSubjects,
        notes: [],
        timetableEvents: [],
        flashcardSets: {},
    };

    updateUserData(newUserData);
    setPersonalizationStep('complete');
  };

  const handleAddSubject = (name: string) => {
    if (!userData) return;
    const newSubject: Subject = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        name,
        progress: 0,
        time_spent: '00h 00m',
        is_expanded: true,
        topics: [],
    };
    updateUserData({ ...userData, subjects: [...userData.subjects, newSubject] });
  };

  const handleDeleteSubject = (id: string) => {
    if (!userData) return;
    updateUserData({ ...userData, subjects: userData.subjects.filter(s => s.id !== id) });
  };
  
  const handleUpdateSubject = (updatedSubject: Subject) => {
    if (!userData) return;
    updateUserData({ ...userData, subjects: userData.subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s) });
  };

  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'created_at'>) => {
    if (!userData) return;
    const newNote: Note = {
        ...newNoteData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
    };
    updateUserData({ ...userData, notes: [newNote, ...userData.notes] });
  };
  
  const handleDeleteNote = (noteId: string) => {
    if (!userData) return;
    if (window.confirm('Are you sure you want to delete this note?')) {
        updateUserData({ ...userData, notes: userData.notes.filter(n => n.id !== noteId) });
    }
  };

  const handleUpdateNote = (noteId: string, updatedData: Partial<Omit<Note, 'id' | 'created_at'>>) => {
      if (!userData) return;
      const newNotes = userData.notes.map(n => (n.id === noteId ? { ...n, ...updatedData } : n));
      updateUserData({ ...userData, notes: newNotes });
      setSelectedNote(prev => prev ? { ...prev, ...updatedData } as Note : null);
  };
  
  const handleAddEvent = (newEventData: Omit<TimetableEvent, 'id'>) => {
    if (!userData) return;
    const newEvent: TimetableEvent = { ...newEventData, id: crypto.randomUUID() };
    updateUserData({ ...userData, timetableEvents: [...userData.timetableEvents, newEvent] });
    setIsAddEventModalOpen(false);
  };

  const handleUpdateEvent = (eventId: string, updatedData: Partial<Omit<TimetableEvent, 'id'>>) => {
    if (!userData) return;
    const newEvents = userData.timetableEvents.map(e => (e.id === eventId ? { ...e, ...updatedData } : e));
    updateUserData({ ...userData, timetableEvents: newEvents });
  };

  const handleDeleteEvent = (eventId: string) => {
      if (!userData) return;
      updateUserData({ ...userData, timetableEvents: userData.timetableEvents.filter(e => e.id !== eventId) });
  };

  const handleGenerateFlashcards = async (topicId: string, topicName: string, subjectName: string) => {
      if (!userData) return;
      const existingSet = userData.flashcardSets[topicId];
      const existingQuestions = existingSet ? existingSet.cards.map(c => c.question) : [];
      
      const newCards = await generateFlashcardsFromAPI(topicName, existingQuestions);
      
      const updatedSet: FlashcardSet = {
        topic_id: topicId,
        topic_name: topicName,
        subject_name: subjectName,
        score: existingSet?.score || 0,
        cards: [...(existingSet?.cards || []), ...newCards],
      };
      
      const newFlashcardSets = { ...userData.flashcardSets, [topicId]: updatedSet };
      updateUserData({ ...userData, flashcardSets: newFlashcardSets });
  };

  const handleUpdateFlashcardScore = (topicId: string, pointsToAdd: number) => {
      if (!userData) return;
      const existingSet = userData.flashcardSets[topicId];
      if (existingSet) {
          const newScore = existingSet.score + pointsToAdd;
          const updatedSet = { ...existingSet, score: newScore };
          const newFlashcardSets = { ...userData.flashcardSets, [topicId]: updatedSet };
          updateUserData({ ...userData, flashcardSets: newFlashcardSets });
      }
  };
  
  const handleUpdateProfile = (data: Partial<Profile>) => {
    if (!userData) return;
    const newProfile = { ...userData.profile, ...data };
    updateUserData({ ...userData, profile: newProfile });
  };
  
  const handleExamGoalChange = (newGoal: string) => {
    if (!userData || newGoal === userData.profile.exam_goal) return;

    const confirmed = window.confirm(
        'Changing your exam goal will replace all your current subjects and progress with the syllabus for the new goal. This action cannot be undone. Are you sure you want to continue?'
    );

    if (confirmed) {
        const newSubjects = seedInitialSubjects(newGoal);
        const newUserData = {
            ...userData,
            subjects: newSubjects,
            profile: { ...userData.profile, exam_goal: newGoal }
        };
        updateUserData(newUserData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studyfy_data');
    window.location.reload();
  };

  if (loading) {
    return (
        <div className="bg-[#1F2125] h-screen flex items-center justify-center">
            <LoadingSpinner text="Initializing..." />
        </div>
    )
  }

  if (personalizationStep !== 'complete' || !userData) {
    if (personalizationStep === 'welcome') {
      return <PersonalizationWelcome onReady={handleStartPersonalization} />;
    }
    if (personalizationStep === 'quiz') {
      return <PersonalizationQuiz onComplete={handlePersonalizationComplete} />;
    }
    return (
        <div className="bg-[#1F2125] h-screen flex items-center justify-center">
            <LoadingSpinner text="Initializing..." />
        </div>
    );
  }
  
  const renderScreen = () => {
    if (selectedNote) {
        return <NoteDetailScreen
            note={selectedNote}
            userData={userData}
            onBack={() => setSelectedNote(null)}
            onUpdateNote={handleUpdateNote}
        />
    }

    switch(currentScreen) {
        case 'home':
            return <HomeScreen 
                userData={userData}
                onAddSubject={handleAddSubject}
                onUpdateSubject={handleUpdateSubject}
                onNavigateToSettings={() => setCurrentScreen('settings')}
            />;
        case 'settings':
             return <SettingsScreen 
                userData={userData}
                onAddSubject={handleAddSubject}
                onDeleteSubject={handleDeleteSubject}
                onBack={() => setCurrentScreen('home')}
                onExamGoalChange={handleExamGoalChange}
                onUpdateProfile={(data) => handleUpdateProfile({ daily_goal: data.daily_goal })}
                onLogout={handleLogout}
            />
        case 'flashcards':
            return <FlashcardsScreen 
                userData={userData}
                onGenerate={handleGenerateFlashcards}
                onUpdateScore={handleUpdateFlashcardScore}
            />;
        case 'notes':
            return <NotesScreen 
                userData={userData}
                onBack={() => setCurrentScreen('home')} 
                onAddNote={handleAddNote}
                onSelectNote={setSelectedNote}
                onDeleteNote={handleDeleteNote}
            />;
        case 'timetable':
            return <TimetableScreen 
                userData={userData}
                onBack={() => setCurrentScreen('home')} 
                onAddEvent={handleAddEvent}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
                isModalOpen={isAddEventModalOpen}
                setIsModalOpen={setIsAddEventModalOpen}
            />;
        default:
             return <HomeScreen 
                userData={userData}
                onAddSubject={handleAddSubject}
                onUpdateSubject={handleUpdateSubject}
                onNavigateToSettings={() => setCurrentScreen('settings')}
            />;
    }
  };

  const mainScreens: Screen[] = ['home', 'flashcards', 'notes', 'timetable'];
  const showNavBar = mainScreens.includes(currentScreen) && !selectedNote && !isAddEventModalOpen;

  return (
    <div className="bg-[#1F2125] h-screen overflow-hidden">
        {renderScreen()}
        {showNavBar && (
            <BottomNavBar 
                activeTab={currentScreen}
                onNavigate={(screen) => setCurrentScreen(screen)}
            />
        )}
    </div>
  );
};

export default App;

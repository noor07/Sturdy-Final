import React, { useState } from 'react';
import Auth from './components/Auth';
import PersonalizationWelcome from './components/PersonalizationWelcome';
import PersonalizationQuiz from './components/PersonalizationQuiz';
import HomeScreen from './components/HomeScreen';
import SettingsScreen from './components/SettingsScreen';
import FlashcardsScreen from './components/FlashcardsScreen';
import NotesScreen from './components/NotesScreen';
import TimetableScreen from './components/TimetableScreen';
import BottomNavBar from './components/BottomNavBar';
import NoteDetailScreen from './components/NoteDetailScreen';
import type { Subject, Note, TimetableEvent, FlashcardSet, Flashcard } from './types';
import { generateFlashcards as generateFlashcardsFromAPI } from './services/geminiService';

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

const getTodayAtTime = (hour: number, minute: number) => {
    const today = new Date();
    today.setHours(hour, minute, 0, 0);
    return today.toISOString();
};

const MOCK_EVENTS: TimetableEvent[] = [
    {
        id: 'evt1',
        title: 'Maths Lecture',
        subjectName: 'Mathematics',
        startTime: getTodayAtTime(9, 0),
        endTime: getTodayAtTime(10, 30),
        color: '#F87171' // Red
    },
    {
        id: 'evt2',
        title: 'Physics Lab',
        subjectName: 'Science',
        startTime: getTodayAtTime(14, 0),
        endTime: getTodayAtTime(16, 0),
        color: '#60A5FA' // Blue
    }
];

export type Screen = 'home' | 'flashcards' | 'notes' | 'timetable' | 'settings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete'>('welcome');
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<number>(8);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_DATA);
  const [dailyGoal, setDailyGoal] = useState(6);
  const [examGoal, setExamGoal] = useState('Class 12 Board Exams');
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [timetableEvents, setTimetableEvents] = useState<TimetableEvent[]>(MOCK_EVENTS);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [flashcardSets, setFlashcardSets] = useState<Record<string, FlashcardSet>>({});


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

  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
        id: `note-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...newNoteData
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };
  
  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    }
  };

  const handleUpdateNote = (noteId: string, updatedData: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
      setNotes(prevNotes => 
          prevNotes.map(note => 
              note.id === noteId ? { ...note, ...updatedData, createdAt: note.createdAt } : note
          )
      );
      setSelectedNote(prevNote => prevNote ? { ...prevNote, ...updatedData } as Note : null);
  };
  
  const handleAddEvent = (newEventData: Omit<TimetableEvent, 'id'>) => {
    const newEvent: TimetableEvent = {
        id: `evt-${Date.now()}`,
        ...newEventData,
    };
    setTimetableEvents(prevEvents => [...prevEvents, newEvent]);
    setIsAddEventModalOpen(false);
  };

  const handleGenerateFlashcards = async (topicId: string, topicName: string, subjectName: string) => {
      const existingSet = flashcardSets[topicId];
      const existingQuestions = existingSet ? existingSet.cards.map(c => c.question) : [];
      
      const newCards = await generateFlashcardsFromAPI(topicName, existingQuestions);
      
      setFlashcardSets(prevSets => {
          const updatedSet = {
              topicId,
              topicName,
              subjectName,
              score: existingSet?.score || 0,
              cards: [...(existingSet?.cards || []), ...newCards],
          };
          return { ...prevSets, [topicId]: updatedSet };
      });
  };

  const handleUpdateFlashcardScore = (topicId: string, pointsToAdd: number) => {
      setFlashcardSets(prevSets => {
          const existingSet = prevSets[topicId];
          if (existingSet) {
              return {
                  ...prevSets,
                  [topicId]: { ...existingSet, score: existingSet.score + pointsToAdd }
              };
          }
          return prevSets;
      });
  };


  const renderScreen = () => {
    if (selectedNote) {
        return <NoteDetailScreen
            note={selectedNote}
            subjects={subjects}
            onBack={() => setSelectedNote(null)}
            onUpdateNote={handleUpdateNote}
        />
    }

    switch(currentScreen) {
        case 'home':
            return <HomeScreen 
                userName={userName} 
                userAvatar={userAvatar}
                subjects={subjects}
                setSubjects={setSubjects}
                onNavigateToSettings={() => setCurrentScreen('settings')}
                events={timetableEvents}
            />;
        case 'settings':
             return <SettingsScreen 
                subjects={subjects}
                dailyGoal={dailyGoal}
                examGoal={examGoal}
                onAddSubject={handleAddSubject}
                onDeleteSubject={handleDeleteSubject}
                onBack={() => setCurrentScreen('home')}
                onDailyGoalChange={setDailyGoal}
                onExamGoalChange={setExamGoal}
                setSubjects={setSubjects} // Pass setter for reverting changes
            />
        case 'flashcards':
            return <FlashcardsScreen 
                subjects={subjects}
                flashcardSets={flashcardSets}
                onGenerate={handleGenerateFlashcards}
                onUpdateScore={handleUpdateFlashcardScore}
            />;
        case 'notes':
            return <NotesScreen 
                onBack={() => setCurrentScreen('home')} 
                subjects={subjects}
                notes={notes}
                onAddNote={handleAddNote}
                onSelectNote={setSelectedNote}
                onDeleteNote={handleDeleteNote}
            />;
        case 'timetable':
            return <TimetableScreen 
                onBack={() => setCurrentScreen('home')} 
                events={timetableEvents} 
                onAddEvent={handleAddEvent}
                isModalOpen={isAddEventModalOpen}
                setIsModalOpen={setIsAddEventModalOpen}
            />;
        default:
             return <HomeScreen 
                userName={userName} 
                userAvatar={userAvatar}
                subjects={subjects}
                setSubjects={setSubjects}
                onNavigateToSettings={() => setCurrentScreen('settings')}
                events={timetableEvents}
            />;
    }
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
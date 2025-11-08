import React, { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
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
import type { Subject, Note, TimetableEvent, FlashcardSet, Flashcard, Topic } from './types';
import { generateFlashcards as generateFlashcardsFromAPI } from './services/geminiService';
import { supabase } from './services/supabase';
import LoadingSpinner from './components/LoadingSpinner';

export type Screen = 'home' | 'flashcards' | 'notes' | 'timetable' | 'settings';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [personalizationStep, setPersonalizationStep] = useState<'welcome' | 'quiz' | 'complete' | 'pending'>('pending');
  
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<number>(8);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dailyGoal, setDailyGoal] = useState(6);
  const [examGoal, setExamGoal] = useState('Class 12 Board Exams');
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [timetableEvents, setTimetableEvents] = useState<TimetableEvent[]>([]);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [flashcardSets, setFlashcardSets] = useState<Record<string, FlashcardSet>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Initial loading is handled in the data fetch effect
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

   useEffect(() => {
    const fetchInitialData = async () => {
      if (!session) {
        setLoading(false);
        setPersonalizationStep('pending');
        return;
      }

      setLoading(true);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      } else if (profile) {
        setUserName(profile.username || '');
        setUserAvatar(profile.avatar_id || 8);
        setDailyGoal(profile.daily_goal || 6);
        setExamGoal(profile.exam_goal || 'Class 12 Board Exams');

        if (profile.onboarding_complete) {
          setPersonalizationStep('complete');
          // Fetch all other data
          const [subjectsRes, notesRes, eventsRes, flashcardsRes] = await Promise.all([
            supabase.from('subjects').select('*').eq('user_id', session.user.id).order('created_at'),
            supabase.from('notes').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }),
            supabase.from('timetable_events').select('*').eq('user_id', session.user.id),
            supabase.from('flashcard_sets').select('*').eq('user_id', session.user.id),
          ]);

          if (subjectsRes.data) setSubjects(subjectsRes.data as Subject[]);
          if (notesRes.data) setNotes(notesRes.data as Note[]);
          if (eventsRes.data) setTimetableEvents(eventsRes.data as TimetableEvent[]);
          if (flashcardsRes.data) {
            const sets = flashcardsRes.data.reduce((acc, set) => {
                acc[set.topic_id] = set as FlashcardSet;
                return acc;
            }, {} as Record<string, FlashcardSet>);
            setFlashcardSets(sets);
          }
        } else {
          setPersonalizationStep('welcome');
        }
      } else {
        // New user, profile was just created
        setPersonalizationStep('welcome');
      }
      setLoading(false);
    };

    fetchInitialData();
  }, [session]);


  const handleStartPersonalization = () => {
    setPersonalizationStep('quiz');
  };

  const handlePersonalizationComplete = async (data: { name: string; avatar: number }) => {
    if (!session) return;
    setUserName(data.name);
    setUserAvatar(data.avatar);
    const { error } = await supabase
      .from('profiles')
      .update({ username: data.name, avatar_id: data.avatar, onboarding_complete: true })
      .eq('id', session.user.id);
      
    if (error) console.error("Error saving personalization", error);
    setPersonalizationStep('complete');
  };

  const handleAddSubject = async (name: string) => {
    if (!session) return;
    // FIX: Removed 'progress' from Omit<> so it can be included in the newSubject object. The previous type omitted 'progress', but the object literal included it, causing a type mismatch.
    const newSubject: Omit<Subject, 'id' | 'created_at' | 'topics'> & { user_id: string; topics: Topic[] } = {
        name,
        progress: 0,
        time_spent: '00h 00m',
        is_expanded: true,
        topics: [],
        user_id: session.user.id
    };
    const { data, error } = await supabase.from('subjects').insert(newSubject).select().single();
    if (error) console.error('Error adding subject', error);
    else if (data) setSubjects(prev => [...prev, data as Subject]);
  };

  const handleDeleteSubject = async (id: string) => {
      if (!session) return;
      const { error } = await supabase.from('subjects').delete().eq('id', id);
      if (error) console.error('Error deleting subject', error);
      else setSubjects(prev => prev.filter(s => s.id !== id));
  };
  
  const handleUpdateSubject = async (updatedSubject: Subject) => {
    if (!session) return;
    const { id, ...updateData } = updatedSubject;
    const { error } = await supabase.from('subjects').update(updateData).eq('id', id);
    if (error) console.error('Error updating subject', error);
    else setSubjects(prev => prev.map(s => s.id === id ? updatedSubject : s));
  };

  const handleAddNote = async (newNoteData: Omit<Note, 'id' | 'created_at'>) => {
    if (!session) return;
    const noteToInsert = { ...newNoteData, user_id: session.user.id };
    const { data, error } = await supabase.from('notes').insert(noteToInsert).select().single();
    if (error) console.error('Error adding note', error);
    else if (data) setNotes(prev => [data as Note, ...prev]);
  };
  
  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
        if (!session) return;
        const { error } = await supabase.from('notes').delete().eq('id', noteId);
        if (error) console.error('Error deleting note', error);
        else setNotes(prev => prev.filter(n => n.id !== noteId));
    }
  };

  const handleUpdateNote = async (noteId: string, updatedData: Partial<Omit<Note, 'id' | 'created_at'>>) => {
      if (!session) return;
      const { data, error } = await supabase.from('notes').update(updatedData).eq('id', noteId).select().single();
      if (error) console.error('Error updating note', error);
      else if (data) {
          const updatedNote = data as Note;
          setNotes(prev => prev.map(n => (n.id === noteId ? updatedNote : n)));
          setSelectedNote(updatedNote);
      }
  };
  
  const handleAddEvent = async (newEventData: Omit<TimetableEvent, 'id'>) => {
    if (!session) return;
    const eventToInsert = { ...newEventData, user_id: session.user.id };
    const { data, error } = await supabase.from('timetable_events').insert(eventToInsert).select().single();
    if (error) console.error('Error adding event', error);
    else if (data) setTimetableEvents(prev => [...prev, data as TimetableEvent]);
    setIsAddEventModalOpen(false);
  };

  const handleUpdateEvent = async (eventId: string, updatedData: Partial<Omit<TimetableEvent, 'id'>>) => {
    if (!session) return;
    const { data, error } = await supabase.from('timetable_events').update(updatedData).eq('id', eventId).select().single();
    if (error) console.error('Error updating event', error);
    else if (data) setTimetableEvents(prev => prev.map(e => (e.id === eventId ? data as TimetableEvent : e)));
  };

  const handleDeleteEvent = async (eventId: string) => {
      if (!session) return;
      const { error } = await supabase.from('timetable_events').delete().eq('id', eventId);
      if (error) console.error('Error deleting event', error);
      else setTimetableEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const handleGenerateFlashcards = async (topicId: string, topicName: string, subjectName: string) => {
      if (!session) return;
      const existingSet = flashcardSets[topicId];
      const existingQuestions = existingSet ? existingSet.cards.map(c => c.question) : [];
      
      const newCards = await generateFlashcardsFromAPI(topicName, existingQuestions);
      
      const updatedSet: Omit<FlashcardSet, 'user_id'> & { user_id: string } = {
        topic_id: topicId,
        user_id: session.user.id,
        topic_name: topicName,
        subject_name: subjectName,
        score: existingSet?.score || 0,
        cards: [...(existingSet?.cards || []), ...newCards],
      };

      const { error } = await supabase.from('flashcard_sets').upsert(updatedSet, { onConflict: 'topic_id,user_id' });
      if (error) console.error('Error saving flashcards', error);
      else setFlashcardSets(prev => ({...prev, [topicId]: updatedSet as FlashcardSet }));
  };

  const handleUpdateFlashcardScore = async (topicId: string, pointsToAdd: number) => {
      if (!session) return;
      const existingSet = flashcardSets[topicId];
      if (existingSet) {
          const newScore = existingSet.score + pointsToAdd;
          const { error } = await supabase.from('flashcard_sets').update({ score: newScore }).match({ topic_id: topicId, user_id: session.user.id });
          if (error) console.error('Error updating score', error);
          else setFlashcardSets(prev => ({ ...prev, [topicId]: { ...existingSet, score: newScore } }));
      }
  };
  
  const handleUpdateProfile = async (data: { daily_goal?: number; exam_goal?: string }) => {
    if (!session) return;
    const { error } = await supabase.from('profiles').update(data).eq('id', session.user.id);
    if (error) {
      console.error("Error updating profile", error);
    } else {
      if(data.daily_goal) setDailyGoal(data.daily_goal);
      if(data.exam_goal) setExamGoal(data.exam_goal);
    }
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
                onUpdateSubject={handleUpdateSubject}
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
                onUpdateProfile={handleUpdateProfile}
                setSubjects={setSubjects} 
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
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
                isModalOpen={isAddEventModalOpen}
                setIsModalOpen={setIsAddEventModalOpen}
            />;
        default:
             return <HomeScreen 
                userName={userName} 
                userAvatar={userAvatar}
                subjects={subjects}
                onUpdateSubject={handleUpdateSubject}
                onNavigateToSettings={() => setCurrentScreen('settings')}
                events={timetableEvents}
            />;
    }
  };

  if (loading) {
    return (
        <div className="bg-[#1F2125] h-screen flex items-center justify-center">
            <LoadingSpinner />
        </div>
    )
  }

  if (!session) {
    return <Auth />;
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
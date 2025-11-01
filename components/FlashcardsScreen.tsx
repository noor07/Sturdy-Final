import React, { useState, useMemo } from 'react';
import type { Flashcard, Subject, FlashcardSet } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { ErrorIcon, ChevronDownIcon, FlashcardCheckIcon, FlashcardXIcon, TrophyIcon, ShuffleIcon, ReplayIcon } from './icons/Icons';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

interface FlashcardStudySession {
    deck: Flashcard[];
    currentIndex: number;
    score: number;
}

interface FlashcardsScreenProps {
    subjects: Subject[];
    flashcardSets: Record<string, FlashcardSet>;
    onGenerate: (topicId: string, topicName: string, subjectName: string) => Promise<void>;
    onUpdateScore: (topicId: string, pointsToAdd: number) => void;
}

const FlashcardsScreen: React.FC<FlashcardsScreenProps> = ({ subjects, flashcardSets, onGenerate, onUpdateScore }) => {
    const [selectedTopicId, setSelectedTopicId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [session, setSession] = useState<FlashcardStudySession | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [animation, setAnimation] = useState<'left' | 'right' | null>(null);

    const selectedSet = useMemo(() => flashcardSets[selectedTopicId], [flashcardSets, selectedTopicId]);

    const handleGenerate = async (isAddingMore: boolean = false) => {
        if (!selectedTopicId) {
            setError('Please select a topic first.');
            return;
        }
        
        let subjectName = '';
        let topicName = '';

        for (const subject of subjects) {
            const foundTopic = subject.topics.find(t => t.id === selectedTopicId);
            if (foundTopic) {
                subjectName = subject.name;
                topicName = foundTopic.name;
                break;
            }
        }

        if (!topicName) {
            setError('Could not find the selected topic.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await onGenerate(selectedTopicId, topicName, subjectName);
        } catch (err) {
            setError('An error occurred while generating flashcards. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartSession = () => {
        if (!selectedSet || selectedSet.cards.length === 0) return;
        setSession({
            deck: shuffleArray([...selectedSet.cards]),
            currentIndex: 0,
            score: 0,
        });
        setIsFlipped(false);
    };

    const handleAnswer = (isCorrect: boolean) => {
        if (!session) return;
        
        setAnimation(isCorrect ? 'right' : 'left');

        setTimeout(() => {
            let newDeck = [...session.deck];
            let newIndex = session.currentIndex;

            if (isCorrect) {
                // Remove the card from the deck
                newDeck.splice(session.currentIndex, 1);
            } else {
                // Move the card to the end of the deck
                const incorrectCard = newDeck.splice(session.currentIndex, 1)[0];
                newDeck.push(incorrectCard);
            }
            
            // If the last card was just answered, wrap around to the start
            if (newIndex >= newDeck.length) {
                newIndex = 0;
            }

            setSession({
                deck: newDeck,
                currentIndex: newIndex,
                score: session.score + (isCorrect ? 1 : 0),
            });

            // If the deck is now empty, end the session
            if (newDeck.length === 0) {
                onUpdateScore(selectedTopicId, session.score + (isCorrect ? 1 : 0));
            }
            
            setAnimation(null);
            setIsFlipped(false);
        }, 400); // Duration of animation
    };

    const renderSelectionView = () => (
        <div className="flex flex-col items-center justify-center text-center h-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold">Flashcard Study</h2>
            <p className="text-gray-400 mt-2">Select a chapter, generate cards with AI, and test your knowledge.</p>
            
            <div className="w-full mt-8 space-y-4">
                <div className="relative">
                    <select
                        value={selectedTopicId}
                        onChange={(e) => setSelectedTopicId(e.target.value)}
                        className="w-full glass-input text-white appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-center"
                    >
                        <option value="" disabled>Select a Chapter</option>
                        {subjects.map(subject => (
                            <optgroup key={subject.id} label={subject.name}>
                                {subject.topics.map(topic => (
                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <ChevronDownIcon />
                    </div>
                </div>

                {selectedTopicId && (
                    <div className="glass-card p-4 rounded-lg text-left space-y-4">
                         <div>
                            <p className="text-sm text-gray-400">Total Cards</p>
                            <p className="text-2xl font-bold">{selectedSet?.cards.length || 0}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">All-Time Score</p>
                            <p className="text-2xl font-bold">{selectedSet?.score || 0}</p>
                        </div>

                         {isLoading ? <LoadingSpinner /> : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleGenerate(!!selectedSet)}
                                    className="w-full mt-2 bg-slate-200/90 text-slate-900 font-bold py-3 px-4 rounded-xl transition-all hover:bg-white transform hover:scale-105 active:scale-100"
                                >
                                    {selectedSet ? 'Generate 50 More' : 'Generate 50 Cards'}
                                </button>
                                {selectedSet && selectedSet.cards.length > 0 && (
                                     <button
                                        onClick={handleStartSession}
                                        className="w-full mt-2 bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all hover:bg-purple-400 transform hover:scale-105 active:scale-100"
                                    >
                                        Study Now
                                    </button>
                                )}
                            </div>
                         )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderStudyView = () => {
        if (!session) return null;
        
        const card = session.deck[session.currentIndex];

        if (!card) { // Session complete
            return (
                <div className="flex flex-col items-center justify-center text-center h-full">
                    <TrophyIcon className="w-20 h-20 text-yellow-400"/>
                    <h2 className="text-3xl font-bold mt-4">Deck Complete!</h2>
                    <p className="text-gray-300 text-xl mt-2">You scored <span className="font-bold text-white">{session.score}</span> points in this session!</p>
                    <div className="flex gap-4 mt-8">
                        <button onClick={handleStartSession} className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all text-sm transform hover:scale-105">
                           Study Again
                        </button>
                         <button onClick={() => setSession(null)} className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105">
                            Back to Topics
                        </button>
                    </div>
                </div>
            );
        }

        const animationClass = 
            animation === 'left' ? 'animate-swipe-left' :
            animation === 'right' ? 'animate-swipe-right' :
            'animate-swipe-in';

        return (
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-lg text-slate-300">
                        {session.deck.length} <span className="text-slate-500">cards left</span>
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold">
                        <TrophyIcon className="w-5 h-5" />
                        <span>{session.score}</span>
                    </div>
                </div>

                {/* Card */}
                <div className="flex-grow flex items-center justify-center [perspective:1000px]">
                    <div className={`w-full h-96 relative transition-transform duration-700 [transform-style:preserve-3d] ${animationClass}`} onAnimationEnd={() => {}}>
                        <div 
                            className={`absolute inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 w-full h-full bg-[#2D2F34] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl [backface-visibility:hidden]">
                                <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-4">Question</p>
                                <p className="text-xl font-semibold text-white">{card.question}</p>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 w-full h-full bg-purple-500/90 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                <p className="text-xs text-white/80 font-semibold uppercase tracking-wider mb-4">Answer</p>
                                <p className="text-xl font-semibold text-white">{card.answer}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="mt-6 flex justify-center items-center gap-6">
                    <button onClick={() => handleAnswer(false)} className="p-5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all transform active:scale-90 ring-2 ring-red-500/30">
                        <FlashcardXIcon className="h-10 w-10" />
                    </button>
                    <button onClick={() => handleAnswer(true)} className="p-5 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-all transform active:scale-90 ring-2 ring-green-500/30">
                        <FlashcardCheckIcon className="h-10 w-10" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#1F2125] h-screen text-white font-sans flex flex-col">
            <div className="p-4 max-w-md mx-auto flex-grow w-full">
                <header className="flex items-center py-4 relative justify-center">
                    <h1 className="text-lg font-bold">Flashcards</h1>
                     {session && (
                        <button onClick={() => setSession(null)} className="absolute left-0 p-2 text-sm text-slate-400 hover:text-white transition-colors duration-200">
                           &larr; Back to Topics
                        </button>
                    )}
                </header>
                <main className="flex-grow flex flex-col">
                    {error && (
                        <div className="flex flex-col items-center justify-center text-center bg-red-900/50 p-4 rounded-xl border border-red-500/50 my-4">
                            <ErrorIcon className="w-8 h-8 text-red-400 mb-2"/>
                            <p className="text-red-300 font-semibold">{error}</p>
                        </div>
                    )}
                    {session ? renderStudyView() : renderSelectionView()}
                </main>
            </div>
             <style>{`
                @keyframes swipe-out-left {
                    to { transform: translateX(-150%) rotate(-15deg); opacity: 0; }
                }
                @keyframes swipe-out-right {
                    to { transform: translateX(150%) rotate(15deg); opacity: 0; }
                }
                 @keyframes swipe-in {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-swipe-left { animation: swipe-out-left 0.4s ease-out forwards; }
                .animate-swipe-right { animation: swipe-out-right 0.4s ease-out forwards; }
                .animate-swipe-in { animation: swipe-in 0.4s ease-out forwards; }
                .glass-input {
                    background: rgba(58, 61, 66, 0.7);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glass-card {
                    background: rgba(45, 47, 52, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
};

export default FlashcardsScreen;
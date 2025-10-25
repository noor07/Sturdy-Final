import React from 'react';
import { FlashcardIcon } from './icons/Icons';

interface FlashcardsScreenProps {
    onBack: () => void;
}

const FlashcardsScreen: React.FC<FlashcardsScreenProps> = ({ onBack }) => {
    return (
        <div className="bg-[#1F2125] min-h-screen text-white font-sans pb-32">
            <div className="p-4 max-w-md mx-auto">
                <header className="flex items-center py-4 relative justify-center">
                    <h1 className="text-lg font-bold">Flashcards</h1>
                </header>

                <main className="mt-20 flex flex-col items-center justify-center text-center">
                    <FlashcardIcon isActive={false} className="w-16 h-16 text-gray-500" />
                    <p className="text-gray-400 mt-4">The flashcards feature is coming soon!</p>
                     <button 
                        onClick={onBack}
                        className="mt-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm transform hover:scale-105 active:scale-100"
                    >
                        Go to Home
                    </button>
                </main>
            </div>
        </div>
    );
};

export default FlashcardsScreen;
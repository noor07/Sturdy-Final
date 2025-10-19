import React from 'react';

const MaterialIcon: React.FC<{ name: string, className?: string, onClick?: () => void }> = ({ name, className, onClick }) => (
    <span className={`material-symbols-outlined ${className}`} onClick={onClick}>{name}</span>
);

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
                    <MaterialIcon name="style" className="text-gray-500 !text-6xl" />
                    <p className="text-gray-400 mt-4">The flashcards feature is coming soon!</p>
                     <button 
                        onClick={onBack}
                        className="mt-6 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                    >
                        Go to Home
                    </button>
                </main>
            </div>
        </div>
    );
};

export default FlashcardsScreen;

import React, { useState } from 'react';
import type { Subject } from '../types';
import { ClockIcon, GraduationCapIcon, TrashIcon } from './icons/Icons';

const MaterialIcon: React.FC<{ name: string, className?: string, onClick?: () => void }> = ({ name, className, onClick }) => (
    <span className={`material-symbols-outlined ${className}`} onClick={onClick}>{name}</span>
);

const AddItemInput: React.FC<{ onSave: (name: string) => void, onCancel: () => void, placeholder: string }> = ({ onSave, onCancel, placeholder }) => {
    const [name, setName] = useState('');
    
    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
            setName('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div className="flex items-center gap-2 bg-slate-900/80 p-3 rounded-lg my-2 w-full">
            <input 
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="bg-transparent focus:outline-none text-sm flex-1 placeholder-gray-500"
            />
            <button onClick={handleSave}><MaterialIcon name="check" className="text-green-400" /></button>
            <button onClick={onCancel}><MaterialIcon name="close" className="text-gray-400" /></button>
        </div>
    );
};

// Exam goal options from the personalization quiz
const mainGoalOptions: Record<string, string[]> = {
  'School-Level & Foundational Exams': [
    'Class 10 Board Exams', 'Class 12 Board Exams',
    'NTSE (National Talent Search Exam)', 'Science/Math Olympiads'
  ],
  'Engineering': [
    'JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'
  ]
};


interface SettingsScreenProps {
    subjects: Subject[];
    onAddSubject: (name: string) => void;
    onDeleteSubject: (id: string) => void;
    onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ subjects, onAddSubject, onDeleteSubject, onBack }) => {
    const [dailyGoal, setDailyGoal] = useState(6);
    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [examGoal, setExamGoal] = useState('Class 12 Board Exams');
    const [isSelectingExamGoal, setIsSelectingExamGoal] = useState(false);

    const subjectColors = ['#F87171', '#FBBF24', '#C084FC', '#60A5FA', '#34D399', '#FB923C'];

    const handleSaveSubject = (name: string) => {
        onAddSubject(name);
        setIsAddingSubject(false);
    };
    
    const handleSelectExamGoal = (goal: string) => {
        setExamGoal(goal);
        setIsSelectingExamGoal(false);
    };

    return (
        <div className="bg-[#1F2125] min-h-screen text-white font-sans">
            <div className="p-4 max-w-md mx-auto">
                <header className="flex items-center py-4 relative justify-center">
                    <button onClick={onBack} className="absolute left-0 p-2 rounded-full hover:bg-white/10 transition-colors">
                        <MaterialIcon name="arrow_back_ios_new" className="text-gray-300 !text-xl" />
                    </button>
                    <h1 className="text-lg font-bold">Settings</h1>
                </header>

                <main className="mt-6 space-y-8">
                    <section>
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Study Preferences</h2>
                        <div className="bg-[#2D2F34] rounded-xl p-4 space-y-4">
                           {/* Daily Goal */}
                            <div className="flex items-center gap-4">
                               <div className="bg-blue-500/20 p-2 rounded-lg">
                                    <ClockIcon className="w-6 h-6" colorClass="text-blue-400" />
                               </div>
                               <div className="flex-1">
                                    <p className="font-semibold">Update Daily Goal</p>
                                    <p className="text-sm text-gray-400">{dailyGoal} hours</p>
                               </div>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="16"
                                step="2"
                                value={dailyGoal}
                                onChange={(e) => setDailyGoal(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb"
                            />

                            <hr className="border-slate-700" />

                            {/* Exam Goal */}
                            <button onClick={() => setIsSelectingExamGoal(true)} className="flex items-center gap-4 w-full text-left">
                               <div className="bg-purple-500/20 p-2 rounded-lg">
                                    <GraduationCapIcon className="w-6 h-6 text-purple-400" />
                               </div>
                               <div className="flex-1">
                                    <p className="font-semibold">Exam Goal</p>
                                    <p className="text-sm text-gray-400">{examGoal}</p>
                               </div>
                               <MaterialIcon name="arrow_forward_ios" className="text-gray-500 !text-base" />
                            </button>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Edit Subjects</h2>
                        <div className="bg-[#2D2F34] rounded-xl p-4 space-y-3">
                            {subjects.map((subject, index) => (
                                <div key={subject.id} className="flex items-center gap-3 bg-[#1F2125] p-3 rounded-lg">
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: subjectColors[index % subjectColors.length] }}></div>
                                    <p className="flex-1 font-medium">{subject.name}</p>
                                    <button onClick={() => onDeleteSubject(subject.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                             {isAddingSubject ? (
                                <AddItemInput 
                                    onSave={handleSaveSubject}
                                    onCancel={() => setIsAddingSubject(false)}
                                    placeholder="New Subject Name..."
                                />
                            ) : (
                                <button
                                    onClick={() => setIsAddingSubject(true)} 
                                    className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-sm font-semibold text-white bg-[#1F2125] rounded-xl hover:bg-[#313338] transition-colors"
                                >
                                    <MaterialIcon name="add" className="!text-base" /> Add Custom Subject
                                </button>
                            )}
                        </div>
                    </section>
                </main>
            </div>

            {/* Exam Goal Selection Modal */}
            {isSelectingExamGoal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#2D2F34] rounded-2xl p-6 w-full max-w-sm m-4 max-h-[80vh] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Select Exam Goal</h2>
                            <button onClick={() => setIsSelectingExamGoal(false)} className="p-1 rounded-full hover:bg-white/10">
                                <MaterialIcon name="close" className="text-gray-300" />
                            </button>
                        </div>
                        <div className="space-y-3 overflow-y-auto">
                            {Object.entries(mainGoalOptions).map(([category, catOptions]) => (
                                <div key={category}>
                                    <h3 className="text-sm font-semibold text-slate-400 my-3 px-1 uppercase tracking-wider">{category}</h3>
                                    <div className="space-y-3">
                                        {catOptions.map(option => (
                                            <button 
                                                key={option} 
                                                onClick={() => handleSelectExamGoal(option)} 
                                                className="w-full bg-[#1F2125] p-4 rounded-xl text-left hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                            >
                                                <span className="text-slate-200 font-medium">{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

             <style>{`
                .range-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #60A5FA;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 3px solid #1F2125;
                }
                .range-thumb::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #60A5FA;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 3px solid #1F2125;
                }
            `}</style>
        </div>
    );
};

export default SettingsScreen;
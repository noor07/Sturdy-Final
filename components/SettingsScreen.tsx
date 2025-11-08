import React, { useState, useEffect } from 'react';
import type { Subject } from '../types';
import { ClockIcon, GraduationCapIcon, TrashIcon, ArrowBackIcon, CheckIcon, CloseIcon, AddIcon, ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from './icons/Icons';
import { EXAM_DATA } from '../data/exams';

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
            <button onClick={handleSave}><CheckIcon className="w-6 h-6 text-green-400" /></button>
            <button onClick={onCancel}><CloseIcon className="w-6 h-6 text-gray-400" /></button>
        </div>
    );
};

interface SettingsScreenProps {
    subjects: Subject[];
    dailyGoal: number;
    examGoal: string;
    onAddSubject: (name: string) => void;
    onDeleteSubject: (id: string) => void;
    onBack: () => void;
    onDailyGoalChange: (goal: number) => void;
    onExamGoalChange: (goal: string) => void;
    onUpdateProfile: (data: { daily_goal?: number; exam_goal?: string }) => Promise<void>;
    setSubjects: (subjects: Subject[]) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
    subjects, 
    dailyGoal,
    examGoal,
    onAddSubject, 
    onDeleteSubject, 
    onBack,
    onDailyGoalChange,
    onExamGoalChange,
    onUpdateProfile,
    setSubjects,
}) => {
    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [isSelectingExamGoal, setIsSelectingExamGoal] = useState(false);
    const [expandedExam, setExpandedExam] = useState<string | null>(null);
    
    const [initialSettings, setInitialSettings] = useState({ dailyGoal, examGoal, subjects });
    const [hasChanges, setHasChanges] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        // Check if current state differs from initial state
        const changesExist =
            dailyGoal !== initialSettings.dailyGoal ||
            examGoal !== initialSettings.examGoal ||
            JSON.stringify(subjects) !== JSON.stringify(initialSettings.subjects);
        setHasChanges(changesExist);
    }, [dailyGoal, examGoal, subjects, initialSettings]);


    const subjectColors = ['#F87171', '#FBBF24', '#C084FC', '#60A5FA', '#34D399', '#FB923C'];

    const handleSaveSubject = (name: string) => {
        onAddSubject(name);
        setIsAddingSubject(false);
    };
    
    const handleSelectExamGoal = (goal: string) => {
        onExamGoalChange(goal);
        setIsSelectingExamGoal(false);
        setExpandedExam(null);
    };

    const handleSave = async () => {
        await onUpdateProfile({ daily_goal: dailyGoal, exam_goal: examGoal });
        setInitialSettings({ dailyGoal, examGoal, subjects });
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 2000);
    };
    
    const handleBack = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                // Revert changes to their initial state before navigating back
                onDailyGoalChange(initialSettings.dailyGoal);
                onExamGoalChange(initialSettings.examGoal);
                setSubjects(initialSettings.subjects);
                onBack();
            }
        } else {
            onBack();
        }
    };


    return (
        <div className="bg-[#1F2125] h-screen text-white font-sans">
            <div className="p-4 max-w-md mx-auto h-full overflow-y-auto no-scrollbar pb-28">
                <header className="flex items-center py-4 relative justify-center">
                    <button onClick={handleBack} className="absolute left-0 p-2 rounded-full hover:bg-white/10 transition-all duration-200 transform active:scale-90">
                        <ArrowBackIcon className="text-gray-300 w-5 h-5" />
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
                                onChange={(e) => onDailyGoalChange(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb"
                            />

                            <hr className="border-slate-700" />

                            {/* Exam Goal */}
                            <button onClick={() => setIsSelectingExamGoal(true)} className="flex items-center gap-4 w-full text-left p-2 -m-2 rounded-lg transition-colors hover:bg-white/10">
                               <div className="bg-purple-500/20 p-2 rounded-lg">
                                    <GraduationCapIcon className="w-6 h-6 text-purple-400" />
                               </div>
                               <div className="flex-1">
                                    <p className="font-semibold">Exam Goal</p>
                                    <p className="text-sm text-gray-400">{examGoal}</p>
                               </div>
                               <ArrowForwardIcon className="text-gray-500 w-4 h-4" />
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
                                    <button onClick={() => onDeleteSubject(subject.id)} className="p-2 text-gray-400 hover:text-red-400 transition-all transform hover:scale-110 active:scale-95">
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
                                    className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-sm font-semibold text-white bg-[#1F2125] rounded-xl hover:bg-[#313338] transition-all transform active:scale-95"
                                >
                                    <AddIcon className="w-4 h-4" /> Add Custom Subject
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
                                <CloseIcon className="w-6 h-6 text-gray-300" />
                            </button>
                        </div>
                        <div className="space-y-3 overflow-y-auto no-scrollbar">
                            {EXAM_DATA.map(({ categoryName, exams }) => (
                                <div key={categoryName}>
                                    <h3 className="text-sm font-semibold text-slate-400 my-3 px-1 uppercase tracking-wider">{categoryName}</h3>
                                    <div className="space-y-2">
                                        {exams.map(exam => {
                                            const isExpanded = expandedExam === exam.name;
                                            return (
                                                <div key={exam.name} className="bg-[#1F2125] rounded-xl transition-all duration-300">
                                                    <button
                                                        onClick={() => setExpandedExam(isExpanded ? null : exam.name)}
                                                        className="w-full p-4 text-left flex justify-between items-center"
                                                        aria-expanded={isExpanded}
                                                    >
                                                        <span className="text-slate-200 font-medium">{exam.name}</span>
                                                        {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                                    </button>
                                                    {isExpanded && (
                                                        <div className="px-4 pb-4 pt-0">
                                                            <div className="border-t border-slate-700 pt-3 space-y-3 text-sm">
                                                                <div>
                                                                    <p className="font-semibold text-slate-400">Conducting Body:</p>
                                                                    <p className="text-slate-300">{exam.conductingBody}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold text-slate-400">Purpose:</p>
                                                                    <p className="text-slate-300">{exam.purpose}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold text-slate-400">Subjects / Sections:</p>
                                                                    <p className="text-slate-300">{exam.subjects}</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleSelectExamGoal(exam.name)}
                                                                    className="w-full mt-2 bg-[#A89AFF] text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-100"
                                                                >
                                                                    Select this Goal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            {hasChanges && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 z-20 bg-gradient-to-t from-[#1F2125] via-[#1F2125] to-transparent">
                    <button
                        onClick={handleSave}
                        disabled={showSavedMessage}
                        className="w-full bg-[#A89AFF] disabled:bg-green-500 text-black font-bold py-3 px-4 rounded-full text-lg transition-all transform hover:scale-105 active:scale-100 shadow-lg shadow-[#A89AFF]/30"
                    >
                         {showSavedMessage ? (
                            <span className="flex items-center justify-center">
                                <CheckIcon className="w-5 h-5 mr-2 text-black" />
                                Saved!
                            </span>
                        ) : 'Save Changes'}
                    </button>
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
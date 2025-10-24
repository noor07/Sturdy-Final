import React, { useState } from 'react';
import type { Subject } from '../types';
import { Avatars } from './icons/Avatars';
import { SettingsIcon, EditIcon, ChevronDownIcon, ChevronUpIcon, PlayArrowIcon, CheckIcon, AddIcon, CloseIcon } from './icons/Icons';

const CircularProgress: React.FC<{ progress: number, size?: number, strokeWidth?: number }> = ({ progress, size = 48, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-[#34D399]"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
        {progress}%
      </span>
    </div>
  );
};

const AddItemInput: React.FC<{ onSave: (name: string) => void, onCancel: () => void, placeholder: string }> = ({ onSave, onCancel, placeholder }) => {
    const [name, setName] = useState('');
    
    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
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
        <div className="flex items-center gap-2 bg-black/30 p-2 rounded-lg my-2">
            <input 
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={onCancel}
                placeholder={placeholder}
                className="bg-transparent focus:outline-none text-sm flex-1 placeholder-gray-500"
            />
            <button onClick={handleSave} className="text-green-400"><CheckIcon className="w-6 h-6" /></button>
            <button onClick={onCancel} className="text-gray-400"><CloseIcon className="w-6 h-6" /></button>
        </div>
    );
};

interface HomeScreenProps {
    userName: string;
    userAvatar: number;
    subjects: Subject[];
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    onNavigateToSettings: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, userAvatar, subjects, setSubjects, onNavigateToSettings }) => {
    const [activeDate, setActiveDate] = useState<number>(18);
    const [addingState, setAddingState] = useState<{ type: 'topic' | 'subtopic'; parentId: string } | null>(null);
    
    const toggleSubject = (id: string) => {
        setSubjects(prevSubjects => prevSubjects.map(s => s.id === id ? { ...s, isExpanded: !s.isExpanded } : s));
    };

    const toggleTopic = (subjectId: string, topicId: string) => {
        setSubjects(prevSubjects => prevSubjects.map(s => {
            if (s.id === subjectId) {
                return {
                    ...s,
                    topics: s.topics.map(t => t.id === topicId ? { ...t, isExpanded: !t.isExpanded } : t)
                }
            }
            return s;
        }));
    };
    
    const handleAddTopic = (subjectId: string, name: string) => {
        setSubjects(prevSubjects => prevSubjects.map(s => {
            if (s.id === subjectId) {
                const newTopic = {
                    id: `topic-${Date.now()}`,
                    name,
                    progress: 0,
                    isExpanded: true,
                    subTopics: []
                };
                return { ...s, topics: [...s.topics, newTopic] };
            }
            return s;
        }));
        setAddingState(null);
    };

    const handleAddSubTopic = (subjectId: string, topicId: string, name: string) => {
        setSubjects(prevSubjects => prevSubjects.map(s => {
            if (s.id === subjectId) {
                return {
                    ...s,
                    topics: s.topics.map(t => {
                        if (t.id === topicId) {
                            const newSubTopic = {
                                id: `subtopic-${Date.now()}`,
                                name,
                                completed: false
                            };
                            return { ...t, subTopics: [...t.subTopics, newSubTopic] };
                        }
                        return t;
                    })
                }
            }
            return s;
        }));
        setAddingState(null);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning!';
        if (hour < 18) return 'Good Afternoon!';
        return 'Good Evening!';
    };

    const calendarDates = [
        { day: 'Oct', date: 13 }, { day: 'Oct', date: 14 }, { day: 'Oct', date: 15 },
        { day: 'Oct', date: 16 }, { day: 'Oct', date: 17 }, { day: 'Oct', date: 18 }
    ];

  return (
    <div className="bg-[#1F2125] min-h-screen text-white font-sans pb-32">
      <div className="p-4 max-w-md mx-auto">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
             {React.createElement(Avatars[userAvatar] || Avatars[8], { className: 'w-12 h-12' })}
            <div>
              <p className="text-lg font-bold">Hi, {userName}</p>
              <p className="text-sm text-gray-400">{getGreeting()}</p>
            </div>
          </div>
          <button onClick={onNavigateToSettings} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SettingsIcon />
          </button>
        </header>

        <div className="flex justify-between items-center my-6 text-center">
            {calendarDates.map(({day, date}) => (
                <div key={date} 
                     onClick={() => setActiveDate(date)}
                     className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-14 h-14 cursor-pointer ${activeDate === date ? 'bg-[#A89AFF]' : 'hover:bg-white/10'}`}>
                    <span className={`text-xs ${activeDate === date ? 'text-black' : 'text-gray-400'}`}>{day}</span>
                    <span className={`font-bold text-lg ${activeDate === date ? 'text-black' : 'text-white'}`}>{date}</span>
                </div>
            ))}
        </div>

        <div className="bg-[#2D2F34] rounded-xl p-4 my-6 flex justify-between items-center">
            <div>
                <span className="text-xs text-gray-400">Filter</span>
                <div className="flex gap-2 mt-1">
                    <button className="bg-[#A89AFF] text-black text-sm font-semibold py-1 px-3 rounded-md">All (11)</button>
                    <button className="text-gray-400 hover:text-white text-sm font-semibold py-1 px-3">Due (6)</button>
                </div>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-400">Time Spent</span>
                <p className="font-semibold text-lg">00h 00m</p>
            </div>
        </div>

        <main className="space-y-4">
            {subjects.map(subject => (
                // Subject Card (e.g., "Science")
                <div key={subject.id} className="bg-[#2D2F34] rounded-xl p-4 transition-all duration-300">
                    <div className="flex items-start gap-3">
                        <CircularProgress progress={subject.progress} />
                        <div className="flex-1 mt-1">
                            <h2 className="font-bold text-lg">{subject.name}</h2>
                            <p className="text-sm text-gray-400">{subject.timeSpent}</p>
                        </div>
                        <div className="flex items-center gap-1">
                             <button className="p-1 rounded-full hover:bg-white/10 transition-colors"><EditIcon className="w-4 h-4 text-gray-400" /></button>
                            <button onClick={() => toggleSubject(subject.id)} className="flex items-center text-gray-400 text-xs gap-1 hover:text-white transition-colors">
                                Hide Details {subject.isExpanded ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1 mt-3">
                        <div className="bg-[#34D399] h-1 rounded-full" style={{ width: `${subject.progress}%` }}></div>
                    </div>

                    {subject.isExpanded && (
                       <div className="mt-4 space-y-3">
                           {subject.topics.map(topic => (
                               // Chapter Card (e.g., "Chemical Reactions and Equations"). This is a "Topic" in the code.
                               <div key={topic.id} className="bg-[#1F2125] p-3 rounded-xl">
                                   <div className="flex items-start gap-3">
                                        <CircularProgress progress={topic.progress} size={40} />
                                        <div className="flex-1 mt-0.5">
                                            <h3 className="font-semibold">{topic.name}</h3>
                                        </div>
                                         <div className="flex items-center gap-1">
                                            <button className="p-1 rounded-full hover:bg-white/10 transition-colors"><EditIcon className="w-4 h-4 text-gray-400" /></button>
                                            <button onClick={() => toggleTopic(subject.id, topic.id)} className="flex items-center text-gray-400 text-xs gap-1 hover:text-white transition-colors">
                                                 Hide Details {topic.isExpanded ? <ChevronUpIcon className="w-5 h-5"/> : <ChevronDownIcon className="w-5 h-5"/>}
                                            </button>
                                        </div>
                                   </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1 mt-3">
                                        <div className="bg-[#34D399] h-1 rounded-full" style={{ width: `${topic.progress}%` }}></div>
                                    </div>
                                   {topic.isExpanded && (
                                       <div className="mt-3 space-y-2">
                                           {topic.subTopics.map(subTopic => (
                                               // Topic Item (e.g., "New Topic"). This is a "SubTopic" in the code.
                                               <div key={subTopic.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                                                   <div className="flex-1 mr-2">
                                                      <p className="text-sm">{subTopic.name}</p>
                                                      <div className="w-full bg-gray-700 rounded-full h-0.5 mt-1">
                                                          <div className="bg-green-500 h-0.5 rounded-full" style={{ width: subTopic.completed ? '100%' : '0%' }}></div>
                                                      </div>
                                                   </div>
                                                   <div className="flex items-center gap-2">
                                                       <button className="p-1"><EditIcon className="w-4 h-4 text-gray-400" /></button>
                                                       <button className="bg-[#34D399] text-black rounded-full w-7 h-7 flex items-center justify-center">
                                                          <PlayArrowIcon className="w-5 h-5" />
                                                       </button>
                                                       <button className={`${subTopic.completed ? 'bg-[#34D399] text-black' : 'bg-gray-700 text-gray-500' } rounded-full w-7 h-7 flex items-center justify-center transition-colors`}>
                                                          <CheckIcon className="w-5 h-5 text-current" />
                                                       </button>
                                                   </div>
                                               </div>
                                           ))}
                                            {addingState?.type === 'subtopic' && addingState.parentId === topic.id ? (
                                                <AddItemInput
                                                    onSave={(name) => handleAddSubTopic(subject.id, topic.id, name)}
                                                    onCancel={() => setAddingState(null)}
                                                    placeholder="New Topic Name..."
                                                />
                                            ) : (
                                                <button onClick={() => setAddingState({ type: 'subtopic', parentId: topic.id })} className="w-full flex items-center justify-center gap-2 text-center py-2 mt-2 text-sm text-gray-400 hover:text-white transition-colors border border-dashed border-gray-600 rounded-lg hover:border-gray-500">
                                                    <AddIcon className="w-4 h-4" /> Add Topic
                                                </button>
                                            )}
                                       </div>
                                   )}
                               </div>
                           ))}
                           {addingState?.type === 'topic' && addingState.parentId === subject.id ? (
                                <div className="mt-3">
                                <AddItemInput 
                                    onSave={(name) => handleAddTopic(subject.id, name)}
                                    onCancel={() => setAddingState(null)}
                                    placeholder="New Chapter Name..."
                                />
                                </div>
                           ) : (
                                <button onClick={() => setAddingState({ type: 'topic', parentId: subject.id })} style={{
                                    background: 'rgba(34, 36, 40, 1)',
                                    border: '1px solid rgba(168, 154, 255, 0.3)',
                                    boxShadow: '0 4px 15px rgba(168, 154, 255, 0.1)',
                                }}
                                className="w-full flex items-center justify-center gap-2 py-3 mt-2 text-sm font-semibold text-[#C6BEFF] rounded-xl hover:shadow-[#A89AFF]/20 hover:border-[#A89AFF]/50 transition-all duration-300">
                                    <AddIcon className="w-4 h-4" /> Add Chapter
                                </button>
                           )}
                       </div>
                    )}
                </div>
            ))}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
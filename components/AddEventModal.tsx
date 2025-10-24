import React, { useState, useMemo, FC } from 'react';
import type { TimetableEvent } from '../types';
// FIX: Imported CheckIcon to resolve 'Cannot find name' error.
import { CloseIcon, EditIcon, NotesIcon, SellIcon, ChevronDownIcon, ClockIcon, ErrorIcon, CheckIcon } from './icons/Icons';

const COLORS = [
    '#F87171', '#34D399', '#60A5FA', '#FBBF24', '#F9A8D4', '#F472B6', '#FB923C', '#A78BFA',
];

const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setMinutes(i * 30);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
});

interface AddEventModalProps {
    onClose: () => void;
    onSave: (event: Omit<TimetableEvent, 'id'>) => void;
    selectedDate: Date;
    events: TimetableEvent[];
}

const AddEventModal: FC<AddEventModalProps> = ({ onClose, onSave, selectedDate, events }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [repeats, setRepeats] = useState('Does not repeat');
    const [startTime, setStartTime] = useState('12:00 PM');
    const [endTime, setEndTime] = useState('1:00 PM');
    const [error, setError] = useState<string | null>(null);
    
    const timeToMinutes = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    };

    const duration = useMemo(() => {
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        const diff = endMinutes - startMinutes;
        if (diff <= 0) return 'Invalid duration';
        
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        let durationStr = '';
        if (hours > 0) durationStr += `${hours} hour${hours > 1 ? 's' : ''} `;
        if (minutes > 0) durationStr += `${minutes} minute${minutes > 1 ? 's' : ''}`;
        
        return durationStr.trim();
    }, [startTime, endTime]);
    
    const scheduleBarStyle = useMemo(() => {
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        const totalMinutes = 24 * 60;
        const left = (startMinutes / totalMinutes) * 100;
        const width = ((endMinutes - startMinutes) / totalMinutes) * 100;
        return {
            left: `${left}%`,
            width: `${width}%`,
        };
    }, [startTime, endTime]);

    const combineDateAndTime = (date: Date, timeString: string): string => {
        const timeParts = timeString.match(/(\d+):(\d+) (AM|PM)/);
        if (!timeParts) return date.toISOString();

        const [_, hours, minutes, period] = timeParts;
        let hour = parseInt(hours, 10);

        if (period === 'PM' && hour < 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        const newDate = new Date(date);
        newDate.setHours(hour, parseInt(minutes, 10), 0, 0);
        return newDate.toISOString();
    };
    
    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };


    const handleSave = () => {
        setError(null); // Clear previous errors

        // 1. Title validation
        if (!title.trim()) {
            setError('Please enter an event title.');
            return;
        }

        // 2. Duration validation
        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        if (endMinutes <= startMinutes) {
            setError('End time must be after start time.');
            return;
        }

        const newEventStartTime = combineDateAndTime(selectedDate, startTime);
        const newEventEndTime = combineDateAndTime(selectedDate, endTime);

        // 3. Overlap validation
        const eventsOnSelectedDay = events.filter(event => isSameDay(new Date(event.startTime), selectedDate));
        
        const isOverlapping = eventsOnSelectedDay.some(existingEvent => {
            const existingStart = new Date(existingEvent.startTime).getTime();
            const existingEnd = new Date(existingEvent.endTime).getTime();
            const newStart = new Date(newEventStartTime).getTime();
            const newEnd = new Date(newEventEndTime).getTime();
    
            return newStart < existingEnd && newEnd > existingStart;
        });
    
        if (isOverlapping) {
            setError('This event overlaps with another scheduled event.');
            return;
        }
        
        onSave({
            title,
            description,
            color: selectedColor,
            repeats,
            startTime: newEventStartTime,
            endTime: newEventEndTime,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#2D2F34] w-full max-w-sm rounded-2xl shadow-2xl text-white flex flex-col max-h-[85vh] animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 flex-shrink-0 border-b border-slate-700/50">
                    <h2 className="text-xl font-bold">Add Event</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-4 pt-2 pb-4 flex-1 custom-scrollbar">
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                               <EditIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#1F2125] placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50" />
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <NotesIcon isActive={false} className="w-5 h-5 text-gray-400" />
                            </div>
                            <input type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#1F2125] placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                               <SellIcon className="w-4 h-4" /> Color
                            </label>
                            <div className="grid grid-cols-8 gap-1.5">
                                {COLORS.map(color => (
                                    <button key={color} onClick={() => setSelectedColor(color)} className="w-7 h-7 rounded-full flex items-center justify-center transition-transform transform hover:scale-110" style={{ backgroundColor: color }}>
                                        {selectedColor === color && <CheckIcon className="text-white w-5 h-5" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                             <label className="text-sm font-medium text-gray-400 mb-1 block">Repeats</label>
                             <select value={repeats} onChange={(e) => setRepeats(e.target.value)} className="w-full bg-[#1F2125] appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50">
                                <option>Does not repeat</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                             </select>
                             <div className="absolute right-3 bottom-3 text-gray-400 pointer-events-none">
                                <ChevronDownIcon />
                             </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-sm font-medium text-gray-400 mb-1 block">Start Time</label>
                                <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-[#1F2125] appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50">
                                    {timeOptions.map(time => <option key={time}>{time}</option>)}
                                </select>
                                <div className="absolute right-3 bottom-3 text-gray-400 pointer-events-none">
                                   <ChevronDownIcon />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-sm font-medium text-gray-400 mb-1 block">End Time</label>
                                <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-[#1F2125] appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50">
                                    {timeOptions.map(time => <option key={time}>{time}</option>)}
                                </select>
                                <div className="absolute right-3 bottom-3 text-gray-400 pointer-events-none">
                                   <ChevronDownIcon />
                                </div>
                            </div>
                        </div>

                         <div>
                            <div className="text-center text-sm text-gray-400 mb-2 flex items-center justify-center gap-2">
                                <ClockIcon className="w-4 h-4" colorClass="text-gray-400" /> {duration}
                            </div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block text-center">Day's Schedule</label>
                            <div className="bg-[#1F2125] rounded-full h-3 relative overflow-hidden">
                                <div className="absolute top-0 h-full rounded-full" style={{...scheduleBarStyle, backgroundColor: selectedColor}}></div>
                                <div className="absolute inset-0 flex justify-between items-center px-1">
                                    <div className="w-px h-full bg-slate-600/50"></div>
                                    <div className="w-px h-full bg-slate-600/50"></div>
                                    <div className="w-px h-full bg-slate-600/50"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                                <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 flex-shrink-0 border-t border-slate-700/50">
                     {error && (
                        <div className="bg-red-900/50 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2 mb-3">
                            <ErrorIcon className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}
                    <button onClick={handleSave} className="w-full bg-[#A89AFF] text-black font-bold py-3 px-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#A89AFF]/30">
                        Save Event
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4B5563;
                    border-radius: 3px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #4B5563 transparent;
                }
            `}</style>
        </div>
    );
};

export default AddEventModal;
import React, { useState, useMemo, FC, useRef, useEffect } from 'react';
import type { TimetableEvent } from '../types';
import { CloseIcon, EditIcon, NotesIcon, SellIcon, ChevronDownIcon, ClockIcon, ErrorIcon, CheckIcon, TrashIcon } from './icons/Icons';

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
    onDelete: (eventId: string) => void;
    selectedDate: Date;
    events: TimetableEvent[];
    eventToEdit: TimetableEvent | null;
}

const AddEventModal: FC<AddEventModalProps> = ({ onClose, onSave, onDelete, selectedDate, events, eventToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [startTime, setStartTime] = useState('12:00 PM');
    const [endTime, setEndTime] = useState('1:00 PM');
    const [error, setError] = useState<string | null>(null);

    const [isRepeatDropdownOpen, setIsRepeatDropdownOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [isAllDays, setIsAllDays] = useState(false);
    const repeatDropdownRef = useRef<HTMLDivElement>(null);

    const isEditMode = !!eventToEdit;
    const daysOfWeek = useMemo(() => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], []);

    useEffect(() => {
        if (eventToEdit) {
            setTitle(eventToEdit.title);
            setDescription(eventToEdit.description || '');
            setSelectedColor(eventToEdit.color);
            setStartTime(new Date(eventToEdit.start_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
            setEndTime(new Date(eventToEdit.end_time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
            
            const repeats = eventToEdit.repeats || 'Does not repeat';
            if (repeats === 'Daily') {
                setIsAllDays(true);
                setSelectedDays(daysOfWeek);
            } else if (repeats === 'Does not repeat') {
                setIsAllDays(false);
                setSelectedDays([]);
            } else {
                setIsAllDays(false);
                setSelectedDays(repeats.split(', '));
            }
        } else {
            // Reset state for "add new" mode if needed, though this is primarily for edit
            setTitle('');
            setDescription('');
            setSelectedColor(COLORS[0]);
            setStartTime('12:00 PM');
            setEndTime('1:00 PM');
            setSelectedDays([]);
            setIsAllDays(false);
        }
    }, [eventToEdit, daysOfWeek]);


    const handleDayToggle = (day: string) => {
        if (isAllDays) return;
        
        const newSelectedDays = selectedDays.includes(day)
            ? selectedDays.filter(d => d !== day)
            : [...selectedDays, day];
        
        setSelectedDays(newSelectedDays.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)));
    };

    const handleAllDaysToggle = () => {
        const newIsAllDays = !isAllDays;
        setIsAllDays(newIsAllDays);
        if (newIsAllDays) {
            setSelectedDays(daysOfWeek);
        } else {
            setSelectedDays([]);
        }
    };
    
    useEffect(() => {
        if (!isAllDays && selectedDays.length === 7) {
            setIsAllDays(true);
        } else if (isAllDays && selectedDays.length < 7) {
            setIsAllDays(false);
        }
    }, [selectedDays, isAllDays]);


    const getRepeatDisplayValue = () => {
        if (isAllDays) return 'Daily';
        if (selectedDays.length === 0) return 'Does not repeat';
        return selectedDays.map(d => d.substring(0, 3)).join(', ');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (repeatDropdownRef.current && !repeatDropdownRef.current.contains(event.target as Node)) {
                setIsRepeatDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [repeatDropdownRef]);
    
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

        if (!title.trim()) {
            setError('Please enter an event title.');
            return;
        }

        const startMinutes = timeToMinutes(startTime);
        const endMinutes = timeToMinutes(endTime);
        if (endMinutes <= startMinutes) {
            setError('End time must be after start time.');
            return;
        }

        const newEventStartTime = combineDateAndTime(selectedDate, startTime);
        const newEventEndTime = combineDateAndTime(selectedDate, endTime);

        const eventsOnSelectedDay = events.filter(event => {
            const isSame = isSameDay(new Date(event.start_time), selectedDate);
            if (isEditMode && event.id === eventToEdit.id) {
                return false; // Exclude the event being edited from the check
            }
            return isSame;
        });

        const isOverlapping = eventsOnSelectedDay.some(existingEvent => {
            const existingStart = new Date(existingEvent.start_time).getTime();
            const existingEnd = new Date(existingEvent.end_time).getTime();
            const newStart = new Date(newEventStartTime).getTime();
            const newEnd = new Date(newEventEndTime).getTime();
    
            return newStart < existingEnd && newEnd > existingStart;
        });
    
        if (isOverlapping) {
            setError('This event overlaps with another scheduled event.');
            return;
        }
        
        const getRepeatsString = () => {
            if (isAllDays) return 'Daily';
            if (selectedDays.length === 0) return 'Does not repeat';
            return selectedDays.join(', ');
        };
        
        onSave({
            title,
            description,
            color: selectedColor,
            repeats: getRepeatsString(),
            start_time: newEventStartTime,
            end_time: newEventEndTime,
        });
    };
    
    const handleDelete = () => {
        if (eventToEdit && window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            onDelete(eventToEdit.id);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#2D2F34] w-full max-w-sm rounded-2xl shadow-2xl text-white flex flex-col max-h-[85vh] animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 flex-shrink-0 border-b border-slate-700/50">
                    <h2 className="text-xl font-bold">{isEditMode ? 'Edit Event' : 'Add Event'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-all duration-200 transform active:scale-90">
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
                                    <button key={color} onClick={() => setSelectedColor(color)} className="w-7 h-7 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 active:scale-95" style={{ backgroundColor: color }}>
                                        {selectedColor === color && <CheckIcon className="text-white w-5 h-5" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div className="relative" ref={repeatDropdownRef}>
                            <label className="text-sm font-medium text-gray-400 mb-1 block">Repeats</label>
                            <button onClick={() => setIsRepeatDropdownOpen(prev => !prev)} className="w-full bg-[#1F2125] text-left appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50 flex justify-between items-center">
                                <span>{getRepeatDisplayValue()}</span>
                                <ChevronDownIcon />
                            </button>
                            {isRepeatDropdownOpen && (
                                <div className="absolute z-10 top-full mt-1 w-full bg-[#3a3d42] rounded-lg p-3 shadow-lg border border-slate-600">
                                    <label className="flex items-center space-x-3 p-2 rounded hover:bg-slate-600/50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isAllDays}
                                            onChange={handleAllDaysToggle}
                                            className="h-5 w-5 bg-slate-700 border-slate-500 rounded text-[#A89AFF] focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-[#A89AFF]/50"
                                        />
                                        <span className="font-semibold">All the days</span>
                                    </label>
                                    <hr className="border-slate-500 my-2"/>
                                    <div className="space-y-1">
                                        {daysOfWeek.map(day => (
                                            <label key={day} className={`flex items-center space-x-3 p-2 rounded ${isAllDays ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-600/50 cursor-pointer'}`}>
                                                <input
                                                    type="checkbox"
                                                    name={day}
                                                    checked={selectedDays.includes(day)}
                                                    onChange={() => handleDayToggle(day)}
                                                    disabled={isAllDays}
                                                    className="h-5 w-5 bg-slate-700 border-slate-500 rounded text-[#A89AFF] focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-[#A89AFF]/50"
                                                />
                                                <span>{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                     <div className="flex items-center gap-3">
                        {isEditMode && (
                            <button
                                onClick={handleDelete}
                                className="p-3 bg-red-900/70 text-red-400 rounded-xl transition-all hover:bg-red-800/70 transform active:scale-95"
                                aria-label="Delete event"
                            >
                                <TrashIcon className="w-6 h-6" />
                            </button>
                        )}
                        <button onClick={handleSave} className="w-full bg-[#A89AFF] text-black font-bold py-3 px-4 rounded-xl text-lg transition-all transform hover:scale-105 active:scale-100 shadow-lg shadow-[#A89AFF]/30">
                            {isEditMode ? 'Update Event' : 'Save Event'}
                        </button>
                    </div>
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
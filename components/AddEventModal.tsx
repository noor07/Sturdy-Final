import React, { useState, useMemo, FC } from 'react';
import type { TimetableEvent } from '../types';

const MaterialIcon: FC<{ name: string, className?: string }> = ({ name, className }) => (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
);

const COLORS = [
    '#F87171', '#34D399', '#60A5FA', '#FBBF24', '#F9A8D4', '#F472B6', '#FB923C', '#A78BFA',
    '#3B82F6', '#EC4899', '#10B981', '#EAB308', '#8B5CF6', '#EF4444', '#22C55E', '#4B5563',
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
}

const AddEventModal: FC<AddEventModalProps> = ({ onClose, onSave, selectedDate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [repeats, setRepeats] = useState('Does not repeat');
    const [startTime, setStartTime] = useState('12:00 PM');
    const [endTime, setEndTime] = useState('1:00 PM');
    
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

    const handleSave = () => {
        if (!title.trim()) {
            alert('Please enter an event title.');
            return;
        }
        
        onSave({
            title,
            description,
            color: selectedColor,
            repeats,
            startTime: combineDateAndTime(selectedDate, startTime),
            endTime: combineDateAndTime(selectedDate, endTime),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#2D2F34] w-full max-w-sm m-4 rounded-2xl shadow-2xl text-white p-4 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add Event</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                        <MaterialIcon name="close" />
                    </button>
                </div>
                
                <div className="space-y-3">
                    <div className="relative">
                        <MaterialIcon name="edit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-xl" />
                        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#1F2125] placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50" />
                    </div>
                    <div className="relative">
                        <MaterialIcon name="description" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 !text-xl" />
                        <input type="text" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#1F2125] placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2 mb-2">
                           <MaterialIcon name="sell" className="!text-base" /> Color
                        </label>
                        <div className="grid grid-cols-8 gap-1.5">
                            {COLORS.map(color => (
                                <button key={color} onClick={() => setSelectedColor(color)} className="w-7 h-7 rounded-full flex items-center justify-center transition-transform transform hover:scale-110" style={{ backgroundColor: color }}>
                                    {selectedColor === color && <MaterialIcon name="check" className="text-white !text-lg" />}
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
                         <MaterialIcon name="expand_more" className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-400 mb-1 block">Start Time</label>
                            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-[#1F2125] appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50">
                                {timeOptions.map(time => <option key={time}>{time}</option>)}
                            </select>
                            <MaterialIcon name="expand_more" className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-400 mb-1 block">End Time</label>
                            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-[#1F2125] appearance-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50">
                                {timeOptions.map(time => <option key={time}>{time}</option>)}
                            </select>
                            <MaterialIcon name="expand_more" className="absolute right-3 bottom-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                     <div>
                        <div className="text-center text-sm text-gray-400 mb-2 flex items-center justify-center gap-2">
                            <MaterialIcon name="schedule" className="!text-base" /> {duration}
                        </div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block text-center">Day's Schedule</label>
                        <div className="bg-[#1F2125] rounded-full h-3 relative overflow-hidden">
                            <div className="absolute top-0 h-full rounded-full" style={{...scheduleBarStyle, backgroundColor: selectedColor}}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                            <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
                        </div>
                    </div>

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
            `}</style>
        </div>
    );
};

export default AddEventModal;
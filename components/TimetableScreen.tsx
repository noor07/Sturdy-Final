import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import type { TimetableEvent } from '../types';
import { AddIcon } from './icons/Icons';

interface TimetableScreenProps {
    onBack: () => void;
    events: TimetableEvent[];
}

const TimetableScreen: React.FC<TimetableScreenProps> = ({ onBack, events }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    const selectedDateRef = useRef<HTMLButtonElement>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000 * 60); // Update every minute
        return () => clearInterval(timerId);
    }, []);

    useLayoutEffect(() => {
        if (selectedDateRef.current) {
            if (isInitialMount.current) {
                // For the very first load, a small delay can help ensure the layout is fully computed
                // before we try to scroll. This is a common workaround for tricky race conditions.
                const timerId = setTimeout(() => {
                    selectedDateRef.current?.scrollIntoView({
                        behavior: 'auto',
                        inline: 'center',
                        block: 'nearest',
                    });
                }, 0);
                isInitialMount.current = false;
                return () => clearTimeout(timerId);
            } else {
                // For subsequent date selections, scroll smoothly without delay.
                selectedDateRef.current.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                });
            }
        }
    }, [selectedDate]);


    const getDaysForScroller = () => {
        const dates = [];
        const today = new Date();
        // Generate a wider range of dates for better scrollability (approx. 6 months in each direction).
        for (let i = -182; i <= 182; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };

    const hasEventsOnDay = (day: Date) => {
        return events.some(event => isSameDay(new Date(event.startTime), day));
    };

    const days = getDaysForScroller();
    const hours = Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(i, 0, 0, 0);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    });

    return (
        <div className="bg-[#1F2125] h-screen text-white font-sans flex flex-col">
            <header className="px-4 pt-4">
                <div className="flex justify-between items-center py-4">
                     <div>
                        <p className="text-gray-400 text-sm">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                        </p>
                        <p className="text-xl font-bold">
                            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                     <div className="text-right">
                         <p className="text-gray-400 text-sm">Current Time</p>
                         <p className="text-xl font-bold font-mono">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                         </p>
                     </div>
                </div>

                <div className="flex overflow-x-auto space-x-4 py-3 no-scrollbar">
                    {days.map((day) => {
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                            <button
                                key={day.toISOString()}
                                ref={isSelected ? selectedDateRef : null}
                                onClick={() => setSelectedDate(day)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-16 h-20 flex-shrink-0
                                    ${isSelected ? 'bg-[#A89AFF]' : 'hover:bg-white/10'}`}
                            >
                                <span className={`font-bold text-xl ${isSelected ? 'text-black' : 'text-white'}`}>{day.getDate()}</span>
                                <span className={`text-xs mt-1 ${isSelected ? 'text-black' : 'text-gray-400'}`}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                {hasEventsOnDay(day) && (
                                     <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isSelected ? 'bg-black' : 'bg-[#A89AFF]'}`}></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto px-4 mt-4 relative no-scrollbar">
                <div className="relative">
                    {hours.map((hour) => (
                        <div key={hour} className="flex items-start h-20">
                            <div className="w-16 text-right pr-4">
                                <span className="text-xs text-gray-500">{hour}</span>
                            </div>
                            <div className="flex-1 border-t border-gray-800 h-full">
                                {/* Event blocks would be positioned absolutely within this container */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            
            <button
                className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-[#A89AFF] text-black flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-200 z-40"
                aria-label="Add new event"
            >
                <AddIcon className="w-9 h-9" />
            </button>
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default TimetableScreen;
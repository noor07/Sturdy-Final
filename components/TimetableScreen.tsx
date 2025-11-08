import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import type { TimetableEvent } from '../types';
import { AddIcon } from './icons/Icons';
import AddEventModal from './AddEventModal';

interface TimetableScreenProps {
    onBack: () => void;
    events: TimetableEvent[];
    onAddEvent: (event: Omit<TimetableEvent, 'id'>) => void;
    onUpdateEvent: (eventId: string, updatedData: Partial<Omit<TimetableEvent, 'id'>>) => void;
    onDeleteEvent: (eventId: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const TimetableScreen: React.FC<TimetableScreenProps> = ({ onBack, events, onAddEvent, onUpdateEvent, onDeleteEvent, isModalOpen, setIsModalOpen }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [editingEvent, setEditingEvent] = useState<TimetableEvent | null>(null);

    const selectedDateRef = useRef<HTMLButtonElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    const isSameDay = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    };
    
    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000 * 60); // Update every minute
        return () => clearInterval(timerId);
    }, []);

    useLayoutEffect(() => {
        if (selectedDateRef.current) {
            const behavior = isInitialMount.current ? 'auto' : 'smooth';
            selectedDateRef.current.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
        }
    }, [selectedDate]);
    
    useEffect(() => {
       if (isInitialMount.current && scrollContainerRef.current && isSameDay(selectedDate, new Date())) {
            const currentHour = currentTime.getHours();
            // Scroll to 2 hours before the current time, or top if it's early morning
            const scrollTargetHour = Math.max(0, currentHour - 2); 
            // 14rem per hour. 1rem is typically 16px.
            const scrollTop = scrollTargetHour * 14 * 16;
            setTimeout(() => {
              scrollContainerRef.current?.scrollTo({ top: scrollTop, behavior: 'auto' });
            }, 100); // Small delay to ensure layout is complete
        }
        isInitialMount.current = false;
    }, []); // This effect runs only once on mount


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

    const startOfDay = (date: Date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    const hasEventsOnDay = (day: Date) => {
        const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
        const startOfGivenDay = startOfDay(day);

        return events.some(event => {
            const originalStartDate = new Date(event.start_time);
            const startOfOriginalDate = startOfDay(originalStartDate);

            // Check if it's the original day of the event
            if (isSameDay(originalStartDate, day)) {
                return true;
            }

            // Check for repeating events, ensuring we don't show them before they start
            if (event.repeats && event.repeats !== 'Does not repeat' && startOfGivenDay.getTime() >= startOfOriginalDate.getTime()) {
                if (event.repeats === 'Daily') return true;
                const repeatDays = event.repeats.split(', ');
                if (repeatDays.includes(dayOfWeek)) return true;
            }
            
            return false;
        });
    };
    
    const handleSaveFromModal = (eventData: Omit<TimetableEvent, 'id'>) => {
        if (editingEvent) {
            onUpdateEvent(editingEvent.id, eventData);
        } else {
            onAddEvent(eventData);
        }
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const handleDeleteFromModal = (eventId: string) => {
        onDeleteEvent(eventId);
        setIsModalOpen(false);
        setEditingEvent(null);
    };

    const dateToMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

    const eventsForSelectedDay = useMemo(() => {
        const resultingEvents: TimetableEvent[] = [];
        const selectedDayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const selectedDateStart = startOfDay(selectedDate);

        for (const event of events) {
            const originalStartDate = new Date(event.start_time);
            const originalStartDateStart = startOfDay(originalStartDate);
            
            // Handle non-repeating events
            if (!event.repeats || event.repeats === 'Does not repeat') {
                if (isSameDay(originalStartDate, selectedDate)) {
                    resultingEvents.push(event);
                }
                continue; // Move to next event
            }
            
            // Handle repeating events
            let shouldDisplay = false;
            if (event.repeats === 'Daily') {
                shouldDisplay = true;
            } else {
                const repeatDays = event.repeats.split(', ');
                if (repeatDays.includes(selectedDayOfWeek)) {
                    shouldDisplay = true;
                }
            }

            // Ensure we don't show repeating events before their original start date
            if (shouldDisplay && selectedDateStart.getTime() >= originalStartDateStart.getTime()) {
                // Create a virtual event for the selected day
                const newStartTime = new Date(selectedDate);
                newStartTime.setHours(originalStartDate.getHours(), originalStartDate.getMinutes(), originalStartDate.getSeconds(), originalStartDate.getMilliseconds());

                const originalEndTime = new Date(event.end_time);
                const newEndTime = new Date(selectedDate);
                newEndTime.setHours(originalEndTime.getHours(), originalEndTime.getMinutes(), originalEndTime.getSeconds(), originalEndTime.getMilliseconds());

                resultingEvents.push({
                    ...event,
                    original_id: event.id, // Keep track of the original event ID
                    id: `${event.id}-${selectedDate.toISOString().split('T')[0]}`, // Create a unique key for this instance
                    start_time: newStartTime.toISOString(),
                    end_time: newEndTime.toISOString(),
                });
            }
        }
        return resultingEvents;
    }, [events, selectedDate]);


    const currentTimePosition = (dateToMinutes(currentTime) / (24 * 60)) * 100;
    const isToday = isSameDay(currentTime, selectedDate);

    const days = getDaysForScroller();
    
    const timeIntervals = Array.from({ length: 24 * 4 }, (_, i) => {
        const totalMinutes = i * 15;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);

        const label = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        
        let styleClass = 'font-normal text-gray-600 text-[10px]';
        if (minutes === 0) {
            styleClass = 'font-bold text-gray-400 text-xs';
        } else if (minutes === 30) {
            styleClass = 'font-semibold text-gray-500 text-xs';
        }

        return { label, styleClass };
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
                                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-16 h-20 flex-shrink-0 transform active:scale-95
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

            <main ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 mt-4 relative no-scrollbar">
                <div className="relative h-[336rem]"> {/* 24 hours * 14rem */}
                    {/* 15-minute Grid Lines */}
                    {timeIntervals.map(({ label, styleClass }, index) => (
                        <div key={index} className="flex items-start h-14"> {/* 3.5rem height for each 15-min slot */}
                            <div className="w-20 text-right pr-4"> {/* Increased width for time labels */}
                                {index > 0 && <span className={`${styleClass} -translate-y-1/2 block`}>{label}</span>}
                            </div>
                            <div className="flex-1 border-t border-gray-800/70 h-full"></div>
                        </div>
                    ))}

                    {/* Current Time Indicator */}
                    {isToday && (
                        <div 
                            className="absolute left-20 right-0 h-0.5 bg-red-400 z-10" 
                            style={{ top: `${currentTimePosition}%` }}
                        >
                            <div className="absolute -left-1.5 -top-1 w-3 h-3 rounded-full bg-red-400 border-2 border-[#1F2125]"></div>
                        </div>
                    )}

                    {/* Event Blocks */}
                    {eventsForSelectedDay.map(event => {
                        const start = new Date(event.start_time);
                        const end = new Date(event.end_time);
                        const top = (dateToMinutes(start) / (24 * 60)) * 100;
                        const height = ((dateToMinutes(end) - dateToMinutes(start)) / (24 * 60)) * 100;

                        return (
                            <button
                                key={event.id}
                                onClick={() => {
                                    const originalEvent = events.find(e => e.id === (event.original_id || event.id));
                                    if (originalEvent) {
                                        setEditingEvent(originalEvent);
                                        setIsModalOpen(true);
                                    }
                                }}
                                className="absolute left-[5.5rem] right-0 flex items-stretch text-left"
                                style={{
                                    top: `${top}%`,
                                    height: `calc(${height}% - 4px)`,
                                }}
                            >
                                <div className="w-1.5 mr-2">
                                    <div className="h-full w-full rounded-full" style={{ backgroundColor: event.color }}></div>
                                </div>
                                <div className="flex-1 bg-[#2D2F34] rounded-lg p-2 overflow-hidden flex flex-col justify-center">
                                     <p className="font-bold text-sm text-white drop-shadow-sm truncate">{event.title}</p>
                                     <p className="text-xs text-white/80 drop-shadow-sm mt-0.5">
                                        {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        {' - '}
                                        {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </p>
                                    {event.description && (
                                        <p className="text-xs text-white/60 drop-shadow-sm mt-1 truncate">{event.description}</p>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>
            
            <button
                onClick={() => {
                    setEditingEvent(null);
                    setIsModalOpen(true);
                }}
                className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-[#A89AFF] text-black flex items-center justify-center shadow-xl transform hover:scale-110 active:scale-100 transition-all duration-200 z-40"
                aria-label="Add new event"
            >
                <AddIcon className="w-6 h-6" />
            </button>

            {isModalOpen && (
                <AddEventModal 
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingEvent(null);
                    }} 
                    onSave={handleSaveFromModal}
                    onDelete={handleDeleteFromModal}
                    selectedDate={selectedDate}
                    events={events}
                    eventToEdit={editingEvent}
                />
            )}
        </div>
    );
};

export default TimetableScreen;
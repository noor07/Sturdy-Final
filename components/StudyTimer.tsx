
import React, { useState, useEffect, useRef } from 'react';

interface StudyTimerProps {
  onBack: () => void;
  onSessionComplete: () => void;
}

const STUDY_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const StudyTimer: React.FC<StudyTimerProps> = ({ onBack, onSessionComplete }) => {
  const [time, setTime] = useState(STUDY_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);
  
  useEffect(() => {
    if (time === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsActive(false);
      
      if (!isBreak) {
        onSessionComplete();
        setIsBreak(true);
        setTime(BREAK_DURATION);
      } else {
        setIsBreak(false);
        setTime(STUDY_DURATION);
      }
    }
  }, [time, isBreak, onSessionComplete]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(false);
    setTime(STUDY_DURATION);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-slate-800 p-6 rounded-xl ring-1 ring-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Focus Timer</h2>
        <button
          onClick={onBack}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
        >
          &larr; Back
        </button>
      </div>

      <div className="text-center">
        <div className={`w-56 h-56 mx-auto rounded-full flex items-center justify-center transition-colors duration-500 ${isBreak ? 'bg-green-500/20' : 'bg-cyan-500/20'}`}>
          <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-colors duration-500 ${isBreak ? 'bg-green-500/30' : 'bg-cyan-500/30'}`}>
             <div className="text-center">
               <p className={`font-mono text-6xl font-bold transition-colors duration-500 ${isBreak ? 'text-green-300' : 'text-cyan-300'}`}>
                 {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
               </p>
               <p className={`text-lg font-semibold tracking-wider uppercase transition-colors duration-500 ${isBreak ? 'text-green-400' : 'text-cyan-400'}`}>
                 {isBreak ? 'Break Time' : 'Focus'}
               </p>
             </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={toggleTimer} className={`px-6 py-3 text-base font-bold rounded-lg transition-colors duration-200 ${isActive ? 'bg-yellow-500 text-slate-900' : 'bg-green-500 text-slate-900'}`}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} className="px-6 py-3 text-base font-bold bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;

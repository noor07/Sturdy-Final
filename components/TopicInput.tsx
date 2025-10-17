
import React, { useState } from 'react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
}

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-800 p-6 rounded-xl shadow-2xl shadow-slate-950/50 ring-1 ring-white/10">
      <h2 className="text-xl font-bold text-center mb-2">Welcome!</h2>
      <p className="text-center text-slate-400 mb-6">What subject would you like to master today?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Quantum Physics..."
          className="w-full bg-slate-700/50 text-white placeholder-slate-500 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
        <button
          type="submit"
          disabled={!topic.trim()}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Start Studying
        </button>
      </form>
    </div>
  );
};

export default TopicInput;

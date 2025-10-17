
import React from 'react';

interface StudyNotesProps {
  notes: string;
  onBack: () => void;
}

// Simple component to render markdown-like text with basic styling
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');

    return (
        <div className="space-y-3">
            {lines.map((line, index) => {
                line = line.trim();
                if (line.startsWith('###')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 text-cyan-300">{line.replace(/###/g, '')}</h3>;
                }
                if (line.startsWith('##')) {
                    return <h2 key={index} className="text-xl font-bold mt-5 border-b border-slate-600 pb-2 text-purple-300">{line.replace(/##/g, '')}</h2>;
                }
                if (line.startsWith('#')) {
                    return <h1 key={index} className="text-2xl font-extrabold mt-6 border-b-2 border-slate-500 pb-3 text-purple-300">{line.replace(/#/g, '')}</h1>;
                }
                if (line.startsWith('* ')) {
                    return <li key={index} className="ml-5 list-disc text-slate-300">{line.substring(2)}</li>;
                }
                if (line === '') {
                    return <div key={index} className="h-2"></div>;
                }
                 // Simple bold text handling
                 const parts = line.split(/(\*\*.*?\*\*)/g);
                 return (
                     <p key={index} className="text-slate-300 leading-relaxed">
                         {parts.map((part, i) =>
                             part.startsWith('**') && part.endsWith('**') ?
                             <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong> :
                             part
                         )}
                     </p>
                 );
            })}
        </div>
    );
};


const StudyNotes: React.FC<StudyNotesProps> = ({ notes, onBack }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-xl ring-1 ring-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Study Guide</h2>
        <button
          onClick={onBack}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
        >
          &larr; Back
        </button>
      </div>
      <div className="prose prose-invert max-w-none bg-slate-800/50 p-4 rounded-lg">
         <FormattedText text={notes} />
      </div>
    </div>
  );
};

export default StudyNotes;

import React, { useState, useEffect, useRef } from 'react';
import type { Note, Subject } from '../types';
import { CameraIcon, CloseIcon, AddIcon, ArrowBackIcon, EditIcon, ChevronDownIcon } from './icons/Icons';

interface NoteDetailScreenProps {
    note: Note;
    subjects: Subject[];
    onBack: () => void;
    onUpdateNote: (noteId: string, updatedData: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
}

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({ note, subjects, onBack, onUpdateNote }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    // State for the edit form
    const [title, setTitle] = useState(note.title);
    const [subjectName, setSubjectName] = useState(note.subjectName);
    const [content, setContent] = useState(note.content || '');
    const [images, setImages] = useState<string[]>(note.images || []);
    
    const cameraInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTitle(note.title);
        setSubjectName(note.subjectName);
        setContent(note.content || '');
        setImages(note.images || []);
    }, [note]);
    
    const handleSaveChanges = () => {
        if (!title.trim() || !subjectName.trim()) {
            alert('Title and subject cannot be empty.');
            return;
        }
        
        const isImageNote = note.images !== undefined;
        if (isImageNote && images.length === 0) {
            alert('An image note must contain at least one image.');
            return;
        }
        if (!isImageNote && !content.trim()) {
            alert('Note content cannot be empty.');
            return;
        }

        const updatedData = isImageNote
            ? { title, subjectName, images, content: undefined }
            : { title, subjectName, content, images: undefined };
        
        onUpdateNote(note.id, updatedData);
        setIsEditing(false);
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageFiles = Array.from(files).filter((file: File) => file.type.startsWith('image/'));
            const oversizedFiles = imageFiles.filter((f: File) => f.size > 10 * 1024 * 1024);
            if (oversizedFiles.length > 0) {
                 alert(`Error: Some images exceed the 10MB size limit.`);
                 return;
            }
            try {
                const base64Promises = imageFiles.map(fileToBase64);
                const base64Images = await Promise.all(base64Promises);
                setImages(prev => [...prev, ...base64Images]);
            } catch (error) {
                console.error("Error converting files to base64", error);
                alert("There was an error processing your images.");
            }
        }
    };


    return (
        <>
        <div className="bg-[#1F2125] min-h-screen text-white font-sans">
            <div className="p-4 max-w-md mx-auto">
                <header className="flex items-center py-4 relative justify-between">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowBackIcon className="text-gray-300 w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold">Note Details</h1>
                    <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <EditIcon className="text-gray-300 w-5 h-5" />
                    </button>
                </header>

                <main className="mt-4 bg-[#2D2F34] rounded-xl p-5">
                    <p className="text-sm text-green-400 font-semibold uppercase tracking-wider">{note.subjectName}</p>
                    <h2 className="text-2xl font-bold text-white mt-1 mb-3">{note.title}</h2>
                    <p className="text-xs text-gray-400 mb-4">
                        Created on {new Date(note.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <hr className="border-gray-700 my-4" />
                    {note.content && (
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{note.content}</div>
                    )}
                    {note.images && note.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {note.images.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`Note image ${index + 1}`} className="w-full h-auto object-cover rounded-lg" />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
        
        <input type="file" ref={cameraInputRef} onChange={onFileSelected} accept="image/*" multiple style={{ display: 'none' }} />

        {/* Edit Modal */}
        {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-[#2D2F34] rounded-2xl p-6 w-full max-w-sm m-4 flex flex-col text-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Edit Note</h2>
                        <button onClick={() => setIsEditing(false)} className="p-1 rounded-full hover:bg-white/10">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <input 
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[#1F2125] text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50"
                        />
                        <div className="relative">
                            <select
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                className="w-full bg-[#1F2125] text-white appearance-none border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50"
                            >
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.name}>{subject.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDownIcon className="text-gray-400" />
                            </div>
                        </div>

                        {note.content !== undefined ? (
                            <textarea 
                                placeholder="Type your note here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={5}
                                className="w-full bg-[#1F2125] text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50 resize-none"
                            />
                        ) : (
                             <div className="p-2 bg-[#1F2125] border border-gray-700 rounded-lg min-h-[140px]">
                                <div className="grid grid-cols-3 gap-2">
                                {images.map((imgSrc, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img src={imgSrc} alt={`Selected image ${index + 1}`} className="w-full h-full object-cover rounded" />
                                        <button onClick={() => setImages(imgs => imgs.filter((_, i) => i !== index))} className="absolute top-1 right-1 bg-black/60 rounded-full text-white p-0.5">
                                            <CloseIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 9 && (
                                     <button
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="w-full aspect-square flex flex-col items-center justify-center bg-[#2a2d31] border-2 border-dashed border-gray-600 rounded-lg text-gray-500 hover:bg-gray-800/50 hover:border-gray-500 transition-colors"
                                    >
                                        <AddIcon className="w-6 h-6" />
                                    </button>
                                )}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSaveChanges}
                        className="w-full mt-6 bg-[#A89AFF] text-black font-bold py-3 px-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#A89AFF]/30"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        )}
        <style>{`
             @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fade-in 0.2s ease-out;
            }
        `}</style>
        </>
    );
};

export default NoteDetailScreen;
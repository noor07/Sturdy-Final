import React, { useState, useRef, useEffect } from 'react';
import type { Subject, Note } from '../types';
import { SearchIcon, BookIcon, CameraIcon, AddIcon, CloseIcon, TrashIcon, NotesIcon, ChevronDownIcon } from './icons/Icons';

interface NotesScreenProps {
    onBack: () => void;
    subjects: Subject[];
    notes: Note[];
    onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
    onSelectNote: (note: Note) => void;
    onDeleteNote: (noteId: string) => void;
}

const NotesScreen: React.FC<NotesScreenProps> = ({ onBack, subjects, notes, onAddNote, onSelectNote, onDeleteNote }) => {
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
    const [isCreateTextNoteModalOpen, setIsCreateTextNoteModalOpen] = useState(false);
    const [isCreateImageNoteModalOpen, setIsCreateImageNoteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // Modal form state
    const [title, setTitle] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    
    useEffect(() => {
        if(subjects.length > 0 && !subjectName) {
            setSubjectName(subjects[0].name);
        }
    }, [subjects, subjectName]);


    const resetModalForm = () => {
        setTitle('');
        setSubjectName(subjects.length > 0 ? subjects[0].name : '');
        setContent('');
        setSelectedImages([]);
    };
    
    const handleOpenCreateTextNoteModal = () => {
        resetModalForm();
        setIsCreateTextNoteModalOpen(true);
        setIsFabMenuOpen(false);
    };

    const handleOpenCreateImageNoteModal = () => {
        resetModalForm();
        setIsCreateImageNoteModalOpen(true);
        setIsFabMenuOpen(false);
    };

    const handleSaveTextNote = () => {
        if (!title.trim() || !subjectName.trim() || !content.trim()) {
            alert('Please fill out all fields.');
            return;
        }
        onAddNote({ title, subjectName, content });
        setIsCreateTextNoteModalOpen(false);
    };
    
    const handleSaveImageNote = () => {
        if (!title.trim() || !subjectName.trim() || selectedImages.length === 0) {
            alert('Please provide a title, subject, and at least one image.');
            return;
        }
        onAddNote({ title, subjectName, images: selectedImages });
        setIsCreateImageNoteModalOpen(false);
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
                setSelectedImages(prev => [...prev, ...base64Images]);
            } catch (error) {
                console.error("Error converting files to base64", error);
                alert("There was an error processing your images.");
            }
        }
    };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        note.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <div className="bg-[#2D2F34] min-h-screen text-white font-sans pb-32 relative">
            <div className="p-4 max-w-md mx-auto">
                <header className="py-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#1F2125] text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50"
                        />
                    </div>
                </header>
                
                {filteredNotes.length === 0 ? (
                    <main className="mt-20 flex flex-col items-center justify-center text-center h-[50vh]">
                        <BookIcon className="h-20 w-20 text-gray-600" />
                        <h2 className="text-xl font-bold mt-4 text-gray-300">No Notes Found</h2>
                        <p className="text-gray-500 mt-1">Create one using the button below!</p>
                    </main>
                ) : (
                    <main className="mt-6 space-y-4">
                        {filteredNotes.map(note => (
                            <div key={note.id} className="bg-[#1F2125] p-4 rounded-xl border border-gray-800/50 shadow-sm transition-all duration-200 hover:border-gray-700">
                                <button onClick={() => onSelectNote(note)} className="w-full text-left">
                                    <p className="text-sm text-green-400 font-semibold uppercase tracking-wider">{note.subjectName}</p>
                                    <h3 className="font-bold text-xl text-white mt-1 truncate">{note.title}</h3>
                                    {note.images && note.images.length > 0 ? (
                                        <img src={note.images[0]} alt="Note preview" className="mt-2 rounded-lg h-32 w-full object-cover" />
                                    ) : (
                                        <p className="text-gray-400 text-sm line-clamp-2 mt-1 h-10">{note.content}</p>
                                    )}
                                </button>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                                    <p className="text-xs text-gray-500">
                                        {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteNote(note.id);
                                        }} 
                                        className="p-2 text-gray-500 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10"
                                        aria-label="Delete note"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </main>
                )}
            </div>
            
            <input type="file" ref={cameraInputRef} onChange={onFileSelected} accept="image/*" multiple style={{ display: 'none' }} />
            
            {/* FAB Menu */}
            <div className="fixed bottom-24 right-6 flex flex-col items-center gap-4 z-40">
                <div 
                    className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-4 ${isFabMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
                >
                     <button
                        onClick={handleOpenCreateImageNoteModal}
                        className="w-14 h-14 rounded-full bg-[#A89AFF] text-black flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                        aria-label="Capture note with camera"
                    >
                        <CameraIcon className="w-7 h-7" />
                    </button>
                    <button
                        onClick={handleOpenCreateTextNoteModal}
                        className="w-14 h-14 rounded-full bg-[#A89AFF] text-black flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                        aria-label="Create text note"
                    >
                        <NotesIcon isActive className="!text-black w-8 h-8" />
                    </button>
                </div>

                <button
                    onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
                    className="w-16 h-16 rounded-full bg-[#A89AFF] text-black flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-200"
                    aria-expanded={isFabMenuOpen}
                    aria-label={isFabMenuOpen ? 'Close note options' : 'Open note options'}
                >
                    <div className={`transform transition-transform duration-300 ${isFabMenuOpen ? 'rotate-45' : 'rotate-0'}`}>
                       <AddIcon className="w-9 h-9" />
                    </div>
                </button>
            </div>
        </div>

        {/* Create Text Note Modal */}
        {isCreateTextNoteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-[#2D2F34] rounded-2xl p-6 w-full max-w-sm m-4 flex flex-col text-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Create New Note</h2>
                        <button onClick={() => setIsCreateTextNoteModalOpen(false)} className="p-1 rounded-full hover:bg-white/10">
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
                                {subjects.length === 0 && <option disabled>No subjects available</option>}
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.name}>{subject.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDownIcon className="text-gray-400" />
                            </div>
                        </div>
                        <textarea 
                            placeholder="Type your note here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={5}
                            className="w-full bg-[#1F2125] text-white placeholder-gray-500 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A89AFF]/50 resize-none"
                        />
                    </div>
                    <button
                        onClick={handleSaveTextNote}
                        className="w-full mt-6 bg-[#A89AFF] text-black font-bold py-3 px-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#A89AFF]/30"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        )}

        {/* Create Image Note Modal */}
        {isCreateImageNoteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-[#2D2F34] rounded-2xl p-6 w-full max-w-sm m-4 flex flex-col text-white shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Create New Note</h2>
                        <button onClick={() => setIsCreateImageNoteModalOpen(false)} className="p-1 rounded-full hover:bg-white/10">
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
                                {subjects.length === 0 && <option disabled>No subjects available</option>}
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.name}>{subject.name}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDownIcon className="text-gray-400" />
                            </div>
                        </div>
                        
                        {selectedImages.length > 0 ? (
                            <div className="p-2 bg-[#1F2125] border border-gray-700 rounded-lg min-h-[140px]">
                                <div className="grid grid-cols-3 gap-2">
                                {selectedImages.map((imgSrc, index) => (
                                    <div key={index} className="relative aspect-square">
                                        <img src={imgSrc} alt={`Selected image ${index + 1}`} className="w-full h-full object-cover rounded" />
                                        <button onClick={() => setSelectedImages(imgs => imgs.filter((_, i) => i !== index))} className="absolute top-1 right-1 bg-black/60 rounded-full text-white p-0.5">
                                            <CloseIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {selectedImages.length < 9 && (
                                     <button
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="w-full aspect-square flex flex-col items-center justify-center bg-[#2a2d31] border-2 border-dashed border-gray-600 rounded-lg text-gray-500 hover:bg-gray-800/50 hover:border-gray-500 transition-colors"
                                    >
                                        <AddIcon className="w-6 h-6" />
                                    </button>
                                )}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => cameraInputRef.current?.click()}
                                className="w-full min-h-[140px] flex flex-col items-center justify-center bg-[#1F2125] border-2 border-dashed border-gray-600 rounded-lg text-gray-500 hover:bg-[#2a2d31] hover:border-gray-500 transition-colors"
                            >
                                <CameraIcon className="w-8 h-8" />
                                <span className="mt-2 text-sm">Capture or select an image.</span>
                            </button>
                        )}

                    </div>
                    <button
                        onClick={handleSaveImageNote}
                        className="w-full mt-6 bg-[#A89AFF] text-black font-bold py-3 px-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#A89AFF]/30"
                    >
                        Save Note
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
            .line-clamp-2 {
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        `}</style>
        </>
    );
};

export default NotesScreen;
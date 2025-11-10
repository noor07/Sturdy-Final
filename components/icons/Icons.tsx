import React from 'react';

export const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

export const ClockIcon: React.FC<{ colorClass?: string; className?: string }> = ({ colorClass = 'text-blue-400', className = 'h-6 w-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ colorClass?: string }> = ({ colorClass = 'text-green-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PuzzlePieceIcon: React.FC<{ colorClass?: string }> = ({ colorClass = 'text-cyan-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6 text-gray-300' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4 text-gray-400' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const PlayIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6 text-black' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6 text-gray-600' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const HomeIcon: React.FC<{ isActive: boolean, className?: string }> = ({ isActive, className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${isActive ? 'text-white' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

const IconWrapper: React.FC<{ isActive: boolean; children: React.ReactNode; className?: string }> = ({ isActive, children, className = 'h-6 w-6' }) => {
    return (
        <div className={`${className} ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {children}
        </div>
    );
};

export const FlashcardIcon: React.FC<{ isActive: boolean; className?: string }> = ({ isActive, className }) => (
    <IconWrapper isActive={isActive} className={className}>
        {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM4 18V6h16v12H4zm8-7H4v2h8v-2zm6-4H4v2h14v-2z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        )}
    </IconWrapper>
);

export const NotesIcon: React.FC<{ isActive: boolean; className?: string }> = ({ isActive, className }) => (
    <IconWrapper isActive={isActive} className={className}>
        {isActive ? (
             <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M493.268,0H18.732C8.387,0,0,8.387,0,18.732v474.537C0,503.613,8.387,512,18.732,512h285.735 c6.897,0,12.488-5.591,12.488-12.488V326.319c0-5.172,4.193-9.366,9.366-9.366h173.192c6.897,0,12.488-5.591,12.488-12.488 V18.732C512,8.387,503.613,0,493.268,0z M393.975,247.214H118.026c-5.174,0-9.366-4.193-9.366-9.366 c0-5.172,4.192-9.366,9.366-9.366h275.949c5.174,0,9.366,4.193,9.366,9.366C403.341,243.02,399.149,247.214,393.975,247.214z M393.975,147.677H118.026c-5.174,0-9.366-4.193-9.366-9.366c0-5.172,4.192-9.366,9.366-9.366h275.949 c5.174,0,9.366,4.193,9.366,9.366C403.341,143.484,399.149,147.677,393.975,147.677z"></path>
                <path d="M480.039,335.686H348.172c-6.896-0.001-12.488,5.591-12.488,12.487v131.89c0,11.083,13.354,16.679,21.248,8.9 c33.682-33.196,98.807-98.344,132.007-132.03C496.72,349.04,491.122,335.686,480.039,335.686z"></path>
            </svg>
        ) : (
            <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M493.268,0H18.732C8.387,0,0,8.387,0,18.732v474.537C0,503.613,8.387,512,18.732,512h307.572c0.004,0,0.009,0,0.013,0 c4.757,0,9.671-1.906,13.248-5.487l166.948-166.949c3.413-3.41,5.487-8.208,5.487-13.245V18.732C512,8.387,503.613,0,493.268,0z M345.052,448.046V345.051h102.994C418.242,374.855,374.855,418.242,345.052,448.046z M474.537,307.587H326.32 c-10.345,0-18.732,8.387-18.732,18.732v148.218H37.463V37.463h437.073V307.587z"></path>
                <path d="M118.026,157.043h275.949c10.345,0,18.732-8.387,18.732-18.732c0-10.345-8.387-18.732-18.732-18.732H118.026 c-10.345,0-18.732,8.387-18.732,18.732C99.294,148.656,107.681,157.043,118.026,157.043z"></path>
                <path d="M118.026,256.579h275.949c10.345,0,18.732-8.387,18.732-18.732c0-10.345-8.387-18.732-18.732-18.732H118.026 c-10.345,0-18.732,8.387-18.732,18.732C99.294,248.193,107.681,256.579,118.026,256.579z"></path>
            </svg>
        )}
    </IconWrapper>
);

export const TimetableIcon: React.FC<{ isActive: boolean; className?: string }> = ({ isActive, className }) => (
    <IconWrapper isActive={isActive} className={className}>
        {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zM4.5 8.25a.75.75 0 000 1.5h11a.75.75 0 000-1.5h-11z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )}
    </IconWrapper>
);

export const AvatarIcon = () => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="34" cy="36" r="4" fill="#424242"/>
        <circle cx="46" cy="36" r="4" fill="#424242"/>
        <path d="M28 22L40 30L52 22" stroke="#424242" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5 text-gray-400' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5 text-gray-400' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const GraduationCapIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 011.056 0l4 2a1 1 0 001.056 0l4-2a.999.999 0 011.056 0l2.606-1.302a1 1 0 000-1.84l-7-3zM3 9.369V14a1 1 0 00.553.894l6 3a1 1 0 00.894 0l6-3A1 1 0 0017 14V9.369l-6 3a1 1 0 01-.894 0l-6-3z" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const BookIcon: React.FC<{ className?: string }> = ({ className = 'h-16 w-16' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const AddIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ArrowBackIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
    </svg>
);

export const ArrowForwardIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"/>
    </svg>
);

export const PlayArrowIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
    </svg>
);

export const SellIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.22-1.05-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.01z"/>
        <circle cx="6.5" cy="6.5" r="1.5"/>
    </svg>
);

export const ErrorIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
);

export const ReplayIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" />
    </svg>
);

export const FlashcardCheckIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const FlashcardXIcon: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ShuffleIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 0-2.5 4-2.5-4-7 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7 0-2.5-4-2.5 4-7 0" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.9999 21C11.9999 21 15.9999 18.5 15.9999 13V6H7.99988V13C7.99988 18.5 11.9999 21 11.9999 21Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9H3V11H6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9H21V11H18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H15" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

// Rich Text Editor Icons
export const FormatBoldIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></svg>
);
export const FormatItalicIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></svg>
);
export const FormatListBulletedIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></svg>
);
export const FormatListNumberedIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 11.9V11H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></svg>
);
export const ChecklistIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="m9.55 18-5.7-5.7 1.4-1.4 4.3 4.3 9.3-9.3 1.4 1.4ZM4 22q-.825 0-1.412-.587Q2 20.825 2 20V4q0-.825.588-1.413Q3.175 2 4 2h16q.825 0 1.413.587Q22 3.175 22 4v16q0 .825-.587 1.413Q20.825 22 20 22Zm0-2h16V4H4v16ZM4 4v16V4Z"></path></svg>
);
export const FormatParagraphIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11 20v-8h1.5q1.875 0 3.188-1.312Q17 9.375 17 7.5q0-1.875-1.312-3.188Q14.375 3 12.5 3H7v17h2v-7h2Z"></path></svg>
);
export const TextIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path>
    </svg>
);
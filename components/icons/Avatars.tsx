import React from 'react';

type AvatarProps = { className?: string };

export const DefaultAvatar: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-500" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
);

const Avatar1: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="40" cy="36" r="10" fill="#424242"/>
        <path d="M28 28C28 28 32 25 40 25C48 25 52 28 52 28" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar2: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M62 65C62 56.7157 54.2843 50 45 50H35C25.7157 50 18 56.7157 18 65" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="32" cy="36" r="4" fill="#424242"/>
        <circle cx="48" cy="36" r="4" fill="#424242"/>
        <path d="M30 25C30 22.2386 32.2386 20 35 20H45C47.7614 20 50 22.2386 50 25V28H30V25Z" fill="#424242"/>
    </svg>
);
const Avatar3: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M58 63C58 54.7157 50.2843 48 41 48H39C29.7157 48 22 54.7157 22 63" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="34" cy="38" r="4" fill="#424242"/>
        <circle cx="46" cy="38" r="4" fill="#424242"/>
        <path d="M30 30L25 20" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <path d="M50 30L55 20" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar4: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <rect x="28" y="32" width="24" height="8" rx="4" fill="#424242"/>
        <path d="M32 22L28 32" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <path d="M48 22L52 32" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar5: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="33" cy="37" r="4" fill="#424242"/>
        <circle cx="47" cy="37" r="4" fill="#424242"/>
        <path d="M55 25C55 22.2386 52.7614 20 50 20H45V30H55V25Z" fill="#424242"/>
    </svg>
);
const Avatar6: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="40" cy="36" r="12" fill="#E0E0E0" stroke="#424242" strokeWidth="4"/>
        <path d="M28 28C28 28 32 25 40 25C48 25 52 28 52 28" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar7: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <path d="M30 38C30 38 34 42 40 42C46 42 50 38 50 38" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <path d="M25 25H55" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar8: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="34" cy="36" r="4" fill="#424242"/>
        <circle cx="46" cy="36" r="4" fill="#424242"/>
        <path d="M28 22L40 30L52 22" stroke="#424242" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const Avatar9: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <rect x="28" y="34" width="8" height="8" rx="4" fill="#424242"/>
        <rect x="44" y="34" width="8" height="8" rx="4" fill="#424242"/>
        <path d="M28 28C28 28 32 25 40 25C48 25 52 28 52 28" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);
const Avatar10: React.FC<AvatarProps> = ({ className }) => (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="80" height="80" rx="40" fill="#E0E0E0"/>
        <path d="M60 64C60 55.7157 52.2843 49 43 49H37C27.7157 49 20 55.7157 20 64" stroke="#424242" strokeWidth="4" strokeLinecap="round"/>
        <path d="M30 20L40 30L50 20" stroke="#424242" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>
        <circle cx="34" cy="38" r="4" fill="#424242"/>
        <circle cx="46" cy="38" r="4" fill="#424242"/>
    </svg>
);


export const Avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9, Avatar10];

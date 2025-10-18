import React, { useState } from 'react';

interface AuthProps {
    onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(true);

    const handleAuthAction = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate a successful login/signup
        onLogin();
    };

    return (
        <div className="min-h-screen bg-[#1A1C20] text-white flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-600/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-600/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 flex flex-col justify-center w-full max-w-sm text-center">
                 <header className="mb-10">
                    <h1 className="text-6xl font-extrabold">
                        <span className="text-purple-400">Study</span><span className="text-yellow-400">fy</span>
                    </h1>
                    <p className="text-slate-400 mt-2">Your personal study companion</p>
                </header>

                <main className="w-full glass-card rounded-2xl p-6 shadow-2xl">
                    <form id="auth-form" onSubmit={handleAuthAction}>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                defaultValue="fdsfsd@gmail.com"
                                required
                                className="w-full glass-input text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                defaultValue="fdfsf"
                                required
                                className="w-full glass-input text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            />
                        </div>
                         <button
                            type="submit"
                            className="w-full mt-6 bg-white text-black font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105 shadow-lg shadow-purple-500/20"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>
                </main>

                 <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="w-full mt-6 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default Auth;
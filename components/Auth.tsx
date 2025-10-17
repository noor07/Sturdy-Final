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
        <div className="min-h-screen bg-[#222428] text-white flex flex-col items-center p-4">
            <div className="flex-grow flex flex-col justify-center w-full max-w-xs text-center">
                <header className="mb-12">
                    <h1 className="text-6xl font-extrabold">
                        <span style={{color: '#A499F8'}}>Study</span><span style={{color: '#F8D147'}}>fy</span>
                    </h1>
                    <p className="text-slate-400 mt-2">Your personal study companion</p>
                </header>

                <main className="w-full">
                    <form id="auth-form" onSubmit={handleAuthAction}>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className="w-full bg-[#3A3D42] text-white placeholder-slate-400 border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A499F8] transition-all"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full bg-[#3A3D42] text-white placeholder-slate-400 border-none rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#A499F8] transition-all"
                            />
                        </div>
                    </form>
                </main>
            </div>

            <div className="w-full max-w-xs pb-4">
                <div className="space-y-4">
                    <button
                        type="submit"
                        form="auth-form"
                        className="w-full bg-white text-black font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="w-full bg-transparent border border-white/50 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105 hover:bg-white/10"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;

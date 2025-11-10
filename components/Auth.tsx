
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Sign up successful! Please check your email to confirm your account.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.error_description || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#1A1C20] text-white flex flex-col items-center justify-center p-4 overflow-hidden">
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full glass-input text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full glass-input text-white placeholder-slate-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                            />
                        </div>
                         <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-white text-black font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105 active:scale-100 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                </main>

                 <button
                    type="button"
                    onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                    className="w-full mt-6 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default Auth;

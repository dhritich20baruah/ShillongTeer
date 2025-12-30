"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import Dashboard from './Dashboard';

const LoginPage = () => {
  const [session, setSession] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session)
  }

  useEffect(() => {
    fetchSession();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      supabase.auth.Listener.subscription.unsubscribe()
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setEmail("");
      setPassword("");
      if (error) {
        console.error("Error signing up: ", error.message);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setEmail("");
      setPassword("");
      if (error) {
        console.error("Error signing in: ", error.message);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login Card */}
      {session ? (
        <div className='w-full'>
          <div className='w-full flex justify-end'>
            <button onClick={logout} className="bg-red-700 text-white rounded-md p-2 m-3 cursor-pointer hover:bg-red-600">
              Log Out
            </button>
          </div>
            <h1 className='text-2xl text-black font-bold m-3 text-center'>Welcome Admin</h1>
          <Dashboard />
        </div>
      ) : (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 mt-2">{isSignUp ? "Create an account" : "Enter your credentials to update results"}</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@teerhub.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition-active active:scale-95"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Footer Link */}
          <button className="text-center text-gray-500 text-sm mt-8" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
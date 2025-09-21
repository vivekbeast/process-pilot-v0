/* eslint-disable @typescript-eslint/no-explicit-any */
// File: app/profile/page.jsx
"use client";

import { useState, useEffect } from 'react';
import { User, Mail, Edit, LogOut, KeyRound, Save, X, Menu } from 'lucide-react';
import NavBarDashboard from '../dashboard/NavBarDashboard';
// A simple, reusable NavBar component for the top of the page
const NavBar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-[#2a2a2a]/80 backdrop-blur-md border-b border-gray-700">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <span className="font-bold text-xl text-amber-300">Elegant Ape</span>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  </header>
);


export default function MyProfilePage() {
  const [user, setUser] = useState({ loginId: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ loginId: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function runs when the component mounts
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUser(parsedData);
        setFormData(parsedData);
      } else {
        // If no user data, redirect to login page after a short delay
        console.log("No user data found. Redirecting to login.");
        setTimeout(() => {
           window.location.href = '/login';
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to parse user data from local storage:", error);
      // Handle corrupted data by clearing it
      localStorage.removeItem('userData');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    // Update local storage
    localStorage.setItem('userData', JSON.stringify(formData));
    // Update the state
    setUser(formData);
    // Exit editing mode
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userData');
    // Redirect to the login page
    window.location.href = '/login';
  };

  if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-[#1e1e1e] text-amber-300">
            <p className="text-lg">Loading Profile...</p>
        </div>
      );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1e1e1e] text-gray-300 font-sans">
      <NavBarDashboard />
      <main className="flex flex-1 items-center justify-center w-full px-4 pt-24 pb-10">
        <div className="w-full max-w-lg mx-auto bg-[#2a2a2a] rounded-lg shadow-2xl p-6 sm:p-8 border border-gray-700">
            <div className="flex flex-col items-center">
            
            <div className="w-28 h-28 bg-amber-100/10 rounded-full flex items-center justify-center border-2 border-white mb-6">
                <User className="w-14 h-14 text-amber-300" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400 mb-8 text-center">View and manage your account details.</p>
            
            {!isEditing ? (
                // VIEW MODE
                <div className="w-full text-left space-y-4">
                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                    <label className="text-xs text-gray-500 font-semibold uppercase">Login ID</label>
                    <div className="flex items-center gap-3 mt-1">
                        <User className="w-5 h-5 text-amber-300" />
                        <p className="text-lg text-white break-all">{user.loginId}</p>
                    </div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                    <label className="text-xs text-gray-500 font-semibold uppercase">Email</label>
                    <div className="flex items-center gap-3 mt-1">
                        <Mail className="w-5 h-5 text-amber-300" />
                        <p className="text-lg text-white break-all">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-6 flex items-center cursor-pointer justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                >
                    <Edit className="w-5 h-5" /> Edit Profile
                </button>
                </div>
            ) : (
                // EDIT MODE
                <div className="w-full space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Login ID</label>
                    <input
                        type="text"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-400 mb-1 block">Email</label>
                    <input
                        type="email"
                        name="emailId"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="w-full flex items-center cursor-pointer justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" /> Cancel
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="w-full flex items-center cursor-pointer justify-center gap-2 bg-amber-300 hover:bg-amber-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                </div>
                </div>
            )}

            <div className="w-full border-t border-gray-700 my-8"></div>

            {/* ACTION BUTTONS */}
            <div className="w-full space-y-3">
                <button 
                    onClick={() => window.location.href = '/auth/forgot-password'}
                    className="w-full flex items-center justify-center cursor-pointer gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                <KeyRound className="w-5 h-5" /> Change Password
                </button>
                <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center cursor-pointer gap-2 bg-red-800 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                <LogOut className="w-5 h-5" /> Logout
                </button>
            </div>
            </div>
        </div>
      </main>
    </div>
  );
}


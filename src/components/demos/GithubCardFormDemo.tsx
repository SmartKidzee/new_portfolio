import React, { useState } from 'react';
import { GithubCard } from '../ui/shadcn/github-card';
import { motion } from 'framer-motion';

export const GithubCardFormDemo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Developer Name',
    username: 'devusername',
    bio: 'Full-stack developer passionate about React, TypeScript, and building beautiful UIs',
    theme: 'dark',
    accentColor: '#61dafb',
    languages: [
      { name: "JavaScript", color: "#f1e05a", percentage: 40 },
      { name: "TypeScript", color: "#3178c6", percentage: 30 },
      { name: "CSS", color: "#563d7c", percentage: 15 },
      { name: "HTML", color: "#e34c26", percentage: 15 }
    ],
    stats: {
      repos: 42,
      followers: 123,
      following: 45
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      accentColor: e.target.value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">GitHub Card Generator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Card Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-300">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Theme</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Accent Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={handleColorChange}
                  className="w-10 h-10 rounded overflow-hidden"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={handleColorChange}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-gray-300">Stats</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-400">Repositories</label>
                <input
                  type="number"
                  name="repoCount"
                  value={formData.stats.repos}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      stats: {
                        ...prev.stats,
                        repos: parseInt(e.target.value) || 0
                      }
                    }));
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400">Followers</label>
                <input
                  type="number"
                  name="followerCount"
                  value={formData.stats.followers}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      stats: {
                        ...prev.stats,
                        followers: parseInt(e.target.value) || 0
                      }
                    }));
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400">Following</label>
                <input
                  type="number"
                  name="followingCount"
                  value={formData.stats.following}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      stats: {
                        ...prev.stats,
                        following: parseInt(e.target.value) || 0
                      }
                    }));
                  }}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <button
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            Generate Card
          </button>
        </motion.div>
        
        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="max-w-md w-full">
            <GithubCard
              name={formData.name}
              username={formData.username}
              bio={formData.bio}
              theme={formData.theme as "dark" | "light"}
              accentColor={formData.accentColor}
              stats={{
                repos: formData.stats.repos,
                followers: formData.stats.followers,
                following: formData.stats.following
              }}
              languages={formData.languages}
              withAnimation={true}
              avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 
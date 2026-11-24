import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  const popularSearches = [
    'UI/UX Design', 'Branding', 'Web Development', 
    'AI Solutions', 'Mobile App', 'SEO Strategy'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#120822] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(44,21,140,0.4)]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-purple-400 hover:text-white p-2 rounded-full hover:bg-purple-500/10 transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2">Search</h3>
        <p className="text-sm text-purple-300/70 mb-6">Type to find services, projects, or blog posts</p>

        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="What are you looking for?..."
            autoFocus
            className="w-full bg-[#180d2e] border border-purple-500/25 rounded-xl px-5 py-4 pl-12 text-white placeholder-purple-400/40 focus:outline-none focus:border-[#a855f7] transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white p-2 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div>
          <span className="text-xs font-semibold text-purple-400/80 uppercase tracking-wider block mb-3">
            People also search for:
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setSearchTerm(term)}
                className="text-xs bg-purple-500/10 hover:bg-purple-500/25 hover:text-[#c084fc] hover:border-purple-500/40 border border-purple-500/20 px-3 py-1.5 rounded-full text-purple-200 transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Search, PenLine, Menu, X, ChevronDown, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    'Python',
    'AI & ML',
    'Web Development',
    'Developer Skills',
    'Software Testing',
    'Technical Writing'
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    onNavigate('home');
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    // Smooth scroll down to articles if currently on home
    setTimeout(() => {
      const el = document.getElementById('articles-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#d0d7de] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo & Main Nav */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <button
              onClick={() => { onNavigate('home'); onSelectCategory('All'); }}
              className="flex items-center space-x-2.5 text-left group focus:outline-none"
            >
              {/* Typographic Logo Mark */}
              <div className="w-8 h-8 rounded-md bg-[#1f2328] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0969da] transition-colors">
                <span className="font-mono font-bold text-sm tracking-tight">T/W</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[#1f2328] group-hover:text-[#0969da] transition-colors">
                    TECHWRITE
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-mono tracking-wide border border-[#54aeff]/30">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-[#57606a] -mt-1 hidden sm:inline font-medium">
                  CAPSTONE 62
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => { onNavigate('home'); onSelectCategory('All'); }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  currentRoute === 'home'
                    ? 'text-[#1f2328] font-semibold bg-[#f6f8fa]'
                    : 'text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="px-3 py-1.5 text-sm font-medium text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors"
              >
                Articles
              </button>

              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-[#0969da]' : ''}`} />
                </button>

                {categoriesDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 rounded-md shadow-lg bg-white border border-[#d0d7de] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-[#57606a] uppercase tracking-wider font-mono border-b border-[#d0d7de]/50 mb-1">
                      Browse by Domain
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="w-full text-left px-3.5 py-2 text-sm text-[#24292f] hover:bg-[#f6f8fa] hover:text-[#0969da] transition-colors flex items-center justify-between"
                      >
                        <span>{cat}</span>
                        {cat === 'Python' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dafbe1] text-[#1a7f37] font-semibold font-mono">
                            Core
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleCategoryClick('Python')}
                className="px-3 py-1.5 text-sm font-medium text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors flex items-center space-x-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0969da]" />
                <span>Tutorials</span>
              </button>

              <button
                onClick={() => handleCategoryClick('AI & ML')}
                className="px-3 py-1.5 text-sm font-medium text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8250df]" />
                <span>AI &amp; Dev</span>
              </button>

              {/* Studio Link */}
              <button
                onClick={() => onNavigate('studio')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
                  currentRoute === 'studio'
                    ? 'text-[#0969da] font-semibold bg-[#ddf4ff]'
                    : 'text-[#57606a] hover:text-[#0969da] hover:bg-[#f6f8fa]'
                }`}
                title="Capstone 62 Project Management Studio"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Studio</span>
                <span className="text-[9px] px-1 bg-[#d0d7de] text-[#24292f] rounded font-mono font-bold">
                  /studio
                </span>
              </button>
            </nav>
          </div>

          {/* Right Side: Search, Write Button, About */}
          <div className="flex items-center space-x-3">
            {/* Functional Search Bar */}
            <div className="relative hidden lg:block w-52 xl:w-64">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#57606a]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentRoute !== 'home') onNavigate('home');
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search articles & tags..."
                className={`w-full pl-8 pr-7 py-1.5 text-xs bg-[#f6f8fa] border rounded-md text-[#1f2328] placeholder-[#57606a] transition-all focus:outline-none focus:bg-white ${
                  searchFocused
                    ? 'border-[#0969da] ring-2 ring-[#0969da]/20'
                    : 'border-[#d0d7de] hover:border-[#8c959f]'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs text-[#57606a] hover:text-[#1f2328]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* About Link */}
            <button
              onClick={() => onNavigate('about')}
              className={`hidden sm:inline-block px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                currentRoute === 'about'
                  ? 'text-[#1f2328] font-semibold'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              About
            </button>

            {/* Author Profile Link */}
            <button
              onClick={() => onNavigate('profile')}
              className={`p-1 rounded-full border transition-all ${
                currentRoute === 'profile'
                  ? 'border-[#0969da] ring-2 ring-[#0969da]/20'
                  : 'border-[#d0d7de] hover:border-[#8c959f]'
              }`}
              title="Author Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                alt="Author"
                className="w-6 h-6 rounded-full object-cover"
              />
            </button>

            {/* Write an Article Button */}
            <button
              onClick={() => onNavigate('write')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#0969da] hover:bg-[#0550ae] rounded-md shadow-xs transition-all active:scale-95"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Write an Article</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#57606a] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (underneath on small screens) */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#57606a]">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentRoute !== 'home') onNavigate('home');
              }}
              placeholder="Search articles, tags, authors..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-[#1f2328] placeholder-[#57606a] focus:outline-none focus:border-[#0969da]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs text-[#57606a]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d0d7de] bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate('home'); onSelectCategory('All'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-[#f6f8fa]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-[#f6f8fa]"
            >
              All Articles
            </button>
            <button
              onClick={() => { onNavigate('studio'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-[#f6f8fa] text-[#0969da] flex items-center space-x-2"
            >
              <Layers className="w-4 h-4" />
              <span>Capstone Studio (/studio)</span>
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-[#f6f8fa]"
            >
              About TechWrite AI
            </button>
            <button
              onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-[#f6f8fa]"
            >
              Author Profile
            </button>
          </div>

          <div className="border-t border-[#d0d7de] pt-3">
            <p className="px-3 text-xs font-semibold text-[#57606a] uppercase tracking-wider font-mono mb-2">
              Browse Categories
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="text-left px-3 py-1.5 text-xs rounded-md bg-[#f6f8fa] hover:bg-[#ddf4ff] hover:text-[#0969da] text-[#24292f] transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

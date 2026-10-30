import React from 'react';
import { Github, ExternalLink, Code2, Heart } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (route: string) => void;
  onSelectCategory: (category: Category | 'All') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-white border-t border-[#d0d7de] pt-16 pb-12 text-sm text-[#57606a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#d0d7de]">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-[#1f2328] flex items-center justify-center text-white">
                <span className="font-mono font-bold text-sm">T/W</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#1f2328]">
                  TECHWRITE
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-mono border border-[#54aeff]/30">
                  AI
                </span>
              </div>
            </div>

            <p className="text-xs text-[#57606a] leading-relaxed max-w-sm">
              An open-source developer publication exploring how artificial intelligence can assist developers in producing clear, original, and rigorously verified technical tutorials.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs">
              <span className="px-2 py-0.5 rounded bg-[#f6f8fa] border border-[#d0d7de] text-[#1f2328] font-mono font-semibold">
                CAPSTONE 62
              </span>
              <span>•</span>
              <span className="text-[#1a7f37] font-semibold">100% Test Verified</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1f2328] font-mono mb-3">
              Publications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('All'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  All Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('Python'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  Python Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('Software Testing'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  Software Testing
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('Developer Skills'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  Developer Skills
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1f2328] font-mono mb-3">
              Engineering
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('AI & ML'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  AI &amp; Machine Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('Web Development'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('home'); onSelectCategory('Technical Writing'); }}
                  className="hover:text-[#0969da] transition-colors"
                >
                  Technical Writing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="text-[#0969da] font-semibold hover:underline flex items-center space-x-1"
                >
                  <span>Capstone Studio</span>
                  <span className="text-[10px] font-mono">↗</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1f2328] font-mono mb-3">
              Project &amp; Team
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0969da] transition-colors">
                  About Project
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-[#0969da] transition-colors">
                  Author Profile
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('write')} className="hover:text-[#0969da] transition-colors">
                  Write an Article
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/developer-capstone/techwrite-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-[#24292f] hover:text-[#0969da] transition-colors font-medium"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#57606a]" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#57606a]">
          <p>
            © 2026 TECHWRITE AI. Built for CAPSTONE 62. All original project code and article content.
          </p>

          <p className="text-[11px] text-[#8c959f] text-center md:text-right">
            Independent student research project inspired by GitHub Blog design language. Not affiliated with or endorsed by GitHub, Inc.
          </p>
        </div>

      </div>
    </footer>
  );
};

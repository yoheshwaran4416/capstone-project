import React, { useState } from 'react';
import { Share2, Check, Copy, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Article } from '../types';

interface ShareModalProps {
  article: Article;
}

export const ShareButton: React.FC<ShareModalProps> = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const url = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`Check out "${article.title}" on TechWrite AI:`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-xs font-semibold text-[#1f2328] transition-colors shadow-xs"
        aria-label="Share article"
      >
        <Share2 className="w-3.5 h-3.5 text-[#0969da]" />
        <span>Share</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white border border-[#d0d7de] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[11px] font-mono text-[#57606a] uppercase tracking-wider font-semibold border-b border-[#d0d7de]/50 mb-1">
            Share this Guide
          </div>

          <button
            onClick={handleCopy}
            className="w-full text-left px-3 py-2 text-xs text-[#24292f] hover:bg-[#f6f8fa] flex items-center justify-between transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Link2 className="w-3.5 h-3.5 text-[#57606a]" />
              <span>Copy Link</span>
            </span>
            {copied ? (
              <span className="text-[#1a7f37] font-semibold flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </span>
            ) : null}
          </button>

          <button
            onClick={shareTwitter}
            className="w-full text-left px-3 py-2 text-xs text-[#24292f] hover:bg-[#f6f8fa] flex items-center space-x-2 transition-colors"
          >
            <Twitter className="w-3.5 h-3.5 text-[#0969da]" />
            <span>Share on X (Twitter)</span>
          </button>

          <button
            onClick={shareLinkedIn}
            className="w-full text-left px-3 py-2 text-xs text-[#24292f] hover:bg-[#f6f8fa] flex items-center space-x-2 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
            <span>Share on LinkedIn</span>
          </button>
        </div>
      )}
    </div>
  );
};

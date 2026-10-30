import React, { useEffect, useState } from 'react';
import { TableOfContentItem } from '../types';
import { ListFilter } from 'lucide-react';

interface TableOfContentsProps {
  items: TableOfContentItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for sticky header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-lg border border-[#d0d7de] bg-[#f6f8fa] p-4 text-sm sticky top-24">
      <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-[#d0d7de] font-semibold text-[#1f2328] text-xs uppercase tracking-wider font-mono">
        <ListFilter className="w-4 h-4 text-[#0969da]" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left py-1 px-2 rounded text-xs transition-colors block truncate leading-snug ${
                isActive
                  ? 'bg-white text-[#0969da] font-semibold border-l-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328] hover:bg-[#e1e4e8]/50'
              } ${item.level === 3 ? 'pl-4 text-[11px]' : ''}`}
            >
              {item.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

import React from 'react';
import { Category, Article } from '../types';
import { X, Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: (Category | 'All')[];
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  articles: Article[];
  searchQuery: string;
  onClearFilters: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  articles,
  searchQuery,
  onClearFilters
}) => {
  // Count articles per category
  const getCount = (cat: Category | 'All') => {
    if (cat === 'All') return articles.length;
    return articles.filter(a => a.category === cat).length;
  };

  const isFiltered = selectedCategory !== 'All' || searchQuery.trim().length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-[#d0d7de]">
      
      {/* Category Pills List */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-[#57606a] mr-2 flex items-center space-x-1 shrink-0 font-mono">
          <Filter className="w-3.5 h-3.5 text-[#0969da]" />
          <span>FILTER:</span>
        </span>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = getCount(cat);

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 ${
                isSelected
                  ? 'bg-[#0969da] text-white shadow-xs'
                  : 'bg-[#f6f8fa] text-[#57606a] hover:bg-[#e1e4e8] hover:text-[#1f2328] border border-[#d0d7de]'
              }`}
            >
              <span>{cat === 'All' ? 'All Articles' : cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#e1e4e8] text-[#57606a]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clear Filters Button (shown when search or category filter active) */}
      {isFiltered && (
        <button
          onClick={onClearFilters}
          className="self-start sm:self-center inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-[#cf222e] hover:bg-[#ffebe9] rounded-md border border-[#ff8182]/40 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      )}

    </div>
  );
};

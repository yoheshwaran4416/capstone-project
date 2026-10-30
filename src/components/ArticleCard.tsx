import React from 'react';
import { ArrowRight, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Article } from '../types';
import { getArticleCover } from './Illustrations';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex flex-col bg-white rounded-lg border border-[#d0d7de] hover:border-[#0969da] hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Thumbnail Illustration */}
      <div className="bg-[#f6f8fa] p-4 border-b border-[#d0d7de] flex items-center justify-center overflow-hidden">
        <div className="w-full transform group-hover:scale-105 transition-transform duration-300">
          {getArticleCover(article.coverIllustrationType)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Test Status */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0969da] hover:underline">
              {article.category}
            </span>
            {article.testStatus?.verified && (
              <span className="inline-flex items-center space-x-1 text-[11px] font-medium text-[#1a7f37] bg-[#dafbe1] px-1.5 py-0.5 rounded border border-[#4ac26b]/30">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Article Title */}
          <h3 className="text-lg font-bold text-[#1f2328] group-hover:text-[#0969da] transition-colors line-clamp-2 leading-snug mb-2">
            {article.title}
          </h3>

          {/* Excerpt / Description */}
          <p className="text-sm text-[#57606a] line-clamp-3 leading-relaxed mb-4">
            {article.description}
          </p>
        </div>

        {/* Footer: Author & Read More Link */}
        <div className="pt-4 border-t border-[#d0d7de]/60 flex items-center justify-between text-xs text-[#57606a]">
          <div className="flex items-center space-x-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-[#d0d7de]"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[#24292f] text-[11px]">{article.author.name}</span>
              <div className="flex items-center space-x-1.5 text-[10px] text-[#57606a]">
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span>{article.readingTimeMinutes}m read</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center space-x-1 text-xs font-semibold text-[#0969da] group-hover:translate-x-0.5 transition-transform">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

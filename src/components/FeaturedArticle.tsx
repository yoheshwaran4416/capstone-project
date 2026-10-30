import React from 'react';
import { ArrowRight, Clock, Calendar, CheckCircle } from 'lucide-react';
import { Article } from '../types';
import { getArticleCover } from './Illustrations';

interface FeaturedArticleProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article, onSelect }) => {
  return (
    <section className="py-10 bg-[#f6f8fa] border-b border-[#d0d7de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Label */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0969da]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#57606a] font-mono">
            Featured Editorial
          </h2>
        </div>

        {/* Large Featured Card (Whole Card Clickable) */}
        <div
          onClick={() => onSelect(article)}
          className="group cursor-pointer bg-white rounded-xl border border-[#d0d7de] hover:border-[#0969da] hover:shadow-lg transition-all duration-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Col: Cover Artwork / Illustration */}
            <div className="lg:col-span-6 bg-[#f6f8fa] flex items-center justify-center p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#d0d7de]">
              <div className="w-full max-w-md transform group-hover:scale-[1.02] transition-transform duration-300">
                {getArticleCover(article.coverIllustrationType)}
              </div>
            </div>

            {/* Right Col: Article Content & Metadata */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Category & Verified Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 text-xs font-bold font-mono uppercase tracking-wider rounded bg-[#ddf4ff] text-[#0969da] border border-[#54aeff]/30">
                    {article.category}
                  </span>
                  {article.testStatus?.verified && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-xs font-medium rounded bg-[#dafbe1] text-[#1a7f37] border border-[#4ac26b]/30">
                      <CheckCircle className="w-3 h-3" />
                      <span>{article.testStatus.totalTests}/{article.testStatus.totalTests} Verified Tests</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2328] group-hover:text-[#0969da] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#57606a] leading-relaxed mb-6 font-normal">
                  {article.description}
                </p>

              </div>

              {/* Bottom Metadata & Action */}
              <div className="pt-6 border-t border-[#d0d7de]/70 flex flex-wrap items-center justify-between gap-4">
                
                {/* Author Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#d0d7de]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1f2328]">
                      {article.author.name}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-[#57606a]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.publishedAt}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readingTimeMinutes} min read</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read Button */}
                <span className="inline-flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-[#0969da] text-white group-hover:bg-[#0550ae] transition-colors shadow-xs">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

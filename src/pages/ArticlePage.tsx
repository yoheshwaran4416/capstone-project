import React, { useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ChevronRight, BookOpen, ExternalLink, Terminal } from 'lucide-react';
import { Article } from '../types';
import { getArticleCover } from '../components/Illustrations';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButton } from '../components/ShareModal';
import { renderMarkdown } from '../utils/markdown';
import { ArticleCard } from '../components/ArticleCard';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (category: any) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onSelectCategory
}) => {
  // Scroll to top whenever article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Find related articles in same category or adjacent
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  // If not enough related in same category, pad with other articles
  if (relatedArticles.length < 3) {
    const additional = allArticles
      .filter((a) => a.id !== article.id && !relatedArticles.some(r => r.id === a.id))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additional);
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Sticky Navigation & Breadcrumbs Bar */}
      <div className="border-b border-[#d0d7de] bg-[#f6f8fa]/60 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumb Links */}
          <nav className="flex items-center space-x-1.5 text-[#57606a]">
            <button
              onClick={onBack}
              className="hover:text-[#0969da] transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#8c959f]" />
            <button
              onClick={() => { onSelectCategory(article.category); onBack(); }}
              className="hover:text-[#0969da] font-medium"
            >
              {article.category}
            </button>
            <ChevronRight className="w-3 h-3 text-[#8c959f]" />
            <span className="text-[#1f2328] font-semibold truncate max-w-[200px] sm:max-w-md">
              {article.title}
            </span>
          </nav>

          {/* Share Action */}
          <div className="flex items-center space-x-2">
            <ShareButton article={article} />
          </div>

        </div>
      </div>

      {/* 2. Article Header Hero Area */}
      <header className="border-b border-[#d0d7de] py-10 sm:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Category & Verified Status */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => { onSelectCategory(article.category); onBack(); }}
              className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded bg-[#ddf4ff] text-[#0969da] hover:bg-[#b6e3ff] transition-colors"
            >
              {article.category}
            </button>

            {article.testStatus?.verified && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-xs font-medium bg-[#dafbe1] text-[#1a7f37] border border-[#4ac26b]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Code &amp; {article.testStatus.totalTests} Passing Tests</span>
              </span>
            )}
          </div>

          {/* Article Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f2328] tracking-tight leading-[1.15] mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#57606a] leading-relaxed mb-8 font-normal">
            {article.subtitle}
          </p>

          {/* Author Metadata Bar */}
          <div className="pt-6 border-t border-[#d0d7de] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57606a]">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-[#d0d7de]"
              />
              <div>
                <p className="text-sm font-bold text-[#1f2328]">
                  {article.author.name}
                </p>
                <p className="text-xs text-[#57606a]">
                  {article.author.title}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 font-mono text-xs">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#57606a]" />
                <span>{article.publishedAt}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#57606a]" />
                <span>{article.readingTimeMinutes} min read</span>
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* 3. Main Reading Section with Sticky TOC Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Reading Column */}
          <main className="lg:col-span-8 lg:order-1">
            
            {/* Cover Illustration Card */}
            <div className="rounded-xl border border-[#d0d7de] bg-[#f6f8fa] p-6 mb-10 overflow-hidden shadow-xs">
              <div className="w-full max-w-xl mx-auto">
                {getArticleCover(article.coverIllustrationType)}
              </div>
            </div>

            {/* Test Verification Banner (If article has test status) */}
            {article.testStatus && (
              <div className="mb-10 p-4 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-xs space-y-2">
                <div className="flex items-center justify-between font-mono">
                  <span className="flex items-center space-x-1.5 font-bold text-[#166534]">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span>AUTHENTIC TEST EXECUTION RECORDED</span>
                  </span>
                  <span className="text-[#15803d] font-semibold">{article.testStatus.executionTime} runtime</span>
                </div>
                <div className="text-[#166534] font-mono text-[11px] bg-white p-2 rounded border border-[#bbf7d0]/60 overflow-x-auto">
                  <code>{article.testStatus.testCommand} &gt; {article.testStatus.passingTests}/{article.testStatus.totalTests} tests passed</code>
                </div>
              </div>
            )}

            {/* Rendered Article Content */}
            <article className="prose prose-slate max-w-none text-[#24292f]">
              {renderMarkdown(article.content)}
            </article>

            {/* Tags List */}
            <div className="mt-12 pt-6 border-t border-[#d0d7de]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-[#57606a] uppercase mr-2">
                  Tagged in:
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* References and Official Sources */}
            {article.references && article.references.length > 0 && (
              <section className="mt-12 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] p-6 sm:p-8">
                <div className="flex items-center space-x-2 mb-4 font-mono font-bold text-xs uppercase tracking-wider text-[#1f2328]">
                  <BookOpen className="w-4 h-4 text-[#0969da]" />
                  <span>Authoritative References &amp; Official Specifications</span>
                </div>
                <div className="space-y-4">
                  {article.references.map((ref, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-[#d0d7de]">
                      <div className="flex items-start justify-between gap-2">
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm text-[#0969da] hover:underline flex items-center space-x-1"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f6f8fa] text-[#57606a] border border-[#d0d7de] shrink-0">
                          {ref.source}
                        </span>
                      </div>
                      <p className="text-xs text-[#57606a] mt-1.5 leading-relaxed">
                        {ref.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Author Bio Card */}
            <div className="mt-12 rounded-xl border border-[#d0d7de] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0969da] shrink-0"
              />
              <div className="text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-bold text-base text-[#1f2328]">
                    {article.author.name}
                  </h4>
                  <span className="text-xs text-[#57606a] font-medium">
                    ({article.author.title})
                  </span>
                </div>
                <p className="text-xs text-[#57606a] leading-relaxed">
                  {article.author.bio}
                </p>
                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
                  {article.author.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-mono font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </main>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 lg:order-2 hidden lg:block">
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <TableOfContents items={article.tableOfContents} />
            )}
          </aside>

        </div>
      </div>

      {/* 4. Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#d0d7de] bg-[#f6f8fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-[#1f2328] tracking-tight">
                  Related Technical Guides
                </h3>
                <p className="text-xs text-[#57606a] mt-1">
                  Continue learning with verified tutorials and developer insights
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-semibold text-[#0969da] hover:underline"
              >
                View all articles →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

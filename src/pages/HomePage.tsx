import React, { useMemo } from 'react';
import { Hero } from '../components/Hero';
import { FeaturedArticle } from '../components/FeaturedArticle';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Article, Category } from '../types';
import { Sparkles, SearchX, CheckCircle, Terminal } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onSelectArticle,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigate
}) => {
  const categories: (Category | 'All')[] = [
    'All',
    'Python',
    'AI & ML',
    'Web Development',
    'Developer Skills',
    'Software Testing',
    'Technical Writing'
  ];

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      // Search match
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(query);
      const inDesc = article.description.toLowerCase().includes(query);
      const inCategory = article.category.toLowerCase().includes(query);
      const inTags = article.tags.some((t) => t.toLowerCase().includes(query));
      const inAuthor = article.author.name.toLowerCase().includes(query);

      return inTitle || inDesc || inCategory || inTags || inAuthor;
    });
  }, [articles, selectedCategory, searchQuery]);

  // The featured article is usually the first marked as featured, or the first article
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  const scrollToArticles = () => {
    document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearFilters = () => {
    onSelectCategory('All');
    onSearchChange('');
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <Hero
        onExplore={scrollToArticles}
        onStartWriting={() => onNavigate('write')}
      />

      {/* 2. Featured Editorial Section (shown when no filter or on All) */}
      {selectedCategory === 'All' && !searchQuery.trim() && featuredArticle && (
        <FeaturedArticle
          article={featuredArticle}
          onSelect={onSelectArticle}
        />
      )}

      {/* 3. Main Articles Grid Section */}
      <section id="articles-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2328] tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore the Latest Articles'}
            </h2>
            <p className="text-sm text-[#57606a] mt-1">
              {selectedCategory === 'All'
                ? 'Curated guides and tutorials verified with real test execution'
                : `Showing articles filed under ${selectedCategory}`}
            </p>
          </div>

          <div className="text-xs text-[#57606a] font-mono">
            Showing <strong className="text-[#1f2328]">{filteredArticles.length}</strong> of {articles.length} articles
          </div>
        </div>

        {/* Category Filters Bar */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          articles={articles}
          searchQuery={searchQuery}
          onClearFilters={clearFilters}
        />

        {/* Articles Grid or Empty State */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-xl border border-dashed border-[#d0d7de] bg-[#f6f8fa] mt-8 p-8">
            <div className="w-12 h-12 rounded-full bg-white border border-[#d0d7de] flex items-center justify-center mx-auto mb-4 text-[#57606a]">
              <SearchX className="w-6 h-6 text-[#57606a]" />
            </div>
            <h3 className="text-lg font-bold text-[#1f2328] mb-1">
              No matching articles found
            </h3>
            <p className="text-sm text-[#57606a] max-w-md mx-auto mb-6">
              We couldn't find any articles matching your search query or filter. Try a broader term or reset your filters.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-md bg-[#0969da] text-white text-xs font-semibold hover:bg-[#0550ae] transition-colors"
              >
                Clear all filters
              </button>
              <button
                onClick={() => onNavigate('write')}
                className="px-4 py-2 rounded-md bg-white border border-[#d0d7de] text-[#1f2328] text-xs font-semibold hover:bg-[#f6f8fa] transition-colors"
              >
                Write an article about this
              </button>
            </div>
          </div>
        )}

      </section>

      {/* 4. Capstone 62 Studio Teaser Banner */}
      <section className="bg-[#f6f8fa] border-t border-[#d0d7de] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#d0d7de] bg-white p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-[#0969da] bg-[#ddf4ff] px-2.5 py-1 rounded">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CAPSTONE 62 PROJECT WORKSPACE</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1f2328] tracking-tight">
                Inspect Research Notes, Quality Checklists &amp; Test Verifications
              </h3>
              <p className="text-sm text-[#57606a] leading-relaxed">
                Explore the complete technical writing lifecycle: 52-point quality criteria, before-and-after hallucination diffs, prompt engineering libraries, and slide deck for academic defense.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('studio')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#1f2328] hover:bg-[#24292f] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-2"
              >
                <Terminal className="w-4 h-4 text-[#38bdf8]" />
                <span>Open Capstone Studio</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] text-[#1f2328] text-xs font-semibold transition-colors"
              >
                About Methodology
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

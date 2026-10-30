import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { WritePage } from './pages/WritePage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { StudioPage } from './pages/StudioPage';
import { Article, Category } from './types';
import { getArticles } from './utils/storage';

export const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial load of articles
  useEffect(() => {
    const loaded = getArticles();
    setArticles(loaded);
  }, []);

  // Hash-based routing sync for clean deep linking (#/studio, #/about, #/article/slug, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentRoute('home');
      } else if (hash.startsWith('article/')) {
        const slug = hash.replace('article/', '');
        const found = articles.find((a) => a.slug === slug || a.id === slug);
        if (found) {
          setActiveArticle(found);
          setCurrentRoute('article');
        } else {
          setCurrentRoute('home');
        }
      } else if (hash === 'write') {
        setCurrentRoute('write');
      } else if (hash === 'profile') {
        setCurrentRoute('profile');
      } else if (hash === 'about') {
        setCurrentRoute('about');
      } else if (hash === 'studio') {
        setCurrentRoute('studio');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [articles]);

  const navigateTo = (route: string, article?: Article) => {
    setCurrentRoute(route);
    if (route === 'home') {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'article' && article) {
      setActiveArticle(article);
      window.location.hash = `#/article/${article.slug}`;
    } else {
      window.location.hash = `#/${route}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectArticle = (article: Article) => {
    navigateTo('article', article);
  };

  const handlePublishSuccess = (newArticle: Article) => {
    const updated = getArticles();
    setArticles(updated);
    navigateTo('article', newArticle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2328] font-sans">
      {/* Sticky Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={(route) => navigateTo(route)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentRoute !== 'home') navigateTo('home');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            articles={articles}
            onSelectArticle={handleSelectArticle}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'article' && activeArticle && (
          <ArticlePage
            article={activeArticle}
            allArticles={articles}
            onBack={() => navigateTo('home')}
            onSelectArticle={handleSelectArticle}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              navigateTo('home');
            }}
          />
        )}

        {currentRoute === 'write' && (
          <WritePage
            onBack={() => navigateTo('home')}
            onPublishSuccess={handlePublishSuccess}
          />
        )}

        {currentRoute === 'profile' && (
          <ProfilePage
            articles={articles}
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentRoute === 'studio' && (
          <StudioPage
            onNavigate={navigateTo}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              navigateTo('home');
            }}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo('home');
        }}
      />
    </div>
  );
};

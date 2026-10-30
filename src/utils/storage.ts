import { Article, Author, ChecklistItem } from '../types';
import { INITIAL_ARTICLES, DEFAULT_AUTHOR } from '../data/articles';
import { INITIAL_CHECKLIST } from '../data/checklist';

const ARTICLES_KEY = 'techwrite_published_articles';
const DRAFT_KEY = 'techwrite_article_draft';
const AUTHOR_KEY = 'techwrite_author_profile';
const CHECKLIST_KEY = 'techwrite_checklist_state';

export interface ArticleDraft {
  title: string;
  subtitle: string;
  category: string;
  tags: string;
  content: string;
  lastSavedAt: string;
}

export function getArticles(): Article[] {
  try {
    const customArticlesJson = localStorage.getItem(ARTICLES_KEY);
    if (!customArticlesJson) {
      return INITIAL_ARTICLES;
    }
    const customArticles: Article[] = JSON.parse(customArticlesJson);
    // Combine custom articles at the top, then default ones (ensuring no duplicate IDs)
    const customIds = new Set(customArticles.map(a => a.id));
    const defaults = INITIAL_ARTICLES.filter(a => !customIds.has(a.id));
    return [...customArticles, ...defaults];
  } catch (err) {
    console.error('Failed to load articles from localStorage', err);
    return INITIAL_ARTICLES;
  }
}

export function saveArticle(article: Article): void {
  try {
    const existing = getArticles();
    const filtered = existing.filter(a => a.id !== article.id);
    const updated = [article, ...filtered];
    // Only persist user-created or modified ones in custom key
    const userOnly = updated.filter(a => a.isUserCreated || !INITIAL_ARTICLES.some(init => init.id === a.id));
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(userOnly));
  } catch (err) {
    console.error('Failed to save article to localStorage', err);
  }
}

export function getDraft(): ArticleDraft | null {
  try {
    const draftJson = localStorage.getItem(DRAFT_KEY);
    if (draftJson) {
      return JSON.parse(draftJson);
    }
    return null;
  } catch (err) {
    console.error('Failed to get draft', err);
    return null;
  }
}

export function saveDraft(draft: ArticleDraft): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (err) {
    console.error('Failed to save draft', err);
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (err) {
    console.error('Failed to clear draft', err);
  }
}

export function getAuthorProfile(): Author {
  try {
    const authorJson = localStorage.getItem(AUTHOR_KEY);
    if (authorJson) {
      return JSON.parse(authorJson);
    }
    return DEFAULT_AUTHOR;
  } catch (err) {
    console.error('Failed to load author profile', err);
    return DEFAULT_AUTHOR;
  }
}

export function saveAuthorProfile(author: Author): void {
  try {
    localStorage.setItem(AUTHOR_KEY, JSON.stringify(author));
  } catch (err) {
    console.error('Failed to save author profile', err);
  }
}

export function getChecklistItems(): ChecklistItem[] {
  try {
    const saved = localStorage.getItem(CHECKLIST_KEY);
    if (saved) {
      const stateMap: Record<string, boolean> = JSON.parse(saved);
      return INITIAL_CHECKLIST.map(item => ({
        ...item,
        completed: stateMap[item.id] !== undefined ? stateMap[item.id] : item.completed
      }));
    }
    return INITIAL_CHECKLIST;
  } catch (err) {
    console.error('Failed to load checklist state', err);
    return INITIAL_CHECKLIST;
  }
}

export function saveChecklistState(items: ChecklistItem[]): void {
  try {
    const stateMap: Record<string, boolean> = {};
    items.forEach(i => {
      stateMap[i.id] = i.completed;
    });
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(stateMap));
  } catch (err) {
    console.error('Failed to save checklist state', err);
  }
}

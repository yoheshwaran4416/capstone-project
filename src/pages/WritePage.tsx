import React, { useState, useEffect } from 'react';
import { Save, Send, Eye, Edit3, ArrowLeft, CheckCircle2, AlertCircle, Sparkles, FileText, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Article, Category } from '../types';
import { getDraft, saveDraft, clearDraft, saveArticle, getAuthorProfile } from '../utils/storage';
import { renderMarkdown } from '../utils/markdown';

interface WritePageProps {
  onBack: () => void;
  onPublishSuccess: (article: Article) => void;
}

export const WritePage: React.FC<WritePageProps> = ({ onBack, onPublishSuccess }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Category>('Python');
  const [tagsInput, setTagsInput] = useState('Python, Tutorial, WebDev');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'split'>('split');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const categories: Category[] = [
    'Python',
    'AI & ML',
    'Web Development',
    'Developer Skills',
    'Software Testing',
    'Technical Writing'
  ];

  // Load existing draft if available
  useEffect(() => {
    const saved = getDraft();
    if (saved) {
      setTitle(saved.title || '');
      setSubtitle(saved.subtitle || '');
      setCategory((saved.category as Category) || 'Python');
      setTagsInput(saved.tags || 'Python, Tutorial');
      setContent(saved.content || '');
      setLastSaved(saved.lastSavedAt || null);
    } else {
      // Sample starter template
      setContent(`## 1. Introduction\n\nExplain the developer problem this tutorial solves...\n\n\`\`\`python\ndef example_function(data: dict) -> bool:\n    """Return verification result."""\n    return bool(data)\n\`\`\`\n\n## 2. Key Concepts\n\n* Core concept 1\n* Core concept 2\n\n> Note: All code examples must be tested before publication.`);
    }
  }, []);

  // Word count & reading time calculation
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveDraft = () => {
    const now = new Date().toLocaleTimeString();
    saveDraft({
      title,
      subtitle,
      category,
      tags: tagsInput,
      content,
      lastSavedAt: now
    });
    setLastSaved(now);
    showNotification('Draft saved to browser storage successfully.', 'info');
  };

  const handlePublish = () => {
    if (!title.trim()) {
      showNotification('Please enter an article title before publishing.', 'error');
      return;
    }
    if (!content.trim() || wordCount < 10) {
      showNotification('Please write meaningful article content before publishing.', 'error');
      return;
    }

    const author = getAuthorProfile();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `article-${Date.now()}`;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // Generate table of contents from content
    const headings = content
      .split('\n')
      .filter(l => l.startsWith('## '))
      .map(l => {
        const hText = l.replace(/^##\s+/, '').trim();
        const hId = hText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return { id: hId, title: hText, level: 2 };
      });

    const newArticle: Article = {
      id: `user-art-${Date.now()}`,
      slug,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A technical guide written by the community.',
      description: subtitle.trim() || content.slice(0, 140).replace(/[#*`_]/g, '') + '...',
      content,
      category,
      tags: tags.length > 0 ? tags : [category],
      author,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTimeMinutes: readingTime,
      coverIllustrationType: 'custom',
      isUserCreated: true,
      tableOfContents: headings.length > 0 ? headings : undefined
    };

    // Save to localStorage
    saveArticle(newArticle);
    clearDraft();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    showNotification('Article published successfully! Added to your live publication list.', 'success');
    setTimeout(() => {
      onPublishSuccess(newArticle);
    }, 1200);
  };

  const insertMarkdownSyntax = (prefix: string, suffix: string = '') => {
    setContent(prev => prev + `\n${prefix}sample text${suffix}\n`);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Editor Top Navigation Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-[#d0d7de] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-md hover:bg-[#f6f8fa] text-[#57606a] hover:text-[#1f2328] transition-colors"
              title="Return to homepage"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base text-[#1f2328]">Article Studio</span>
              <span className="text-xs font-mono text-[#57606a]">
                {lastSaved ? `• Saved at ${lastSaved}` : '• Unsaved Draft'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5">
            {/* View Switcher on larger screens */}
            <div className="hidden md:flex items-center p-0.5 rounded-md bg-[#f6f8fa] border border-[#d0d7de] text-xs">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'edit' ? 'bg-white font-semibold text-[#0969da] shadow-xs' : 'text-[#57606a]'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'split' ? 'bg-white font-semibold text-[#0969da] shadow-xs' : 'text-[#57606a]'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'preview' ? 'bg-white font-semibold text-[#0969da] shadow-xs' : 'text-[#57606a]'
                }`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-[#57606a]" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={handlePublish}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold rounded-md bg-[#0969da] hover:bg-[#0550ae] text-white transition-all shadow-xs active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Article</span>
            </button>
          </div>

        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-3xl mx-auto px-4 mt-4">
          <div
            className={`p-3 rounded-lg border flex items-center space-x-2.5 text-xs font-medium ${
              notification.type === 'success'
                ? 'bg-[#dafbe1] text-[#1a7f37] border-[#4ac26b]/40'
                : notification.type === 'error'
                ? 'bg-[#ffebe9] text-[#cf222e] border-[#ff8182]/40'
                : 'bg-[#ddf4ff] text-[#0969da] border-[#54aeff]/40'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {notification.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
            {notification.type === 'info' && <Sparkles className="w-4 h-4 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Storage Information Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="p-3 bg-[#f6f8fa] rounded-lg border border-[#d0d7de] text-xs text-[#57606a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0969da]" />
            <span>
              <strong>Local Browser Persistence:</strong> Articles and drafts are saved directly into your browser's persistent storage (<code className="font-mono text-[#0969da]">localStorage</code>).
            </span>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span>Words: <strong className="text-[#1f2328]">{wordCount}</strong></span>
            <span>•</span>
            <span>Est. Read: <strong className="text-[#1f2328]">{readingTime} min</strong></span>
          </div>
        </div>
      </div>

      {/* Main Workspace Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-[#d0d7de]">
          <div className="md:col-span-8 space-y-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title (e.g. Building Resilient Python Microservices)"
              className="w-full text-2xl sm:text-3xl font-extrabold text-[#1f2328] placeholder-[#8c959f] border-b border-[#d0d7de] pb-2 focus:outline-none focus:border-[#0969da]"
            />
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle or brief summary for developer cards..."
              className="w-full text-sm text-[#57606a] placeholder-[#8c959f] border-b border-[#d0d7de] pb-1.5 focus:outline-none focus:border-[#0969da]"
            />
          </div>

          <div className="md:col-span-4 space-y-3">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[#57606a] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full text-xs font-medium bg-[#f6f8fa] border border-[#d0d7de] rounded-md px-3 py-2 text-[#1f2328] focus:outline-none focus:border-[#0969da]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[#57606a] mb-1">
                Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Python, Testing, WebDev"
                className="w-full text-xs bg-[#f6f8fa] border border-[#d0d7de] rounded-md px-3 py-2 text-[#1f2328] focus:outline-none focus:border-[#0969da]"
              />
            </div>
          </div>
        </div>

        {/* Markdown Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 py-3 border-b border-[#d0d7de] bg-[#f6f8fa] px-3 rounded-t-lg mt-6 text-xs text-[#57606a]">
          <span className="font-mono font-bold mr-2 text-[#1f2328]">FORMAT:</span>
          <button
            onClick={() => insertMarkdownSyntax('## ', '')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] font-mono border border-transparent hover:border-[#d0d7de]"
          >
            H2
          </button>
          <button
            onClick={() => insertMarkdownSyntax('### ', '')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] font-mono border border-transparent hover:border-[#d0d7de]"
          >
            H3
          </button>
          <button
            onClick={() => insertMarkdownSyntax('**', '**')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] font-bold border border-transparent hover:border-[#d0d7de]"
          >
            B
          </button>
          <button
            onClick={() => insertMarkdownSyntax('*', '*')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] italic border border-transparent hover:border-[#d0d7de]"
          >
            I
          </button>
          <button
            onClick={() => insertMarkdownSyntax('```python\n# code here\n', '```')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] font-mono border border-transparent hover:border-[#d0d7de] flex items-center space-x-1"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code Block</span>
          </button>
          <button
            onClick={() => insertMarkdownSyntax('> Note: ', '')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] border border-transparent hover:border-[#d0d7de]"
          >
            Callout Note
          </button>
          <button
            onClick={() => insertMarkdownSyntax('* ', '')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] border border-transparent hover:border-[#d0d7de]"
          >
            Bullet List
          </button>
          <button
            onClick={() => insertMarkdownSyntax('| Header 1 | Header 2 |\n|---|---|\n| Cell 1 | Cell 2 |', '')}
            className="px-2 py-1 rounded hover:bg-white hover:text-[#0969da] border border-transparent hover:border-[#d0d7de]"
          >
            Table
          </button>
        </div>

        {/* Editor & Preview Panes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 min-h-[500px]">
          
          {/* Editor Pane */}
          {(activeTab === 'edit' || activeTab === 'split') && (
            <div className={`flex flex-col ${activeTab === 'edit' ? 'lg:col-span-2' : ''}`}>
              <div className="flex items-center justify-between pb-2 text-xs font-mono text-[#57606a]">
                <span className="flex items-center space-x-1">
                  <Edit3 className="w-3.5 h-3.5 text-[#0969da]" />
                  <span>MARKDOWN SOURCE</span>
                </span>
                <span>Supports GFM, Python code blocks, and alerts</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown..."
                className="w-full flex-1 p-4 font-mono text-sm leading-relaxed border border-[#d0d7de] rounded-lg bg-[#ffffff] text-[#1f2328] focus:outline-none focus:border-[#0969da] focus:ring-1 focus:ring-[#0969da] resize-y min-h-[500px]"
              />
            </div>
          )}

          {/* Live Preview Pane */}
          {(activeTab === 'preview' || activeTab === 'split') && (
            <div className={`flex flex-col ${activeTab === 'preview' ? 'lg:col-span-2' : ''}`}>
              <div className="flex items-center justify-between pb-2 text-xs font-mono text-[#57606a]">
                <span className="flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-[#1a7f37]" />
                  <span>LIVE EDITORIAL PREVIEW</span>
                </span>
                <span>Simulated Reader View</span>
              </div>
              <div className="w-full flex-1 p-6 border border-[#d0d7de] rounded-lg bg-[#ffffff] overflow-y-auto max-h-[800px] shadow-xs">
                {title ? (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1f2328] mb-2 leading-snug">
                    {title}
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold text-[#8c959f] italic mb-2">
                    Untitled Article
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-[#57606a] mb-6 italic">
                    {subtitle}
                  </p>
                )}
                <div className="prose prose-slate max-w-none text-[#24292f] border-t border-[#d0d7de] pt-4">
                  {renderMarkdown(content)}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

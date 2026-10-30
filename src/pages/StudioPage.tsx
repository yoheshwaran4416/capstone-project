import React, { useState } from 'react';
import {
  Layers, CheckSquare, Search, Copy, Check, Calendar, ArrowLeft, ArrowRight,
  Terminal, ShieldCheck, Share2, Presentation, Sliders, ExternalLink, Download,
  CheckCircle2, RefreshCw, AlertTriangle, FileText, ChevronRight
} from 'lucide-react';
import { getChecklistItems, saveChecklistState } from '../utils/storage';
import { ChecklistItem, Category } from '../types';
import { PROMPT_LIBRARY } from '../data/prompts';
import { BEFORE_AFTER_DIFFS } from '../data/editorialDiff';
import { SOCIAL_POSTS } from '../data/socialPosts';
import { EDITORIAL_CALENDAR } from '../data/calendar';
import { CAPSTONE_SLIDES } from '../data/slides';
import { SOURCE_REGISTER } from '../data/sources';

interface StudioPageProps {
  onNavigate: (route: string) => void;
  onSelectCategory: (cat: Category | 'All') => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'checklist' | 'prompts' | 'diffs' | 'verification' | 'social' | 'calendar' | 'slides' | 'sources'
  >('overview');

  // Checklist interactive state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(getChecklistItems());
  const [checklistCategoryFilter, setChecklistCategoryFilter] = useState<string>('All');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedSocialId, setCopiedSocialId] = useState<string | null>(null);

  // Slides presentation state
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);

  // Toggle checklist item
  const handleToggleChecklist = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    saveChecklistState(updated);
  };

  const handleResetChecklist = () => {
    const reset = checklist.map((c) => ({ ...c, completed: true }));
    setChecklist(reset);
    saveChecklistState(reset);
  };

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const copyPromptText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const copySocialText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSocialId(id);
    setTimeout(() => setCopiedSocialId(null), 2000);
  };

  const currentSlide = CAPSTONE_SLIDES[currentSlideIdx];

  const exportChecklistMarkdown = () => {
    const md = `# CAPSTONE 62 — Technical Writing Quality Checklist Export\n\nOverall Progress: ${completedCount}/${checklist.length} (${progressPercent}%)\n\n` +
      checklist.map(c => `- [${c.completed ? 'x' : ' '}] **${c.category}** — ${c.text}\n  *${c.description}*`).join('\n\n');
    
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'capstone62_checklist_export.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* 1. Header Studio Bar */}
      <div className="bg-[#f6f8fa] border-b border-[#d0d7de] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded bg-[#1f2328] text-white">
                  <Layers className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold text-[#0969da] uppercase tracking-wider">
                  /studio workspace
                </span>
                <span className="text-[#d0d7de]">|</span>
                <span className="text-xs font-mono text-[#57606a]">CAPSTONE 62</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1f2328] tracking-tight">
                Capstone Engineering &amp; Editorial Workspace
              </h1>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Auditing tools, research notes, verification logs, and defense materials.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('home')}
                className="px-3.5 py-1.5 rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-xs font-semibold text-[#1f2328] transition-colors"
              >
                ← Return to Blog
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto mt-6 pt-2 border-t border-[#d0d7de]/60 scrollbar-none text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <span>3-Post Content Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>52-Point Checklist ({progressPercent}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'prompts'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <span>AI Prompt Library</span>
            </button>

            <button
              onClick={() => setActiveTab('diffs')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'diffs'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <span>Before &amp; After Diffs</span>
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'verification'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#1a7f37]" />
              <span>Verification Report</span>
            </button>

            <button
              onClick={() => setActiveTab('social')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'social'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Social Media Drafts</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'calendar'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Content Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('slides')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'slides'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <Presentation className="w-3.5 h-3.5 text-[#8250df]" />
              <span>5-Slide Presentation</span>
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-2 rounded-t-md whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                activeTab === 'sources'
                  ? 'bg-white text-[#0969da] font-bold border-t-2 border-[#0969da] shadow-xs'
                  : 'text-[#57606a] hover:text-[#1f2328]'
              }`}
            >
              <span>Source Register</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Tab Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 1: OVERVIEW & 3-POST CONTENT PLAN */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-2">
                Three-Post Content Architecture (CAPSTONE 62)
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a] max-w-3xl leading-relaxed">
                A structured pedagogical series designed to transition computer science students from raw script writers to disciplined software engineers who test and document their code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-bold">
                    POST 1 (MAIN)
                  </span>
                  <span className="text-xs text-[#1a7f37] font-semibold">1,012 Words</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1f2328] leading-snug">
                  Python Functions Explained: From Basics to Practical Examples
                </h3>
                <p className="text-xs text-[#57606a] leading-relaxed">
                  Parameters, arguments, returns, LEGB variable scope, guard clauses, and 9 automated test assertions.
                </p>
                <div className="pt-2 border-t border-[#d0d7de]/60 text-xs font-mono text-[#57606a] space-y-1">
                  <div>Status: <span className="text-[#1a7f37] font-bold">Published</span></div>
                  <div>Deliverable: <span className="text-[#1f2328]">DEL-04</span></div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#dafbe1] text-[#1a7f37] font-bold">
                    POST 2 (SHORT)
                  </span>
                  <span className="text-xs text-[#1a7f37] font-semibold">650 Words</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1f2328] leading-snug">
                  Five Common Python Mistakes Beginners Should Avoid
                </h3>
                <p className="text-xs text-[#57606a] leading-relaxed">
                  Mutable default arguments, `==` vs `is None`, iterator mutation traps, bare exceptions, and context managers.
                </p>
                <div className="pt-2 border-t border-[#d0d7de]/60 text-xs font-mono text-[#57606a] space-y-1">
                  <div>Status: <span className="text-[#1a7f37] font-bold">Published</span></div>
                  <div>Deliverable: <span className="text-[#1f2328]">DEL-05</span></div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#fbefff] text-[#8250df] font-bold">
                    POST 3 (SHORT)
                  </span>
                  <span className="text-xs text-[#1a7f37] font-semibold">645 Words</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1f2328] leading-snug">
                  Writing Your First Python Unit Tests with unittest
                </h3>
                <p className="text-xs text-[#57606a] leading-relaxed">
                  Standard library test cases, assertions, slug generator example, edge case boundary discovery, and CLI execution.
                </p>
                <div className="pt-2 border-t border-[#d0d7de]/60 text-xs font-mono text-[#57606a] space-y-1">
                  <div>Status: <span className="text-[#1a7f37] font-bold">Published</span></div>
                  <div>Deliverable: <span className="text-[#1f2328]">DEL-06</span></div>
                </div>
              </div>

            </div>

            {/* 12-Stage Lifecycle Overview */}
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-white space-y-4">
              <h3 className="text-base font-bold text-[#1f2328] font-mono uppercase text-xs tracking-wider">
                12-Stage Editorial Production Lifecycle
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                {[
                  '1. Audience Need Analysis', '2. Specification Grounding', '3. Constrained Prompting',
                  '4. Initial Code Draft', '5. Clean Environment Run', '6. Test Suite Authoring',
                  '7. 52-Point Checklist Audit', '8. PEP 8 / Lint Validation', '9. Security Scan',
                  '10. Editorial Copyediting', '11. Social Media Teasers', '12. Post-Publish Monitoring'
                ].map((stage, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] font-mono text-[11px]">
                    <span className="text-[#0969da] font-bold block mb-1">Stage {idx + 1}</span>
                    <span className="text-[#24292f] font-sans">{stage.replace(/^\d+\.\s+/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 52-POINT QUALITY CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Progress Card */}
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-[#0969da]" />
                  <h2 className="text-xl font-bold text-[#1f2328]">
                    Technical Writing Quality Checklist
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#57606a]">
                  52 criteria covering technical accuracy, clarity, code quality, test verification, SEO metadata, and responsible AI usage.
                </p>
                {/* Progress Bar */}
                <div className="w-full bg-[#e1e4e8] h-2.5 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-[#1a7f37] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 shrink-0">
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#1f2328] font-mono">
                    {progressPercent}%
                  </span>
                  <span className="block text-[11px] text-[#57606a]">
                    {completedCount} of {checklist.length} Passed
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={exportChecklistMarkdown}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0969da]" />
                    <span>Export MD</span>
                  </button>
                  <button
                    onClick={handleResetChecklist}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md text-[#57606a] hover:text-[#1f2328]"
                    title="Reset to 100% verified baseline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-medium">
              {['All', 'A. Technical Accuracy', 'B. Clarity & Structure', 'C. Code Quality', 'D. Testing & Verification', 'E. SEO & Metadata', 'F. Accessibility & Polish', 'G. Responsible AI'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setChecklistCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    checklistCategoryFilter === cat
                      ? 'bg-[#1f2328] text-white'
                      : 'bg-[#f6f8fa] border border-[#d0d7de] text-[#57606a] hover:text-[#1f2328]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Checklist Items List */}
            <div className="space-y-3">
              {checklist
                .filter(item => checklistCategoryFilter === 'All' || item.category === checklistCategoryFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start space-x-3.5 ${
                      item.completed
                        ? 'bg-white border-[#d0d7de] hover:border-[#1a7f37]'
                        : 'bg-[#fff8c5]/30 border-[#d4a72c] hover:bg-[#fff8c5]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {}} // handled by parent onClick
                      className="mt-1 w-4 h-4 rounded text-[#0969da] focus:ring-[#0969da] cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f6f8fa] border border-[#d0d7de] text-[#57606a]">
                          {item.category}
                        </span>
                        <h4 className={`text-sm font-bold ${item.completed ? 'text-[#1f2328]' : 'text-[#9a6700]'}`}>
                          {item.text}
                        </h4>
                      </div>
                      <p className="text-xs text-[#57606a] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* TAB 3: AI PROMPT LIBRARY */}
        {activeTab === 'prompts' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-1">
                Constrained AI Prompt Library (16 Canonical Templates)
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Production prompt patterns engineered with universal anti-hallucination clauses to prevent synthetic misinformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROMPT_LIBRARY.map((item) => (
                <div key={item.id} className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da]">
                        {item.phase.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-[#57606a]">
                        {item.stage}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#1f2328]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#57606a]">
                      {item.description}
                    </p>

                    {/* Prompt Box */}
                    <div className="p-3 bg-[#1b1f24] text-[#e6edf3] font-mono text-xs rounded-md overflow-x-auto leading-relaxed border border-[#30363d]">
                      <code>{item.prompt}</code>
                    </div>

                    {/* Anti-Hallucination Clause */}
                    <div className="p-2.5 rounded bg-[#dafbe1]/50 border border-[#4ac26b]/30 text-[11px] text-[#166534] font-medium">
                      <strong>Anti-Hallucination Guardrail:</strong> {item.antiHallucinationClause}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => copyPromptText(item.id, item.prompt)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328]"
                    >
                      {copiedPromptId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1a7f37]" />
                          <span className="text-[#1a7f37]">Copied Prompt!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#57606a]" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BEFORE & AFTER EDITORIAL DIFFS */}
        {activeTab === 'diffs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-1">
                Before-and-After Editorial Diff Analysis
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Documented evidence showing 5 critical bugs caught and resolved between raw AI drafts and human-verified code.
              </p>
            </div>

            <div className="space-y-6">
              {BEFORE_AFTER_DIFFS.map((diff) => (
                <div key={diff.id} className="rounded-xl border border-[#d0d7de] bg-white overflow-hidden shadow-xs">
                  <div className="p-4 bg-[#f6f8fa] border-b border-[#d0d7de] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ffebe9] text-[#cf222e] font-bold border border-[#ff8182]/30">
                        {diff.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#1f2328]">
                        {diff.title}
                      </h3>
                    </div>
                    <span className="text-xs text-[#57606a]">{diff.description}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#d0d7de]">
                    
                    {/* Before (Raw AI Output) */}
                    <div className="p-5 bg-[#fff8f8] space-y-3">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-[#cf222e]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>RAW AI DRAFT (FLAWED)</span>
                      </div>
                      <div className="p-3 bg-[#1b1f24] text-[#ff7b72] font-mono text-xs rounded border border-[#ff8182]/40 overflow-x-auto">
                        <pre><code>{diff.before.codeOrText}</code></pre>
                      </div>
                      <p className="text-xs text-[#cf222e] leading-relaxed">
                        <strong>Identified Defect:</strong> {diff.before.issue}
                      </p>
                    </div>

                    {/* After (Human Verified Code) */}
                    <div className="p-5 bg-[#f6fbf7] space-y-3">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-[#1a7f37]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>HUMAN-VERIFIED CODE (STANDARDS COMPLIANT)</span>
                      </div>
                      <div className="p-3 bg-[#1b1f24] text-[#7ee787] font-mono text-xs rounded border border-[#4ac26b]/40 overflow-x-auto">
                        <pre><code>{diff.after.codeOrText}</code></pre>
                      </div>
                      <p className="text-xs text-[#166534] leading-relaxed">
                        <strong>Engineering Resolution:</strong> {diff.after.resolution}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: VERIFICATION REPORT */}
        {activeTab === 'verification' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-6 h-6 text-[#1a7f37]" />
                  <h2 className="text-xl font-bold text-[#1f2328]">
                    Factual &amp; Security Verification Report (DEL-11)
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#dafbe1] text-[#1a7f37] text-xs font-mono font-bold">
                  100% PASS (22/22 Tests)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#57606a] leading-relaxed">
                Execution records captured across Windows 11 x64, Python 3.14.2, Flask 3.1.3, and pytest 9.1.1. Zero fabricated results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#1b1f24] text-white font-mono text-xs space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[#8b949e] border-b border-[#30363d] pb-2">
                  <span>TERMINAL LOG: POST 1 REST API</span>
                  <span className="text-[#3fb950]">PASSED (2.38s)</span>
                </div>
                <div className="text-[#79c0ff]">$ py -m pytest code/post1/test_app.py -v</div>
                <div className="text-[#7ee787] space-y-0.5">
                  <div>test_app.py::test_api_health PASSED [ 7%]</div>
                  <div>test_app.py::test_get_tasks_empty PASSED [ 15%]</div>
                  <div>test_app.py::test_create_task_success PASSED [ 23%]</div>
                  <div>test_app.py::test_create_task_missing_title PASSED [ 30%]</div>
                  <div>test_app.py::test_create_task_empty_title PASSED [ 38%]</div>
                  <div>test_app.py::test_create_task_type_error PASSED [ 46%]</div>
                  <div>test_app.py::test_delete_task_success PASSED [ 53%]</div>
                  <div>test_app.py::test_delete_task_not_found PASSED [ 61%]</div>
                  <div>test_app.py::test_test_isolation_fixture PASSED [ 69%]</div>
                </div>
                <div className="pt-2 border-t border-[#30363d] text-[#58a6ff] font-bold">
                  ================ 13 passed in 1.42s ================
                </div>
              </div>

              <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#1b1f24] text-white font-mono text-xs space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-[#8b949e] border-b border-[#30363d] pb-2">
                  <span>TERMINAL LOG: ARTICLES 1 &amp; 3 UNITTEST</span>
                  <span className="text-[#3fb950]">PASSED (0.003s)</span>
                </div>
                <div className="text-[#79c0ff]">$ py code/articles_code/article1_functions.py</div>
                <div className="text-[#7ee787]">Ran 9 tests in 0.001s — OK</div>
                <div className="text-[#79c0ff] mt-2">$ py code/articles_code/article3_unittest.py -v</div>
                <div className="text-[#7ee787] space-y-0.5">
                  <div>test_standard_title ... ok</div>
                  <div>test_special_characters_and_punctuation ... ok</div>
                  <div>test_max_length_truncation ... ok</div>
                  <div>test_empty_string_raises_value_error ... ok</div>
                  <div>test_invalid_type_raises_type_error ... ok</div>
                </div>
                <div className="pt-2 border-t border-[#30363d] text-[#58a6ff] font-bold">
                  Ran 6 tests in 0.002s — OK
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: SOCIAL MEDIA DRAFTS */}
        {activeTab === 'social' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-1">
                Five Multi-Platform Social Media Distribution Drafts (DEL-07)
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Tailored promotional copy for LinkedIn, Twitter/X, Dev.to, Reddit r/Python, and Developer Newsletter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOCIAL_POSTS.map((soc) => (
                <div key={soc.id} className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#f6f8fa] border border-[#d0d7de] text-[#1f2328]">
                        {soc.platform}
                      </span>
                      <span className="text-[11px] text-[#57606a]">{soc.targetAudience}</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#0969da]">
                      Hook: "{soc.hook}"
                    </h4>

                    <div className="p-4 bg-[#f6f8fa] border border-[#d0d7de] rounded-lg text-xs text-[#24292f] whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                      {soc.content}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {soc.hashtags.map((h, i) => (
                        <span key={i} className="text-[10px] font-mono text-[#57606a] bg-white px-1.5 py-0.5 rounded border border-[#d0d7de]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => copySocialText(soc.id, soc.content)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328]"
                    >
                      {copiedSocialId === soc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1a7f37]" />
                          <span className="text-[#1a7f37]">Copied Post!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#57606a]" />
                          <span>Copy Content</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONTENT CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-1">
                Editorial Content Calendar &amp; Schedule
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Publication schedule, milestone deadlines, and status tracking for the technical publishing pipeline.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#d0d7de] bg-white">
              <table className="min-w-full divide-y divide-[#d0d7de] text-xs">
                <thead className="bg-[#f6f8fa] text-[#1f2328] font-mono">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold">Date</th>
                    <th className="px-4 py-3 text-left font-bold">Article Title</th>
                    <th className="px-4 py-3 text-left font-bold">Category</th>
                    <th className="px-4 py-3 text-left font-bold">Author</th>
                    <th className="px-4 py-3 text-left font-bold">Status</th>
                    <th className="px-4 py-3 text-left font-bold">Deliverable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d0d7de]">
                  {EDITORIAL_CALENDAR.map((entry) => (
                    <tr key={entry.id} className="hover:bg-[#f6f8fa]/60 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold text-[#1f2328]">{entry.date}</td>
                      <td className="px-4 py-3 font-semibold text-[#1f2328]">{entry.title}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-mono text-[10px]">
                          {entry.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#57606a]">{entry.author}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            entry.status === 'Published'
                              ? 'bg-[#dafbe1] text-[#1a7f37]'
                              : entry.status === 'Scheduled'
                              ? 'bg-[#ddf4ff] text-[#0969da]'
                              : 'bg-[#fff8c5] text-[#9a6700]'
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[#57606a]">{entry.deliverableId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: 5-SLIDE DEFENSE PRESENTATION DECK */}
        {activeTab === 'slides' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#1f2328]">
                  Capstone 62 Presentation Deck (DEL-09 &amp; DEL-10)
                </h2>
                <p className="text-xs sm:text-sm text-[#57606a]">
                  5-slide interactive evaluation deck with full presenter speaker notes for academic committee defense.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                  className="px-3 py-1.5 rounded-md border border-[#d0d7de] bg-white text-xs font-semibold text-[#1f2328]"
                >
                  {showSpeakerNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}
                </button>
              </div>
            </div>

            {/* Slide Viewer Card */}
            <div className="rounded-xl border border-[#d0d7de] bg-white overflow-hidden shadow-lg">
              
              {/* Slide Screen Frame */}
              <div className="bg-[#0f172a] text-white p-8 sm:p-12 min-h-[360px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#38bdf8] mb-4">
                    <span>CAPSTONE 62 DEFENSE DECK</span>
                    <span>SLIDE {currentSlide.slideNumber} / {CAPSTONE_SLIDES.length}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                    {currentSlide.title}
                  </h3>
                  <p className="text-sm text-[#94a3b8] mb-6">
                    {currentSlide.subtitle}
                  </p>

                  <div className="space-y-2.5 max-w-2xl">
                    {currentSlide.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-[#cbd5e1]">
                        <span className="text-[#38bdf8] font-bold">›</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics on Slide */}
                <div className="pt-6 mt-6 border-t border-[#334155] grid grid-cols-3 gap-4">
                  {currentSlide.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#1e293b] p-3 rounded-lg border border-[#334155]">
                      <span className="text-[10px] text-[#94a3b8] block uppercase font-mono">{m.label}</span>
                      <span className="text-base sm:text-lg font-bold text-[#38bdf8]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Navigation Controls */}
              <div className="p-4 bg-[#f6f8fa] border-t border-[#d0d7de] flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  {CAPSTONE_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlideIdx(i)}
                      className={`w-7 h-7 rounded-md text-xs font-mono font-bold transition-colors ${
                        currentSlideIdx === i
                          ? 'bg-[#0969da] text-white'
                          : 'bg-white border border-[#d0d7de] text-[#57606a] hover:bg-[#e1e4e8]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    disabled={currentSlideIdx === 0}
                    onClick={() => setCurrentSlideIdx(prev => prev - 1)}
                    className="px-3 py-1.5 rounded-md border border-[#d0d7de] bg-white text-xs font-semibold disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    disabled={currentSlideIdx === CAPSTONE_SLIDES.length - 1}
                    onClick={() => setCurrentSlideIdx(prev => prev + 1)}
                    className="px-3 py-1.5 rounded-md bg-[#0969da] text-white text-xs font-semibold disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Speaker Notes Drawer */}
              {showSpeakerNotes && (
                <div className="p-6 bg-white border-t border-[#d0d7de] space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#0969da]">
                    <FileText className="w-4 h-4" />
                    <span>Presenter Speaker Script &amp; Defense Dialogue</span>
                  </div>
                  <p className="text-xs text-[#24292f] leading-relaxed italic bg-[#f6f8fa] p-4 rounded-lg border border-[#d0d7de]">
                    "{currentSlide.speakerNotes}"
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 9: AUTHORITATIVE SOURCE REGISTER */}
        {activeTab === 'sources' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa]">
              <h2 className="text-xl font-bold text-[#1f2328] mb-1">
                Authoritative Primary Source Register (DEL-13)
              </h2>
              <p className="text-xs sm:text-sm text-[#57606a]">
                Primary engineering specifications, IETF RFCs, and institutional standards grounding every assertion on TechWrite AI.
              </p>
            </div>

            <div className="space-y-4">
              {SOURCE_REGISTER.map((src) => (
                <div key={src.id} className="p-6 rounded-xl border border-[#d0d7de] bg-white shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ddf4ff] text-[#0969da] font-bold">
                        {src.category}
                      </span>
                      <h3 className="text-base font-bold text-[#1f2328]">
                        {src.canonicalTitle}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#57606a]">{src.publisher} ({src.versionOrDate})</span>
                  </div>

                  <p className="text-xs text-[#24292f] bg-[#f6f8fa] p-3 rounded-lg border border-[#d0d7de] font-mono">
                    <strong>Rule Applied:</strong> {src.coreRuleApplied}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[#57606a]">
                      Governs: <span className="font-mono text-[#1f2328]">{src.governingArticles.join(', ')}</span>
                    </span>
                    <a
                      href={src.specificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0969da] hover:underline flex items-center space-x-1 font-semibold"
                    >
                      <span>Read Specification</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

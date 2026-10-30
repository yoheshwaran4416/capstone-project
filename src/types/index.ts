export interface Author {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  interests: string[];
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export type Category = 
  | 'Python'
  | 'AI & ML'
  | 'Web Development'
  | 'Developer Skills'
  | 'Software Testing'
  | 'Technical Writing';

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
  expectedOutput?: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export interface ArticleReference {
  title: string;
  url: string;
  source: string;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  content: string; // Markdown formatted
  category: Category;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTimeMinutes: number;
  featured?: boolean;
  coverIllustrationType: 'python-core' | 'python-mistakes' | 'python-testing' | 'ai-docs' | 'git-guide' | 'debugging' | 'custom';
  tableOfContents?: TableOfContentItem[];
  references?: ArticleReference[];
  testStatus?: {
    verified: boolean;
    suiteName: string;
    totalTests: number;
    passingTests: number;
    executionTime: string;
    testCommand: string;
  };
  isUserCreated?: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'A. Technical Accuracy' | 'B. Clarity & Structure' | 'C. Code Quality' | 'D. Testing & Verification' | 'E. SEO & Metadata' | 'F. Accessibility & Polish' | 'G. Responsible AI';
  text: string;
  description: string;
  completed: boolean;
}

export interface AIPrompt {
  id: string;
  stage: string;
  phase: 'Research' | 'Outline' | 'Drafting' | 'Review' | 'Testing' | 'Social';
  title: string;
  description: string;
  prompt: string;
  antiHallucinationClause: string;
}

export interface BeforeAfterDiff {
  id: string;
  title: string;
  description: string;
  category: 'Factual Accuracy' | 'Security Bug' | 'PEP 8 Style' | 'Test Flakiness' | 'Deprecation';
  before: {
    codeOrText: string;
    issue: string;
  };
  after: {
    codeOrText: string;
    resolution: string;
  };
}

export interface SocialMediaPost {
  id: string;
  platform: 'LinkedIn' | 'Twitter / X' | 'Dev.to' | 'Reddit r/Python' | 'Newsletter';
  targetAudience: string;
  hook: string;
  content: string;
  hashtags: string[];
}

export interface CalendarEntry {
  id: string;
  date: string;
  title: string;
  category: Category;
  author: string;
  status: 'Published' | 'Scheduled' | 'Drafting' | 'Review';
  deliverableId: string;
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  metrics: { label: string; value: string }[];
  speakerNotes: string;
}

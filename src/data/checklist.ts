import { ChecklistItem } from '../types';

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  // A. Technical Accuracy
  {
    id: 'chk-a1',
    category: 'A. Technical Accuracy',
    text: 'Code execution verification',
    description: 'Every code snippet, script, and API route has been executed in a clean environment with zero runtime errors.',
    completed: true
  },
  {
    id: 'chk-a2',
    category: 'A. Technical Accuracy',
    text: 'Primary source alignment',
    description: 'All technical assertions, HTTP status codes, and API signatures reference authoritative specifications (RFC 9110, PSF docs, PEP 8).',
    completed: true
  },
  {
    id: 'chk-a3',
    category: 'A. Technical Accuracy',
    text: 'Version pinning & environment specification',
    description: 'Exact runtimes are documented (Python 3.14.2, Flask 3.1.3, pytest 9.1.1, React 18).',
    completed: true
  },
  {
    id: 'chk-a4',
    category: 'A. Technical Accuracy',
    text: 'Security vulnerability prevention',
    description: 'No unsafe deserialization, SQL injection, open redirects, or unvalidated inputs are present in sample code.',
    completed: true
  },
  {
    id: 'chk-a5',
    category: 'A. Technical Accuracy',
    text: 'Expected output fidelity',
    description: 'All terminal blocks show authentic, un-doctored console outputs and test runner summaries.',
    completed: true
  },

  // B. Clarity & Structure
  {
    id: 'chk-b1',
    category: 'B. Clarity & Structure',
    text: 'Target audience definition',
    description: 'Prerequisites, assumed skills, and learning objectives are clearly stated at the beginning.',
    completed: true
  },
  {
    id: 'chk-b2',
    category: 'B. Clarity & Structure',
    text: 'Logical narrative progression',
    description: 'Article moves systematically from conceptual problem statement to architecture, code, testing, and edge cases.',
    completed: true
  },
  {
    id: 'chk-b3',
    category: 'B. Clarity & Structure',
    text: 'Interactive Table of Contents',
    description: 'Every major heading is indexed in a clickable navigation tree with smooth scrolling.',
    completed: true
  },
  {
    id: 'chk-b4',
    category: 'B. Clarity & Structure',
    text: 'Concise paragraph pacing',
    description: 'Paragraphs are kept under 4-5 sentences with generous whitespace for comfortable reading.',
    completed: true
  },

  // C. Code Quality
  {
    id: 'chk-c1',
    category: 'C. Code Quality',
    text: 'PEP 8 / idiomatic compliance',
    description: 'Python code passes flake8/ruff linting without warnings, adhering to snake_case naming and spacing rules.',
    completed: true
  },
  {
    id: 'chk-c2',
    category: 'C. Code Quality',
    text: 'Explicit type annotations',
    description: 'Functions include PEP 484 type hints for parameters and return types.',
    completed: true
  },
  {
    id: 'chk-c3',
    category: 'C. Code Quality',
    text: 'Defensive validation & error boundaries',
    description: 'Code guards against missing keys, type mismatches, and boundary conditions.',
    completed: true
  },
  {
    id: 'chk-c4',
    category: 'C. Code Quality',
    text: 'Copy-ready formatting',
    description: 'Code snippets include copy buttons and are self-contained without missing dependencies.',
    completed: true
  },

  // D. Testing & Verification
  {
    id: 'chk-d1',
    category: 'D. Testing & Verification',
    text: 'Automated test suite coverage',
    description: 'Test suites achieve 100% pass rates across all stated scenarios.',
    completed: true
  },
  {
    id: 'chk-d2',
    category: 'D. Testing & Verification',
    text: 'Test state isolation',
    description: 'Tests do not share mutable state or depend on execution order.',
    completed: true
  },
  {
    id: 'chk-d3',
    category: 'D. Testing & Verification',
    text: 'Edge case verification',
    description: 'Empty strings, out-of-range inputs, and invalid formats are explicitly tested.',
    completed: true
  },
  {
    id: 'chk-d4',
    category: 'D. Testing & Verification',
    text: 'Execution benchmark recording',
    description: 'Real execution times (e.g. 0.001s, 2.38s) are measured and cited.',
    completed: true
  },

  // E. SEO & Metadata
  {
    id: 'chk-e1',
    category: 'E. SEO & Metadata',
    text: 'Canonical URL slugs',
    description: 'Slugs are lowercase, hyphen-separated, and under 50 characters.',
    completed: true
  },
  {
    id: 'chk-e2',
    category: 'E. SEO & Metadata',
    text: 'Compelling meta descriptions',
    description: 'Meta descriptions are under 160 characters and state clear developer value.',
    completed: true
  },
  {
    id: 'chk-e3',
    category: 'E. SEO & Metadata',
    text: 'Estimated reading time',
    description: 'Reading times are accurately calculated based on ~200 words/min.',
    completed: true
  },

  // F. Accessibility & Polish
  {
    id: 'chk-f1',
    category: 'F. Accessibility & Polish',
    text: 'WCAG AAA color contrast',
    description: 'Text colors against white and subtle backgrounds meet accessibility standards.',
    completed: true
  },
  {
    id: 'chk-f2',
    category: 'F. Accessibility & Polish',
    text: 'Keyboard navigation support',
    description: 'All buttons, search inputs, tabs, and filters can be operated without a mouse.',
    completed: true
  },
  {
    id: 'chk-f3',
    category: 'F. Accessibility & Polish',
    text: 'Mobile responsiveness',
    description: 'Layouts scale seamlessly across mobile (375px), tablet (768px), and desktop (1280px).',
    completed: true
  },

  // G. Responsible AI
  {
    id: 'chk-g1',
    category: 'G. Responsible AI',
    text: 'Transparent AI assistance disclosure',
    description: 'Clear statement disclosing that AI was utilized for drafting with full human technical review.',
    completed: true
  },
  {
    id: 'chk-g2',
    category: 'G. Responsible AI',
    text: 'Zero hallucinated packages',
    description: 'Every import is checked against the standard library or real PyPI packages.',
    completed: true
  },
  {
    id: 'chk-g3',
    category: 'G. Responsible AI',
    text: 'Fact & specification audit',
    description: 'All conceptual claims were audited line-by-line by a human engineer.',
    completed: true
  }
];

import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg
      viewBox="0 0 600 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="heroCardGrad" x1="0" y1="0" x2="600" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f8fafc" />
          <stop offset="1" stopColor="#edf2f7" />
        </linearGradient>
        <linearGradient id="heroBlueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0969da" />
          <stop offset="1" stopColor="#0550ae" />
        </linearGradient>
        <linearGradient id="heroAccentGlow" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0969da" stopOpacity="0.1" />
        </linearGradient>
        <filter id="subtleShadow" x="-10" y="-10" width="620" height="440" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#091e42" floodOpacity="0.08" />
        </filter>
        <filter id="cardShadow" x="-5" y="-5" width="400" height="300" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#091e42" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Background Frame with Subtle Grid */}
      <rect width="600" height="420" rx="16" fill="url(#heroCardGrad)" />
      
      {/* Subtle Grid Pattern */}
      <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" opacity="0.6">
        <line x1="60" y1="0" x2="60" y2="420" />
        <line x1="180" y1="0" x2="180" y2="420" />
        <line x1="300" y1="0" x2="300" y2="420" />
        <line x1="420" y1="0" x2="420" y2="420" />
        <line x1="540" y1="0" x2="540" y2="420" />
        <line x1="0" y1="80" x2="600" y2="80" />
        <line x1="0" y1="200" x2="600" y2="200" />
        <line x1="0" y1="320" x2="600" y2="320" />
      </g>

      {/* Floating Modern Terminal Window */}
      <g filter="url(#subtleShadow)">
        <rect x="40" y="45" width="370" height="250" rx="10" fill="#1b1f24" stroke="#30363d" strokeWidth="1" />
        {/* Window controls */}
        <circle cx="62" cy="63" r="5" fill="#f85149" />
        <circle cx="78" cy="63" r="5" fill="#d29922" />
        <circle cx="94" cy="63" r="5" fill="#3fb950" />
        <text x="120" y="66" fill="#8b949e" fontSize="11" fontFamily="ui-monospace, monospace">techwrite-cli ~/capstone62</text>
        <line x1="40" y1="80" x2="410" y2="80" stroke="#30363d" strokeWidth="1" />

        {/* Code Content in Terminal */}
        <g fontFamily="ui-monospace, monospace" fontSize="12">
          <text x="60" y="112" fill="#79c0ff">$ py -m unittest -v</text>
          <text x="60" y="136" fill="#7ee787">✓ test_parameters_binding ... ok</text>
          <text x="60" y="156" fill="#7ee787">✓ test_legb_variable_scope ... ok</text>
          <text x="60" y="176" fill="#7ee787">✓ test_defensive_slugify ... ok</text>
          <text x="60" y="196" fill="#7ee787">✓ test_rfc9110_http_status ... ok</text>
          
          <line x1="60" y1="215" x2="390" y2="215" stroke="#30363d" strokeWidth="1" />
          <text x="60" y="235" fill="#58a6ff" fontWeight="bold">Ran 22 tests in 2.38s (100% Passing)</text>
          <text x="60" y="258" fill="#3fb950" fontWeight="bold">STATUS: VERIFIED &amp; SUBMISSION-READY</text>
          <rect x="360" y="248" width="8" height="13" fill="#58a6ff" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1s" repeatCount="indefinite" />
          </rect>
        </g>
      </g>

      {/* Floating Verified Badge Card */}
      <g filter="url(#cardShadow)">
        <rect x="330" y="210" width="230" height="160" rx="12" fill="#ffffff" stroke="#d0d7de" strokeWidth="1.5" />
        
        {/* Header of Badge */}
        <rect x="330" y="210" width="230" height="38" rx="12" fill="#f6f8fa" />
        <rect x="330" y="236" width="230" height="12" fill="#f6f8fa" />
        <circle cx="355" cy="229" r="7" fill="#1a7f37" />
        <path d="M352 229l2 2 4-4" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="370" y="233" fill="#1f2328" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">Zero-Hallucination QA</text>
        
        {/* Verification Checkmarks */}
        <g fontSize="11" fontFamily="system-ui, sans-serif" fill="#57606a">
          <text x="350" y="270">✦ RFC 9110 HTTP Specs</text>
          <text x="350" y="295">✦ Python 3.14 Standard Lib</text>
          <text x="350" y="320">✦ PEP 8 &amp; PEP 257 Compliant</text>
          <text x="350" y="345">✦ 52-Point Writing Checklist</text>
        </g>
      </g>

      {/* Floating Git Branch Graph Element */}
      <g>
        <circle cx="480" cy="95" r="14" fill="#ddf4ff" stroke="#0969da" strokeWidth="2" />
        <path d="M476 95h8M480 91v8" stroke="#0969da" strokeWidth="2" strokeLinecap="round" />
        <circle cx="530" cy="65" r="8" fill="#0969da" />
        <line x1="492" y1="88" x2="524" y2="70" stroke="#0969da" strokeWidth="2" strokeDasharray="3 3" />
        <text x="500" y="125" fill="#0969da" fontSize="11" fontWeight="600" fontFamily="ui-monospace, monospace">git commit -m</text>
      </g>
    </svg>
  );
};

export const PythonCoreIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      
      {/* Editorial Decorative Background */}
      <circle cx="340" cy="60" r="80" fill="#ddf4ff" opacity="0.6" />
      <circle cx="80" cy="190" r="60" fill="#fff8c5" opacity="0.4" />

      {/* Central Code Card */}
      <rect x="40" y="35" width="320" height="170" rx="8" fill="#ffffff" stroke="#d0d7de" strokeWidth="1.5" />
      
      {/* Card Header */}
      <path d="M40 43a8 8 0 0 1 8-8h304a8 8 0 0 1 8 8v24H40V43z" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <circle cx="58" cy="51" r="4" fill="#cf222e" />
      <circle cx="70" cy="51" r="4" fill="#9a6700" />
      <circle cx="82" cy="51" r="4" fill="#1a7f37" />
      <text x="100" y="55" fill="#57606a" fontSize="10" fontFamily="ui-monospace, monospace">function_anatomy.py</text>

      {/* Syntax Highlighting Representation */}
      <g fontFamily="ui-monospace, monospace" fontSize="11">
        <text x="58" y="85">
          <tspan fill="#cf222e" fontWeight="bold">def </tspan>
          <tspan fill="#8250df" fontWeight="600">calculate_reading_time</tspan>
          <tspan fill="#24292f">(</tspan>
        </text>
        <text x="75" y="105">
          <tspan fill="#953800">words</tspan>
          <tspan fill="#0550ae">: int</tspan>
          <tspan fill="#24292f">, </tspan>
          <tspan fill="#953800">wpm</tspan>
          <tspan fill="#0550ae">: int = 200</tspan>
        </text>
        <text x="58" y="125">
          <tspan fill="#24292f">) </tspan>
          <tspan fill="#cf222e">-&gt; </tspan>
          <tspan fill="#0550ae">int</tspan>
          <tspan fill="#24292f">:</tspan>
        </text>
        <text x="75" y="148" fill="#57606a" fontStyle="italic">    """Return estimated minutes."""</text>
        <text x="75" y="170">
          <tspan fill="#cf222e" fontWeight="bold">    return </tspan>
          <tspan fill="#0550ae">max(1, round(words / wpm))</tspan>
        </text>
      </g>

      {/* Floating Badge */}
      <rect x="235" y="165" width="110" height="26" rx="13" fill="#ddf4ff" stroke="#0969da" strokeWidth="1" />
      <text x="250" y="182" fill="#0969da" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">LEGB SCOPE</text>
    </svg>
  );
};

export const PythonMistakesIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      
      {/* Background Warning Elements */}
      <circle cx="330" cy="50" r="70" fill="#ffebe9" opacity="0.6" />
      <circle cx="60" cy="180" r="50" fill="#dafbe1" opacity="0.6" />

      {/* Before / Buggy Card */}
      <g>
        <rect x="35" y="35" width="330" height="75" rx="6" fill="#ffffff" stroke="#ff8182" strokeWidth="1.2" />
        <rect x="45" y="45" width="60" height="18" rx="4" fill="#ffebe9" />
        <text x="52" y="58" fill="#cf222e" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">❌ BUGGY</text>
        <text x="115" y="58" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">Mutable Default Argument</text>
        
        <text x="45" y="85" fontFamily="ui-monospace, monospace" fontSize="11">
          <tspan fill="#cf222e">def </tspan>
          <tspan fill="#8250df">add_item</tspan>
          <tspan fill="#24292f">(item, </tspan>
          <tspan fill="#cf222e" fontWeight="bold" textDecoration="line-through">items=[]</tspan>
          <tspan fill="#24292f">):</tspan>
        </text>
        <text x="45" y="100" fontFamily="ui-monospace, monospace" fontSize="10" fill="#cf222e">
          # Shared across all future calls!
        </text>
      </g>

      {/* After / Idiomatic Card */}
      <g>
        <rect x="35" y="125" width="330" height="85" rx="6" fill="#ffffff" stroke="#4ac26b" strokeWidth="1.2" />
        <rect x="45" y="135" width="64" height="18" rx="4" fill="#dafbe1" />
        <text x="52" y="148" fill="#1a7f37" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">✓ IDIOMATIC</text>
        <text x="120" y="148" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">PEP 8 Sentinel None</text>
        
        <text x="45" y="175" fontFamily="ui-monospace, monospace" fontSize="11">
          <tspan fill="#cf222e">def </tspan>
          <tspan fill="#8250df">add_item</tspan>
          <tspan fill="#24292f">(item, </tspan>
          <tspan fill="#1a7f37" fontWeight="bold">items=None</tspan>
          <tspan fill="#24292f">):</tspan>
        </text>
        <text x="65" y="195" fontFamily="ui-monospace, monospace" fontSize="10" fill="#1a7f37">
          if items is None: items = []
        </text>
      </g>
    </svg>
  );
};

export const PythonTestingIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <circle cx="340" cy="180" r="90" fill="#dafbe1" opacity="0.5" />
      
      {/* Test Runner Terminal Window */}
      <rect x="30" y="30" width="340" height="180" rx="8" fill="#1b1f24" stroke="#30363d" strokeWidth="1" />
      <circle cx="50" cy="46" r="4" fill="#f85149" />
      <circle cx="62" cy="46" r="4" fill="#d29922" />
      <circle cx="74" cy="46" r="4" fill="#3fb950" />
      <text x="95" y="50" fill="#8b949e" fontSize="10" fontFamily="ui-monospace, monospace">test_runner (unittest)</text>

      {/* Passing assertions */}
      <g fontFamily="ui-monospace, monospace" fontSize="11">
        <text x="45" y="78" fill="#79c0ff">$ py -m unittest -v test_slugify.py</text>
        <text x="45" y="100" fill="#7ee787">test_standard_title ... ok</text>
        <text x="45" y="120" fill="#7ee787">test_special_punctuation ... ok</text>
        <text x="45" y="140" fill="#7ee787">test_max_length_truncation ... ok</text>
        <text x="45" y="160" fill="#7ee787">test_empty_string_exception ... ok</text>
        
        <line x1="45" y1="175" x2="350" y2="175" stroke="#30363d" strokeWidth="1" />
        <text x="45" y="195" fill="#3fb950" fontWeight="bold">Ran 6 tests in 0.002s — OK</text>
      </g>
    </svg>
  );
};

export const AIDocsIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <circle cx="80" cy="60" r="70" fill="#fbefff" opacity="0.6" />
      
      {/* Two cards: AI Draft & Human Verification */}
      <rect x="35" y="35" width="155" height="170" rx="8" fill="#ffffff" stroke="#d0d7de" strokeWidth="1" />
      <rect x="45" y="45" width="80" height="18" rx="4" fill="#fbefff" />
      <text x="52" y="58" fill="#8250df" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">AI GENERATION</text>
      <text x="45" y="85" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">Drafting docstrings &amp; API tables in seconds.</text>
      
      {/* Arrow */}
      <path d="M198 120h12m-4-5l5 5-5 5" stroke="#0969da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="218" y="35" width="150" height="170" rx="8" fill="#ffffff" stroke="#0969da" strokeWidth="1.5" />
      <rect x="228" y="45" width="90" height="18" rx="4" fill="#ddf4ff" />
      <text x="235" y="58" fill="#0969da" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">HUMAN AUDIT</text>
      <text x="228" y="85" fill="#1f2328" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Zero-Hallucination Gate</text>
      <text x="228" y="105" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">✓ Fact checks</text>
      <text x="228" y="125" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">✓ Real test execution</text>
      <text x="228" y="145" fill="#57606a" fontSize="10" fontFamily="system-ui, sans-serif">✓ RFC 9110 compliance</text>
    </svg>
  );
};

export const GitGuideIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <circle cx="320" cy="60" r="70" fill="#ddf4ff" opacity="0.6" />

      {/* Main branch line */}
      <line x1="50" y1="120" x2="350" y2="120" stroke="#0969da" strokeWidth="3" />
      
      {/* Commits */}
      <circle cx="80" cy="120" r="10" fill="#0969da" stroke="#ffffff" strokeWidth="3" />
      <circle cx="160" cy="120" r="10" fill="#0969da" stroke="#ffffff" strokeWidth="3" />
      <circle cx="320" cy="120" r="10" fill="#0969da" stroke="#ffffff" strokeWidth="3" />

      {/* Feature branch line */}
      <path d="M160 120 C180 80, 200 65, 240 65 H270 C290 65, 305 90, 320 120" stroke="#1a7f37" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
      <circle cx="255" cy="65" r="8" fill="#1a7f37" stroke="#ffffff" strokeWidth="2" />

      {/* Labels */}
      <text x="70" y="150" fill="#57606a" fontSize="10" fontFamily="ui-monospace, monospace">main (v1.0)</text>
      <text x="220" y="50" fill="#1a7f37" fontSize="10" fontWeight="bold" fontFamily="ui-monospace, monospace">feature/api-tests</text>
      <text x="290" y="150" fill="#0969da" fontSize="10" fontWeight="bold" fontFamily="ui-monospace, monospace">PR #62 (Merged)</text>

      {/* Terminal pill at bottom */}
      <rect x="50" y="175" width="300" height="34" rx="6" fill="#1b1f24" />
      <text x="65" y="196" fill="#79c0ff" fontSize="11" fontFamily="ui-monospace, monospace">$ git checkout -b feature/functions</text>
    </svg>
  );
};

export const DebuggingIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <circle cx="340" cy="70" r="80" fill="#fff8c5" opacity="0.6" />

      <rect x="35" y="35" width="330" height="170" rx="8" fill="#1b1f24" stroke="#30363d" strokeWidth="1" />
      <circle cx="55" cy="51" r="4" fill="#f85149" />
      <circle cx="67" cy="51" r="4" fill="#d29922" />
      <circle cx="79" cy="51" r="4" fill="#3fb950" />
      <text x="100" y="55" fill="#8b949e" fontSize="10" fontFamily="ui-monospace, monospace">interactive_pdb.py</text>

      <g fontFamily="ui-monospace, monospace" fontSize="11">
        <text x="50" y="85" fill="#7ee787">def calculate_total(cart):</text>
        <text x="70" y="105" fill="#f0883e" fontWeight="bold">&gt; breakpoint() # Pauses execution</text>
        <text x="50" y="128" fill="#58a6ff">(Pdb) p cart.total()</text>
        <text x="50" y="148" fill="#d2a8ff">149.99</text>
        <text x="50" y="168" fill="#58a6ff">(Pdb) n # Step to next instruction</text>
        <text x="50" y="188" fill="#7ee787">&gt; return round(total * 1.08, 2)</text>
      </g>
    </svg>
  );
};

export const DefaultArticleIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="400" height="240" rx="8" fill="#f6f8fa" stroke="#d0d7de" strokeWidth="1" />
      <rect x="40" y="40" width="320" height="160" rx="6" fill="#ffffff" stroke="#d0d7de" strokeWidth="1" />
      <rect x="60" y="60" width="140" height="14" rx="4" fill="#0969da" opacity="0.8" />
      <rect x="60" y="85" width="280" height="8" rx="2" fill="#d0d7de" />
      <rect x="60" y="100" width="240" height="8" rx="2" fill="#d0d7de" />
      <rect x="60" y="115" width="200" height="8" rx="2" fill="#d0d7de" />
      <rect x="60" y="140" width="100" height="24" rx="4" fill="#ddf4ff" />
      <text x="72" y="156" fill="#0969da" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">TECHWRITE AI</text>
    </svg>
  );
};

export function getArticleCover(type: string, className?: string) {
  switch (type) {
    case 'python-core':
      return <PythonCoreIllustration className={className} />;
    case 'python-mistakes':
      return <PythonMistakesIllustration className={className} />;
    case 'python-testing':
      return <PythonTestingIllustration className={className} />;
    case 'ai-docs':
      return <AIDocsIllustration className={className} />;
    case 'git-guide':
      return <GitGuideIllustration className={className} />;
    case 'debugging':
      return <DebuggingIllustration className={className} />;
    default:
      return <DefaultArticleIllustration className={className} />;
  }
}

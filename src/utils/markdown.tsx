import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { Info, Lightbulb, ShieldAlert } from 'lucide-react';

export function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let index = 0;

  let inCodeBlock = false;
  let codeLanguage = '';
  let codeBuffer: string[] = [];

  let inTable = false;
  let tableRows: string[][] = [];

  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${index++}`} className="my-4 space-y-2 list-disc list-outside pl-6 text-[#24292f] text-base leading-relaxed">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const [headerRow, ...bodyRows] = tableRows;
      elements.push(
        <div key={`table-wrapper-${index++}`} className="my-6 overflow-x-auto rounded-lg border border-[#d0d7de] shadow-xs">
          <table className="min-w-full divide-y divide-[#d0d7de] text-sm text-left">
            <thead className="bg-[#f6f8fa] text-[#1f2328] font-semibold">
              <tr>
                {headerRow.map((col, idx) => (
                  <th key={idx} className="px-4 py-3 font-mono text-xs uppercase tracking-wider">
                    {col.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d0d7de] bg-white text-[#24292f]">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#f6f8fa]/50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-xs sm:text-sm font-normal">
                      <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cell.trim()) }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code blocks
    if (trimmed.startsWith('```')) {
      flushList();
      flushTable();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = trimmed.replace('```', '').trim() || 'python';
        codeBuffer = [];
      } else {
        // End code block
        inCodeBlock = false;
        elements.push(
          <CodeBlock
            key={`code-${index++}`}
            language={codeLanguage}
            code={codeBuffer.join('\n')}
          />
        );
        codeBuffer = [];
        codeLanguage = '';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Check Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      // Skip markdown table separator like |--|--|
      if (trimmed.match(/^\|[\s-:]+\|/)) {
        continue;
      }
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // Check Bulleted List
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      inList = true;
      listItems.push(trimmed.slice(2));
      continue;
    } else {
      flushList();
    }

    // Empty line
    if (!trimmed) {
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      elements.push(
        <hr key={`hr-${index++}`} className="my-8 border-t border-[#d0d7de]" />
      );
      continue;
    }

    // Headings with clean IDs for TOC anchoring
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      const id = generateHeadingId(text);
      elements.push(
        <h2
          id={id}
          key={`h2-${index++}`}
          className="text-2xl sm:text-3xl font-extrabold text-[#1f2328] tracking-tight mt-10 mb-4 pt-4 border-t border-[#d0d7de]/50 scroll-mt-24"
        >
          {text}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      const id = generateHeadingId(text);
      elements.push(
        <h3
          id={id}
          key={`h3-${index++}`}
          className="text-xl sm:text-2xl font-bold text-[#1f2328] tracking-tight mt-8 mb-3 scroll-mt-24"
        >
          {text}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      const text = trimmed.slice(5);
      elements.push(
        <h4
          key={`h4-${index++}`}
          className="text-lg font-bold text-[#1f2328] tracking-tight mt-6 mb-2"
        >
          {text}
        </h4>
      );
      continue;
    }

    // Blockquotes & Callouts
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.slice(2);
      let icon = <Info className="w-5 h-5 text-[#0969da] shrink-0" />;
      let title = 'Note';
      let borderColor = 'border-[#0969da]';
      let bgColor = 'bg-[#ddf4ff]/40';

      if (quoteText.toLowerCase().includes('warning:') || quoteText.toLowerCase().includes('danger:')) {
        icon = <ShieldAlert className="w-5 h-5 text-[#cf222e] shrink-0" />;
        title = 'Warning';
        borderColor = 'border-[#cf222e]';
        bgColor = 'bg-[#ffebe9]/50';
      } else if (quoteText.toLowerCase().includes('tip:') || quoteText.toLowerCase().includes('best practice:')) {
        icon = <Lightbulb className="w-5 h-5 text-[#1a7f37] shrink-0" />;
        title = 'Best Practice';
        borderColor = 'border-[#1a7f37]';
        bgColor = 'bg-[#dafbe1]/40';
      }

      elements.push(
        <div
          key={`alert-${index++}`}
          className={`my-6 p-4 rounded-r-lg border-l-4 ${borderColor} ${bgColor} flex items-start space-x-3 text-sm text-[#24292f]`}
        >
          {icon}
          <div>
            <span className="font-bold block mb-1 font-mono uppercase text-xs">{title}</span>
            <div dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(quoteText) }} />
          </div>
        </div>
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p
        key={`p-${index++}`}
        className="my-4 text-base sm:text-[17px] text-[#24292f] leading-relaxed font-normal"
        dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
      />
    );
  }

  flushList();
  flushTable();

  return elements;
}

function generateHeadingId(text: string): string {
  // Strip leading numbers like "1. What is..." -> "what-is" or match TOC IDs
  const clean = text
    .toLowerCase()
    .replace(/^\d+[\.\s]+/, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return clean || 'section';
}

function formatInlineMarkdown(text: string): string {
  let res = text;
  // Bold
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1f2328]">$1</strong>');
  // Italic
  res = res.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  // Inline Code
  res = res.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#f6f8fa] text-[#0969da] font-mono text-[13px] border border-[#d0d7de]">$1</code>');
  // Links
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-[#0969da] hover:underline font-medium">$1</a>');
  return res;
}

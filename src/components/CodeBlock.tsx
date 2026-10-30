import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  language?: string;
  code: string;
  filename?: string;
  expectedOutput?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'python',
  code,
  filename,
  expectedOutput
}) => {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] overflow-hidden text-sm shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#d0d7de] bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {filename ? (
            <span className="text-xs font-mono font-medium text-[#57606a] ml-2">
              {filename}
            </span>
          ) : (
            <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0969da] ml-2">
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {expectedOutput && (
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="text-xs text-[#57606a] hover:text-[#0969da] px-2 py-1 rounded transition-colors flex items-center space-x-1 font-mono"
              title="Toggle expected output"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{showOutput ? 'Hide Output' : 'View Output'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-md border border-[#d0d7de] bg-white hover:bg-[#f6f8fa] text-[#1f2328] transition-all shadow-xs active:scale-95"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#1a7f37]" />
                <span className="text-[#1a7f37]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#57606a]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto bg-[#1b1f24] text-[#e6edf3] font-mono text-[13px] leading-relaxed">
        <pre className="selection:bg-[#0969da]/30">
          <code>{code.trim()}</code>
        </pre>
      </div>

      {/* Expected Output section */}
      {expectedOutput && showOutput && (
        <div className="border-t border-[#30363d] bg-[#161b22] px-4 py-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#8b949e] mb-1.5 uppercase tracking-wider font-semibold">
            <Terminal className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>Expected Output (Verified)</span>
          </div>
          <div className="p-2.5 rounded bg-[#0d1117] text-[#7ee787] font-mono text-xs overflow-x-auto border border-[#30363d]/60">
            <pre><code>{expectedOutput.trim()}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

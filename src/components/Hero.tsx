import React from 'react';
import { ArrowRight, PenLine, CheckCircle2, Terminal } from 'lucide-react';
import { HeroIllustration } from './Illustrations';

interface HeroProps {
  onExplore: () => void;
  onStartWriting: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onStartWriting }) => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-[#d0d7de] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#f6f8fa] border border-[#d0d7de] text-xs font-mono text-[#57606a]">
              <span className="w-2 h-2 rounded-full bg-[#1a7f37] animate-pulse" />
              <span className="font-semibold text-[#1f2328]">CAPSTONE 62 PROJECT</span>
              <span className="text-[#d0d7de]">|</span>
              <span className="text-[#0969da]">Verified Code &amp; Zero Hallucinations</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1f2328] tracking-tight leading-[1.1]">
              Better Code Starts With <span className="text-[#0969da] underline decoration-[#ddf4ff] decoration-wavy underline-offset-8">Better Knowledge.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#57606a] leading-relaxed max-w-2xl font-normal">
              Practical tutorials, developer insights, and technical guides created for the next generation of software engineers. Every code snippet executed and verified before publication.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#0969da] hover:bg-[#0550ae] text-white font-semibold text-sm transition-all shadow-xs active:scale-95 group"
              >
                <span>Explore Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartWriting}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#f6f8fa] hover:bg-[#e1e4e8] border border-[#d0d7de] text-[#1f2328] font-semibold text-sm transition-all active:scale-95"
              >
                <PenLine className="w-4 h-4 text-[#0969da]" />
                <span>Start Writing</span>
              </button>
            </div>

            {/* Trust & Quality Indicators */}
            <div className="pt-6 border-t border-[#d0d7de]/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#57606a]">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7f37] shrink-0" />
                <span>22/22 Automated Tests</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-[#0969da] shrink-0" />
                <span>Python 3.14.2 &amp; Flask 3.1</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1a7f37] shrink-0" />
                <span>RFC 9110 HTTP Specs</span>
              </div>
            </div>

          </div>

          {/* Right Column: Original Editorial SVG Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-lg lg:max-w-none transition-transform hover:scale-[1.01] duration-300">
              <HeroIllustration />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

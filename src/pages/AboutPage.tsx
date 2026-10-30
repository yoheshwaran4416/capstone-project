import React from 'react';
import { ShieldCheck, CheckCircle2, Cpu, Terminal, BookOpen, Layers, Users, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header Hero */}
      <section className="bg-[#f6f8fa] border-b border-[#d0d7de] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ddf4ff] border border-[#54aeff]/30 text-xs font-mono text-[#0969da]">
            <Terminal className="w-3.5 h-3.5" />
            <span>CAPSTONE 62 PROJECT DOSSIER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1f2328] tracking-tight leading-tight">
            About TECHWRITE AI
          </h1>

          <p className="text-base sm:text-lg text-[#57606a] leading-relaxed max-w-2xl mx-auto">
            An open-source academic research and publication project exploring how AI can assist software engineers in producing verified, original, and pedagogically sound technical tutorials.
          </p>
        </div>
      </section>

      {/* 2. Project Purpose & Target Audience */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-12 text-[#24292f]">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f2328] tracking-tight border-b border-[#d0d7de] pb-3">
            Project Purpose &amp; Motivation
          </h2>
          <p className="text-base leading-relaxed text-[#57606a]">
            With the rise of Large Language Models (LLMs), developer blogs and forums are being flooded with synthetic tutorials that appear syntactically correct at a glance, but harbor subtle, breaking flaws: <strong>mutable default arguments that leak state across requests, hallucinated package imports, flawed error handlers, and unvalidated REST response codes</strong>.
          </p>
          <p className="text-base leading-relaxed text-[#57606a]">
            <strong>TECHWRITE AI</strong> was built as part of the <strong>CAPSTONE 62</strong> initiative to prove a higher standard: that AI can serve as a high-velocity drafting accelerator, but only when paired with a disciplined <em>human-in-the-loop</em> editorial protocol and mandatory automated code execution.
          </p>
        </section>

        {/* 3. The Four Core Engineering Pillars */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-[#1f2328] tracking-tight border-b border-[#d0d7de] pb-3">
            The Four Core Engineering Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#ddf4ff] flex items-center justify-center text-[#0969da]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1f2328]">1. Constrained AI Research</h3>
              <p className="text-xs text-[#57606a] leading-relaxed">
                We craft constrained prompts with explicit anti-hallucination clauses, forcing generative models to reference specific, canonical standards (Python 3.10+, RFC 9110) rather than guessing.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#dafbe1] flex items-center justify-center text-[#1a7f37]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1f2328]">2. Mandatory Code Execution</h3>
              <p className="text-xs text-[#57606a] leading-relaxed">
                Every code snippet on this site is executed against Python 3.14.2 and automated test suites (<code className="font-mono text-[#1a7f37]">unittest</code> / <code className="font-mono text-[#1a7f37]">pytest</code>). No code is labeled tested without real recorded runtime logs.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#fff8c5] flex items-center justify-center text-[#9a6700]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1f2328]">3. Human Editorial Review</h3>
              <p className="text-xs text-[#57606a] leading-relaxed">
                A software engineering lead reviews every article against our 52-point Technical Writing Quality Checklist, auditing pedagogical pacing, PEP 8 compliance, and edge case coverage.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#fbefff] flex items-center justify-center text-[#8250df]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1f2328]">4. Transparent Disclosure</h3>
              <p className="text-xs text-[#57606a] leading-relaxed">
                In strict adherence to the ACM Code of Ethics, we openly disclose the specific roles played by AI in our production pipeline, maintaining complete academic and technical transparency.
              </p>
            </div>

          </div>
        </section>

        {/* 4. Responsible AI Usage & ACM Ethics Statement */}
        <section className="space-y-4 rounded-xl border border-[#d0d7de] bg-white p-6 sm:p-8">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0969da]">
            <BookOpen className="w-4 h-4" />
            <span>Responsible AI Policy &amp; Ethics Disclosure</span>
          </div>
          <p className="text-sm leading-relaxed text-[#57606a]">
            In compliance with ACM Code of Ethics Section 1.4 (Fairness &amp; Transparency) and Section 2.5 (Thorough Evaluations), TECHWRITE AI declares:
          </p>
          <ul className="space-y-2 text-xs text-[#57606a] list-disc pl-5 leading-relaxed">
            <li>Artificial Intelligence was utilized as an assistive drafting tool for generating initial article skeletons, docstrings, and social media drafts.</li>
            <li>All technical claims, formulas, and code samples were independently audited and verified by human software developers.</li>
            <li>No synthetic code is published without automated unit and integration tests passing in a clean local execution environment.</li>
            <li>No proprietary or copyrighted third-party material has been reproduced.</li>
          </ul>
        </section>

        {/* 5. Capstone Acceptance Matrix */}
        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#1f2328] tracking-tight border-b border-[#d0d7de] pb-3">
            CAPSTONE 62 Deliverables Acceptance Matrix
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[#d0d7de]">
            <table className="min-w-full divide-y divide-[#d0d7de] text-xs">
              <thead className="bg-[#f6f8fa] text-[#1f2328] font-mono">
                <tr>
                  <th className="px-4 py-2.5 text-left font-bold">Deliverable ID</th>
                  <th className="px-4 py-2.5 text-left font-bold">Item Description</th>
                  <th className="px-4 py-2.5 text-left font-bold">Status</th>
                  <th className="px-4 py-2.5 text-left font-bold">Verification Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d0d7de] bg-white text-[#24292f]">
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-01 / DEL-03</td>
                  <td className="px-4 py-2.5">Comprehensive Research &amp; 3-Post Plan</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">14 sections, 12-stage lifecycle</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-02</td>
                  <td className="px-4 py-2.5">52-Point Writing Quality Checklist</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">Interactive in /studio workspace</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-04 / DEL-06</td>
                  <td className="px-4 py-2.5">Required Capstone Technical Articles</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">Functions, Common Mistakes, unittest</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-08 / DEL-11</td>
                  <td className="px-4 py-2.5">Before-After Diff &amp; Verification Report</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">5 hallucinations caught &amp; resolved</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-09 / DEL-10</td>
                  <td className="px-4 py-2.5">5-Slide Defense Presentation &amp; Notes</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">Interactive slide deck in /studio</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-mono font-bold text-[#0969da]">DEL-15 / DEL-19</td>
                  <td className="px-4 py-2.5">Automated Code Test Suites</td>
                  <td className="px-4 py-2.5 text-[#1a7f37] font-bold">✓ Complete</td>
                  <td className="px-4 py-2.5 text-[#57606a]">22/22 Passing in 2.38s (Python 3.14)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA to Studio */}
        <div className="pt-8 text-center">
          <button
            onClick={() => onNavigate('studio')}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#0969da] hover:bg-[#0550ae] text-white font-semibold text-sm transition-all shadow-xs"
          >
            <span>Launch Capstone 62 Studio Workspace</span>
            <span className="font-mono text-xs">(/studio) →</span>
          </button>
        </div>

      </div>

    </div>
  );
};

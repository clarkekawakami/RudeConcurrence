import React from 'react';
import { ActivePage } from '../types';
import { ArrowRight, Compass, Layers, ShieldCheck, Terminal, BookOpen, Mail, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div id="home-landing-page" className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-white/[0.08]">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Executive · Systems Architect · Lifelong Explorer
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]">
            Bridging business strategy, systems architecture, and relentless curiosity.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Welcome. Over 45+ years, I’ve operated at the crossroads of executive finance, 
            enterprise systems re-engineering, and hands-on software development. 
            From CFO of Black Diamond Equipment to architecting mission-critical platforms 
            and scaling ventures.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              id="cta-explore-resume"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2.5 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98]"
            >
              <span>Explore Interactive Resume & Memoirs</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              id="hero-contact-button"
              href="mailto:clarke.kawakami@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-white/[0.08] hover:border-white/[0.2]"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              <span>Contact Clarke</span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-white/[0.08] pt-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>Salt Lake City, Utah</span>
            </div>
            <div className="h-3 w-px bg-white/[0.1] hidden sm:block" />
            <div>Harvard College · Architectural Sciences (B.A. cum laude)</div>
            <div className="h-3 w-px bg-white/[0.1] hidden sm:block" />
            <div>Wharton Graduate School · Finance & Accounting (M.B.A.)</div>
          </div>
        </div>
      </section>

      {/* Core Expertise Cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Areas of Focus & Career Themes
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">
              A brief synopsis of disciplines detailed in the interactive memoirs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="group rounded-2xl border border-white/[0.08] bg-[#11141a] p-6 transition-all hover:border-white/[0.18] hover:bg-[#151922]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-5">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Business Process & Systems
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pioneering "Blue Sky" operational overhauls, WMS barcode tracking, 
                miniPLM product lifecycle systems, and full-stack enterprise data warehouses.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/[0.08] bg-[#11141a] p-6 transition-all hover:border-white/[0.18] hover:bg-[#151922]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-5">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Executive Strategy & Operations
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Founding partner, CFO, CIO, and COO leadership. Scaling ventures from seed 
                stages to $90M+ public acquisitions and navigating multi-decade growth.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/[0.08] bg-[#11141a] p-6 transition-all hover:border-white/[0.18] hover:bg-[#151922]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Finance & Contract Stewardship
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rigorous financial modeling, multi-million dollar DoD contract deliverables, 
                banking credit relations, and inventory demand forecasting algorithms.
              </p>
            </div>
          </div>

          {/* Prompt card to view About page */}
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-cyan-950/20 via-[#11141a] to-[#11141a] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Interactive Memoirs</span>
              </div>
              <h4 className="text-lg font-semibold text-white">
                Read the candid retrospective of 20 career milestones
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Explore unfiltered stories behind Harvard, Wharton, Progressive, RD Labs, 
                Black Diamond Equipment, and big-wall climbs on El Capitan.
              </p>
            </div>

            <button
              id="cta-view-about-sub"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
            >
              <span>Go to About</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

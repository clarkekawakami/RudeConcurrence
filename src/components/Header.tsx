import React from 'react';
import { ActivePage } from '../types';
import { FileText, Home, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090b0e]/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Name */}
        <button
          id="brand-home-link"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold text-sm">
            CK
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-white leading-none">
              Clarke K. Kawakami
            </h1>
            <p className="mt-1 text-xs text-slate-400 tracking-wider">
              Executive · Systems Architect
            </p>
          </div>
        </button>

        {/* Menu Links */}
        <nav id="nav-links" className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="nav-link-home"
            onClick={() => onNavigate('home')}
            className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              activePage === 'home'
                ? 'bg-white/[0.08] text-white shadow-sm border border-white/[0.12]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
            {activePage === 'home' && (
              <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <button
            id="nav-link-about"
            onClick={() => onNavigate('about')}
            className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              activePage === 'about'
                ? 'bg-white/[0.08] text-white shadow-sm border border-white/[0.12]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>About</span>
            {activePage === 'about' && (
              <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <div className="hidden h-5 w-px bg-white/[0.08] sm:block mx-1" />

          {/* Quick Email Contact link */}
          <a
            id="contact-email-link"
            href="mailto:clarke.kawakami@gmail.com"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </nav>
      </div>
    </header>
  );
};

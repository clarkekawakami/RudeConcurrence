import React, { useState } from 'react';
import { ResumeItem } from '../types';
import { CATEGORY_LABELS, SKILL_LABELS } from '../data/resumeData';
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  MapPin, 
  Award, 
  BookOpen, 
  ArrowLeft
} from 'lucide-react';

interface ResumeCardProps {
  item: ResumeItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  item,
  isExpanded,
  onToggleExpand,
}) => {
  // Keep track of the currently open chapter inside this story card (single-accordion behavior)
  // Default first section open when card expands
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSectionIndex((prev) => (prev === index ? null : index));
  };

  // Helper to render text paragraphs cleanly
  const renderParagraph = (text: string, pIdx: number) => {
    return (
      <p key={pIdx} className="text-slate-300 text-sm leading-relaxed mb-3 last:mb-0">
        {text}
      </p>
    );
  };

  return (
    <article
      id={`resume-card-${item.id}`}
      className={`group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        isExpanded
          ? 'col-span-12 md:col-span-9 lg:col-span-6 border-cyan-500/50 bg-[#10141d] shadow-2xl shadow-black/80 ring-1 ring-cyan-500/30'
          : 'col-span-12 md:col-span-6 lg:col-span-4 border-white/[0.08] bg-[#0f1217] hover:border-white/[0.18] hover:bg-[#131720]'
      }`}
    >
      {/* Top Meta Bar: Category Badges & Significance */}
      <div className="p-4 sm:p-5 pb-3 border-b border-white/[0.06] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.categories.map((cat: string) => {
            const config = CATEGORY_LABELS[cat] || {
              label: cat,
              color: 'text-slate-300',
              border: 'border-slate-700',
              bg: 'bg-slate-800/40',
            };
            return (
              <span
                key={cat}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${config.bg} ${config.border} ${config.color}`}
              >
                {config.label}
              </span>
            );
          })}

          {item.skills.map((sk: string) => {
            const config = SKILL_LABELS[sk];
            if (!config) return null;
            return (
              <span
                key={sk}
                title={config.label}
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${config.color}`}
              >
                {config.short}
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isExpanded && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Expanded Story (+50% Width)
            </span>
          )}

          {/* Significance indicator */}
          <div
            title={`Significance priority index: ${item.significance}`}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
          >
            <Award className="h-3 w-3 text-cyan-400" />
            <span>L{item.significance}</span>
          </div>
        </div>
      </div>

      {/* CONTENT AREA: 
          When NOT expanded: Shows the original summary <div> with bullets and "Read Story" button.
          When expanded: THAT <div> IS REPLACED by the story <div> (which is 50% wider and has the "Hide Story" button).
      */}
      {!isExpanded ? (
        /* ORIGINAL SUMMARY <div> */
        <div
          id={`summary-view-${item.id}`}
          className="p-5 sm:p-6 flex-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                {item.title}
              </h3>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-1.5 text-xs text-cyan-400/90 font-medium mb-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>{item.dateRange}</span>
            </div>

            {/* Bullet points */}
            <ul className="space-y-2 mb-4">
              {item.bullets.map((bullet: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60 mt-1.5 shrink-0" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card Footer with Read Story button */}
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-cyan-400" />
              <span>{item.sections.length} chapter{item.sections.length > 1 ? 's' : ''}</span>
            </span>

            <button
              id={`read-story-btn-${item.id}`}
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-cyan-500 hover:text-slate-950 border border-white/[0.1] hover:border-cyan-400 transition-all duration-150 shadow-sm"
              title="Expand into story view (50% wider)"
            >
              <span>Read Story</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* REPLACED BY EXPANDED STORY <div> (50% Wider) */
        <div
          id={`story-view-${item.id}`}
          className="p-5 sm:p-7 flex-1 flex flex-col justify-between bg-[#0b0e14]/90"
        >
          <div>
            {/* Story Header */}
            <div className="mb-5 pb-4 border-b border-white/[0.08]">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-400">{item.title}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.xpndoTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{item.locationDate}</span>
                    </div>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400/80 shrink-0" />
                      <span className="text-slate-300 font-medium">{item.dateRange}</span>
                    </div>
                  </div>
                </div>

                {/* Hide Story button moved to expanded story div */}
                <button
                  id={`hide-story-btn-top-${item.id}`}
                  onClick={onToggleExpand}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-150 shadow-sm shrink-0"
                  title="Revert size and content back to summary"
                >
                  <span>Hide Story</span>
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Story Chapters Info Bar */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3 text-cyan-400" />
                  <span>{item.sections.length} chapter{item.sections.length > 1 ? 's' : ''} in this career memoir</span>
                </span>
                <span className="text-slate-500 text-[11px]">
                  Click to open a chapter
                </span>
              </div>
            </div>

            {/* Accordion Panels for Chapter Content (Single chapter expanded at a time) */}
            <div className="space-y-3 mb-6">
              {item.sections.map((sec, secIdx: number) => {
                const isOpen = openSectionIndex === secIdx;
                return (
                  <div
                    key={secIdx}
                    className={`rounded-xl border transition-colors overflow-hidden ${
                      isOpen
                        ? 'border-white/[0.14] bg-[#141822]'
                        : 'border-white/[0.06] bg-[#0f1218] hover:border-white/[0.1]'
                    }`}
                  >
                    <button
                      id={`accordion-btn-${item.id}-${secIdx}`}
                      onClick={() => toggleSection(secIdx)}
                      className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left font-medium text-sm transition-colors"
                    >
                      <span className={`transition-colors ${isOpen ? 'text-cyan-300 font-semibold' : 'text-slate-200'}`}>
                        {sec.title}
                      </span>
                      <span className="p-1 rounded-md bg-white/[0.05] text-slate-400 shrink-0">
                        {isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-slate-300 border-t border-white/[0.04]">
                        {sec.paragraphs.map((p: string, pIdx: number) => renderParagraph(p, pIdx))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar with Revert / Hide Story button */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <button
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to original overview</span>
            </button>

            <button
              id={`hide-story-btn-bottom-${item.id}`}
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold bg-white/[0.06] text-slate-200 hover:bg-cyan-500 hover:text-slate-950 border border-white/[0.1] hover:border-cyan-400 transition-all duration-150 shadow-sm"
              title="Revert size and content back to summary"
            >
              <span>Hide Story</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

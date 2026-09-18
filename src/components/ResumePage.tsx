import React, { useState, useMemo } from 'react';
import { ResumeItem, ElementCategory, SkillCategory, SortByOption, SortDirection } from '../types';
import { RESUME_ITEMS, CATEGORY_LABELS, SKILL_LABELS } from '../data/resumeData';
import { ResumeCard } from './ResumeCard';
import { 
  Filter, 
  ArrowUpDown, 
  Search, 
  SlidersHorizontal, 
  X, 
  Maximize2, 
  Minimize2, 
  Check, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';

export const ResumePage: React.FC = () => {
  // State for filtering and sorting
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortByOption>('original-order');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Track which cards are expanded into the 50% wider story view
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const toggleCardExpand = (id: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllCards = () => {
    const all: Record<string, boolean> = {};
    RESUME_ITEMS.forEach((item) => {
      all[item.id] = true;
    });
    setExpandedCardIds(all);
  };

  const collapseAllCards = () => {
    setExpandedCardIds({});
  };

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSkill('all');
    setSearchQuery('');
    setSortBy('original-order');
    setSortDirection('asc');
  };

  // Compute counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: RESUME_ITEMS.length };
    RESUME_ITEMS.forEach((item) => {
      item.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, []);

  // Compute counts for skills
  const skillCounts = useMemo(() => {
    const counts: Record<string, number> = { all: RESUME_ITEMS.length };
    RESUME_ITEMS.forEach((item) => {
      item.skills.forEach((sk) => {
        counts[sk] = (counts[sk] || 0) + 1;
      });
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...RESUME_ITEMS];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((item) =>
        item.categories.includes(selectedCategory as ElementCategory)
      );
    }

    // Filter by skill
    if (selectedSkill !== 'all') {
      result = result.filter((item) =>
        item.skills.includes(selectedSkill as SkillCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const xpndoMatch = item.xpndoTitle.toLowerCase().includes(q);
        const whenMatch = item.dateRange.toLowerCase().includes(q);
        const bulletMatch = item.bullets.some((b) => b.toLowerCase().includes(q));
        const sectionMatch = item.sections.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.paragraphs.some((p) => p.toLowerCase().includes(q))
        );
        return titleMatch || xpndoMatch || whenMatch || bulletMatch || sectionMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'significance') {
        // significance: 1 is greatest in original Isotope data-symbol
        // asc direction means greatest->least (1 to 9)
        // desc direction means least->greatest (9 to 1)
        if (sortDirection === 'asc') {
          return a.significance - b.significance;
        } else {
          return b.significance - a.significance;
        }
      } else {
        // original-order (chronological)
        // asc: oldest -> newest (originalOrder 1, 2, 3...)
        // desc: newest -> oldest (originalOrder ...3, 2, 1)
        if (sortDirection === 'asc') {
          return a.originalOrder - b.originalOrder;
        } else {
          return b.originalOrder - a.originalOrder;
        }
      }
    });

    return result;
  }, [selectedCategory, selectedSkill, searchQuery, sortBy, sortDirection]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSkill !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'original-order' ||
    sortDirection !== 'asc';

  return (
    <div id="resume-container" className="w-full pb-24">
      {/* Header section */}
      <section className="border-b border-white/[0.08] bg-[#0c0e13] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                <Layers className="h-3.5 w-3.5" />
                <span>Interactive Career Retrospective</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Clarke K. Kawakami · About & Memoirs
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                A non-linear, memoir-style interactive resume. Filter by discipline, sort by chronological 
                sequence or significance, and expand individual cards to read candid reflections on each career phase.
              </p>
            </div>

            {/* Quick stats and toggle all */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs text-slate-300">
                <span className="text-cyan-400 font-semibold">{filteredAndSortedItems.length}</span>
                <span className="text-slate-500">of</span>
                <span>{RESUME_ITEMS.length} milestones</span>
              </div>

              <button
                id="btn-expand-all"
                onClick={expandAllCards}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Expand all cards to show full memoirs"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Expand All</span>
              </button>

              <button
                id="btn-collapse-all"
                onClick={collapseAllCards}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Collapse all cards to compact grid"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Collapse All</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Control Panel: Filters, Sort & Search */}
      <section
        id="resume-filter-controls"
        className="sticky top-16 z-30 border-b border-white/[0.08] bg-[#090b0e]/95 backdrop-blur-md py-4 transition-all"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3.5">
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input
                id="resume-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search milestones, companies, or tech (e.g. BD, Wharton, ERP)..."
                className="w-full rounded-xl border border-white/[0.1] bg-[#12161f] pl-10 pr-9 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#12161f] p-1 text-xs">
                <span className="px-2 text-slate-400 text-[11px] font-medium hidden sm:inline">
                  Sort:
                </span>

                <button
                  id="sort-chronological-btn"
                  onClick={() => setSortBy('original-order')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    sortBy === 'original-order'
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Chronological
                </button>

                <button
                  id="sort-significance-btn"
                  onClick={() => setSortBy('significance')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    sortBy === 'significance'
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-sm border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Significance
                </button>
              </div>

              {/* Sort Direction Toggle */}
              <button
                id="sort-direction-toggle-btn"
                onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
                title={
                  sortBy === 'original-order'
                    ? sortDirection === 'asc'
                      ? 'Oldest to Newest'
                      : 'Newest to Oldest'
                    : sortDirection === 'asc'
                    ? 'Greatest to Least'
                    : 'Least to Greatest'
                }
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#12161f] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.06] transition-colors"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[11px]">
                  {sortBy === 'original-order'
                    ? sortDirection === 'asc'
                      ? 'Oldest → Newest'
                      : 'Newest → Oldest'
                    : sortDirection === 'asc'
                    ? 'Priority: High → Low'
                    : 'Priority: Low → High'}
                </span>
              </button>

              {/* Reset button if active */}
              {hasActiveFilters && (
                <button
                  id="reset-filters-btn"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-2.5 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/20 transition-colors"
                  title="Reset all filters and sort order"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Chips: Categories & Skills */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Category Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Category:
              </span>

              <button
                id="filter-cat-all"
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-white text-slate-950 font-semibold shadow'
                    : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`}
              >
                <span>Show All</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'all' ? 'bg-slate-800 text-white' : 'bg-white/[0.08] text-slate-400'}`}>
                  {categoryCounts['all']}
                </span>
              </button>

              {Object.entries(CATEGORY_LABELS).map(([catKey, config]) => {
                const isSelected = selectedCategory === catKey;
                const count = categoryCounts[catKey] || 0;
                return (
                  <button
                    key={catKey}
                    id={`filter-cat-${catKey}`}
                    onClick={() => setSelectedCategory(isSelected ? 'all' : catKey)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium shrink-0 transition-all ${
                      isSelected
                        ? `${config.bg} ${config.border} ${config.color} border shadow-sm ring-1 ring-white/20`
                        : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{config.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/[0.08] text-slate-300">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Skills Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Skills:
              </span>

              <button
                id="filter-skill-all"
                onClick={() => setSelectedSkill('all')}
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium shrink-0 transition-all ${
                  selectedSkill === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-slate-300'
                }`}
              >
                <span>Any Skill</span>
              </button>

              {Object.entries(SKILL_LABELS).map(([skKey, config]) => {
                const isSelected = selectedSkill === skKey;
                const count = skillCounts[skKey] || 0;
                return (
                  <button
                    key={skKey}
                    id={`filter-skill-${skKey}`}
                    onClick={() => setSelectedSkill(isSelected ? 'all' : skKey)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium shrink-0 border transition-all ${
                      isSelected
                        ? `${config.color} ring-1 ring-cyan-500/40 shadow-sm`
                        : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span>{config.short}</span>
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main CSS Grid Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {filteredAndSortedItems.length > 0 ? (
          <div
            id="resume-css-grid"
            className="grid grid-cols-12 gap-5 sm:gap-6 items-start"
          >
            {filteredAndSortedItems.map((item) => (
              <ResumeCard
                key={item.id}
                item={item}
                isExpanded={!!expandedCardIds[item.id]}
                onToggleExpand={() => toggleCardExpand(item.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            id="empty-results-view"
            className="rounded-3xl border border-dashed border-white/[0.12] bg-[#11141a] p-12 text-center max-w-lg mx-auto mt-12"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-slate-400 mx-auto mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">No matching milestones</h3>
            <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
              No resume entries match the active filter criteria "{searchQuery || selectedCategory}".
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              <span>Clear all filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer Acknowledgement */}
      <footer className="mt-24 border-t border-white/[0.08] pt-8 text-center text-xs text-slate-500 mx-auto max-w-7xl px-4">
        <p>
          Redesigned from Clarke K. Kawakami’s original jQuery Isotope resume into a pure CSS Grid, responsive, dark-mode single page application.
        </p>
        <p className="mt-1 text-slate-600">
          Original Isotope layout by David DeSandro / Metafizzy. Preserving all personal anecdotes and career milestones.
        </p>
      </footer>
    </div>
  );
};

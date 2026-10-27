import React from 'react';
import { CaseFile, GhostGuide } from '../types/investigation';
import { AudioToggle } from './AudioToggle';
import { 
  Compass, 
  Archive, 
  Share2, 
  BookOpen, 
  Skull, 
  RotateCcw,
  ChevronDown,
  HeartHandshake,
  Sliders
} from 'lucide-react';
import { soundEngine } from '../services/soundService';

export type ActiveTab = 'locations' | 'evidence' | 'graph' | 'journal' | 'preservation';

interface HeaderNavProps {
  cases: CaseFile[];
  activeCaseId: string;
  onSelectCase: (caseId: string) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onReturnHome: () => void;
  onResetProgress: () => void;
  onOpenGuide: () => void;
  onOpenSettings: () => void;
  activeGhost: GhostGuide;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  cases,
  activeCaseId,
  onSelectCase,
  activeTab,
  onSelectTab,
  onReturnHome,
  onResetProgress,
  onOpenGuide,
  onOpenSettings,
  activeGhost,
}) => {
  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const totalClues = activeCase.clues.length;
  const discoveredClues = activeCase.clues.filter((c) => c.discovered).length;
  const progressPercent = Math.round((discoveredClues / Math.max(1, totalClues)) * 100);

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'locations', label: 'Explore Locations', icon: <Compass className="w-4 h-4" /> },
    { id: 'evidence', label: 'Evidence Locker', icon: <Archive className="w-4 h-4" /> },
    { id: 'graph', label: 'Clue Graph', icon: <Share2 className="w-4 h-4" /> },
    { id: 'journal', label: 'Journal & Deductions', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'preservation', label: 'Stories We Leave Behind', icon: <HeartHandshake className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090a0f]/95 border-b border-stone-800/80 backdrop-blur-md">
      {/* Top Bar: Title, Case Switcher, Stats, Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Logo / Home */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              onReturnHome();
            }}
            className="group flex items-center gap-2 text-left"
            title="Return to Welcome Screen"
          >
            <div className="w-8 h-8 rounded bg-red-950/40 border border-red-900/60 flex items-center justify-center group-hover:border-red-500 transition-colors">
              <Skull className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-stone-200 tracking-wider block leading-tight">
                THE DEAD WALK
              </span>
              <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase">
                Investigation Mode
              </span>
            </div>
          </button>

          {/* Active Case Selector */}
          <div className="relative ml-2 sm:ml-4">
            <select
              value={activeCaseId}
              onChange={(e) => {
                soundEngine.playPaperRustle();
                onSelectCase(e.target.value);
              }}
              className="bg-stone-900/90 text-stone-200 text-xs font-cinzel font-medium py-1.5 pl-3 pr-8 rounded border border-stone-750 hover:border-stone-500 focus:outline-none focus:border-red-600 appearance-none cursor-pointer tracking-wider"
            >
              {cases.map((c) => {
                const count = c.clues.filter((cl) => cl.discovered).length;
                return (
                  <option key={c.id} value={c.id} className="bg-stone-950 text-stone-200 py-1">
                    {c.title} ({c.yearOfIncident}) — {count}/{c.clues.length}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right side controls: AI Guide Quick Button, Settings, Audio, Reset */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Ghost Guide Button */}
          {activeGhost && (
            <button
              onClick={() => {
                soundEngine.playGhostWhisper();
                onOpenGuide();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-950/70 to-stone-900 text-red-200 rounded border border-red-800/80 text-xs font-cinzel tracking-wider hover:border-red-500 transition-all shadow-[0_0_10px_rgba(185,28,28,0.2)]"
              title="Speak with the Deceased Guide"
            >
              <span>{activeGhost.avatarIcon}</span>
              <span className="hidden sm:inline">Guide:</span> {activeGhost.name.split(' ')[0]}
            </button>
          )}

          {/* Horror & Accessibility Settings */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenSettings();
            }}
            className="p-1.5 rounded bg-stone-900 hover:bg-stone-850 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
            title="Horror & Accessibility Settings"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          <AudioToggle />

          <button
            onClick={() => {
              if (window.confirm('Reset all discovered clues and journal notes for this case?')) {
                onResetProgress();
              }
            }}
            className="p-1.5 text-stone-500 hover:text-stone-300 transition-colors rounded hover:bg-stone-800/50"
            title="Reset Case Progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Bar: Tabs & Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between border-t border-stone-800/60 text-xs">
        {/* Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1.5 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs tracking-wider transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-stone-800/90 text-stone-100 border border-stone-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-red-400' : 'text-stone-500'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Clue Progress Gauge */}
        <div className="hidden md:flex items-center gap-3 py-1.5">
          <div className="text-[11px] font-mono text-stone-400">
            Case Evidence: <span className="text-red-400 font-semibold">{discoveredClues}</span> / {totalClues} ({progressPercent}%)
          </div>
          <div className="w-24 h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
            <div
              className="h-full bg-gradient-to-r from-red-700 to-amber-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

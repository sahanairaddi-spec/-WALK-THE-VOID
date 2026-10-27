import React, { useState } from 'react';
import { CaseFile, ClueItem, EvidenceType } from '../types/investigation';
import { soundEngine } from '../services/soundService';
import { 
  Archive, 
  Search, 
  Filter, 
  Camera, 
  FileText, 
  Disc, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

interface EvidenceLockerViewProps {
  currentCase: CaseFile;
  onOpenClueViewer: (clue: ClueItem) => void;
  onConsultAI: (clueId: string) => void;
}

export const EvidenceLockerView: React.FC<EvidenceLockerViewProps> = ({
  currentCase,
  onOpenClueViewer,
  onConsultAI,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredClues = currentCase.clues.filter((clue) => {
    const matchesSearch =
      clue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clue.locationFound.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || clue.type === selectedType;
    return matchesSearch && matchesType;
  });

  const discoveredCount = currentCase.clues.filter((c) => c.discovered).length;

  const getTypeIcon = (type: EvidenceType) => {
    switch (type) {
      case 'photograph':
        return <Camera className="w-4 h-4 text-amber-400" />;
      case 'letter':
      case 'diary':
      case 'document':
      case 'newspaper':
        return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'relic':
        return <Disc className="w-4 h-4 text-rose-400" />;
      default:
        return <Eye className="w-4 h-4 text-stone-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-mono text-red-500 uppercase tracking-widest block">
            Archival Repository
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
            <span>Evidence Locker</span>
            <Archive className="w-5 h-5 text-stone-400" />
          </h2>
          <p className="text-xs font-typewriter text-stone-400 mt-1">
            Browse discovered photographs, letters, diaries, autopsy slips, and audio transcriptions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, person, keyword..."
              className="bg-stone-900 border border-stone-750 text-stone-200 text-xs font-mono py-1.5 pl-8 pr-3 rounded focus:outline-none focus:border-red-600 w-52 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded border border-stone-800 text-xs font-mono">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedType === 'all' ? 'bg-stone-800 text-white' : 'text-stone-400'
              }`}
            >
              All ({currentCase.clues.length})
            </button>
            <button
              onClick={() => setSelectedType('photograph')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedType === 'photograph' ? 'bg-stone-800 text-white' : 'text-stone-400'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setSelectedType('letter')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedType === 'letter' ? 'bg-stone-800 text-white' : 'text-stone-400'
              }`}
            >
              Letters
            </button>
            <button
              onClick={() => setSelectedType('relic')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedType === 'relic' ? 'bg-stone-800 text-white' : 'text-stone-400'
              }`}
            >
              Relics
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClues.map((clue) => {
          if (!clue.discovered) {
            return (
              <div
                key={clue.id}
                className="p-5 rounded-lg border border-dashed border-stone-850 bg-stone-950/40 flex flex-col items-center justify-center text-center py-10 opacity-60"
              >
                <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center mb-3 text-stone-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-cinzel text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Undiscovered Artifact
                </h4>
                <p className="font-typewriter text-[11px] text-stone-600 mt-1">
                  Location: {clue.locationFound}
                </p>
                <span className="mt-3 text-[10px] font-mono text-stone-600 px-2 py-0.5 rounded bg-stone-900/60 border border-stone-800">
                  Explore rooms to reveal
                </span>
              </div>
            );
          }

          return (
            <div
              key={clue.id}
              onClick={() => {
                soundEngine.playPaperRustle();
                onOpenClueViewer(clue);
              }}
              className="group p-5 bg-gradient-to-b from-stone-950 via-stone-900/90 to-stone-950 rounded-lg border border-stone-800 hover:border-red-900/80 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-2">
                  <span className="flex items-center gap-1.5 capitalize text-stone-400">
                    {getTypeIcon(clue.type)}
                    {clue.type.replace('_', ' ')}
                  </span>
                  <span>{clue.date}</span>
                </div>

                <h3 className="font-cinzel font-bold text-stone-100 group-hover:text-red-300 text-sm transition-colors mb-2">
                  {clue.title}
                </h3>

                <p className="font-typewriter text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {clue.fullContent ? clue.fullContent.slice(0, 140) + '...' : clue.description}
                </p>

                {/* Persons involved pills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {clue.peopleInvolved.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-stone-850 flex items-center justify-between text-xs font-mono text-stone-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-stone-600" />
                  <span className="truncate max-w-[130px]">{clue.locationFound}</span>
                </span>

                <div className="flex items-center gap-2">
                  {clue.uvSecretMessage && (
                    <span className="text-[10px] text-purple-400 px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                      UV Layer
                    </span>
                  )}
                  <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                    Inspect →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

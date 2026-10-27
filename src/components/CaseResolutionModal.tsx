import React from 'react';
import { CaseFile } from '../types/investigation';
import { soundEngine } from '../services/soundService';
import { Skull, CheckCircle2, ArrowRight, X } from 'lucide-react';

interface CaseResolutionModalProps {
  caseFile: CaseFile | null;
  onClose: () => void;
  onNextCase: () => void;
}

export const CaseResolutionModal: React.FC<CaseResolutionModalProps> = ({
  caseFile,
  onClose,
  onNextCase,
}) => {
  if (!caseFile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-stone-950 via-stone-900 to-black border-2 border-amber-900/60 rounded-xl p-6 sm:p-8 shadow-[0_0_80px_rgba(185,28,28,0.4)] text-center flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded text-stone-500 hover:text-stone-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heraldic Emblem */}
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-700/80 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(185,28,28,0.6)] animate-pulse">
          <Skull className="w-8 h-8 text-red-400" />
        </div>

        <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-400 block mb-1">
          Historical Truth Unsealed
        </span>

        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-stone-100 uppercase tracking-wider mb-2">
          {caseFile.title}
        </h2>

        <div className="font-mono text-xs text-stone-400 mb-6">
          Deceased: <span className="text-stone-200">{caseFile.deceasedName}</span> ({caseFile.lifespan})
        </div>

        {/* Narrative Box */}
        <div className="w-full text-left bg-black/60 p-5 sm:p-6 rounded border border-stone-800 space-y-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-stone-800 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Authoritative Case Conclusion</span>
          </div>

          <p className="font-typewriter text-xs sm:text-sm text-stone-300 leading-relaxed italic">
            &ldquo;{caseFile.resolutionStory}&rdquo;
          </p>
        </div>

        <p className="font-cinzel text-xs text-stone-400 max-w-md mb-6 leading-relaxed">
          &ldquo;The dead may be gone. Their stories are not.&rdquo; <br />
          Your discoveries have been permanently recorded in the central memory archive.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 font-mono text-xs tracking-wider transition-colors"
          >
            Review Evidence
          </button>
          <button
            onClick={() => {
              soundEngine.playPaperRustle();
              onNextCase();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 text-stone-100 border border-red-700 font-cinzel text-xs tracking-[0.15em] uppercase font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>Investigate Next Case</span>
            <ArrowRight className="w-4 h-4 text-red-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

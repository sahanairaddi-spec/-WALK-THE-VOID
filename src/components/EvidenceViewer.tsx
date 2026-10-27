import React, { useState } from 'react';
import { ClueItem, EvidenceAnnotation } from '../types/investigation';
import { CLUE_ANNOTATIONS } from '../data/clueAnnotations';
import { askAIGuide } from '../services/aiService';
import { soundEngine } from '../services/soundService';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  Maximize2, 
  Minimize2,
  Columns, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Calendar, 
  MapPin, 
  Camera, 
  HelpCircle,
  Link2
} from 'lucide-react';

interface EvidenceViewerProps {
  clue: ClueItem | null;
  allDiscoveredClues: ClueItem[];
  onClose: () => void;
  onConsultAI: (clueId: string) => void;
  onSelectClue: (clue: ClueItem) => void;
}

export const EvidenceViewer: React.FC<EvidenceViewerProps> = ({
  clue,
  allDiscoveredClues,
  onClose,
  onConsultAI,
  onSelectClue,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isUVMode, setIsUVMode] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'normal' | 'invert' | 'sepia' | 'contrast'>('normal');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<EvidenceAnnotation | null>(null);

  // Side-by-side Comparison state
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [comparisonClueId, setComparisonClueId] = useState<string>('');
  const [comparisonAnalysis, setComparisonAnalysis] = useState<string | null>(null);
  const [isComparingAI, setIsComparingAI] = useState<boolean>(false);

  if (!clue) return null;

  const annotations = CLUE_ANNOTATIONS[clue.id] || [];
  const otherClues = allDiscoveredClues.filter((c) => c.id !== clue.id);
  const comparisonClue = allDiscoveredClues.find((c) => c.id === comparisonClueId);

  const handleToggleUV = () => {
    const nextUV = !isUVMode;
    setIsUVMode(nextUV);
    soundEngine.playUVToggle(nextUV);
  };

  const handleZoomIn = () => {
    soundEngine.playClick();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    soundEngine.playClick();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = () => {
    soundEngine.playClick();
    setZoomLevel(1);
  };

  const handleRunAIComparison = async () => {
    if (!comparisonClue) return;
    setIsComparingAI(true);
    soundEngine.playGhostWhisper();
    try {
      const res = await askAIGuide({
        action: 'compare_evidence',
        clueIds: [clue.id, comparisonClue.id],
        caseId: clue.caseId,
        discoveredClues: allDiscoveredClues,
      });
      setComparisonAnalysis(res.text);
    } catch {
      setComparisonAnalysis('The comparison between these two artifacts reveals strong temporal overlap, but further physical verification is needed.');
    } finally {
      setIsComparingAI(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md overflow-y-auto ${
      isFullScreen ? 'p-0' : ''
    }`}>
      <div className={`relative w-full ${
        isFullScreen ? 'h-full max-w-none rounded-none' : 'max-w-6xl max-h-[94vh] rounded-xl'
      } bg-[#0c0d14] border border-stone-800 shadow-[0_20px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col`}>
        
        {/* Top Control Bar */}
        <div className="px-5 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-300 uppercase tracking-widest">
              Dossier #{clue.id}
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-stone-200">
              {clue.title}
            </span>
            {clue.verified && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Verified Evidence
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Compare Mode Toggle */}
            <button
              onClick={() => {
                soundEngine.playPaperRustle();
                setIsCompareMode(!isCompareMode);
                setComparisonAnalysis(null);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-colors ${
                isCompareMode
                  ? 'bg-amber-950 border-amber-600 text-amber-200'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isCompareMode ? 'Exit Compare' : 'Compare Clues'}</span>
            </button>

            {/* Consult Gemma */}
            <button
              onClick={() => onConsultAI(clue.id)}
              className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-950 to-stone-900 border border-red-800 text-red-200 rounded text-xs font-mono hover:border-red-500 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>Ask Gemma 4</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
              title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-1.5 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Left Visual Canvas, Right Dossier */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Main Inspection Canvas (7 columns or 6 in compare mode) */}
          <div className={`${isCompareMode ? 'lg:col-span-6' : 'lg:col-span-7'} p-5 bg-[#06070a] border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col justify-between relative overflow-hidden`}>
            
            {/* Visual Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 z-20">
              <div className="flex items-center bg-stone-900/90 rounded border border-stone-800 p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[10px] text-stone-400 px-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 text-stone-400 hover:text-stone-100 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 text-stone-400 hover:text-stone-100 transition-colors ml-1 border-l border-stone-800"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Forensic Filter & UV Light Toggles */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToggleUV}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-mono tracking-wider transition-all duration-300 ${
                    isUVMode
                      ? 'bg-purple-950 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-purple-300'
                  }`}
                  title="Ultraviolet Blacklight Inspection"
                >
                  <Lightbulb className={`w-3.5 h-3.5 ${isUVMode ? 'text-purple-300 animate-pulse' : ''}`} />
                  <span>UV Layer</span>
                </button>

                <div className="flex items-center bg-stone-900 rounded border border-stone-800 p-0.5">
                  <button
                    onClick={() => setFilterMode('normal')}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${filterMode === 'normal' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                  >
                    Norm
                  </button>
                  <button
                    onClick={() => setFilterMode('invert')}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${filterMode === 'invert' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                  >
                    Invert
                  </button>
                  <button
                    onClick={() => setFilterMode('contrast')}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${filterMode === 'contrast' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                  >
                    Contrast
                  </button>
                </div>
              </div>
            </div>

            {/* Artifact Visual Presentation Area */}
            <div className="relative flex-1 min-h-[320px] flex items-center justify-center p-4 overflow-hidden rounded border border-stone-850 bg-stone-950/70 select-none">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.2s ease-out',
                }}
                className={`relative max-w-full transition-all duration-300 ${
                  isUVMode
                    ? 'uv-mode'
                    : filterMode === 'invert'
                    ? 'invert hue-rotate-180 contrast-125'
                    : filterMode === 'contrast'
                    ? 'contrast-200 grayscale'
                    : ''
                }`}
              >
                {clue.type === 'photograph' ? (
                  <div className="relative p-3 bg-stone-100 rounded shadow-2xl vintage-photo max-w-sm sm:max-w-md mx-auto">
                    <div className="aspect-[4/3] bg-gradient-to-b from-stone-800 via-stone-900 to-black rounded overflow-hidden flex flex-col items-center justify-center p-6 text-center border border-stone-700/60 relative">
                      <Camera className="w-12 h-12 text-stone-600 mb-3" />
                      <span className="font-cinzel text-xs text-stone-300 tracking-wider">
                        {clue.title}
                      </span>
                      <span className="font-mono text-[10px] text-stone-500 mt-1">
                        Archival Photographic Plate • {clue.date}
                      </span>

                      {/* Interactive On-Image Hotspots */}
                      {annotations.map((anno) => (
                        <div
                          key={anno.id}
                          style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEngine.playClick();
                            setSelectedAnnotation(anno);
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                        >
                          <span className="absolute -inset-1.5 rounded-full bg-red-600/40 animate-ping" />
                          <button
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform hover:scale-125 ${
                              selectedAnnotation?.id === anno.id
                                ? 'bg-red-600 border-white text-white'
                                : 'bg-red-950/90 border-red-400 text-red-200'
                            }`}
                          >
                            <span className="text-[10px] font-bold">🔍</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-center font-typewriter text-[10px] text-stone-600">
                      Blackwood County Historical Registry
                    </div>
                  </div>
                ) : (
                  <div className="vintage-paper p-6 sm:p-7 rounded max-w-sm sm:max-w-md mx-auto shadow-2xl border border-amber-900/40 relative">
                    <div className="font-mono text-[10px] text-stone-700 uppercase tracking-widest border-b border-stone-600/30 pb-2 mb-3 flex items-center justify-between">
                      <span>{clue.date}</span>
                      <span>REF: #{clue.id.slice(-6)}</span>
                    </div>

                    <h4 className="font-cinzel font-bold text-stone-900 text-sm mb-3">
                      {clue.title}
                    </h4>

                    {clue.fullContent ? (
                      <div className="font-typewriter text-xs text-stone-800 leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto pr-2">
                        {clue.fullContent}
                      </div>
                    ) : (
                      <p className="font-typewriter text-xs text-stone-800 leading-relaxed">
                        {clue.description}
                      </p>
                    )}

                    {/* Interactive On-Document Hotspots */}
                    {annotations.map((anno) => (
                      <div
                        key={anno.id}
                        style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.playClick();
                          setSelectedAnnotation(anno);
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                      >
                        <span className="absolute -inset-1.5 rounded-full bg-amber-600/40 animate-ping" />
                        <button
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform hover:scale-125 ${
                            selectedAnnotation?.id === anno.id
                              ? 'bg-amber-600 border-white text-white'
                              : 'bg-amber-950/90 border-amber-400 text-amber-200'
                          }`}
                        >
                          <span className="text-[10px] font-bold">✍️</span>
                        </button>
                      </div>
                    ))}

                    <div className="mt-4 pt-2 border-t border-stone-600/30 text-[9px] font-mono text-stone-600 flex justify-between">
                      <span>{clue.locationFound}</span>
                      <span>AUTHENTICATED</span>
                    </div>
                  </div>
                )}

                {/* Secret UV Layer Reveal Overlay */}
                {isUVMode && clue.uvSecretMessage && (
                  <div className="absolute inset-0 z-30 bg-purple-950/85 backdrop-blur-[1px] p-5 rounded border-2 border-purple-400 flex flex-col justify-center items-center text-center animate-pulse">
                    <span className="font-mono text-[10px] text-purple-300 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Invisible UV Layer Revealed
                    </span>
                    <h5 className="font-cinzel font-bold text-purple-100 text-sm mb-2">
                      {clue.uvSecretTitle || 'Secret Postscript'}
                    </h5>
                    <p className="font-typewriter text-xs text-purple-200 leading-relaxed max-w-sm">
                      &ldquo;{clue.uvSecretMessage}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Hotspot Detail Card */}
            {selectedAnnotation && (
              <div className="mt-3 p-3.5 bg-stone-950/90 rounded border border-red-900/60 shadow-lg flex flex-col gap-1.5 animate-flicker">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-red-400 font-bold uppercase">{selectedAnnotation.title}</span>
                  <span className={`px-2 py-0.2 rounded text-[10px] uppercase ${
                    selectedAnnotation.forensicCategory === 'contradiction'
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : selectedAnnotation.forensicCategory === 'ghost_testimony'
                      ? 'bg-purple-950 text-purple-300 border border-purple-800'
                      : 'bg-stone-900 text-emerald-400 border border-emerald-800'
                  }`}>
                    {selectedAnnotation.forensicCategory.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs font-mono text-stone-300">
                  {selectedAnnotation.observedDetail}
                </p>
                {selectedAnnotation.ghostInterpretation && (
                  <p className="text-xs font-typewriter text-red-300/90 italic bg-black/40 p-2 rounded border border-stone-850">
                    {selectedAnnotation.ghostInterpretation}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Comparative Inspection or Detailed Dossier */}
          <div className={`${isCompareMode ? 'lg:col-span-6' : 'lg:col-span-5'} p-5 bg-stone-950 overflow-y-auto flex flex-col gap-5`}>
            
            {/* Comparison Mode Panel */}
            {isCompareMode ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-850">
                  <h4 className="font-cinzel text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Columns className="w-4 h-4" />
                    <span>Evidence Comparison Station</span>
                  </h4>
                  <span className="text-[10px] font-mono text-stone-500">Dual Analysis</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1.5">
                    Select a Second Artifact to Compare:
                  </label>
                  <select
                    value={comparisonClueId}
                    onChange={(e) => {
                      soundEngine.playClick();
                      setComparisonClueId(e.target.value);
                      setComparisonAnalysis(null);
                    }}
                    className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-xs font-cinzel text-stone-200 focus:outline-none focus:border-amber-600"
                  >
                    <option value="">-- Choose an unlocked evidence item --</option>
                    {otherClues.map((c) => (
                      <option key={c.id} value={c.id}>
                        [{c.date}] {c.title} ({c.type})
                      </option>
                    ))}
                  </select>
                </div>

                {comparisonClue && (
                  <div className="p-3.5 bg-stone-900/60 rounded border border-stone-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                      <span>{comparisonClue.date}</span>
                      <span className="capitalize">{comparisonClue.type}</span>
                    </div>
                    <h5 className="font-cinzel font-bold text-stone-200">
                      {comparisonClue.title}
                    </h5>
                    <p className="font-typewriter text-stone-400 text-[11px] line-clamp-3">
                      {comparisonClue.description}
                    </p>

                    <button
                      onClick={handleRunAIComparison}
                      disabled={isComparingAI}
                      className="w-full mt-2 py-2 bg-gradient-to-r from-amber-950 to-stone-900 hover:from-amber-900 hover:to-stone-850 text-amber-200 font-mono text-xs rounded border border-amber-800 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isComparingAI ? 'Synthesizing with Gemma 4...' : 'Analyze Correlation with Gemma 4'}</span>
                    </button>
                  </div>
                )}

                {comparisonAnalysis && (
                  <div className="p-4 bg-stone-900/90 rounded border border-amber-800/80 text-xs font-typewriter text-stone-300 leading-relaxed space-y-2 shadow-lg">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block font-bold">
                      Gemma 4 Forensic Synthesis:
                    </span>
                    <div className="whitespace-pre-line">
                      {comparisonAnalysis}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Standard Dossier Details */
              <>
                <div>
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block mb-1">
                    Archival Dossier
                  </span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-100">
                    {clue.title}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-stone-400 bg-stone-900/60 p-3 rounded border border-stone-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>{clue.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span className="truncate">{clue.locationFound}</span>
                  </div>
                </div>

                {/* People Involved */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-red-400" />
                    Persons of Interest
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {clue.peopleInvolved.map((person, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Forensic Artifact Analysis */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                    Observed Artifact Data
                  </h4>
                  <p className="font-typewriter text-xs text-stone-300 leading-relaxed bg-stone-900/30 p-3 rounded border border-stone-850">
                    {clue.description}
                  </p>
                </div>

                {/* Verified Facts */}
                {clue.knownFacts.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Physical Facts
                    </h4>
                    <ul className="space-y-1 text-xs font-typewriter text-stone-300">
                      {clue.knownFacts.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Unresolved Questions */}
                {clue.unresolvedQuestions.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" />
                      Unresolved Forensic Mysteries
                    </h4>
                    <ul className="space-y-1 text-xs font-typewriter text-stone-400">
                      {clue.unresolvedQuestions.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">?</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

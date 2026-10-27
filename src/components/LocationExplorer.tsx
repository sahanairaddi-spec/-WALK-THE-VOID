import React, { useState } from 'react';
import { CaseFile, RoomLocation, LocationHotspot, ClueItem, GhostGuide } from '../types/investigation';
import { GHOST_GUIDES } from '../data/ghostGuides';
import { soundEngine } from '../services/soundService';
import { 
  Lock, 
  Unlock, 
  Eye, 
  FileText, 
  Camera, 
  Key, 
  Disc, 
  DoorClosed, 
  Sparkles,
  Info,
  User,
  Zap,
  Flame
} from 'lucide-react';

interface LocationExplorerProps {
  currentCase: CaseFile;
  onDiscoverClue: (clueId: string) => void;
  onOpenClueViewer: (clue: ClueItem) => void;
  onConsultAI: (clueId: string) => void;
  onOpenGhostGuide: (ghost: GhostGuide, roomName: string) => void;
  reducedMotion: boolean;
}

export const LocationExplorer: React.FC<LocationExplorerProps> = ({
  currentCase,
  onDiscoverClue,
  onOpenClueViewer,
  onConsultAI,
  onOpenGhostGuide,
  reducedMotion,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(currentCase.locations[0]?.id || '');
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const activeRoom = currentCase.locations.find((l) => l.id === selectedRoomId) || currentCase.locations[0];
  const activeGhost = GHOST_GUIDES[currentCase.id] || currentCase.ghostGuide;

  const handleHotspotClick = (spot: LocationHotspot) => {
    soundEngine.playClick();

    // Check if locked
    if (spot.locked) {
      const hasKey = currentCase.clues.some(
        (c) => c.id === spot.requiredClueOrKeyId && c.discovered
      );

      if (!hasKey) {
        soundEngine.playClick();
        setActiveMessage(`LOCKED: ${spot.lockedHint || 'You require a specific relic or key to open this.'}`);
        return;
      } else {
        spot.locked = false;
        soundEngine.playClueDiscovered();
        setActiveMessage(`UNLOCKED: The iron mechanism unseals with a heavy groan.`);
      }
    }

    if (spot.clueId) {
      const clue = currentCase.clues.find((c) => c.id === spot.clueId);
      if (clue) {
        if (!clue.discovered) {
          soundEngine.playClueDiscovered();
          onDiscoverClue(clue.id);
          setActiveMessage(`DISCOVERED: ${clue.title}`);
        } else {
          soundEngine.playPaperRustle();
        }
        onOpenClueViewer(clue);
      }
    } else {
      setActiveMessage(spot.description);
    }
  };

  const getHotspotIcon = (type: LocationHotspot['iconType'], locked?: boolean) => {
    if (locked) return <Lock className="w-3.5 h-3.5 text-red-400" />;
    switch (type) {
      case 'photo':
        return <Camera className="w-3.5 h-3.5 text-amber-300" />;
      case 'document':
        return <FileText className="w-3.5 h-3.5 text-cyan-300" />;
      case 'key':
        return <Key className="w-3.5 h-3.5 text-yellow-300" />;
      case 'relic':
        return <Disc className="w-3.5 h-3.5 text-rose-300" />;
      case 'door':
        return <DoorClosed className="w-3.5 h-3.5 text-stone-300" />;
      default:
        return <Eye className="w-3.5 h-3.5 text-red-400" />;
    }
  };

  // Environmental reactions active in this room based on discovered clues
  const activeReactions = (activeRoom.environmentalReactions || []).filter((react) =>
    currentCase.clues.some((c) => c.id === react.triggerClueId && c.discovered)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Location Breadcrumb & Room Switcher Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-mono text-red-500 uppercase tracking-widest block">
            {currentCase.title} • {currentCase.primaryLocation}
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-3">
            <span>{activeRoom.name}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400 font-normal">
              {activeRoom.era}
            </span>
          </h2>
          <p className="text-xs font-typewriter text-stone-400 mt-1">
            {activeRoom.subtitle}
          </p>
        </div>

        {/* Room Navigation Buttons & Ghost Guide Trigger */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Direct Ghost Presence Button in this Room */}
          {activeGhost && (
            <button
              onClick={() => {
                soundEngine.playGhostWhisper();
                onOpenGhostGuide(activeGhost, activeRoom.name);
              }}
              className="px-3.5 py-2 rounded text-xs font-cinzel font-bold tracking-wider bg-red-950/70 border border-red-700 hover:border-red-500 text-stone-100 flex items-center gap-2 shadow-[0_0_15px_rgba(185,28,28,0.3)] transition-all animate-pulse"
              title={`Speak with the Ghost of ${activeGhost.name}`}
            >
              <span>{activeGhost.avatarIcon}</span>
              <span>Speak with {activeGhost.name}</span>
            </button>
          )}

          {currentCase.locations.map((loc) => {
            const isSelected = loc.id === activeRoom.id;
            const roomClueIds = loc.hotspots.map((h) => h.clueId).filter(Boolean);
            const foundCount = currentCase.clues.filter(
              (c) => roomClueIds.includes(c.id) && c.discovered
            ).length;

            return (
              <button
                key={loc.id}
                onClick={() => {
                  soundEngine.playPaperRustle();
                  setSelectedRoomId(loc.id);
                  setActiveMessage(null);
                }}
                className={`px-3 py-2 rounded text-xs font-mono tracking-wider transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-stone-800 text-stone-100 border-red-700/80 shadow-[0_0_15px_rgba(185,28,28,0.25)]'
                    : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:border-stone-600 hover:text-stone-200'
                }`}
              >
                <span>{loc.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/60 text-stone-400">
                  {foundCount}/{roomClueIds.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Exploration Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[580px] rounded-lg overflow-hidden border border-stone-800 bg-stone-950 shadow-[0_15px_50px_rgba(0,0,0,0.9)] select-none">
        {/* Background Visual Texture & Lighting */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${activeRoom.backgroundTheme} opacity-95 transition-all duration-700`}
        />

        {/* Environmental Reaction Visual Overlay (e.g. Mirror distortion or electrical flicker) */}
        {activeReactions.length > 0 && !reducedMotion && (
          <div className="absolute inset-0 bg-red-950/15 mix-blend-color-dodge pointer-events-none animate-pulse" />
        )}

        {/* Atmospheric grid & vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* Room Graphic & Description */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <div className="max-w-xl text-center space-y-4 opacity-40">
            <div className="w-16 h-16 mx-auto rounded-full border border-stone-700/60 flex items-center justify-center">
              <Eye className="w-6 h-6 text-stone-500 animate-pulse" />
            </div>
            <p className="font-typewriter text-xs sm:text-sm text-stone-300 leading-relaxed italic">
              &ldquo;{activeRoom.atmosphereDescription}&rdquo;
            </p>
          </div>
        </div>

        {/* Active Environmental Reaction Indicator */}
        {activeReactions.map((react) => (
          <div
            key={react.id}
            className="absolute top-4 left-4 z-30 max-w-sm p-3 rounded bg-black/80 border border-red-900/60 text-xs font-typewriter text-red-300 backdrop-blur-md flex items-start gap-2 shadow-lg"
          >
            <Zap className="w-4 h-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-red-200 block text-[11px] font-mono uppercase">
                Environmental Shift: {react.roomElement}
              </span>
              <span>{react.description}</span>
            </div>
          </div>
        ))}

        {/* Interactive Hotspots Layer */}
        {activeRoom.hotspots.map((spot) => {
          const clue = currentCase.clues.find((c) => c.id === spot.clueId);
          const isDiscovered = clue?.discovered;

          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-30"
            >
              {/* Outer pulsing ring */}
              <span className={`absolute -inset-2 rounded-full opacity-60 pointer-events-none ${
                reducedMotion ? '' : 'animate-ping'
              } ${
                spot.locked
                  ? 'bg-red-900/40'
                  : isDiscovered
                  ? 'bg-amber-900/20'
                  : 'bg-red-600/40'
              }`} />

              {/* Hotspot Target Button */}
              <button
                onClick={() => handleHotspotClick(spot)}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] ${
                  spot.locked
                    ? 'bg-stone-900/90 border-red-800 hover:border-red-500 hover:scale-110'
                    : isDiscovered
                    ? 'bg-stone-900/90 border-stone-600 hover:border-amber-400 hover:scale-110'
                    : 'bg-red-950/90 border-red-500 hover:border-red-400 hover:scale-125 shadow-[0_0_20px_rgba(185,28,28,0.5)]'
                }`}
                title={spot.title}
              >
                {getHotspotIcon(spot.iconType, spot.locked)}
              </button>

              {/* Tooltip on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-stone-950/95 border border-stone-700 rounded shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 text-center">
                <div className="text-[10px] font-mono uppercase text-red-400 tracking-wider flex items-center justify-center gap-1">
                  {spot.locked ? (
                    <>
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </>
                  ) : isDiscovered ? (
                    'Inspected Artifact'
                  ) : (
                    'Examine Hotspot'
                  )}
                </div>
                <div className="font-cinzel text-xs font-bold text-stone-100 mt-0.5">
                  {spot.title}
                </div>
                <div className="text-[10px] text-stone-400 mt-1 line-clamp-2">
                  {spot.description}
                </div>
              </div>
            </div>
          );
        })}

        {/* Ambient Room Footer HUD */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-400">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span>Click any glowing marker to inspect documents, photograph plates, and locked containers.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Points of Interest: {activeRoom.hotspots.length}</span>
          </div>
        </div>
      </div>

      {/* Notification / Feedback Banner */}
      {activeMessage && (
        <div className="p-3.5 rounded bg-red-950/30 border border-red-900/60 text-stone-200 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>{activeMessage}</span>
          </div>
          <button
            onClick={() => setActiveMessage(null)}
            className="text-stone-500 hover:text-stone-300 text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Discovered Clues Shelf */}
      <div className="bg-stone-950/80 border border-stone-800 rounded-lg p-4">
        <h3 className="font-cinzel text-sm font-semibold text-stone-300 mb-3 flex items-center gap-2">
          <span>Evidence Discovered in This Location</span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-900 rounded border border-stone-800 text-stone-400">
            {currentCase.clues.filter((c) => c.discovered).length} total in case
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentCase.clues
            .filter((c) => c.discovered)
            .map((clue) => (
              <div
                key={clue.id}
                onClick={() => {
                  soundEngine.playPaperRustle();
                  onOpenClueViewer(clue);
                }}
                className="p-3 bg-stone-900/70 border border-stone-800 hover:border-red-900/70 rounded cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-1">
                    <span className="capitalize">{clue.type}</span>
                    <span>{clue.date}</span>
                  </div>
                  <h4 className="font-cinzel font-semibold text-stone-200 text-xs line-clamp-1">
                    {clue.title}
                  </h4>
                  <p className="font-typewriter text-[11px] text-stone-400 mt-1 line-clamp-2">
                    {clue.shortSnippet}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-red-400">
                  <span>Inspect Details</span>
                  {clue.uvSecretMessage && (
                    <span className="px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                      UV Layer
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

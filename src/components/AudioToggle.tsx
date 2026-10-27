import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../services/soundService';

export const AudioToggle: React.FC = () => {
  const [muted, setMuted] = useState(soundEngine.getIsMuted());

  const handleToggle = () => {
    const isNowMuted = soundEngine.toggleMute();
    setMuted(isNowMuted);
    soundEngine.playClick();
  };

  return (
    <button
      onClick={handleToggle}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded border text-xs tracking-wider transition-all duration-300 ${
        muted
          ? 'bg-zinc-950/80 border-zinc-800 text-zinc-500 hover:text-zinc-300'
          : 'bg-red-950/30 border-red-900/60 text-red-300 shadow-[0_0_12px_rgba(185,28,28,0.2)]'
      }`}
      title={muted ? 'Unmute Horror Ambience' : 'Mute Horror Ambience'}
    >
      {muted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
          <span className="font-mono uppercase text-[11px]">Audio Muted</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="font-mono uppercase text-[11px] text-red-200">Atmosphere On</span>
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-red-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-red-500 animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-red-400 animate-pulse delay-150" />
          </span>
        </>
      )}
    </button>
  );
};

import React from 'react';
import { HorrorAccessibilitySettings } from '../types/investigation';
import { soundEngine } from '../services/soundService';
import { X, Sliders, Volume2, VolumeX, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: HorrorAccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<HorrorAccessibilitySettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e0f16] border border-stone-800 rounded-xl shadow-2xl p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2 text-stone-200">
            <Sliders className="w-4 h-4 text-red-500" />
            <h3 className="font-cinzel font-bold text-sm tracking-wider uppercase">
              Atmosphere & Accessibility Settings
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1 rounded text-stone-500 hover:text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings List */}
        <div className="space-y-4 text-xs font-mono text-stone-300">
          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded bg-stone-950/80 border border-stone-850">
            <div>
              <span className="font-bold text-stone-200 block mb-0.5">Reduced Motion</span>
              <span className="text-[11px] text-stone-500 font-sans block">
                Disables screen vibrations, fast camera drifts, and intense pulse effects.
              </span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onUpdateSettings({ reducedMotion: !settings.reducedMotion });
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.reducedMotion ? 'bg-red-800' : 'bg-stone-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-stone-100 transition-transform ${
                  settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Limit Flickering Lights */}
          <div className="flex items-center justify-between p-3 rounded bg-stone-950/80 border border-stone-850">
            <div>
              <span className="font-bold text-stone-200 block mb-0.5">Limit Flickering & Screen Glitches</span>
              <span className="text-[11px] text-stone-500 font-sans block">
                Replaces rapid light flickers with gentle dimmed transitions.
              </span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onUpdateSettings({ limitFlicker: !settings.limitFlicker });
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.limitFlicker ? 'bg-red-800' : 'bg-stone-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-stone-100 transition-transform ${
                  settings.limitFlicker ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Apparitions & Surprises Cooldown */}
          <div className="flex items-center justify-between p-3 rounded bg-stone-950/80 border border-stone-850">
            <div>
              <span className="font-bold text-stone-200 block mb-0.5">Environmental Apparitions</span>
              <span className="text-[11px] text-stone-500 font-sans block">
                Allows subtle hallway silhouettes and mirror distortions tied to investigation clues.
              </span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onUpdateSettings({ allowSurprises: !settings.allowSurprises });
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.allowSurprises ? 'bg-red-800' : 'bg-stone-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-stone-100 transition-transform ${
                  settings.allowSurprises ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Control */}
          <div className="p-3 rounded bg-stone-950/80 border border-stone-850 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                {settings.audioMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-500" /> : <Volume2 className="w-3.5 h-3.5 text-red-400" />}
                Atmosphere & Audio Volume
              </span>
              <span className="text-stone-400">{Math.round(settings.ambientVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.ambientVolume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                soundEngine.setVolume(vol);
                onUpdateSettings({ ambientVolume: vol, audioMuted: vol === 0 });
              }}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Ethical / Preservation Statement */}
        <div className="p-3 rounded bg-stone-950 border border-stone-850 text-[11px] font-typewriter text-stone-400 flex items-start gap-2.5">
          <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Ethical Horror & Preservation:</strong> The supernatural investigations in this experience are fictional allegories. AI does not contact the deceased. Real human lives, letters, and family photographs are irreplaceable records that deserve historical preservation and empathy.
          </span>
        </div>

        {/* Done Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded font-mono text-xs border border-stone-750 transition-colors"
        >
          Close & Save Preferences
        </button>
      </div>
    </div>
  );
};

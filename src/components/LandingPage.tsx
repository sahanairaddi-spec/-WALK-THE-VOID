import React, { useState, useEffect } from 'react';
import { soundEngine } from '../services/soundService';
import { AudioToggle } from './AudioToggle';
import { 
  Compass, 
  Skull, 
  Eye, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Sliders, 
  FastForward, 
  Volume2,
  HeartHandshake
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onSelectCase: (caseId: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenPreservation: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnter,
  onSelectCase,
  reducedMotion,
  onToggleReducedMotion,
  onOpenPreservation,
}) => {
  // Cinematic Arrival Stages: 0: Near Black, 1: Whisper & Silhouette, 2: "Someone is waiting", 3: Reveal Main Portal
  const [arrivalStage, setArrivalStage] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion) {
      setArrivalStage(3);
      return;
    }

    // Stage 0 -> 1: After 1.2s, reveal faint title and silhouette
    const timer1 = setTimeout(() => {
      setArrivalStage(1);
    }, 1200);

    // Stage 1 -> 2: After 3.5s, display "Someone has been waiting for you"
    const timer2 = setTimeout(() => {
      setArrivalStage(2);
    }, 3800);

    // Stage 2 -> 3: After 6.5s, dissolve silhouette and reveal full interactive portal
    const timer3 = setTimeout(() => {
      setArrivalStage(3);
    }, 6600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [reducedMotion]);

  const handleSkipIntro = () => {
    soundEngine.playClick();
    setArrivalStage(3);
  };

  const handleEnterWorld = () => {
    soundEngine.playGhostWhisper();
    soundEngine.startAmbientSoundscape();
    onEnter();
  };

  const casesPreview = [
    {
      id: 'case_blackwood',
      title: 'The Vanishing of Eleanor Blackwood',
      year: '1954',
      location: 'Blackwood Manor',
      teaser: 'A locked bedchamber, an unsent letter, and a pocket watch broken at 3:17 AM in a flooded cellar.',
      color: 'border-amber-900/40 hover:border-amber-600/70',
      tag: 'Family Tragedy',
    },
    {
      id: 'case_saint_jude',
      title: 'Ward 9 & The Electric Silence',
      year: '1962',
      location: 'Saint Jude Sanatorium',
      teaser: 'Charred medical files, patient #404, and an electrotherapy resonance coil tuned to the voices of the dead.',
      color: 'border-cyan-950 hover:border-cyan-700/70',
      tag: 'Psychiatric Horror',
    },
    {
      id: 'case_oakhaven',
      title: 'The Silent Bell of Class 3-B',
      year: '1978',
      location: 'Oakhaven Academy',
      teaser: 'A slashed yearbook, an unbolted bell clapper, and a teacher who found a forbidden phonograph cylinder.',
      color: 'border-orange-950 hover:border-orange-700/70',
      tag: 'Unsolved Disappearance',
    },
    {
      id: 'case_ravens_crossing',
      title: 'The Midnight Train to Nowhere',
      year: '1939',
      location: 'Raven\'s Crossing Terminus',
      teaser: 'Eighty passengers entered the mountain fog on Platform 4. Only an opera singer’s trunk and a dynamited tunnel remain.',
      color: 'border-stone-800 hover:border-stone-500/70',
      tag: 'Historical Conspiracy',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050508] text-stone-200 flex flex-col justify-between overflow-hidden selection:bg-red-900 selection:text-white">
      {/* Background Gradients & Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity filter blur-[1px] transform scale-105"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, rgba(25, 20, 24, 0.4) 0%, rgba(5, 5, 8, 0.98) 85%), 
          repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)`,
        }}
      />

      {/* Cinematic Arrival Stage 1 & 2: Silhouette & Waiting Message */}
      {arrivalStage < 3 && (
        <div className="fixed inset-0 z-50 bg-[#040406] flex flex-col items-center justify-center p-6 text-center select-none">
          {/* Skip Button Top Right */}
          <button
            onClick={handleSkipIntro}
            className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-stone-100 text-xs font-mono tracking-wider transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip Arrival</span>
          </button>

          {/* Faint Spectral Silhouette apparition */}
          {arrivalStage >= 1 && (
            <div className={`relative mb-8 transition-opacity duration-1000 ${arrivalStage === 1 ? 'opacity-40 animate-pulse' : 'opacity-70'}`}>
              <div className="w-36 h-48 mx-auto rounded-full bg-gradient-to-t from-red-950/60 via-stone-800/40 to-transparent blur-md transform scale-y-125" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skull className="w-16 h-16 text-stone-500/50 filter blur-[0.5px]" />
              </div>
            </div>
          )}

          {/* Gradual Text Reveal */}
          <div className="space-y-4 max-w-xl">
            {arrivalStage >= 1 && (
              <h1 className="font-cinzel text-xl sm:text-2xl tracking-[0.25em] text-stone-300 uppercase transition-all duration-1000">
                The Dead Walk You Through Their World
              </h1>
            )}

            {arrivalStage >= 2 && (
              <p className="font-typewriter text-sm sm:text-base text-red-400 tracking-widest italic transition-opacity duration-1000">
                &ldquo;Someone has been waiting for you in the shadows.&rdquo;
              </p>
            )}
          </div>

          {arrivalStage >= 2 && (
            <button
              onClick={() => {
                soundEngine.playGhostWhisper();
                soundEngine.startAmbientSoundscape();
                setArrivalStage(3);
              }}
              className="mt-8 px-6 py-2.5 rounded bg-stone-900 border border-red-900/60 hover:border-red-500 text-stone-200 text-xs font-mono tracking-widest uppercase transition-all animate-pulse"
            >
              Step Forward →
            </button>
          )}
        </div>
      )}

      {/* Atmospheric Fog Drift */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/90 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-950/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skull className="w-5 h-5 text-red-500/80 animate-flicker" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-stone-400">
            Archive of the Forgotten
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPreservation}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-950/30 border border-amber-900/60 text-amber-300 text-xs font-mono tracking-wider hover:border-amber-500 transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
            <span>Preservation Vault</span>
          </button>
          <AudioToggle />
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto my-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-stone-800 bg-stone-950/80 backdrop-blur-sm text-[11px] font-mono text-stone-400 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-red-400" />
          Living Horror Mystery • Guided by the Silenced
        </div>

        {/* Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-300 to-stone-500 uppercase leading-[1.1] max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          The Dead Walk You <br className="hidden sm:inline" />
          <span className="text-red-700/90 font-serif italic tracking-wider">Through Their World</span>
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-typewriter text-sm sm:text-base md:text-lg text-stone-400 max-w-2xl tracking-wide leading-relaxed">
          &ldquo;Every life leaves behind a story waiting to be discovered.&rdquo;
        </p>

        {/* Narrative Intro */}
        <p className="mt-3 font-sans text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
          You are not alone in these corridors. The deceased themselves—Eleanor, Marianne, David, and Clara—walk beside you, reacting to the photographs and letters you uncover, whispering warnings when the living tried to silence them.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleEnterWorld}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-950 via-red-900 to-stone-950 text-stone-100 font-cinzel font-semibold tracking-[0.2em] uppercase text-sm sm:text-base rounded border border-red-800/80 shadow-[0_0_25px_rgba(185,28,28,0.35)] hover:shadow-[0_0_40px_rgba(185,28,28,0.6)] hover:border-red-500 transition-all duration-300 active:scale-95 flex items-center gap-3"
          >
            <Compass className="w-4 h-4 text-red-400 group-hover:rotate-45 transition-transform duration-500" />
            <span>Enter The Forgotten World</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-red-400/50 group-hover:w-4/5 transition-all duration-500" />
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left w-full max-w-3xl">
          <div className="p-3 bg-stone-950/60 border border-stone-800/60 rounded flex items-center gap-3">
            <Eye className="w-4 h-4 text-red-400 shrink-0" />
            <div className="text-[11px] font-mono text-stone-400">
              <strong className="block text-stone-200">Interactive Ghosts</strong>
              Intelligent deceased guides
            </div>
          </div>
          <div className="p-3 bg-stone-950/60 border border-stone-800/60 rounded flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-[11px] font-mono text-stone-400">
              <strong className="block text-stone-200">UV & Annotations</strong>
              Forensic image hotspots
            </div>
          </div>
          <div className="p-3 bg-stone-950/60 border border-stone-800/60 rounded flex items-center gap-3">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-[11px] font-mono text-stone-400">
              <strong className="block text-stone-200">Living Environment</strong>
              Mirrors & door reactions
            </div>
          </div>
          <div className="p-3 bg-stone-950/60 border border-stone-800/60 rounded flex items-center gap-3">
            <HeartHandshake className="w-4 h-4 text-stone-300 shrink-0" />
            <div className="text-[11px] font-mono text-stone-400">
              <strong className="block text-stone-200">Real Preservation</strong>
              Save forgotten family lore
            </div>
          </div>
        </div>
      </main>

      {/* Case Dossiers Preview Section */}
      <section className="relative z-20 w-full max-w-6xl mx-auto px-6 py-8 border-t border-stone-900/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5">
          <div>
            <span className="text-[11px] font-mono text-red-500 uppercase tracking-widest block mb-1">
              Active Investigation Archives
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-semibold text-stone-200">
              Four Forgotten Worlds Await
            </h2>
          </div>
          <p className="text-xs text-stone-400 font-mono mt-2 md:mt-0">
            Select a case to begin investigating immediately
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {casesPreview.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                soundEngine.playPaperRustle();
                onSelectCase(item.id);
                onEnter();
              }}
              className={`group p-4 bg-gradient-to-b from-stone-950/90 to-black/95 rounded border ${item.color} transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.8)]`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-2">
                  <span className="text-stone-300">{item.year}</span>
                  <span className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-cinzel font-bold text-stone-200 group-hover:text-red-300 text-sm transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                  {item.location}
                </p>
                <p className="font-typewriter text-xs text-stone-400 mt-3 leading-relaxed">
                  {item.teaser}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-900 flex items-center justify-between text-xs font-mono text-stone-400 group-hover:text-red-400 transition-colors">
                <span>Meet Deceased Guide</span>
                <span className="text-stone-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atmospheric Footer */}
      <footer className="relative z-20 w-full border-t border-stone-950 bg-black/70 py-4 px-6 text-center text-[11px] font-mono text-stone-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <div>
          The Dead Walk You Through Their World • Powered by Gemma 4 Forensic Intelligence
        </div>
        <div className="mt-2 sm:mt-0 text-stone-400">
          The dead may be gone. Their stories are not.
        </div>
      </footer>
    </div>
  );
};

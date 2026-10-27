/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_CASES } from './data/casesData';
import { GHOST_GUIDES } from './data/ghostGuides';
import { INITIAL_PRESERVATION_STORIES } from './data/preservationData';
import { 
  CaseFile, 
  ClueItem, 
  JournalNote, 
  AIInvestigationMessage, 
  PreservationStory,
  HorrorAccessibilitySettings,
  GhostGuide
} from './types/investigation';
import { HeaderNav, ActiveTab } from './components/HeaderNav';
import { LandingPage } from './components/LandingPage';
import { LocationExplorer } from './components/LocationExplorer';
import { EvidenceLockerView } from './components/EvidenceLockerView';
import { ClueGraphView } from './components/ClueGraphView';
import { JournalView } from './components/JournalView';
import { EvidenceViewer } from './components/EvidenceViewer';
import { AIGuideDrawer } from './components/AIGuideDrawer';
import { GhostGuideModal } from './components/GhostGuideModal';
import { PreservationView } from './components/PreservationView';
import { SettingsModal } from './components/SettingsModal';
import { CaseResolutionModal } from './components/CaseResolutionModal';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { askAIGuide } from './services/aiService';
import { soundEngine } from './services/soundService';

const STORAGE_KEY = 'the_dead_walk_investigation_v2';

export default function App() {
  const [inLandingPage, setInLandingPage] = useState<boolean>(true);
  
  const [cases, setCases] = useState<CaseFile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.cases && Array.isArray(parsed.cases)) {
          return parsed.cases;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_CASES;
  });

  const [activeCaseId, setActiveCaseId] = useState<string>('case_blackwood');
  const [activeTab, setActiveTab] = useState<ActiveTab>('locations');
  const [selectedClueForViewer, setSelectedClueForViewer] = useState<ClueItem | null>(null);
  
  // Modals & Drawers
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isGhostModalOpen, setIsGhostModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [solvedCaseModal, setSolvedCaseModal] = useState<CaseFile | null>(null);

  // Settings
  const [settings, setSettings] = useState<HorrorAccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.settings) return parsed.settings;
      }
    } catch {
      // Fallback
    }
    return {
      reducedMotion: false,
      limitFlicker: false,
      audioMuted: false,
      ambientVolume: 0.35,
      allowSurprises: true,
    };
  });

  // Preservation Stories
  const [preservationStories, setPreservationStories] = useState<PreservationStory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.preservationStories) return parsed.preservationStories;
      }
    } catch {
      // Fallback
    }
    return INITIAL_PRESERVATION_STORIES;
  });

  const [journalNotes, setJournalNotes] = useState<JournalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.notes) return parsed.notes;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [aiMessages, setAiMessages] = useState<AIInvestigationMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.aiMessages) return parsed.aiMessages;
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'msg_welcome',
        sender: 'guide',
        text: 'You have crossed the threshold. The rooms are cold, but every relic holds a voice. Search with care. Look for what the living attempted to erase.',
        timestamp: '00:00',
      },
    ];
  });

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cases,
          notes: journalNotes,
          aiMessages,
          settings,
          preservationStories,
        })
      );
    } catch {
      // Safe storage
    }
  }, [cases, journalNotes, aiMessages, settings, preservationStories]);

  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const activeGhost = GHOST_GUIDES[currentCase.id] || currentCase.ghostGuide;

  const handleUpdateSettings = (newSettings: Partial<HorrorAccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Discover Clue Handler
  const handleDiscoverClue = (clueId: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== currentCase.id) return c;
        const updatedClues = c.clues.map((clue) => {
          if (clue.id === clueId) {
            return { ...clue, discovered: true };
          }
          return clue;
        });

        // Check if cellar or secret locations should unlock
        const updatedLocations = c.locations.map((loc) => {
          if (loc.id === 'loc_bm_cellar' && clueId === 'clue_bm_brass_key') {
            return { ...loc, unlocked: true };
          }
          return loc;
        });

        return { ...c, clues: updatedClues, locations: updatedLocations };
      })
    );
  };

  // Open Clue Viewer
  const handleOpenClueViewer = (clue: ClueItem) => {
    setSelectedClueForViewer(clue);
  };

  // Consult AI regarding a specific artifact
  const handleConsultAI = async (clueId: string) => {
    setIsGuideOpen(true);
    const targetClue = currentCase.clues.find((c) => c.id === clueId);
    if (!targetClue) return;

    const userMsg: AIInvestigationMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: `Guide, examine the ${targetClue.title}. What does the physical evidence reveal?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askAIGuide({
        action: 'analyze_evidence',
        clueId,
        caseId: currentCase.id,
        discoveredClues: currentCase.clues.filter((c) => c.discovered),
      });

      soundEngine.playGhostWhisper();
      const guideMsg: AIInvestigationMessage = {
        id: `msg_g_${Date.now()}`,
        sender: 'guide',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiMessages((prev) => [...prev, guideMsg]);
    } catch {
      // Ignored
    }
  };

  // Consult AI regarding correlation between 2 clues
  const handleConsultAIConnection = async (clueId1: string, clueId2: string) => {
    setIsGuideOpen(true);
    const c1 = currentCase.clues.find((c) => c.id === clueId1);
    const c2 = currentCase.clues.find((c) => c.id === clueId2);

    const userMsg: AIInvestigationMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: `Is there a link between [${c1?.title || clueId1}] and [${c2?.title || clueId2}]?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askAIGuide({
        action: 'connect_clues',
        clueIds: [clueId1, clueId2],
        caseId: currentCase.id,
        discoveredClues: currentCase.clues.filter((c) => c.discovered),
      });

      soundEngine.playGhostWhisper();
      const guideMsg: AIInvestigationMessage = {
        id: `msg_g_${Date.now()}`,
        sender: 'guide',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiMessages((prev) => [...prev, guideMsg]);
    } catch {
      // Ignored
    }
  };

  // Ask AI to reconstruct timeline
  const handleAskAIReconstruct = async () => {
    setIsGuideOpen(true);
    const userMsg: AIInvestigationMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: 'Reconstruct the chronological timeline of what transpired based on our discovered evidence.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    try {
      const res = await askAIGuide({
        action: 'reconstruct_timeline',
        caseId: currentCase.id,
        discoveredClues: currentCase.clues.filter((c) => c.discovered),
      });

      soundEngine.playGhostWhisper();
      const guideMsg: AIInvestigationMessage = {
        id: `msg_g_${Date.now()}`,
        sender: 'guide',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiMessages((prev) => [...prev, guideMsg]);
    } catch {
      // Ignored
    }
  };

  // Add Journal Note
  const handleAddNote = (text: string) => {
    const newNote: JournalNote = {
      id: `note_${Date.now()}`,
      caseId: currentCase.id,
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      pinnedClueIds: [],
    };
    setJournalNotes((prev) => [newNote, ...prev]);
  };

  // Delete Journal Note
  const handleDeleteNote = (noteId: string) => {
    soundEngine.playClick();
    setJournalNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Solve Case
  const handleSolveCase = (_answers: Record<number, string>) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === currentCase.id) {
          return { ...c, resolutionUnlocked: true };
        }
        return c;
      })
    );
    setSolvedCaseModal({ ...currentCase, resolutionUnlocked: true });
  };

  // Reset Progress
  const handleResetProgress = () => {
    soundEngine.playClick();
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== currentCase.id) return c;
        const initialMatchingCase = INITIAL_CASES.find((ic) => ic.id === c.id);
        return initialMatchingCase ? JSON.parse(JSON.stringify(initialMatchingCase)) : c;
      })
    );
    setJournalNotes((prev) => prev.filter((n) => n.caseId !== currentCase.id));
  };

  // Move to next case
  const handleNextCase = () => {
    const currentIndex = cases.findIndex((c) => c.id === currentCase.id);
    const nextIndex = (currentIndex + 1) % cases.length;
    setActiveCaseId(cases[nextIndex].id);
    setSolvedCaseModal(null);
    setActiveTab('locations');
  };

  // Preservation Handlers
  const handleAddPreservationStory = (storyData: Omit<PreservationStory, 'id' | 'createdAt'>) => {
    const newStory: PreservationStory = {
      ...storyData,
      id: `pres_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPreservationStories((prev) => [newStory, ...prev]);
  };

  const handleDeletePreservationStory = (id: string) => {
    soundEngine.playClick();
    setPreservationStories((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#060609] text-stone-200 relative selection:bg-red-900 selection:text-white">
      {/* Ambient Canvas Layer: floating dust particles */}
      <AtmosphereCanvas />

      {inLandingPage ? (
        <LandingPage
          onEnter={() => setInLandingPage(false)}
          onSelectCase={(caseId) => {
            setActiveCaseId(caseId);
            setInLandingPage(false);
          }}
          reducedMotion={settings.reducedMotion}
          onToggleReducedMotion={() => handleUpdateSettings({ reducedMotion: !settings.reducedMotion })}
          onOpenPreservation={() => {
            setInLandingPage(false);
            setActiveTab('preservation');
          }}
        />
      ) : (
        <div className="relative z-20 flex flex-col min-h-screen">
          {/* Main Header & Nav */}
          <HeaderNav
            cases={cases}
            activeCaseId={activeCaseId}
            onSelectCase={setActiveCaseId}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onReturnHome={() => setInLandingPage(true)}
            onResetProgress={handleResetProgress}
            onOpenGuide={() => setIsGhostModalOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            activeGhost={activeGhost}
          />

          {/* Tab Views */}
          <main className="flex-1 pb-16">
            {activeTab === 'locations' && (
              <LocationExplorer
                currentCase={currentCase}
                onDiscoverClue={handleDiscoverClue}
                onOpenClueViewer={handleOpenClueViewer}
                onConsultAI={handleConsultAI}
                onOpenGhostGuide={() => setIsGhostModalOpen(true)}
                reducedMotion={settings.reducedMotion}
              />
            )}

            {activeTab === 'evidence' && (
              <EvidenceLockerView
                currentCase={currentCase}
                onOpenClueViewer={handleOpenClueViewer}
                onConsultAI={handleConsultAI}
              />
            )}

            {activeTab === 'graph' && (
              <ClueGraphView
                currentCase={currentCase}
                onOpenClueViewer={handleOpenClueViewer}
                onConsultAIConnection={handleConsultAIConnection}
              />
            )}

            {activeTab === 'journal' && (
              <JournalView
                currentCase={currentCase}
                notes={journalNotes.filter((n) => n.caseId === currentCase.id)}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                onOpenClueViewer={handleOpenClueViewer}
                onSolveCase={handleSolveCase}
                onAskAIReconstruct={handleAskAIReconstruct}
              />
            )}

            {activeTab === 'preservation' && (
              <PreservationView
                stories={preservationStories}
                onAddStory={handleAddPreservationStory}
                onDeleteStory={handleDeletePreservationStory}
              />
            )}
          </main>

          {/* Evidence Dossier Full Viewer Modal (with Hotspots & Comparison) */}
          <EvidenceViewer
            clue={selectedClueForViewer}
            allDiscoveredClues={currentCase.clues.filter((c) => c.discovered)}
            onClose={() => setSelectedClueForViewer(null)}
            onConsultAI={(clueId) => handleConsultAI(clueId)}
            onSelectClue={(targetClue) => setSelectedClueForViewer(targetClue)}
          />

          {/* Interactive Ghost Guide Modal */}
          <GhostGuideModal
            isOpen={isGhostModalOpen}
            onClose={() => setIsGhostModalOpen(false)}
            caseFile={currentCase}
            ghostGuide={activeGhost}
            currentLocationName={currentCase.locations[0]?.name || 'Abandoned Rooms'}
            onAddMessage={(msg) => setAiMessages((prev) => [...prev, msg])}
            messages={aiMessages}
          />

          {/* Persistent Gemma 4 Voice Drawer */}
          <AIGuideDrawer
            isOpen={isGuideOpen}
            onClose={() => setIsGuideOpen(false)}
            currentCase={currentCase}
            messages={aiMessages}
            onAddMessage={(msg) => setAiMessages((prev) => [...prev, msg])}
            onOpenClueViewer={handleOpenClueViewer}
          />

          {/* Settings & Accessibility Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />

          {/* Case Solved Epilogue Revelation Modal */}
          <CaseResolutionModal
            caseFile={solvedCaseModal}
            onClose={() => setSolvedCaseModal(null)}
            onNextCase={handleNextCase}
          />
        </div>
      )}
    </div>
  );
}

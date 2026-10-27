/**
 * Types for "The Dead Walk You Through Their World"
 */

export type EvidenceType = 
  | 'photograph'
  | 'letter'
  | 'diary'
  | 'document'
  | 'newspaper'
  | 'relic'
  | 'audio_transcript'
  | 'memory';

export interface ClueConnection {
  targetClueId: string;
  relationType: 'Belongs to' | 'Mentions' | 'Found at' | 'Created by' | 'Occurred before' | 'Contradicts' | 'Supports' | 'Possibly related to';
  description: string;
  supportingEvidence?: string;
  contradictoryEvidence?: string;
  investigateNext?: string;
  isHypothesis?: boolean;
}

export interface EvidenceAnnotation {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  observedDetail: string;
  ghostInterpretation?: string;
  forensicCategory: 'observed_fact' | 'ghost_testimony' | 'contradiction';
}

export interface ClueItem {
  id: string;
  caseId: string;
  title: string;
  type: EvidenceType;
  date: string;
  locationFound: string;
  shortSnippet: string;
  description: string;
  fullContent?: string;
  imageUrl?: string;
  uvSecretMessage?: string;
  uvSecretTitle?: string;
  peopleInvolved: string[];
  knownFacts: string[];
  unresolvedQuestions: string[];
  connections: ClueConnection[];
  annotations?: EvidenceAnnotation[];
  verified: boolean;
  discovered: boolean;
  isKeyClue?: boolean;
}

export interface LocationHotspot {
  id: string;
  title: string;
  x: number;
  y: number;
  clueId?: string;
  locked?: boolean;
  requiredClueOrKeyId?: string;
  lockedHint?: string;
  description: string;
  iconType: 'photo' | 'document' | 'key' | 'eye' | 'relic' | 'door';
}

export interface EnvironmentalReaction {
  id: string;
  triggerClueId: string;
  reactionType: 'mirror_distortion' | 'light_flicker' | 'shadow_silhouette' | 'door_unseal' | 'spectral_chime';
  description: string;
  roomElement: string;
  active: boolean;
}

export interface GhostGuide {
  id: string;
  name: string;
  title: string;
  lifespan: string;
  avatarIcon: string;
  personality: string;
  narrativeSecret: string;
  startingLocationId: string;
  greetings: string[];
  prompts: { label: string; query: string }[];
  reactionsByClueId: Record<string, string>;
}

export interface RoomLocation {
  id: string;
  name: string;
  subtitle: string;
  era: string;
  atmosphereDescription: string;
  ambientSoundType: 'wind_creak' | 'hospital_drone' | 'school_bell' | 'train_chime' | 'archive_whisper';
  hotspots: LocationHotspot[];
  environmentalReactions?: EnvironmentalReaction[];
  backgroundTheme: string;
  unlocked: boolean;
  discoveredCount?: number;
  totalClues?: number;
}

export interface CaseFile {
  id: string;
  title: string;
  deceasedName: string;
  lifespan: string;
  yearOfIncident: string;
  summary: string;
  introNarrative: string;
  primaryLocation: string;
  ghostGuide?: GhostGuide;
  locations: RoomLocation[];
  clues: ClueItem[];
  unsolvedMystery: string;
  conclusionQuestions: {
    question: string;
    options: { id: string; text: string; correct: boolean; revealText: string }[];
  }[];
  resolutionUnlocked: boolean;
  resolutionStory?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'person' | 'location' | 'clue' | 'event' | 'hypothesis' | 'date';
  type?: EvidenceType;
  clueId?: string;
  x?: number;
  y?: number;
  discovered: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  status: 'confirmed' | 'hypothesis' | 'contradiction';
  supportingEvidence?: string;
  investigateNext?: string;
}

export interface JournalNote {
  id: string;
  caseId: string;
  timestamp: string;
  text: string;
  pinnedClueIds: string[];
}

export interface AIInvestigationMessage {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  timestamp: string;
  ghostId?: string;
  ghostName?: string;
  referencedClueIds?: string[];
  theoryValidation?: {
    isPlausible: boolean;
    confidence: number;
    explanation: string;
  };
}

export interface PreservationStory {
  id: string;
  title: string;
  contributorName: string;
  yearOrEra: string;
  personHonored: string;
  storyNarrative: string;
  sourceType: 'family_album' | 'oral_history' | 'letter' | 'diary' | 'community_archive';
  verifiedDetails: string[];
  rememberedLore: string[];
  archivalTipNotes?: string;
  createdAt: string;
}

export interface HorrorAccessibilitySettings {
  reducedMotion: boolean;
  limitFlicker: boolean;
  audioMuted: boolean;
  ambientVolume: number;
  allowSurprises: boolean;
}

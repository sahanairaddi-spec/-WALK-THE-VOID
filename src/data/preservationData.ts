import { PreservationStory } from '../types/investigation';

export const INITIAL_PRESERVATION_STORIES: PreservationStory[] = [
  {
    id: 'pres_sample_1',
    title: 'Grandmother Evelyn’s 1942 Red Cross Letter',
    contributorName: 'Sarah M. (Archival Contributor)',
    yearOrEra: '1942',
    personHonored: 'Evelyn Ruth Davis (1921–2008)',
    sourceType: 'letter',
    storyNarrative: 'Found folded inside an old cookbook in our family attic in Yorkshire. Evelyn wrote this to her sister during the Manchester blackout while serving as a volunteer nurse. The paper had begun to turn brittle and yellow along the creases. By transcribing her handwritten notes and digitizing the original letter at 600 DPI, we uncovered names of neighbours whose houses were damaged in the blitz that were never recorded in borough council records.',
    verifiedDetails: [
      'Postmarked Manchester Central Sorting Office, 14 November 1942.',
      'Refers to Ward 4 at Withington Hospital.',
      'Sister Margaret\'s address verified against the 1939 National Register.'
    ],
    rememberedLore: [
      'Family memory claimed Evelyn kept the letter because it was the night she met her future husband, though the text only mentions sharing tea and bread rations.'
    ],
    archivalTipNotes: 'Store in acid-free archival polyethylene sleeves away from direct sunlight. Never use transparent adhesive tape on tears.',
    createdAt: '2026-10-27'
  },
  {
    id: 'pres_sample_2',
    title: 'The Unlabeled Silver Gelatin Print of Mill Workers',
    contributorName: 'James L. (Local Historian)',
    yearOrEra: '1911',
    personHonored: 'The Weavers of Greenwood Mill',
    sourceType: 'family_album',
    storyNarrative: 'Bought at an estate flea market for two pounds. A fading 5x7 photograph showing twelve teenage girls standing barefoot between steam looms. Through oral history interviews with descendants in the village, we identified eight of the twelve workers, their ages ranging from 13 to 17. Preserving their names restores their humanity from being nameless industrial statistics.',
    verifiedDetails: [
      'Embossed with the mark of Lancaster Studio, Preston.',
      'Identified workers matched census return of April 1911 for Mill Street.'
    ],
    rememberedLore: [
      'Elderly residents recalled that the factory whistle could be heard four miles up the valley on clear mornings.'
    ],
    archivalTipNotes: 'Handle original prints only by edges or wearing lint-free cotton gloves. Scan at 1200 DPI uncompressed TIFF.',
    createdAt: '2026-10-27'
  },
  {
    id: 'pres_sample_3',
    title: 'Recording the Voice of Great-Uncle Mateo',
    contributorName: 'Elena R. (Family Oral Historian)',
    yearOrEra: '1956–1960',
    personHonored: 'Mateo Vasquez (1930–2021)',
    sourceType: 'oral_history',
    storyNarrative: 'Before he passed at age 91, we sat down with a voice recorder for three Sunday afternoons. He recounted emigrating aboard a cargo freighter, working the railway yards in Chicago during the blizzard of 1958, and the exact recipe his mother baked for Day of the Dead. His cassette tapes were digitised to FLAC and deposited in our local community library.',
    verifiedDetails: [
      'Immigration manifest date: October 1956, Port of New Orleans.',
      'Union pension stub from the Santa Fe Railway line.'
    ],
    rememberedLore: [
      'Mateo always swore the freighter was caught in a water spout off the Florida Keys, though meteorological records only cite a standard gale.'
    ],
    archivalTipNotes: 'When recording oral history, ask open-ended sensory questions: "What did the air smell like?", "What sounds woke you in the morning?"',
    createdAt: '2026-10-27'
  }
];

export const PRESERVATION_GUIDELINES = [
  {
    category: 'Photographs & Negatives',
    icon: '📷',
    tips: [
      'Never touch photograph emulsion with bare fingers; skin oils attract mold and cause irreversible staining.',
      'Store in acid-free, lignin-free archival envelopes or polyester (Melinex) sleeves in a cool, dry, dark environment.',
      'Scan at a minimum of 600 DPI for standard prints and 2400+ DPI for negatives and 35mm slides in uncompressed TIFF format.'
    ]
  },
  {
    category: 'Handwritten Letters & Documents',
    icon: '✉️',
    tips: [
      'Unfold letters and store them flat; creases create mechanical stress and tear over time.',
      'Never use sticky tape, metal paperclips, or rubber bands—rust and adhesive chemicals destroy paper fibers.',
      'Transcribe the exact spelling, capitalization, and punctuation as written; preserve the writer\'s authentic voice.'
    ]
  },
  {
    category: 'Oral History & Voice Memories',
    icon: '🎙️',
    tips: [
      'Record in an uncompressed audio format (WAV or 24-bit FLAC) with a dedicated microphone, not just a phone in a pocket.',
      'Label audio files immediately with: Full Name, Date, Location, Interviewer, and Topics Discussed.',
      'Separate verified historical records (certificates, newspaper reports) from cherished family folklore and personal recollections.'
    ]
  }
];

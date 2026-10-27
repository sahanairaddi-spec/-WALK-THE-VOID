import { CaseFile } from '../types/investigation';

export const INITIAL_CASES: CaseFile[] = [
  {
    id: 'case_blackwood',
    title: 'The Vanishing of Eleanor Blackwood',
    deceasedName: 'Eleanor Blackwood (née Sterling)',
    lifespan: '1918 – 1954',
    yearOfIncident: '1954',
    primaryLocation: 'Blackwood Manor, Whispering Pines',
    summary: 'On a stormy autumn night in 1954, the heiress to the Blackwood mining fortune disappeared from her locked bedchamber. Her husband claimed she took her own life into the lake; her letters tell of a slowly tightening trap.',
    introNarrative: 'The tall wrought-iron gates of Blackwood Manor groaned as you pushed them open. The house has stood abandoned for seventy winters. Inside, dust settles on velvet drapes, and the air smells of dried lavender, damp limestone, and dried wax. Eleanor Blackwood’s portrait still stares from the parlor chimney, but the eyes seem to track your flashlight.',
    unsolvedMystery: 'Did Eleanor drown in the lake as Julian Blackwood told the local constabulary, or was she entombed alive beneath the very house she built?',
    resolutionUnlocked: false,
    locations: [
      {
        id: 'loc_bm_parlor',
        name: 'The Grand Parlor',
        subtitle: 'Ground Floor, North Wing',
        era: 'Victorian Opulence, 1890s-1950s',
        atmosphereDescription: 'Decaying velvet settees and a grand piano coated in soot. An oil painting of Eleanor hangs askew over a blackened fireplace. The silence is broken only by the wind rattling the leaded glass panes.',
        ambientSoundType: 'wind_creak',
        backgroundTheme: 'from-zinc-950 via-stone-900 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_bm_photo_family',
            title: 'Framed Portrait on Mantle',
            x: 52,
            y: 42,
            clueId: 'clue_bm_photo_family',
            description: 'A silver-framed photograph of Eleanor and Julian Blackwood standing before the manor lawn. Inspect it carefully.',
            iconType: 'photo'
          },
          {
            id: 'hs_bm_gramophone',
            title: 'Ornate Gramophone Table',
            x: 24,
            y: 65,
            clueId: 'clue_bm_letter_solicitor',
            description: 'Beneath the dusty brass horn lies a discarded parchment envelope sealed with cracked red beeswax.',
            iconType: 'document'
          },
          {
            id: 'hs_bm_cellar_door',
            title: 'Iron Cellar Bulkhead',
            x: 82,
            y: 72,
            locked: true,
            requiredClueOrKeyId: 'clue_bm_brass_key',
            lockedHint: 'Heavy iron padlock secured with cold-forged brass. Requires an antique crest key.',
            description: 'Cold air drafts from the seams of the heavy wooden cellar doors. A faint scent of sulfur and wet soil.',
            iconType: 'door'
          }
        ]
      },
      {
        id: 'loc_bm_bedroom',
        name: 'The Master Bedchamber',
        subtitle: 'Second Floor, West Wing',
        era: 'Art Deco & Victorian, 1954',
        atmosphereDescription: 'Canopy bed with tattered lace curtains. A vanity table strewn with clouded perfume bottles and a jewelry casket forced open with a chisel.',
        ambientSoundType: 'wind_creak',
        backgroundTheme: 'from-neutral-950 via-zinc-900 to-stone-950',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_bm_diary_drawer',
            title: 'False Drawer in Vanity',
            x: 35,
            y: 60,
            clueId: 'clue_bm_diary_page',
            description: 'Behind the vanity mirror, a loose oak panel conceals loose pages ripped violently from a diary.',
            iconType: 'document'
          },
          {
            id: 'hs_bm_pocketwatch',
            title: 'Shattered Nightstand',
            x: 68,
            y: 55,
            clueId: 'clue_bm_pocketwatch',
            description: 'A cracked silver pocket watch caught in a floorboard fissure, hands frozen forever.',
            iconType: 'relic'
          },
          {
            id: 'hs_bm_wardrobe',
            title: 'Carved Mahogany Wardrobe',
            x: 85,
            y: 38,
            clueId: 'clue_bm_brass_key',
            description: 'Inside the lining of a winter mink coat hangs a heavy skeleton key with the Blackwood raven crest.',
            iconType: 'key'
          }
        ]
      },
      {
        id: 'loc_bm_cellar',
        name: 'The Flooded Cellar Vault',
        subtitle: 'Sub-Basement Under the Wine Cellar',
        era: '18th Century Vaults',
        atmosphereDescription: 'Ankle-deep black water reflects the flashlight beam. Arched stone vaults built over natural subterranean fissures.',
        ambientSoundType: 'hospital_drone',
        backgroundTheme: 'from-stone-950 via-black to-slate-950',
        unlocked: false,
        hotspots: [
          {
            id: 'hs_bm_ledger',
            title: 'Waterproof Chemist Tin',
            x: 45,
            y: 58,
            clueId: 'clue_bm_ledger',
            description: 'Resting on a dry limestone ledge is Julian’s private bank ledger and receipts from an apothecary in London.',
            iconType: 'document'
          },
          {
            id: 'hs_bm_brickwall',
            title: 'Freshly Mortared Alcove',
            x: 75,
            y: 40,
            clueId: 'clue_bm_police_wire',
            description: 'The limestone bricks here were laid with Portland cement—much newer than the rest of the 1880s brickwork. Hairpins and dried rose petals are stuck in the wet mortar.',
            iconType: 'eye'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue_bm_photo_family',
        caseId: 'case_blackwood',
        title: 'The Autumn Lawn Portrait (1953)',
        type: 'photograph',
        date: 'October 14, 1953',
        locationFound: 'The Grand Parlor, Fireplace Mantle',
        shortSnippet: 'A family photograph showing Eleanor seated while Julian stands rigid behind her.',
        description: 'A formal sepia photograph taken one year before the vanishing. Eleanor wears a high-collared lace gown and looks directly into the lens with hollow, sleepless eyes. Julian rests a heavy hand on her right shoulder, knuckles pale.',
        uvSecretTitle: 'Shadow in the 3rd Floor Dormer Window',
        uvSecretMessage: 'Under ultraviolet light, the dark attic dormer reveals the silhouette of a woman in hospital patient garb peering down, holding what appears to be a medical restraint strap. The manor records claimed no patients or visitors were present.',
        peopleInvolved: ['Eleanor Blackwood', 'Julian Blackwood', 'Unknown Figure'],
        knownFacts: [
          'Taken by studio photographer Arthur Finch exactly 365 days before Eleanor disappeared.',
          'Julian paid 50 guineas to have all other copies burned, according to studio receipts.',
          'Eleanor had lost 30 pounds in the six months prior.'
        ],
        unresolvedQuestions: [
          'Who was the person captured in the attic window while the portrait was being taken?',
          'Why are Julian’s fingers gripping Eleanor’s shoulder with enough force to crease the wool fabric?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_letter_solicitor',
            relationType: 'Mentions',
            description: 'The letter mentions Eleanor was being watched from inside her own home.'
          },
          {
            targetClueId: 'clue_bm_pocketwatch',
            relationType: 'Belongs to',
            description: 'The pocket watch visible on Julian’s vest chain in this photo matches the frozen relic.'
          }
        ],
        verified: true,
        discovered: true,
        isKeyClue: true
      },
      {
        id: 'clue_bm_letter_solicitor',
        caseId: 'case_blackwood',
        title: 'Unsent Letter to Arthur Finch, Esq.',
        type: 'letter',
        date: 'October 9, 1954',
        locationFound: 'The Grand Parlor, Beside the Gramophone',
        shortSnippet: 'A desperate, ink-blotted plea written three nights before her disappearance.',
        description: 'Torn at the edges, folded in haste, and never posted. The handwriting begins steady but dissolves into trembling cursive toward the bottom.',
        fullContent: `Dearest Arthur,

If this reaches you by other hands than mine, you must go to the magistrate immediately. Julian has dismissed Clara, my only loyal maid, and replaced her with two orderlies from Saint Jude Sanatorium who answer only to him. 

The broth they bring me tastes of bitter almonds and copper. Yesterday I found the cellar door reinforced with iron bars. He tells the servants I am losing my mind to hysteria and wandering in the night, but it is he who locks my bedroom from the outside when the hall clock strikes ten.

He has drafted papers to transfer the Sterling trust into his sole guardianship. I shall not sign them. If I die in this bed, Arthur, look beneath the cellar flagstones where the winter coal is stored. He has been digging there at night.

Your frightened cousin,
Eleanor`,
        uvSecretTitle: 'Bloodied Thumbprint & Hidden Code',
        uvSecretMessage: 'Near the wax seal, a smeared bloody thumbprint glows luminous yellow. Micro-writing in iron gall ink reads: "SV-404-JUDE".',
        peopleInvolved: ['Eleanor Blackwood', 'Arthur Finch', 'Julian Blackwood', 'Sister Clara'],
        knownFacts: [
          'Arthur Finch never received this letter.',
          'Saint Jude Sanatorium orderlies were hired as domestic staff under false aliases.',
          'The Sterling trust was worth over £250,000 in 1954 currency.'
        ],
        unresolvedQuestions: [
          'Why did Julian hire medical orderlies from an asylum as domestic staff?',
          'What is the meaning of "SV-404-JUDE" etched into the wax?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_diary_page',
            relationType: 'Supports',
            description: 'Corroborates the diary entries about nighttime digging and drugging.'
          },
          {
            targetClueId: 'clue_sj_intake_404',
            relationType: 'Possibly related to',
            description: 'Matches the patient record numbering found at Saint Jude Sanatorium.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_bm_diary_page',
        caseId: 'case_blackwood',
        title: 'Torn Diary Page — October 11, 1954',
        type: 'diary',
        date: 'October 11, 1954',
        locationFound: 'Master Bedchamber Vanity Secret Panel',
        shortSnippet: 'The final journal entry written 24 hours before the disappearance.',
        description: 'A leaf of parchment edged with gold foil, damp with condensation.',
        fullContent: `October 11 — 2:15 in the morning.
The bell in the courtyard rang three times, though the rope was tied off in the carriage house. I peered through the blinds. Julian was down by the garden cistern with two men in rubber aprons. They carried a wicker laundry hamper, the kind used for hospital linens. It was heavy. It took both men to hoist it down into the root cellar stairs.

When Julian came back upstairs, I pretended to be deep in laudanum sleep. He stood over my bed for seven minutes. I counted the beats of my own terrified heart. He whispered: 'Sleep now, Eleanor. Soon there will be neither pain nor memories.'

He took my silver watch from the bureau to wind it, as if routine could wash away the smell of fresh lime on his hands.`,
        uvSecretTitle: 'Scratched Scratchmarks & Time Stamp',
        uvSecretMessage: 'Faint fingernail indentations reveal: "HE HAS THE KEY IN HIS COAT LINING. HE WILL NOT LET ME LEAVE."',
        peopleInvolved: ['Eleanor Blackwood', 'Julian Blackwood'],
        knownFacts: [
          'Julian claimed he was in London on business on the night of October 11.',
          'Laundry hampers of that size were standard issue at Saint Jude Sanatorium.',
          'Lime was commonly used in 1950s construction to dissolve organic tissue and mask odor.'
        ],
        unresolvedQuestions: [
          'Who was inside the wicker hamper taken down into the root cellar on October 11?',
          'Why did Julian claim to be in London when Eleanor observed him in the courtyard?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_brass_key',
            relationType: 'Mentions',
            description: 'Directly identifies the coat lining where the cellar key was concealed.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: false
      },
      {
        id: 'clue_bm_pocketwatch',
        caseId: 'case_blackwood',
        title: 'Frozen Sterling Pocket Watch',
        type: 'relic',
        date: 'October 12, 1954',
        locationFound: 'Master Bedchamber Floorboards',
        shortSnippet: 'Julian’s monogrammed silver pocket watch, stopped violently at 3:17.',
        description: 'An English lever-escapement pocket watch with the initials "J.B." engraved on the back casing. The crystal is shattered and the balance wheel is bent.',
        uvSecretTitle: 'Blood Impact Pattern',
        uvSecretMessage: 'Ultraviolet reveals arterial blood spatter radiating from the 3 o’clock position across the Roman numerals.',
        peopleInvolved: ['Julian Blackwood', 'Eleanor Blackwood'],
        knownFacts: [
          'Watch stopped at exactly 3:17 AM.',
          'The violent force required to bend the solid silver escapement suggests a heavy blow or struggle.',
          'Julian told police he lost the watch on the London express train three weeks earlier.'
        ],
        unresolvedQuestions: [
          'If Julian lost this in London, how did it end up jammed into Eleanor’s bedroom floorboards covered in blood?',
          'Whose blood is baked into the dial mechanism?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_photo_family',
            relationType: 'Belongs to',
            description: 'Clearly worn by Julian in the family portrait.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_bm_brass_key',
        caseId: 'case_blackwood',
        title: 'Crest Skeleton Key',
        type: 'relic',
        date: 'Circa 1920',
        locationFound: 'Master Bedchamber Mink Coat Lining',
        shortSnippet: 'Heavy cast-brass key bearing the Blackwood raven motif.',
        description: 'A 6-inch skeleton key, cold and tarnished. It fits the rusted iron padlock guarding the subterranean cellar door.',
        peopleInvolved: ['Julian Blackwood'],
        knownFacts: [
          'Unlocks the Sub-Basement Flooded Cellar Vault.',
          'Hidden carefully inside the lining of Julian’s overcoat.'
        ],
        unresolvedQuestions: [
          'Why hide a household cellar key inside personal clothing?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_diary_page',
            relationType: 'Found at',
            description: 'Found exactly where Eleanor wrote Julian had hidden it.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: false
      },
      {
        id: 'clue_bm_ledger',
        caseId: 'case_blackwood',
        title: 'Julian’s Private Ledger & Chemist Invoice',
        type: 'document',
        date: 'September 1954',
        locationFound: 'Flooded Cellar Vault Ledge',
        shortSnippet: 'Accounting notebook detailing secret payments to a sanatorium director.',
        description: 'Bound in black calfskin. Lists regular monthly transfers of £500 to "Dr. A. Ross — Saint Jude Private Research Account" and two receipts for 200 lbs of quicklime and quick-drying cement.',
        peopleInvolved: ['Julian Blackwood', 'Dr. Alistair Ross'],
        knownFacts: [
          'Payments to Dr. Ross began six months prior to Eleanor’s disappearance.',
          'Quicklime and mortar were delivered at 2:00 AM to the service gate.',
          'Dr. Ross was the superintendent of Saint Jude Sanatorium.'
        ],
        unresolvedQuestions: [
          'What was Julian funding at Saint Jude Sanatorium under the title "Private Research"?',
          'Why did an estate need 200 lbs of quicklime in the autumn of 1954?'
        ],
        connections: [
          {
            targetClueId: 'clue_sj_intake_404',
            relationType: 'Mentions',
            description: 'Directly links Julian Blackwood to Dr. Ross at Saint Jude.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_bm_police_wire',
        caseId: 'case_blackwood',
        title: 'Sealed Police Dispatch & Coroner Note',
        type: 'newspaper',
        date: 'October 15, 1954',
        locationFound: 'Sub-Basement Wall Alcove',
        shortSnippet: 'Police wire declaring Eleanor Blackwood "presumed drowned in Blackwood Tarn."',
        description: 'A yellowed carbon copy of Police Case File #54-B. The chief constable marked the case closed within 48 hours without draining the lake or searching the manor cellars.',
        peopleInvolved: ['Chief Constable Miller', 'Julian Blackwood'],
        knownFacts: [
          'The investigation was shut down in less than two days.',
          'Constable Miller received a £1,000 personal loan from Julian Blackwood two weeks later.'
        ],
        unresolvedQuestions: [
          'Why did the police refuse to inspect the cellar despite rumors from local village servants?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_letter_solicitor',
            relationType: 'Contradicts',
            description: 'Contradicts Eleanor’s explicit warning that Julian would stage her death as suicide or drowning.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      }
    ],
    conclusionQuestions: [
      {
        question: 'What was the true fate of Eleanor Blackwood on the night of October 12, 1954?',
        options: [
          {
            id: 'opt_1',
            text: 'She drowned herself in Blackwood Tarn in a fit of melancholia.',
            correct: false,
            revealText: 'False. This was the fabricated story Julian paid Constable Miller to endorse.'
          },
          {
            id: 'opt_2',
            text: 'She was incapacitated with laudanum, murdered during a struggle at 3:17 AM, and entombed behind the new cellar wall with quicklime.',
            correct: true,
            revealText: 'Correct. The stopped watch, bloody spatter, lime invoices, and sealed alcove in the flooded cellar prove she never left the house alive.'
          },
          {
            id: 'opt_3',
            text: 'She escaped to London with the help of Arthur Finch and lived under an assumed name.',
            correct: false,
            revealText: 'False. Arthur Finch never received her letter, and her personal effects and watch remained behind.'
          }
        ]
      },
      {
        question: 'What dark institution was complicit in her death and coverup?',
        options: [
          {
            id: 'opt_a',
            text: 'Saint Jude Sanatorium, directed by Dr. Alistair Ross.',
            correct: true,
            revealText: 'Correct. Julian paid Dr. Ross monthly fees to supply asylum orderlies and drugs to contain Eleanor.'
          },
          {
            id: 'opt_b',
            text: 'The Oakhaven School Board.',
            correct: false,
            revealText: 'Incorrect. Oakhaven was not involved with Blackwood Manor in 1954.'
          }
        ]
      }
    ],
    resolutionStory: 'The Truth of Blackwood Manor: Eleanor Blackwood never set foot outside on that stormy October night. When she refused to surrender her family inheritance, Julian Blackwood—aided by mercenaries from Saint Jude Sanatorium—attempted to sedate her. A violent struggle ensued in the bedchamber at 3:17 AM, during which Julian\'s watch was broken by Eleanor’s dying grasp. Her body was carried into the root cellar and sealed behind fresh mortar with 200 pounds of quicklime. Her spirit lingered in the cold masonry, waiting seventy years for someone to uncover the silver watch, read her unsent letter, and tear down the wall.'
  },
  {
    id: 'case_saint_jude',
    title: 'Ward 9 & The Electric Silence',
    deceasedName: 'Marianne Vance (Patient 404)',
    lifespan: '1932 – 1962',
    yearOfIncident: '1962',
    primaryLocation: 'Saint Jude Sanatorium for Nervous Disorders',
    summary: 'A remote cliffside asylum closed following a catastrophic power surge in 1962. Among the charred medical records, Patient 404’s intake file was wiped clean—except for an audio spool that continued to hum.',
    introNarrative: 'The smell of ozone, peeling mint-green paint, and rusted iron beds greets you in the reception corridor of Saint Jude. Broken glass crunches underfoot. In the electrotherapy theater at the center of Ward 9, the leather restraint straps on the center gurney remain buckled, waiting for a patient who was never officially discharged.',
    unsolvedMystery: 'What was Dr. Ross attempting to extract from the minds of Ward 9 patients using high-voltage resonant frequencies?',
    resolutionUnlocked: false,
    locations: [
      {
        id: 'loc_sj_reception',
        name: 'Intake Reception & Records',
        subtitle: 'Ground Floor Administration',
        era: 'Institutional Decay, 1950s-1960s',
        atmosphereDescription: 'Filing cabinets overturned, patient cards scattered across waterlogged linoleum. A rotary telephone hangs off the hook, emitting faint static.',
        ambientSoundType: 'hospital_drone',
        backgroundTheme: 'from-cyan-950 via-slate-900 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_sj_file_404',
            title: 'Steel File Cabinet #4',
            x: 32,
            y: 52,
            clueId: 'clue_sj_intake_404',
            description: 'A charred manila folder stamped RESTRICTED: PATIENT 404 - VANCE, M.',
            iconType: 'document'
          },
          {
            id: 'hs_sj_staff_photo',
            title: 'Framed Medical Board Photograph',
            x: 64,
            y: 40,
            clueId: 'clue_sj_staff_photo',
            description: 'The 1961 medical staff assembled in front of the Sanatorium gates. Dr. Ross sits in the center.',
            iconType: 'photo'
          }
        ]
      },
      {
        id: 'loc_sj_electro',
        name: 'The Resonance Theater (Electrotherapy)',
        subtitle: 'Ward 9 Sub-level',
        era: '1962 Experimental Lab',
        atmosphereDescription: 'Massive brass transformers, glass vacuum tubes, and an insulated copper mesh cage enclosing an iron gurney with leather head-straps.',
        ambientSoundType: 'hospital_drone',
        backgroundTheme: 'from-slate-950 via-teal-950 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_sj_audio_tape',
            title: 'Reel-to-Reel Tape Recorder',
            x: 48,
            y: 55,
            clueId: 'clue_sj_audio_spool',
            description: 'A magnetic tape spool with the tape tangled in the capstan rollers. A handwritten label reads: Session 44 - Resonance Extraction.',
            iconType: 'relic'
          },
          {
            id: 'hs_sj_nurse_letter',
            title: 'Ventilation Grate Behind Gurney',
            x: 78,
            y: 70,
            clueId: 'clue_sj_nurse_confession',
            description: 'Stuffed behind loose sheet metal screws is a crumpled, tea-stained letter in Nurse Holt’s handwriting.',
            iconType: 'document'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue_sj_intake_404',
        caseId: 'case_saint_jude',
        title: 'Intake Dossier: Patient 404 (Marianne Vance)',
        type: 'document',
        date: 'November 3, 1961',
        locationFound: 'Reception Records Cabinet',
        shortSnippet: 'Intake document recording Marianne Vance’s admission under "Court Order & Private Patronage".',
        description: 'Contains clinical notes by Dr. Alistair Ross: "Patient claims she can hear memories left behind by former occupants of buildings. Auditory hallucinations are intense, specific, and mathematically verifiable."',
        fullContent: `SAINT JUDE SANATORIUM FOR NERVOUS DISORDERS
PATIENT INTAKE DOSSIER #404
NAME: Marianne Vance
AGE: 29
ADMISSION STATUS: Involuntary. Sponsored by Private Anonymous Trust (Ref: Blackwood Mining Estate).
DIAGNOSIS: Extreme Hyper-Sensory Resonance; claims to perceive 'the residual thoughts of the deceased'.

PHYSICIAN'S LOG (Dr. A. Ross):
The subject is not insane in the classical sense. Under blind testing, she correctly identified the names, dates of demise, and final words of five patients who died in Cell 14 between 1920 and 1945. She described the room before entering. 

This is not psychosis. It is a biological radio reception of human neural residue. We shall amplify the frequency using the Mark IV Resonance Generator.`,
        uvSecretTitle: 'Overwritten Red Stamp',
        uvSecretMessage: 'Under UV light, a hidden red classification stamp appears: "SUBJECT PREPARED FOR TERMINAL EXTRACTION — DO NOT DISCHARGE UNDER ANY CIRCUMSTANCE."',
        peopleInvolved: ['Marianne Vance', 'Dr. Alistair Ross', 'Julian Blackwood'],
        knownFacts: [
          'Marianne’s admission was secretly funded by the Blackwood trust.',
          'Dr. Ross believed Marianne possessed genuine psychic sensitivity to traumatic memory.',
          'Her medical file was ordered incinerated on November 12, 1962.'
        ],
        unresolvedQuestions: [
          'Why did the Blackwood estate pay to lock up Marianne Vance?',
          'What did Marianne perceive when they brought her to Blackwood Manor in 1954?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_ledger',
            relationType: 'Created by',
            description: 'Directly accounts for the monthly transfers noted in Julian’s private ledger.'
          },
          {
            targetClueId: 'clue_sj_audio_spool',
            relationType: 'Mentions',
            description: 'Subject of Session 44 recorded on the reel-to-reel tape.'
          }
        ],
        verified: true,
        discovered: true,
        isKeyClue: true
      },
      {
        id: 'clue_sj_staff_photo',
        caseId: 'case_saint_jude',
        title: 'Saint Jude Medical Staff Photograph (1961)',
        type: 'photograph',
        date: 'June 1961',
        locationFound: 'Intake Reception Wall',
        shortSnippet: 'Dr. Ross standing with his staff; in the background, a patient taps against an upper window.',
        description: 'A crisp gelatin-silver print of thirty physicians, nurses, and orderlies. Dr. Ross stands tall with a thin, unsettling smile.',
        uvSecretTitle: 'Scratched Silhouette',
        uvSecretMessage: 'UV light highlights a third-story window behind the staff: Nurse Beatrice Holt is seen holding a child by the hand, pointing frantically toward the cliff edge.',
        peopleInvolved: ['Dr. Alistair Ross', 'Nurse Beatrice Holt'],
        knownFacts: [
          'Taken 16 months before the sanatorium burned down.',
          'Nurse Holt disappeared two days after this photograph was taken.'
        ],
        unresolvedQuestions: [
          'Who was the child Nurse Holt was attempting to lead toward the cliff?'
        ],
        connections: [
          {
            targetClueId: 'clue_sj_nurse_confession',
            relationType: 'Created by',
            description: 'Nurse Holt, shown in this photo, authored the hidden confession.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: false
      },
      {
        id: 'clue_sj_audio_spool',
        caseId: 'case_saint_jude',
        title: 'Tape Transcript: Session 44 — "The Static Chorus"',
        type: 'audio_transcript',
        date: 'October 29, 1962',
        locationFound: 'Electrotherapy Resonance Theater',
        shortSnippet: 'Audio transcript of Marianne’s final experimental trial before the blackout.',
        description: 'The reel-to-reel tape was partially melted, but the voice remains chillingly legible.',
        fullContent: `[AUDIO TRANSCRIPTION — REEL #44 — SAINT JUDE LABS]
DATE: October 29, 1962 — 23:40 HRS
SPEAKERS: Dr. Alistair Ross (DR), Marianne Vance (MV)

[Heavy electrical hum in background, increasing in pitch]
DR: Dial set to 420 megacycles. Marianne, focus on the object on the tray. It is a silver pocket watch from Whispering Pines. What do you see?
MV: [Breathing shallow, weeping] It hurts... the heat in my temples...
DR: Look into the metal, Marianne. Who held it last?
MV: A woman... her name is Eleanor. She is screaming in the dark. She says the mortar is wet... she is pushing against the stones with bloody fingernails...
DR: [Excited] Remarkable. The residual trauma is broadcasting at 400 microvolts! Push the generator to maximum voltage!
MV: No! Stop it, Doctor! The circuit is pulling them in... they aren't just memories anymore! They are awake! They are standing behind you!
DR: What are you talking about? There is no one in this room but—
[Sound of high-voltage explosion, followed by shattering glass and simultaneous multi-voice shrieking]
[END OF RECORDING]`,
        uvSecretTitle: 'Burnt Tape Residue',
        uvSecretMessage: 'Chemical residue on the tape spool indicates the fire was started by deliberate arson with aviation fuel, not an electrical fault.',
        peopleInvolved: ['Dr. Alistair Ross', 'Marianne Vance', 'Eleanor Blackwood'],
        knownFacts: [
          'The watch used in the experiment was Julian’s broken watch from Blackwood Manor.',
          'Marianne correctly described Eleanor Blackwood’s exact burial circumstances before anyone knew.',
          'The Sanatorium went completely dark that night; thirty patients disappeared from locked wards.'
        ],
        unresolvedQuestions: [
          'Did the machine kill Marianne, or did the electrical surge tear open a gateway into the memories of the deceased?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_pocketwatch',
            relationType: 'Mentions',
            description: 'The silver watch tested in this audio session is the identical relic from Blackwood Manor.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_sj_nurse_confession',
        caseId: 'case_saint_jude',
        title: 'Nurse Beatrice Holt’s Hidden Confession',
        type: 'letter',
        date: 'October 30, 1962',
        locationFound: 'Electrotherapy Room Ventilation Grate',
        shortSnippet: 'A terrified confession written by Nurse Holt as the hospital caught fire.',
        description: 'Penciled on hospital intake slips, folded into a tight square.',
        fullContent: `God forgive us for what we helped him build.

Dr. Ross never wanted to heal these people. He called this place a 'Tuning Fork for the Dead'. When Marianne’s mind resonated with that poor woman’s watch, the whole building began to tremble. Lightbulbs exploded with blue fire.

I saw them in the corridor—shadows that had no bodies, walking through solid doors. When Dr. Ross tried to turn off the generator, his hands caught fire. He laughed as the flames took him.

I took the master keys. I unlocked as many cells as I could, but Ward 9 was welded shut from the outside. If anyone finds this: do not look for Marianne in the cemetery. She is still in the room. You can hear her when you turn on a radio.`,
        peopleInvolved: ['Nurse Beatrice Holt', 'Dr. Alistair Ross', 'Marianne Vance'],
        knownFacts: [
          'Dr. Ross died in the fire; his charred body was found near the transformer switch.',
          'Ward 9 remained welded shut until the demolition team entered in 1985.'
        ],
        unresolvedQuestions: [
          'Where did Nurse Holt flee after dropping the confession into the vent?'
        ],
        connections: [
          {
            targetClueId: 'clue_sj_audio_spool',
            relationType: 'Supports',
            description: 'Directly confirms the catastrophic climax recorded on tape spool 44.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      }
    ],
    conclusionQuestions: [
      {
        question: 'What caused the destruction of Ward 9 at Saint Jude Sanatorium?',
        options: [
          {
            id: 'opt_s1',
            text: 'A boiler explosion caused by neglected steam pipes.',
            correct: false,
            revealText: 'Incorrect. The boiler was intact in the south wing.'
          },
          {
            id: 'opt_s2',
            text: 'Dr. Ross overloaded experimental resonance equipment while forcing Patient 404 to channel the violent death of Eleanor Blackwood.',
            correct: true,
            revealText: 'Correct. The resonance machine caused the electrical detonation and psychic breach documented on Tape 44.'
          }
        ]
      }
    ],
    resolutionStory: 'The Resonance Tragedy: Dr. Alistair Ross turned Saint Jude into a dark harvesting ground for traumatic memory. Using Marianne Vance\'s unique psychic sensitivity, he attempted to materialize the dead through electromagnetic resonance. When he fed the psychic residue of Eleanor Blackwood\'s murder into the amplifier, the machine overloaded, electrocuting Marianne and triggering a firestorm that consumed the doctors and permanently imprinted their final moments into the crumbling concrete walls.'
  },
  {
    id: 'case_oakhaven',
    title: 'The Silent Bell of Class 3-B',
    deceasedName: 'Tommy Reyes & David Keller',
    lifespan: '1966 – 1978 / 1945 – 1978',
    yearOfIncident: '1978',
    primaryLocation: 'Oakhaven Academy Clocktower & Classrooms',
    summary: 'In the bitter winter of 1978, a twelve-year-old student and his young history teacher vanished during a weekend detention. When the school was searched, only their coats and an unfinished chalk sentence remained.',
    introNarrative: 'The halls of Oakhaven Academy echo with your footsteps. Rusting green lockers line the corridors. Inside Classroom 3-B, the blackboard still reads: "THE CLOCK HAS NO HANDS BUT IT STILL STRIKES". Desks are arranged in neat rows, covered in thirty years of bird feathers and fallen ceiling tiles.',
    unsolvedMystery: 'Why did history teacher David Keller bring Tommy Reyes up into the sealed clocktower on a freezing Saturday morning?',
    resolutionUnlocked: false,
    locations: [
      {
        id: 'loc_oa_class',
        name: 'Classroom 3-B',
        subtitle: 'Second Floor Hallway',
        era: '1970s Public School',
        atmosphereDescription: 'Chalk dust hanging in the pale winter light. Textbooks swollen with moisture. On the front teacher’s desk, an apple has withered into black dust.',
        ambientSoundType: 'school_bell',
        backgroundTheme: 'from-amber-950 via-stone-900 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_oa_yearbook',
            title: '1978 Class Yearbook on Shelf',
            x: 28,
            y: 48,
            clueId: 'clue_oa_yearbook',
            description: 'Yearbook open to Class 3-B. Tommy Reyes’s photo is violently slashed.',
            iconType: 'photo'
          },
          {
            id: 'hs_oa_chalkboard',
            title: 'Teacher’s Desk Gradebook',
            x: 62,
            y: 56,
            clueId: 'clue_oa_gradebook',
            description: 'A leather gradebook with cryptic notes written in red ink between homework marks.',
            iconType: 'document'
          }
        ]
      },
      {
        id: 'loc_oa_clocktower',
        name: 'The Clocktower Mechanism Room',
        subtitle: 'Roof Belfry, Above the Attic',
        era: 'Industrial Era Cast-Iron Gearing',
        atmosphereDescription: 'Massive iron pendulum frozen mid-swing. Through the broken face of the clock, icy wind howls over the snow-covered pine forest.',
        ambientSoundType: 'school_bell',
        backgroundTheme: 'from-neutral-950 via-zinc-900 to-slate-950',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_oa_bell_clapper',
            title: 'Iron Bell Clapper & Locker Key',
            x: 50,
            y: 62,
            clueId: 'clue_oa_bell_clapper',
            description: 'Resting on the floorboards beside the giant bronze bell is a heavy iron clapper tied to a frayed hemp rope and a student locker key.',
            iconType: 'relic'
          },
          {
            id: 'hs_oa_student_note',
            title: 'Carved Cipher on Bell Rim',
            x: 74,
            y: 45,
            clueId: 'clue_oa_cipher_note',
            description: 'Scratched into the century-old bronze with a compass point are names, dates, and train station coordinates.',
            iconType: 'document'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue_oa_yearbook',
        caseId: 'case_oakhaven',
        title: 'Class 3-B Yearbook (Tommy Reyes Slashed)',
        type: 'photograph',
        date: 'May 1978',
        locationFound: 'Classroom 3-B Bookshelf',
        shortSnippet: 'Yearbook with Tommy’s face scored through with razor cuts.',
        description: 'Under Tommy’s photo is the caption: "Aspires to be a railway conductor. Likes model clocks." Someone deliberately carved an \'X\' through his face with enough force to cut through three pages behind it.',
        uvSecretTitle: 'Fluorescent Fingerprint on Cover',
        uvSecretMessage: 'UV light reveals writing on the back inside cover: "HE FOUND WHAT MR. KELLER HID IN THE TICKET BOX AT RAVEN\'S CROSSING. WE CANNOT LET HIM TALK."',
        peopleInvolved: ['Tommy Reyes', 'David Keller', 'Principal Hawthorne'],
        knownFacts: [
          'Tommy was an orphan whose father died on the railroad.',
          'David Keller was his favorite teacher and track coach.'
        ],
        unresolvedQuestions: [
          'Who slashed Tommy’s photo, and why were they afraid of a railway ticket box?'
        ],
        connections: [
          {
            targetClueId: 'clue_rc_ticket_box',
            relationType: 'Mentions',
            description: 'References the ticket box at Raven’s Crossing Train Station.'
          }
        ],
        verified: true,
        discovered: true,
        isKeyClue: true
      },
      {
        id: 'clue_oa_gradebook',
        caseId: 'case_oakhaven',
        title: 'David Keller’s Red-Ink Journal & Gradebook',
        type: 'diary',
        date: 'December 1978',
        locationFound: 'Teacher’s Desk',
        shortSnippet: 'Teaching records that double as an investigation into local disappearances.',
        description: 'Behind the math and history marks are extensive notes Keller compiled on town records dating back to 1939.',
        fullContent: `December 4, 1978.
Tommy brought me something he found while exploring the old abandoned branch line behind the athletic field. It was an iron luggage tag stamped 'Raven's Crossing - Platform 4' and a small copper cylinder. 

When I cleaned the cylinder, I realized it was a phonograph recording dated September 1939. The voice on it wasn't a broadcast. It was a woman begging someone named Julian to spare her child.

Yesterday, Principal Hawthorne warned me to stop asking questions about the old sanitarium down the road. He said: 'Some histories are buried for the sanity of the living, Keller.' 

Tommy is terrified. He thinks someone has been watching his bedroom window. I am taking him to the clocktower on Saturday morning to hide the cylinder inside the belfry floor.`,
        uvSecretTitle: 'Blood Droplets on Final Margin',
        uvSecretMessage: 'Dried blood dots the margin next to the line: "THEY ARE COMING UP THE STAIRS NOW. SATURDAY 11:15 AM."',
        peopleInvolved: ['David Keller', 'Tommy Reyes', 'Principal Hawthorne', 'Julian Blackwood'],
        knownFacts: [
          'Keller’s car was found parked outside the school with the driver door standing open.',
          'Hawthorne was a member of the Blackwood Memorial Trust Board.'
        ],
        unresolvedQuestions: [
          'What happened inside the clocktower at 11:15 AM on that Saturday?'
        ],
        connections: [
          {
            targetClueId: 'clue_rc_cylinder',
            relationType: 'Mentions',
            description: 'Refers to the copper cylinder from Raven’s Crossing Platform 4.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_oa_bell_clapper',
        caseId: 'case_oakhaven',
        title: 'Detached Bell Clapper with Scratched Initials',
        type: 'relic',
        date: 'December 9, 1978',
        locationFound: 'Belfry Floorboards',
        shortSnippet: 'The heavy iron clapper removed from the bronze bell.',
        description: 'Weighs 15 pounds. Scratched near the pivot bolt are the initials: "T.R. + D.K. — WE HEARD THE TRAIN IN THE FOG".',
        peopleInvolved: ['Tommy Reyes', 'David Keller'],
        knownFacts: [
          'The school bell had not rung since 1978, as the clapper was unbolted.',
          'The branch railway line had been shut down and tracks pulled in 1940, making a train impossible.'
        ],
        unresolvedQuestions: [
          'Why did they hear a train when the tracks had been gone for forty years?'
        ],
        connections: [
          {
            targetClueId: 'clue_rc_log_book',
            relationType: 'Possibly related to',
            description: 'Connects to the mysterious ghost train runs recorded in the signal box.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: false
      },
      {
        id: 'clue_oa_cipher_note',
        caseId: 'case_oakhaven',
        title: 'Cipher Scratched into Bronze Bell',
        type: 'document',
        date: 'December 9, 1978',
        locationFound: 'Belfry Bell Rim',
        shortSnippet: 'Numbers indicating coordinates and dates: 1939 - 1954 - 1962 - 1978.',
        description: 'A timeline carved directly into the bell metal. It directly connects the four case years.',
        fullContent: `1939: Raven's Crossing (Clara Moreau)
1954: Blackwood Manor (Eleanor Sterling)
1962: Saint Jude Ward 9 (Marianne Vance)
1978: Oakhaven Belfry (Tommy & Keller)

"THE ARCHIVE REMEMBERS WHAT THE LIVING ERASE"`,
        peopleInvolved: ['David Keller', 'Tommy Reyes'],
        knownFacts: [
          'Proves David Keller discovered the chronological pattern connecting all four incidents.',
          'Directly points to the Memory Archive.'
        ],
        unresolvedQuestions: [
          'Where is the central archive where all these records converge?'
        ],
        connections: [
          {
            targetClueId: 'clue_ma_ledger_society',
            relationType: 'Mentions',
            description: 'Directly references the central archive and society.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      }
    ],
    conclusionQuestions: [
      {
        question: 'What happened to Tommy Reyes and David Keller in the Oakhaven clocktower?',
        options: [
          {
            id: 'opt_o1',
            text: 'They fell through the weakened floorboards while birdwatching.',
            correct: false,
            revealText: 'Incorrect. The floorboards were intact, and their blood was on the desk and bell.'
          },
          {
            id: 'opt_o2',
            text: 'They were cornered by agents of the Blackwood trust after uncovering the audio cylinder linking the 1939 train tragedy to the sanitarium.',
            correct: true,
            revealText: 'Correct. Keller discovered the continuous chain of crimes and was silenced before he could reach the press.'
          }
        ]
      }
    ],
    resolutionStory: 'The Belfry Silencing: David Keller and Tommy Reyes were not victims of simple foul play—they were amateur detectives who stumbled upon four decades of synchronized murder. By finding the 1939 copper cylinder at the train station, Tommy alerted the surviving trustees of the Blackwood-Saint Jude network. In the freezing belltower, Keller scratched the four dates into the bronze bell as a final testament, ensuring that whoever climbed to the belfry would realize the dead had been speaking across generations.'
  },
  {
    id: 'case_ravens_crossing',
    title: 'The Midnight Train to Nowhere',
    deceasedName: 'Clara Moreau (Opera Prodigy)',
    lifespan: '1915 – 1939',
    yearOfIncident: '1939',
    primaryLocation: 'Raven\'s Crossing Terminus & Platform 4',
    summary: 'On the eve of World War II, a midnight passenger train departed from Platform 4 into an autumn mist and never emerged from the Blackwood Quarry Tunnel. The engine, cars, and all eighty passengers evaporated.',
    introNarrative: 'A rusted sign hanging from chains reads: RAVEN\'S CROSSING — PLATFORM 4. Ivy has swallowed the benches. Old gas lamps with frosted green glass sway in the wind. A fog that never seems to lift hugs the rusted rails that lead straight into a collapsed mountain tunnel entrance.',
    unsolvedMystery: 'Where did the midnight train go when the switch was thrown toward the sealed quarry tunnel?',
    resolutionUnlocked: false,
    locations: [
      {
        id: 'loc_rc_platform',
        name: 'Platform 4 Waiting Room',
        subtitle: 'The Fog-Bound Terminus',
        era: 'Art Deco & Steam Era, 1930s',
        atmosphereDescription: 'Rotting wooden benches, rusted timetable boards displaying arrivals from September 1939. The smell of cold soot and stagnant rainwater.',
        ambientSoundType: 'train_chime',
        backgroundTheme: 'from-stone-950 via-zinc-950 to-neutral-900',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_rc_ticket_case',
            title: 'Mahogany Ticket Dispensary Box',
            x: 35,
            y: 50,
            clueId: 'clue_rc_ticket_box',
            description: 'A heavy brass-bound ticket box with a spring latch.',
            iconType: 'document'
          },
          {
            id: 'hs_rc_luggage_trunk',
            title: 'Abandoned Leather Wardrobe Trunk',
            x: 68,
            y: 65,
            clueId: 'clue_rc_clara_trunk',
            description: 'A French leather trunk monogrammed "C.M." with customs stamps from Paris, Vienna, and Milan.',
            iconType: 'relic'
          }
        ]
      },
      {
        id: 'loc_rc_signalbox',
        name: 'The Elevated Signal Box',
        subtitle: 'Tower Overlooking the Quarry Switch',
        era: '1939 Railway Signaling',
        atmosphereDescription: 'Row of twenty iron switch levers. The glass bay windows give a dizzying view of the dead tracks disappearing into the dark tunnel mouth.',
        ambientSoundType: 'train_chime',
        backgroundTheme: 'from-zinc-950 via-slate-900 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_rc_logbook',
            title: 'Signalman’s Logbook on Desk',
            x: 44,
            y: 52,
            clueId: 'clue_rc_log_book',
            description: 'A massive canvas-bound register open to the entry for September 2, 1939.',
            iconType: 'document'
          },
          {
            id: 'hs_rc_phonograph_cyl',
            title: 'Brass Phonograph Playback Horn',
            x: 75,
            y: 45,
            clueId: 'clue_rc_cylinder',
            description: 'A copper cylinder player with a grooved metallic spool loaded on the spindle.',
            iconType: 'relic'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue_rc_ticket_box',
        caseId: 'case_ravens_crossing',
        title: 'Unpunched Ticket #004 — Geneva Express',
        type: 'document',
        date: 'September 2, 1939',
        locationFound: 'Platform 4 Ticket Box',
        shortSnippet: 'First-class ticket issued to Clara Moreau for a train that vanished in the mist.',
        description: 'Printed on heavy vellum cardstock. The date stamped is September 2, 1939, 11:58 PM. Departure: Raven’s Crossing. Destination: Geneva via Dover.',
        peopleInvolved: ['Clara Moreau', 'Stationmaster Higgins'],
        knownFacts: [
          'War was declared the following day.',
          'The train never arrived at Dover; no wreckage was ever located in the quarry tunnel.'
        ],
        unresolvedQuestions: [
          'Why was Clara fleeing Europe on a midnight train with no luggage registered in the van?'
        ],
        connections: [
          {
            targetClueId: 'clue_rc_clara_trunk',
            relationType: 'Belongs to',
            description: 'Belonged to Clara Moreau whose trunk sat on the platform.'
          }
        ],
        verified: true,
        discovered: true,
        isKeyClue: true
      },
      {
        id: 'clue_rc_clara_trunk',
        caseId: 'case_ravens_crossing',
        title: 'Clara Moreau’s Stage Mask & Letters',
        type: 'relic',
        date: 'September 1939',
        locationFound: 'Platform 4 Bench',
        shortSnippet: 'Porcelain theatrical mask and a sealed letter addressed to the Blackwood family.',
        description: 'A hand-painted Venetian theater mask with gold leaf. Inside the silk lining is a letter revealing Clara was the illegitimate sister of Eleanor Blackwood.',
        fullContent: `To the Trustees of Blackwood Estate:

I am taking the midnight train from Raven's Crossing. I hold the original 1918 birth registry that proves our father recognized me before he died. Eleanor knows the truth and promised me my rightful share.

Julian has threatened me at the hotel. He said if I boarded the train with the birth cylinder, the train would never see the sunrise. I am terrified, but I cannot run forever.

Clara Moreau`,
        uvSecretTitle: 'Bloodied Wax Seal',
        uvSecretMessage: 'UV light exposes the postmark on the letter: Stamped at Raven\'s Crossing station ten minutes before the train departed.',
        peopleInvolved: ['Clara Moreau', 'Eleanor Blackwood', 'Julian Blackwood'],
        knownFacts: [
          'Clara was Eleanor Blackwood’s secret half-sister.',
          'Julian threatened Clara directly before she boarded.'
        ],
        unresolvedQuestions: [
          'Did Julian cause the train disappearance to prevent the family fortune from dividing?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_photo_family',
            relationType: 'Mentions',
            description: 'Explains the hidden inheritance conflict behind the Blackwood fortune.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_rc_log_book',
        caseId: 'case_ravens_crossing',
        title: 'Signal Tower Logbook (Altered Entry)',
        type: 'document',
        date: 'September 2–3, 1939',
        locationFound: 'Elevated Signal Box',
        shortSnippet: 'Signalman’s official register showing switch lever 7 was held by force.',
        description: 'The logbook notes: "23:59 — Special Midnight Express cleared on Track 4. 00:04 — Lever 7 pulled by order of Mr. J. Blackwood. Express diverted into Old Quarry Shaft 12. Explosive charges detonated in shaft entrance at 00:07."',
        peopleInvolved: ['Stationmaster Higgins', 'Julian Blackwood'],
        knownFacts: [
          'The train wasn\'t lost to the supernatural; it was deliberately diverted into a deep mining shaft and buried under 5,000 tons of dynamited rock.',
          'Julian Blackwood purchased the quarry mining rights the previous month.'
        ],
        unresolvedQuestions: [
          'Did any of the eighty passengers survive the blast in the deep chambers?'
        ],
        connections: [
          {
            targetClueId: 'clue_rc_cylinder',
            relationType: 'Occurred before',
            description: 'Explains the explosion recorded on the wax cylinder.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      },
      {
        id: 'clue_rc_cylinder',
        caseId: 'case_ravens_crossing',
        title: 'Copper Phonograph Cylinder #1939',
        type: 'audio_transcript',
        date: 'September 2, 1939',
        locationFound: 'Signal Box Phonograph Player',
        shortSnippet: 'Audio transcript of Clara’s final aria, ending in a thunderous cave-in.',
        description: 'A grooved copper phonograph cylinder recording Clara Moreau singing an aria from Carmen in the train carriage, suddenly interrupted by squealing steel brakes, a horrific concussion, and falling rock.',
        fullContent: `[PHONOGRAPH AUDIO RECONSTRUCTION]
CLARA: [Singing softly in French] 'L'amour est un oiseau rebelle...'
[Sudden violent metallic screeching of train brakes]
VOICE (Male, shouting): 'The switches! We're headed for the quarry wall!'
[Distant boom of dynamite charges, followed by the rumble of thousands of tons of rock collapsing onto the train roof]
CLARA: 'Mon Dieu... Julian has buried us...'
[Sound of breaking glass, darkness, silence]`,
        peopleInvolved: ['Clara Moreau', 'Julian Blackwood'],
        knownFacts: [
          'The cylinder was tossed from the observation car window before the entrance caved in.',
          'Found decades later by Tommy Reyes near the old branch line.'
        ],
        unresolvedQuestions: [
          'How many secrets did Julian Blackwood bury under the quarry rock?'
        ],
        connections: [
          {
            targetClueId: 'clue_oa_gradebook',
            relationType: 'Mentions',
            description: 'Identical to the cylinder Tommy Reyes brought to David Keller in 1978.'
          }
        ],
        verified: true,
        discovered: false,
        isKeyClue: true
      }
    ],
    conclusionQuestions: [
      {
        question: 'What was the true fate of the Midnight Train at Raven\'s Crossing in 1939?',
        options: [
          {
            id: 'opt_r1',
            text: 'It slipped through a spatial anomaly in the dense fog and vanished from reality.',
            correct: false,
            revealText: 'Incorrect. The train’s fate was grimly physical and premeditated.'
          },
          {
            id: 'opt_r2',
            text: 'Julian Blackwood ordered the track switch thrown and dynamited the quarry tunnel entrance, entombing Clara Moreau and eighty passengers to destroy her claim to the estate.',
            correct: true,
            revealText: 'Correct. The signal tower logbook and copper cylinder confirm the mass murder and catastrophic blast.'
          }
        ]
      }
    ],
    resolutionStory: 'The Quarry Tomb: The legend of the ghost train of Raven\'s Crossing was born of blood and greed. To prevent his wife\'s illegitimate sister, Clara Moreau, from claiming half of the Blackwood mining millions, Julian Blackwood orchestrated the ultimate erasure: bribing the signalman, diverting the train into a dormant mining shaft, and blowing the mountain down upon eighty innocent souls. For forty years, the valley whispered that the fog took them—until the copper cylinder sang their story once more.'
  },
  {
    id: 'case_memory_archive',
    title: 'The Vault of the Final Echo',
    deceasedName: 'The Forgotten Four & The Blackwood Dynasty',
    lifespan: '1939 – 1978',
    yearOfIncident: '1939–1978',
    primaryLocation: 'The Subterranean Archive of the Final Echo',
    summary: 'The secret underground chamber connecting all four tragedies. Here, an obsessive custodian preserved the artifacts, death masks, and recorded testimonies of those who were silenced across four decades.',
    introNarrative: 'Descending the stone spiral stairs deep beneath the foundations of the county records office, you enter an airtight vault lined with zinc shelves and brass card catalogs. Glass specimen jars hold personal items: a cracked watch, a magnetic tape, a copper cylinder, a slashed yearbook. The dead walk with you here, their whispered voices coalescing into a single, devastating truth.',
    unsolvedMystery: 'Who preserved this vault, and why did they collect the evidence of four decades of silenced lives?',
    resolutionUnlocked: false,
    locations: [
      {
        id: 'loc_ma_vault',
        name: 'The Vault of the Final Echo',
        subtitle: 'The Central Archive of the Dead',
        era: '1939–Present',
        atmosphereDescription: 'Rows of illuminated specimen cases and a large mahogany table covered in crime scene maps, pins, and red thread linking the four incidents.',
        ambientSoundType: 'archive_whisper',
        backgroundTheme: 'from-amber-950 via-zinc-950 to-black',
        unlocked: true,
        hotspots: [
          {
            id: 'hs_ma_ledger_society',
            title: 'Master Ledger of the Final Echo',
            x: 50,
            y: 48,
            clueId: 'clue_ma_ledger_society',
            description: 'A massive vellum folio cross-referencing all 4 cases and the ultimate fate of Julian Blackwood.',
            iconType: 'document'
          },
          {
            id: 'hs_ma_audio_terminal',
            title: 'Resonance Synthesis Phonograph',
            x: 78,
            y: 52,
            clueId: 'clue_ma_synthesis_relic',
            description: 'A machine designed to play the copper cylinder, magnetic tape, and audio fragments in harmony.',
            iconType: 'relic'
          }
        ]
      }
    ],
    clues: [
      {
        id: 'clue_ma_ledger_society',
        caseId: 'case_memory_archive',
        title: 'Master Register of the Final Echo Society',
        type: 'document',
        date: 'October 1979',
        locationFound: 'Vault Reading Desk',
        shortSnippet: 'The definitive chronological compilation proving Julian Blackwood\'s 40-year reign of terror.',
        description: 'Authored by Arthur Finch, the solicitor who spent his entire life hunting Julian after Eleanor died. Unable to convict Julian in corrupt courts, Finch formed a secret archive to document every life stolen.',
        fullContent: `RECORD OF THE FINAL ECHO
Curator: Arthur Finch, Solicitor (Ret.)

For forty years, Julian Blackwood operated above the law:
1. 1939: Dynamited the Raven's Crossing Quarry to murder Clara Moreau and conceal the Sterling birthright.
2. 1954: Poisoned and entombed his wife Eleanor in the Blackwood Manor cellar to seize the entire mining fortune.
3. 1962: Funded Dr. Alistair Ross's gruesome resonance torture at Saint Jude to ensure Marianne Vance's visions of Eleanor's ghost would never be believed.
4. 1978: Murdered teacher David Keller and young Tommy Reyes when they located the 1939 phonograph cylinder.

Julian died in his bed in 1982, surrounded by stolen gold, believing he had erased his victims. But a life cannot be burned away. Every word, every tear, every bloodstain is a frequency that waits in the walls for someone who has the courage to listen.

To whoever finds this archive: You are the voice of the dead now. Speak for them.`,
        peopleInvolved: ['Arthur Finch', 'Julian Blackwood', 'Eleanor Blackwood', 'Clara Moreau', 'Marianne Vance', 'David Keller', 'Tommy Reyes'],
        knownFacts: [
          'Arthur Finch collected every clue, letter, and relic over a 40-year secret investigation.',
          'Julian Blackwood died without facing a court of law, but his crimes are now irrevocably documented.'
        ],
        unresolvedQuestions: [
          'Will the living finally hear what the dead have walked you through?'
        ],
        connections: [
          {
            targetClueId: 'clue_bm_letter_solicitor',
            relationType: 'Created by',
            description: 'Addressed originally to Arthur Finch, who spent his life avenging Eleanor.'
          },
          {
            targetClueId: 'clue_rc_log_book',
            relationType: 'Supports',
            description: 'Directly validates the railway sabotage entry.'
          }
        ],
        verified: true,
        discovered: true,
        isKeyClue: true
      },
      {
        id: 'clue_ma_synthesis_relic',
        caseId: 'case_memory_archive',
        title: 'The Resonant Voice Matrix',
        type: 'relic',
        date: 'Present Day',
        locationFound: 'The Central Archive Pedestal',
        shortSnippet: 'A brass acoustic resonator that channels the voices of all who perished.',
        description: 'An intricate Victorian acoustic matrix combining copper phonograph diaphragms, vacuum tubes, and quartz prisms.',
        peopleInvolved: ['All Deceased'],
        knownFacts: [
          'Channels the AI Guide personality: "The Voice in the Static".',
          'Allows direct contact between the investigator and the memories of the deceased.'
        ],
        unresolvedQuestions: [
          'Is the AI Guide an algorithmic echo or the actual consciousness of the victims united?'
        ],
        connections: [],
        verified: true,
        discovered: true,
        isKeyClue: true
      }
    ],
    conclusionQuestions: [
      {
        question: 'What is the ultimate truth connecting all four tragedies?',
        options: [
          {
            id: 'opt_m1',
            text: 'They were unrelated accidents caused by the harsh climate and unstable mountain terrain.',
            correct: false,
            revealText: 'Incorrect. Every single case traces back to one man’s relentless greed.'
          },
          {
            id: 'opt_m2',
            text: 'Julian Blackwood committed serial slaughter across forty years to hoard the Sterling mining fortune, murdering family, patients, teachers, and children who threatened his secret.',
            correct: true,
            revealText: 'Correct. You have uncovered the entire tapestry of deception. The dead can finally rest.'
          }
        ]
      }
    ],
    resolutionStory: 'The Grand Revelation: The dead did not walk you through their world to terrorize you; they led you through the darkness so the light of truth could reach them at last. For four decades, Julian Blackwood bought constables, silenced doctors, and dynamited mountains to bury his sins. But matter and memory cannot be destroyed. By holding the pocket watch, reading Eleanor\'s unsent letter, listening to Marianne\'s static, decoding Keller\'s bell cipher, and uncovering Clara\'s midnight aria, you have broken their silence. Every life leaves behind a story waiting to be discovered—and now, their story will never be forgotten.'
  }
];

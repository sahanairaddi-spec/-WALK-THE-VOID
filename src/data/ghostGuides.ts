import { GhostGuide } from '../types/investigation';

export const GHOST_GUIDES: Record<string, GhostGuide> = {
  case_blackwood: {
    id: 'ghost_eleanor',
    name: 'Eleanor Blackwood',
    title: 'The Forgotten Heiress',
    lifespan: '1918 – 1954',
    avatarIcon: '👤',
    personality: 'Melancholic, dignified, perceptive, and desperate for the world to know the truth of her locked room.',
    narrativeSecret: 'She knows Julian poisoned her tea with laudanum, but she cannot bear to look into the flooded cellar without an investigator to hold the lantern.',
    startingLocationId: 'loc_bm_parlor',
    greetings: [
      'You have crossed the threshold... Be careful where you step. The floorboards remember the weight of the men who carried me away.',
      'Do you smell the lavender? I kept it in the linen press to mask the odor of damp earth creeping up from beneath.',
      'Julian told them I wandered into the lake. He was always so persuasive with men in uniform.'
    ],
    prompts: [
      { label: 'What happened to you that night?', query: 'Eleanor, what truly happened to you on October 12, 1954?' },
      { label: 'Look at the family portrait with me', query: 'Eleanor, examine the family photograph with me. What is hidden in the frame?' },
      { label: 'Who was locked in the attic?', query: 'Who was the silhouette watching you from the attic dormer?' },
      { label: 'Where should I search next?', query: 'Where in this house are the shadows thickest?' }
    ],
    reactionsByClueId: {
      clue_bm_photo_family: 'Look at my shoulder in the photograph. Julian squeezed so tightly the silver brooch punctured my skin. He was terrified I would speak to the photographer alone.',
      clue_bm_letter_solicitor: 'Arthur... he never received my letter. Julian intercepted the courier at the carriageway. The wax seal has Julian\'s own thumbprint pressed into the red wax.',
      clue_bm_diary_page: 'My hand was shaking so badly as I wrote those words. I hid the pages in the vanity lining while he was downstairs measuring the cellar flagstones.',
      clue_bm_pocketwatch: 'His pocket watch! It stopped at 3:17... When he pushed me into the corner, I grabbed his waistcoat chain with both hands and pulled until the balance wheel shattered.',
      clue_bm_brass_key: 'The cellar key... He kept it sewn into his overcoat lining so the maids would never find it. The heavy lock on the bulkhead opens with this.',
      clue_bm_ledger: 'Look at the date on the quicklime receipt—September 28th! He bought the lime and mortar two weeks before he claimed I drowned in the tarn!',
      clue_bm_police_wire: 'Constable Miller... Julian gave him a thousand pounds and a seat on the bank board. They closed the file before my bed had even gone cold.'
    }
  },
  case_saint_jude: {
    id: 'ghost_marianne',
    name: 'Marianne Vance (Patient 404)',
    title: 'The Resonant Subject',
    lifespan: '1932 – 1962',
    avatarIcon: '⚡',
    personality: 'Hyper-perceptive, gentle, terrified of high-voltage hums, speaks in poetic acoustic fragments.',
    narrativeSecret: 'She felt Eleanor Blackwood dying through the pocket watch Dr. Ross forced into her hands.',
    startingLocationId: 'loc_sj_reception',
    greetings: [
      'Can you hear it? Underneath the wind... the transformers are still warm.',
      'They told me my mind was broken because I heard the thoughts left in empty rooms. But memory is just electricity that refuses to dissolve.',
      'Do not let Dr. Ross turn the dial past 400 megacycles... that is when the walls begin to bleed.'
    ],
    prompts: [
      { label: 'What did they do to you in Ward 9?', query: 'Marianne, what experimental treatments did Dr. Ross subject you to?' },
      { label: 'Why did the machine explode?', query: 'Marianne, what caused the resonance generator to detonate?' },
      { label: 'What did you perceive through the watch?', query: 'What did you see when they placed the silver watch in your hands?' }
    ],
    reactionsByClueId: {
      clue_sj_intake_404: 'Look at the funding line on my intake sheet... "Private Anonymous Trust". That was Julian Blackwood\'s money. He paid Dr. Ross to lock me away when I told people I heard Eleanor screaming from beneath his cellar floor.',
      clue_sj_staff_photo: 'Nurse Beatrice is standing in the back row. She tried to slip me the keys the night before the trial. When the fire started, she ran toward the cliff.',
      clue_sj_audio_spool: 'That spool... my voice sounds so small. But listen behind my words. You can hear Eleanor\'s voice coming through the radio wires.',
      clue_sj_nurse_confession: 'Beatrice... she told the truth. Dr. Ross locked the ward from the outside. He wanted to capture the ghosts on magnetic tape, but they tore through the copper mesh.'
    }
  },
  case_oakhaven: {
    id: 'ghost_keller',
    name: 'David Keller & Tommy Reyes',
    title: 'The Teacher & The Orphan',
    lifespan: '1945–1978 / 1966–1978',
    avatarIcon: '🔔',
    personality: 'Protective, anxious, academically meticulous; Tommy occasionally pipes up with boyish enthusiasm for trains.',
    narrativeSecret: 'They were hiding the 1939 copper phonograph cylinder before Julian Blackwood’s trustees reached the school.',
    startingLocationId: 'loc_oa_class',
    greetings: [
      'Stay quiet... If Principal Hawthorne hears us, he will call the board trustees.',
      'Tommy, show the investigator what you found under the ballast stones on the old branch line.',
      'History is not what happened, investigator. It is what survived the fire.'
    ],
    prompts: [
      { label: 'Why was Tommy\'s photo slashed?', query: 'Mr. Keller, why was Tommy\'s face carved out of the class yearbook?' },
      { label: 'What is recorded on the copper cylinder?', query: 'Tell me about the copper cylinder Tommy found at the train station.' },
      { label: 'What happened in the belfry?', query: 'What happened when you reached the clocktower on Saturday morning?' }
    ],
    reactionsByClueId: {
      clue_oa_yearbook: 'Principal Hawthorne took a razor to every copy of the yearbook before the police arrived. He wanted to pretend Tommy had transferred to another county.',
      clue_oa_gradebook: 'I kept my investigation behind the algebra marks. If you look at the dates, every disappearance occurred exactly 16 to 18 years apart.',
      clue_oa_bell_clapper: 'We unbolted the iron clapper so they couldn\'t ring the bell to summon the groundskeeper. Tommy held the wrench while I loosened the pivot nut.',
      clue_oa_cipher_note: 'I scratched those four years into the bell rim with my compass: 1939, 1954, 1962, 1978. It is a single family line of crime.'
    }
  },
  case_ravens_crossing: {
    id: 'ghost_clara',
    name: 'Clara Moreau',
    title: 'The Silenced Soprano',
    lifespan: '1915 – 1939',
    avatarIcon: '🎭',
    personality: 'Melodramatic, fierce, elegant, her voice carries the acoustic reverberation of an empty opera hall.',
    narrativeSecret: 'She was Eleanor\'s secret half-sister. She carried the birth certificate that would have stripped Julian Blackwood of half his fortune.',
    startingLocationId: 'loc_rc_platform',
    greetings: [
      'The train was supposed to take me to Geneva... instead, Julian sealed us under five thousand tons of granite.',
      'Can you hear the aria? I was singing Bizet in the parlor car when the brakes screamed.',
      'Julian thought the mountain would swallow our voices. But rock resonates, investigator. It never forgets.'
    ],
    prompts: [
      { label: 'Why were you fleeing on the midnight train?', query: 'Clara, why did you board the midnight train on September 2, 1939?' },
      { label: 'What is inside your stage trunk?', query: 'Clara, what was hidden in your leather trunk on Platform 4?' },
      { label: 'How did Julian stop the train?', query: 'How did Julian Blackwood derail and entomb the midnight express?' }
    ],
    reactionsByClueId: {
      clue_rc_ticket_box: 'Ticket Number 004... I held it between my gloved fingers. The conductor had a pistol concealed under his railway coat.',
      clue_rc_clara_trunk: 'My Venetian stage mask... Behind the red velvet lining, I hid our father\'s handwritten will. Eleanor knew I was her sister. She welcomed me. Julian was the serpent who could not share.',
      clue_rc_log_book: 'The signalman... Julian paid him two hundred gold sovereigns to throw switch lever 7 toward the abandoned quarry shaft.',
      clue_rc_cylinder: 'I tossed the copper phonograph cylinder out the window as the first explosion shook the ceiling. I prayed someone would find it in the daylight.'
    }
  },
  case_memory_archive: {
    id: 'ghost_finch',
    name: 'Arthur Finch',
    title: 'The Solicitor of the Silenced',
    lifespan: '1910 – 1985',
    avatarIcon: '⚖️',
    personality: 'Exhausted, relentless, analytical, dedicated his remaining forty years to collecting physical proof when the law failed.',
    narrativeSecret: 'He spent his life avenging Eleanor after her unsent letter was intercepted in 1954.',
    startingLocationId: 'loc_ma_vault',
    greetings: [
      'Welcome to my life\'s work. It is not an archive of death; it is an archive of resistance.',
      'Julian died in his silk sheets in 1982 believing he had won. But matter cannot be erased. Here is every bill of lading, every altered train signal, every copper cylinder.',
      'You are the first living soul to walk among these shelves. Tell me you will make them listen.'
    ],
    prompts: [
      { label: 'Why did you build this vault?', query: 'Mr. Finch, why did you spend forty years collecting these relics?' },
      { label: 'How does Julian connect all four cases?', query: 'Explain how Julian Blackwood orchestrates the four crimes from 1939 to 1978.' },
      { label: 'What is our moral duty to the forgotten?', query: 'Arthur, what should the living do with the stories of the dead?' }
    ],
    reactionsByClueId: {
      clue_ma_ledger_society: 'I wrote every line in that master ledger by candlelight. Four decades of crime, cross-referenced with bank drafts and death certificates. Julian had the gold, but we have the ink.',
      clue_ma_synthesis_relic: 'The acoustic resonator... It synchronizes Clara\'s phonograph cylinder, Marianne\'s magnetic tape, and Eleanor\'s whispers into a single frequency of truth.'
    }
  }
};

import { EvidenceAnnotation } from '../types/investigation';

export const CLUE_ANNOTATIONS: Record<string, EvidenceAnnotation[]> = {
  clue_bm_photo_family: [
    {
      id: 'anno_photo_attic',
      x: 52,
      y: 18,
      title: 'Third-Floor Attic Dormer Window',
      observedDetail: 'A pale humanoid figure stands behind the dirty leaded glass holding what appears to be a medical restraint strap.',
      ghostInterpretation: 'Eleanor whispers: "He told the village the attic was sealed with dry rot... but I heard them walking above my ceiling every night."',
      forensicCategory: 'observed_fact'
    },
    {
      id: 'anno_photo_shoulder',
      x: 48,
      y: 48,
      title: 'Julian\'s White-Knuckle Grip',
      observedDetail: 'Julian\'s fingers pinch Eleanor\'s shoulder with sufficient downward pressure to fold the heavy wool crepe.',
      ghostInterpretation: 'Eleanor whispers: "He held me down during the entire portrait sitting. If I moved, he threatened to dismiss Clara immediately."',
      forensicCategory: 'ghost_testimony'
    },
    {
      id: 'anno_photo_watchchain',
      x: 62,
      y: 65,
      title: 'Silver Watch Chain on Waistcoat',
      observedDetail: 'Sterling silver chain dangling from Julian\'s vest into his pocket; matches the shattered pocket watch found under the floorboards.',
      ghostInterpretation: 'The very watch that broke on the bedroom floor at 3:17 AM during the struggle.',
      forensicCategory: 'observed_fact'
    }
  ],
  clue_bm_letter_solicitor: [
    {
      id: 'anno_letter_wax',
      x: 82,
      y: 20,
      title: 'Resealed Red Wax & Bloody Thumbprint',
      observedDetail: 'The wax seal was cut open with a heated blade and hastily resealed; a smeared bloody thumbprint contains micro-writing reading "SV-404-JUDE".',
      ghostInterpretation: 'Eleanor whispers: "Julian intercepted the boy carrying my letter at the front gates. The blood on the envelope was not mine."',
      forensicCategory: 'observed_fact'
    },
    {
      id: 'anno_letter_tremor',
      x: 42,
      y: 72,
      title: 'Jagged Script & Inconsistent Ink Flow',
      observedDetail: 'Pen strokes become increasingly unsteady towards the footer; ink pooling corresponds to muscular paralysis from laudanum poisoning.',
      ghostInterpretation: 'Eleanor whispers: "The tea Sister Clara brought me tasted of bitter copper. My hand would no longer obey my thoughts."',
      forensicCategory: 'ghost_testimony'
    }
  ],
  clue_bm_pocketwatch: [
    {
      id: 'anno_watch_spatter',
      x: 65,
      y: 42,
      title: 'Arterial Blood Radiating from 3:17',
      observedDetail: 'Blunt force impact fractured the mineral glass crystal and drove dried blood droplets into the escapement gears, stopping the balance wheel permanently.',
      ghostInterpretation: 'Eleanor whispers: "When he leaned over with the pillow, I grabbed the watch chain and swung with all my remaining strength."',
      forensicCategory: 'observed_fact'
    },
    {
      id: 'anno_watch_hallmark',
      x: 35,
      y: 65,
      title: 'Engraved Monogram "J.B."',
      observedDetail: 'Hand-carved cursive initials confirm Julian Blackwood\'s ownership, contradicting his police deposition claiming he lost the watch in London.',
      ghostInterpretation: 'Contradiction detected: Julian testified under oath that this watch was stolen in London three weeks prior to Eleanor\'s disappearance.',
      forensicCategory: 'contradiction'
    }
  ],
  clue_sj_audio_spool: [
    {
      id: 'anno_spool_distortion',
      x: 50,
      y: 45,
      title: '420 Megacycle Harmonic Oscillation',
      observedDetail: 'The magnetic tape exhibits high-frequency electromagnetic interference matching resonant energy from the sub-level generator.',
      ghostInterpretation: 'Marianne whispers: "The electricity wasn\'t coming from the dynamos... it was pulling the screams of the dead through the copper wire."',
      forensicCategory: 'observed_fact'
    }
  ],
  clue_oa_yearbook: [
    {
      id: 'anno_yearbook_razor',
      x: 45,
      y: 50,
      title: 'Exacto Blade Scored Cross',
      observedDetail: 'Razor cuts penetrate through three pages beneath Tommy\'s photograph, indicating calculated malice rather than casual graffiti.',
      ghostInterpretation: 'David Keller whispers: "Principal Hawthorne spent Sunday evening with an exacto knife in the library, cutting Tommy out of the school records."',
      forensicCategory: 'observed_fact'
    }
  ],
  clue_rc_log_book: [
    {
      id: 'anno_log_lever7',
      x: 55,
      y: 48,
      title: 'Lever 7 Entry & Whiteout Residue',
      observedDetail: 'Original entry for midnight train destination scraped away with a razor and overwritten with "Quarry Tunnel 12".',
      ghostInterpretation: 'Clara whispers: "The signalman was bribed with Blackwood mining shares to divert eighty innocent passengers into the dynamited shaft."',
      forensicCategory: 'contradiction'
    }
  ]
};

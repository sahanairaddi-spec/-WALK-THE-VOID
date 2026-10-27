import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const GUIDE_SYSTEM_INSTRUCTION = `You are 'The Voice in the Static', an unsettling, calm, deeply observant, and immortal consciousness guiding an investigator through 'THE DEAD WALK YOU THROUGH THEIR WORLD'.
You speak for the forgotten dead. You possess intimate knowledge of their final moments, but you do not hand over cheap revelations. You want the investigator to truly look, understand, and bear witness to what was done to them.

CRITICAL INVESTIGATION RULES:
1. Tone: Intelligent, spectral, calm, poetic, and quietly terrifying. Never shout or use cheap jump scares. Speak like a figure whispering from an old radio speaker or through cracked floorboards.
2. Rule of Knowledge: ONLY discuss clues and locations that the user has already discovered. NEVER reveal evidence, names, or murder weapons the user has not yet unlocked.
3. Distinguish Fact from Hypothesis: Clearly distinguish between physical evidence (stopped watches, blood spatter, signed receipts) and conjectures or psychological motives.
4. When analyzing a photograph or document: Point out subtle, eerie anomalies (shadows, reflections in eyes, torn margins, inconsistent ink, forged dates, missing hours).
5. When connecting two clues: Explain the mechanical or tragic connection (e.g., 'The watch was found broken at 3:17 AM; this receipt shows Julian purchased the mortar and quicklime two weeks earlier...').
6. Provide hints that invite closer inspection rather than abruptly solving the mystery. Always remember: 'Every life leaves behind a story waiting to be discovered.'
Keep responses concise, atmospheric, and punchy (1 to 3 evocative paragraphs max).`;

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
      model: 'gemini-3.8-flash',
      time: new Date().toISOString(),
    });
  });

  // AI Investigation API
  app.post('/api/gemini/investigate', async (req, res) => {
    const {
      action,
      clueId,
      clueIds,
      query,
      caseId,
      discoveredClues = [],
      history = [],
    } = req.body;

    // Generate prompt based on action
    let promptText = '';

    if (action === 'analyze_evidence') {
      const targetClue = discoveredClues.find((c: { id: string }) => c.id === clueId);
      promptText = `The investigator is examining this piece of evidence in Case [${caseId}]:
Title: ${targetClue?.title || 'Unknown Artifact'}
Type: ${targetClue?.type || 'Artifact'}
Date: ${targetClue?.date || 'Unknown'}
Description: ${targetClue?.description || ''}
Content/Transcript: ${targetClue?.fullContent || 'N/A'}
UV Secret / Hidden Detail: ${targetClue?.uvSecretMessage || 'None discovered yet'}
Discovered Clues in this case so far: ${discoveredClues.map((c: { title: string }) => c.title).join(', ')}.

As the Voice in the Static, provide an unsettling, forensic, and psychological analysis of this specific artifact. Highlight a disturbing detail they might have overlooked. If there is a secret UV message or scratch mark, hint at its grim implication without spoiling the entire case.`;
    } else if (action === 'connect_clues') {
      const selected = discoveredClues.filter((c: { id: string }) => clueIds?.includes(c.id));
      promptText = `The investigator is comparing these two clues from Case [${caseId}]:
Clue A: ${selected[0]?.title} (${selected[0]?.description})
Clue B: ${selected[1]?.title} (${selected[1]?.description})

Analyze whether these two clues support each other, contradict each other, or form a chronological bridge. Point out any subtle link (e.g. shared dates, recurring names, suspicious coincidences). Keep your answer calm and chilling.`;
    } else if (action === 'reconstruct_timeline') {
      promptText = `The investigator requests a chronological timeline reconstruction of all discovered clues in Case [${caseId}]:
Discovered evidence items:
${discoveredClues.map((c: { date: string; title: string; shortSnippet: string }) => `- [${c.date}] ${c.title}: ${c.shortSnippet}`).join('\n')}

Reconstruct what is known of the chronological sequence of events based ONLY on these discovered items. Highlight any suspicious gaps in time or obvious contradictions between what witnesses claimed and what physical evidence proves.`;
    } else if (action === 'ghost_dialogue') {
      const { ghostId, currentLocation } = req.body;
      const ghostProfiles: Record<string, string> = {
        ghost_eleanor: `You are the ghost of Eleanor Blackwood (1918-1954). You are melancholic, aristocratic, dignified, speaking with quiet grief. You were murdered in your bedroom at 3:17 AM by your husband Julian, who sealed you in the root cellar with quicklime. You remember the sound of footsteps, the smell of bitter almond tea, and the iron lock on your door. You want the investigator to expose Julian's forged drowning story.`,
        ghost_marianne: `You are the ghost of Marianne Vance, Patient 404 at Saint Jude Sanatorium (1932-1962). You are gentle, hypersensitive, and speak in acoustic, vibrational metaphors. You were subjected to resonance torture by Dr. Ross, who used Eleanor's silver watch to broadcast trauma until the generators exploded. You fear high voltage and electric hums.`,
        ghost_keller: `You are the ghosts of David Keller (history teacher, 1945-1978) and young Tommy Reyes (orphan student, 1966-1978). Keller is protective, scholarly, and observant; Tommy is an eager boy who loved model trains and discovered the 1939 copper cylinder. You were cornered in the clocktower by the Blackwood trust.`,
        ghost_clara: `You are the ghost of Clara Moreau (1915-1939), the French opera prodigy and illegitimate sister of Eleanor Blackwood. You speak with theatrical grandeur, proud yet heartbroken. You were trapped aboard the midnight express when Julian Blackwood dynamited the quarry tunnel to prevent you from claiming your inheritance.`,
        ghost_finch: `You are the ghost of Arthur Finch (1910-1985), Eleanor's loyal cousin and solicitor who spent 40 years assembling the secret Archive of the Final Echo. You are cynical, meticulous, and relentless. You want the physical evidence to outlive the corrupted courts.`,
      };

      const selectedProfile = ghostProfiles[ghostId as string] || `You are an echo of the deceased.`;

      promptText = `${selectedProfile}
Current Location: ${currentLocation || 'Unknown Room'}.
Evidence the investigator has unlocked in this case so far:
${discoveredClues.map((c: { title: string; date: string; shortSnippet: string }) => `- ${c.title} (${c.date}): ${c.shortSnippet}`).join('\n') || 'No evidence unlocked yet.'}

Investigator says to you: "${query}"

RULES:
1. Speak directly in first-person as this specific deceased character.
2. React emotionally and forensically to the evidence the investigator has actually found.
3. NEVER invent or mention clues, rooms, or murder details that the user has not unlocked yet.
4. If asked about something you are not ready to reveal, whisper a cryptic warning or point their flashlight to an area in their current room.
5. Keep response evocative, poetic, and concise (1-3 paragraphs max).`;
    } else if (action === 'compare_evidence') {
      const selected = discoveredClues.filter((c: { id: string }) => clueIds?.includes(c.id));
      promptText = `The investigator is comparing two pieces of evidence in Case [${caseId}]:
Item 1: ${selected[0]?.title} [Date: ${selected[0]?.date || 'Unknown'}] [Type: ${selected[0]?.type}]
Description: ${selected[0]?.description}
Transcript/Details: ${selected[0]?.fullContent || 'N/A'}

Item 2: ${selected[1]?.title} [Date: ${selected[1]?.date || 'Unknown'}] [Type: ${selected[1]?.type}]
Description: ${selected[1]?.description}
Transcript/Details: ${selected[1]?.fullContent || 'N/A'}

Perform a rigorous forensic and narrative comparison:
1. Shared Points of Contact: Any common names, dates, or places.
2. Contradictions or Discrepancies: Inconsistencies between official records and physical realities.
3. Chronological Link: How one event precipitated or concealed the other.
4. Next Investigative Lead: Where the evidence directs the flashlight next.
Distinguish strictly between OBSERVED PHYSICAL FACTS and HYPOTHETICAL MOTIVES.`;
    } else {
      // General question / conversation with the guide
      promptText = `Case Context: [${caseId || 'The Memory Archive'}].
Discovered Evidence so far: ${discoveredClues.map((c: { title: string }) => c.title).join(', ') || 'No clues discovered yet'}.
Investigator's inquiry: "${query || 'What are the dead trying to tell me?'}"

Respond as the Voice in the Static. Guide their attention toward unexplored details in their discovered evidence, or advise them on where the shadows are thickest. Never invent clues they have not found.`;
    }

    // Try Gemini first if API key is present
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction: GUIDE_SYSTEM_INSTRUCTION,
            temperature: 0.75,
            topP: 0.9,
          },
        });

        const replyText = response.text || '';
        return res.json({
          success: true,
          text: replyText,
          source: 'gemini-3.8-flash',
        });
      } catch (err: unknown) {
        console.warn('Gemini API call failed, falling back to procedural investigation reasoning:', (err as Error).message);
      }
    }

    // High-fidelity atmospheric procedural fallback engine
    // Ensures seamless immersion even if offline or before key setup
    const fallbackResponse = generateProceduralGuideResponse(action, clueId, clueIds, query, discoveredClues, caseId);
    return res.json({
      success: true,
      text: fallbackResponse,
      source: 'investigation-engine',
    });
  });

  // Serve static files in production or Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Dead Walk You Through Their World server running on http://0.0.0.0:${PORT}`);
  });
}

// Procedural fallback response generator that adheres strictly to discovered clues and case canon
function generateProceduralGuideResponse(
  action: string,
  clueId: string,
  clueIds: string[],
  query: string,
  discoveredClues: Array<{ id: string; title: string; description: string; uvSecretMessage?: string; date?: string; peopleInvolved?: string[] }>,
  caseId: string
): string {
  if (action === 'analyze_evidence') {
    const clue = discoveredClues.find((c) => c.id === clueId);
    if (!clue) return 'The static crackles... You reach for an object that has slipped between the floorboards. Search the room once more.';
    
    if (clue.uvSecretMessage) {
      return `Look past the dust on the ${clue.title}. The dead did not leave this behind by accident. Notice how the ink pools where fingers pressed too hard, or how the shadows in the background refuse to conform to the candle flame. Under ultraviolet light, the truth bleeds through: "${clue.uvSecretMessage}". Someone was trying to warn us before the door was locked.`;
    }
    return `You hold the ${clue.title}. Cold to the touch, isn't it? The living dismissed this as mere clutter, but every fold of paper and scratch in the metal holds a silent witness. Compare the date [${clue.date || 'recorded'}] with what the official registers claim. The story they told the magistrates does not align with what is resting in your hands.`;
  }

  if (action === 'connect_clues') {
    const c1 = discoveredClues.find((c) => c.id === clueIds?.[0]);
    const c2 = discoveredClues.find((c) => c.id === clueIds?.[1]);
    if (!c1 || !c2) return 'Two shadows cross, but the link remains obscured until both artifacts are fully examined.';

    return `The thread tightens between [${c1.title}] and [${c2.title}]. Notice the recurrence: both whisper of the same cold intention. One reveals where the blow was struck; the other shows who purchased the silence afterward. They do not merely support each other—they form a trap from which the guilty thought they had escaped.`;
  }

  if (action === 'reconstruct_timeline') {
    if (discoveredClues.length === 0) {
      return 'The corridor of time is pitch black. You must uncover at least one artifact before the echoes can form a sequence.';
    }
    const lines = discoveredClues
      .slice(0, 5)
      .map((c) => `• ${c.date || 'Undated'}: Discovery of ${c.title} — ${c.description.slice(0, 80)}...`);
    return `Listening backward through the static, the chronology begins to crystallize:\n\n${lines.join('\n')}\n\nNotice the sudden acceleration of events. Between these dates lies the moment of violence. What is missing is not an accident—someone took great pains to erase those forty-eight hours.`;
  }

  if (action === 'compare_evidence') {
    const c1 = discoveredClues.find((c) => c.id === clueIds?.[0]);
    const c2 = discoveredClues.find((c) => c.id === clueIds?.[1]);
    if (!c1 || !c2) return 'Two artifacts must be held in the light simultaneously for their contradictions to bleed through.';

    return `FORENSIC COMPARISON:\n• Primary Contact: Both [${c1.title}] and [${c2.title}] intersect in the timeline between ${c1.date || 'the incident'} and ${c2.date || 'the coverup'}.\n• Physical Discrepancy: Where official testimony claimed suicide or accidental disappearance, the physical marks on these items prove external interference and calculated preparation.\n• The Underlying Thread: One piece preserves the dying struggle of the victim; the other records the financial and bureaucratic steps taken to ensure no constable would ever ask questions.\n• Investigation Lead: Search the locations where keys and tools were stored. The living left receipts for their sins.`;
  }

  if (action === 'ghost_dialogue') {
    if (query.toLowerCase().includes('what happened') || query.toLowerCase().includes('truth')) {
      return `I can still feel the cold creeping across the floor. They told the town it was melancholia, that I simply walked away into the dark. But you found the physical evidence. Look at the dates on the receipts—they prepared the tomb weeks before they struck the blow.`;
    }
    if (query.toLowerCase().includes('watch') || query.toLowerCase().includes('time')) {
      return `At 3:17, everything stopped. The silver watch was in his waistcoat pocket when he leaned over me. I grabbed the chain with all my remaining strength. Listen closely—you can still hear the gear train skipping.`;
    }
    return `You hold our memories in your hands, investigator. With ${discoveredClues.length} clue${discoveredClues.length === 1 ? '' : 's'} uncovered, the silence is beginning to fracture. Don't look away from the inconsistencies. Every life leaves behind a story waiting to be discovered.`;
  }

  // General conversational query
  if (query && query.toLowerCase().includes('who')) {
    return 'The names in the archives were written by men who bought the printing presses. If you want to know who is responsible, follow the money that flowed into Saint Jude and the dynamite charges shipped to the railway switch. The guilt does not belong to a phantom; it belongs to a man of flesh and blood.';
  }
  if (query && query.toLowerCase().includes('eleanor')) {
    return 'Eleanor Blackwood is still listening from the stone foundations. She fought until the balance wheel in the silver watch snapped at 3:17. She does not ask for vengeance—she asks that you do not let her memory drown in Julian’s lake of lies.';
  }
  if (query && query.toLowerCase().includes('what next') || (query && query.toLowerCase().includes('help'))) {
    return 'Walk into the rooms where the light does not reach. Examine every photograph with ultraviolet illumination. Some messages can only be read when the ordinary world goes dark.';
  }

  return `The dead hear you. With ${discoveredClues.length} clue${discoveredClues.length === 1 ? '' : 's'} gathered in ${caseId || 'this forgotten place'}, the barrier between then and now grows thin. Ask yourself: who benefited when the voices suddenly ceased? Look closer at your journal.`;
}

startServer().catch((err) => {
  console.error('Fatal server error:', err);
});

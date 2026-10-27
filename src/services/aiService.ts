import { ClueItem } from '../types/investigation';

export interface AIInvestigateParams {
  action: 'chat' | 'analyze_evidence' | 'connect_clues' | 'reconstruct_timeline' | 'solve_case' | 'ghost_dialogue' | 'compare_evidence';
  clueId?: string;
  clueIds?: string[];
  query?: string;
  caseId?: string;
  ghostId?: string;
  currentLocation?: string;
  discoveredClues?: ClueItem[];
}

export interface AIInvestigateResponse {
  success: boolean;
  text: string;
  source: 'gemini-3.8-flash' | 'investigation-engine';
}

export async function askAIGuide(params: AIInvestigateParams): Promise<AIInvestigateResponse> {
  try {
    const res = await fetch('/api/gemini/investigate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    console.error('AI Guide fetch failed, using local fallback:', err);
    return {
      success: true,
      text: 'The static hums softly... The connection across the veil falters, but the clues in your journal remain etched in stone. Return to the documents and look where the signatures do not match.',
      source: 'investigation-engine',
    };
  }
}

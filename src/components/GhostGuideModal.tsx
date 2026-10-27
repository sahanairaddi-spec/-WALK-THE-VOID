import React, { useState } from 'react';
import { CaseFile, GhostGuide, AIInvestigationMessage } from '../types/investigation';
import { askAIGuide } from '../services/aiService';
import { soundEngine } from '../services/soundService';
import { X, Send, Sparkles } from 'lucide-react';

interface GhostGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseFile: CaseFile;
  ghostGuide: GhostGuide;
  currentLocationName: string;
  onAddMessage: (msg: AIInvestigationMessage) => void;
  messages: AIInvestigationMessage[];
}

export const GhostGuideModal: React.FC<GhostGuideModalProps> = ({
  isOpen,
  onClose,
  caseFile,
  ghostGuide,
  currentLocationName,
  onAddMessage,
  messages,
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const discoveredClues = caseFile.clues.filter((c) => c.discovered);
  const ghostMessages = messages.filter((m) => !m.ghostId || m.ghostId === ghostGuide.id);

  const handleSendGhostQuery = async (queryText?: string) => {
    const query = queryText || inputText.trim();
    if (!query || isLoading) return;

    soundEngine.playClick();
    setInputText('');

    const userMsg: AIInvestigationMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      ghostId: ghostGuide.id,
      ghostName: ghostGuide.name,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddMessage(userMsg);
    setIsLoading(true);

    try {
      const response = await askAIGuide({
        action: 'ghost_dialogue',
        ghostId: ghostGuide.id,
        currentLocation: currentLocationName,
        query,
        caseId: caseFile.id,
        discoveredClues,
      });

      soundEngine.playGhostWhisper();

      const ghostMsg: AIInvestigationMessage = {
        id: `msg_g_${Date.now()}`,
        sender: 'guide',
        ghostId: ghostGuide.id,
        ghostName: ghostGuide.name,
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onAddMessage(ghostMsg);
    } catch {
      onAddMessage({
        id: `msg_err_${Date.now()}`,
        sender: 'guide',
        ghostId: ghostGuide.id,
        ghostName: ghostGuide.name,
        text: 'The spectral frequency flickers and fades... I cannot speak past the static until you uncover the next artifact in this room.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0b0c13] border border-red-950/80 rounded-xl shadow-[0_0_60px_rgba(185,28,28,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-950/70 border border-red-700/80 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(185,28,28,0.5)] animate-pulse">
              {ghostGuide.avatarIcon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base font-bold text-stone-100">
                  {ghostGuide.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400">
                  {ghostGuide.lifespan}
                </span>
              </div>
              <p className="text-[11px] font-typewriter text-red-400/90 italic">
                {ghostGuide.title} • Haunting {currentLocationName}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Personality & Narrative Whisper Box */}
        <div className="px-5 py-3 bg-red-950/20 border-b border-red-900/30 text-xs font-typewriter text-stone-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-red-300 font-bold block mb-0.5">Presence in the Shadows:</span>
            <span>{ghostGuide.personality} {ghostGuide.narrativeSecret}</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[380px]">
          {/* Initial Greeting from Guide */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-red-400">
              <span>{ghostGuide.name}</span>
              <span>• Spectral Memory</span>
            </div>
            <div className="p-4 rounded-lg bg-stone-900/90 border border-red-950 text-stone-200 font-typewriter text-xs leading-relaxed max-w-[92%] shadow-md">
              {ghostGuide.greetings[0]}
            </div>
          </div>

          {/* Render past interaction messages */}
          {ghostMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-stone-500">
                <span>{msg.sender === 'user' ? 'Investigator' : ghostGuide.name}</span>
                <span>• {msg.timestamp}</span>
              </div>
              <div
                className={`p-3.5 rounded-lg text-xs leading-relaxed max-w-[90%] ${
                  msg.sender === 'user'
                    ? 'bg-stone-800 text-stone-100 font-sans border border-stone-700'
                    : 'bg-stone-900/90 border border-red-900/40 text-stone-200 font-typewriter shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded bg-stone-950 border border-stone-850 text-xs font-mono text-stone-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="italic">{ghostGuide.name} is speaking from the cold...</span>
            </div>
          )}
        </div>

        {/* Quick Clickable Conversation Prompts */}
        <div className="px-4 py-2.5 bg-stone-950 border-t border-stone-850 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono uppercase text-stone-500 shrink-0">Inquire:</span>
          {ghostGuide.prompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendGhostQuery(prompt.query)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-red-800/80 text-[11px] font-mono text-stone-300 hover:text-stone-100 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Freeform Natural Language Query Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendGhostQuery();
          }}
          className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Speak with ${ghostGuide.name} in this room...`}
            className="flex-1 bg-stone-900 border border-stone-750 rounded px-3 py-2 text-xs font-typewriter text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-red-950 hover:bg-red-900 text-red-200 rounded border border-red-800 disabled:opacity-50 transition-colors"
            title="Ask Ghost"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

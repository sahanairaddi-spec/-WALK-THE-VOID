import React, { useState, useRef, useEffect } from 'react';
import { CaseFile, AIInvestigationMessage, ClueItem } from '../types/investigation';
import { askAIGuide } from '../services/aiService';
import { soundEngine } from '../services/soundService';
import { 
  X, 
  Send, 
  Sparkles, 
  Radio, 
  Compass, 
  HelpCircle, 
  Clock, 
  AlertCircle,
  Skull
} from 'lucide-react';

interface AIGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: CaseFile;
  messages: AIInvestigationMessage[];
  onAddMessage: (msg: AIInvestigationMessage) => void;
  selectedClueId?: string | null;
  onOpenClueViewer: (clue: ClueItem) => void;
}

export const AIGuideDrawer: React.FC<AIGuideDrawerProps> = ({
  isOpen,
  onClose,
  currentCase,
  messages,
  onAddMessage,
  selectedClueId,
  onOpenClueViewer,
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const discoveredClues = currentCase.clues.filter((c) => c.discovered);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query || isLoading) return;

    soundEngine.playClick();
    setInputText('');

    const userMsg: AIInvestigationMessage = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddMessage(userMsg);
    setIsLoading(true);

    try {
      const response = await askAIGuide({
        action: 'chat',
        query,
        caseId: currentCase.id,
        discoveredClues,
      });

      soundEngine.playGhostWhisper();

      const aiMsg: AIInvestigationMessage = {
        id: `msg_g_${Date.now()}`,
        sender: 'guide',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onAddMessage(aiMsg);
    } catch {
      onAddMessage({
        id: `msg_err_${Date.now()}`,
        sender: 'guide',
        text: 'The static overwhelms the receiver... The memories remain in the walls. Return to the documents and look where the signatures do not match.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'What am I overlooking in this case?',
    'Are there contradictions in what the authorities claimed?',
    'What connects the dates across these tragedies?',
    'What is the meaning of the UV marks?',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0a0b10] border-l border-stone-800 shadow-2xl flex flex-col backdrop-blur-xl">
      {/* Drawer Header */}
      <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-red-950/70 border border-red-800 flex items-center justify-center">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-cinzel text-sm font-bold text-stone-100 flex items-center gap-1.5">
              <span>The Voice in the Static</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </h3>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
              Gemma 4 Forensic Engine • Active
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          title="Close Guide"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && (
          <div className="p-4 bg-stone-900/40 rounded border border-stone-850 text-center space-y-3 my-6">
            <Skull className="w-8 h-8 text-red-500/60 mx-auto" />
            <p className="font-cinzel text-xs font-semibold text-stone-300">
              The Dead Are Listening
            </p>
            <p className="font-typewriter text-[11px] text-stone-400 leading-relaxed">
              Ask about discrepancies, hidden meanings in discovered letters, or where to direct your flashlight next. The Voice will guide your eyes, but you must reach your own conclusions.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-stone-500">
              <span>{msg.sender === 'user' ? 'Investigator' : 'The Voice'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-lg text-xs leading-relaxed max-w-[90%] ${
                msg.sender === 'user'
                  ? 'bg-stone-800 text-stone-100 font-sans border border-stone-700'
                  : 'bg-gradient-to-br from-red-950/40 via-stone-900/90 to-stone-950 text-stone-200 font-typewriter border border-red-900/50 shadow-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded bg-stone-950 border border-stone-850 text-xs font-mono text-stone-400">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="italic">The static stirs... translating frequency...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Suggestions */}
      <div className="px-3 py-2 bg-stone-950 border-t border-stone-850 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-850 border border-stone-800 text-[11px] font-mono text-stone-300 hover:text-stone-100 whitespace-nowrap transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Consult the dead or question an anomaly..."
          className="flex-1 bg-stone-900 border border-stone-750 rounded px-3 py-2 text-xs font-typewriter text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-red-600"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="p-2 bg-red-950 hover:bg-red-900 text-red-200 rounded border border-red-800 disabled:opacity-50 transition-colors"
          title="Send Query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

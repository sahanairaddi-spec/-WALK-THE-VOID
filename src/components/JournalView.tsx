import React, { useState } from 'react';
import { CaseFile, ClueItem, JournalNote } from '../types/investigation';
import { soundEngine } from '../services/soundService';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  Plus, 
  Trash2, 
  Award, 
  AlertTriangle,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface JournalViewProps {
  currentCase: CaseFile;
  notes: JournalNote[];
  onAddNote: (text: string) => void;
  onDeleteNote: (noteId: string) => void;
  onOpenClueViewer: (clue: ClueItem) => void;
  onSolveCase: (answers: Record<number, string>) => void;
  onAskAIReconstruct: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  currentCase,
  notes,
  onAddNote,
  onDeleteNote,
  onOpenClueViewer,
  onSolveCase,
  onAskAIReconstruct,
}) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [deductionFeedback, setDeductionFeedback] = useState<string | null>(null);

  const discoveredClues = currentCase.clues.filter((c) => c.discovered);

  // Sort discovered clues into chronological order
  const timelineClues = [...discoveredClues].sort((a, b) => {
    return a.date.localeCompare(b.date);
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    soundEngine.playPaperRustle();
    onAddNote(newNoteText.trim());
    setNewNoteText('');
  };

  const handleSelectAnswer = (qIndex: number, optionId: string) => {
    soundEngine.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionId,
    }));
  };

  const handleSubmitDeduction = () => {
    // Check if all questions are answered
    const totalQuestions = currentCase.conclusionQuestions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (answeredCount < totalQuestions) {
      setDeductionFeedback('You must formulate answers to all deduction queries before submitting your final theory.');
      return;
    }

    // Verify answers
    let allCorrect = true;
    currentCase.conclusionQuestions.forEach((q, idx) => {
      const selectedId = selectedAnswers[idx];
      const option = q.options.find((opt) => opt.id === selectedId);
      if (!option || !option.correct) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      soundEngine.playClueDiscovered();
      setDeductionFeedback(null);
      onSolveCase(selectedAnswers);
    } else {
      soundEngine.playGhostWhisper();
      setDeductionFeedback('Your theory contains a fatal flaw. The physical evidence contradicts one of your conclusions. Consult your discovered letters and timestamps once more.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-mono text-red-500 uppercase tracking-widest block">
            Case Chronology & Deduction Records
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
            <span>Investigator’s Field Journal</span>
            <BookOpen className="w-5 h-5 text-amber-500" />
          </h2>
          <p className="text-xs font-typewriter text-stone-400 mt-1">
            Reconstruct the sequence of tragedy from physical evidence, formulate personal hypotheses, and submit the final case deduction.
          </p>
        </div>

        {/* Action: Reconstruct Timeline via AI */}
        <button
          onClick={() => {
            soundEngine.playGhostWhisper();
            onAskAIReconstruct();
          }}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-950/70 to-stone-900 border border-red-800/80 hover:border-red-500 text-red-300 rounded text-xs font-mono tracking-wider transition-colors shadow-sm self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Ask Gemma 4 to Reconstruct Timeline</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chronological Timeline of Discoveries (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-semibold text-stone-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Chronological Event Reconstruction</span>
            </h3>
            <span className="text-xs font-mono text-stone-500">
              {timelineClues.length} Historical Anchors
            </span>
          </div>

          {timelineClues.length === 0 ? (
            <div className="p-8 bg-stone-950/60 rounded-lg border border-dashed border-stone-800 text-center text-stone-500 font-typewriter text-xs">
              No evidence has been discovered yet. Explore the rooms and inspect the relics to populate the case timeline.
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-stone-800 space-y-6">
              {timelineClues.map((clue, idx) => (
                <div key={clue.id} className="relative group">
                  {/* Timeline Node Pip */}
                  <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-stone-900 border-2 border-red-600 group-hover:bg-red-600 transition-colors" />

                  <div
                    onClick={() => {
                      soundEngine.playPaperRustle();
                      onOpenClueViewer(clue);
                    }}
                    className="p-4 bg-stone-950/90 rounded border border-stone-800 hover:border-red-900/80 transition-all cursor-pointer shadow-md"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                      <span className="text-amber-400 font-semibold">{clue.date}</span>
                      <span className="capitalize">{clue.type.replace('_', ' ')}</span>
                    </div>

                    <h4 className="font-cinzel font-bold text-stone-200 text-sm group-hover:text-red-300 transition-colors">
                      {clue.title}
                    </h4>

                    <p className="font-typewriter text-xs text-stone-400 mt-2 line-clamp-3">
                      {clue.fullContent ? clue.fullContent.slice(0, 160) + '...' : clue.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-stone-850 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>Found at: {clue.locationFound}</span>
                      <span className="text-red-400 group-hover:underline">Examine Evidence →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* User Hypotheses / Case Notes Section */}
          <div className="mt-4 p-5 bg-stone-950 rounded-lg border border-stone-800 flex flex-col gap-4">
            <h3 className="font-cinzel text-sm font-semibold text-stone-200 flex items-center gap-2">
              <span>Investigator Hypotheses & Working Notes</span>
            </h3>

            <form onSubmit={handleCreateNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log a working theory, suspect contradiction, or timestamp gap..."
                className="flex-1 bg-stone-900 border border-stone-750 rounded px-3 py-2 text-xs font-typewriter text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-red-600"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-mono flex items-center gap-1 border border-stone-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Note</span>
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-stone-900/60 rounded border border-stone-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-mono text-[10px] text-stone-500 block">
                      {note.timestamp}
                    </span>
                    <p className="font-typewriter text-stone-300 mt-0.5">
                      {note.text}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="text-stone-600 hover:text-red-400 transition-colors p-1"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-[11px] font-mono text-stone-600 italic">
                  No personal notes logged yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Case Deduction & Resolution Solver (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 bg-gradient-to-b from-stone-950 via-stone-900/90 to-black rounded-lg border border-red-950/80 shadow-xl flex flex-col gap-5">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-widest">
              <FileCheck className="w-4 h-4" />
              <span>Final Case Deduction Protocol</span>
            </div>

            <div>
              <h3 className="font-cinzel text-lg font-bold text-stone-100">
                Uncover the Central Revelation
              </h3>
              <p className="font-typewriter text-xs text-stone-400 mt-1 leading-relaxed">
                When you have gathered enough artifacts to pierce through the lies of the living, formulate your conclusions below to solve the case.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-5">
              {currentCase.conclusionQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2">
                  <h4 className="font-cinzel text-xs font-semibold text-stone-200">
                    {qIdx + 1}. {q.question}
                  </h4>

                  <div className="space-y-1.5">
                    {q.options.map((opt) => {
                      const isSelected = selectedAnswers[qIdx] === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectAnswer(qIdx, opt.id)}
                          className={`p-3 rounded border text-xs font-typewriter cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-red-950/50 border-red-600 text-stone-100 shadow-[0_0_10px_rgba(185,28,28,0.3)]'
                              : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                          }`}
                        >
                          {opt.text}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Error / Warning feedback */}
            {deductionFeedback && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{deductionFeedback}</span>
              </div>
            )}

            {/* Submit Button */}
            {currentCase.resolutionUnlocked ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded text-center space-y-2">
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                <h4 className="font-cinzel font-bold text-emerald-200 text-sm">
                  Case Truth Fully Established
                </h4>
                <p className="font-typewriter text-xs text-stone-300 leading-relaxed">
                  {currentCase.resolutionStory}
                </p>
              </div>
            ) : (
              <button
                onClick={handleSubmitDeduction}
                className="w-full py-3 bg-gradient-to-r from-red-950 via-red-900 to-stone-950 text-stone-100 font-cinzel font-bold text-xs uppercase tracking-[0.2em] rounded border border-red-700 hover:border-red-500 hover:shadow-[0_0_20px_rgba(185,28,28,0.5)] transition-all"
              >
                Submit Case Deduction
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PreservationStory } from '../types/investigation';
import { PRESERVATION_GUIDELINES } from '../data/preservationData';
import { soundEngine } from '../services/soundService';
import { 
  HeartHandshake, 
  BookOpen, 
  Plus, 
  Download, 
  Trash2, 
  Calendar, 
  User, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Camera,
  Share2
} from 'lucide-react';

interface PreservationViewProps {
  stories: PreservationStory[];
  onAddStory: (story: Omit<PreservationStory, 'id' | 'createdAt'>) => void;
  onDeleteStory: (id: string) => void;
}

export const PreservationView: React.FC<PreservationViewProps> = ({
  stories,
  onAddStory,
  onDeleteStory,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [personHonored, setPersonHonored] = useState('');
  const [yearOrEra, setYearOrEra] = useState('');
  const [storyNarrative, setStoryNarrative] = useState('');
  const [sourceType, setSourceType] = useState<PreservationStory['sourceType']>('oral_history');
  const [verifiedFactInput, setVerifiedFactInput] = useState('');
  const [verifiedDetails, setVerifiedDetails] = useState<string[]>([]);
  const [loreInput, setLoreInput] = useState('');
  const [rememberedLore, setRememberedLore] = useState<string[]>([]);
  const [archivalTipNotes, setArchivalTipNotes] = useState('');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleAddVerifiedDetail = () => {
    if (!verifiedFactInput.trim()) return;
    setVerifiedDetails((prev) => [...prev, verifiedFactInput.trim()]);
    setVerifiedFactInput('');
  };

  const handleAddLore = () => {
    if (!loreInput.trim()) return;
    setRememberedLore((prev) => [...prev, loreInput.trim()]);
    setLoreInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !storyNarrative.trim()) return;

    soundEngine.playPaperRustle();
    onAddStory({
      title: title.trim(),
      contributorName: contributorName.trim() || 'Anonymous Contributor',
      personHonored: personHonored.trim() || 'A Life Remembered',
      yearOrEra: yearOrEra.trim() || 'Mid-20th Century',
      storyNarrative: storyNarrative.trim(),
      sourceType,
      verifiedDetails,
      rememberedLore,
      archivalTipNotes: archivalTipNotes.trim(),
    });

    // Reset form
    setTitle('');
    setContributorName('');
    setPersonHonored('');
    setYearOrEra('');
    setStoryNarrative('');
    setVerifiedDetails([]);
    setRememberedLore([]);
    setArchivalTipNotes('');
    setIsFormOpen(false);
  };

  const handleExportJSON = () => {
    soundEngine.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(stories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'the_stories_we_leave_behind_archive.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice('Preservation Archive exported successfully as JSON.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/40 border border-amber-900/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-500 mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Real-World Memory Preservation Initiative</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100">
            The Stories We Leave Behind
          </h2>
          <p className="font-typewriter text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            In our horror investigations, silence leads to darkness. In reality, everyday human lives, family photographs, letters, and oral histories fade into obscurity unless someone takes the time to listen, record, and preserve them.
          </p>
          <div className="mt-4 p-3 rounded bg-black/60 border border-stone-800 text-[11px] font-sans text-stone-400">
            <strong>Ethical Note:</strong> AI does not contact the deceased. Fictional cases serve as cautionary tales about the tragedy of being erased; this archive exists to celebrate real human memory and historical care.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <button
            onClick={() => {
              soundEngine.playPaperRustle();
              setIsFormOpen(true);
            }}
            className="px-5 py-3 rounded bg-amber-900/80 hover:bg-amber-800 text-stone-100 font-cinzel text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-amber-700 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record A Life’s Story</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 rounded bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono text-xs flex items-center justify-center gap-2 border border-stone-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span>Export Archive (JSON)</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-amber-950/40 border border-amber-800 text-amber-300 text-xs font-mono rounded">
          {exportNotice}
        </div>
      )}

      {/* Educational Preservation Guide Cards */}
      <div>
        <h3 className="font-cinzel text-base font-bold text-stone-200 mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Practical Guide: How to Preserve Fragile Human Records</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESERVATION_GUIDELINES.map((guide, idx) => (
            <div key={idx} className="p-5 bg-stone-950/80 rounded-lg border border-stone-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{guide.icon}</span>
                <h4 className="font-cinzel text-sm font-bold text-stone-200">
                  {guide.category}
                </h4>
              </div>
              <ul className="space-y-2 text-xs font-typewriter text-stone-400">
                {guide.tips.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stories Repository */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cinzel text-base font-bold text-stone-200 flex items-center gap-2">
            <span>Community Preservation Vault</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400 font-normal">
              {stories.length} Lives Documented
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stories.map((story) => (
            <div
              key={story.id}
              className="p-6 bg-gradient-to-b from-stone-950 via-stone-900/90 to-black rounded-lg border border-stone-800 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 uppercase">
                    {story.sourceType.replace('_', ' ')}
                  </span>
                  <span>{story.yearOrEra}</span>
                </div>

                <h4 className="font-cinzel font-bold text-stone-100 text-base">
                  {story.title}
                </h4>

                <div className="text-xs font-mono text-stone-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Honoring: <strong className="text-stone-200">{story.personHonored}</strong></span>
                </div>

                <p className="font-typewriter text-xs text-stone-300 leading-relaxed">
                  {story.storyNarrative}
                </p>

                {/* Verified Details */}
                {story.verifiedDetails.length > 0 && (
                  <div className="pt-2 border-t border-stone-850">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                      Verified Historical Record:
                    </span>
                    <ul className="space-y-1 text-[11px] font-typewriter text-stone-400">
                      {story.verifiedDetails.map((v, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500">✓</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Remembered Lore */}
                {story.rememberedLore.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Family Lore / Memory:
                    </span>
                    <ul className="space-y-1 text-[11px] font-typewriter text-stone-400">
                      {story.rememberedLore.map((l, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-500">~</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {story.archivalTipNotes && (
                  <p className="text-[10px] font-mono text-stone-500 italic bg-stone-950 p-2 rounded border border-stone-850">
                    Archival Note: {story.archivalTipNotes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-850 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Logged by {story.contributorName}</span>
                <button
                  onClick={() => onDeleteStory(story.id)}
                  className="text-stone-600 hover:text-red-400 p-1 transition-colors"
                  title="Remove record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Story Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0c0d14] border border-amber-900/60 rounded-xl shadow-2xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-cinzel text-lg font-bold text-stone-100 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-500" />
                <span>Preserve a Person’s Story</span>
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-stone-500 hover:text-stone-300 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-stone-400 uppercase tracking-wider mb-1">
                  Title of Memory or Document
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grandfather's 1952 Railway Ticket or Great-Aunt Clara's Diary"
                  className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1">
                    Person Honored
                  </label>
                  <input
                    type="text"
                    required
                    value={personHonored}
                    onChange={(e) => setPersonHonored(e.target.value)}
                    placeholder="e.g. Maria Gonzalez"
                    className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1">
                    Year or Era
                  </label>
                  <input
                    type="text"
                    value={yearOrEra}
                    onChange={(e) => setYearOrEra(e.target.value)}
                    placeholder="e.g. 1944 or 1960s"
                    className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 uppercase tracking-wider mb-1">
                    Source Type
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value as PreservationStory['sourceType'])}
                    className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 focus:outline-none focus:border-amber-600"
                  >
                    <option value="oral_history">Oral Recollection</option>
                    <option value="family_album">Family Photograph</option>
                    <option value="letter">Handwritten Letter</option>
                    <option value="diary">Diary Entry</option>
                    <option value="community_archive">Public/Local Record</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 uppercase tracking-wider mb-1">
                  Story Narrative & Personal Context
                </label>
                <textarea
                  rows={4}
                  required
                  value={storyNarrative}
                  onChange={(e) => setStoryNarrative(e.target.value)}
                  placeholder="Describe the life, the object, the memories passed down, or what made this person’s presence meaningful..."
                  className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 font-typewriter focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Verified Facts vs Family Lore */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-950 rounded border border-stone-850">
                <div>
                  <label className="block text-emerald-400 uppercase tracking-wider text-[10px] mb-1">
                    Add Verified Fact (Dates, Certificates, Records)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={verifiedFactInput}
                      onChange={(e) => setVerifiedFactInput(e.target.value)}
                      placeholder="e.g. Census verified 1950"
                      className="flex-1 bg-stone-900 border border-stone-750 rounded px-2 py-1 text-stone-200 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddVerifiedDetail}
                      className="px-2 py-1 bg-stone-800 text-stone-200 rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                  {verifiedDetails.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-[10px] text-stone-400">
                      {verifiedDetails.map((v, i) => (
                        <li key={i}>✓ {v}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-amber-400 uppercase tracking-wider text-[10px] mb-1">
                    Add Remembered Lore (Stories passed down)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={loreInput}
                      onChange={(e) => setLoreInput(e.target.value)}
                      placeholder="e.g. Always sang after sunset"
                      className="flex-1 bg-stone-900 border border-stone-750 rounded px-2 py-1 text-stone-200 text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddLore}
                      className="px-2 py-1 bg-stone-800 text-stone-200 rounded text-xs"
                    >
                      +
                    </button>
                  </div>
                  {rememberedLore.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-[10px] text-stone-400">
                      {rememberedLore.map((l, i) => (
                        <li key={i}>~ {l}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-stone-400 uppercase tracking-wider mb-1">
                  Contributor Name or Pseudonym
                </label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. Sarah M. or Family Descendant"
                  className="w-full bg-stone-900 border border-stone-750 rounded p-2 text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-stone-900 text-stone-400 rounded hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-900 hover:bg-amber-800 text-stone-100 rounded font-cinzel font-bold tracking-wider uppercase"
                >
                  Save to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

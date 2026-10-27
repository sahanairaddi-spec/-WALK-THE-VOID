import React, { useState, useMemo } from 'react';
import { CaseFile, ClueItem, GraphNode, GraphEdge } from '../types/investigation';
import { soundEngine } from '../services/soundService';
import { 
  Share2, 
  Sparkles, 
  Filter, 
  Info, 
  User, 
  MapPin, 
  FileText, 
  Camera, 
  Disc, 
  HelpCircle,
  Link as LinkIcon
} from 'lucide-react';

interface ClueGraphViewProps {
  currentCase: CaseFile;
  onOpenClueViewer: (clue: ClueItem) => void;
  onConsultAIConnection: (clueId1: string, clueId2: string) => void;
}

export const ClueGraphView: React.FC<ClueGraphViewProps> = ({
  currentCase,
  onOpenClueViewer,
  onConsultAIConnection,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [secondSelectedNodeId, setSecondSelectedNodeId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Build nodes & edges from discovered clues and associated people/locations
  const { nodes, edges } = useMemo(() => {
    const nodeList: GraphNode[] = [];
    const edgeList: GraphEdge[] = [];

    // Add discovered clues as nodes
    currentCase.clues.forEach((clue, idx) => {
      // Calculate circular/spiral layout coordinates
      const angle = (idx / Math.max(1, currentCase.clues.length)) * Math.PI * 2;
      const radius = 170;
      const x = 360 + Math.cos(angle) * radius;
      const y = 260 + Math.sin(angle) * radius;

      nodeList.push({
        id: clue.id,
        label: clue.title,
        category: 'clue',
        type: clue.type,
        clueId: clue.id,
        discovered: clue.discovered,
        x,
        y,
      });

      // Add edges from clue connections
      if (clue.discovered) {
        clue.connections.forEach((conn, cIdx) => {
          edgeList.push({
            id: `edge_${clue.id}_${conn.targetClueId}_${cIdx}`,
            source: clue.id,
            target: conn.targetClueId,
            relation: conn.relationType,
            status: conn.relationType === 'Contradicts' ? 'contradiction' : 'confirmed',
          });
        });
      }
    });

    // Add Key People as central nodes
    const people = Array.from(new Set(currentCase.clues.filter((c) => c.discovered).flatMap((c) => c.peopleInvolved)));
    people.slice(0, 4).forEach((person, pIdx) => {
      const pAngle = (pIdx / Math.max(1, people.length)) * Math.PI * 2 + Math.PI / 4;
      const pX = 360 + Math.cos(pAngle) * 80;
      const pY = 260 + Math.sin(pAngle) * 80;

      const pId = `person_${person.replace(/\s+/g, '_')}`;
      nodeList.push({
        id: pId,
        label: person,
        category: 'person',
        discovered: true,
        x: pX,
        y: pY,
      });

      // Connect person to clues they are involved with
      currentCase.clues
        .filter((c) => c.discovered && c.peopleInvolved.includes(person))
        .forEach((c) => {
          edgeList.push({
            id: `edge_p_${pId}_${c.id}`,
            source: pId,
            target: c.id,
            relation: 'Mentions',
            status: 'confirmed',
          });
        });
    });

    return { nodes: nodeList, edges: edgeList };
  }, [currentCase]);

  const filteredNodes = useMemo(() => {
    if (filterCategory === 'all') return nodes;
    return nodes.filter((n) => n.category === filterCategory || n.type === filterCategory);
  }, [nodes, filterCategory]);

  const handleNodeClick = (node: GraphNode) => {
    soundEngine.playClick();
    if (!selectedNodeId) {
      setSelectedNodeId(node.id);
    } else if (selectedNodeId === node.id) {
      setSelectedNodeId(null);
      setSecondSelectedNodeId(null);
    } else if (!secondSelectedNodeId) {
      setSecondSelectedNodeId(node.id);
    } else {
      setSelectedNodeId(node.id);
      setSecondSelectedNodeId(null);
    }
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const secondSelectedNode = nodes.find((n) => n.id === secondSelectedNodeId);

  const selectedClue = currentCase.clues.find((c) => c.id === selectedNode?.clueId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="text-[11px] font-mono text-red-500 uppercase tracking-widest block">
            Forensic Relationship Matrix
          </span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
            <span>Clue & Suspect Network Map</span>
            <Share2 className="w-5 h-5 text-red-400" />
          </h2>
          <p className="text-xs font-typewriter text-stone-400 mt-1">
            Examine how photographs, letters, people, and locations connect. Click any node to inspect; select two nodes to analyze their relationship with Gemma 4.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
              filterCategory === 'all'
                ? 'bg-stone-800 border-red-700 text-stone-100'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            All Nodes ({nodes.length})
          </button>
          <button
            onClick={() => setFilterCategory('clue')}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
              filterCategory === 'clue'
                ? 'bg-stone-800 border-red-700 text-stone-100'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Artifacts
          </button>
          <button
            onClick={() => setFilterCategory('person')}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
              filterCategory === 'person'
                ? 'bg-stone-800 border-red-700 text-stone-100'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Persons
          </button>
        </div>
      </div>

      {/* Main Interactive Graph Canvas & Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph SVG Interactive Viewport (8 columns) */}
        <div className="lg:col-span-8 bg-[#07080b] rounded-lg border border-stone-800 p-2 sm:p-4 min-h-[480px] max-h-[600px] relative overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Background grid markings */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #555 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <svg className="w-full h-full min-h-[440px] max-w-[740px]" viewBox="0 0 720 520">
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b1515" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c89547" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Render Edges */}
            {edges.map((edge) => {
              const srcNode = nodes.find((n) => n.id === edge.source);
              const tgtNode = nodes.find((n) => n.id === edge.target);
              if (!srcNode || !tgtNode || !srcNode.x || !tgtNode.x || !srcNode.y || !tgtNode.y) return null;

              const isConnectedToSelected =
                srcNode.id === selectedNodeId ||
                tgtNode.id === selectedNodeId ||
                srcNode.id === secondSelectedNodeId ||
                tgtNode.id === secondSelectedNodeId;

              const isContradiction = edge.status === 'contradiction';

              return (
                <g key={edge.id} className="transition-opacity duration-300">
                  <line
                    x1={srcNode.x}
                    y1={srcNode.y}
                    x2={tgtNode.x}
                    y2={tgtNode.y}
                    stroke={
                      isContradiction
                        ? '#dc2626'
                        : isConnectedToSelected
                        ? '#e2e8f0'
                        : '#3f3f46'
                    }
                    strokeWidth={isConnectedToSelected ? 2.5 : 1.2}
                    strokeDasharray={isContradiction ? '4 3' : 'none'}
                    opacity={isConnectedToSelected ? 0.9 : 0.35}
                  />
                  {/* Midpoint relation text badge */}
                  {isConnectedToSelected && (
                    <text
                      x={(srcNode.x + tgtNode.x) / 2}
                      y={(srcNode.y + tgtNode.y) / 2 - 4}
                      fill="#d4d4d8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-black/80 px-1"
                    >
                      {edge.relation}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              if (!node.x || !node.y) return null;
              const isSelected = node.id === selectedNodeId;
              const isSecondSelected = node.id === secondSelectedNodeId;
              const isPerson = node.category === 'person';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer group"
                >
                  {/* Selection Glow */}
                  {(isSelected || isSecondSelected) && (
                    <circle
                      r={isPerson ? 26 : 22}
                      fill="none"
                      stroke={isSelected ? '#ef4444' : '#38bdf8'}
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r={isPerson ? 20 : 16}
                    fill={
                      node.discovered
                        ? isPerson
                          ? '#18181b'
                          : '#1c1917'
                        : '#09090b'
                    }
                    stroke={
                      isSelected
                        ? '#ef4444'
                        : isSecondSelected
                        ? '#38bdf8'
                        : node.discovered
                        ? isPerson
                          ? '#a1a1aa'
                          : '#991b1b'
                        : '#27272a'
                    }
                    strokeWidth={isSelected || isSecondSelected ? 2.5 : 1.5}
                    className="transition-transform group-hover:scale-110"
                  />

                  {/* Node icon label */}
                  <text
                    y="4"
                    fill={node.discovered ? '#e4e4e7' : '#52525b'}
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {isPerson ? '👤' : node.type === 'photograph' ? '📷' : '📜'}
                  </text>

                  {/* Node Label Text */}
                  <text
                    y={isPerson ? 32 : 28}
                    fill={
                      isSelected || isSecondSelected
                        ? '#f4f4f5'
                        : node.discovered
                        ? '#a1a1aa'
                        : '#52525b'
                    }
                    fontSize="10"
                    fontFamily="serif"
                    textAnchor="middle"
                    className="font-medium pointer-events-none drop-shadow"
                  >
                    {node.label.length > 20 ? `${node.label.slice(0, 18)}...` : node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Instructions HUD */}
          <div className="absolute bottom-3 left-3 bg-stone-950/90 border border-stone-800 rounded px-3 py-1.5 text-[10px] font-mono text-stone-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Select 2 nodes to test hypothetical connections with Gemma 4.</span>
          </div>
        </div>

        {/* Right Inspector & AI Hypothesis Tester (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* 2-Node Compare & AI Analysis Box */}
          {selectedNode && secondSelectedNode ? (
            <div className="p-4 rounded-lg bg-red-950/25 border border-red-800/80 shadow-lg flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-red-300">
                <LinkIcon className="w-3.5 h-3.5 text-red-400" />
                <span>Dual Clue Correlation Selected</span>
              </div>

              <div className="text-xs font-cinzel text-stone-200">
                <strong className="text-red-400">A:</strong> {selectedNode.label}
              </div>
              <div className="text-xs font-cinzel text-stone-200">
                <strong className="text-cyan-400">B:</strong> {secondSelectedNode.label}
              </div>

              <button
                onClick={() => {
                  soundEngine.playGhostWhisper();
                  onConsultAIConnection(selectedNode.id, secondSelectedNode.id);
                }}
                className="w-full mt-2 py-2 px-3 bg-red-900 hover:bg-red-800 text-stone-100 rounded text-xs font-mono tracking-wider flex items-center justify-center gap-2 border border-red-700 transition-colors shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze Link with Gemma 4</span>
              </button>
            </div>
          ) : null}

          {/* Single Node Detail Inspection Card */}
          {selectedNode ? (
            <div className="p-4 bg-stone-950 rounded-lg border border-stone-800 flex flex-col gap-3">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                Node Dossier • {selectedNode.category}
              </span>
              <h3 className="font-cinzel text-base font-bold text-stone-100">
                {selectedNode.label}
              </h3>

              {selectedClue ? (
                <>
                  <p className="font-typewriter text-xs text-stone-400 leading-relaxed">
                    {selectedClue.shortSnippet}
                  </p>
                  <div className="text-xs font-mono text-stone-400">
                    Location: <span className="text-stone-300">{selectedClue.locationFound}</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-stone-850">
                    <button
                      onClick={() => onOpenClueViewer(selectedClue)}
                      className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded text-xs font-mono border border-stone-700 transition-colors text-center"
                    >
                      Examine Full Dossier & UV Layer
                    </button>
                  </div>
                </>
              ) : (
                <p className="font-typewriter text-xs text-stone-400">
                  Key figure recorded in the annals of this investigation. Connected to multiple physical evidence items.
                </p>
              )}
            </div>
          ) : (
            <div className="p-6 bg-stone-950/60 rounded-lg border border-dashed border-stone-800 text-center flex flex-col items-center justify-center text-stone-500 py-12">
              <HelpCircle className="w-8 h-8 mb-2 opacity-40" />
              <div className="font-cinzel text-xs text-stone-400 font-semibold">
                No Node Selected
              </div>
              <p className="text-[11px] font-typewriter text-stone-400 mt-1 max-w-xs">
                Click any circle on the relationship map to inspect connections, view connected testimony, or test theories.
              </p>
            </div>
          )}

          {/* Quick Stats Legend */}
          <div className="p-3 bg-stone-950/80 rounded border border-stone-850 text-xs font-mono text-stone-400 space-y-2">
            <div className="font-semibold text-stone-300 text-[11px] uppercase tracking-wider mb-1">
              Connection Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-red-700" />
              <span className="text-[11px]">Solid Line: Confirmed Case Link</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 border-t border-dashed border-red-500" />
              <span className="text-[11px]">Dashed Line: Contradictory Evidence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-stone-800 border border-stone-600" />
              <span className="text-[11px]">Person of Interest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

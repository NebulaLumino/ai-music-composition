'use client';
import { useState } from 'react';

export default function Home() {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [tempo, setTempo] = useState('');
  const [instruments, setInstruments] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, mood, tempo, instruments }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch(err: any) { setOutput('Error: ' + err.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="text-4xl mb-3">🎵</div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Music Composer</h1>
            <p className="text-gray-400">Generate melodies, harmonies, and song structures powered by DeepSeek AI</p>
          </div>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select value={genre} onChange={e=>setGenre(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-purple-500 transition-colors">
                <option value="">Select genre...</option>
                <option>Electronic / EDM</option>
                <option>Classical / Orchestral</option>
                <option>Jazz / Blues</option>
                <option>Rock / Metal</option>
                <option>Hip-Hop / Rap</option>
                <option>Lo-fi / Chill</option>
                <option>Pop / Dance</option>
                <option>Folk / Acoustic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mood</label>
              <select value={mood} onChange={e=>setMood(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-purple-500 transition-colors">
                <option value="">Select mood...</option>
                <option>Energetic / Uplifting</option>
                <option>Melancholic / Sad</option>
                <option>Chill / Relaxing</option>
                <option>Dark / Intense</option>
                <option>Romantic / Warm</option>
                <option>Mysterious / Eerie</option>
                <option>Nostalgic / Retro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tempo (BPM)</label>
              <input type="text" value={tempo} onChange={e=>setTempo(e.target.value)} placeholder="e.g. 120 BPM or leave blank for auto" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instruments</label>
              <input type="text" value={instruments} onChange={e=>setInstruments(e.target.value)} placeholder="e.g. piano, guitar, synths" className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
              {loading ? '🎹 Composing...' : '🎵 Generate Composition'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-5 bg-gray-800/70 border border-gray-700 rounded-xl">
              <h3 className="text-sm font-semibold text-purple-400 mb-3">Generated Composition</h3>
              <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function Home() {
const [Genre, setGenre] = useState('');
const [Mood, setMood] = useState('');
const [Tempo, setTempo] = useState('');
const [Instruments, setInstruments] = useState('');
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
    } catch(e: any) { setOutput('Error: ' + e.message); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Music Composition Assistant</h1>
          <p className="text-gray-400 mb-8">Generate structured musical compositions with chord progressions and arrangement notes.</p>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div><label className="block text-sm text-gray-400 mb-1">Genre</label><input value={Genre} onChange={e=>setGenre(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter genre..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Mood</label><input value={Mood} onChange={e=>setMood(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter mood..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Tempo</label><input value={Tempo} onChange={e=>setTempo(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter tempo..." /></div>
            <div><label className="block text-sm text-gray-400 mb-1">Instruments</label><input value={Instruments} onChange={e=>setInstruments(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400" placeholder="Enter instruments..." /></div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white disabled:opacity-50 transition-opacity"
              style={backgroundColor: 'hsl(270,65%,55%)'}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {output && (
            <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-200">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
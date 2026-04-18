import { NextRequest, NextResponse } from 'next/server';
let _clientPromise: Promise<any> | null = null;

async function getClient() {
  if (!_clientPromise) {
    _clientPromise = (async () => {
      const { default: OpenAI } = await import('openai');
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.deepseek.com/v1'
      });
    })();
  }
  return _clientPromise;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const f1: string = body.f1 || '';
    const f2: string = body.f2 || '';
    const f3: string = body.f3 || '';
    const f4: string = body.f4 || '';
    const userContent = `Genre: ${f1}\nMood: ${f2}\nTempo: ${f3}\nInstruments: ${f4}`;
    const client = await getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are an expert music composer and arranger. Given genre, mood, tempo, and instruments, generate a detailed music composition plan including: suggested chord progressions, melodic motifs, arrangement structure (intro, verse, chorus, bridge, outro), dynamic changes, and instrumentation notes. Format the output clearly with sections.' },
        { role: 'user', content: userContent },
      ]
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
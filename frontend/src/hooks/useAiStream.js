import { useState, useCallback } from 'react';

const BASE_URL = 'http://localhost:8080';

function useAiStream() {
    const [openAiText, setOpenAiText] = useState('');
    const [groqText, setGroqText] = useState('');
    const [openAiDone, setOpenAiDone] = useState(false);
    const [groqDone, setGroqDone] = useState(false);
    const [openAiCount, setOpenAiCount] = useState(0);
    const [groqCount, setGroqCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ask = useCallback(async (question, token) => {
        setOpenAiText(''); setGroqText('');
        setOpenAiDone(false); setGroqDone(false);
        setOpenAiCount(0); setGroqCount(0);
        setError(null);
        setLoading(true);

        try {
            const body = { question, userId: '1' };
            console.log("Sending request to AI stream:", body);

            const res = await fetch(`${BASE_URL}/api/ai/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorText}`);
            }

            console.log("Response received, starting to read stream...");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Stream reader done.");
                    break;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (!line.startsWith('data:')) continue;
                    const raw = line.slice(5).trim();
                    if (!raw) continue;
                    try {
                        const chunk = JSON.parse(raw);
                        if (chunk.done) {
                            const src = chunk.source?.toUpperCase();
                            if (src === 'LLAMA' || src === 'GPT') setLlamaDone(true);
                            else setGemmaDone(true);
                        } else {
                            const src = chunk.source?.toUpperCase();
                            if (src === 'LLAMA' || src === 'GPT') {
                                setLlamaText(t => t + chunk.content);
                                setLlamaCount(n => n + 1);
                            } else {
                                setGemmaText(t => t + chunk.content);
                                setGemmaCount(n => n + 1);
                            }
                        }
                    } catch {}
                }
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        openAiText, groqText, openAiDone, groqDone,
        openAiCount, groqCount, loading, error, ask,
    };
}

export default useAiStream;
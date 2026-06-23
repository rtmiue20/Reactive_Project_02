const BASE_URL = 'http://localhost:8080';

export const authService = {
    login: async (username, password) => {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error('Sai username hoặc password');
        return res.json(); // { token: '...' }
    },
};

export const aiService = {
    stream: async (question, userId, token, onChunk, onDone, onError) => {
        try {
            const res = await fetch(`${BASE_URL}/api/ai/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ question, userId }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (!line.startsWith('data:')) continue;
                    const raw = line.slice(5).trim();
                    if (!raw) continue;
                    try {
                        const chunk = JSON.parse(raw);
                        if (chunk.done) onDone(chunk.source);
                        else onChunk(chunk);
                    } catch {}
                }
            }
        } catch (e) {
            onError(e.message);
        }
    },
};
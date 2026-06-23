import React, { useState } from 'react';
import AiPanel from '../components/AiPanel';
import ChatInput from '../components/ChatInput';
import TokenBadge from '../components/TokenBadge';
import useAiStream from '../hooks/useAiStream';
import { colors } from '../styles/DesignSystem';

function ArenaPage({ token }) {
    const [question, setQuestion] = useState('');
    const {
        openAiText, groqText, openAiDone, groqDone,
        openAiCount, groqCount, loading, error, ask
    } = useAiStream();

    const handleSubmit = () => {
        if (!question.trim() || loading) return;
        ask(question, token);
    };

    return (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            height: '100vh', overflow: 'hidden', padding: '24px',
            gap: '0',
        }}>
            {/* Input */}
            <ChatInput
                question={question}
                onChange={setQuestion}
                onSubmit={handleSubmit}
                isLoading={loading}
                hasToken={!!token}
            />

            {/* Error */}
            {error && (
                <div style={{
                    background: '#2a1a1a', border: '1px solid #5a2a2a',
                    borderRadius: '8px', padding: '10px 16px',
                    color: '#f87171', fontSize: '13px', marginBottom: '16px',
                }}>⚠️ {error}</div>
            )}

            {/* AI Panels */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '20px', flex: 1, overflow: 'hidden',
            }}>
                <AiPanel
                    name="OpenAI" version="GPT-4o mini" provider="OpenAI"
                    color={colors.gemma} glow={colors.gemmaGlow}
                    text={openAiText} isLoading={loading} isDone={openAiDone}
                />
                <AiPanel
                    name="LLaMA 3.3" version="70b-versatile" provider="Groq"
                    color={colors.llama} glow={colors.llamaGlow}
                    text={groqText} isLoading={loading} isDone={groqDone}
                />
            </div>

            {/* Status */}
            <TokenBadge
                openAiCount={openAiCount} groqCount={groqCount}
                isLoading={loading} isDone={openAiDone && groqDone}
            />
        </div>
    );
}

export default ArenaPage;
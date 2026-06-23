import React from 'react';
import { colors } from '../styles/DesignSystem';

function TokenBadge({ openAiCount, groqCount, isLoading, isDone }) {
    const total = openAiCount + groqCount;

    return (
        <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginTop: '16px', padding: '0 4px',
        }}>
      <span style={{
          fontSize: '12px',
          color: isLoading ? colors.accent : isDone ? colors.llama : colors.textMuted,
          transition: 'color 0.3s',
      }}>
        {isLoading ? '⚡ Streaming realtime...'
            : isDone ? '✓ Both models completed'
                : 'Enter a prompt and click Compare'}
      </span>

            {total > 0 && (
                <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: colors.gemma }}>
            OpenAI: {openAiCount} chunks
          </span>
                    <span style={{ fontSize: '12px', color: colors.llama }}>
            Groq: {groqCount} chunks
          </span>
                </div>
            )}
        </div>
    );
}

export default TokenBadge;
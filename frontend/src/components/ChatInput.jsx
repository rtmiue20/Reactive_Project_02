import React from 'react';
import { colors, radius } from '../styles/DesignSystem';

const suggestions = ['Logical Reasoning', 'Code Optimization', 'Creative Synthesis'];

function ChatInput({ question, onChange, onSubmit, isLoading, hasToken }) {
    return (
        <div style={{
            background: colors.bgCard, border: `1px solid ${colors.border}`,
            borderRadius: radius.xl, padding: '20px 24px', marginBottom: '24px',
        }}>
            {/* Secure session */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '16px',
            }}>
                <span style={{ color: colors.accent, fontSize: '12px' }}>⚿</span>
                <span style={{
                    fontSize: '11px', letterSpacing: '1px',
                    color: hasToken ? colors.llama : colors.textMuted,
                }}>
          {hasToken ? 'SECURE SESSION ACTIVE' : 'PASTE JWT TOKEN TO ACTIVATE'}
        </span>
                <span style={{ marginLeft: 'auto', color: colors.textMuted, fontSize: '16px' }}>✦</span>
            </div>

            {/* Input row */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Enter a prompt to compare AI responses in real-time..."
                    value={question}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && onSubmit()}
                    disabled={isLoading}
                    style={{
                        flex: 1, background: 'transparent', border: 'none',
                        color: colors.textPrimary, fontSize: '14px', outline: 'none',
                        fontFamily: 'inherit',
                    }}
                />
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !question.trim()}
                    style={{
                        background: isLoading || !question.trim() ? colors.bgCardHover : colors.accent,
                        color: isLoading || !question.trim() ? colors.textMuted : '#fff',
                        border: 'none', borderRadius: radius.md,
                        padding: '10px 20px', fontSize: '14px', fontWeight: 500,
                        cursor: isLoading || !question.trim() ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        transition: 'background 0.2s', whiteSpace: 'nowrap',
                    }}
                >
                    {isLoading ? 'Streaming...' : 'Compare'} {!isLoading && '▷'}
                </button>
            </div>

            {/* Suggestion tags */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                {suggestions.map(s => (
                    <span key={s} onClick={() => onChange(s)} style={{
                        fontSize: '12px', padding: '4px 12px', borderRadius: '20px',
                        border: `1px solid ${colors.border}`, color: colors.textSecondary,
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}
                          onMouseEnter={e => { e.target.style.borderColor = colors.accent; e.target.style.color = colors.textPrimary; }}
                          onMouseLeave={e => { e.target.style.borderColor = colors.border; e.target.style.color = colors.textSecondary; }}
                    >{s}</span>
                ))}
            </div>
        </div>
    );
}

export default ChatInput;
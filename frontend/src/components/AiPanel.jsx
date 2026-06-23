import React, { useRef, useEffect } from 'react';
import { colors, radius } from '../styles/DesignSystem';

function AiPanel({ name, version, provider, color, glow, text, isLoading, isDone }) {
    const bodyRef = useRef(null);

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [text]);

    return (
        <div style={{
            background: colors.bgCard,
            border: `1px solid ${isDone ? color : isLoading ? colors.borderActive : colors.border}`,
            borderRadius: radius.lg,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            height: '100%', transition: 'border-color 0.4s',
            boxShadow: isLoading ? `0 0 20px ${glow}` : 'none',
        }}>
            {/* Header */}
            <div style={{
                padding: '14px 18px', borderBottom: `1px solid ${colors.border}`,
                display: 'flex', alignItems: 'center', gap: '10px',
            }}>
                <div style={{
                    width: '8px', height: '8px', borderRadius: '50%', background: color,
                    animation: isLoading && !isDone ? 'pulse 1s infinite' : 'none',
                    boxShadow: `0 0 6px ${color}`,
                }}/>
                <span style={{ fontSize: '14px', fontWeight: 600, color: colors.textPrimary }}>{name}</span>
                <span style={{ fontSize: '11px', color: colors.textSecondary }}>{provider} · {version}</span>
                <button style={{
                    marginLeft: 'auto', background: 'transparent', border: 'none',
                    color: colors.textMuted, cursor: 'pointer', fontSize: '16px',
                }}>⧉</button>
            </div>

            {/* Body */}
            <div ref={bodyRef} style={{
                flex: 1, padding: '20px', overflowY: 'auto',
                lineHeight: 1.8, fontSize: '14px', color: colors.textSecondary,
                display: !text ? 'flex' : 'block',
                alignItems: 'center', justifyContent: 'center',
                animation: text ? 'fadeIn 0.3s ease' : 'none',
            }}>
                {text ? (
                    <>
                        <span style={{ color: colors.textPrimary }}>{text}</span>
                        {!isDone && (
                            <span style={{
                                display: 'inline-block', width: '2px', height: '15px',
                                background: color, marginLeft: '2px', verticalAlign: 'middle',
                                animation: 'blink 0.8s infinite',
                            }}/>
                        )}
                    </>
                ) : (
                    <span style={{ color: colors.textMuted, fontSize: '13px' }}>
            {isLoading ? 'Connecting...' : 'Response will appear here'}
          </span>
                )}
            </div>
        </div>
    );
}

export default AiPanel;
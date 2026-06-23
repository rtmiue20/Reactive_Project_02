import React from 'react';
import { colors } from '../styles/DesignSystem';

function TopBar({ token, onTokenChange }) {
    return (
        <div style={{
            height: '56px', borderBottom: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', padding: '0 24px', gap: '24px',
            background: colors.bgSecondary, flexShrink: 0,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: colors.textPrimary }}>AI Arena</span>
                <span style={{
                    fontSize: '10px', padding: '3px 8px', borderRadius: '4px',
                    background: 'rgba(245,158,11,0.15)', color: colors.vip,
                    border: '1px solid rgba(245,158,11,0.3)', fontWeight: 600,
                    letterSpacing: '0.5px',
                }}>⭐ VIP ACCESS</span>
            </div>

            {/* Nav */}
            {['Models', 'Extensions', 'API'].map((item, i) => (
                <span key={item} style={{
                    fontSize: '14px',
                    color: i === 1 ? colors.textPrimary : colors.textSecondary,
                    cursor: 'pointer',
                    borderBottom: i === 1 ? `2px solid ${colors.accent}` : 'none',
                    paddingBottom: i === 1 ? '2px' : '0',
                }}>{item}</span>
            ))}

            {/* JWT input */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: colors.bgCard, border: `1px solid ${colors.border}`,
                borderRadius: '8px', padding: '6px 12px', minWidth: '200px',
            }}>
                <span style={{ fontSize: '12px' }}>🔑</span>
                <input
                    type="password"
                    placeholder="JWT token..."
                    value={token}
                    onChange={e => onTokenChange(e.target.value)}
                    style={{
                        background: 'transparent', border: 'none',
                        color: colors.textPrimary, fontSize: '12px', outline: 'none',
                        fontFamily: 'monospace', width: '100%',
                    }}
                />
            </div>

            <span style={{ fontSize: '18px', color: colors.textSecondary, cursor: 'pointer' }}>🔔</span>
            <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: colors.bgCard, border: `1px solid ${colors.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '16px',
            }}>👤</div>
        </div>
    );
}

export default TopBar;
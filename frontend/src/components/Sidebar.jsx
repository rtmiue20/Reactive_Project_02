import React from 'react';
import { colors } from '../styles/DesignSystem';

const navItems = [
    { icon: '💬', label: 'AI Chat', active: false },
    { icon: '🔧', label: 'Tools Library', active: false },
    { icon: '📁', label: 'Projects', active: false },
    { icon: '📊', label: 'Dashboard', active: true },
];

function Sidebar() {
    return (
        <div style={{
            width: '220px', minHeight: '100vh', background: colors.bgSecondary,
            borderRight: `1px solid ${colors.border}`,
            display: 'flex', flexDirection: 'column', padding: '24px 16px',
            flexShrink: 0,
        }}>
            {/* Logo */}
            <div style={{ marginBottom: '32px', padding: '0 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: colors.accent, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '16px'
                    }}>⚡</div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>Sophisticated</div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: colors.textPrimary }}>AI</div>
                    </div>
                </div>
                <div style={{ fontSize: '11px', color: colors.textSecondary, marginLeft: '42px' }}>PRO ASSISTANT</div>
            </div>

            {/* New Chat button */}
            <button style={{
                width: '100%', padding: '10px', marginBottom: '24px',
                background: 'transparent', border: `1px solid ${colors.border}`,
                borderRadius: '8px', color: colors.textPrimary, fontSize: '14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                gap: '8px', justifyContent: 'center',
                transition: 'border-color 0.2s',
            }}
                    onMouseEnter={e => e.target.style.borderColor = colors.accent}
                    onMouseLeave={e => e.target.style.borderColor = colors.border}
            >
                <span>+</span> New Chat
            </button>

            {/* Nav items */}
            <nav style={{ flex: 1 }}>
                {navItems.map(item => (
                    <div key={item.label} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', borderRadius: '8px', marginBottom: '4px',
                        background: item.active ? colors.accentGlow : 'transparent',
                        color: item.active ? colors.textPrimary : colors.textSecondary,
                        cursor: 'pointer', fontSize: '14px',
                        borderLeft: item.active ? `2px solid ${colors.accent}` : '2px solid transparent',
                        transition: 'all 0.2s',
                    }}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            {/* Recent chats */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '8px', letterSpacing: '1px' }}>
                    RECENT CHATS
                </div>
                {['Quantum Physics Breakdown', 'Design System Review', 'Rust Architecture Notes'].map(chat => (
                    <div key={chat} style={{
                        fontSize: '12px', color: colors.textSecondary,
                        padding: '6px 4px', cursor: 'pointer',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{chat}</div>
                ))}
            </div>

            {/* Bottom */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '16px' }}>
                {[{ icon: '⚙️', label: 'Settings' }, { icon: '❓', label: 'Support' }].map(item => (
                    <div key={item.label} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '8px 12px', color: colors.textSecondary,
                        cursor: 'pointer', fontSize: '14px', borderRadius: '8px',
                    }}>{item.icon} {item.label}</div>
                ))}
                {/* User */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    marginTop: '12px', padding: '8px',
                }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: colors.accent, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '14px', color: '#fff',
                    }}>A</div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>Alex Rivard</div>
                        <div style={{ fontSize: '11px', color: colors.vip }}>VIP Member</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
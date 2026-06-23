import React, { useState } from 'react';
import { authService } from '../services/aiService';
import { colors, radius } from '../styles/DesignSystem';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!username || !password) return;
        setLoading(true); setError('');
        try {
            const data = await authService.login(username, password);
            onLogin(data.token);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', background: colors.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <div style={{
                background: colors.bgCard, border: `1px solid ${colors.border}`,
                borderRadius: radius.xl, padding: '40px', width: '400px',
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: colors.accent, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '24px', margin: '0 auto 12px',
                    }}>⚡</div>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, color: colors.textPrimary }}>
                        Sophisticated AI
                    </h1>
                    <p style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
                        Sign in to access AI Arena
                    </p>
                </div>

                {/* Form */}
                {[
                    { label: 'Username', value: username, onChange: setUsername, type: 'text' },
                    { label: 'Password', value: password, onChange: setPassword, type: 'password' },
                ].map(field => (
                    <div key={field.label} style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '12px', color: colors.textSecondary, display: 'block', marginBottom: '6px' }}>
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            value={field.value}
                            onChange={e => field.onChange(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()}
                            style={{
                                width: '100%', background: colors.bgSecondary,
                                border: `1px solid ${colors.border}`, borderRadius: radius.md,
                                padding: '10px 14px', color: colors.textPrimary,
                                fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                            }}
                        />
                    </div>
                ))}

                {error && (
                    <div style={{
                        color: '#f87171', fontSize: '13px', marginBottom: '16px',
                        padding: '8px 12px', background: '#2a1a1a',
                        borderRadius: radius.sm, border: '1px solid #5a2a2a',
                    }}>⚠️ {error}</div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading || !username || !password}
                    style={{
                        width: '100%', padding: '12px',
                        background: loading || !username || !password ? colors.bgCardHover : colors.accent,
                        color: loading || !username || !password ? colors.textMuted : '#fff',
                        border: 'none', borderRadius: radius.md,
                        fontSize: '15px', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s',
                    }}
                >
                    {loading ? 'Signing in...' : 'Sign In →'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '12px', color: colors.textMuted, marginTop: '20px' }}>
                    VIP access required for AI Arena
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
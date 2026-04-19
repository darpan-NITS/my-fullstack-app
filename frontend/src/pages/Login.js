import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials');
    }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0f0a; }

        .auth-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #080d08;
        }

        /* LEFT PANEL */
        .left-panel {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 70px;
          position: relative;
          background: #080d08;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .left-panel::after {
          content: '';
          position: absolute;
          bottom: -150px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 60px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .form-header {
          margin-bottom: 40px;
        }

        .form-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        .form-header h1 span {
          color: #22c55e;
        }

        .form-header p {
          color: #6b7280;
          font-size: 15px;
          font-weight: 300;
        }

        .input-group {
          width: 100%;
          margin-bottom: 18px;
          position: relative;
        }

        .input-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #4b5563;
          margin-bottom: 8px;
          transition: color 0.3s;
        }

        .input-group.focused .input-label {
          color: #22c55e;
        }

        .input-field {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #ffffff;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: all 0.3s ease;
        }

        .input-field::placeholder { color: #374151; }

        .input-field:focus {
          border-color: rgba(34,197,94,0.5);
          background: rgba(34,197,94,0.04);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.08);
        }

        .error-msg {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 18px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 6px;
          letter-spacing: 0.3px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(34,197,94,0.35);
        }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          color: #374151;
          font-size: 12px;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .switch-link {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          font-weight: 300;
        }

        .switch-link a {
          color: #22c55e;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .switch-link a:hover { color: #4ade80; }

        /* RIGHT PANEL */
        .right-panel {
          width: 50%;
          position: relative;
          overflow: hidden;
          background: #0f1a0f;
        }

        .right-panel-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(34,197,94,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(22,163,74,0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a1a0a 0%, #0f2010 50%, #081208 100%);
        }

        .right-panel-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .right-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px;
          text-align: center;
        }

        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 320px;
        }

        .big-number {
          font-family: 'Playfair Display', serif;
          font-size: 80px;
          font-weight: 700;
          color: rgba(34,197,94,0.15);
          line-height: 1;
          margin-bottom: 20px;
        }

        .right-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .right-desc {
          color: #6b7280;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
        }

        .floating-badge {
          position: absolute;
          background: rgba(34,197,94,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 50px;
          padding: 10px 20px;
          color: #4ade80;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: float 4s ease-in-out infinite;
        }

        .badge-1 { top: 15%; right: 10%; animation-delay: 0s; }
        .badge-2 { bottom: 20%; left: 8%; animation-delay: 2s; }

        .badge-dot {
          width: 8px; height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        /* Decorative circles */
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(34,197,94,0.08);
        }
        .deco-1 { width: 300px; height: 300px; top: -100px; right: -100px; }
        .deco-2 { width: 200px; height: 200px; bottom: 50px; left: -50px; }

        @media (max-width: 768px) {
          .right-panel { display: none; }
          .left-panel { width: 100%; padding: 40px 30px; }
        }
      `}</style>

      <div className="auth-page">
        {/* LEFT PANEL — Form */}
        <div className="left-panel">
          <div className="logo">
            <div className="logo-icon">🌿</div>
            <span className="logo-text">Verdant</span>
          </div>

          <div className="form-header">
            <h1>Welcome<br /><span>Back.</span></h1>
            <p>Sign in to continue your journey</p>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={`input-group ${focused === 'email' ? 'focused' : ''}`} style={{width:'100%'}}>
            <label className="input-label">Email Address</label>
            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, email: e.target.value})}
              onKeyDown={handleKey}
            />
          </div>

          <div className={`input-group ${focused === 'password' ? 'focused' : ''}`} style={{width:'100%'}}>
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, password: e.target.value})}
              onKeyDown={handleKey}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

          <div className="divider">or</div>

          <p className="switch-link">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>

        {/* RIGHT PANEL — Decorative */}
        <div className="right-panel">
          <div className="right-panel-bg" />
          <div className="right-panel-grid" />
          <div className="deco-circle deco-1" />
          <div className="deco-circle deco-2" />

          <div className="floating-badge badge-1">
            <div className="badge-dot" />
            Secure Authentication
          </div>

          <div className="floating-badge badge-2">
            <div className="badge-dot" />
            256-bit Encryption
          </div>

          <div className="right-content">
            <div className="glass-card">
              <div className="big-number">V.</div>
              <div className="right-title">Your data,<br />protected.</div>
              <p className="right-desc">
                Industry-grade JWT authentication with bcrypt password hashing. Your account is always safe with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

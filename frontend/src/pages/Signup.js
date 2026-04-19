import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setToken }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
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
          top: -200px; left: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 50px;
        }

        .logo-icon {
          width: 36px; height: 36px;
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

        .form-header { margin-bottom: 36px; }

        .form-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        .form-header h1 span { color: #22c55e; }
        .form-header p { color: #6b7280; font-size: 15px; font-weight: 300; }

        .input-group {
          width: 100%;
          margin-bottom: 16px;
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

        .input-group.focused .input-label { color: #22c55e; }

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

        .password-strength {
          display: flex;
          gap: 4px;
          margin-top: 8px;
        }

        .strength-bar {
          height: 3px;
          flex: 1;
          border-radius: 2px;
          background: rgba(255,255,255,0.06);
          transition: background 0.3s;
        }

        .error-msg {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #f87171;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
          margin-bottom: 16px;
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
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(34,197,94,0.35); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
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
            radial-gradient(ellipse at 70% 30%, rgba(34,197,94,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(22,163,74,0.08) 0%, transparent 50%),
            linear-gradient(135deg, #081208 0%, #0f2010 50%, #0a1a0a 100%);
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
          gap: 20px;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 24px 30px;
          width: 100%;
          max-width: 300px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34,197,94,0.2);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #6b7280;
          font-size: 13px;
          font-weight: 300;
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(34,197,94,0.06);
        }
        .deco-1 { width: 350px; height: 350px; top: -120px; right: -120px; }
        .deco-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; }

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

        .badge-1 { top: 12%; left: 10%; animation-delay: 1s; }
        .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse-dot 2s ease-in-out infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 768px) {
          .right-panel { display: none; }
          .left-panel { width: 100%; padding: 40px 30px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="left-panel">
          <div className="logo">
            <div className="logo-icon">🌿</div>
            <span className="logo-text">Verdant</span>
          </div>

          <div className="form-header">
            <h1>Create your<br /><span>Account.</span></h1>
            <p>Join thousands of users today — it's free</p>
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <div className={`input-group ${focused === 'name' ? 'focused' : ''}`}>
            <label className="input-label">Full Name</label>
            <input
              className="input-field"
              placeholder="Darpan Goswami"
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, name: e.target.value})}
              onKeyDown={handleKey}
            />
          </div>

          <div className={`input-group ${focused === 'email' ? 'focused' : ''}`}>
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

          <div className={`input-group ${focused === 'password' ? 'focused' : ''}`}>
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="Min. 6 characters"
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused('')}
              onChange={e => setForm({...form, password: e.target.value})}
              onKeyDown={handleKey}
            />
            <div className="password-strength">
              {[1,2,3,4].map(i => (
                <div key={i} className="strength-bar" style={{
                  background: form.password.length >= i * 2
                    ? form.password.length < 4 ? '#ef4444'
                    : form.password.length < 6 ? '#f59e0b'
                    : '#22c55e'
                    : 'rgba(255,255,255,0.06)'
                }} />
              ))}
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating Account...' : 'Get Started →'}
          </button>

          <div className="divider">or</div>

          <p className="switch-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="right-panel">
          <div className="right-panel-bg" />
          <div className="right-panel-grid" />
          <div className="deco-circle deco-1" />
          <div className="deco-circle deco-2" />

          <div className="floating-badge badge-1">
            <div className="badge-dot" />
            Free Forever
          </div>

          <div className="right-content">
            {[
              { num: '100%', label: 'Free to use, always' },
              { num: 'JWT', label: 'Token-based secure auth' },
              { num: 'bcrypt', label: 'Password hashing protection' },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

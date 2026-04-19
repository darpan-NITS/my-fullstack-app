import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ setToken }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const stats = [
    { label: 'Account Status', value: 'Active', icon: '◉', color: '#22c55e' },
    { label: 'Auth Method', value: 'JWT', icon: '⟐', color: '#4ade80' },
    { label: 'Security', value: 'bcrypt', icon: '⬡', color: '#86efac' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .dashboard {
          min-height: 100vh;
          background: #080d08;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .dashboard::before {
          content: '';
          position: fixed;
          top: -300px; left: -300px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 65%);
          pointer-events: none;
        }

        .dashboard::after {
          content: '';
          position: fixed;
          bottom: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Grid background */
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 64px;
          background: rgba(8,13,8,0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-badge {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 50px;
          padding: 6px 14px;
          color: #4ade80;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .live-dot {
          width: 6px; height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .logout-btn {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 10px;
          padding: 8px 18px;
          color: #f87171;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          transform: translateY(-1px);
        }

        /* MAIN CONTENT */
        .main {
          padding: 100px 60px 60px;
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* HERO SECTION */
        .hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 50px;
          gap: 40px;
        }

        .hero-left { flex: 1; }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 50px;
          padding: 6px 14px;
          color: #4ade80;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 52px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin-bottom: 12px;
        }

        .hero-title span { color: #22c55e; }

        .hero-sub {
          color: #6b7280;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.6;
        }

        /* AVATAR CARD */
        .avatar-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          min-width: 200px;
          transition: border-color 0.3s ease;
        }

        .avatar-card:hover { border-color: rgba(34,197,94,0.2); }

        .avatar {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 700;
          color: white;
          box-shadow: 0 8px 30px rgba(34,197,94,0.3);
        }

        .avatar-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
        }

        .avatar-email {
          color: #6b7280;
          font-size: 12px;
          font-weight: 300;
          text-align: center;
        }

        /* INFO CARDS GRID */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 28px;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #22c55e, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .info-card:hover {
          transform: translateY(-4px);
          border-color: rgba(34,197,94,0.15);
          background: rgba(34,197,94,0.03);
        }

        .info-card:hover::before { opacity: 1; }

        .card-icon {
          font-size: 22px;
          margin-bottom: 16px;
          display: block;
        }

        .card-value {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .card-label {
          color: #6b7280;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* ID CARD */
        .id-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          transition: all 0.3s ease;
        }

        .id-card:hover {
          border-color: rgba(34,197,94,0.15);
          background: rgba(34,197,94,0.02);
        }

        .id-label {
          color: #6b7280;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }

        .id-value {
          color: #d1fae5;
          font-size: 14px;
          font-weight: 300;
          font-family: 'Courier New', monospace;
          letter-spacing: 1px;
        }

        .id-badge {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 8px;
          padding: 6px 12px;
          color: #4ade80;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        @media (max-width: 768px) {
          .main { padding: 90px 20px 40px; }
          .hero { flex-direction: column; }
          .hero-title { font-size: 36px; }
          .cards-grid { grid-template-columns: 1fr; }
          .navbar { padding: 0 20px; }
        }
      `}</style>

      <div className="dashboard">
        <div className="grid-bg" />

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">
            <div className="logo-icon">🌿</div>
            <span className="logo-text">Verdant</span>
          </div>
          <div className="nav-right">
            <div className="nav-badge">
              <div className="live-dot" />
              Session Active
            </div>
            <button className="logout-btn" onClick={logout}>Sign Out</button>
          </div>
        </nav>

        {/* MAIN */}
        <main className="main">
          {/* HERO */}
          <div className="hero">
            <div className="hero-left">
              <div className="hero-tag">
                <div className="live-dot" />
                Authenticated
              </div>
              <h1 className="hero-title">
                Hello,<br />
                <span>{user?.name?.split(' ')[0]}.</span>
              </h1>
              <p className="hero-sub">
                You're securely logged in to your account.<br />
                Your session is protected with JWT authentication.
              </p>
            </div>

            <div className="avatar-card">
              <div className="avatar">{initials}</div>
              <div className="avatar-name">{user?.name}</div>
              <div className="avatar-email">{user?.email}</div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="cards-grid">
            {stats.map((stat, i) => (
              <div
                className="info-card"
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span className="card-icon">{stat.icon}</span>
                <div className="card-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="card-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ID CARD */}
          <div className="id-card">
            <div>
              <div className="id-label">User ID</div>
              <div className="id-value">{user?.id}</div>
            </div>
            <div className="id-badge">✓ Verified</div>
          </div>
        </main>
      </div>
    </>
  );
}

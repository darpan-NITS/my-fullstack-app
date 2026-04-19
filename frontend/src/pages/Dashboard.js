import { useNavigate } from 'react-router-dom';

export default function Dashboard({ setToken }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken(null);
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h1 style={styles.title}>Welcome, {user?.name}! 🎉</h1>
        <p style={styles.sub}>You are successfully logged in</p>
        <div style={styles.infoBox}>
          <p style={styles.infoItem}><strong>📧 Email:</strong> {user?.email}</p>
          <p style={styles.infoItem}><strong>🔑 ID:</strong> {user?.id}</p>
        </div>
        <button onClick={logout} style={styles.btn}>
          Logout 👋
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', width:'420px', display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'0 4px 24px rgba(0,0,0,0.1)', textAlign:'center' },
  avatar: { width:'70px', height:'70px', borderRadius:'50%', background:'#4f46e5', color:'white', fontSize:'2rem', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto' },
  title: { margin:0, fontSize:'1.6rem' },
  sub: { color:'#888', margin:0 },
  infoBox: { background:'#f8f8f8', borderRadius:'10px', padding:'1rem', textAlign:'left' },
  infoItem: { margin:'6px 0' },
  btn: { padding:'12px', background:'#ef4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'16px', fontWeight:'bold' }
};
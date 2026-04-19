import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup({ setToken }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Sign up for free</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Full Name"
          onChange={e => setForm({...form, name: e.target.value})}
        />
        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' },
  card: { background:'white', padding:'2.5rem', borderRadius:'16px', width:'380px', display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'0 4px 24px rgba(0,0,0,0.1)' },
  title: { margin:0, fontSize:'1.8rem' },
  subtitle: { margin:0, color:'#888' },
  input: { padding:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'16px', outline:'none' },
  btn: { padding:'12px', background:'#4f46e5', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'16px', fontWeight:'bold' },
  error: { color:'red', fontSize:'14px', margin:0 },
  link: { textAlign:'center', fontSize:'14px' }
};
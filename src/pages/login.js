import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // Use fetch to send a POST request to your login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username, // Assuming username field is used for email
          password: password
        })
      });

      // Check if login was successful based on response status
      if (response.ok) {
        router.push('/dashboard'); // Redirect to dashboard if authentication is successful
      } else {
        console.error('Error logging in user:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in user:', error.message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login Page</h1>
      <form style={styles.form}>
        <label style={styles.label}>
          Email:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        </label>
        <br />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0', 
    backgroundSize: 'cover',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333', 
  },
  form: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#fff', 
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0070f3', 
    color: '#fff', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;

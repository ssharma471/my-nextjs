import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/login">
              <span style={styles.navLink}>Login</span>
            </Link>
          </li>
        </ul>
      </nav>

      <main style={styles.mainContent}>
        <h1 style={styles.heading}>Welcome to ASTROLOGY.CA</h1>
        <p style={styles.description}>
          Explore the amazing features and content we have to offer. Don&apos;t have an account?{&apos;}
          <Link href="/register">
            <span style={styles.link}>Sign up here</span>
          </Link>
          
        </p>
      </main>
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
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  nav: {
    marginBottom: '20px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: 'inline-block',
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.2rem',
  },
  mainContent: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'underline',
  },
};

export default Home;

'use client';

import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to your app</h1>
      <div style={{ marginTop: '20px' }}>
        <Link href="/login">
          <button className='loginButton' style={{ marginRight: '10px', padding: '10px 20px' }}>Login</button>
        </Link>
        <Link href="/register">
          <button className='registerButton' style={{ padding: '10px 20px' }}>Register</button>
        </Link>
      </div>
    </div>
  );
}

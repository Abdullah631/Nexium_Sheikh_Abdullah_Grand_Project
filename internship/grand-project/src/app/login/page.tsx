'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabseClient';
export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMessage(error.message);
    else setMessage("Magic link sent! Check your email.");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Login with Magic Link</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 w-full"
      />
      <button onClick={handleLogin} className="bg-orange-500 text-white px-4 py-2 mt-2">
        Send Magic Link
      </button>
      <p>{message}</p>
    </div>
  );
}

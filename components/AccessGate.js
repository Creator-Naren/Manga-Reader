'use client';

import { useEffect, useState } from 'react';
import { getStoredToken, setStoredToken } from '../lib/access';

export default function AccessGate({ children }) {
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setToken(getStoredToken());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStoredToken(input.trim());
            setToken(input.trim());
          }}
          className="panel bg-ink p-6 w-full max-w-sm space-y-4"
        >
          <h1 className="font-display text-3xl tracking-wide">ACCESS KEY</h1>
          <p className="text-sm text-muted font-body">
            This is a private reader. Enter the access key you set as
            ACCESS_TOKEN on the server.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-2 border-paper px-3 py-2 font-mono text-sm focus:outline-none"
            placeholder="access key"
            autoFocus
          />
          <button
            type="submit"
            className="w-full border-2 border-accent bg-accent text-ink font-display text-lg py-2 hover:bg-paper hover:text-ink transition-colors"
          >
            ENTER
          </button>
        </form>
      </div>
    );
  }

  return children;
}

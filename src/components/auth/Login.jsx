import { useState } from 'react';
import users from 'data/users.json';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (!found) {
      setError('Invalid email or password.');
      return;
    }

    onLogin?.({ id: found.id, name: found.name, email: found.email });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md bg-prim border border-black/10 p-5">
        <h2 className="text-xl font-semibold text-slate-800">Login</h2>
        <p className="text-sm text-slate-600 mt-1">Use a mock user from users.json</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded-md bg-transparent border border-sec px-3 py-2 text-sm outline-none"
              placeholder="oussama@roomify.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 w-full rounded-md bg-transparent border border-sec px-3 py-2 text-sm outline-none"
              placeholder="1234"
              required
            />
          </div>

          {error && <p className="text-sm font-medium text-red-700">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-sec px-4 py-2 text-sm font-medium hover:opacity-85 transition"
          >
            Log in
          </button>
        </form>

        <p className="mt-3 text-xs text-slate-600">
          Demo password for all users: <span className="font-medium">1234</span>
        </p>
      </div>
    </div>
  );
}

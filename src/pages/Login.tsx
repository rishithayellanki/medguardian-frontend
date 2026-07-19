import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from '../components/ThemeToggle'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token)
      navigate('/upload')
    } catch (err: any) {
      setError(err.response?.data || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--paper)] overflow-hidden px-4 transition-colors">
      <svg
        className="absolute -right-40 -bottom-40 w-[560px] h-[560px] opacity-[0.05] pointer-events-none"
        viewBox="160 170 360 360"
      >
        <path
          d="M200,240 Q200,210 230,210 L450,210 Q480,210 480,240 L480,350 Q480,470 340,490 Q200,470 200,350 Z"
          fill="#134E4A"
        />
      </svg>

      <div className="relative w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src="/favicon-square.svg" alt="" className="w-9 h-9" />
            <span className="font-display text-xl font-semibold text-[var(--ink)]">
              MedGuardian
            </span>
            <span className="text-[10px] font-semibold tracking-wide bg-[var(--amber-400)] text-[var(--teal-900)] px-1.5 py-0.5 rounded">
              AI
            </span>
          </div>
          <ThemeToggle />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[var(--surface)] rounded-2xl shadow-xl border-t-4 border-[var(--teal-500)] p-8 transition-colors"
        >
          <h1 className="font-display text-2xl font-semibold text-[var(--ink)] mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--muted)] mb-6">Log in to check your medicines.</p>

          {error && (
            <p
              className="text-sm rounded-lg px-3 py-2 mb-4 border"
              style={{ color: 'var(--danger-text)', background: 'var(--danger-bg)', borderColor: 'var(--danger-border)' }}
            >
              {error}
            </p>
          )}

          <label className="block text-xs font-semibold tracking-wide text-[var(--muted)] uppercase mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded-lg px-3 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-transparent transition-shadow"
            required
          />

          <label className="block text-xs font-semibold tracking-wide text-[var(--muted)] uppercase mb-1.5">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--teal-500)] focus:border-transparent transition-shadow"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--teal-700)]"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--teal-900)] text-white rounded-lg py-2.5 font-medium hover:bg-[var(--teal-950)] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>

          <p className="text-sm text-[var(--muted)] mt-5 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--teal-700)] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
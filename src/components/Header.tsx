import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-[var(--surface)] border-b border-[var(--border-c)] px-6 py-4 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-2">
        <img src="/favicon-square.svg" alt="" className="w-7 h-7" />
        <span className="font-display text-lg font-semibold text-[var(--ink)]">
          MedGuardian
        </span>
        <span className="text-[9px] font-semibold tracking-wide bg-[var(--amber-400)] text-[var(--teal-900)] px-1.5 py-0.5 rounded">
          AI
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
          Log out
        </button>
      </div>
    </header>
  )
}
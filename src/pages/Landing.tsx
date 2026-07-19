import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--paper)] transition-colors">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-20 bg-[var(--surface)]/90 backdrop-blur border-b border-[var(--border-c)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon-square.svg" alt="" className="w-7 h-7" />
            <span className="font-display text-lg font-semibold text-[var(--ink)]">
              MedGuardian
            </span>
            <span className="text-[9px] font-semibold tracking-wide bg-[var(--amber-400)] text-[var(--teal-900)] px-1.5 py-0.5 rounded">
              AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'var(--muted)' }}>
            <a href="#features" className="hover:text-[var(--teal-700)] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[var(--teal-700)] transition-colors">How it works</a>
            <a href="#safety" className="hover:text-[var(--teal-700)] transition-colors">Safety</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-medium hover:underline" style={{ color: 'var(--ink)' }}>
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-[var(--teal-900)] text-white px-4 py-2 rounded-lg hover:bg-[var(--teal-950)] transition-colors"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <svg
          className="absolute -right-32 -top-32 w-[560px] h-[560px] opacity-[0.05] pointer-events-none"
          viewBox="160 170 360 360"
        >
          <path
            d="M200,240 Q200,210 230,210 L450,210 Q480,210 480,240 L480,350 Q480,470 340,490 Q200,470 200,350 Z"
            fill="#134E4A"
          />
        </svg>

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-[var(--surface-2)] text-[var(--teal-700)] px-3 py-1 rounded-full mb-5">
              AI-powered medication safety
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight mb-5">
              Know what's safe
              <br />
              before you take it.
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              Upload prescriptions from any doctor, and MedGuardian checks for
              interactions across all of them — catching the blind spots that
              happen when no single doctor sees the full picture.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="bg-[var(--teal-900)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--teal-950)] transition-colors"
              >
                Get started free
              </Link>
              <Link
                to="/login"
                className="border border-[var(--border-c)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--surface-2)] transition-colors"
                style={{ color: 'var(--ink)' }}
              >
                Log in
              </Link>
            </div>
          </div>

          {/* Mock product preview */}
          <div className="bg-[var(--surface)] rounded-2xl shadow-xl border-t-4 border-[var(--teal-500)] p-6">
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--muted)' }}>
              Interaction found
            </p>
            <div
              className="rounded-lg border p-4 mb-3"
              style={{ background: 'rgba(220,38,38,0.06)', borderColor: '#f87171' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                  Warfarin + Aspirin
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/60" style={{ color: '#dc2626' }}>
                  High risk
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                Both reduce your blood's ability to clot — taken together, this
                significantly raises bleeding risk...
              </p>
            </div>
            <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-c)' }}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                  Aspirin + Paracetamol
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}>
                  Low risk
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3 text-center">
          Everything you need to check your medicines
        </h2>
        <p className="text-center mb-12 max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
          Built to catch what happens between doctors, not just within one prescription.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeatureCard
            title="AI Prescription Scanner"
            desc="Upload a photo of any prescription and let AI extract the medicines, dosages, and frequency automatically."
          />
          <FeatureCard
            title="Multi-Doctor Interaction Check"
            desc="Combine prescriptions from different doctors or visits into one check — catching conflicts no single doctor could see."
          />
          <FeatureCard
            title="Plain-English Explanations"
            desc="Not just a risk label — understand why an interaction happens and what to do about it."
          />
          <FeatureCard
            title="Safety-First by Design"
            desc="Every result is decision support, not a diagnosis — always paired with a reminder to confirm with a professional."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[var(--surface-2)] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-12 text-center">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step number="1" title="Upload or enter" desc="Add prescription photos from any doctor, or type in medicines manually." />
            <Step number="2" title="Confirm details" desc="Review what was extracted and fix anything before checking interactions." />
            <Step number="3" title="Get clear answers" desc="See risk levels, why they matter, and what to do — in plain English." />
          </div>
        </div>
      </section>

      {/* SAFETY NOTE */}
      <section id="safety" className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-xl font-semibold text-[var(--ink)] mb-3">
          A second pair of eyes, not a replacement for one
        </h2>
        <p style={{ color: 'var(--muted)' }}>
          MedGuardian is decision support built on AI, which can be incomplete or
          wrong. It's designed to help you ask better questions — always confirm
          any medication decision with a doctor or pharmacist.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border-c)] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/favicon-square.svg" alt="" className="w-6 h-6" />
            <span className="font-display text-sm font-semibold text-[var(--ink)]">
              MedGuardian AI
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} MedGuardian AI. For informational purposes only — not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[var(--surface)] rounded-xl border border-[var(--border-c)] p-5">
      <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
    </div>
  )
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-[var(--teal-900)] text-white font-display font-semibold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
    </div>
  )
}
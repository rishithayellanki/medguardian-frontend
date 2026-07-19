import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { Interaction, Medicine } from '../api/medicineApi'
import Header from '../components/Header'

const riskStyles: Record<string, React.CSSProperties> = {
  High: { background: 'rgba(220,38,38,0.08)', borderColor: '#f87171', color: '#dc2626' },
  Medium: { background: 'rgba(245,158,11,0.08)', borderColor: '#fbbf24', color: '#d97706' },
  Low: { background: 'rgba(22,163,74,0.08)', borderColor: '#4ade80', color: '#16a34a' },
}

export default function Interactions() {
  const location = useLocation()
  const navigate = useNavigate()

  const interactions = (location.state?.interactions as Interaction[]) || []
  const medicines = (location.state?.medicines as Medicine[]) || []

  const goToMedicineDetail = (medicine: Medicine) => {
    navigate('/medicine', { state: { medicine } })
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] transition-colors">
      <Header />

      <main className="max-w-2xl mx-auto mt-8 px-6 pb-12">
        <h2 className="font-display text-lg font-semibold text-[var(--ink)] mb-1">
          Interaction Results
        </h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Here's what we found — and why it matters, not just whether it's risky. This is
          decision support, not a diagnosis — always confirm with a doctor or pharmacist
          before changing any medication.
        </p>
        <div
          className="flex items-start gap-2 rounded-lg border p-3 mb-6 text-xs"
          style={{ background: 'rgba(251,191,36,0.08)', borderColor: 'var(--amber-400)', color: 'var(--ink)' }}
        >
          <span className="font-semibold shrink-0">⚠ Note:</span>
          <span>
            AI-generated information may be incomplete or incorrect. Always verify with a
            pharmacist or doctor before making any medication decisions.
          </span>
        </div>

        {interactions.length === 0 ? (
          <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 text-center mb-6 transition-colors">
            <p className="font-medium" style={{ color: '#16a34a' }}>
              No interactions found between these medicines.
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Always confirm with a pharmacist if you're unsure.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {interactions.map((interaction, i) => (
              <div
                key={i}
                className="rounded-lg border p-5"
                style={riskStyles[interaction.riskLevel] || { background: 'var(--surface-2)', borderColor: 'var(--border-c)' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold" style={{ color: 'var(--ink)' }}>
                    {interaction.drugA} + {interaction.drugB}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white/50">
                    {interaction.riskLevel} risk
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                    Why
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                    {interaction.why}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--muted)' }}>
                    Recommendation
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                    {interaction.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>
          Your medicines
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {medicines.map((med, i) => (
            <button
              key={i}
              onClick={() => goToMedicineDetail(med)}
              className="bg-[var(--surface)] rounded-lg shadow-sm p-4 text-left hover:shadow-md transition-shadow"
            >
              <p className="font-medium" style={{ color: 'var(--ink)' }}>{med.name}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {med.dosage} {med.frequency && `· ${med.frequency}`}
              </p>
              <p className="text-xs text-[var(--teal-700)] mt-2">View details →</p>
            </button>
          ))}
        </div>

        <Link
          to="/upload"
          className="block text-center border border-[var(--border-c)] rounded py-3 font-medium hover:opacity-80"
          style={{ color: 'var(--ink)' }}
        >
          Scan another prescription
        </Link>
      </main>
    </div>
  )
}
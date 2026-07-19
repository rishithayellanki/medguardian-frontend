import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { explainMedicine, type Medicine, type MedicineExplanation } from '../api/medicineApi'
import Header from '../components/Header'

export default function MedicineDetail() {
  const location = useLocation()
  const navigate = useNavigate()

  const medicine = location.state?.medicine as Medicine | undefined

  const [explanation, setExplanation] = useState<MedicineExplanation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!medicine) return

    explainMedicine(medicine)
      .then(setExplanation)
      .catch(() => setError('Could not load information for this medicine.'))
      .finally(() => setLoading(false))
  }, [medicine])

  if (!medicine) {
    return (
      <div className="min-h-screen bg-[var(--paper)] transition-colors">
        <Header />
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <p className="mb-4" style={{ color: 'var(--muted)' }}>No medicine selected.</p>
          <button onClick={() => navigate('/upload')} className="text-[var(--teal-700)] hover:underline">
            Back to upload
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] transition-colors">
      <Header />

      <main className="max-w-xl mx-auto mt-8 px-6 pb-12">
        <button onClick={() => navigate(-1)} className="text-sm text-[var(--teal-700)] hover:underline mb-4">
          ← Back
        </button>

        <div className="bg-[var(--surface)] rounded-lg shadow-sm p-6 mb-6 transition-colors">
          <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
            {medicine.name}
          </h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {medicine.dosage} {medicine.frequency && `· ${medicine.frequency}`}
          </p>
        </div>
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

        {loading && (
          <div className="flex items-center justify-center py-12 gap-2" style={{ color: 'var(--muted)' }}>
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            Loading medicine information...
          </div>
        )}

        {error && <p className="text-sm" style={{ color: 'var(--danger-text)' }}>{error}</p>}

        {explanation && (
          <div className="space-y-4">
            <Section title="What it's for" content={explanation.uses} />
            <Section title="How to take it" content={explanation.howToTake} />
            <Section title="Side effects" content={explanation.sideEffects} tone="amber" />
            <Section title="Precautions" content={explanation.precautions} tone="amber" />
            <Section title="If you miss a dose" content={explanation.missedDoseGuidance} />
          </div>
        )}
      </main>
    </div>
  )
}

function Section({
  title,
  content,
  tone = 'default',
}: {
  title: string
  content: string
  tone?: 'default' | 'amber'
}) {
  return (
    <div
      className="rounded-lg border p-5 transition-colors"
      style={
        tone === 'amber'
          ? { background: 'rgba(251,191,36,0.08)', borderColor: 'var(--amber-400)' }
          : { background: 'var(--surface)', borderColor: 'var(--border-c)' }
      }
    >
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{content}</p>
    </div>
  )
}
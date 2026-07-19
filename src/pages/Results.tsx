import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { checkInteractions, type Medicine } from '../api/medicineApi'
import Header from '../components/Header'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()

  const initialMedicines = (location.state?.medicines as Medicine[]) || []
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...medicines]
    updated[index] = { ...updated[index], [field]: value }
    setMedicines(updated)
  }

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index))
  }

  const handleCheckInteractions = async () => {
    if (medicines.length === 0) return
    setLoading(true)
    setError('')

    try {
      const names = medicines.map((m) => m.name)
      const result = await checkInteractions(names)
      navigate('/interactions', { state: { interactions: result.interactions, medicines } })
    } catch (err) {
      setError('Could not check interactions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (medicines.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--paper)] transition-colors">
        <Header />
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <p className="mb-4" style={{ color: 'var(--muted)' }}>
            No medicines were found. Try uploading a clearer image.
          </p>
          <Link to="/upload" className="text-[var(--teal-700)] hover:underline">
            Back to upload
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] transition-colors">
      <Header />

      <main className="max-w-2xl mx-auto mt-8 px-6 pb-12">
        <h2 className="font-display text-lg font-semibold text-[var(--ink)] mb-1">
          Confirm your medicines
        </h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Review what we extracted. Edit anything that looks wrong before checking interactions.
        </p>

        <div className="space-y-3 mb-6">
          {medicines.map((med, i) => (
            <div
              key={i}
              className="bg-[var(--surface)] rounded-lg shadow-sm p-4 flex gap-3 items-start transition-colors"
            >
              <div className="flex-1 grid grid-cols-3 gap-2">
                <input
                  value={med.name}
                  onChange={(e) => updateMedicine(i, 'name', e.target.value)}
                  placeholder="Medicine name"
                  className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm font-medium col-span-3 sm:col-span-1"
                />
                <input
                  value={med.dosage}
                  onChange={(e) => updateMedicine(i, 'dosage', e.target.value)}
                  placeholder="Dosage"
                  className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm"
                />
                <input
                  value={med.frequency}
                  onChange={(e) => updateMedicine(i, 'frequency', e.target.value)}
                  placeholder="Frequency"
                  className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm"
                />
              </div>
              <button
                onClick={() => removeMedicine(i)}
                className="text-sm px-2"
                style={{ color: 'var(--muted)' }}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm mb-4" style={{ color: 'var(--danger-text)' }}>
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <Link
            to="/upload"
            className="flex-1 text-center border border-[var(--border-c)] rounded py-3 font-medium hover:opacity-80"
            style={{ color: 'var(--ink)' }}
          >
            Back
          </Link>
          <button
            onClick={handleCheckInteractions}
            disabled={loading || medicines.length === 0}
            className="flex-1 bg-[var(--teal-900)] text-white rounded py-3 font-medium hover:bg-[var(--teal-950)] disabled:opacity-40 flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Checking...
              </>
            ) : (
              'Check Interactions'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
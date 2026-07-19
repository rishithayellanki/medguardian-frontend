import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { scanPrescription, type Medicine } from '../api/medicineApi'
import Header from '../components/Header'

type Mode = 'upload' | 'manual'

interface PendingFile {
  file: File
  previewUrl: string
}

export default function Upload() {
  const [mode, setMode] = useState<Mode>('upload')

  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
  const [loading, setLoading] = useState(false)
  const [progressText, setProgressText] = useState('')
  const [error, setError] = useState('')

  const [manualMedicines, setManualMedicines] = useState<Medicine[]>([
    { name: '', dosage: '', frequency: '' },
  ])

  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    if (selected.length === 0) return

    const newEntries = selected.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    setPendingFiles((prev) => [...prev, ...newEntries])
    setError('')
    e.target.value = '' // allow re-selecting the same file again if needed
  }

  const removeFile = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleScanAll = async () => {
    if (pendingFiles.length === 0) return
    setLoading(true)
    setError('')

    const allMedicines: Medicine[] = []

    try {
      for (let i = 0; i < pendingFiles.length; i++) {
        setProgressText(`Reading prescription ${i + 1} of ${pendingFiles.length}...`)
        const result = await scanPrescription(pendingFiles[i].file)
        allMedicines.push(...(result.medicines as Medicine[]))
      }

      navigate('/results', { state: { medicines: allMedicines } })
    } catch (err: any) {
      setError(
        'Could not read one of the prescriptions. Try clearer images, or remove the problematic one and try again.'
      )
    } finally {
      setLoading(false)
      setProgressText('')
    }
  }

  const updateManualMedicine = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...manualMedicines]
    updated[index] = { ...updated[index], [field]: value }
    setManualMedicines(updated)
  }

  const addManualRow = () => {
    setManualMedicines([...manualMedicines, { name: '', dosage: '', frequency: '' }])
  }

  const removeManualRow = (index: number) => {
    setManualMedicines(manualMedicines.filter((_, i) => i !== index))
  }

  const handleManualContinue = () => {
    const valid = manualMedicines.filter((m) => m.name.trim() !== '')
    if (valid.length === 0) {
      setError('Enter at least one medicine name.')
      return
    }
    navigate('/results', { state: { medicines: valid } })
  }

  return (
    <div className="min-h-screen bg-[var(--paper)] transition-colors">
      <Header />

      <main className="max-w-lg mx-auto mt-12 px-6">
        <div className="bg-[var(--surface)] rounded-2xl shadow-xl border-t-4 border-[var(--teal-500)] p-8 transition-colors">
          <div className="flex rounded-lg bg-[var(--surface-2)] p-1 mb-6">
            <button
              onClick={() => {
                setMode('upload')
                setError('')
              }}
              className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
              style={
                mode === 'upload'
                  ? { background: 'var(--surface)', color: 'var(--teal-700)' }
                  : { color: 'var(--muted)' }
              }
            >
              Upload Prescriptions
            </button>
            <button
              onClick={() => {
                setMode('manual')
                setError('')
              }}
              className="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
              style={
                mode === 'manual'
                  ? { background: 'var(--surface)', color: 'var(--teal-700)' }
                  : { color: 'var(--muted)' }
              }
            >
              Enter Manually
            </button>
          </div>

          {mode === 'upload' && (
            <>
              <h2 className="font-display text-lg font-semibold text-[var(--ink)] mb-1">
                Upload prescriptions
              </h2>
              <p className="text-sm text-[var(--muted)] mb-6">
                Add images from different doctors or visits — we'll combine everything before
                checking interactions. This catches conflicts a single doctor might not see.
              </p>

              {pendingFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {pendingFiles.map((pf, i) => (
                    <div key={i} className="relative">
                      <img
                        src={pf.previewUrl}
                        alt={`Prescription ${i + 1}`}
                        className="w-full h-24 object-cover rounded border border-[var(--border-c)]"
                      />
                      <button
                        onClick={() => removeFile(i)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow text-red-500 text-xs flex items-center justify-center border border-[var(--border-c)]"
                        title="Remove"
                      >
                        ✕
                      </button>
                      <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[var(--border-c)] rounded cursor-pointer hover:border-[var(--teal-500)] transition-colors mb-4"
              >
                <span className="text-[var(--muted)] text-sm">
                  {pendingFiles.length === 0
                    ? 'Click to select one or more images'
                    : '+ Add another prescription'}
                </span>
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {error && (
                <p className="text-sm mb-4" style={{ color: 'var(--danger-text)' }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleScanAll}
                disabled={pendingFiles.length === 0 || loading}
                className="w-full bg-[var(--teal-900)] text-white rounded-lg py-3 font-medium hover:bg-[var(--teal-950)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    {progressText || 'Reading prescriptions...'}
                  </>
                ) : (
                  `Scan ${pendingFiles.length > 1 ? `${pendingFiles.length} Prescriptions` : 'Prescription'}`
                )}
              </button>
            </>
          )}

          {mode === 'manual' && (
            <>
              <h2 className="font-display text-lg font-semibold text-[var(--ink)] mb-1">
                Enter medicines manually
              </h2>
              <p className="text-sm text-[var(--muted)] mb-6">
                Add each medicine you want to check, with dosage and frequency if known.
              </p>

              <div className="space-y-3 mb-4">
                {manualMedicines.map((med, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input
                        value={med.name}
                        onChange={(e) => updateManualMedicine(i, 'name', e.target.value)}
                        placeholder="Medicine name"
                        className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm col-span-3 sm:col-span-1"
                      />
                      <input
                        value={med.dosage}
                        onChange={(e) => updateManualMedicine(i, 'dosage', e.target.value)}
                        placeholder="Dosage (optional)"
                        className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm"
                      />
                      <input
                        value={med.frequency}
                        onChange={(e) => updateManualMedicine(i, 'frequency', e.target.value)}
                        placeholder="Frequency (optional)"
                        className="border border-[var(--border-c)] bg-[var(--surface)] text-[var(--ink)] rounded px-2 py-1.5 text-sm"
                      />
                    </div>
                    {manualMedicines.length > 1 && (
                      <button
                        onClick={() => removeManualRow(i)}
                        className="text-sm px-1 pt-1.5"
                        style={{ color: 'var(--muted)' }}
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addManualRow}
                className="text-sm text-[var(--teal-700)] hover:underline mb-6"
              >
                + Add another medicine
              </button>

              {error && (
                <p className="text-sm mb-4" style={{ color: 'var(--danger-text)' }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleManualContinue}
                className="w-full bg-[var(--teal-900)] text-white rounded-lg py-3 font-medium hover:bg-[var(--teal-950)] transition-colors"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
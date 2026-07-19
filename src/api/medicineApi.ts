import api from './client'

export interface Medicine {
  name: string
  dosage: string
  frequency: string
}

export interface ScanResponse {
  prescription: { id: number; userId: number; imageUrl: string }
  medicines: Medicine[]
}

export interface Interaction {
  drugA: string
  drugB: string
  riskLevel: 'High' | 'Medium' | 'Low'
  why: string
  recommendation: string
}

export interface MedicineExplanation {
  uses: string
  howToTake: string
  sideEffects: string
  precautions: string
  missedDoseGuidance: string
}

export async function scanPrescription(file: File): Promise<ScanResponse> {
  const formData = new FormData()
  formData.append('image', file)

  const res = await api.post('/prescriptions/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function checkInteractions(medicineNames: string[]): Promise<{ interactions: Interaction[] }> {
  const res = await api.post('/interactions/check', { medicines: medicineNames })
  return res.data
}

export async function explainMedicine(medicine: Medicine): Promise<MedicineExplanation> {
  const res = await api.post('/medicines/explain', medicine)
  return res.data
}
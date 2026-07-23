import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { useAuth } from './auth'

export type Car = {
  id: string
  make: string
  model: string
  year: string
  plate: string
  vin: string
  bundle?: string
}

type CarsState = {
  cars: Car[]
  /** The car shown on the home hero — first one for now. */
  selectedCar: Car | null
  addCar: (car: Omit<Car, 'id'>) => void
}

const CarsContext = createContext<CarsState | null>(null)

/** Pre-registered demo accounts (phone → their cars) so returning users log in
 * to an existing garage. Any other number is treated as a brand-new user. */
const SEED_ACCOUNTS: Record<string, Car[]> = {
  '+994506660050': [
    {
      id: 'seed-corolla',
      make: 'Toyota',
      model: 'Corolla',
      year: '2024',
      plate: '90 HB 505',
      vin: '',
      bundle: 'LE',
    },
  ],
}

export function CarsProvider({ children }: { children: ReactNode }) {
  const { phone } = useAuth()
  // Cars are keyed by phone number and survive logout within a session, so a
  // returning user keeps their garage while a new number starts empty.
  const [accounts, setAccounts] = useState<Record<string, Car[]>>(SEED_ACCOUNTS)

  const value = useMemo<CarsState>(() => {
    const cars = phone ? accounts[phone] ?? [] : []
    return {
      cars,
      selectedCar: cars[0] ?? null,
      addCar(car) {
        if (!phone) return
        setAccounts((prev) => ({
          ...prev,
          [phone]: [...(prev[phone] ?? []), { ...car, id: crypto.randomUUID() }],
        }))
      },
    }
  }, [accounts, phone])

  return <CarsContext.Provider value={value}>{children}</CarsContext.Provider>
}

export function useCars() {
  const ctx = useContext(CarsContext)
  if (!ctx) throw new Error('useCars must be used within CarsProvider')
  return ctx
}

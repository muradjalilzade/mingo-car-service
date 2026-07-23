import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type AuthState = {
  /** Full E.164 number, e.g. +994501234567 */
  phone: string | null
  /** The mock OTP we "sent" — surfaced in the UI since there is no real SMS gateway. */
  pendingCode: string | null
  isVerified: boolean
  /** Begins registration, generates a fresh demo code, and returns it. */
  startRegistration: (phone: string) => string
  /** Regenerates and returns a new demo code (used by "Resend"). */
  resend: () => string
  /** Returns true when the entered code matches the pending one. */
  verify: (code: string) => boolean
  reset: () => void
}

const AuthContext = createContext<AuthState | null>(null)

/** Fixed mock OTP for the prototype — a real SMS gateway would replace this. */
const STATIC_OTP = '6666'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<string | null>(null)
  const [pendingCode, setPendingCode] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)

  const value = useMemo<AuthState>(
    () => ({
      phone,
      pendingCode,
      isVerified,
      startRegistration(p) {
        setPhone(p)
        setPendingCode(STATIC_OTP)
        setIsVerified(false)
        return STATIC_OTP
      },
      resend() {
        setPendingCode(STATIC_OTP)
        return STATIC_OTP
      },
      verify(code) {
        const ok = pendingCode !== null && code === pendingCode
        if (ok) setIsVerified(true)
        return ok
      },
      reset() {
        setPhone(null)
        setPendingCode(null)
        setIsVerified(false)
      },
    }),
    [phone, pendingCode, isVerified],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

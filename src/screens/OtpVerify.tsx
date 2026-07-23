import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { useI18n } from '../i18n/I18nProvider'

const LENGTH = 4
const RESEND_SECONDS = 30

export default function OtpVerify() {
  const navigate = useNavigate()
  const { phone, verify, resend } = useAuth()
  const { t } = useI18n()
  const [values, setValues] = useState<string[]>(Array(LENGTH).fill(''))
  const [error, setError] = useState(false)
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const inputs = useRef<Array<HTMLInputElement | null>>([])

  // No phone in state means the user landed here directly — send them back.
  useEffect(() => {
    if (!phone) navigate('/register', { replace: true })
  }, [phone, navigate])

  // Resend countdown.
  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [seconds])

  function setDigit(index: number, digit: string) {
    const clean = digit.replace(/\D/g, '').slice(-1)
    setValues((prev) => {
      const next = [...prev]
      next[index] = clean
      return next
    })
    setError(false)
    if (clean && index < LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  function onKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
    if (!text) return
    e.preventDefault()
    const next = Array(LENGTH).fill('')
    for (let i = 0; i < text.length; i++) next[i] = text[i]
    setValues(next)
    inputs.current[Math.min(text.length, LENGTH - 1)]?.focus()
  }

  function submit() {
    const code = values.join('')
    if (code.length < LENGTH) return
    if (verify(code)) {
      navigate('/home', { replace: true })
    } else {
      setError(true)
      setValues(Array(LENGTH).fill(''))
      inputs.current[0]?.focus()
    }
  }

  // Auto-submit once all boxes are filled.
  useEffect(() => {
    if (values.every((v) => v !== '')) submit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  function onResend() {
    resend()
    setSeconds(RESEND_SECONDS)
    setValues(Array(LENGTH).fill(''))
    setError(false)
    inputs.current[0]?.focus()
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-8">
      <button
        onClick={() => navigate('/register')}
        className="mt-4 -ml-1 flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
        aria-label="Back"
      >
        ‹
      </button>

      <div className="mt-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          {t('verifyTitle')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t('verifySubtitle', { len: LENGTH })}{' '}
          <span className="font-semibold text-slate-700">{phone}</span>
        </p>
      </div>

      {/* OTP boxes */}
      <div className="mt-7 flex justify-between gap-3">
        {values.map((v, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            value={v}
            inputMode="numeric"
            maxLength={1}
            autoFocus={i === 0}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            className={`h-16 w-full rounded-2xl border text-center text-2xl font-bold text-slate-900 outline-none transition ${
              error
                ? 'border-red-300 bg-red-50 ring-2 ring-red-100'
                : v
                ? 'border-brand-500 bg-white ring-2 ring-brand-100'
                : 'border-slate-200 bg-white'
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="mt-3 text-center text-sm font-medium text-red-500">
          {t('incorrectCode')}
        </p>
      )}

      {/* Resend */}
      <div className="mt-6 text-center text-sm text-slate-500">
        {seconds > 0 ? (
          <span>
            {t('resendIn')}{' '}
            <span className="font-semibold text-slate-700">0:{String(seconds).padStart(2, '0')}</span>
          </span>
        ) : (
          <button
            onClick={onResend}
            className="font-semibold text-brand-600 hover:underline"
          >
            {t('resendCode')}
          </button>
        )}
      </div>

      <div className="mt-auto pt-10">
        <button
          onClick={submit}
          disabled={values.some((v) => !v)}
          className="w-full rounded-2xl bg-brand-600 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  )
}

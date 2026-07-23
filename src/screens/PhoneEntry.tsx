import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { useI18n } from '../i18n/I18nProvider'

/** Formats up to 9 local digits as "XX XXX XX XX". */
function formatAz(digits: string) {
  const d = digits.slice(0, 9)
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)]
    .filter(Boolean)
    .join(' ')
}

export default function PhoneEntry() {
  const [digits, setDigits] = useState('')
  const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()
  const { startRegistration } = useAuth()
  const { t } = useI18n()

  const valid = digits.length === 9 && agreed

  function onSubmit() {
    if (!valid) return
    // A real app sends an SMS here; the mock code is surfaced on the next screen.
    startRegistration('+994' + digits)
    navigate('/verify')
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-8">
      {/* Brand */}
      <div className="mt-8 flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-3xl shadow-lg shadow-brand-600/30">
          🔧
        </div>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900">
          minGO
        </h1>
        <p className="mt-1 text-sm text-slate-500">{t('tagline')}</p>
      </div>

      {/* Form */}
      <div className="mt-10">
        <label className="text-sm font-semibold text-slate-700">
          {t('phoneNumber')}
        </label>
        <div className="mt-2 flex items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
          <div className="flex items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-4 text-base font-semibold text-slate-700">
            <span>🇦🇿</span>
            <span>+994</span>
          </div>
          <input
            autoFocus
            inputMode="numeric"
            placeholder="50 123 45 67"
            value={formatAz(digits)}
            onChange={(e) => setDigits(e.target.value.replace(/\D/g, '').slice(0, 9))}
            className="w-full bg-transparent px-4 py-4 text-lg font-medium text-slate-900 outline-none placeholder:text-slate-300"
          />
        </div>
        <p className="mt-2 text-xs text-slate-400">{t('smsHint')}</p>

        {/* Consent */}
        <button
          type="button"
          onClick={() => setAgreed((v) => !v)}
          className="mt-6 flex w-full items-start gap-3 text-left"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border text-xs text-white transition ${
              agreed
                ? 'border-brand-600 bg-brand-600'
                : 'border-slate-300 bg-white'
            }`}
          >
            {agreed ? '✓' : ''}
          </span>
          <span className="text-xs leading-relaxed text-slate-500">
            {t('consent')}
          </span>
        </button>
      </div>

      {/* Spacer + CTA */}
      <div className="mt-auto pt-10">
        <button
          onClick={onSubmit}
          disabled={!valid}
          className="w-full rounded-2xl bg-brand-600 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {t('sendCode')}
        </button>
      </div>
    </div>
  )
}

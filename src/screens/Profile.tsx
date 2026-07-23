import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { useI18n } from '../i18n/I18nProvider'
import { LANGUAGES } from '../i18n/translations'

export default function Profile() {
  const navigate = useNavigate()
  const { phone, reset } = useAuth()
  const { t, lang, setLang } = useI18n()

  function logout() {
    reset()
    navigate('/register', { replace: true })
  }

  return (
    <div className="min-h-full bg-slate-50 pb-10">
      {/* Header */}
      <div className="flex items-center gap-1 px-4 pt-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-slate-500 hover:bg-slate-100"
        >
          ‹
        </button>
        <h1 className="text-lg font-extrabold text-slate-900">
          {t('profile.title')}
        </h1>
      </div>

      {/* Profile card */}
      <div className="mt-4 px-5">
        <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-slate-900">
              {phone ?? '+994 50 123 45 67'}
            </p>
            <p className="text-xs text-slate-400">{t('profile.title')}</p>
          </div>
        </div>
      </div>

      {/* Language selection */}
      <div className="mt-6 px-5">
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {t('profile.language')}
        </h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          {LANGUAGES.map((l, i) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-slate-50 ${
                i > 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <span className="text-xl leading-none">{l.flag}</span>
              <span className="flex-1 text-sm font-medium text-slate-700">
                {l.label}
              </span>
              {l.code === lang && (
                <span className="text-base font-bold text-brand-600">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Log out */}
      <div className="mt-6 px-5">
        <button
          onClick={logout}
          className="w-full rounded-2xl bg-white py-3.5 text-sm font-semibold text-red-500 shadow-sm ring-1 ring-slate-100 active:scale-[0.99]"
        >
          {t('profile.logout')}
        </button>
      </div>
    </div>
  )
}

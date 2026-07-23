import { useNavigate } from 'react-router-dom'
import { PRIMARY_SERVICE_IDS, SERVICES } from '../data/services'
import { useI18n } from '../i18n/I18nProvider'
import { useCars } from '../store/cars'
import PromoCarousel from '../components/PromoCarousel'

const primary = PRIMARY_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id)!)
const more = SERVICES.filter(
  (s) => !PRIMARY_SERVICE_IDS.includes(s.id) && s.id !== 'diagnostics',
)

export default function Home() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { selectedCar } = useCars()

  return (
    <div className="min-h-full bg-slate-50 pb-24">
      {/* Header (top-right reserved for the language switcher) */}
      <div className="px-5 pt-3">
        <p className="text-xs text-slate-400">{t('welcomeBack')} 👋</p>
        <h1 className="text-lg font-extrabold text-slate-900">{t('myGarage')}</h1>
      </div>

      {/* Hero: car + diagnostics, or the add-car empty state for newcomers */}
      <div className="mt-4 px-5">
        {selectedCar ? (
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-xl shadow-brand-600/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-brand-100">
                  {selectedCar.make} {selectedCar.model} · {selectedCar.year}
                </p>
                <p className="text-lg font-bold">{selectedCar.plate}</p>
              </div>
              <span className="text-3xl">🚗</span>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-lg">
                ⚠️
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {t('issuesAttention', { count: 2 })}
                </p>
                <p className="text-xs text-brand-100">{t('issueDetail')}</p>
              </div>
              <span className="text-brand-100">›</span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-brand-200 bg-brand-50/60 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
              🚗
            </div>
            <p className="mt-3 text-base font-bold text-slate-900">
              {t('home.noCarTitle')}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {t('home.noCarSubtitle')}
            </p>
            <button
              onClick={() => navigate('/cars/add')}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 active:scale-95"
            >
              + {t('home.addCar')}
            </button>
          </div>
        )}
      </div>

      {/* Promotions / campaigns carousel */}
      <div className="mt-5">
        <PromoCarousel />
      </div>

      {/* Book CTA — only once a car exists */}
      {selectedCar && (
        <div className="mt-4 px-5">
          <button
            onClick={() => navigate('/book')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-500/30 active:scale-[0.99]"
          >
            📅 {t('bookAppointment')}
          </button>
        </div>
      )}

      {/* Primary services */}
      <div className="mt-6 px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">{t('services')}</h2>
          <button className="text-xs font-semibold text-brand-600">
            {t('seeAll')}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {primary.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate('/book', { state: { serviceId: s.id } })}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 active:scale-[0.97]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-xl">
                {s.icon}
              </span>
              <span className="text-center text-xs font-semibold leading-tight text-slate-700">
                {t(`service.${s.id}`)}
              </span>
              <span className="text-[10px] text-slate-400">
                {s.priceMin}–{s.priceMax} ₼
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* More services */}
      <div className="mt-5 px-5">
        <h2 className="mb-3 text-base font-bold text-slate-900">{t('more')}</h2>
        <div className="space-y-2.5">
          {more.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate('/book', { state: { serviceId: s.id } })}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 active:scale-[0.99]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg">
                {s.icon}
              </span>
              <span className="flex-1 text-left text-sm font-semibold text-slate-700">
                {t(`service.${s.id}`)}
              </span>
              <span className="text-xs text-slate-400">
                {s.priceMin}–{s.priceMax} ₼
              </span>
              <span className="text-slate-300">›</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom nav (visual) */}
      <div className="fixed bottom-0 left-1/2 z-30 w-[366px] -translate-x-1/2 rounded-b-[2.3rem] border-t border-slate-100 bg-white/95 px-8 pb-5 pt-3 backdrop-blur">
        <div className="flex items-center justify-between text-[10px] font-medium">
          {[
            { icon: '🏠', key: 'nav.home', active: true, to: '/home' },
            { icon: '📅', key: 'nav.bookings', active: false },
            { icon: '🚗', key: 'nav.cars', active: false },
            { icon: '👤', key: 'nav.profile', active: false, to: '/profile' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => item.to && navigate(item.to)}
              className={`flex flex-col items-center gap-1 ${
                item.active ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {t(item.key)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

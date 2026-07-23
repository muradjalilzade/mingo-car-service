import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { useCars } from '../store/cars'
import { SERVICES } from '../data/services'
import { SHOPS } from '../data/shops'

const STEPS = ['shop', 'car', 'services', 'time', 'confirm'] as const
type Step = (typeof STEPS)[number]

export default function Booking() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useI18n()
  const { cars, selectedCar } = useCars()

  const preselected = (location.state as { serviceId?: string } | null)?.serviceId

  const [stepIndex, setStepIndex] = useState(0)
  const [shopId, setShopId] = useState<string | null>(SHOPS[0].id) // nearest preselected
  const [carId, setCarId] = useState<string | null>(selectedCar?.id ?? null)
  const [serviceIds, setServiceIds] = useState<string[]>(preselected ? [preselected] : [])
  const [slot, setSlot] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const step: Step = STEPS[stepIndex]
  const shop = SHOPS.find((s) => s.id === shopId) ?? null
  const car = cars.find((c) => c.id === carId) ?? null
  const chosen = SERVICES.filter((s) => serviceIds.includes(s.id))
  const totalMin = chosen.reduce((n, s) => n + s.priceMin, 0)
  const totalMax = chosen.reduce((n, s) => n + s.priceMax, 0)

  const canNext =
    step === 'shop'
      ? !!shopId
      : step === 'car'
        ? !!carId
        : step === 'services'
          ? serviceIds.length > 0
          : step === 'time'
            ? !!slot
            : true

  const titles: Record<Step, string> = {
    shop: t('booking.pickShop'),
    car: t('booking.pickCar'),
    services: t('booking.pickServices'),
    time: t('booking.pickTime'),
    confirm: t('booking.review'),
  }

  function back() {
    if (stepIndex === 0) navigate(-1)
    else setStepIndex((i) => i - 1)
  }
  function next() {
    if (!canNext) return
    if (step === 'confirm') setDone(true)
    else setStepIndex((i) => i + 1)
  }
  function toggleService(id: string) {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  if (done) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
          ✓
        </div>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
          {t('booking.successTitle')}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {shop?.name} · {t('booking.today')}, {slot}
        </p>
        <button
          onClick={() => navigate('/home', { replace: true })}
          className="mt-8 w-full rounded-2xl bg-brand-600 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 active:scale-[0.99]"
        >
          {t('booking.backHome')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      {/* Header + progress */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-1">
          <button
            onClick={back}
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-slate-500 hover:bg-slate-100"
          >
            ‹
          </button>
          <h1 className="text-lg font-extrabold text-slate-900">{titles[step]}</h1>
          <span className="ml-auto pr-2 text-xs font-semibold text-slate-400">
            {stepIndex + 1}/{STEPS.length}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 py-5">
        {step === 'shop' && (
          <div>
            <p className="mb-3 text-xs font-medium text-slate-400">
              {t('booking.locationCaption')}
            </p>
            <div className="space-y-2.5">
              {SHOPS.map((s, i) => {
                const active = s.id === shopId
                return (
                  <button
                    key={s.id}
                    onClick={() => setShopId(s.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border bg-white p-3.5 text-left transition ${
                      active
                        ? 'border-brand-500 ring-2 ring-brand-100'
                        : 'border-slate-200'
                    }`}
                  >
                    <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-brand-50 text-lg">
                      🔧
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{s.name}</p>
                        {i === 0 && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            {t('booking.nearest')}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">{s.address}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        ⭐ {s.rating} · {s.distanceKm} km
                      </p>
                    </div>
                    <span
                      className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs text-white ${
                        active ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                      }`}
                    >
                      {active ? '✓' : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 'car' && (
          <div className="space-y-2.5">
            {cars.map((c) => {
              const active = c.id === carId
              return (
                <button
                  key={c.id}
                  onClick={() => setCarId(c.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border bg-white p-3.5 text-left transition ${
                    active ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200'
                  }`}
                >
                  <span className="text-2xl">🚗</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      {c.make} {c.model} · {c.year}
                    </p>
                    <p className="text-xs text-slate-500">{c.plate}</p>
                  </div>
                  <span
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border text-xs text-white ${
                      active ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                    }`}
                  >
                    {active ? '✓' : ''}
                  </span>
                </button>
              )
            })}
            <button
              onClick={() => navigate('/cars/add')}
              className="w-full rounded-2xl border-2 border-dashed border-slate-300 py-3 text-sm font-semibold text-brand-600"
            >
              + {t('home.addCar')}
            </button>
          </div>
        )}

        {step === 'services' && (
          <div className="space-y-2.5">
            {SERVICES.map((s) => {
              const active = serviceIds.includes(s.id)
              return (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left transition ${
                    active ? 'border-brand-500 ring-2 ring-brand-100' : 'border-slate-200'
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-lg">
                    {s.icon}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700">
                      {t(`service.${s.id}`)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {s.priceMin}–{s.priceMax} ₼
                    </p>
                  </div>
                  <span
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border text-xs text-white ${
                      active ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                    }`}
                  >
                    {active ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {step === 'time' && (
          <div>
            <p className="mb-1 text-sm font-bold text-slate-900">{shop?.name}</p>
            <p className="mb-4 text-xs text-slate-400">{t('booking.today')}</p>
            <div className="grid grid-cols-3 gap-2.5">
              {shop?.slots.map((sl) => {
                const active = sl === slot
                return (
                  <button
                    key={sl}
                    onClick={() => setSlot(sl)}
                    className={`rounded-2xl border py-3 text-sm font-semibold transition ${
                      active
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {sl}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <SummaryRow label={t('booking.summaryShop')} value={shop?.name ?? '—'} sub={shop?.address} />
              <Divider />
              <SummaryRow
                label={t('booking.summaryCar')}
                value={car ? `${car.make} ${car.model} · ${car.year}` : '—'}
                sub={car?.plate}
              />
              <Divider />
              <SummaryRow
                label={t('booking.summaryWhen')}
                value={`${t('booking.today')}, ${slot ?? '—'}`}
              />
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t('services')}
              </p>
              <div className="space-y-1.5">
                {chosen.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">
                      {s.icon} {t(`service.${s.id}`)}
                    </span>
                    <span className="text-slate-400">
                      {s.priceMin}–{s.priceMax} ₼
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-8 pt-2">
        {(step === 'services' || step === 'confirm') && chosen.length > 0 && (
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-sm text-slate-500">{t('booking.estimated')}</span>
            <span className="text-lg font-extrabold text-slate-900">
              {totalMin}–{totalMax} ₼
            </span>
          </div>
        )}
        <button
          onClick={next}
          disabled={!canNext}
          className="w-full rounded-2xl bg-brand-600 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {step === 'confirm' ? t('booking.confirm') : t('booking.next')}
        </button>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="text-right">
        <p className="text-sm font-semibold text-slate-900">{value}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  )
}

function Divider() {
  return <div className="my-2 h-px bg-slate-100" />
}

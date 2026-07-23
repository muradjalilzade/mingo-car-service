import { useState, type InputHTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCars } from '../store/cars'
import { useI18n } from '../i18n/I18nProvider'
import { CAR_MAKES, CAR_YEARS } from '../data/carCatalog'

function Field({
  label,
  optional,
  ...props
}: { label: string; optional?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-slate-400">{optional}</span>
        )}
      </span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  )
}

function Select({
  label,
  optional,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string
  optional?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder: string
  disabled?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {optional && (
          <span className="ml-1 text-xs font-normal text-slate-400">{optional}</span>
        )}
      </span>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-10 text-base outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300 ${
            value ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-slate-900">
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          ▾
        </span>
      </div>
    </label>
  )
}

export default function AddCar() {
  const navigate = useNavigate()
  const { addCar } = useCars()
  const { t } = useI18n()
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    plate: '',
    vin: '',
    bundle: '',
  })

  const selectedMake = CAR_MAKES.find((m) => m.name === form.make)
  const models = selectedMake?.models ?? []
  const bundles = selectedMake?.bundles ?? []

  const valid = form.make && form.model && form.year && form.plate.trim()

  function onMakeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // Changing make invalidates the model/trim picked for the previous make.
    setForm((f) => ({ ...f, make: e.target.value, model: '', bundle: '' }))
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  function submit() {
    if (!valid) return
    addCar(form)
    navigate('/home', { replace: true })
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50 pb-8">
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
          {t('addCar.title')}
        </h1>
      </div>

      {/* Form */}
      <div className="mt-4 space-y-4 px-5">
        <Select
          label={t('addCar.make')}
          value={form.make}
          onChange={onMakeChange}
          options={CAR_MAKES.map((m) => m.name)}
          placeholder={t('addCar.select')}
        />
        <Select
          label={t('addCar.model')}
          value={form.model}
          onChange={set('model')}
          options={models}
          placeholder={t('addCar.select')}
          disabled={!form.make}
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <Select
              label={t('addCar.year')}
              value={form.year}
              onChange={set('year')}
              options={CAR_YEARS}
              placeholder={t('addCar.select')}
            />
          </div>
          <div className="flex-1">
            <Field
              label={t('addCar.plate')}
              value={form.plate}
              onChange={set('plate')}
              placeholder="10 RL 456"
            />
          </div>
        </div>
        <Select
          label={t('addCar.bundle')}
          optional={t('addCar.optional')}
          value={form.bundle}
          onChange={set('bundle')}
          options={bundles}
          placeholder={t('addCar.select')}
          disabled={!form.make}
        />
        <Field
          label={t('addCar.vin')}
          optional={t('addCar.optional')}
          value={form.vin}
          onChange={set('vin')}
          placeholder="JTDBR32E..."
        />
      </div>

      {/* Save */}
      <div className="mt-auto px-5 pt-8">
        <button
          onClick={submit}
          disabled={!valid}
          className="w-full rounded-2xl bg-brand-600 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
        >
          {t('addCar.save')}
        </button>
      </div>
    </div>
  )
}

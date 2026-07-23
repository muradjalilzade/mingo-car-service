import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { PROMOS } from '../data/promos'

/** Auto-advancing, swipeable banner carousel for campaigns / offers. */
export default function PromoCarousel() {
  const { t } = useI18n()
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Auto-advance every 4s; resets whenever the active slide changes
  // (including manual swipes), so it never fights the user.
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const id = setInterval(() => {
      const next = (active + 1) % PROMOS.length
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    }, 4000)
    return () => clearInterval(id)
  }, [active])

  function onScroll() {
    const el = scroller.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== active) setActive(idx)
  }

  return (
    <div>
      <div
        ref={scroller}
        onScroll={onScroll}
        className="screen-scroll flex snap-x snap-mandatory overflow-x-auto"
      >
        {PROMOS.map((p) => (
          <div key={p.id} className="w-full flex-none snap-center px-5">
            <div
              className={`relative h-36 overflow-hidden rounded-3xl bg-gradient-to-br ${p.gradient} p-5 text-white shadow-lg`}
            >
              <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur">
                {t(p.badgeKey)}
              </span>
              <span className="pointer-events-none absolute -bottom-4 -right-2 text-8xl opacity-20">
                {p.icon}
              </span>
              <div className="relative max-w-[78%]">
                <p className="text-base font-extrabold leading-snug">
                  {t(p.titleKey)}
                </p>
                <p className="mt-1 text-xs text-white/85">{t(p.subtitleKey)}</p>
                {p.price && <p className="mt-2 text-2xl font-black">{p.price}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {PROMOS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? 'w-4 bg-brand-600' : 'w-1.5 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

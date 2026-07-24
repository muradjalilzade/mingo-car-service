import { useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

/** Routes that show the tab bar (main screens, not full-screen flows). */
const SHOW_ON = ['/home']

const TABS = [
  { icon: '🏠', key: 'nav.home', to: '/home' },
  { icon: '📅', key: 'nav.bookings', to: '/book' },
  { icon: '🚗', key: 'nav.cars', to: null },
  { icon: '👤', key: 'nav.profile', to: '/profile' },
] as const

/** Bottom tab bar, pinned to the phone screen (not the viewport). */
export default function BottomNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t } = useI18n()

  if (!SHOW_ON.includes(pathname)) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white/95 px-8 pb-5 pt-3 backdrop-blur">
      <div className="flex items-center justify-between text-[10px] font-medium">
        {TABS.map((tab) => {
          const active = tab.to === pathname
          return (
            <button
              key={tab.key}
              onClick={() => tab.to && navigate(tab.to)}
              className={`flex flex-col items-center gap-1 ${
                active ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {t(tab.key)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

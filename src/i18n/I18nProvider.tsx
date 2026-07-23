import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_LANG, translations, type Lang } from './translations'

type Vars = Record<string, string | number>

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string, vars?: Vars) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)
const STORAGE_KEY = 'autoservice.lang'

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in translations) return saved as Lang
  } catch {
    /* localStorage unavailable — fall back to default */
  }
  return DEFAULT_LANG
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore persistence errors */
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const dict = translations[lang]
      let str = dict[key] ?? translations.en[key] ?? key
      if (vars) {
        for (const name of Object.keys(vars)) {
          str = str.replace(new RegExp(`\\{${name}\\}`, 'g'), String(vars[name]))
        }
      }
      return str
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

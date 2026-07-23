export type Promo = {
  id: string
  titleKey: string
  subtitleKey: string
  badgeKey: string
  /** Optional headline price — language-neutral (₼). */
  price?: string
  /** Full Tailwind gradient utility string (kept literal so JIT can see it). */
  gradient: string
  icon: string
}

// Campaigns / offers / announcements shown in the home carousel. Swap `icon`
// for a real <img> banner later — the layout already supports a background.
export const PROMOS: Promo[] = [
  {
    id: 'bundle',
    titleKey: 'promo.bundle.title',
    subtitleKey: 'promo.bundle.subtitle',
    badgeKey: 'promo.bundle.badge',
    price: '150 ₼',
    gradient: 'from-orange-500 to-rose-600',
    icon: '🧰',
  },
  {
    id: 'oil',
    titleKey: 'promo.oil.title',
    subtitleKey: 'promo.oil.subtitle',
    badgeKey: 'promo.oil.badge',
    gradient: 'from-emerald-500 to-teal-700',
    icon: '🛢️',
  },
  {
    id: 'tires',
    titleKey: 'promo.tires.title',
    subtitleKey: 'promo.tires.subtitle',
    badgeKey: 'promo.tires.badge',
    gradient: 'from-violet-500 to-indigo-700',
    icon: '🛞',
  },
]

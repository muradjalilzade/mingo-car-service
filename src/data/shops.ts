export type Shop = {
  id: string
  name: string
  address: string
  rating: number
  distanceKm: number
  /** Available time slots today. */
  slots: string[]
}

// Ordered nearest-first (mock "location" sorting). minGO service centres in Baku.
export const SHOPS: Shop[] = [
  {
    id: 'nizami',
    name: 'minGO Nizami',
    address: 'Nizami küç. 203, Bakı',
    rating: 4.8,
    distanceKm: 1.2,
    slots: ['09:00', '10:30', '12:00', '14:00', '16:00', '17:30'],
  },
  {
    id: 'yasamal',
    name: 'minGO Yasamal',
    address: 'Şərifzadə küç. 12, Bakı',
    rating: 4.7,
    distanceKm: 2.6,
    slots: ['09:30', '11:00', '13:00', '15:30', '18:00'],
  },
  {
    id: 'xatai',
    name: 'minGO Xətai',
    address: 'Babək pr. 45, Bakı',
    rating: 4.9,
    distanceKm: 3.9,
    slots: ['10:00', '12:30', '14:30', '16:30'],
  },
  {
    id: 'narimanov',
    name: 'minGO Nərimanov',
    address: 'Atatürk pr. 88, Bakı',
    rating: 4.6,
    distanceKm: 5.4,
    slots: ['09:00', '11:30', '13:30', '15:00', '17:00'],
  },
  {
    id: 'genclik',
    name: 'minGO Gənclik',
    address: 'Fətəli Xan küç. 7, Bakı',
    rating: 4.5,
    distanceKm: 7.1,
    slots: ['08:30', '10:00', '12:00', '16:00'],
  },
]

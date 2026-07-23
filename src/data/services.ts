export type Service = {
  id: string
  name: string
  icon: string
  /** Estimated price range in AZN (₼) — real quotes vary per shop/parts. */
  priceMin: number
  priceMax: number
  /** Rough service interval, used later for reminders. */
  intervalMonths?: number
  intervalKm?: number
}

export const SERVICES: Service[] = [
  { id: 'oil', name: 'Oil Change', icon: '🛢️', priceMin: 40, priceMax: 90, intervalKm: 8000 },
  { id: 'tires', name: 'Tire Service', icon: '🛞', priceMin: 20, priceMax: 120, intervalMonths: 6 },
  { id: 'wash', name: 'Car Wash', icon: '🫧', priceMin: 10, priceMax: 40 },
  { id: 'brakes', name: 'Brake Service', icon: '🛑', priceMin: 60, priceMax: 200, intervalKm: 25000 },
  { id: 'battery', name: 'Battery', icon: '🔋', priceMin: 30, priceMax: 180 },
  { id: 'ac', name: 'AC Service', icon: '❄️', priceMin: 35, priceMax: 110, intervalMonths: 12 },
  { id: 'filters', name: 'Filters & Fluids', icon: '💧', priceMin: 25, priceMax: 95 },
  { id: 'wipers', name: 'Wiper Blades', icon: '🌧️', priceMin: 15, priceMax: 50 },
  { id: 'bulbs', name: 'Bulbs', icon: '💡', priceMin: 8, priceMax: 60 },
  { id: 'diagnostics', name: 'Diagnostics', icon: '🔍', priceMin: 20, priceMax: 50 },
]

/** Six most-booked services shown in the primary home grid. */
export const PRIMARY_SERVICE_IDS = ['oil', 'tires', 'wash', 'brakes', 'battery', 'ac']

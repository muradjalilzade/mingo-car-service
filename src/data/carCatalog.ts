// A small illustrative catalog — not exhaustive, just enough to demo the
// cascading make → model / make → trim dropdowns. Brands common in Azerbaijan.

export type CarMake = {
  name: string
  models: string[]
  /** Trim / version options for this make (e.g. LE, LSX). */
  bundles: string[]
}

export const CAR_MAKES: CarMake[] = [
  {
    name: 'Toyota',
    models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Prius', 'Highlander'],
    bundles: ['LE', 'SE', 'XLE', 'XSE', 'Limited'],
  },
  {
    name: 'Mercedes-Benz',
    models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class'],
    bundles: ['Avantgarde', 'AMG Line', 'Exclusive', '4MATIC', 'Night Edition'],
  },
  {
    name: 'BMW',
    models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X1'],
    bundles: ['Base', 'Sport Line', 'Luxury', 'M Sport', 'xDrive'],
  },
  {
    name: 'Hyundai',
    models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent', 'Creta'],
    bundles: ['SE', 'SEL', 'Limited', 'N Line', 'Ultimate'],
  },
  {
    name: 'Kia',
    models: ['Optima', 'Sportage', 'Sorento', 'Rio', 'Cerato', 'Seltos'],
    bundles: ['LX', 'S', 'EX', 'GT-Line', 'SX'],
  },
  {
    name: 'Chevrolet',
    models: ['Malibu', 'Cruze', 'Captiva', 'Tahoe', 'Equinox', 'Aveo'],
    bundles: ['LS', 'LT', 'LTZ', 'RS', 'LSX'],
  },
]

/** Manufacturing years, newest first, from the current year back ~20 years. */
export const CAR_YEARS: string[] = Array.from({ length: 22 }, (_, i) =>
  String(new Date().getFullYear() - i),
)

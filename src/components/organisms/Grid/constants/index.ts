export enum GRID_TYPES {
  large = 'large',
  medium = 'medium',
}

export const GRID_OPTIONS = {
  large: { class: `w-full bg-white`, type: GRID_TYPES.large },
  medium: { class: `w-1/2 bg-primary`, type: GRID_TYPES.medium },
}

export const GRID_SEQUENCE = [
  GRID_OPTIONS.large,
  GRID_OPTIONS.medium,
  GRID_OPTIONS.large,
  GRID_OPTIONS.medium,
  GRID_OPTIONS.medium,
  GRID_OPTIONS.large,
  GRID_OPTIONS.medium,
]

export const FOCUS_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])'
]

export function checkHidden(item) {
  return !!(
    item.offsetWidth ||
    item.offsetHeight ||
    item.getClientRects().length
  )
}

export const KEYCODES = {
  tab: 9,
  shift: 16,
  esc: 27,
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

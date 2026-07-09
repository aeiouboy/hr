// QuickActionsTile-size.test.tsx — STA-246
// When actions carry a `size`, the tile paints a fixed 4-col grid with WxH spans.
// Size-less callers (e.g. MANAGER_ACTIONS) keep the legacy auto-fill layout, and the
// container never exposes role="grid".

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuickActionsTile, MANAGER_ACTIONS, type QuickAction } from '../molecules/QuickActionsTile'

const SIZED: QuickAction[] = [
  { icon: <span />, labelTh: 'กลาง', labelEn: 'Medium', href: '/th/m', tone: 'teal', size: '2x2' },
  { icon: <span />, labelTh: 'ใหญ่', labelEn: 'Large', href: '/th/l', tone: 'amber', size: '4x2' },
]

describe('QuickActionsTile — STA-246 sized grid', () => {
  it('2x2 tile → grid-column/row span 2', () => {
    render(<QuickActionsTile actions={SIZED} />)
    const link = screen.getByRole('link', { name: 'กลาง' })
    const style = link.getAttribute('style') ?? ''
    expect(style).toMatch(/grid-column:\s*span 2/)
    expect(style).toMatch(/grid-row:\s*span 2/)
  })

  it('4x2 tile → grid-column span 4 / grid-row span 2', () => {
    render(<QuickActionsTile actions={SIZED} />)
    const link = screen.getByRole('link', { name: 'ใหญ่' })
    const style = link.getAttribute('style') ?? ''
    expect(style).toMatch(/grid-column:\s*span 4/)
    expect(style).toMatch(/grid-row:\s*span 2/)
  })

  it('size-less MANAGER_ACTIONS → auto-fill grid, no span styles, no role="grid"', () => {
    const { container } = render(<QuickActionsTile actions={MANAGER_ACTIONS} />)
    // No ARIA grid role.
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
    // Legacy auto-fill container preserved.
    const gridDiv = container.querySelector('.grid.gap-3') as HTMLElement | null
    expect(gridDiv).not.toBeNull()
    expect(gridDiv?.getAttribute('style') ?? '').toMatch(/auto-fill/)
    // No per-tile span styles.
    screen.getAllByRole('link').forEach((link) => {
      const style = link.getAttribute('style') ?? ''
      expect(style).not.toMatch(/grid-column:\s*span/)
    })
  })
})

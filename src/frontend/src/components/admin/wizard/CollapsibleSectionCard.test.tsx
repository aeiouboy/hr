import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { User2 } from 'lucide-react'
import { CollapsibleSectionCard } from './CollapsibleSectionCard'

function StatefulChild() {
  return <input aria-label="child input" defaultValue="typed value" />
}

describe('CollapsibleSectionCard', () => {
  it('renders header content, accessible toggle metadata, and children', () => {
    render(
      <CollapsibleSectionCard id="who.identity" icon={User2} eyebrow="Eyebrow" title="Section title" sub="Section subtitle" collapsed={false} onCollapsedChange={() => {}}>
        <StatefulChild />
      </CollapsibleSectionCard>,
    )

    expect(screen.getByText('Eyebrow')).toBeInTheDocument()
    expect(screen.getByText('Section title')).toBeInTheDocument()
    expect(screen.getByText('Section subtitle')).toBeInTheDocument()
    const toggle = screen.getByRole('button', { name: /collapse section/i })
    expect(toggle).toHaveAttribute('type', 'button')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-controls', 'who.identity-content')
    expect(screen.getByLabelText('child input')).toHaveValue('typed value')
  })

  it('notifies parent on toggle and keeps collapsed children mounted', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    const { rerender, container } = render(
      <CollapsibleSectionCard id="job.assignment" icon={User2} eyebrow="Job" title="Assignment" sub="Sub" collapsed={false} onCollapsedChange={onCollapsedChange}>
        <StatefulChild />
      </CollapsibleSectionCard>,
    )

    await user.click(screen.getByRole('button', { name: /collapse section/i }))
    expect(onCollapsedChange).toHaveBeenCalledWith(true)

    rerender(
      <CollapsibleSectionCard id="job.assignment" icon={User2} eyebrow="Job" title="Assignment" sub="Sub" collapsed onCollapsedChange={onCollapsedChange}>
        <StatefulChild />
      </CollapsibleSectionCard>,
    )

    expect(screen.getByRole('button', { name: /expand section/i })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByLabelText('child input')).toBeInTheDocument()
    expect(container.ownerDocument.getElementById('job.assignment-content')).toHaveClass('hidden')
  })

  it('uses token-safe styling without forbidden red classes or hardcoded hex colors', () => {
    const { container } = render(
      <CollapsibleSectionCard id="style.safe" icon={User2} eyebrow="Style" title="Safe" sub="Tokens" collapsed={false} onCollapsedChange={() => {}}>
        <div>Child</div>
      </CollapsibleSectionCard>,
    )

    expect(container.innerHTML).not.toMatch(/\b(?:text|bg|border)-red-/)
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}/)
  })
})

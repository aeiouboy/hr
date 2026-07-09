import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoValuesDisclaimer } from '../molecules/DemoValuesDisclaimer';

vi.mock('lucide-react', () => ({
  Info: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
}));

describe('DemoValuesDisclaimer', () => {
  it('renders the Thai/English illustrative-number caveat for demo surfaces', () => {
    render(<DemoValuesDisclaimer />);

    const note = screen.getByRole('note', { name: 'Demo values disclaimer' });
    expect(note).toHaveTextContent('ข้อมูลที่แสดงเป็นตัวอย่างสำหรับการนำเสนอ');
    expect(note).toHaveTextContent('Sample data shown for demonstration.');
  });
});

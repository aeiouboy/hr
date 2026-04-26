'use client';

import { useTranslations } from 'next-intl';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/humi';

interface EditPencilButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export function EditPencilButton({ onClick, ariaLabel }: EditPencilButtonProps) {
  const t = useTranslations();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      aria-label={ariaLabel ?? t('gate.editAria')}
      className="h-7 w-7 p-0 text-ink-muted hover:text-accent hover:bg-accent/10"
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

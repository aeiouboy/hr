'use client';

import { useRouter, useParams } from 'next/navigation';
import { UserCog, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { landingForRoles } from '@/lib/demo-users';

export function ActingBadge() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';

  const originalUser = useAuthStore((s) => s.originalUser);
  const currentName = useAuthStore((s) => s.username);
  const exitPersona = useAuthStore((s) => s.exitPersona);

  if (!originalUser) return null;

  function handleExit() {
    const landing = landingForRoles(originalUser!.roles, locale);
    exitPersona();
    router.push(landing);
  }

  return (
    <button
      type="button"
      onClick={handleExit}
      className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-soft/40 px-3 py-1 text-xs font-medium text-ink whitespace-nowrap flex-shrink-0 hover:bg-accent-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      title={locale === 'th' ? `กำลังสวมบทบาทเป็น ${currentName} — คลิกเพื่อออก` : `Acting as ${currentName} — click to exit`}
    >
      <UserCog size={12} aria-hidden className="flex-shrink-0" />
      <span>
        {locale === 'th'
          ? `สวมบทบาท: ${currentName}`
          : `Acting as: ${currentName}`}
      </span>
      <LogOut size={12} aria-hidden className="flex-shrink-0 opacity-60" />
    </button>
  );
}

import { redirect } from 'next/navigation'

// /employees/me → /profile/me
// Parallel session consolidated the ESS profile surface under /profile/me
// (1385-line comprehensive page). Redirecting here keeps older nav links
// and sidebar entries working while the canonical view lives at /profile/me.

export default async function EmployeeMePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/profile/me`)
}

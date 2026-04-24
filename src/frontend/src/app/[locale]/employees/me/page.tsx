import { redirect } from 'next/navigation'

export default async function EmployeeMePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/profile/me`)
}

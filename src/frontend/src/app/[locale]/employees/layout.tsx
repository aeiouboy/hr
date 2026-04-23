// /employees layout — ใช้ AppShell เดิม (Humi shell + sidebar + topbar)
// ไม่มี layout ใหม่ — children render ใน main content slot ของ [locale]/layout.tsx
export default function EmployeesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

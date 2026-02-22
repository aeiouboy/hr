import { NextResponse } from 'next/server';

// Mock auth handler for development (no Keycloak required)
// In production, replace with: export { handlers as GET, handlers as POST } from '@/lib/auth';

const mockSession = {
  user: {
    id: 'EMP001',
    name: 'Somchai Jaidee',
    email: 'somchai.j@centralgroup.com',
    image: null,
    roles: ['employee', 'manager', 'hr_admin', 'hr_manager'],
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.endsWith('/session')) {
    return NextResponse.json(mockSession);
  }

  if (url.pathname.endsWith('/csrf')) {
    return NextResponse.json({ csrfToken: 'mock-csrf-token' });
  }

  if (url.pathname.endsWith('/providers')) {
    return NextResponse.json({});
  }

  return NextResponse.json({});
}

export async function POST() {
  return NextResponse.json({});
}

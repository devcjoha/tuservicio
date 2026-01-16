// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Intentamos obtener el token de acceso
  const token = request.cookies.get('token')?.value;

  // 2. Definimos las rutas que queremos proteger
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    if (!token) {
      // SI NO HAY TOKEN: 
      // Opción A: Redirigir al login (Mejor UX)
      return NextResponse.redirect(new URL('/login', request.url));

      // Opción B: Mostrar Not Found (Lo que pediste originalmente)
      // return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

// Opcional: Solo se ejecuta en estas rutas para no afectar el rendimiento
export const config = {
  matcher: ['/dashboard/:path*'],
};
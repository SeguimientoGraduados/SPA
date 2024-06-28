import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  const user = request.cookies.get("user");
  let userData;
  if (user){
    userData = JSON.parse(user.value);
  }

  const protectedRoutes = ["/solicitudes", "/formulario"];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname==="/solicitudes" && userData.rol!="admin")
  {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/solicitudes", "/formulario"],
};
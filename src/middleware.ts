import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/account")) {
    return Response.redirect(
      new URL(
        "/auth/sign-in?callbackUrl=" + req.nextUrl.pathname,
        req.url,
      ),
    );
  }
});

export const config = { matcher: ["/account/:path*"] };

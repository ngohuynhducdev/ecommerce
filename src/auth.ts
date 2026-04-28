import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const password = credentials.password;
        const email = credentials.email;
        if (
          typeof password === "string" &&
          password.length >= 6 &&
          typeof email === "string"
        ) {
          return { id: "1", name: "Test User", email };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/auth/sign-in" },
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
});

import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: string[];
    };
  }
}

declare module 'next-auth' {
  interface JWT {
    accessToken?: string;
    roles?: string[];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'hrms-frontend',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
      issuer:
        process.env.KEYCLOAK_ISSUER ??
        'http://localhost:8080/realms/central-hrms',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        // Extract roles from Keycloak realm_access
        const decoded = account.access_token
          ? JSON.parse(
              Buffer.from(account.access_token.split('.')[1], 'base64').toString()
            )
          : {};
        token.roles = decoded.realm_access?.roles ?? [];
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      session.user.roles = (token.roles as string[]) ?? [];
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

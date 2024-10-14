import NextAuth, { Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { OAuthConfig } from "next-auth/providers";

const NHS_CIS2: OAuthConfig<Profile> = {
  id: "nhs-cis2",
  name: "NHS CIS2 Authentication",
  type: "oidc",
  issuer: `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare`,
  wellKnown: `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/.well-known/openid-configuration`,
  clientId: process.env.AUTH_CIS2_CLIENT_ID,
  clientSecret: process.env.AUTH_CIS2_CLIENT_SECRET,
  authorization: {
    params: {
      acr_values: "AAL2_OR_AAL3_ANY",
      scope: "openid profile email",
      response_type: "code",
    },
  },
  client: {
    token_endpoint_auth_method: "client_secret_post",
  },
  idToken: false,
  checks: ["state"],
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [NHS_CIS2],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutes
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.name = `${profile.given_name} ${profile.family_name}`;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
  events: {
    async session({ session }) {
      const maxAge = 15 * 60; // 15 minutes
      const now = Math.floor(Date.now() / 1000);
      session.expires = new Date((now + maxAge) * 1000).toISOString();
    },
  },
});

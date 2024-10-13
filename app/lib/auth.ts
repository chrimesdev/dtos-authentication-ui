import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NHS_CIS2: OAuthConfig<any> = {
  id: "nhs-cis2",
  name: "NHS CIS2 Authentication",
  type: "oidc",
  issuer: `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare`,
  clientId: process.env.AUTH_CIS2_CLIENT_ID,
  clientSecret: process.env.AUTH_CIS2_CLIENT_SECRET,
  authorization: {
    params: {
      acr_values: "AAL2_OR_AAL3_ANY",
      scope: "openid profile email",
      response_type: "code",
    },
  },
  userinfo: `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/userinfo`,
  token: {
    url: `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/NHSIdentity/realms/Healthcare/access_token`,
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    NHS_CIS2,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
  },
});

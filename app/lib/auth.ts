import NextAuth, { Profile } from "next-auth";
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
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [NHS_CIS2],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
});

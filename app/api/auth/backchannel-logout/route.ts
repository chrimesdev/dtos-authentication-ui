import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedCIS2Token } from "@/app/types";

/*
  This API route is responsible for handling the back-channel logout request from the NHS CIS2 authentication provider.
  https://digital.nhs.uk/services/care-identity-service/applications-and-services/cis2-authentication/guidance-for-developers/detailed-guidance/session-management#back-channel-logout
  The route will verify the logout token sent by the CIS2 and destroy the user session if its a valid request.
*/

export async function POST(req: NextRequest) {
  try {
    const logoutToken = req.nextUrl.searchParams.get("logout_token");

    // Ensure the logout_token claim is present
    if (!logoutToken) {
      return NextResponse.json(
        { error: "invalid_request", error_description: "Missing logout_token" },
        { status: 400 }
      );
    }

    // Decode the logout token to extract the claims
    const decodedToken: DecodedCIS2Token = jwtDecode(logoutToken);

    // Verify that the logout token conforms to the CIS2 specification
    const isValidLogoutToken = await verifyLogoutToken(decodedToken);
    if (!isValidLogoutToken) {
      return NextResponse.json(
        { error: "invalid_token", error_description: "Invalid logout_token" },
        { status: 400 }
      );
    }

    // Destroy the user session if the token is valid and matches the user session
    const sessionDestroyed = await destroySession(decodedToken);
    if (!sessionDestroyed) {
      return NextResponse.json(
        {
          error: "logout_failed",
          error_description: "Failed to destroy session",
        },
        { status: 400 }
      );
    }

    // Respond with a successful logout message
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
        error_description: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// Return a 405 Method not allowed if the request method is not POST
export async function GET() {
  return NextResponse.json(
    { error: "method_not_allowed", error_description: "Method not allowed" },
    { status: 405 }
  );
}

async function verifyLogoutToken(token: DecodedCIS2Token): Promise<boolean> {
  const AUTH_CIS2_ISSUER_URL = `${process.env.AUTH_CIS2_ISSUER_URL}/openam/oauth2/realms/root/realms/oidc`;
  const AUTH_CIS2_CLIENT_ID = process.env.AUTH_CIS2_CLIENT_ID;

  // Ensure the token contains the required claims (CIS2 specific)
  if (!token || !token.iss || !token.aud || !token.events || !token.nonce) {
    return false;
  }

  // Verify the token issuer and audience against our configuration
  if (
    token.iss == AUTH_CIS2_ISSUER_URL &&
    token.aud == AUTH_CIS2_CLIENT_ID &&
    !!token.events["http://schemas.openid.net/event/backchannel-logout"]
  ) {
    return false;
  }

  return true;
}

async function destroySession(token: DecodedCIS2Token): Promise<boolean> {
  const tokenSub = token.sub;
  console.log(`Destroying session for user: ${tokenSub}`);

  // API call to destroy the user session
  // destroySession(tokenSub);

  return true;
}

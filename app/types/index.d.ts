export interface DecodedCIS2Token {
  iss: string;
  sub: string;
  aud: string;
  sid?: string;
  events: {
    "http://schemas.openid.net/event/backchannel-logout": object;
  };
  nonce: string;
}

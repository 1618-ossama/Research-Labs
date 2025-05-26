import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('AccessTokenCookie')?.value;
  const refreshToken = request.cookies.get('RefreshTokenCookie')?.value;

  // Log to server console (terminal)
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);

  return NextResponse.json({
    accessTokenExists: !!accessToken,
    refreshTokenExists: !!refreshToken,
    // Optional: Mask tokens in response
    maskedAccessToken: accessToken ? `${accessToken.slice(0, 5)}...` : null,
    maskedRefreshToken: refreshToken ? `${refreshToken.slice(0, 5)}...` : null
  });
}

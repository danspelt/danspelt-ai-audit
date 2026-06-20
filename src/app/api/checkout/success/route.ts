export async function GET(request: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  return Response.redirect(`${appUrl}/audit?subscribed=1`);
}

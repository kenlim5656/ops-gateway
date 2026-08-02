import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD || "runpod2026";

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ops Gateway — Login</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #09090b;
      color: #fafafa;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      background: #18181b;
      border: 1px solid #27272a;
      border-radius: 12px;
      padding: 2.5rem;
      width: 100%;
      max-width: 380px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .logo-icon {
      width: 32px;
      height: 32px;
      background: #06b6d4;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 12px;
      color: #09090b;
    }
    .logo-text { font-weight: 600; font-size: 1rem; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
    p { color: #a1a1aa; font-size: 0.875rem; margin-bottom: 1.5rem; }
    label { display: block; font-size: 0.875rem; color: #a1a1aa; margin-bottom: 0.5rem; }
    input {
      width: 100%;
      padding: 0.625rem 0.75rem;
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      color: #fafafa;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.15s;
    }
    input:focus { border-color: #06b6d4; }
    button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.625rem;
      background: #06b6d4;
      color: #09090b;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    button:hover { background: #22d3ee; }
    .error {
      color: #ef4444;
      font-size: 0.8125rem;
      margin-top: 0.75rem;
      display: none;
    }
    .error.show { display: block; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <div class="logo-icon">OG</div>
      <div class="logo-text">Ops Gateway</div>
    </div>
    <h1>Password Required</h1>
    <p>Enter the password to access Mission Control.</p>
    <form method="POST" id="authForm">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter password" required autofocus />
      <button type="submit">Continue</button>
      <div class="error" id="error">Incorrect password. Please try again.</div>
    </form>
  </div>
  <script>
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === '1') {
      document.getElementById('error').classList.add('show');
    }
  </script>
</body>
</html>`;

export async function GET() {
  return new NextResponse(LOGIN_HTML, {
    headers: { "Content-Type": "text/html" },
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password") as string;
  const redirect = request.nextUrl.searchParams.get("redirect") || "/";

  if (password === PASSWORD) {
    const response = NextResponse.redirect(new URL(redirect, request.url));
    response.cookies.set("ops-gateway-auth", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  const errorUrl = new URL("/api/auth", request.url);
  errorUrl.searchParams.set("error", "1");
  return NextResponse.redirect(errorUrl);
}

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE, adminCookieValue, checkPassword, isAdminCookieValid } from "@/lib/admin-auth";

export const metadata = { title: "Admin Login" };

async function loginAction(formData: FormData) {
  "use server";
  const pw = String(formData.get("password") || "");
  if (!checkPassword(pw)) {
    redirect("/admin/login?error=1");
  }
  cookies().set(ADMIN_COOKIE_NAME, adminCookieValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  redirect("/admin");
}

export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  const existing = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (existing && isAdminCookieValid(existing)) redirect("/admin");
  return (
    <div className="section py-16 max-w-md">
      <h1 className="font-display text-2xl">Admin login</h1>
      <p className="text-ink-soft text-sm mt-1">Service role calls run server-side only.</p>
      <form action={loginAction} className="mt-6 space-y-3">
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="input" autoFocus />
        </div>
        {searchParams.error && <div className="text-sm text-rose-700">Wrong password.</div>}
        <button className="btn-primary" type="submit">Enter</button>
      </form>
    </div>
  );
}

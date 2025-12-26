// app/account/page.js
import AccountDashboardClient from "./accountClient";

export const metadata = {
  title: "My Account | VANGMAYA",
  description: "Manage your profile, orders, addresses, and wishlist on VANGMAYA.",
  robots: {
    index: false,   // Account pages should not be indexed
    follow: false,
  },
};

export default function AccountPage() {
  // Later: auth check can be added here (cookies/session)
  return <AccountDashboardClient />;
}

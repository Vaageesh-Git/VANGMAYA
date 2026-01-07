import AccountDashboardClient from "./accountClient";

export const metadata = {
  title: "My Account | VANGMAYA",
  description: "Manage your profile, orders, addresses, and wishlist on VANGMAYA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountDashboardClient />;
}

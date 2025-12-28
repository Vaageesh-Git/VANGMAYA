// app/login/page.js
import LoginClient from "./loginClient";

export const metadata = {
  title: "Login | VANGMAYA",
  description: "Login to your VANGMAYA account to manage orders and wishlist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}

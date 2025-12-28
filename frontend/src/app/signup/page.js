// app/signup/page.js
import SignupClient from "./signupClient";

export const metadata = {
  title: "Create Account | VANGMAYA",
  description: "Create a new VANGMAYA account to start shopping.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return <SignupClient />;
}

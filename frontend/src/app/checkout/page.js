export const metadata = {
  title: "Checkout | Vangmaya",
  description: "Secure checkout for your selected items.",
  robots: {
    index: false,
    follow: false,
  },
};

import CheckoutClient from "./checkoutClient";

export default function CheckoutPage() {
  return <CheckoutClient />;
}

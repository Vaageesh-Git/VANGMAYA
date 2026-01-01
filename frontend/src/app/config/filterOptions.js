export const filterOptions = {
  subcategories: [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Headphones & Earbuds",
    "Smartwatches",
    "Speakers",
    "Televisions",
    "Cameras",
    "Accessories",
  ],

  brands: [
    "Apple",
    "Samsung",
    "Sony",
    "OnePlus",
    "Dell",
    "HP",
    "Lenovo",
    "JBL",
    "boAt",
    "Realme",
    "Canon",
    "Logitech",
  ],

  priceRanges: [
    { label: "Under ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
    { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
    { label: "₹15,000 - ₹30,000", min: 15000, max: 30000 },
    { label: "₹30,000 - ₹50,000", min: 30000, max: 50000 },
    { label: "Above ₹50,000", min: 50000, max: Infinity },
  ],

  ratings: [4, 3, 2, 1],

  discounts: [
    { label: "10% or more", value: 10 },
    { label: "20% or more", value: 20 },
    { label: "30% or more", value: 30 },
    { label: "50% or more", value: 50 },
  ],
};

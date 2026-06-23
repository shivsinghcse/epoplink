
# Poplink - Premium E-Commerce Platform

A modern, fully responsive e-commerce web application built with React, Tailwind CSS, and React Router. Poplink delivers a premium shopping experience with product browsing, cart management, checkout, and user features.

**Live Demo:** [Add your deployed link here]  
**Current Date:** June 2026

---

## ✨ Features

### Core Pages
- **Home** - Hero carousel, featured categories, flash deals, trending products, newsletter CTA
- **Shop** - Product grid/list view, advanced filters, sorting, pagination
- **Categories** - Visual category cards with subcategories and product counts
- **ProductDetail** - Image gallery, variants (color/size), quantity selector, reviews, specs tabs
- **Cart** - Add/remove items, quantity controls, promo codes, price breakdown
- **Checkout** - Multi-step form (shipping, payment, review), validation, order placement
- **OrderSuccess** - Order confirmation, tracking info, invoice download
- **Wishlist** - Save favorites, move to cart, share products

### Shopping Features
- **Product Discovery** - Browse by category, search, filters by price/brand/rating
- **Product Variants** - Color swatches, size selection, stock indicators
- **Cart Management** - Persistent cart, quantity updates, promo codes (SAVE10 for 10% off)
- **Checkout Flow** - Shipping validation, payment methods (Card/UPI/COD), order review
- **User Feedback** - Toast notifications, console logging for all actions
- **Responsive Design** - Mobile-first, 1-4 column grids, sticky sidebars

### UX Enhancements
- **Animate.css** entrance animations on all components
- **Lucide React** icons throughout
- **Hover effects** - Scale, shadow, zoom on images
- **Loading states** - Disabled buttons during processing
- **Empty states** - Custom illustrations for empty cart/wishlist
- **Trust badges** - Free shipping, returns, secure checkout

---

## 🛠 Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | React 18 |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS 3 |
| **Icons** | Lucide React |
| **Animations** | Animate.css |
| **Build Tool** | Vite / CRA |
| **Language** | JavaScript (ES6+) |

---

## 📁 Project Structure

```
poplink/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Landing page with hero, categories, deals
│   │   ├── Shop.jsx              # Product grid with filters & sorting
│   │   ├── Categories.jsx        # Category grid with subcategories
│   │   ├── ProductDetail.jsx     # Single product with gallery, variants, reviews
│   │   ├── Cart.jsx              # Shopping cart with quantity & promo
│   │   ├── Checkout.jsx          # 3-step checkout: shipping → payment → review
│   │   ├── OrderSuccess.jsx      # Order confirmation & tracking
│   │   ├── Wishlist.jsx          # Saved items with move to cart
│   │   └── Logo.jsx              # Reusable brand logo component
│   ├── App.jsx                   # Router setup
│   ├── index.js                  # Entry point
│   └── index.css                 # Tailwind imports
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/poplink.git
cd poplink
```

2. **Install dependencies**
```bash
npm install
```

3. **Install required packages**
```bash
npm install react-router-dom lucide-react animate.css
npm install -D tailwindcss postcss autoprefixer
```

4. **Setup Tailwind CSS**
```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Run development server**
```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 🎯 Usage

### Routes
| Path | Component | Description |
| --- | --- | --- |
| `/` | `Home` | Landing page |
| `/shop` | `Shop` | All products with filters |
| `/shop?category=electronics` | `Shop` | Filtered by category |
| `/categories` | `Categories` | Category grid |
| `/product/:id` | `ProductDetail` | Single product page |
| `/cart` | `Cart` | Shopping cart |
| `/checkout` | `Checkout` | Checkout flow |
| `/order-success` | `OrderSuccess` | Order confirmation |
| `/wishlist` | `Wishlist` | Saved items |

### Console Logging
All user actions log to console for backend integration:
```js
Add to cart: { productId, name, price, quantity, color, timestamp }
Remove from cart: { productId, name, quantity, timestamp }
Order placed: { orderId, items, shipping, payment, pricing, timestamp }
Wishlist toggle: { productId, name, wishlisted, timestamp }
```

### Promo Codes
- `SAVE10` - 10% discount on checkout

---

## 🎨 Customization

### Branding
Update colors in components:
- Primary: `indigo-600` → your brand color
- Accent: `violet-600`, `emerald-600`
- Replace `Logo.jsx` with your logo

### Mock Data
All components use mock data arrays. Replace with API calls:
```jsx
// Example: ProductDetail.jsx
useEffect(() => {
  fetch(`/api/products/${id}`)
    .then(res => res.json())
    .then(data => setProduct(data));
}, [id]);
```

### Images
Currently using Unsplash URLs. Replace with your CDN:
```jsx
image: 'https://your-cdn.com/products/headphones.jpg'
```

---

## 📱 Responsive Breakpoints

| Device | Columns | Width |
| --- | --- | --- |
| Mobile | 1 col | < 640px |
| Tablet | 2 cols | 640px - 1024px |
| Desktop | 3-4 cols | > 1024px |

---

## 🔧 Key Features Implementation

### 1. Cart Persistence
Currently uses `useState`. For production, integrate:
- Context API / Redux / Zustand
- LocalStorage for guest carts
- Backend API for logged-in users

### 2. Payment Integration
`Checkout.jsx` has card/UPI/COD stubs. Integrate:
- **Stripe** for cards
- **Razorpay** for UPI/India
- **PayPal** for international

### 3. Form Validation
Built-in validation for:
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: 10-digit Indian numbers `/^[6-9]\d{9}$/`
- Pincode: 6-digit `/^[1-9][0-9]{5}$/`
- Card: 16 digits, MM/YY, CVV

---

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "lucide-react": "^0.441.0",
    "animate.css": "^4.1.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "vite": "^5.4.2"
  }
}
```

---

## 🚧 Roadmap

- [ ] User authentication (Login/Signup)
- [ ] Order history page
- [ ] Product search with autocomplete
- [ ] Product reviews submission
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Dark mode toggle

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👤 Author

Built with ❤️ for modern e-commerce

**Questions?** Open an issue or reach out.

---

## 📸 Screenshots

Add screenshots of your deployed app here:
- Home page with hero carousel
- Shop grid with filters
- Product detail with gallery
- Cart with promo code
- Checkout flow
- Order success

---

**Note:** This is a frontend-only demo with mock data. All `console.log` statements indicate where backend API calls should be integrated for production use.
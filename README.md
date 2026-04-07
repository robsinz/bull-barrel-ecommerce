# Bull & Barrel

A React e-commerce and membership site for Bull & Barrel — a whiskey club and bar program based at Alexander's Steakhouse in Pasadena, CA.

**[Live Demo](https://bull-barrel-ecommerce.vercel.app)**

---

## Features

### E-Commerce

- Merch store with cart and checkout flow
- Multi-step checkout with email, shipping, and payment forms
- Cart state managed via React Context
- Product and checkout context for global state

### Whiskey Club

- Bull & Barrel membership program information
- Event and tasting details
- Contact page for inquiries

### Technical Highlights

- Feature-based architecture with shared utilities and components
- Full TypeScript implementation
- Responsive design across all screen sizes

---

## Tech Stack

| Layer    | Technologies            |
| -------- | ----------------------- |
| Frontend | React, TypeScript, Vite |
| State    | React Context           |
| Styling  | CSS Modules             |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── features/          # Page-level feature components
│   ├── CartPage/
│   ├── CheckoutPage/
│   └── ContactPage/
├── context/           # React Context providers (Cart, Product, Checkout)
├── shared/            # Shared utilities and components
├── assets/            # Images and static files
├── App.tsx            # Root component and routing
└── main.tsx           # Entry point
```

---

_Built with React, TypeScript, and Vite_

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import ProductCatalog from './features/ProductCatalog';
import ProductPage from './features/ProductPage';
import CartPage from './features/CartPage';
import Header from './features/Header/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<ProductCatalog />} />
              <Route path="/shop" element={<ProductCatalog />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              {/* need to handle route for unknown routes. wild card here */}
            </Routes>
          </div>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;

/*
BrowserRouter is the core component that enables client-side routing in this application.
- it wraps the entire application
- crates a routing context that all nested routing components can access
- listens for URL changes and updates the rendered components accordingly
- it maintains a history stack for navigation
*/

/*
Routes and Route
Routes - acts as a container that holds all your route definitions and ensures only the best matching route renders
Route - Defines a mapping between a URL path and a component
  In my current configuration:
  - when the URL is exactly "/", render the ProductCatalog component
  - when the URL matches "/product/:id"(where ":id" is a parameter), render the ProductPage component
    - the ":id" in the path is a URL parameter, which React Router makes available through the "usePrams" hook
    (used in ProductPage.tsx)
*/

/*
Link component
 - this is what connects my navigation elements to the router:
    - it renders as an <a> tag in the HTML
    - when clicked, it prevents the default browser navigation behavior (full page reload)
      * full page reload: browser makes  acompletely new HTTP request to the server for the URL in the href
    - instead, it updates the URL using the History API without a full page reload
    - React Router detects this URL change and renders the appropriate component
    (see ProductCatalog.tsx)
*/
/*
The Complete Flow
Here's how everything works together when a user navigates through your app:

Initial load:
App.tsx renders with BrowserRouter
Current URL is matched to a Route
The corresponding component renders

User clicks a product in ProductCatalog:
Link component captures the click
URL updates to /product/[id] without a page reload
Routes component sees the URL change
It matches the URL to the /product/:id route
ProductPage component renders
ProductPage extracts the ID parameter and loads the specific product

If a user clicks browser back button:
Browser history changes to previous URL
React Router detects this change
The component for the previous URL renders (likely ProductCatalog)

This client-side routing provides a smooth, app-like experience without the traditional page reloads of a multi-page website.
*/

/*
1. ProductProvider receives child components (Routes, etc.) from App.tsx
2. ProductProvider creates a value object with product data and functions
3. ProductProvider wraps those child components with Context.Provider, making the value accessible to them
4. The child components can then access this value using the useProducts hook
*/

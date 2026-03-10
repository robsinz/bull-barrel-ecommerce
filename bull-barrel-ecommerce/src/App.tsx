import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { CartProvider } from './context/CartContext';
import ProductCatalog from './features/ProductCatalog';
import ProductPage from './features/ProductPage';
import CartPage from './features/CartPage';
import ContactPage from './features/ContactPage';
import Header from './features/Header/Header';
import CheckoutPage from './features/CheckoutPage';
import AboutPage from './features/AboutPage';
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
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/checkout"
                element={
                  <CheckoutProvider>
                    <CheckoutPage />
                  </CheckoutProvider>
                }
              />

              {/* need to handle route for unknown routes. wild card here */}
            </Routes>
          </div>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;

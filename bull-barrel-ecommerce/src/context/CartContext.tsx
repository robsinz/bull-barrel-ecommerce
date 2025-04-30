import { createContext, useContext, ReactNode, useState } from 'react';
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  color: string | undefined;
  size: string | undefined;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}
interface CartContextProps {
  children: ReactNode;
}

// Create the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);
// Create a provider component
export const CartProvider = ({ children }: CartContextProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Functions will be implemented here

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };
  // Return the provider with values
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {childeren}
    </CartContext.Provider>
  );
};

// Crate a custom hook for using the cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

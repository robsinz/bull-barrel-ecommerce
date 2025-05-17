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

interface UpdateQuantityParams {
  productId: string;
  color?: string;
  size?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (params: UpdateQuantityParams) => void;
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

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          (cartItem.color === item.color || cartItem.color === undefined) &&
          (cartItem.size === item.size || cartItem.size === undefined)
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingItemIndex].quantity;
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: currentQuantity + item.quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (
    productId: string,
    color: string | undefined,
    size: string | undefined
  ) => {
    setCart((prevCart) => {
      return prevCart.filter(
        (item) => !(item.productId === productId && item.color === color && item.size === size)
      );
    });
  };

  const updateQuantity = (params: UpdateQuantityParams) => {
    const { productId, color, size, quantity } = params;
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === productId && item.color === color && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
      {children}
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

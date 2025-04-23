import { createContext, useContext, ReactNode } from 'react';
import { mockProducts } from '../shared/data/mockProducts';
import { Product } from '../shared/product.types';

interface ProductContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
// createContext() - creates a context object i called "ProductContext" with two parts
// 1. ProductContext.Provider - A component used to provide values
// 2. ProductContext.Consumer - A component used to consume values (less commonly used with hooks)

// ProductContext.Provider: this is the built-in provider component that comes with any context object.
// its takes a "value" prop and makes that value available to components that consume this context.
// ProductProvider: This is my custom Wrapper component that:
// contains the logic and data for my products
// uses ProductContext.Provider internally
// Inside ProductProvider, I use ProductContext.Provider and pass it my "value"

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  // ProductProvider is my custom Wrapper component that contains the data(products array) and related functions:
  const products = mockProducts;
  // For now, using mock data directly
  // later, this can be replaced with data fetching logic

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  // "products" and "getProductById()" are then bundled in the "value" object.
  const value = {
    products,
    getProductById,
  };

  // Then wraps its children(everything wrapped in the App.tsx file) with the ProductContext.Provider,
  // but I use the wrapper function ProductProvider, to wrap the children
  // making the value accessible to all nested components

  // passes the value to the actual ProductContext.Provider
  // Renders its children wrapped in the context provider
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;

  // the steps are:
  // Create the raw context
  // Create your cutsom provider component
  // Set up data and functions
  // Create the value object
  // Return the actual Context.Provider with your value
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
};

// useProducts is a custom hook, that uses React's useContext to access the wrapper ProductContext
// it includes an error check to ensure it's used properly and returns the context value

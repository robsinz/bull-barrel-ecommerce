import { Product } from '../product.types';

// Checks if a specific color and size combo is in stock
export const isInStock = (product: Product, colorId: string, sizeId: string): boolean => {
  // Create inventory key in the format 'color-size'
  const inventoryKey = `${colorId}-${sizeId}`;
  // Look up the quantity in the inventory object using the inventory key
  const quantity = product.inventory[inventoryKey];
  // return a boolean value if the quantity is greater than 0;
  return quantity > 0;
};

// Gets the available inventory count for a specific color and size combo
export const getInventoryCount = (product: Product, colorId: string, sizeId: string): number => {
  // Create inventory key in the format 'color-size'
  const inventoryKey = `${colorId}-${sizeId}`;
  return product.inventory[inventoryKey] || 0;
};

// Check if any sizes are available for a specific color
export const isColorAvailable = (product: Product, colorId: string): boolean => {
  // Get all sizes for the product
  const sizes = product.sizes || [];
  // Check if any size is available for this color
  return sizes.some((size) => isInStock(product, colorId, size.id));
};

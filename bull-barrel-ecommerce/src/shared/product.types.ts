// Basic image type for product galleries
export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  isDefault?: boolean;
}
// Available product colors
export type ProductColor = {
  id: string;
  name: string;
  value: string; // Hex code or CSS color value
};

//Available product sizes
export type ProductSize = {
  id: string;
  name: string; // S, M, L, XL or numerical sizing
  inStock: boolean;
};

// Product category enum
export enum ProductCategory {
  ALL = 'all',
  APPAREL = 'apparel',
  DRINKWARE = 'drinkware',
  WHISKEY = 'whiskey',
  ACCESSORIES = 'accessories',
}

// Main product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  features?: string[];
  category: ProductCategory;
  images: ProductImage[];
  colors?: ProductColor[];
  sizes?: ProductSize[];
  inventory: Record<string, number>; // Keyed by "colorId-sizeId" for variant inventory tracking
  isNew?: boolean;
  isLimited?: boolean;
  relatedProductIds?: string[];
}

// Cart item interface
export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

import { Product, ProductCategory, ProductColor, ProductSize } from '../product.types';
import tshirtFrontImage from '../../assets/images/tshirtFrontImage.png';
// Common colors
const colors: ProductColor[] = [
  { id: 'black', name: 'Black', value: '#000000' },
  { id: 'white', name: 'White', value: '#ffffff' },
  { id: 'navy', name: 'Navy Blue', value: '#000080' },
  { id: 'brown', name: 'Bourbon Brown', value: '#964B00' },
];

const apparelSizes: ProductSize[] = [
  { id: 's', name: 'S', inStock: true },
  { id: 'm', name: 'M', inStock: true },
  { id: 'l', name: 'L', inStock: true },
  { id: 'xl', name: 'XL', inStock: true },
  { id: 'xxl', name: 'XXL', inStock: true },
];

export const mockProducts: Product[] = [
  // T-Shirt
  {
    id: 'bull-barrel-tshirt',
    name: 'Bull & Barrel Logo T-Shirt',
    price: 24.99,
    description:
      "Premium cotton t-shirt featuring the iconic Bull & Barrel logo from Alexander's Steakhouse.",
    features: ['100% premium cotton', 'Pre-shrunk', 'Unisex styling', 'Screen-printed logo'],
    category: ProductCategory.APPAREL,
    images: [
      {
        id: 'tshirt-front',
        // src: 'https://placehold.co/600x400?text=T-Shirt+Front',
        src: tshirtFrontImage,
        alt: 'Bull & Barrel T-Shirt Front View',
        isDefault: true,
      },
      {
        id: 'tshirt-back',
        src: 'https://placehold.co/600x400?text=T-Shirt+Back',
        alt: 'Bull & Barrel T-Shirt Back View',
      },
    ],
    colors: colors.slice(0, 3), // Black, White, Navy
    sizes: apparelSizes,
    inventory: {
      'black-s': 15,
      'black-m': 20,
      'black-l': 25,
      'black-xl': 10,
      'black-xxl': 0,
      'white-s': 15,
      'white-m': 20,
      'white-l': 25,
      'white-xl': 10,
      'white-xxl': 0,
      'navy-s': 15,
      'navy-m': 20,
      'navy-l': 0,
      'navy-xl': 10,
      'navy-xxl': 0,
    },
    relatedProductIds: ['bull-barrel-hat', 'bull-barrel-glencairn'],
  },

  // Glencairn Glass
  {
    id: 'bull-barrel-glencairn',
    name: 'Bull & Barrel Glencairn Glass',
    price: 18.99,
    description:
      'Crystal Glencairn whisky glass etched with the Bull & Barrel logo. Perfect for enjoying your favorite whiskey.',
    features: [
      'Official Glencairn whisky glass',
      'Lead-free crystal',
      'Etched Bull & Barrel logo',
      'Designed to enhance your whiskey tasting experience',
    ],
    category: ProductCategory.DRINKWARE,
    images: [
      {
        id: 'glencairn-front',
        src: 'https://placehold.co/600x600?text=Glencairn+Glass',
        alt: 'Bull & Barrel Glencairn Glass',
        isDefault: true,
      },
      {
        id: 'glencairn-angle',
        src: 'https://placehold.co/600x600?text=Glencairn+Angle',
        alt: 'Bull & Barrel Glencairn Glass Angled View',
      },
    ],
    inventory: {
      default: 75,
    },
    relatedProductIds: ['bull-barrel-whiskey-pick', 'bull-barrel-coasters'],
  },

  // Limited Edition Barrel Pick Whiskey
  {
    id: 'bull-barrel-whiskey-pick',
    name: 'Bull & Barrel Select Bourbon',
    price: 79.99,
    description:
      'Limited edition barrel pick, selected exclusively by our whiskey experts. Notes of caramel, vanilla, and oak with a smooth finish.',
    features: [
      'Single barrel selection',
      'Bottled at 110 proof',
      'Aged 8 years',
      'Limited availability',
      'Exclusive to Bull & Barrel',
    ],
    category: ProductCategory.WHISKEY,
    images: [
      {
        id: 'whiskey-front',
        src: 'https://placehold.co/600x600?text=Whiskey+Bottle',
        alt: 'Bull & Barrel Select Bourbon',
        isDefault: true,
      },
      {
        id: 'whiskey-detail',
        src: 'https://placehold.co/600x600?text=Whiskey+Detail',
        alt: 'Bull & Barrel Select Bourbon Detail',
      },
    ],
    inventory: {
      default: 12,
    },
    isLimited: true,
    relatedProductIds: ['bull-barrel-glencairn', 'bull-barrel-coasters'],
  },

  // Enamel Pin
  {
    id: 'bull-barrel-pin',
    name: 'Bull & Barrel Enamel Pin',
    price: 9.99,
    description:
      'Collectible hard enamel pin featuring our iconic Bull & Barrel logo. Perfect for jackets, bags, or lanyards.',
    features: [
      'Hard enamel finish',
      'Nickel-plated metal',
      'Butterfly clutch backing',
      'Approximately 1.25 inches',
    ],
    category: ProductCategory.ACCESSORIES,
    images: [
      {
        id: 'pin-front',
        src: 'https://placehold.co/600x600?text=Enamel+Pin',
        alt: 'Bull & Barrel Enamel Pin',
        isDefault: true,
      },
    ],
    colors: [colors[0], colors[3]], // Black and Brown
    inventory: {
      black: 50,
      brown: 35,
    },
    relatedProductIds: ['bull-barrel-stickers', 'bull-barrel-hat'],
  },
];

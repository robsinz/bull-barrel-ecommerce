import { Product, ProductCategory, ProductColor, ProductSize } from '../product.types';
import tshirtFrontImage from '../../assets/images/tshirtFrontImage.png';
import pin from '../../assets/images/pin.jpg';
import bullandbarrelPoster from '../../assets/images/bullandbarrelPoster.png';
import glencairn from '../../assets/images/glencairn.jpg';

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

  // Enamel Pin
  {
    id: 'bull-head-pin',
    name: 'Bull Head Enamel Pin',
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
        src: pin,
        alt: 'Bull & Barrel Enamel Pin',
        isDefault: true,
      },
    ],
    inventory: {
      default: 20,
    },
    relatedProductIds: ['bull-barrel-stickers', 'bull-barrel-hat'],
  },
  {
    id: 'bull-barrel-poster',
    name: 'Bull & Barrel Screen Print',
    price: 24.99,
    description:
      'Collectible Screen Print featuring our iconic Bull & Barrel collaboration with Glenfiddich.',
    features: ['11x17', 'Matte Finish'],
    category: ProductCategory.ACCESSORIES,
    images: [
      {
        id: 'pin-front',
        src: bullandbarrelPoster,
        alt: 'Bull & Barrel Poster',
        isDefault: true,
      },
    ],
    inventory: {
      default: 6,
    },
    relatedProductIds: ['bull-barrel-stickers', 'bull-barrel-hat'],
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
        src: glencairn,
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
      default: 3,
    },
    relatedProductIds: ['bull-barrel-whiskey-pick', 'bull-barrel-coasters'],
  },

  // Limited Edition Barrel Pick Whiskey
  {
    id: 'bull-barrel-whiskey-pick-bourbon',
    name: 'Bull & Barrel Select Bourbon',
    price: 120.0,
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
      default: 0,
    },
    isLimited: true,
    relatedProductIds: ['bull-barrel-glencairn', 'bull-barrel-coasters'],
  },
  {
    id: 'bull-barrel-whiskey-pick-rye',
    name: 'Bull & Barrel Select Rye',
    price: 150.0,
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
];

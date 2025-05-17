import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import ProductGallery from '../ProductGallery';
import { isInStock, isColorAvailable } from '../../shared/utils/InventoryHelper';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  // the ":id" in the path is a URL parameter, which React Router makes available through the "usePrams" hook

  const { getProductById } = useProducts();
  // destructoring the getProductById method from out context using the useProducts custom hook
  const selectedProduct = getProductById(id || '');
  // When a component calls useProducts(), it's accessing the value that was
  // passed to ProductContext.Provider within your ProductProvider component.
  // in this case I need to access only a specific product by id.

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  // Handle products with or without colors
  const defaultColor = selectedProduct.colors
    ? selectedProduct.colors.find((color) => isColorAvailable(selectedProduct, color.id)) ||
      selectedProduct.colors[0]
    : undefined;
  // Check if the product has colors
  // If so, try to find a color that has at least one size in stock(if the eval result of isColorAvailable = true)
  // If no available color is found, defaulting to the first color
  // If the product has no colors, setting defaultColor to undefined

  const [selectedColor, setSelectedColor] = useState(defaultColor ? defaultColor.id : undefined);
  // conditional state for the color:
  // if the default color exists on the selected product, set initial state to that corresponding color, or undefined

  // Handle products with or without sizes
  const availableSizes =
    selectedProduct.sizes && selectedProduct.sizes.length > 0 && selectedColor
      ? selectedProduct.sizes.filter((size) => isInStock(selectedProduct, selectedColor, size.id))
      : [];
  // If the product has sizes and color is selected, filtering sizes to only those in stock for the selected color
  // otherwise, setting availableSizes to an empty array

  const defaultSize =
    availableSizes.length > 0
      ? availableSizes[0].id
      : selectedProduct.sizes && selectedProduct.sizes.length > 0
        ? selectedProduct.sizes[0].id
        : undefined;
  // If there are available sizes for the selected color, use the first one as default
  // If there are no available sizes but the product has sizes(clothing), use the first size
  // If the product has no sizes, setting defaultSize to undefined

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addToCart } = useCart();

  // Updated selected Size when color changes to ensure valid combo
  useEffect(() => {
    if (selectedColor && selectedProduct.sizes && selectedProduct.sizes.length > 0) {
      const isSizeAvailable =
        selectedSize && isInStock(selectedProduct, selectedColor, selectedSize);
      // If selectedSize exists and isInStock equals true
      if (!isSizeAvailable) {
        const availableSizes = selectedProduct.sizes.filter((size) =>
          isInStock(selectedProduct, selectedColor, size.id)
        );
        // If isSizeAvailable is false, set availableSizes to be the truthy values of isInStock
        if (availableSizes.length > 0) {
          setSelectedSize(availableSizes[0].id);
        }
      }
    }
  }, [selectedColor, selectedProduct, selectedSize]);
  // This effect runs when selectedColor, selectedProduct, or selectedSize changes
  // It checks if the currently selected size is available with the newly selected color
  // If not, it automatically selects the first available size for the color

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cartItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.images[0].src,
    };

    addToCart(cartItem);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);

    console.log('Added to cart:', cartItem);
  };
  return (
    <div className="product-page">
      <div className="product-content">
        <div className="product-gallery">
          <ProductGallery images={selectedProduct.images} />
        </div>

        <div
          className={`product-details ${
            (!selectedProduct.colors || selectedProduct.colors.length === 0) &&
            (!selectedProduct.sizes || selectedProduct.sizes.length === 0)
              ? 'no-options'
              : ''
          }`}
        >
          <h1>{selectedProduct.name}</h1>
          <p className="product-price">${selectedProduct.price.toFixed(2)}</p>
          <p className="product-description">{selectedProduct.description}</p>
          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="product-features">
              <ul>
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Color Selection - only show if product has colors */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="product-colors">
              <h3>Colors:</h3>
              <div className="color-options">
                {selectedProduct.colors.map((color) => {
                  const isAvailable = isColorAvailable(selectedProduct, color.id);
                  return (
                    <button
                      key={color.id}
                      className={`color-option ${selectedColor === color.id ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                      onClick={() => isAvailable && setSelectedColor(color.id)}
                      disabled={!isAvailable}
                    >
                      {color.name} {!isAvailable && '(Out of Stock)'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Size selection - only show if product has sizes */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div className="product-sizes">
              <h3>Sizes:</h3>
              <div className="size-options">
                {selectedProduct.sizes.map((size) => {
                  const isAvailable = selectedColor
                    ? isInStock(selectedProduct, selectedColor, size.id)
                    : false;
                  return (
                    <button
                      key={size.id}
                      className={`size-option ${selectedSize === size.id ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                      onClick={() => isAvailable && setSelectedSize(size.id)}
                      disabled={!isAvailable}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Quantity selection */}
          <div className="product-quantity">
            <h3>Quantity:</h3>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>
          <div className="add-to-cart-container">
            <button onClick={handleAddToCart} className={isAddedToCart ? 'added' : ''}>
              {isAddedToCart ? 'Adding to Cart!' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

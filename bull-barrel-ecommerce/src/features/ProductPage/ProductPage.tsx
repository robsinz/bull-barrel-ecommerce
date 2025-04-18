import { useState } from 'react';
import { mockProducts } from '../../shared/data/mockProducts';
import { Product } from '../../shared/product.types';
import './ProductPage.css';
import ProductGallery from '../ProductGallery';

function ProductPage() {
  // For now, displaying first product
  const selectedProduct: Product = mockProducts[0];
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors ? selectedProduct.colors[0].id : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes ? selectedProduct.sizes[0].id : undefined
  );
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: selectedProduct.images[0].src,
    };

    console.log('Added to cart:', cartItem);

    alert(`Added ${quantity} ${selectedProduct.name} to cart!`);

    // need to update cart state here
  };
  return (
    <div className="product-page">
      <div className="product-content">
        <div className="product-gallery">
          <ProductGallery images={selectedProduct.images} />
          {/* <img src={selectedProduct.images[0].src} alt={selectedProduct.images[0].alt} /> */}
        </div>

        <div className="product-details">
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

          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="product-colors">
              <h3>Colors:</h3>
              <div className="color-options">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color.id}
                    className={`color-option ${selectedColor === color.id ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color.id)}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div className="product-sizes">
              <h3>Sizes:</h3>
              <div className="size-options">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`size-option ${selectedSize === size.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size.id)}
                    // disabled={!size.inStock}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="product-quantity">
            <h3>Quantity:</h3>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>
          <div className="cart-container">
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

import { useState } from 'react';
import { mockProducts } from '../../shared/data/mockProducts';
import { Product } from '../../shared/product.types';
import { isLightColor } from '../../shared/utils/colorUtils';
import './ProductPage.css';

function ProductPage() {
  // For now, displaying first product
  const selectedProduct: Product = mockProducts[0];
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors ? selectedProduct.colors[0].id : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes ? selectedProduct.sizes[0].id : undefined
  );

  return (
    <div className="container-page">
      <h1>{selectedProduct.name}</h1>
      <div className="product-content">
        <div className="product-gallery">
          {/* ProductGallery component here */}
          <img src={selectedProduct.images[0].src} alt={selectedProduct.images[0].alt} />
        </div>
        <div className="product-details">
          <p className="product-price">${selectedProduct.price.toFixed(2)}</p>
          <p className="product-description">{selectedProduct.description}</p>
          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {selectedProduct.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to cart section here */}
        </div>
        {selectedProduct.colors && selectedProduct.colors.length > 0 && (
          <div className="product-colors">
            <h3>Colors:</h3>
            <div className="color-options">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color.id}
                  className={`color-option ${selectedColor === color.id ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
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
      </div>
    </div>
  );
}

export default ProductPage;

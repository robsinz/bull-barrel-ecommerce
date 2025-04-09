import { mockProducts } from '../../shared/data/mockProducts';
import { Product } from '../../shared/product.types';
import './ProductPage.css';

function ProductPage() {
  // For now, displaying first product
  const selectedProduct: Product = mockProducts[0];

  return (
    <div className="poduct-page">
      <h1>{selectedProduct.name}</h1>
      <div className="poduct-content">
        <div className="product-gallery">
          {/* ProductGallery component here */}
          <img src={selectedProduct.images[0].src} alt={selectedProduct.images[0].alt} />
        </div>
        <div className="product-detials">
          <p className="product-price">${selectedProduct.price.toFixed(2)}</p>
          <p className="product-description">{selectedProduct.description}</p>
          {/* Add to cart section here */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

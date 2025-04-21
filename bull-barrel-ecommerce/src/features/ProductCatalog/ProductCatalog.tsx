import { mockProducts } from '../../shared/data/mockProducts';
import { Link } from 'react-router-dom';
import { Product } from '../../shared/product.types';
import './ProductCatalog.css';

const getInventoryCount = (product: Product): number => {
  const inventoryValues = Object.values(product.inventory);
  const totalInventory = inventoryValues.reduce((sum, count) => sum + (count as number), 0);
  return totalInventory;
};

function ProductCatalog() {
  return (
    <div className="product-catalog">
      <h1>Shop</h1>
      <div className="product-grid">
        {mockProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            <div className="product-card">
              <div className="product-card-image">
                <img src={product.images[0].src} alt={product.images[0].alt} />
              </div>
              <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <div className="product-card-footer">
                  <p className="product-card-price">${product.price.toFixed(2)}</p>
                  {getInventoryCount(product) <= 5 && (
                    <div className="low-inventory">{`Only ${getInventoryCount(product)} available`}</div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;

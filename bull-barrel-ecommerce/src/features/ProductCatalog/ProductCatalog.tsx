import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Product, ProductCategory } from '../../shared/product.types';
import './ProductCatalog.css';

function ProductCatalog() {
  const { products } = useProducts();
  // When a component calls useProducts(), it's accessing the value that was
  // passed to ProductContext.Provider within your ProductProvider component.
  // in this case I need the entire products array to map through.

  const getInventoryCount = (product: Product): number => {
    const inventoryValues = Object.values(product.inventory);
    const totalInventory = inventoryValues.reduce((sum, count) => sum + (count as number), 0);
    return totalInventory;
  };
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.ALL);

  const handleCategory = (selectedCategory: ProductCategory) => {
    setCategory(selectedCategory);
  };

  const filteredProducts = useMemo(() => {
    return category === ProductCategory.ALL
      ? products
      : products.filter((product) => product.category === category);
  }, [category, products]);
  return (
    <div className="product-catalog">
      <h1>Shop</h1>
      <h2>Apparel | Drinkware | Whiskey</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
            {/* When a user clicks this link:
                  - The URL changes to /product/[the-product-id]
                  - React Router matches this path to the /product/:id route
                  - ProductPage component renders with access to the ID parameter
                  - ProductPage uses this ID to fetch the specific product data */}
            <div className="product-card">
              <div className="product-card-image">
                <img src={product.images[0].src} alt={product.images[0].alt} />
              </div>
              <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>

                <div className="product-card-footer">
                  <p className="product-card-price">${product.price.toFixed(2)}</p>

                  {getInventoryCount(product) === 0 ? (
                    <div className="sold-out">Sold Out!</div>
                  ) : getInventoryCount(product) <= 5 ? (
                    <div className="low-inventory">{`Only ${getInventoryCount(product)} available`}</div>
                  ) : (
                    <div className="low-inventory-placeholder"></div>
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

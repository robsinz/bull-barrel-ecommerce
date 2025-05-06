import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

import tshirtFrontImage from '../../assets/images/tshirtFrontImage.png';
const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const testCart = [
    {
      productId: 't-shirt',
      name: 'bull n barrel t shirt',
      price: 29.99,
      color: 'White',
      size: 'M',
      quantity: 2,
      image: tshirtFrontImage,
    },
    {
      productId: 't-shirt',
      name: 'bull n barrel t shirt',
      price: 29.99,
      color: 'Black',
      size: 'L',
      quantity: 1,
      image: tshirtFrontImage,
    },
    {
      productId: 't-shirt',
      name: 'bull n barrel t shirt',
      price: 29.99,
      color: 'Black',
      size: 'L',
      quantity: 1,
      image: tshirtFrontImage,
    },
    {
      productId: 't-shirt',
      name: 'bull n barrel t shirt',
      price: 29.99,
      color: 'Black',
      size: 'L',
      quantity: 1,
      image: tshirtFrontImage,
    },
  ];

  return (
    <div className="main-cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="item-container">
        {testCart.length > 0 ? (
          <div className="cart-items">
            {testCart.map((item) => (
              <div key={item.productId} className="cart-item-grid">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="product-details">
                  <p className="item-name">{item.name}</p>
                  {item.color && <p className="item-variant">Color: {item.color}</p>}
                  {item.size && <p className="item-variant">Size: {item.size}</p>}
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.color || '',
                        item.size || '',
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.color || '',
                        item.size || '',
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className="price-remove-container">
                  <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.productId, item.color || '', item.size || '')
                    }
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="subtotal-checkout-container">
        <div className="subtotal-container">
          <p className="subtotal-label">Subtotal:</p>
          <p className="subtotal-amount">${getCartTotal().toFixed(2)}</p>
        </div>
        <button className="checkout-button" onClick={() => console.log('you checked out')}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

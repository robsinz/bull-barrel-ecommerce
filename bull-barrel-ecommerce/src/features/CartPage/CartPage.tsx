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
      color: 'white',
      size: 'm',
      quantity: 2,
      image: tshirtFrontImage,
    },
    {
      productId: 't-shirt',
      name: 'bull n barrel t shirt',
      price: 29.99,
      color: 'black',
      size: 'l',
      quantity: 4,
      image: tshirtFrontImage,
    },
  ];

  return (
    <div className="container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="item-container">
        {testCart.length > 0 ? (
          <div className="cart-items">
            {testCart.map((item) => (
              <div key={item.productId} className="cart-item-grid">
                <div className="product-info">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="product-details">
                    <p className="item-name">{item.name}</p>
                    {item.size && <p className="item-variant">Size: {item.size}</p>}
                    {item.color && <p className="item-variant">Color: {item.color}</p>}
                  </div>
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
                <div className="price-container">
                  <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="remove-controls">
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
        <div className="checkout">
          <button className="checkout-button" onClick={() => console.log('you checked out')}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.css';
// import { Route } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="main-cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="item-container">
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productId} className="cart-item-grid">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="product-details">
                  <p className="item-name">{item.name}</p>
                  {item.color && (
                    <p className="item-variant">
                      Color: {item.color[0].toUpperCase() + item.color.slice(1)}
                    </p>
                  )}
                  {item.size && <p className="item-variant">Size: {item.size.toUpperCase()}</p>}
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity({
                        productId: item.productId,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity - 1,
                      })
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity({
                        productId: item.productId,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity + 1,
                      })
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
                      removeFromCart(
                        item.productId,
                        item.color || undefined,
                        item.size || undefined
                      )
                    }
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-items-message">
            <p>Your cart is empty.</p>
          </div>
        )}
      </div>
      <div className="subtotal-checkout-container">
        <div className="subtotal-container">
          <p className="subtotal-label">Subtotal:</p>
          <p className="subtotal-amount">${getCartTotal().toFixed(2)}</p>
        </div>
        <button className="checkout-button" disabled={!cart.length} onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPage;

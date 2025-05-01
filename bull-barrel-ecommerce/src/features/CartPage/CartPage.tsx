import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  return (
    <div className="container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="item-container">
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productId}>
                <p className="item-name">{item.name}</p>
                {item.size && <p className="item-variant">Size: {item.size}</p>}
                {item.color && <p className="item-variant">Color: {item.color}</p>}
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
                <div className="subtotal-container">
                  <p className="subtotal-label">Subtotal:</p>
                  <p className="subtotal-amount">${getCartTotal().toFixed(2)}</p>
                </div>
                <div className="checkout">
                  <button
                    className="checkout-button"
                    onClick={() => console.log('you checked out')}
                  >
                    CHECKOUT
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
      <div className="subtotal">subtotal</div>
      <button className="checkout-button">CHECKOUT</button>
    </div>
  );
};

export default CartPage;

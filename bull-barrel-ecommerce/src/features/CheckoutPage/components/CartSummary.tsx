import { useCart } from '../../../context/CartContext';
import './CartSummary.css';

const CartSummary = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  return (
    <div className="summary-container">
      <div className="item-container">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.productId} className="sum-items-container">
              <img src={item.image} alt={item.name} className="sum-cart-image"></img>
              <div className="sum-cart-details">
                <span>{item.name}</span>
                {item.color && (
                  <p className="item-variant">
                    Color: {item.color[0].toUpperCase() + item.color.slice(1)}
                  </p>
                )}
                {item.size && <p className="item-variant">Size: {item.size.toUpperCase()}</p>}
              </div>
              <div className="price-quant-remove-container">
                <p>${item.price}</p>
                <div className="quantity-container">
                  <button
                    onClick={() =>
                      updateQuantity({
                        productId: item.productId,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity - 1,
                      })
                    }
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
                <button onClick={() => removeFromCart}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>cart is empty</p>
          </div>
        )}
      </div>
      <div>
        <p>Subtotal</p>
        <p>Tax</p>
        <p>Shipping</p>
        <button onClick={() => clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartSummary;

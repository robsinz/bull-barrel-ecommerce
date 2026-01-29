import { useCart } from '../../../context/CartContext';
import './CartSummary.css';

const CartSummary = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getTax,
    getShippingRate,
    getFullTotal,
  } = useCart();

  return (
    <div className="summary-container">
      <div className="item-container">
        {cart.length > 0 &&
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
                    disabled={item.quantity === 1}
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
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId, item.color, item.size)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        <div className="subtotal-tax-shipping-container">
          <div className="cart-summary__subtotal-container">
            <p className="cart-summary__label-subtotal">Subtotal:</p>
            <p>${getCartTotal().toFixed(2)}</p>
          </div>
          <div className="cart-summary__tax-container">
            <p className="cart-summary__label-tax">Tax:</p>
            <p>${getTax().toFixed(2)}</p>
          </div>
          <div className="cart-summary__shipping-container">
            <p className="cart-summary__label-shipping">Shipping:</p>
            {getFullTotal() !== 0 && getShippingRate() === 0 && (
              <p className="cart-summary__free-shipping">Yah! Free Shipping</p>
            )}
            <p>${getShippingRate()}</p>
          </div>
          <div className="cart-summary__total-container">
            <p className="cart-summary__label-total">Total:</p>
            <p className="cart-summary__full-total">${getFullTotal().toFixed(2)}</p>
          </div>
          <div className="cart-summary__clear-cart-container">
            <button onClick={() => clearCart()}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

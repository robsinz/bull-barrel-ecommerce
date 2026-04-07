import { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../shared/product.types';
import CartSummary from './components/CartSummary';
import EmailForm from './components/EmailForm/EmailForm';
import ShippingForm from './components/ShippingForm/ShippingForm';
import PaymentForm from './components/PaymentsForm/PaymentForm';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { checkoutData } = useCheckout();
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (cart: CartItem[]) => {
    for (let i = 0; i < cart.length; i++) {
      console.log(`
        Your order details:
        Name: ${cart[i].name},
        Size: ${cart[i]?.size},
        Color: ${cart[i]?.color},
        Quantity: ${cart[i]?.quantity},
        Id: ${cart[i].productId}
        `);
    }
    clearCart();
    setCurrentStep(1);
    setIsSuccess(true);
  };
  return (
    <>
      {isSuccess ? (
        <div className="checkout-page__success-container">
          <h3>{`Congrats ${checkoutData.firstName}!`}</h3>
          <p>Your order is on the way.</p>
          <button>Keep Shopping</button>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-forms">
            <h1>Checkout - Step {currentStep} of 3</h1>
            {currentStep === 1 ? (
              <EmailForm onNext={() => setCurrentStep(2)} />
            ) : (
              <div className="completed-step">
                <div className="h3-button">
                  <h3>Email: </h3>
                  <button onClick={() => setCurrentStep(1)}>Edit</button>
                </div>
                <p>{checkoutData.email}</p>
              </div>
            )}
            {currentStep >= 2 &&
              (currentStep === 2 ? (
                <ShippingForm onNext={() => setCurrentStep(3)} />
              ) : (
                <div className="completed-step">
                  <div className="h3-button">
                    <h3>Shipping Address: </h3>
                    <button onClick={() => setCurrentStep(2)}>Edit</button>
                  </div>
                  <p>{`${checkoutData.firstName} ${checkoutData.lastName}`}</p>
                  <p>{checkoutData.shipping.address}</p>
                  <p>
                    {`${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.postalCode}`}
                  </p>
                </div>
              ))}
            {currentStep >= 3 &&
              (currentStep === 3 ? (
                <PaymentForm onNext={() => setCurrentStep(4)} />
              ) : (
                <div className="completed-step">
                  <div className="h3-button">
                    <h3>Payment Information: </h3>
                    <button onClick={() => setCurrentStep(3)}>Edit</button>
                  </div>
                  <p>{`XXXX-XXXX-XXXX-${checkoutData.payment.ccNum.slice(-4)}`}</p>
                  <p>{checkoutData.payment.exp}</p>
                  <p>{checkoutData.payment.nameOnCard}</p>
                </div>
              ))}
            <div>
              {currentStep >= 4 && (
                <button
                  onClick={() => handlePlaceOrder(cart)}
                  className="checkout-page__place-order-btn"
                >
                  PLACE ORDER
                </button>
              )}
            </div>
          </div>

          <div className="checkout-cart">
            <h2>Order Summary</h2>
            <CartSummary />
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutPage;

import { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import CartSummary from './components/CartSummary';
import EmailForm from './components/EmailForm/EmailForm';
import ShippingForm from './components/ShippingForm/ShippingForm';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { checkoutData, updateCheckout } = useCheckout();
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="checkout-container">
      <div className="checkout-forms">
        <h1>Checkout - Step {currentStep} of 3</h1>
        {currentStep === 1 ? (
          <EmailForm onNext={() => setCurrentStep(2)} />
        ) : (
          <div className="completed-step">
            <p>Email: {checkoutData.email}</p>
            <button onClick={() => setCurrentStep(1)}>Edit</button>
          </div>
        )}
        {currentStep >= 2 &&
          (currentStep === 2 ? (
            <ShippingForm onNext={() => setCurrentStep(3)} />
          ) : (
            <div className="completed-step">
              <h3>Shipping Address</h3>
              <p></p>
              <button onClick={() => setCurrentStep(2)}>Edit</button>
            </div>
          ))}
      </div>

      <div className="checkout-cart">
        <h2>Order Summary</h2>
        <CartSummary />
      </div>
    </div>
  );
};
export default CheckoutPage;

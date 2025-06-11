import { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import CartSummary from './components/CartSummary';
import EmailForm from './components/EmailForm/EmailForm';
import ShippingForm from './components/ShippingForm/ShippingForm';
import PaymentForm from './components/PaymentsForm/PaymentForm';
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
              <p>{`${checkoutData.firstName} ${checkoutData.lastName}`}</p>
              <p>{checkoutData.billing.address}</p>
              <p>
                {`${checkoutData.billing.city}, ${checkoutData.billing.state} ${checkoutData.billing.postalCode}`}
              </p>
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

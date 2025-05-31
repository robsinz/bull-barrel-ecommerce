import { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import ShippingForm from './components/ShippingForm/ShippingForm';

const CheckoutPage = () => {
  // const { checkoutData, updateCheckout } = useCheckout();
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="checkout-container">
      <div className="shipping-container">
        {currentStep === 1 && <ShippingForm onNext={() => setCurrentStep(2)} />}
      </div>
      <div className="checkout-cart">
        <p>Cart container here</p>
      </div>
    </div>
  );
};
export default CheckoutPage;

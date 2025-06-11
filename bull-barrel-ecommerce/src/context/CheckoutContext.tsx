import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  shipping: { address: string; address2: string; city: string; state: string; postalCode: string };
  payment: { ccNum: string; exp: string; cvv: string; nameOnCard: string };
  billing: {
    sameAsShipping: boolean;
    address: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

interface CheckoutContextType {
  checkoutData: CheckoutData;
  updateCheckout: (data: Partial<CheckoutData>) => void; // Partial<CheckoutData> means, any subset of CheckoutData properties
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

const userCheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  shipping: { address: '', address2: '', city: '', state: '', postalCode: '' },
  payment: { ccNum: '', exp: '', cvv: '', nameOnCard: '' },
  billing: {
    sameAsShipping: false,
    address: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
  },
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [checkout, setCheckout] = useState(userCheckoutData);

  const updateCheckout = (data: Partial<CheckoutData>) => {
    setCheckout({ ...checkout, ...data });
  };

  const resetCheckout = () => {
    setCheckout(userCheckoutData);
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData: checkout,
        updateCheckout,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

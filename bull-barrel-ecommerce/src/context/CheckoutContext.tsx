import { createContext, useContext, useState, ReactNode } from 'react';

// define what the data looks like
interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  shipping: { address: string; address2: string; city: string; state: string; postalCode: string };
  payment: { ccNum: string; exp: string; secCode: string };
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
  updateCheckout: (data: CheckoutData) => void;
  resetCheckout: () => void;
}

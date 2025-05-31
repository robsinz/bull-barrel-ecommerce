import { useCheckout } from '../../../../context/CheckoutContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ShippingForm.css';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface ShippingFormProps {
  onNext: () => void;
}

const ShippingForm = ({ onNext }: ShippingFormProps) => {
  const { checkoutData, updateCheckout } = useCheckout();
  const { register, handleSubmit } = useForm<ShippingFormData>({
    defaultValues: {
      firstName: checkoutData.firstName,
      lastName: checkoutData.lastName,
      email: checkoutData.email,
      address: checkoutData.shipping.address,
      address2: checkoutData.shipping.address2,
      city: checkoutData.shipping.city,
      state: checkoutData.shipping.state,
      postalCode: checkoutData.shipping.postalCode,
    },
  });

  const onSubmit: SubmitHandler<ShippingFormData> = (data) => {
    updateCheckout({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      shipping: {
        address: data.address,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
      },
    });

    onNext();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-side">
      <div className="first-lastname-container">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" {...register('firstName')} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" {...register('lastName')} />
      </div>

      <div className="email-address-container">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="address">Address</label>
        <input type="text" id="address" {...register('address')} />

        <label htmlFor="address2">Address2</label>
        <input type="text" id="address2" placeholder="Apt, unit, etc." {...register('address2')} />
      </div>

      <div className="city-state-container">
        <label htmlFor="city">City</label>
        <input type="text" id="city" {...register('city')} />

        <label htmlFor="state">State</label>
        <input type="text" id="state" {...register('state')} />
      </div>
      <div className="postalcode-container">
        <label htmlFor="postalcode">Zip Code</label>
        <input type="text" id="postalcode" {...register('postalCode')} />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default ShippingForm;

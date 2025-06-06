import { useCheckout } from '../../../../context/CheckoutContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ShippingForm.css';

interface ShippingFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  state: string;
}

interface ShippingFormProps {
  onNext: () => void;
}

const ShippingForm = ({ onNext }: ShippingFormProps) => {
  const { checkoutData, updateCheckout } = useCheckout();
  const { register, handleSubmit } = useForm<ShippingFormData>({
    defaultValues: {
      email: checkoutData.email,
      // firstName: checkoutData.firstName,
      // lastName: checkoutData.lastName,
      // address: checkoutData.shipping.address,
      // address2: checkoutData.shipping.address2,
      // city: checkoutData.shipping.city,
      // state: checkoutData.shipping.state,
      // postalCode: checkoutData.shipping.postalCode,
    },
  });

  const onSubmit: SubmitHandler<ShippingFormData> = (data) => {
    updateCheckout({
      email: data.email,
      // firstName: data.firstName,
      // lastName: data.lastName,
      // shipping: {
      //   address: data.address,
      //   address2: data.address2,
      //   city: data.city,
      //   state: data.state,
      //   postalCode: data.postalCode,
      // },
    });

    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-side">
      <div className="delivery-container">
        <h3>Shipping Address</h3>
        <div className="name-row">
          <div className="first-name">
            <label htmlFor="firstName">FIRST NAME</label>
            <input type="text" id="firstName" placeholder="First Name" {...register('firstName')} />
          </div>

          <div className="last-name">
            <label htmlFor="lastName">LAST NAME</label>
            <input type="text" id="lastName" placeholder="Last Name" {...register('lastName')} />
          </div>
        </div>

        <div className="address-section">
          <label htmlFor="address">ADDRESS</label>
          <input type="text" id="address" placeholder="Address 1" {...register('address')} />
        </div>

        <div className="address2-container">
          <input
            type="text"
            id="address2"
            placeholder="Apt, unit, etc."
            {...register('address2')}
          />
        </div>

        <div className="city-state-zip">
          <input type="text" id="postalCode" placeholder="Zip Code" {...register('postalCode')} />

          <input type="text" id="city" placeholder="City" {...register('city')} />

          <input type="text" id="state" placeholder="State" {...register('state')} />
        </div>
      </div>
      <button type="submit">CONTINUE</button>
    </form>
  );
};

export default ShippingForm;

import { useCheckout } from '../../../../context/CheckoutContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import './ShippingForm.css';

interface ShippingFormData {
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
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ShippingFormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: checkoutData.firstName,
      lastName: checkoutData.lastName,
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
      <div className="delivery-container">
        <h3>Shipping Address</h3>
        <div className="name-row">
          <div className="first-name">
            <label htmlFor="firstName">FIRST NAME</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register('firstName', { required: 'First Name is required' })}
            />
            {errors.firstName && <div className="error-message">{errors.firstName.message}</div>}
          </div>

          <div className="last-name">
            <label htmlFor="lastName">LAST NAME</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last Name is required' })}
            />
            {errors.lastName && <div className="error-message">{errors.lastName.message}</div>}
          </div>
        </div>

        <div className="address-container">
          <label htmlFor="address">ADDRESS</label>
          <input
            type="text"
            id="address"
            placeholder="Address 1"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <div className="error-message">{errors.address.message}</div>}
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
          <div className="zip-error-container">
            <input
              type="text"
              id="postalCode"
              placeholder="Zip Code"
              {...register('postalCode', { required: 'Zip Code is required' })}
            />
            {errors.postalCode && <div className="error-message">{errors.postalCode.message}</div>}
          </div>

          <div className="city-error-container">
            <input
              type="text"
              id="city"
              placeholder="City"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <div className="error-message">{errors.city.message}</div>}
          </div>

          <div className="state-error-container">
            <input
              type="text"
              id="state"
              placeholder="State"
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && <div className="error-message">{errors.state.message}</div>}
          </div>
        </div>
        <button type="submit" disabled={!isValid}>
          CONTINUE
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;

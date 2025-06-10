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
    formState: { isValid },
  } = useForm<ShippingFormData>({
    mode: 'onChange',
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
              {...register('firstName', { required: 'First Name is requried' })}
            />
          </div>

          <div className="last-name">
            <label htmlFor="lastName">LAST NAME</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last Name is requried' })}
            />
          </div>
        </div>

        <div className="address-container">
          <label htmlFor="address">ADDRESS</label>
          <input
            type="text"
            id="address"
            placeholder="Address 1"
            {...register('address', { required: 'Address is requried' })}
          />
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
          <input
            type="text"
            id="postalCode"
            placeholder="Zip Code"
            {...register('postalCode', { required: 'Zip Code is requried' })}
          />

          <input
            type="text"
            id="city"
            placeholder="City"
            {...register('city', { required: 'City is requried' })}
          />

          <input
            type="text"
            id="state"
            placeholder="State"
            {...register('state', { required: 'State is requried' })}
          />
        </div>
        <button type="submit" disabled={!isValid}>
          CONTINUE
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;

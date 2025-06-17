import { useForm, SubmitHandler } from 'react-hook-form';
import { useCheckout } from '../../../../context/CheckoutContext';
import { useState } from 'react';
import './PaymentForm.css';

interface PaymentFormData {
  ccNum: string;
  exp: string;
  cvv: string;
  nameOnCard: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingAddress2: string;
  billingPostalCode: string;
  billingCity: string;
  billingState: string;
}

interface PaymentFormProps {
  onNext: () => void;
}
const PaymentForm = ({ onNext }: PaymentFormProps) => {
  const [checkboxMarked, setCheckBoxMarked] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<PaymentFormData>({
    mode: 'onChange',
  });

  const { checkoutData, updateCheckout } = useCheckout();

  const onSubmit: SubmitHandler<PaymentFormData> = (data) => {
    const updatedData = !checkboxMarked
      ? {
          payment: {
            ccNum: data.ccNum,
            exp: data.exp,
            cvv: data.cvv,
            nameOnCard: data.nameOnCard,
          },
          billing: {
            sameAsShipping: false,
            address: data.billingAddress,
            address2: data.billingAddress2,
            city: data.billingCity,
            state: data.billingState,
            postalCode: data.billingPostalCode,
          },
        }
      : {
          payment: {
            ccNum: data.ccNum,
            exp: data.exp,
            cvv: data.cvv,
            nameOnCard: data.nameOnCard,
          },
          billing: {
            sameAsShipping: true,
            address: checkoutData.shipping.address,
            address2: checkoutData.shipping.address2,
            city: checkoutData.shipping.city,
            state: checkoutData.shipping.state,
            postalCode: checkoutData.shipping.postalCode,
          },
        };
    updateCheckout(updatedData);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="payment-container">
        <div className="cc-container">
          <h3>Payment Information</h3>
          <div className="cc-input-label">
            <label htmlFor="">CARD NUMBER</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              {...register('ccNum', { required: 'Card number is required' })}
              className={errors.ccNum ? 'error' : ''}
              onChange={(e) => {
                const eventValue = e.target.value;
                const noSpaces = eventValue.replace(/\s+/g, '');

                if (noSpaces.length > 16) {
                  setError('ccNum', { message: 'Your card number is invalid' });
                } else {
                  clearErrors('ccNum');
                }

                const limitedDigits = noSpaces.slice(0, 16);
                const completeGroups = limitedDigits.match(/\d{4}/g) || [];
                const remainder = limitedDigits.slice(completeGroups.length * 4);
                const joinedGroups = completeGroups.join(' ');
                const finalValue =
                  remainder && completeGroups.length > 0
                    ? joinedGroups + ' ' + remainder
                    : joinedGroups + remainder;
                setValue('ccNum', finalValue);
              }}
            />
            {errors.ccNum ? <div className="error-message">{errors.ccNum?.message}</div> : null}
          </div>
        </div>

        <div className="expiry-sec-code">
          <label htmlFor="">EXPIRATION DATE</label>
          <input
            type="text"
            placeholder="MM/YY"
            {...register('exp', { required: 'Expiration date is required' })}
          />

          <label htmlFor="">SECURITY CODE</label>
          <input
            type="text"
            placeholder="CVC"
            {...register('cvv', { required: 'CVV is required' })}
          />
        </div>

        <div className="name-on-card">
          <label htmlFor="">NAME ON CARD</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('nameOnCard', { required: 'Name on card is required' })}
          />
        </div>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={checkboxMarked}
            onChange={() => setCheckBoxMarked(!checkboxMarked)}
          />
          <div className="checkbox-box"></div>
          Billing address same as shipping
        </label>
        {!checkboxMarked && (
          <div className="billing-container">
            <h3>Billing Address</h3>
            <div className="billing-name-row">
              <div className="billing-first-name">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  {...register('billingFirstName', {
                    required: !checkboxMarked ? 'First Name is requried' : false,
                  })}
                />
              </div>

              <div className="billing-last-name">
                <label htmlFor="lastName">LAST NAME</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  {...register('billingLastName', {
                    required: !checkboxMarked ? 'Last Name is requried' : false,
                  })}
                />
              </div>
            </div>
            <div></div>
            <div className="billing-address-container">
              <label htmlFor="address">ADDRESS</label>
              <input
                type="text"
                id="address"
                placeholder="Address 1"
                {...register('billingAddress', {
                  required: !checkboxMarked ? 'Address is requried' : false,
                })}
              />
            </div>

            <div className="billing-address2-container">
              <input
                type="text"
                id="address2"
                placeholder="Apt, unit, etc."
                {...register('billingAddress2')}
              />
            </div>

            <div className="billing-city-state-zip">
              <input
                type="text"
                id="postalCode"
                placeholder="Zip Code"
                {...register('billingPostalCode', {
                  required: !checkboxMarked ? 'Zip Code is requried' : false,
                })}
              />

              <input
                type="text"
                id="city"
                placeholder="City"
                {...register('billingCity', {
                  required: !checkboxMarked ? 'City is requried' : false,
                })}
              />

              <input
                type="text"
                id="state"
                placeholder="State"
                {...register('billingState', {
                  required: !checkboxMarked ? 'State is requried' : false,
                })}
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={!isValid}>
          CONTINUE
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;

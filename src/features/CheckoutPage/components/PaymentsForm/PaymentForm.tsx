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
    getValues,
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
                const digitsOnly = noSpaces.replace(/\D/g, '');

                const limitedDigits = digitsOnly.slice(0, 16);
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
            {errors.ccNum && <div className="error-message">{errors.ccNum.message}</div>}
          </div>
        </div>

        <div className="expiry-sec-code">
          <label htmlFor="">EXPIRATION DATE</label>
          <input
            type="text"
            placeholder="MM/YY"
            {...register('exp', { required: 'Expiration date is required' })}
            onChange={(e) => {
              const eventValue = e.target.value;
              const digitsOnly = eventValue.replace(/\D/g, '');

              const limitedDigits = digitsOnly.slice(0, 4);
              let formatted = limitedDigits;
              if (limitedDigits.length >= 2) {
                formatted = limitedDigits.slice(0, 2) + '/' + limitedDigits.slice(2);
              }
              setValue('exp', formatted);
            }}
          />
          {errors.exp && <div className="error-message">{errors.exp.message}</div>}
          <label htmlFor="">SECURITY CODE</label>
          <input
            type="text"
            placeholder="CVV"
            {...register('cvv', { required: 'CVV is required' })}
            onChange={(e) => {
              const eventValue = e.target.value;
              const digitsOnly = eventValue.replace(/\D/g, '');
              const currentValue = getValues('ccNum');

              const isAmex = currentValue.startsWith('34') || currentValue.startsWith('37');
              const maxLength = isAmex ? 4 : 3;
              const limitedDigits = digitsOnly.slice(0, maxLength);
              setValue('cvv', limitedDigits);
            }}
          />
          {errors.cvv && <div className="error-message">{errors.cvv.message}</div>}
        </div>

        <div className="name-on-card">
          <label htmlFor="">NAME ON CARD</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('nameOnCard', { required: 'Name on card is required' })}
          />
          {errors.nameOnCard && <div className="error-message">{errors.nameOnCard.message}</div>}
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
                    required: !checkboxMarked ? 'First Name is required' : false,
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
                    required: !checkboxMarked ? 'Last Name is required' : false,
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
                  required: !checkboxMarked ? 'Address is required' : false,
                })}
              />
              {errors.billingAddress && (
                <div className="error-message">{errors.billingAddress.message}</div>
              )}
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
                  required: !checkboxMarked ? 'Zip Code is required' : false,
                })}
              />
              {errors.billingPostalCode && (
                <div className="error-message">{errors.billingPostalCode.message}</div>
              )}
              <input
                type="text"
                id="city"
                placeholder="City"
                {...register('billingCity', {
                  required: !checkboxMarked ? 'City is required' : false,
                })}
              />
              {errors.billingCity && (
                <div className="error-message">{errors.billingCity.message}</div>
              )}
              <input
                type="text"
                id="state"
                placeholder="State"
                {...register('billingState', {
                  required: !checkboxMarked ? 'State is required' : false,
                })}
              />
              {errors.billingState && (
                <div className="error-message">{errors.billingState.message}</div>
              )}
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

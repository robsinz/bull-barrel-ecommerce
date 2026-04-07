import { useCheckout } from '../../../../context/CheckoutContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import './EmailForm.css';
interface EmailFormData {
  email: string;
}

interface EmailFormProps {
  onNext: () => void;
}
const EmailForm = ({ onNext }: EmailFormProps) => {
  const { checkoutData, updateCheckout } = useCheckout();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<EmailFormData>({
    mode: 'onChange',
    defaultValues: {
      email: checkoutData.email,
    },
  });

  const onSubmit: SubmitHandler<EmailFormData> = (data) => {
    updateCheckout({
      email: data.email,
    });

    onNext();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-side">
      <div className="email-container">
        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is requried',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <p>You'll receive receipts and notifications at this email</p>
        <button type="submit" disabled={!isValid}>
          CONTINUE
        </button>
      </div>
    </form>
  );
};
export default EmailForm;

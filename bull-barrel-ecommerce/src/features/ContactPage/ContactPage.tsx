import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import './ContactPage.css';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    setTimeout(() => {
      setIsSuccess(true);
      reset();
    }, 1000);
  };

  return (
    <div className="contact-page">
      {isSuccess ? (
        <div className="success-message">
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. We'll get back to you soon!</p>

          <button className="new-message-button" onClick={() => setIsSuccess(false)}>
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <div className="form-side">
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              <header>CONTACT US</header>
              <p>Want to find out more about The Bull & Barrel Bar, give us a shout!</p>
              <div className="full-name">
                <div className="name-field">
                  <label className="first-name">First Name</label>
                  <input
                    id="firstName"
                    {...register('firstName', {
                      required: { value: true, message: 'First name is required' },
                      maxLength: { value: 20, message: 'First name cannot exceed 20 characters' },
                    })}
                  />
                  {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                </div>
                <div className="name-field">
                  <label className="last-name">Last Name</label>
                  <input
                    id="lastName"
                    {...register('lastName', {
                      required: { value: true, message: 'Last name is required' },
                      maxLength: { value: 20, message: 'Last name cannot exceed 20 characters' },
                    })}
                  />
                  {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="email-message-container">
                <label className="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: { value: true, message: 'Email is required' },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <label className="message">Message</label>
                <textarea
                  id="textarea"
                  {...register('message', {
                    required: { value: true, message: 'Message is required' },
                    maxLength: { value: 100, message: 'Your message cannot exceed 100 characters' },
                  })}
                />
                {errors.message && <p className="error-message">{errors.message.message}</p>}

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="image-side">
            <p>Future image goes here</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactPage;

import { useForm } from 'react-hook-form';
import { useSignUp } from './useSignUp';
import { Link } from 'react-router-dom';
const Register = () => {
  const { handleSubmit, formState, getValues, register } = useForm();
  const { errors } = formState;

  const { signup } = useSignUp();

  function onRegister({ email, password, username, role }) {
    signup({ email, password, username, role });
  }

  return (
    <div className='login-container bg-white w-[30rem] shadow-lg rounded-lg flex flex-col gap-4 mx-auto mt-28 py-10 px-10 tracking-normal'>
      <h1 className='text-center text-[30px] font-bold text-[#EA7C69]'>Create Account</h1>
      <p className='text-center  text-[#2D303E] font-semibold text-[20px]'>
        Register to have access to our delicious dishes!
      </p>
      <form onSubmit={handleSubmit(onRegister)}>
        <div className='w-full flex flex-col gap-4'>
          <div className='input-container w-full'>
            <input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: 'This field is required!',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className='input-field w-full p-5 rounded-md border-[#EA7C69] outline-none border-b-2 text-[#1F1D2B] font-semibold'
            />
            {errors?.email && (
              <p className='error-message text-red-700 mt-2'>{errors.email.message}</p>
            )}
          </div>

          <div className='input-container w-full'>
            <input
              type='text'
              id='username'
              placeholder='Username'
              {...register('username', {
                required: 'This field is required!',
              })}
              className='input-field w-full p-5 rounded-md border-[#EA7C69] outline-none border-b-2 text-[#1F1D2B] font-semibold'
            />
            {errors?.username && (
              <p className='error-message text-red-700 mt-2'>{errors.username.message}</p>
            )}
          </div>

          <div className='flex items-center gap-8'>
            <div>
              <input
                type='password'
                id='password'
                placeholder='Password'
                {...register('password', {
                  required: 'This field is required!',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                className='input-field w-full p-5 rounded-md border-[#EA7C69] outline-none border-b-2 text-[#1F1D2B] font-semibold'
              />
              {errors?.password && (
                <p className='error-message text-red-700 mt-2'>{errors.password.message}</p>
              )}
            </div>

            <div>
              <input
                type='password'
                id='confirm'
                placeholder='Confirm Password'
                {...register('confirm', {
                  required: 'This field is required!',
                  validate: (value) =>
                    value === getValues().password || 'The passwords do not match!',
                })}
                className='input-field w-full p-5 rounded-md border-[#EA7C69] outline-none border-b-2 text-[#1F1D2B] font-semibold'
              />
              {errors?.confirm && (
                <p className='error-message text-red-700 mt-2'>{errors.confirm.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type='submit'
          className='submit-button w-full mt-4 text-white bg-[#EA7C69] p-4 rounded-md font-bold hover:bg-transparent border-2 border-[#ea7c69] transition-colors duration-200 hover:text-[#ea7c69]'
        >
          Register
        </button>
      </form>

      <div className='register-prompt flex gap-3 justify-end'>
        <p className='font-bold'>Have an account?</p>
        <Link to='/login'>
          <span className='register-link text-sm text-blue-700 transition-colors duration-200 hover:text-[#ea7c69]'>
            Login here
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Register;

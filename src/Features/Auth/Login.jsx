import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { useLogin } from './useLogin';

const Login = () => {
  const location = useLocation();
  const { email, password } = location.state || {};
  const { handleSubmit, register, formState } = useForm();

  const { errors } = formState;
  const { login, isLoading } = useLogin();

  function onLogin({ email, password }) {
    login({ email, password });
  }
  return (
    <div className='login-container bg-white w-[30rem] shadow-lg rounded-lg flex flex-col gap-4 mx-auto mt-28 py-10 px-10 tracking-normal'>
      <h1 className='text-center text-[30px] font-bold text-[#EA7C69]'>Login here</h1>
      <p className='text-center  text-[#2D303E] font-semibold text-[20px]'>
        Welcome back you’ve been missed!
      </p>

      <form onSubmit={handleSubmit(onLogin)} className='login-form'>
        <div className='w-full flex flex-col gap-4'>
          <div className='input-container w-full'>
            <input
              type='email'
              name='email'
              id='email'
              defaultValue={email}
              placeholder='Email'
              {...register('email', { required: 'This field is required!' })}
              className='input-field  w-full p-5 rounded-md border-[#EA7C69] outline-none border-b-2 text-[#1F1D2B] font-semibold'
            />
            {errors?.email && (
              <p className='error-message text-red-700 mt-2'>{errors.email.message}</p>
            )}
          </div>
          <div className='input-container w-full'>
            <input
              type='password'
              name='password'
              id='password'
              defaultValue={password}
              placeholder='Password'
              {...register('password', { required: 'This field is required!' })}
              className='input-field w-full p-5 border-b-2 border-[#EA7C69]  rounded-md outline-none text-[#1F1D2B] font-semibold'
            />
            {errors?.password && (
              <p className='error-message text-red-700 mt-2'>{errors.password.message}</p>
            )}
          </div>
        </div>
        <p className='float-right mt-1 text-blue-700 cursor-pointer transition-colors duration-200 hover:text-[#ea7c69]'>
          Forgot your password?
        </p>

        <button
          type='submit'
          disabled={isLoading}
          className='submit-button w-full mt-4 text-white bg-[#EA7C69] p-4 rounded-md font-bold hover:bg-transparent border-2 border-[#ea7c69] transition-colors duration-200 hover:text-[#ea7c69]'
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className='register-prompt flex gap-3 justify-end'>
        <p className='font-bold'>New here?</p>
        <Link to='/create'>
          <span className='register-link text-sm text-blue-700 transition-colors duration-200 hover:text-[#ea7c69]'>
            Create Account
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

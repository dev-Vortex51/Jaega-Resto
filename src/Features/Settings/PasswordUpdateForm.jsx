import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../../hooks/useUpdateUser';

function PasswordUpdateForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { handleSubmit, register, getValues, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: reset,
      }
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full rounded-lg bg-[#ea7c69]/20 px-[30px] py-[20px]'
    >
      <div className='grid grid-cols-2 w-[70%] gap-y-4 items-center'>
        <label htmlFor='password' className='text-white font-semibold'>
          Password (min 6 characters)
        </label>
        <div className='flex items-center gap-4'>
          <input
            className='h-[48px] px-4 rounded-[8px]  text-white outline-0  bg-0 border-2 border-[#ea7c69] bg-transparent'
            type='password'
            name='password'
            id='password'
            {...register('password', {
              required: 'This field is required!',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            disabled={isUpdating}
          />
          {errors?.password && (
            <p className='error-message text-red-700 mt-2'>{errors.password.message}</p>
          )}
        </div>
        <label htmlFor='confirmPassword' className='text-white font-semibold'>
          Confirm password
        </label>
        <div className='flex items-center gap-4'>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className='h-[48px] px-4 rounded-[8px]  text-white outline-0  bg-0 border-2 border-[#ea7c69] bg-transparent'
            {...register('confirm', {
              required: 'This field is required!',
              validate: (value) => value === getValues().password || 'The passwords do not match!',
            })}
            disabled={isUpdating}
          />
          {errors?.confirm && (
            <p className='error-message text-red-700 mt-2'>{errors.confirm.message}</p>
          )}
        </div>
      </div>
      <div className='w-full flex items-center gap-4 justify-end mt-5'>
        <button
          onClick={reset}
          type='reset'
          className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#FAFAFA] text-center p-[14px] bg-[#ea7c69] drop-shadow h-[48px] rounded-[8px]'
          disabled={isUpdating}
        >
          Update password
        </button>
      </div>
    </form>
  );
}

export default PasswordUpdateForm;

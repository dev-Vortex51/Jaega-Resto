import { useState } from 'react';
import { useUser } from '../Auth/useUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import PasswordUpdateForm from './PasswordUpdateForm';
function Security() {
  const {
    user: {
      email,
      user_metadata: { username: currentUsername },
    },
  } = useUser();
  const [avatar, setAvatar] = useState(null);

  const [username, setUsername] = useState(currentUsername);

  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    updateUser(
      { username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setUsername(currentUsername);
    setAvatar(null);
  }
  return (
    <div className='w-[90%] mx-auto'>
      <h1 className='text-4xl text-white'>Update your account</h1>

      <h2 className='text-2xl mt-10 mb-3 text-[#abbbc2]'>Update user data</h2>
      <form
        onSubmit={handleSubmit}
        className='w-full rounded-lg bg-[#ea7c69]/20 px-[30px] py-[20px]'
      >
        <div className='grid grid-cols-2 w-[70%] gap-y-4 items-center'>
          <label className='text-white font-semibold' htmlFor='email'>
            Email address
          </label>
          <input
            className='h-[48px] rounded-[8px] bg-transparent text-white border-2 px-4 border-[#ea7c69]'
            type='email'
            name='email'
            value={email}
            disabled
            id='email'
          />
          <label className='text-white font-semibold' htmlFor='username'>
            Full name
          </label>
          <input
            className='h-[48px] px-4 rounded-[8px]  text-white outline-0  bg-0 border-2 border-[#ea7c69] bg-transparent'
            type='text'
            name='username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isUpdating}
          />
          <label className='text-white font-semibold' htmlFor='avatar'>
            Avatar image
          </label>

          <input
            type='file'
            className='block w-full text-sm text-white
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
          file:bg-[#ea7c69] file:text-white file:cursor-pointer
            cursor-pointer file:drop-shadow
            '
            id='avatar'
            accept='image/*'
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        </div>
        <div className='w-full flex items-center gap-4 justify-end mt-5'>
          <button
            type='reset'
            className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#FAFAFA] text-center p-[14px] bg-[#ea7c69] drop-shadow h-[48px] rounded-[8px]'
            disabled={isUpdating}
          >
            Update account
          </button>
        </div>
      </form>

      <h2 className='text-2xl mt-10 mb-3 text-[#abbbc2]'>Update password</h2>
      <PasswordUpdateForm />
    </div>
  );
}

export default Security;

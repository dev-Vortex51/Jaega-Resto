import { FaDollarSign } from 'react-icons/fa';

const Dollar = () => {
  return (
    <div className='bg-transparent w-[18px] h-[18px] flex items-center justify-center border-2 border-[#9288E0] p-[10px] rounded-full text-[#9288E0]'>
      <p className='text-sm'>
        <FaDollarSign />
      </p>
    </div>
  );
};

export default Dollar;

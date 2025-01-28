/* eslint-disable react/prop-types */
import { FaUserCircle } from 'react-icons/fa';
import { formatCurrency } from '../../Utils/helper';

function FilteredOrders({ d }) {
  return (
    <div
      key={d.unique_id}
      className='table_data grid grid-cols-4 mt-5 mb-2 text-white w-full pl-[2rem]'
    >
      <div className='flex gap-4'>
        <div
          className='w-[32px] h-[32px]  flex items-center justify-center p-[15px] rounded-full'
          style={{
            backgroundColor:
              d.status === 'Pending'
                ? '#FFB572'
                : d.status === 'Completed'
                  ? '#6BE2BE'
                  : d.status === 'Failed'
                    ? '#ff6471'
                    : '#9290Fe',
          }}
        >
          <p className='text-xl'>
            <FaUserCircle />
          </p>
        </div>
        <h2 className='text-[14px] font-medium leading-[140%] w-[120px] h-[20px]'>{d.user_name}</h2>
      </div>
      <h2 className='text-[14px] font-medium leading-[140%] w-[120px] h-[20px]'>{d.name}</h2>
      <h2 className='text-[14px] font-medium leading-[140%] w-[120px] h-[20px]'>
        {formatCurrency(d.subtotal)}
      </h2>
      <h2
        className={`text-[14px] font-medium leading-[140%] w-[91px]  py-[5px] px-[4px] rounded-[30px] text-center ${
          d.status === 'Pending'
            ? 'text-[#FFB572] bg-[#FFB572]/20'
            : d.status === 'Completed'
              ? 'text-[#6BE2BE] bg-[#6BE2BE]/20'
              : d.status === 'Failed'
                ? 'text-[#ff6471] bg-[#ff6471]/20 '
                : 'text-[#9290FE] bg-[#9290FE]/20'
        }`}
      >
        {d.status}
      </h2>
    </div>
  );
}

export default FilteredOrders;

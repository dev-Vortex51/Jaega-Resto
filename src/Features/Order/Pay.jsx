/* eslint-disable react/prop-types */
import { formatCurrency } from '../../Utils/helper';

function Pay({ items, handlePay, discount }) {
  return (
    <div className='w-full flex flex-col gap-[10px] pt-10 border-t border-[#393C49] mt-4'>
      <div className='w-full flex items-center justify-between'>
        <p className='text-[#ABBBC2] font-normal text-[14px] leading-[140%] '>Discount</p>
        <p className=' h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
          {formatCurrency(discount)}
        </p>
      </div>
      <div className='w-full flex items-center justify-between'>
        <p className='text-[#ABBBC2] font-normal text-[14px] leading-[140%] '>Sub total</p>
        <p className=' h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
          {formatCurrency(
            items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) -
              items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) * discount
          )}
        </p>
      </div>
      <button
        disabled={!items.length > 0}
        className='w-full font-semibold text-[14px] leading-[140%] text-[#FAFAFA] text-center h-[48px] bg-[#ea7c69] rounded-[8px] p-[14px] mt-[4rem] drop-shadow'
        onClick={handlePay}
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default Pay;

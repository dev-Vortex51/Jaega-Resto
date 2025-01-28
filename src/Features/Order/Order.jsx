import { useState } from 'react';
import { useOrder } from '../../contexts/OrderContext';

import CartItem from './CartItem';
import Pay from './Pay';

const modes = ['Dine in', 'To go', 'Delivery'];

function Order() {
  const [activeMode, setActiveMode] = useState(0);
  const { orderId, orderItems: items, discount, setPay } = useOrder();

  function handlePay() {
    setPay(true);
  }

  return (
    <section className='area-order bg-[#1F1D2B] h-full overflow-y-auto scrollbar-hidden  p-6'>
      <div>
        <h2 className='w-[132px] h-[28px] text-white font-semibold text-[20px] leading-[140%]'>
          Orders {orderId}
        </h2>
        <div className='flex items-center gap-[12px] mt-8'>
          {modes.map((mode, i) => (
            <div
              className={`${activeMode === i ? 'bg-[#ea7c69] text-[#fff] border-[#ea7c69]' : ''} w-fit h-[34px] px-[10px] py-[12px] text-[#EA7C69] bg-[#1F1D2B] border border-[#393C49] rounded-[8px] flex items-center justify-center hover:bg-[#EA7C69] hover:text-white transition-colors duration-200 cursor-pointer hover:border-[#EA7C69]`}
              key={i}
              onClick={() => setActiveMode(i)}
            >
              <p className='h-[20px] font-semibold text-[14px] leading-[140%]'>{mode}</p>
            </div>
          ))}
        </div>

        {/* Cart HEader */}
        <div className='w-full pb-5 border-b border-[#393C49] flex items-center justify-between mt-8'>
          <div className='w-[297px] flex items-center justify-between'>
            <p className='w-[32px] h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
              Item
            </p>
            <p className='w-[32px] h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
              Qty
            </p>
          </div>
          <p className='w-[32px] h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
            Price
          </p>
        </div>

        {/* Cart Items */}
        <div
          className={`flex flex-col  gap-3 ${items.length > 3 ? 'overflow-y-auto scrollbar-hidden' : ''}`}
        >
          {items?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Dishes ordered total-price - discount */}
        <Pay items={items} handlePay={handlePay} discount={discount} />
      </div>
    </section>
  );
}

export default Order;

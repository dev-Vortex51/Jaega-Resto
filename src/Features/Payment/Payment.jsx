import { HiOutlineTrash } from 'react-icons/hi2';
import { useOrder } from '../../contexts/OrderContext';
import { formatCurrency } from '../../Utils/helper';
import { useState } from 'react';
import CreditCard from './CreditCard';
import Cash from './Cash';
import Paypal from './Paypal';
import { FaPaypal } from 'react-icons/fa';
import { MdOutlineCreditCard, MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';

function Payment() {
  const [method, setMethod] = useState('credit');
  const {
    orderId,
    orderItems: items,
    discount,
    setOrderItems,
    setPay,
    notes,
    setNotes,
  } = useOrder();

  const handleRemoveItem = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item.id === itemId && item.quantity === 1
              ? null
              : item
        )
        .filter((item) => item !== null)
    );
  };

  function handleMethod(method) {
    setMethod(method);
  }

  function handlePlus() {
    setPay(false);
  }

  // function handleAddOrder() {
  //   addItem(items);
  // }

  return (
    <>
      <section className='w-[440px] h-full rounded-tl-3xl rounded-bl-3xl overflow-y-auto scrollbar-hidden bg-[#1F1D2B] border-r-2 border-[#393C49]  p-6'>
        <div>
          <img src='Back.png' className='cursor-pointer' alt='' onClick={handlePlus} />
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-[8px] mt-3'>
              <h1 className='text-[28px] font-semibold text-white w-[163px] h-[39px] leading-[140%] '>
                Confirmation
              </h1>
              <p className='w-[104px] h-[22px] text-[#ABBBC2] font-medium text-[16px] leading-[140%]'>
                Orders {orderId ? `${orderId}` : 'Loading...'}
              </p>
            </div>
            <div className='w-[48px] h-[48px] p-[14px] rounded-[8px] bg-[#ea7c69] cursor-pointer  '>
              <img src='Plus.png' alt='' />
            </div>
          </div>

          <div className='w-full pb-5 border-b border-[#393C49]  mt-8'></div>

          <div className={`flex flex-col  gap-3 `}>
            {items?.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className='w-full pb-5 border-[#393C49] flex flex-col gap-[10px] mt-8'
              >
                <div className='flex justify-between items-center'>
                  <div className='w-[297px] flex items-center justify-between'>
                    <div className='flex items-center gap-[10px]'>
                      <div className='w-[40px] h-[40px]'>
                        <img src={item.image_url} alt='' className='w-full h-full rounded-full' />
                      </div>
                      <div className='flex flex-col gap-[20px]'>
                        <p className='w-[140px] h-[18px] text-white font-medium text-[14px] leading-[130%]'>
                          {item.name}
                        </p>
                        <p className='w-[32px] h-[17px] font-medium text-[12px] leading-[140%] text-[#ABBBC2]'>
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className='w-[48px] h-[48px] text-center bg-[#2D303E] text-white flex items-center justify-center rounded-[8px]'>
                      {item.quantity}
                    </div>
                  </div>
                  <p className='w-[40px] h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
                    {formatCurrency(item.quantity * item.price)}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <input
                    type='text'
                    className='w-[297px] h-[49px] rounded-[8px] py-[14px] pl-[14px] pr-[80px] bg-[#2D303E] text-[#E0E6E9] border-[#393C49] border outline-0 text-[14px] font-[500] leading-[140%]
                    '
                    defaultValue={notes}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <button
                    className='w-[48px] h-[48px] mr-[-10px] p-[14px] flex items-center justify-center border border-[#FF7CA3] rounded-[8px]'
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <p className='text-2xl text-[#FF7CA3]'>
                      <HiOutlineTrash />
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
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
                  items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) + discount
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className='w-[440px]  overflow-y-auto scrollbar-hidden bg-[#1F1D2B]  h-full  z-50 p-6'>
        <div className='flex flex-col gap-[8px] mt-[2.2rem] '>
          <h1 className='text-[28px] font-semibold text-white w-[163px] h-[39px] leading-[140%] '>
            Payment
          </h1>
          <p className=' h-[22px] text-[#ABBBC2] font-medium text-[16px] leading-[140%]'>
            3 payment method available
          </p>
        </div>
        <div className='w-full pb-5 border-b border-[#393C49]  mt-8'></div>
        <h2 className='text-[20px] font-semibold text-white w-[230px] h-[28px] leading-[140%] mt-4 '>
          Payment Method
        </h2>
        <div className='methods-container flex w-[319px] h-[64px] gap-[8px] items-center mt-2 '>
          <div
            className={` ${method === 'credit' ? 'text-white border-white' : 'text-[#ABBBC2] border-[#ABBBC2]'} w-[101px] h-[64px] rounded-[8px] border  flex justify-center items-center flex-col relative cursor-pointer`}
            onClick={() => handleMethod('credit')}
          >
            <p className='text-[24px] '>
              <MdOutlineCreditCard />
            </p>
            <p className=' font-medium text-[14px] leading-[130%] w-fit h-[18px] text-center mt-2 '>
              Credit card
            </p>
            {method === 'credit' && (
              <div className='bg-[#ea7c69] text-[#000000] w-[1.2rem] h-[1.2rem] absolute flex items-center justify-center rounded-full p-2 top-1 right-2'>
                <p className='text-xs text-center'>
                  <GiCheckMark />
                </p>{' '}
              </div>
            )}
          </div>
          <div
            className={` ${method === 'paypal' ? 'text-white border-white' : 'text-[#ABBBC2] border-[#ABBBC2]'} w-[101px] h-[64px] rounded-[8px] border  flex justify-center items-center flex-col relative cursor-pointer`}
            onClick={() => handleMethod('paypal')}
          >
            <p className='text-[24px] '>
              <FaPaypal />
            </p>
            <p className=' font-medium text-[14px] leading-[130%] w-[69px] h-[18px] text-center mt-2'>
              Paypal
            </p>
            {method === 'paypal' && (
              <div className='bg-[#ea7c69] text-[#000000] w-[1.2rem] h-[1.2rem] absolute flex items-center justify-center rounded-full p-2 top-1 right-2'>
                <p className='text-xs text-center'>
                  <GiCheckMark />
                </p>
              </div>
            )}
          </div>
          <div
            className={` ${method === 'cash' ? 'text-white border-white' : 'text-[#ABBBC2] border-[#ABBBC2]'} w-[101px] h-[64px] rounded-[8px] border  flex justify-center items-center flex-col relative cursor-pointer`}
            onClick={() => handleMethod('cash')}
          >
            <p className='text-[24px]'>
              <MdOutlineAccountBalanceWallet />
            </p>
            <p className=' font-medium  text-[14px] leading-[130%] w-[69px] h-[18px] text-center mt-2'>
              Cash
            </p>
            {method === 'cash' && (
              <div className='bg-[#ea7c69] text-[#000000] w-[1.2rem] h-[1.2rem] absolute flex items-center justify-center rounded-full p-2 top-1 right-2'>
                <p className='text-xs text-center'>
                  <GiCheckMark />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='tab-container'>
          {method === 'credit' && <CreditCard />}
          {method === 'paypal' && <Paypal />}
          {method === 'cash' && <Cash />}
        </div>
      </div>
    </>
  );
}

export default Payment;

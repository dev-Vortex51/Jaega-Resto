/* eslint-disable react/prop-types */
import { HiOutlineTrash } from 'react-icons/hi2';
import { formatCurrency } from '../../Utils/helper';
import toast from 'react-hot-toast';
import { useOrder } from '../../contexts/OrderContext';

function CartItem({ item }) {
  const { setOrderItems } = useOrder();

  const handleIncrease = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId) => {
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

  const handleRemoveItem = (itemId) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleNotesChange = (itemId, newNotes) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, notes: newNotes } : item))
    );
  };
  return (
    <div key={item.id} className='w-full pb-5 border-[#393C49] flex flex-col gap-[10px] mt-8'>
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
          <div className='flex items-center gap-2'>
            <button
              className='w-[30px] h-[30px] bg-[#ea7c69] text-white rounded-full flex items-center justify-center'
              onClick={() => handleDecrease(item.id)}
            >
              -
            </button>
            <div className='w-[48px] h-[48px] text-center bg-[#2D303E] text-white flex items-center justify-center rounded-[8px]'>
              {item.quantity}
            </div>
            <button
              className='w-[30px] h-[30px] bg-[#ea7c69] text-white rounded-full flex items-center justify-center'
              onClick={() => handleIncrease(item.id)}
            >
              +
            </button>
          </div>
        </div>
        <p className='w-[40px] h-[22px] text-white font-semibold text-[16px] leading-[140%]'>
          {formatCurrency(item.quantity * item.price)}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <input
          type='text'
          className='w-[297px] h-[49px] rounded-[8px] py-[14px] pl-[14px] pr-[80px] bg-[#2D303E] text-[#E0E6E9] border-[#393C49] border outline-0 text-[14px] font-[500] leading-[140%]'
          placeholder='Order notes...'
          value={item.notes || ''}
          onChange={(e) => handleNotesChange(item.id, e.target.value)}
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
  );
}

export default CartItem;

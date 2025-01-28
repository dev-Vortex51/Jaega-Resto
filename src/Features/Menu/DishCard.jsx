/* eslint-disable react/prop-types */
import toast from 'react-hot-toast';
import { formatCurrency } from '../../Utils/helper';
import { useOrder } from '../../contexts/OrderContext';

export function DishCard({ dish }) {
  const { setOrderItems } = useOrder();

  function handleAddDish(newItem) {
    setOrderItems((prev) => {
      if (dish.availability === 0) {
        toast.info('This dish is not Available');
        return prev;
      }

      const existingItem = prev.find((item) => item.id === newItem.id);

      const updatedOrder = existingItem
        ? prev.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, newItem];
      toast.success(existingItem ? 'Item is already in the cart' : 'Item added to cart');
      return updatedOrder;
    });
  }

  return (
    <div className='bg-[#1F1D2B] relative w-[192px] h-[226px] mt-16 rounded-[16px] flex flex-col items-center text-white'>
      <div className='absolute w-[132px] h-[132px] top-[-2rem]'>
        <img src={dish.image_url} alt={dish.name} className='w-full h-full rounded-full' />
      </div>
      <div className='mt-28 flex flex-col items-center w-[144px] h-[88px] gap-[8px]'>
        <p className='w-full h-[36px] text-center font-medium text-[14px] leading-[130%]'>
          {dish.name}
        </p>
        <p className='w-[37px] h-[20px] text-[14px] font-normal leading-[140%]'>
          {formatCurrency(dish.price)}
        </p>
        <p className='h-[20px] text-[14px] font-normal leading-[140%] text-[#ABBBC2]'>
          {dish.availability} Bowls available
        </p>
      </div>
      {dish.availability > 0 && (
        <button
          onClick={() =>
            handleAddDish({
              id: dish.id,
              name: dish.name,
              price: dish.price,
              image_url: dish.image_url,
              dish_id: dish.id,
              quantity: 1,
            })
          }
          disabled={dish.availability === 0}
          aria-disabled={dish.availability === 0}
          className='mt-2 bg-[#ea7c69] text-white px-4 py-2 rounded-full hover:bg-[#4A4A4A]'
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

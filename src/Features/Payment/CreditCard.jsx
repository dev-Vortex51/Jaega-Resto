import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useUser } from '../Auth/useUser';
import { useOrderItems } from '../../hooks/useOrderItems';
import { useOrder } from '../../contexts/OrderContext';
import { usePay } from '../../hooks/usePay';
import { useUpdateAvailability } from '../../hooks/useUpdateAvailability';
import { useQueryClient } from '@tanstack/react-query';
import { useCustomers } from '../../hooks/useCustomers';
import toast from 'react-hot-toast';
import { AddCustomer } from '../../hooks/useAddCustomer';

const modes = ['Dine in', 'To go', 'Delivery'];

function CreditCard() {
  const [showDrop, setShowDrop] = useState(false);
  const [mode, setMode] = useState('Dine in');
  const { register, handleSubmit, formState } = useForm();
  const { user } = useUser();
  const { errors } = formState;
  const { addItem } = useOrderItems();
  const { payForOrder } = usePay();
  const { orderItems, orderId, discount } = useOrder();
  const { updateDishesAvailable } = useUpdateAvailability();
  const { addCustomer } = AddCustomer();
  const { customers } = useCustomers();

  console.log(customers);
  const subtotal =
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) -
    orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * discount;
  const queryClient = useQueryClient();

  function pay(data) {
    const isAlreadyCustomer = customers?.some(
      (c) => c.customer_name.trim().toLowerCase() === data.cardName.trim().toLowerCase()
    );

    const newOrder = {
      order_number: orderId,
      order_type: mode,
      status: 'Pending',
      discount: discount,
      subtotal: subtotal,
      table_number: data.tableNumber || null,
      user_name: data.cardName,
    };
    const items = orderItems.map((item) => {
      return {
        dish_id: item.dish_id,
        quantity: item.quantity,
        notes: item?.notes,
        subtotal: item.price * item.quantity - item.price * item.quantity * discount,
        user_name: data.cardName,
        name: item.name,
        status: 'Pending',
        image_url: item.image_url,
      };
    });

    const newCustomer = {
      customer_name: data.cardName,
    };

    payForOrder(newOrder);
    addItem(items);
    updateDishesAvailable(items);
    queryClient.invalidateQueries(['dishes']);

    if (isAlreadyCustomer) {
      return;
    } else {
      addCustomer(newCustomer);
      toast.success('Welcome to our community');
    }
  }

  return (
    <form onSubmit={handleSubmit(pay)} className='mt-5 flex flex-col gap-[20px] w-full'>
      <div className='flex flex-col gap-[8px]'>
        <label
          htmlFor='name'
          className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
        >
          Cardholder Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue={user?.user_metadata.username}
          className={`h-[48px] p-[14px] rounded-[8px] border ${
            errors?.cardName ? 'border-[#ea7c69]' : 'border-[#393C49]'
          } bg-[#2D303E] outline-0 text-white`}
          {...register('cardName', { required: 'This field is required' })}
        />
      </div>
      <div className='flex flex-col gap-[8px]'>
        <label
          htmlFor='cardNumber'
          className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
        >
          Card Number
        </label>
        <input
          type='text'
          name='cardNumber'
          id='cardNumber'
          defaultValue='4242 4242 4242 4242'
          className={`h-[48px] p-[14px] rounded-[8px] border ${
            errors?.cardNumber ? 'border-[#ea7c69]' : 'border-[#393C49]'
          } bg-[#2D303E] outline-0 text-white`}
          {...register('cardNumber', { required: 'This field is required' })}
        />
      </div>
      <div className='flex items-center justify-between w-full pb-4 border-b-2 border-[#393c49]'>
        <div className='flex flex-col gap-[8px] w-full'>
          <label
            htmlFor='date'
            className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
          >
            Expiration Date
          </label>
          <input
            type='text'
            name='date'
            id='date'
            defaultValue='02/34'
            className={`h-[48px] p-[14px] w-[172px] rounded-[8px] border ${
              errors?.date ? 'border-[#ea7c69]' : 'border-[#393C49]'
            } bg-[#2D303E] outline-0 text-white`}
            {...register('date', { required: 'This field is required' })}
          />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <label
            htmlFor='cvv'
            className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
          >
            CVV
          </label>
          <input
            type='text'
            name='cvv'
            id='cvv'
            className={`h-[48px] p-[14px] w-[172px] rounded-[8px] border ${
              errors?.cvv ? 'border-[#ea7c69]' : 'border-[#393C49]'
            } bg-[#2D303E] outline-0 text-white text-[16px]`}
            maxLength={3}
            {...register('cvv', {
              required: 'CVV is required',
              pattern: {
                value: /^[0-9]{3}$/,
                message: 'CVV must be exactly 3 digits',
              },
              onChange: (e) => {
                if (!/^\d*$/.test(e.target.value)) {
                  e.target.value = e.target.value.replace(/\D/g, '');
                }
              },
            })}
          />
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-[8px]'>
          <label
            htmlFor='type'
            className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
          >
            Order Type
          </label>
          <div className='relative dropdown'>
            <div
              className='w-[172px] h-[48px] p-[14px] border border-[#393C49] cursor-pointer bg-[#1F1D2B] rounded-[8px] flex items-center gap-[10px] text-white'
              onClick={() => setShowDrop((prev) => !prev)}
            >
              <img src='Arrow.png' alt='' />
              <p className='font-medium text-[14px] leading-[130%]'>{mode}</p>
            </div>
            {showDrop && (
              <div className='w-[172px] border border-[#393C49] absolute z-50 top-14 p-[14px] bg-[#1F1D2B] rounded-[8px] flex flex-col gap-4 text-white'>
                <ul className='flex flex-col gap-4 cursor-pointer'>
                  {modes.map((mode, i) => (
                    <li
                      onClick={() => {
                        setShowDrop(false);
                        setMode(mode);
                      }}
                      key={i}
                    >
                      {mode}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {mode === 'Dine in' && (
          <div className='flex flex-col gap-[8px] w-[172px]'>
            <label
              htmlFor='tableNumber'
              className='text-white font-medium text-[14px] h-[18px] leading-[130%]'
            >
              Table Number
            </label>
            <input
              type='text'
              name='tableNumber'
              id='tableNumber'
              className={`h-[48px] p-[14px] rounded-[8px] border ${
                errors?.tableNumber ? 'border-[#ea7c69]' : 'border-[#393C49]'
              } bg-[#2D303E] outline-0 text-white`}
              {...register('tableNumber', { required: 'This field is required' })}
            />
          </div>
        )}
      </div>
      <div className='flex items-center justify-between mt-[50px]'>
        <button
          className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
          type='reset'
        >
          Cancel
        </button>
        <button className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#FAFAFA] text-center p-[14px] bg-[#ea7c69] drop-shadow h-[48px] rounded-[8px]'>
          Confirm Payment
        </button>
      </div>
    </form>
  );
}

export default CreditCard;

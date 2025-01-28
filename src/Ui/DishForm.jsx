/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaCamera, FaEdit, FaPlus } from 'react-icons/fa';
import { useDishMutation } from '../hooks/useDishMutation';
import { useOrder } from '../contexts/OrderContext';

const DishForm = ({ dish }) => {
  const { setIsEdit, setAddDish } = useOrder();
  const [imagePreview, setImagePreview] = useState('');
  const { addDish, editDish } = useDishMutation();
  const { id: editId, ...editValues } = dish || {};
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (dish) {
      setImagePreview(dish.image_url || '');
      reset(editValues);
    } else {
      reset();
      setImagePreview('');
    }
  }, [dish, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image_url', file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const onSubmit = (data) => {
    if (!data.image_url && !dish) {
      alert('Please upload an image for the dish');
      return;
    }
    const image =
      typeof data.image_url === 'string'
        ? data.image_url
        : data.image_url?.name
          ? data.image_url
          : data.image_url?.[0];

    if (!isEditSession) {
      addDish({ ...data, image_url: image });
    } else {
      editDish({ newDish: { ...data, image_url: image }, id: editId });
    }

    setIsEdit(false);
    setAddDish(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[197px] h-[399px] rounded-[8px] border border-[#393C49] grid grid-rows-[1fr_auto] justify-center'
    >
      <div className='w-[80%] flex flex-col items-center mx-auto mt-3 text-center gap-3'>
        <div className='w-[127px] h-[127px] rounded-full border border-[#393C49] relative flex items-center justify-center'>
          <p
            className='text-[#ea7c69] text-3xl absolute flex items-center justify-center cursor-pointer'
            onClick={triggerFileInput}
          >
            {imagePreview === '' ? <FaCamera /> : <FaEdit />}
          </p>
          <input type='file' id='fileInput' className='hidden' onChange={handleFileChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              className='w-full h-full rounded-full object-cover'
              alt='Dish Preview'
            />
          )}
          {!imagePreview && !isEditSession && (
            <span className='text-red-500 text-sm'>Dish image is required</span>
          )}
        </div>

        <div className='flex flex-col gap-5 items-center justify-center'>
          <input
            type='text'
            placeholder='Dish Name'
            className={`w-[95%] rounded-[8px] p-[1px] bg-transparent border text-white ${
              errors.name ? 'border-[#ea7c69]' : 'border-[#393c49]'
            } outline-0`}
            {...register('name', { required: 'Dish name is required' })}
          />
          {/* Price and Availability */}
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Price'
              className={`w-[45%] rounded-[8px] p-[1px] bg-transparent border ${
                errors.price ? 'border-[#ea7c69]' : 'border-[#393c49]'
              } outline-0`}
              {...register('price', {
                required: 'Price is required',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: 'Invalid price format, e.g., 9.99',
                },
              })}
            />
            <input
              type='text'
              placeholder='Availability'
              className={`w-[45%] rounded-[8px] p-[1px] bg-transparent border ${
                errors.availability ? 'border-[#ea7c69]' : 'border-[#393c49]'
              } outline-0`}
              {...register('availability', {
                required: 'Availability is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Invalid availability, only numbers allowed',
                },
              })}
            />
          </div>
          {/* Other Inputs */}
          <input
            type='text'
            placeholder='Category ID'
            className={`w-[95%] rounded-[8px] p-[1px] bg-transparent border text-white ${
              errors.category_id ? 'border-[#ea7c69]' : 'border-[#393c49]'
            } outline-0`}
            {...register('category_id', {
              required: 'Category ID is required',
              min: 1,
            })}
          />
          <input
            type='text'
            placeholder='Dish Description'
            className={`w-[95%] rounded-[8px] p-[1px] bg-transparent border text-white ${
              errors.description ? 'border-[#ea7c69]' : 'border-[#393c49]'
            } outline-0`}
            {...register('description', { required: 'Description is required' })}
          />
        </div>
      </div>

      <button
        type='submit'
        className='bg-[#ea7c69]/20 w-full h-[52px] text-center outline-0 flex items-center justify-center cursor-pointer rounded-b-[8px]'
      >
        {!isEditSession ? (
          <p className='flex items-center justify-center text-[#ea7c69] gap-4'>
            <FaPlus /> Add Dish
          </p>
        ) : (
          <p className='flex items-center justify-center text-[#ea7c69] gap-4'>
            <FaEdit /> Edit Dish
          </p>
        )}
      </button>
    </form>
  );
};

export default DishForm;

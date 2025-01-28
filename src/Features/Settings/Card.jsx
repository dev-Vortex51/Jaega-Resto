/* eslint-disable react/prop-types */
import { useOrder } from '../../contexts/OrderContext';
import { useDeleteDish } from '../../hooks/useDeleteDish';
import DishForm from '../../Ui/DishForm';
import { formatCurrency } from '../../Utils/helper';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Card({ dish }) {
  const { isEdit, setIsEdit, editingDishId, setEditingDishId, addDish } = useOrder();
  const { deleteDishById } = useDeleteDish();
  const handleEditClick = () => {
    setIsEdit(true);
    setEditingDishId(dish.id);
  };

  function handleDeleteDish(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteDishById(id);
    }
  }

  return (
    <>
      {isEdit && editingDishId === dish.id && !addDish ? (
        <DishForm dish={dish} />
      ) : (
        <div
          key={dish.id}
          className='w-[197px] h-[299px] rounded-[8px] border border-[#393C49] grid grid-rows-[1fr_auto] relative'
        >
          <div className='w-[80%] flex flex-col items-center mx-auto mt-3 text-center gap-3'>
            <div className='w-[127px] h-[127px]'>
              <img src={dish.image_url} alt='' className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col gap-5 items-center'>
              <h2 className='text-white font-medium text-[14px] leading-[130%]'>
                {dish.name.length > 17 ? `${dish.name.slice(0, 17)}...` : dish.name}
              </h2>
              <div className='flex gap-2 text-[#ABBBC2] text-[14px] font-normal leading-[140%]'>
                <h3>{formatCurrency(dish.price)}</h3>
                <span className='text-white font-extrabold text-2xl translate-y-[-1rem]'>.</span>
                <h3>{dish.availability} Bowls</h3>
              </div>
            </div>
          </div>
          <div className='absolute bg-[#ea7c69]/20 text-white p-3 rounded-full left-1 cursor-pointer hover:bg-white hover:text-[#ea7c69] transition-colors duration-200 top-1' onClick={()=> handleDeleteDish(dish.id)}>
            <p>
              <FaTrash />
            </p>
          </div>
          <div
            className='bg-[#ea7c69]/20 w-full h-[52px] text-center flex items-center justify-center cursor-pointer rounded-b-[8px]'
            onClick={handleEditClick}
          >
            <p className='flex items-center justify-center text-[#ea7c69] gap-4'>
              <FaEdit />
              Edit Dish
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

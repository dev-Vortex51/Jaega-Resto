/* eslint-disable react/prop-types */

import Card from './Card';
import { useOrder } from '../../contexts/OrderContext';
import DishForm from '../../Ui/DishForm';
import { FaPlus } from 'react-icons/fa';

function Main({ filterBy }) {
  const { addDish, setAddDish } = useOrder();

  return (
    <main className='w-full h-[300px] px-8 mt-4 flex gap-[10px] items-center flex-wrap overflow-y-auto scrollbar-hidden'>
      {!addDish ? (
        <div
          className='w-[197px] h-[299px] rounded-[8px] border border-dashed border-[#ea7c69] flex flex-col gap-5 cursor-pointer items-center justify-center text-[#ea7c69] '
          onClick={() => setAddDish(true)}
        >
          <FaPlus />
          <p>Add new Dish</p>
        </div>
      ) : (
        <DishForm />
      )}
      {filterBy?.map((dish) => (
        <Card key={dish.id} dish={dish} />
      ))}
    </main>
  );
}

export default Main;

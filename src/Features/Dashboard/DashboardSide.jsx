import { FaChevronDown } from 'react-icons/fa';
import CustomFilter from '../../Ui/CustomFilter';
import PieComponent from './PieComponent';
import { useState } from 'react';
import { useOrderList } from '../../hooks/useOrder';
import { findMostOrderedDishes } from '../../Utils/helper';
import MostOrdered from './MostOrdered';

const days = ['Today', 'Last Week', 'Last Month'];

function DashboardSide() {
  const [showBy, setShowBy] = useState(3);

  const [byDays, setByDays] = useState('Today');
  const [isFilteredByDay, setIsFilteredByDay] = useState(false);
  const { data: orderItems } = useOrderList();

  const mostOrderedDishes = findMostOrderedDishes(orderItems);

  return (
    <div className=' w-[450px] flex flex-col gap-[32px]'>
      <div className='w-[450px] h-[429px] p-[24px] rounded-[8px] bg-[#1F1D2B]  '>
        {/* Filter */}
        <div className='filter w-full flex items-center justify-between pb-6 border-b-2 border-[#393C49]'>
          <h2 className=' h-[39px] font-semibold text-[20px] leading-[140%] text-white  '>
            Most Ordered
          </h2>

          <CustomFilter
            content={days}
            filter={byDays}
            func={setIsFilteredByDay}
            funcContent={setByDays}
            icon={<FaChevronDown />}
            width={135}
            isOpen={isFilteredByDay}
            bg={'#1F1D2B'}
            border={true}
          />
        </div>
        <div className='max-h-[250px]  overflow-y-auto scrollbar-hidden mb-5'>
          {mostOrderedDishes?.slice(0, showBy).map((dish) => (
            <MostOrdered key={dish.dish_id} dish={dish} />
          ))}
        </div>
        {showBy === 3 ? (
          <button
            className='w-full font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
            onClick={() => setShowBy(mostOrderedDishes.length)}
          >
            Show more
          </button>
        ) : (
          <button
            className='w-full font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
            onClick={() => setShowBy(3)}
          >
            Show less
          </button>
        )}
      </div>

      {/* Pie Component */}
      <PieComponent byDays={byDays} />
    </div>
  );
}

export default DashboardSide;

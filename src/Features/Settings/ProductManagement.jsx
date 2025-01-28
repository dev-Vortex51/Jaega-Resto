import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { useDishes } from '../../hooks/useDishes';

import Main from './Main';
import Category from '../../Ui/Category';
import CustomFilter from '../../Ui/CustomFilter';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { useOrder } from '../../contexts/OrderContext';

const categoriesOptions = ['Add Category', 'Delete Category'];
function ProductManagement() {
  const { categories } = useCategories();
  const { dishes } = useDishes();

  const [activeCategory, setActiveCategory] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState('Manage Categories');
  const { isEdit, setIsEdit, addDish, setAddDish } = useOrder();
  let filterBy;

  if (activeCategory) {
    filterBy = dishes?.filter((dish) => dish.category_id === activeCategory);
  }

  return (
    <div className='w-full '>
      <div className='manage flex items-center justify-between px-8'>
        <h2 className=' font-semibold text-[20px] leading-[140%] text-white'>Project Management</h2>
        <CustomFilter
          content={categoriesOptions}
          filter={filter}
          func={setIsFilter}
          funcContent={setFilter}
          icon={<HiAdjustmentsHorizontal />}
          width={220}
          isOpen={isFilter}
          bg={'#1f1d2b'}
          border={true}
        />
      </div>
      <div className='mt-8 flex items-center gap-4 w-full pr-[7rem] px-8 border-b-2 border-[#393C49]'>
        {categories?.map((category) => (
          <Category
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            onKeyDown={(e) => e.key === 'Enter' && setActiveCategory(category.id)}
            category={category}
            activeCategory={activeCategory}
          />
        ))}
      </div>
      <Main filterBy={filterBy} />
      {(isEdit || addDish) && (
        <div className='flex items-center gap-5 mt-5  px-8'>
          <button
            className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#ea7c69] text-center p-[14px] border-2 border-[#ea7c69] h-[48px] rounded-[8px]'
            onClick={() => {
              setIsEdit(false);
              setAddDish(false);
            }}
          >
            Discard Changes
          </button>
          <button className='w-[172px] font-semibold text-[14px] leading-[140%] text-[#FAFAFA] text-center p-[14px] bg-[#ea7c69] drop-shadow h-[48px] rounded-[8px]'>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;

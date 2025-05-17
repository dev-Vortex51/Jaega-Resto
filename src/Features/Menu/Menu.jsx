import { formatDate } from '../../Utils/helper';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';
import CustomFilter from '../../Ui/CustomFilter';
import { Loader } from 'rsuite';
import { DishCard } from './DishCard';
import Category from '../../Ui/Category';
import { useOrder } from '../../contexts/OrderContext';
import { useDishes } from '../../hooks/useDishes';
import { FaChevronDown } from 'react-icons/fa';
const modes = ['Dine in', 'To go', 'Delivery'];

function Menu() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [showDrop, setShowDrop] = useState(false);
  const [mode, setMode] = useState('Dine in');
  const [query, setQuery] = useState('');
  const { orderItems } = useOrder();
  const { categories } = useCategories();
  const { dishes, isPending, isError } = useDishes();
  const filteredDish = useMemo(() => {
    return dishes?.filter(
      (dish) =>
        dish.category_id === activeCategory && dish.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [dishes, activeCategory, query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useRef(
    debounce((value) => {
      setQuery(value);
    }, 300)
  ).current;

  return (
    <div className='w-[90%] mx-auto'>
      <div className='flex justify-between items-center'>
        <h1 className='h-[39px] font-semibold text-4xl leading-[140%] text-white'>Jaegar Resto</h1>
        <div className='w-[220px] rounded-[8px] h-[48px] translate-y-10 flex items-center gap-[8px] p-[14px] bg-[#393C49]'>
          <img src='search.png' alt='Search icon' />

          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search for food, coffee etc...'
            className='font-medium text-[14px] w-full leading-[140%] text-[#ABBBC2] bg-inherit border-0 outline-0'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <p className='font-medium text-xl text-[#E0E6E9] leading-[140%] mt-8'>
        {formatDate(new Date())}
      </p>

      <div className='mt-8 flex items-center justify-between w-[660px] pr-[7rem] border-b-2 border-[#393C49]'>
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

      <div className='w-full flex items-center justify-between mt-6'>
        <h2 className='font-semibold text-[20px] w-[150px] h-[28px] leading-[140%] text-white'>
          Choose Dishes
        </h2>

        <CustomFilter
          content={modes}
          filter={mode}
          func={setShowDrop}
          isOpen={showDrop}
          width={120}
          funcContent={setMode}
          icon={<FaChevronDown />}
          bg={'#1F1D2B'}
        />
      </div>
      {isPending && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Loader
            size='lg'
            style={{
              borderColor: '#ea7c69',
              animationDuration: '1s',
            }}
          />
        </div>
      )}

      <div
        className={` ${orderItems.length > 0 ? 'flex w-full items-center  gap-20 flex-wrap mt-10' : 'flex w-full items-center  justify-between flex-wrap mt-10'}  `}
      >
        {isError && <div>Failed to fetch dishes.</div>}
        {filteredDish?.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default Menu;

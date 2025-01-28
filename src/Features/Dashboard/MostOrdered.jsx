/* eslint-disable react/prop-types */
function MostOrdered({ dish }) {
  return (
    <div key={dish.dish_id} className='w-full flex items-start gap-[6px] mt-9 text-white '>
      <div className='w-[54px] h-[54px] '>
        <img src={dish.image_url} alt='' className='w-full h-full rounded-full' />
      </div>
      <div>
        <h2 className='font-medium text-[14px] leading-[130%]  '>{dish.name}</h2>
        <p className='mt-1 text-[#ABBBC2] font-normal text-[12px] leading-[140%]'>
          {dish.totalOrdered} Dishes ordered
        </p>
      </div>
    </div>
  );
}

export default MostOrdered;

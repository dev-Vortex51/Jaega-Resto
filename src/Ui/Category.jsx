/* eslint-disable react/prop-types */
function Category({ category, onClick, activeCategory, onKeyDown }) {
  return (
    <div
      className={`relative pb-4 text-[20px] font-semibold cursor-pointer hover:text-[#ea7c69] transition-colors ${
        activeCategory === category.id ? 'text-[#ea7c69]' : 'text-white'
      }`}
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {category.name}
      {activeCategory === category.id && (
        <span className='absolute left-0 bottom-0 w-1/2 h-[4px] bg-[#ea7c69] rounded-md'></span>
      )}
    </div>
  );
}

export default Category;

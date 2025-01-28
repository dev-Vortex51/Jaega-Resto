/* eslint-disable react/prop-types */
function CustomFilter({ content, filter, func, funcContent, icon, width, isOpen, bg, border }) {
  // border border-[#393C49]
  if (border)
    return (
      <div className='relative dropdown'>
        <div
          className={` w-[${width}px] h-[48px] p-[14px] cursor-pointer bg-[${bg}] rounded-[8px] flex items-center gap-[10px] text-white border border-[#393C49] `}
          onClick={() => func((prev) => !prev)}
        >
          {icon}
          <p className='font-medium text-[14px] leading-[130%]'>{filter}</p>
        </div>
        {isOpen && (
          <div className='w-full border border-[#393C49]  absolute z-50 top-14 p-[14px] bg-[#1F1D2B] rounded-[8px] flex flex-col gap-4 text-white'>
            <ul className='flex flex-col gap-4 cursor-pointer'>
              {content.map((mode, i) => (
                <li
                  onClick={() => {
                    func(false);
                    funcContent(mode);
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
    );

  return (
    <div className='relative dropdown'>
      <div
        className={` w-[${width}px] h-[48px] p-[14px] cursor-pointer bg-[${bg}] rounded-[8px] flex items-center gap-[10px] text-white`}
        onClick={() => func((prev) => !prev)}
      >
        {icon}
        <p className='font-medium text-[14px] leading-[130%]'>{filter}</p>
      </div>
      {isOpen && (
        <div className='w-full absolute z-50 top-14 p-[14px] bg-[#1F1D2B] rounded-[8px] flex flex-col gap-4 text-white'>
          <ul className='flex flex-col gap-4 cursor-pointer'>
            {content.map((mode, i) => (
              <li
                onClick={() => {
                  func(false);
                  funcContent(mode);
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
  );
}

export default CustomFilter;

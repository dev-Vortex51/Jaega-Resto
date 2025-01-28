/* eslint-disable react/prop-types */
function Metrics({ icon, num, text, children }) {
  return (
    <div className='w-[199px] h-[143px] p-[16px] rounded-[8px] bg-[#1F1D2B] '>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-[10px] items-center'>
          <div className='w-[38px] h-[38px] p-[7px] rounded-[8px] bg-[#252836] flex items-center justify-center '>
            {icon}
          </div>
          <div className='flex items-center gap-[8px]'>{children}</div>
        </div>
        <h1 className='w-[135px] h-[39px] font-semibold text-[28px] leading-[140%] text-white  '>
          {num}
        </h1>
        <p className=' text-[#ABBBC2] font-medium text-[14px] leading-[130%]'>{text}</p>
      </div>
    </div>
  );
}

export default Metrics;

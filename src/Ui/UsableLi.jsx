/* eslint-disable react/prop-types */
import { NavLink, useLocation } from 'react-router-dom';

function UsableLi({ to, icon, text, desc }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <li
      className={` w-full h-[87px]
           p-[24px] cursor-pointer hover:bg-[#EA7C69]/20 hover:text-[#ea7c69] ${path === to && 'bg-[#ea7c69]/20'} relative`}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? 'text-[#ea7c69]  bg-[#EA7C69]/20' : 'text-white  '
        }
      >
        <p className='flex gap-2 items-center '>
          {icon}
          <span className='text-[14px] font-medium leading-[130%] '>{text}</span>
        </p>
        <p className='text-[12px] font-normal leading-[140%] text-[#ABBBC2] ml-[1.5rem] mt-1'>
          {desc}
        </p>
      </NavLink>
      {path === to && (
        <div className='bg-[#ea7c69] w-[6px] h-[3rem] absolute right-0 top-[20%] rounded-md'></div>
      )}
    </li>
  );
}

export default UsableLi;

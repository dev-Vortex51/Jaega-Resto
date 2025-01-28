/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import { logout } from '../Features/Auth/useAuth';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { FaUser, FaEnvelope, FaBell, FaCog, FaSignOutAlt, FaDoorOpen } from 'react-icons/fa';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      toast.success('User logged out successfully');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error('Error logging out');
    }
  }
  return (
    <aside className='area-sidebar bg-[#000000] h- flex flex-col items-center pt-5'>
      <div>
        <img src='/public/Logo.png' alt='' />
      </div>
      <nav className='mt-10'>
        <ul className='flex flex-col gap-8'>
          <li>
            <NavLink
              to='/menu'
              className={({ isActive }) =>
                isActive
                  ? 'text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 bg-[#ea7c69] text-white flex items-center justify-center'
                  : 'text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200 '
              }
            >
              <span>
                <RiHome2Line />
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to='/dashboard'
              className={({ isActive }) =>
                isActive
                  ? 'text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 bg-[#ea7c69] text-white flex items-center justify-center'
                  : 'text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200 '
              }
            >
              <span>
                <FaUser />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/inbox'
              className={({ isActive }) =>
                isActive
                  ? 'text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 bg-[#ea7c69] text-white flex items-center justify-center'
                  : 'text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200 '
              }
            >
              <span>
                <FaEnvelope />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/notifications'
              className={({ isActive }) =>
                isActive
                  ? 'text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 bg-[#ea7c69] text-white flex items-center justify-center'
                  : 'text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200 '
              }
            >
              <span>
                <FaBell />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/settings'
              className={({ isActive }) =>
                isActive
                  ? 'text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 bg-[#ea7c69] text-white flex items-center justify-center'
                  : 'text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200 '
              }
            >
              <span>
                <FaCog />
              </span>
            </NavLink>
          </li>
          <li
            className='text-[#EA7C69] text-2xl w-[24px] h-[24px] py-7 rounded-lg cursor-pointer px-7 hover:bg-[#ea7c69] hover:text-white flex items-center justify-center transition-all duration-200'
            onClick={handleLogout}
          >
            <span>
              <HiArrowRightOnRectangle />
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

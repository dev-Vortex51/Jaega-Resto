import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaBell, FaHeart } from 'react-icons/fa';
import { MdOutlineDashboardCustomize, MdOutlineRestaurantMenu, MdSecurity } from 'react-icons/md';
import UsableLi from '../../Ui/UsableLi';

function SettingsNav() {
  return (
    <aside className='h-fit bg-[#1F1D2B] flex justify-center rounded-[8px] '>
      <nav className='w-full  mx-auto '>
        <ul className='flex flex-col gap-5 text-white'>
          <UsableLi
            to='/settings/appearance'
            icon={<FaHeart />}
            text='Appearance'
            desc=' Dark and Light mode, Font size'
          />

          <UsableLi
            to='/settings/your-restaurant'
            icon={<MdOutlineRestaurantMenu />}
            text='Your Restaurant'
            desc=' Dark and Light mode, Font size'
          />

          <UsableLi
            to='/settings/product-management'
            icon={<MdOutlineDashboardCustomize />}
            text='Product Management'
            desc='Manage your product, pricing etc'
          />

          <UsableLi
            to='/settings/notifications'
            icon={<FaBell />}
            text='Notifications'
            desc='Customize your notifications'
          />

          <UsableLi
            to='/settings/security'
            icon={<MdSecurity />}
            text='Security'
            desc='Configure Password, PIN etc'
          />

          <UsableLi
            to='/settings/about-us'
            icon={<AiOutlineInfoCircle />}
            text='About Us'
            desc=' Find out more about Posly'
          />
        </ul>
      </nav>
    </aside>
  );
}

export default SettingsNav;

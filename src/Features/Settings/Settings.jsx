import { Outlet } from 'react-router-dom';
import SettingsNav from './SettingsNav';

export default function Settings() {
  return (
    <div className='w-[95%] max-auto flex flex-col gap-10'>
      <h1 className='h-[39px] font-semibold text-4xl leading-[140%] text-white'>Settings</h1>
      <div className='grid grid-cols-[275px_1fr] gap-10'>
        <SettingsNav />
        <main className='bg-[#1F1D2B] rounded-[8px]  py-16'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

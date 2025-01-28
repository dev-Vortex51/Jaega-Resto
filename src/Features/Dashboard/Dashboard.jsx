import DashboardSide from './DashboardSide';
import DashboardRight from './DashboardRight';

import { formatDate } from '../../Utils/helper';

function Dashboard() {
  return (
    <>
      <div className='dashboard w-full flex justify-between py-3 px-10'>
        <div className=' w-[700px]'>
          <div className='flex flex-col gap-[10px] pb-5 border-b-2 border-[#393C49] w-full'>
            <h1 className='h-[39px] font-semibold text-4xl leading-[140%] text-white'>Dashboard</h1>
            <p className='font-medium text-xl text-[#E0E6E9] leading-[140%] '>
              {formatDate(new Date())}
            </p>
          </div>
          <DashboardRight />
        </div>
        <DashboardSide />
      </div>
    </>
  );
}

export default Dashboard;

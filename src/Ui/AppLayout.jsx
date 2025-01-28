import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Order from '../Features/Order/Order';
import { useOrder } from '../contexts/OrderContext';
import Payment from '../Features/Payment/Payment';

export default function AppLayout() {
  const { orderItems, pay } = useOrder();
  const isOrdering = orderItems.length > 0;

  return (
    <div className='w-screen h-screen relative'>
      {pay &&
        (isOrdering ? (
          <div className='fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-end transition-opacity duration-100'>
            <Payment />
          </div>
        ) : null)}

      <div
        className={`grid relative z-[1] ${
          isOrdering ? 'grid-cols-[104px_1fr_440px]' : 'grid-cols-[104px_1fr]'
        } grid-areas-layout grid-rows-[auto_1fr] h-screen`}
      >
        <Sidebar />
        <main className='area-main pt-4 pb-10 overflow-y-auto scrollbar-hidden bg-[#2D303E] flex justify-center '>
          <Outlet />
        </main>
        {isOrdering && !pay && <Order />}
      </div>
    </div>
  );
}

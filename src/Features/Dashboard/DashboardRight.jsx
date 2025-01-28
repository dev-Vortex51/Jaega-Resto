import { FaArrowDown, FaArrowUp, FaBookmark, FaUsers } from 'react-icons/fa';
import CustomFilter from '../../Ui/CustomFilter';
import Metrics from './Metrics';
import Table from './Table';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import Dollar from '../../Ui/Dollar';
import { formatCurrency } from '../../Utils/helper';
import { useState } from 'react';
import { useOrderRevenue } from '../../hooks/useOrder';
import { useCustomers } from '../../hooks/useCustomers';

const filterBy = ['Completed', 'Preparing', 'Pending'];
function DashboardRight() {
  const [showDrop, setShowDrop] = useState(false);
  const [filter, setFilter] = useState('Filter Order');

  const { data: orders } = useOrderRevenue();
  const totalRevenue = Number(orders?.reduce((acc, order) => acc + order.subtotal, 0));
  const { customers } = useCustomers();
  const totalCustomers = customers?.length;
  return (
    <div className='flex flex-col gap-[2rem]'>
      <div className='flex items-center justify-between w-full mt-[25px]'>
        <Metrics icon={<Dollar />} num={formatCurrency(totalRevenue || 0)} text={'Total Revenue'}>
          <span className=' font-medium text-[12px] leading-[140%] text-[#50D1AA] w-[46px] h-[17px]'>
            +32.40%
          </span>
          <div className='w-[14px] h-[14px] bg-[#50d1aa]/30 flex items-center justify-center text-xs rounded-full text-[#50d1aa] p-[10px]'>
            <p>
              <FaArrowUp />
            </p>
          </div>
        </Metrics>

        <Metrics
          icon={
            <p className='text-sm text-[#ea7c69]'>
              <FaBookmark />
            </p>
          }
          num={orders?.length || 0}
          text={' Total Dish Ordered'}
        >
          <span className=' font-medium text-[12px] leading-[140%] text-[#FF7CA3] w-[46px] h-[17px]'>
            +12.40%
          </span>
          <div className='w-[14px] h-[14px] bg-[#FF7CA3]/30 flex items-center justify-center text-xs rounded-full text-[#FF7CA3] p-[10px]'>
            <p>
              <FaArrowDown />
            </p>
          </div>
        </Metrics>

        <Metrics
          icon={
            <p className='text-xl text-[#65B0F6]'>
              <FaUsers />
            </p>
          }
          num={totalCustomers || 0}
          text={'Total Customer'}
        >
          <span className=' font-medium text-[12px] leading-[140%] text-[#50D1AA] w-[46px] h-[17px]'>
            +32.40%
          </span>
          <div className='w-[14px] h-[14px] bg-[#50d1aa]/30 flex items-center justify-center text-xs rounded-full text-[#50d1aa] p-[10px]'>
            <p>
              <FaArrowUp />
            </p>
          </div>
        </Metrics>
      </div>
      <div className='w-full max-h-[600px] rounded-[8px] bg-[#1F1D2B] py-[20px]  flex flex-col items-center'>
        <div className='filter w-[90%] flex items-center justify-between'>
          <h1 className=' h-[39px] font-semibold text-[28px] leading-[140%] text-white  '>
            Order Report
          </h1>
          <CustomFilter
            content={filterBy}
            filter={filter}
            func={setShowDrop}
            funcContent={setFilter}
            icon={<HiAdjustmentsHorizontal />}
            width={135}
            isOpen={showDrop}
            bg={'#1F1D2B'}
            border={true}
          />
        </div>
        <Table filter={filter} />
      </div>
    </div>
  );
}

export default DashboardRight;

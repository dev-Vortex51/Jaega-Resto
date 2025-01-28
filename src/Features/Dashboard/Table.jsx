/* eslint-disable react/prop-types */
import { useOrderList } from '../../hooks/useOrder';
import FilteredOrders from './FilteredOrders';

function sortOrderItemsByStatus(orderItems) {
  const statusPriority = {
    Pending: 1,
    Preparing: 2,
    Completed: 3,
  };

  return orderItems?.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
}

function Table({ filter }) {
  const { data: orderItems } = useOrderList();
  const sorted = sortOrderItemsByStatus(orderItems);
  let filteredOrder;

  if (filter === 'Pending') {
    filteredOrder = sorted?.filter((order) => order.status === 'Pending');
  } else if (filter === 'Preparing') {
    filteredOrder = sorted?.filter((order) => order.status === 'Preparing');
  } else if (filter === 'Completed') {
    filteredOrder = sorted?.filter((order) => order.status === 'Completed');
  } else {
    filteredOrder = sorted;
  }
  return (
    <>
      {/* table */}
      <div className='table_header grid grid-cols-4 mt-10 text-white pb-4 border-b border-[#393C49] w-full pl-[2rem]'>
        <p className='font-semibold  text-[14px] leading-[140%] w-fit h-[20px] '>Name</p>
        <p className='font-semibold  text-[14px] leading-[140%] w-fit h-[20px] '>Menu</p>
        <p className='font-semibold  text-[14px] leading-[140%] w-fit  h-[20px] '>Total Payment</p>
        <p className='font-semibold  text-[14px] leading-[140%] w-fit h-[20px] '>Status</p>
      </div>

      {/* Table data */}
      <div className={' overflow-y-auto scrollbar-hidden'}>
        {filteredOrder?.length > 0 ? (
          filteredOrder?.map((d) => <FilteredOrders d={d} key={d.unique_id} />)
        ) : (
          <p className='text-white font-semibold mt-10 font-lg'>No {filter} order in the queue</p>
        )}
      </div>
    </>
  );
}

export default Table;

/* eslint-disable react/prop-types */
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import CustomFilter from '../../Ui/CustomFilter';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useOrdersByDays } from '../../hooks/useOrdersByDays';

const days = ['Today', 'Last Week', 'Last Month'];
function PieComponent({ byDays }) {
  const [byDaysPie, setByDaysPie] = useState('Today');
  const [isFilteredByDaysPie, setIsFilteredByDaysPie] = useState(false);

  const { data: ordersByDay = [] } = useOrdersByDays(byDays);
  return (
    <div className="w-[450px] h-[436px] p-[24px] rounded-[8px] bg-[#1F1D2B]">
      <div className="flex items-center justify-between">
        <h2 className="h-[39px] font-semibold text-[20px] leading-[140%] text-white">
          Most Ordered Type
        </h2>
        <CustomFilter
          content={days}
          filter={byDaysPie}
          func={setIsFilteredByDaysPie}
          funcContent={setByDaysPie}
          icon={<FaChevronDown />}
          width={135}
          isOpen={isFilteredByDaysPie}
          bg={'#1F1D2B'}
          border={true}
        />
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart isAnimationActive={true} animationDuration={1000} animationEasing="ease-out">
          <Pie
            data={ordersByDay}
            nameKey="orderType"
            dataKey="value"
            cx="35%" 
            cy="50%" 
            outerRadius={90} 
            innerRadius={40}
            paddingAngle={2} 
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out" // Easing function for animation
          >
            {ordersByDay?.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.orderType} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            width={120} 
            wrapperStyle={{ paddingLeft: 10 }} 
          />
          <RechartsTooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieComponent;

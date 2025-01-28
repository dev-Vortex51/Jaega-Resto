/* eslint-disable no-case-declarations */
export function formatDate(date) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const dateFormatted = new Intl.DateTimeFormat('en-GB', options).format(date);

  const [weekday, day, month, year] = dateFormatted.split(' ');

  return `${weekday} , ${day} ${month} ${year}`;
}

export function formatCurrency(value) {
  const currency = new Intl.NumberFormat('en-Us', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
  return currency;
}

export function findMostOrderedDishes(orders) {
  if (!Array.isArray(orders)) {
    console.error("The 'orders' parameter is not an array or is undefined.");
    return [];
  }

  const dishCountMap = {};

  for (const order of orders) {
    const { dish_id, quantity, created_at, image_url, name } = order;

    if (dishCountMap[dish_id]) {
      dishCountMap[dish_id].totalOrdered += quantity;
      dishCountMap[dish_id].dates.push(created_at);
    } else {
      dishCountMap[dish_id] = {
        dish_id,
        totalOrdered: quantity,
        dates: [created_at],
        image_url,
        name,
      };
    }
  }

  const sortedDishes = Object.values(dishCountMap).sort((a, b) => b.totalOrdered - a.totalOrdered);

  return sortedDishes;
}

export function getDateRange(filter) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filter) {
    case 'Today':
      return {
        start: todayStart.toISOString(),
        end: now.toISOString(),
      };
    case 'Last Week':
      const weekStart = new Date(todayStart);
      weekStart.setDate(todayStart.getDate() - 7);
      return {
        start: weekStart.toISOString(),
        end: todayStart.toISOString(),
      };
    case 'Last Month':
      const monthStart = new Date(todayStart);
      monthStart.setMonth(todayStart.getMonth() - 1);
      return {
        start: monthStart.toISOString(),
        end: todayStart.toISOString(),
      };
    default:
      throw new Error('Invalid filter option');
  }
}

import toast from 'react-hot-toast';
import { supabase } from '../supabase';
import { getDateRange } from '../Utils/helper';

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    toast.error('Failed to fetch categories: ' + error.message);
    console.error('Supabase error:', error);
  }
  return data;
}

export async function getDishes() {
  const { data, error } = await supabase.from('dishes').select('*');

  if (error) {
    toast.error('Failed to fetch categories: ' + error.message);
    console.error('Supabase error:', error);
  }
  return data;
}

export async function addOrderItems(newItem) {
  try {
    const { data, error } = await supabase.from('order_items').insert(newItem).select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error adding order items:', error);
    return null;
  }
}

export async function getOrderItems() {
  const { data: order_items, error } = await supabase.from('order_items').select('*');

  if (error) {
    console.error(error.message);
    return [];
  }

  return order_items;
}

export const deleteOrderItem = async (itemId) => {
  const { data, error } = await supabase.from('order_items').delete().eq('id', itemId);

  if (error) throw new Error(error.message);
  return data;
};

export async function order(newOrder) {
  const { data, error } = await supabase.from('orders').insert(newOrder).select();
  if (error) console.error(error.message);
  return data;
}

export async function getOrders() {
  const { data: orders, error } = await supabase.from('orders').select('*');

  if (error) {
    console.error(error.message);
    return [];
  }

  return orders;
}

export async function updateDishAvailability(orderedDishes) {
  for (const { dish_id: dishId, quantity: quantityOrdered } of orderedDishes) {
    const { data: dish, error: fetchError } = await supabase
      .from('dishes')
      .select('availability')
      .eq('id', dishId)
      .single();

    if (fetchError) {
      console.log('Error fetching dish:', fetchError);
      continue;
    }

    if (dish.availability < quantityOrdered) {
      continue;
    }

    const newAvailability = dish.availability - quantityOrdered;

    const { data } = await supabase
      .from('dishes')
      .update({ availability: newAvailability })
      .eq('id', dishId);

    return data;
  }
}

// export async function getMostOrdered() {
//   const { data: order_items, error } = await supabase.from('order_items').select(`
//     dish_id,
//     quantity,
//     dishes (
//       name,
//       price,

//     )
//   `);

//   if (error) {
//     console.error('Error fetching order items:', error);
//   } else {
//     console.log('Fetched order items with dish details:', order_items);
//   }
// }

export async function getCustomers() {
  const { data: customers, error } = await supabase.from('customers').select('*');
  if (error) console.log(error.message);

  return customers;
}

export async function updateCustomer(newCustomer) {
  const { data, error } = await supabase.from('customers').insert(newCustomer).select();

  if (error) console.log(error.message);

  return data;
}

export async function getOrdersByDays({ queryKey }) {
  const [, filter] = queryKey;
  const { start, end } = getDateRange(filter);

  const colors = ['#FF7CA3', '#FFB572', '#65B0F6', '#FFD700', '#32CD32'];

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('order_type')
      .gte('created_at', start)
      .lt('created_at', end);

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      console.warn('No data returned for the specified date range.');
      return [];
    }

    const groupedOrders = data?.reduce((acc, { order_type }) => {
      acc[order_type] = (acc[order_type] || 0) + 1;
      return acc;
    }, {});

    const groupedData = Object.entries(groupedOrders).map(([orderType, count]) => ({
      orderType,
      count,
    }));

    groupedData.sort((a, b) => b.count - a.count);

    return groupedData.map((item, index) => ({
      orderType: item.orderType,
      value: item.count,
      color: colors[index % colors.length],
    }));
  } catch (err) {
    console.error('Unexpected Error:', err);
    throw err;
  }
}
export const addOrUpdateDish = async (dishData, id) => {
  try {
    // Ensure we are handling both URL and file properly
    const imageName = `${Math.random()}-${dishData.image_url.name}`.replaceAll('/', '');

    const hasImage = dishData.image_url?.startsWith?.('https://bzfcrikrctwhhocdbukt.supabase.co');

    const imagePath = hasImage
      ? dishData.image_url
      : `https://bzfcrikrctwhhocdbukt.supabase.co/storage/v1/object/public/dishes/${imageName}`;

    if (!hasImage) {
      const { error: storageError } = await supabase.storage
        .from('dishes')
        .upload(imageName, dishData.image_url);

      if (storageError) {
        console.error('Storage upload error:', storageError);
        throw new Error('Dish image could not be uploaded');
      }
    }

    let query;
    if (id) {
      query = supabase
        .from('dishes')
        .update({ ...dishData, image_url: imagePath })
        .eq('id', id);
    } else {
      query = supabase.from('dishes').insert([{ ...dishData, image_url: imagePath }]);
    }

    const { data, error } = await query.select().single();

    if (error) {
      console.error('Query error:', error);
      throw new Error('Dish could not be created or updated');
    }

    return data;
  } catch (err) {
    console.error('Unexpected error in addOrUpdateDish:', err);
    throw err;
  }
};

export async function deleteDish(id) {
  const { error } = await supabase.from('dishes').delete().eq('id', id);

  if (error) {
    console.error('Deleting Error', error);
    throw new Error('Failed to delete');
  }

  console.log(
    `Dish with ID ${id} was successfully deleted, and references in order_items were set to NULL.`
  );
}

export const fetchCountries = async () => {
  const url = 'https://restcountries.com/v3.1/all?fields=name,languages';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch countries');

    const countries = await response.json();
    console.log(countries);

    return countries;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

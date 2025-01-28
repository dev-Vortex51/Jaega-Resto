/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '../Features/Auth/useUser';

const OrderContext = createContext();

const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
  const { user } = useUser();
  const [orderId, setOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const discount = 0.25;
  const [pay, setPay] = useState(false);
  const [notes, setNotes] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editingDishId, setEditingDishId] = useState(null);
  const [addDish, setAddDish] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const storedOrderItems = JSON.parse(localStorage.getItem(`orderItems_${user.id}`));
      const storedOrderId = localStorage.getItem(`orderId_${user.id}`);

      // Ensure storedOrderId is a valid number
      if (storedOrderId && !isNaN(storedOrderId)) {
        setOrderId(storedOrderId);
      }

      if (storedOrderItems?.length > 0) {
        setOrderItems(storedOrderItems);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`orderItems_${user.id}`, JSON.stringify(orderItems));
    }
  }, [orderItems, user?.id]);

  useEffect(() => {
    if (user?.id && orderItems.length > 0 && orderId === null) {
      const newOrderId = `#${Math.floor(Math.random() * 1000000)
        .toString()
        .slice(0, 4)}`;
      setOrderId(newOrderId);
      localStorage.setItem(`orderId_${user.id}`, newOrderId);
    }
  }, [orderItems, user?.id, orderId]);

  return (
    <OrderContext.Provider
      value={{
        orderId,
        setOrderId,
        orderItems,
        setOrderItems,
        discount,
        pay,
        setPay,
        notes,
        setNotes,
        isEdit,
        setIsEdit,
        addDish,
        setAddDish,
        editingDishId,
        setEditingDishId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderProvider, useOrder };

// const sendinData = {
//     name: dishName,
//     price: dishPrice,
//     availability: dishAvailability,
//     category:
// }

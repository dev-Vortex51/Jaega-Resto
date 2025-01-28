import { Navigate, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './Ui/AppLayout';
import Menu from './Features/Menu/Menu';
import Dashboard from './Features/Dashboard/Dashboard';
import Login from './Features/Auth/Login';
import Register from './Features/Auth/Register';
import AppNotFound from './Ui/AppNotFound';
import ProtectedRoute from './Ui/ProtectedRoute';
import { OrderProvider } from './contexts/OrderContext';
import Settings from './Features/Settings/Settings';
import ProductManagement from './Features/Settings/ProductManagement';
import Security from './Features/Settings/Security';
import Appearance from './Features/Settings/Appearance';
import Notifications from './Features/Settings/Notifications';
import YourRestaurant from './Features/Settings/YourRestaurant';
import AboutUs from './Features/Settings/AboutUs';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/create',
      element: <Register />,
    },
    {
      element: (
        <ProtectedRoute>
          <OrderProvider>
            <AppLayout />
          </OrderProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Navigate to='/menu' />,
        },
        {
          path: '/menu',
          element: <Menu />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/settings',
          element: <Settings />,
          children: [
            {
              index: 1,
              element: <Navigate to='product-management' />,
            },
            {
              path: 'product-management',
              element: <ProductManagement />,
            },
            {
              path: 'security',
              element: <Security />,
            },
            {
              path: 'your-restaurant',
              element: <YourRestaurant />,
            },
            {
              path: 'notifications',
              element: <Notifications />,
            },
            {
              path: 'appearance',
              element: <Appearance />,
            },
            {
              path: 'about-us',
              element: <AboutUs />,
            },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <Navigate to='/login' replace />,
    },
    {
      path: '*',
      element: <AppNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

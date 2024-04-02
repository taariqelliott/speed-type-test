import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import Test from './pages/Test.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/test',
    element: <Test />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

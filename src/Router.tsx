import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { HomePage } from './pages/Home.page';
import Game from './pages/Game.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Game />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export function Router() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

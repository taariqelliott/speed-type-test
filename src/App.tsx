import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router />
    </MantineProvider>
  );
}

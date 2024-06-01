import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// @ts-expect-error no types
import useSound from 'use-sound';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';

import music from '@/assets/sounds/music.mp3';
import Main from './widgets/Main';

const queryClient = new QueryClient();

function App() {
  const [play] = useSound(music, { volume: 0.2 });

  useEffect(() => {
    play();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;

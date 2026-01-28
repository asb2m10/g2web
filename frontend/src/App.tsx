import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SynthPanel } from './components/SynthPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SynthPanel />
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home/Home';
import { Join } from './pages/Join/Join';
import { Players } from './pages/Players/Players';
import { PlayerProfile } from './pages/PlayerProfile/PlayerProfile';
import { Map } from './pages/Map/Map';
import { Stats } from './pages/Stats/Stats';
import { Shop } from './pages/Shop/Shop';
import { NotFound } from './pages/NotFound/NotFound';
import './styles/tokens.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60000,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="join" element={<Join />} />
            <Route path="players" element={<Players />} />
            <Route path="players/:name" element={<PlayerProfile />} />
            <Route path="map" element={<Map />} />
            <Route path="stats" element={<Stats />} />
            <Route path="shop" element={<Shop />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastProvider } from './components/Toast';
import { useBannerState } from './hooks/useBannerState';
import { useHashRoute } from './hooks/useHashRoute';
import Generator from './pages/Generator';
import Home from './pages/Home';

export default function App() {
  const { route, navigate } = useHashRoute();
  const banner = useBannerState();

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Header route={route} navigate={navigate} />
        <main id="main" className="flex-1">
          {route === 'create' ? <Generator banner={banner} /> : <Home onCreate={() => navigate('create')} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </ToastProvider>
  );
}

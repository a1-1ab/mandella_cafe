import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.jsx';
import CartProvider from './providers/CartProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import useAuth from './hooks/useAuth.js';
import BootScreen from './screens/BootScreen.jsx';

const AppShell = () => {
  const { status } = useAuth();

  if (status === 'booting') return <BootScreen />;

  return <AppRoutes />;
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import SplashScreen from '../screens/SplashScreen.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import MenuScreen from '../screens/MenuScreen.jsx';
import ProductScreen from '../screens/ProductScreen.jsx';
import SummaryScreen from '../screens/SummaryScreen.jsx';
import ConfirmationScreen from '../screens/ConfirmationScreen.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SplashScreen />} />
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/menu" element={<MenuScreen />} />
    <Route path="/product/:slug" element={<ProductScreen />} />
    <Route path="/summary" element={<SummaryScreen />} />
    <Route path="/confirmation/:orderId" element={<ConfirmationScreen />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;

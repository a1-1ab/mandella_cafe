import { createContext, useContext } from 'react';

const CartContext = createContext(null);

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside <CartProvider>');
  return context;
};

export { CartContext };
export default useCart;

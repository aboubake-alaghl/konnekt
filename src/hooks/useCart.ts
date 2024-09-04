import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('Auth context must be use inside AuthProvider');
  return context;
};

export default useCart;
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../hooks/useCart.js';

const STORAGE_KEY = 'mandella.cart';

const buildKey = (item) => `${item.productId}:${item.size}:${item.sugar}`;

const readStoredCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((item) => {
    const key = buildKey(item);
    setItems((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key ? { ...entry, quantity: entry.quantity + (item.quantity || 1) } : entry
        );
      }
      return [...current, { ...item, key, quantity: item.quantity || 1 }];
    });
  }, []);

  const increment = useCallback((key) => {
    setItems((current) =>
      current.map((entry) => (entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry))
    );
  }, []);

  const decrement = useCallback((key) => {
    setItems((current) =>
      current.flatMap((entry) => {
        if (entry.key !== key) return [entry];
        if (entry.quantity <= 1) return [];
        return [{ ...entry, quantity: entry.quantity - 1 }];
      })
    );
  }, []);

  const remove = useCallback((key) => {
    setItems((current) => current.filter((entry) => entry.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totals = useMemo(
    () =>
      items.reduce(
        (accumulator, item) => ({
          count: accumulator.count + item.quantity,
          subtotal: accumulator.subtotal + item.unitPrice * item.quantity,
        }),
        { count: 0, subtotal: 0 }
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      add,
      increment,
      decrement,
      remove,
      clear,
      count: totals.count,
      subtotal: totals.subtotal,
      isEmpty: items.length === 0,
      toPayload: () =>
        items.map((item) => ({
          productId: item.productId,
          size: item.size,
          sugar: item.sugar,
          quantity: item.quantity,
        })),
    }),
    [items, add, increment, decrement, remove, clear, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

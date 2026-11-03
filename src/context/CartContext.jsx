import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cuponAplicado, setCuponAplicado] = useState(null);

  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item);
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const descuento = cuponAplicado ? (subtotal * cuponAplicado.porcentaje) / 100 : 0;
  const total = Math.max(0, subtotal - descuento);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, subtotal, descuento, total, setCuponAplicado, cuponAplicado }}>
      {children}
    </CartContext.Provider>
  );
}
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.name === action.payload.name);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.name === action.payload.name ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.name !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.name !== action.payload.name) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.name === action.payload.name ? { ...i, quantity: action.payload.quantity } : i
        )
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (name) => dispatch({ type: 'REMOVE_ITEM', payload: name });
  const updateQuantity = (name, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { name, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, subtotal, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};

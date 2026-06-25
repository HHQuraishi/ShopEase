import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QTY: 'UPDATE_QTY',
  CLEAR_CART: 'CLEAR_CART'
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existing = state.items.find(i => i._id === action.payload._id);
      const addQuantity = Number(action.payload.quantity) || 1;
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id ? { ...i, quantity: i.quantity + addQuantity } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: addQuantity }] };
    }
    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    case CART_ACTIONS.UPDATE_QTY:
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
        )
      };
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const initialState = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  const removeFromCart = (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
  const updateQty = (id, qty) => dispatch({ type: CART_ACTIONS.UPDATE_QTY, payload: { id, qty } });
  const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    cartItems: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
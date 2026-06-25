import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[];

const initialState = {
    items: cartFromStorage,
    totalItems: 0,
    totalPrice: 0,
};

const calcTotals = (state) => {
    state.totalItems = state.items.reduce((sum,i) => sum + i.quantity, 0);
    state.totalPrice = state.items.reduce((sum,i) => sum + i.price*i.quantity,0);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state,action) => {
            const product = action.payload;
            const exists = state.items.find(i => i._id === product._id);
            if(exists){
                exists.quantity += 1;
            }
            else{
                state.items.push({...product, quantity: 1});
            }
            calcTotals(state);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItem: (state,action) => {
          state.items = state.items.filter(i => i._id !== action.payload);
          calcTotals(state);
          localStorage.setItem('cartItems', JSON.stringify(state.items));  
        },
        updateQuantity: (state,action) => {
            const {id,quantity} = action.payload;
            const item = state.items.find(i => i._id === id);
            if(item){
                item.quantity = Math.max(1,quantity);
            }
            calcTotals(state);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            localStorage.removeItem('cartItems');
        },
    },
});

export const {addItem,removeItem,updateQuantity,clearCart} = cartSlice.actions;
export const selectCartItems   = state => state.cart.items;
export const selectTotalItems  = state => state.cart.totalItems;
export const selectTotalPrice  = state => state.cart.totalPrice;
export default cartSlice.reducer;
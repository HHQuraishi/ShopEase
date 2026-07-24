import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createOrder, getMyOrders } from "../services/api";

export const placeOrder = createAsyncThunk(
  "orders/place",

  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await createOrder(orderData);

      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Order fail!");
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "orders/myOrders",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getMyOrders();

      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error!");
    }
  },
);

const initialState = {
  // Checkout steps ka data

  shippingAddress: localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {},

  paymentMethod: localStorage.getItem("paymentMethod") || "Razorpay",

  // Order state

  currentOrder: null,

  myOrders: [],

  loading: false,

  error: "",
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      localStorage.setItem("shipping", JSON.stringify(action.payload));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      localStorage.setItem("paymentMethod", action.payload);
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(placeOrder.pending, (s) => {
        s.loading = true;
        s.error = "";
      })

      .addCase(placeOrder.fulfilled, (s, a) => {
        s.loading = false;
        s.currentOrder = a.payload;
      })

      .addCase(placeOrder.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(fetchMyOrders.pending, (s) => {
        s.loading = true;
      })

      .addCase(fetchMyOrders.fulfilled, (s, a) => {
        s.loading = false;
        s.myOrders = a.payload;
      })

      .addCase(fetchMyOrders.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { saveShippingAddress, savePaymentMethod, clearCurrentOrder } =
  orderSlice.actions;

export const selectShipping = (s) => s.orders.shippingAddress;

export const selectPaymentMethod = (s) => s.orders.paymentMethod;

export const selectCurrentOrder = (s) => s.orders.currentOrder;

export const selectMyOrders = (s) => s.orders.myOrders;

export const selectOrderLoading = (s) => s.orders.loading;

export const selectOrderError = (s) => s.orders.error;

export default orderSlice.reducer;

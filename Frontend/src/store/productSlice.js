import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
} from "../services/api";

export const fetchProducts = createAsyncThunk("products/fetchAll",async ({ keyword = "", page = 1, category = "" } = {},{ rejectWithValue },) => {
        try {
            const { data } = await getProducts(keyword, page, category);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Error!");
        }
    },
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",

    async (id, { rejectWithValue }) => {
        try {
            const { data } = await getProductById(id);

            return data.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Product nahi mila!",
            );
        }
    },
);

export const createProductThunk = createAsyncThunk(
    "products/create",

    async (productData, { rejectWithValue }) => {
        try {
            const { data } = await createProduct(productData);

            return data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Create failed!");
        }
    },
);

export const deleteProductThunk = createAsyncThunk(
    "products/delete",

    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);

            return id;  
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Delete failed!");
        }
    },
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: "",
        total: 0,
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = "";
        },
    },
    extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (s) => {
                s.loading = true;
                s.error = "";
            })
            .addCase(fetchProducts.fulfilled, (s, a) => {
                s.loading = false;
                s.items = a.payload.data;

                s.total = a.payload.total;
                s.totalPages = a.payload.totalPages;

                s.currentPage = a.payload.currentPage;
            })
            .addCase(fetchProducts.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })
            .addCase(fetchProductById.pending, (s) => {
                s.loading = true;
                s.error = "";
                s.selectedProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (s, a) => {
                s.loading = false;
                s.selectedProduct = a.payload;
            })
            .addCase(fetchProductById.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })
            .addCase(createProductThunk.fulfilled, (s, a) => {
                s.items.unshift(a.payload);
            })
            .addCase(deleteProductThunk.fulfilled, (s, a) => {
                s.items = s.items.filter((p) => p._id !== a.payload);
            });
    },
});

export const { clearSelectedProduct, clearError } = productSlice.actions;
export const selectProducts = (s) => s.products.items;
export const selectSelectedProduct = (s) => s.products.selectedProduct;
export const selectProductsLoading = (s) => s.products.loading;
export const selectProductsError = (s) => s.products.error;
export const selectTotalPages = (s) => s.products.totalPages;
export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    try {
        const { data } = await axios.post('http://localhost:3001/api/v1/user/login', user);
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const getProfile = createAsyncThunk("user/getProfile", async () => {
    try {
        const { data } = await axios.get('http://localhost:3001/api/v1/user/profile', authHeader());
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const editName = createAsyncThunk("user/editName", async (editUser) => {
    try {
        const { data } = await axios.put('http://localhost:3001/api/v1/user/profile', editUser, authHeader());
        return data;
    } catch (error) {
        return error.response.data;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        error: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload;
                localStorage.setItem("token", action.payload.body.token);
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log(state.user);
                state.loading = false;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            })
            // Edit Name
            .addCase(editName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editName.fulfilled, (state, action) => {
                state.user.userName = action.payload.userName;
                console.log(state);
                state.loading = false;
            })
            .addCase(editName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || action.error.message;
            });
    }
});

// Selectors
export const selectUser = (state) => state.user.user.body;
export const selectToken = (state) => state.token;
export const selectLoading = (state) => state.loading;
export const selectError = (state) => state.error;

export const { logout } = userSlice.actions;

export default userSlice.reducer;

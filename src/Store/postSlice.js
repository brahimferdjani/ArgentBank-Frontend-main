import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("post/loginUser", async (user) => {
    try {
        const { data } = await axios.post('http://localhost:3001/api/v1/user/login', { email: user.email, password: user.password });
        console.log("post payload :", data);
        user.rememberMe ? localStorage.setItem("token", data.body.token) : sessionStorage.setItem("token", data.body.token);
        if (sessionStorage.getItem("token")) {
            setTimeout(() => {
                sessionStorage.removeItem("token");
            }, 5000);
        }
        return data;
    } catch (error) {
        return error.response.data;
    }
});


const postSlice = createSlice({
    name: "post",
    initialState: {
        message: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.status = null;
            state.body = null;
            state.message = null;
            state.error = null;
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.body = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "idle";
                state.error = null;
                state.body = action.payload.body;
                console.log(state.body);
                state.message = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.payload?.message || action.error.message;
                state.body = null;
                state.message = null;
            })
    }
});

export const { logout, savedName } = postSlice.actions;

export default postSlice.reducer;

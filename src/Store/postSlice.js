import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("post/loginUser", async (user) => {
    try {
        const { data } = await axios.post('http://localhost:3001/api/v1/user/login', { email: user.email, password: user.password });
        console.log("data", data); //ou est le token ?
        console.log("rememberMe", user.rememberMe);
        user.rememberMe ? localStorage.setItem("token", data.token) : sessionStorage.setItem("token", data.token); //2 - store token local ou session
        return data;
    } catch (error) {
        return error.response.data;
    }
});


const postSlice = createSlice({
    name: "post",
    initialState: {
        message: null,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            state.body = null;
            state.status = null;
            state.message = null;
            state.error = null;
        }
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
                state.status = action.payload.status;
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

export const { logout } = postSlice.actions;

export default postSlice.reducer;

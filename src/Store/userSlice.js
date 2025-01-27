import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    try {
        const { data } = await axios.post('http://localhost:3001/api/v1/user/login', { email: user.email, password: user.password });
        console.log("post payload :", data);
        user.rememberMe ? localStorage.setItem("token", data.body.token) : sessionStorage.setItem("token", data.body.token);
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const userInfo = createAsyncThunk("user/userInfo", async () => {
    try {
        const { data } = await axios.get('http://localhost:3001/api/v1/user/profile', authHeader());
        console.log(data);
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


const postSlice = createSlice({
    name: "post",
    initialState: {
        status: null,
        token: null,
        message: null,
        body: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.error = null;
            localStorage.clear();
            sessionStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder
            // post
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.token = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = action.payload?.status;
                state.error = null;
                state.token = action.payload?.body;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = action.payload?.status;
                state.error = action.payload?.message;
                state.token = null;
            })
            //get  
            .addCase(userInfo.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.body = null;
                state.message = null;
            })
            .addCase(userInfo.fulfilled, (state, action) => {
                state.status = action.payload.status;
                state.error = null;
                state.body = action.payload.body;
                state.message = action.payload.message;
            })
            .addCase(userInfo.rejected, (state, action) => {
                state.status = action.payload?.status || "idle";
                state.error = action.error.message;
                state.body = null;
                state.message = action.payload?.message;
            })
            //edit  
            .addCase(editName.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.body = {};
                state.message = null;
            })
            .addCase(editName.fulfilled, (state, action) => {
                state.status = action.payload.status || "idle";
                state.error = null;
                state.body = { ...action.payload.body };
                state.message = action.payload.message;
            })
            .addCase(editName.rejected, (state, action) => {
                state.status = action.payload?.status || "idle";
                state.error = action.error.message;
                state.body = {};
                state.message = action.payload?.message;
            });
    }
});

export const { logout } = postSlice.actions;

export default postSlice.reducer;

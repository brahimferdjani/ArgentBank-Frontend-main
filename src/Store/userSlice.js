import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    const request = await axios.post('http://localhost:3001/api/v1/user/login', user);
    console.log(request);
    const response = await request.data;
    return response;
});

export const loginUser2 = createAsyncThunk("user/loginUser2", async () => {
    const request = await axios.get('http://localhost:3001/api/v1/user/profile', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    console.log(request);
    const response = await request.data;
    return response;
});

export const loginUser3 = createAsyncThunk("user/loginUser3", async (editUser) => {
    const request = await axios.put('http://localhost:3001/api/v1/user/profile', editUser, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    console.log(request);
    const response = await request.data;
    return response;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.body.token;
                localStorage.setItem("token", action.payload.body.token);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(loginUser2.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log("user", state.user.body.firstName);
                state.error = null;
            })
            .addCase(loginUser2.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message;
            });

    },
});

export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const userInfo = createAsyncThunk("get/userInfo", async () => {
    try {
        const { data } = await axios.get('http://localhost:3001/api/v1/user/profile', authHeader());
        console.log(data);
        return data;
    } catch (error) {
        return error.response.data;
    }
});

const getSlice = createSlice({
    name: "get",
    initialState: {
        status: "idle",
        message: null,
        body: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    }
});

export default getSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
    }
});

export const editName = createAsyncThunk("edit/editName", async (editUser) => {
    try {
        const { data } = await axios.put('http://localhost:3001/api/v1/user/profile', editUser, authHeader());
        return data;
    } catch (error) {
        return error.response.data;
    }
});

const editSlice = createSlice({
    name: "edit",
    initialState: {
        status: "idle",
        message: null,
        body: {},
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    },
});


export default editSlice.reducer;
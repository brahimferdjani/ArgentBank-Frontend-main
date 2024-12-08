import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    const request = await axios.post("http://localhost:3000/login", user);
    const response = await request.data.data;
    localStorage.setItem("user", json.stringify(response));
    return response;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: null,

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                if (action.error.message === "Network Error") {
                    state.error = "Mot de passe ou nom d'utilisateur incorrect";
                } else {
                    state.error = action.error.message;
                }
            });

    },
});

export default userSlice.reducer;
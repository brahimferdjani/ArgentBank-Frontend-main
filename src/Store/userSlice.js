import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
    const request = await axios.post('http://localhost:3001/api/v1/user/login', user);
    console.log(request);
    const response = await request.data.body;
    return response;
});

export const loginUser2 = createAsyncThunk("user/loginUser2", async (token) => {
    const request = await axios.get('http://localhost:3001/api/v1/user/profile', token);
    console.log(request);
    const response = await request.data.body;
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
            .addCase(loginUser.pending, (state) => {
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                //  state.user = action.payload; token = payload
                console.log("payload de login", action.payload.token)
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                if (action.error.message === "Request failed with status code 400") {
                    state.error = "Mot de passe ou nom d'utilisateur incorrect";
                } else {
                    state.error = action.error.message;
                }
            }).addCase(loginUser2.pending, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser2.fulfilled, (state, action) => {
                console.log("payload de profile ", action.payload.profile)
                state.user = action.payload.profile;
                console.log("payload de login 2", action.payload.token)
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser2.rejected, (state, action) => {
                state.user = null;
                if (action.error.message === "Token is missing from header") {
                    state.error = "Erreur de connection";
                } else {
                    state.error = action.error.message;
                }
            });

    },
});

export default userSlice.reducer;
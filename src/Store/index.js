import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import reducer from "./UserSlice";

const store = configureStore({
    reducer: reducer({
        user: userReducer,
    })
});

export default store
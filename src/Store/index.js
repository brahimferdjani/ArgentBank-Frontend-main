import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import profileReducer from "../pages/Profile/Profile";

const store = configureStore({
    reducer: combineReducers({
        user: userReducer,
        profile: profileReducer,
    })
});

export default store
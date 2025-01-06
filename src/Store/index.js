import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import getReducer from "./getSlice";
import editReducer from "./editSlice";


const store = configureStore({
    reducer: ({
        post: postReducer,
        get: getReducer,
        edit: editReducer
    })
});

export default store
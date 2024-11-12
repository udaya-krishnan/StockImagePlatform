import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const configStore = configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default configStore;

import { configureStore }  from "@reduxjs/toolkit"
import userSlice  from "./userSlice";

export default configureStore({
    reducer: {
        user : userSlice,
    },
    //이거 안해주면 콘솔에 문구뜸..
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck : false,
    })
}); 
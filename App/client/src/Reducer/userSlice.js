import { createSlice }  from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState:{
        displayName : "",
        uid : "",
        accessToken :"",
        photoURL :"",
        //마이페이지에서 로그인유뮤를 판단하기위함
        isLoading : false,
    },
    reducers:{
        loginUser: (state,action)=>{
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.accessToken = action.payload.accessToken;
            state.photoURL = action.payload.photoURL;
            state.isLoading = true;
        },
        clearUser: (state)=>{
            state.displayName = "";
            state.uid = "";
            state.accessToken = "";
        },
    }
})

export const {loginUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
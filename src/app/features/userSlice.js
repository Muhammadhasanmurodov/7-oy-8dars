import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    authReady:false,
}

const useListSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login: (state, {payload}) => {
            state.user = payload
        },
        logout: (state) => {
            state.user = null
        },
        isAuthReady: (state) => {
          state.authReady = true
        }
    },
})


export const {login, logout, isAuthReady} = useListSlice.actions;
export default useListSlice.reducer
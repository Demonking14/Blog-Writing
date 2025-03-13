import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    UserData : null
}

const AuthSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state , action) =>{
            state.status = true;
            state.UserData = action.payload.UserData;

        },
        logout : (state) => {
            state.status = false;

        }

    }
})

export const {login , logout} = AuthSlice.actions;
export default AuthSlice.reducer;
// *Imports the createSlice function from the @reduxjs/toolkit library, which is a powerful tool for creating Redux slices efficiently.

/*

Redux slices are a way to organize Redux state into smaller, more manageable pieces. They are essentially self-contained modules that handle their own state and actions, making it easier to manage and reason about your application's state.


*/
import { createSlice } from "@reduxjs/toolkit";

//!Initial State
// Defines a new Redux slice named auth.
// Sets the initial state of the slice to an object with a user property.
// The user property is initially set to null if there's no userInfo stored in local storage.
// If userInfo exists in local storage, it's parsed from JSON and assigned to the user property.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //1 Reducers
  //   *  Reducer is a pure function that takes the current state and an action as input and returns a new state. It's the core mechanism for updating state in Redux applications.


  reducers: {
    // loginAction: Updates the user property in the state with the payload of the action, which typically contains the user's information.
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    //Logout
    // logoutAction: Sets the user property in the state to null, effectively logging out the user.

    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});
//! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;
//! Generate the reducers
// const authReducer = authSlice.reducer;
// export default authReducer;
export const authReducer = authSlice.reducer;

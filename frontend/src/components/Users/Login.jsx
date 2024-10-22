import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

//! Validations
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {

  //Navigate
  const navigate = useNavigate();
  //Dispatch
  //  This hook allows the component to dispatch actions to the Redux store. Here, it dispatches the loginAction with user data received from the API after a successful login.
  const dispatch = useDispatch();
  // Mutation
  /*
  *
  *useMutation: This hook manages the login API call as a mutation. It takes an object with several properties:
  `mutationFn`: Set to the loginAPI function which performs the actual login request.
  `mutationKey`: Set to an array ["login"] to identify the mutation for caching purposes (if applicable in your setup).
  The hook returns an object with properties like mutateAsync for triggering the mutation, isPending indicating if the request is ongoing, isError for any errors, error containing the error details, and isSuccess for successful completion.


  */
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });



  // This hook is used to manage the login form state and validation. It takes an object with properties:
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      //http request

      // * triggers the login API call with the submitted form data.
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data))
          localStorage.setItem('userInfo', JSON.stringify(data));
        })
        .catch((error) => console.error(error));

      /* 
        Handles successful login response:
Dispatches the loginAction with the received data to update the Redux store.
Saves the user data into local storage for potential future use.

      */
    },
  });

  //Redirect
  //Redirect
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 3000);
  }, [isPending, isError, error, isSuccess]);

  // it checks for isPending, isError, error, and isSuccess from the useMutation hook.

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 font-calli">
        Login
      </h2>
      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Login you in...." />}
      {isError && (
        <AlertMessage type="error" message={error.response.data.message} />
      )}
      {isSuccess && <AlertMessage type="success" message="Login success" />}
      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />

        {/* The ... spread operator is used to extract the properties from the object returned by getFieldProps("email") and spread them individually onto the input element's attributes.
This effectively binds the input element's behavior to the Formik's state management for the "email" field.   */}
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {/* formik.touched.email: This checks if the "email" field has been touched (focused and blurred) using the touched property from Formik's state.
formik.errors.email: This checks if there's an error message for the "email" field using the errors property from Formik's state. */}
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

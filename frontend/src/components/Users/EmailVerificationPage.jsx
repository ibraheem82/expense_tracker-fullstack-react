import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import { verifyEmailAPI } from "../../services/users/userService";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  verificationCode: Yup.string().required("Verification code is required"),
});

const EmailVerificationPage = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: verifyEmailAPI,
    mutationKey: ["verifyEmail"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      verificationCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log("Verification successful:", data);
        })
        .catch((e) => console.error("Verification failed:", e));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800">Verify Your Email</h1>
      <p className="text-sm text-center text-gray-500">
        Please enter the verification code sent to your email address.
      </p>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            className="pl-4 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          )}
        </div>

        {/* Verification Code Input */}
        <div className="relative">
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            value={formik.values.verificationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Verification Code"
            className="pl-4 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {formik.touched.verificationCode && formik.errors.verificationCode && (
            <span className="text-xs text-red-500">
              {formik.errors.verificationCode}
            </span>
          )}
        </div>

        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Verifying email..." />}
        {isError && (
          <AlertMessage 
            type="error" 
            message={error?.response?.data?.message || "Verification failed. Please try again."} 
          />
        )}
        {isSuccess && (
          <AlertMessage 
            type="success" 
            message="Email verified successfully! Redirecting to login..." 
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${
            isPending ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-teal-600'
          }`}
        >
          {isPending ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>
    </div>
  );
};

export default EmailVerificationPage;
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";
import { verifyEmailAPI } from "../../services/users/userService"; // You'll need to create this service function and the backend endpoint

const EmailVerification = () => {
  const { token } = useParams();

  // Mutation for email verification
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: verifyEmailAPI, // This function will make the API call to your backend
    mutationKey: ["verify-email", token],
  });

  useEffect(() => {
    if (token) {
      mutateAsync(token);
    }
  }, [token, mutateAsync]);

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200 text-center">
      <h2 className="text-3xl font-semibold text-gray-800">Email Verification</h2>

      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Verifying your email..." />}
      {isError && (
        <AlertMessage
          type="error"
          message={error?.response?.data?.message || "Email verification failed."}
        />
      )}
      {isSuccess && (
        <>
          <AlertMessage type="success" message="Email verified successfully!" />
          <Link
            to="/login"
            className="text-blue-500 hover:underline block mt-4"
          >
            Go to Login
          </Link>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
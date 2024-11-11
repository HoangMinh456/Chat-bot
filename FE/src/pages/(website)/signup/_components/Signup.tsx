import { useState } from "react";
import logoGG from "../../../../assets/img/logoGG.png";
import logo from "../../../../assets/img/z5970140768137_a1360e9972a044aa177375a7791443dc.jpg";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [usernameActive, setUsernameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  const handleUsernameFocus = () => {
    setUsernameActive(true);
  };

  const handleUsernameBlur = (e: any) => {
    setUsernameActive(e.target.value !== "");
  };

  const handleEmailFocus = () => {
    setEmailActive(true);
  };

  const handleEmailBlur = (e: any) => {
    setEmailActive(e.target.value !== "");
  };

  const handlePasswordFocus = () => {
    setPasswordActive(true);
  };

  const handlePasswordBlur = (e: any) => {
    setPasswordActive(e.target.value !== "");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Dữ liệu đăng nhập:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center">
          <div className="overflow-hidden w-28 h-28 rounded-full">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Signup
        </h2>
        <form
          className="space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              type="text"
              id="username"
              {...register("username", { required: "User Name là bắt buộc" })}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              className="peer w-full px-3 pt-4 pb-2 text-gray-900 border border-emerald-600 rounded-md focus:outline-none focus:ring-0 focus:border-emerald-600"
            />
            <label
              htmlFor="username"
              className={`absolute left-3 bg-white px-1 transition-all duration-200 ${
                usernameActive || errors.username
                  ? "top-0 text-xs text-emerald-600 -translate-y-1/2"
                  : "top-4 text-sm text-gray-500"
              }`}
            >
              User Name
            </label>
            {errors.username?.message &&
              typeof errors.username.message === "string" && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.username.message}
                </p>
              )}
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email là bắt buộc" })}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className="peer w-full px-3 pt-4 pb-2 text-gray-900 border border-emerald-600 rounded-md focus:outline-none focus:ring-0 focus:border-emerald-600"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 bg-white px-1 transition-all duration-200 ${
                emailActive || errors.email
                  ? "top-0 text-xs text-emerald-600 -translate-y-1/2"
                  : "top-4 text-sm text-gray-500"
              }`}
            >
              Email address
            </label>
            {errors.email?.message &&
              typeof errors.email.message === "string" && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.email.message}
                </p>
              )}
          </div>

          <div className="relative mt-4">
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password là bắt buộc" })}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="peer w-full px-3 pt-4 pb-2 text-gray-900 border border-emerald-600 rounded-md focus:outline-none focus:ring-0 focus:border-emerald-600"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 bg-white px-1 transition-all duration-200 ${
                passwordActive || errors.password
                  ? "top-0 text-xs text-emerald-600 -translate-y-1/2"
                  : "top-4 text-sm text-gray-500"
              }`}
            >
              Password
            </label>
            {errors.password?.message &&
              typeof errors.password.message === "string" && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-gray-600">
          You already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:text-emerald-800">
            Login
          </a>
        </p>

        <div className="flex items-center justify-center mt-6">
          <div className="w-full h-px bg-gray-400"></div>
          <span className="px-3 text-gray-600">OR</span>
          <div className="w-full h-px bg-gray-400"></div>
        </div>

        <button className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
          <img src={logoGG} alt="Google logo" className="w-6 h-6 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignupForm;

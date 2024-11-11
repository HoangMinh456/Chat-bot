import { useState } from "react";
import logoGG from "../../../../assets/img/logoGG.png";
import logo from "../../../../assets/img/z5970140768137_a1360e9972a044aa177375a7791443dc.jpg";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();
  const { toast } = useToast()

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

  const loginAccount = useMutation({
    mutationFn: async (item: any) => {
      const { data } = await axios.post(`http://127.0.0.1:5000/login`, item);
      return data;
    }, onSuccess: (data) => {
      // console.log(data)
      localStorage.setItem('user', JSON.stringify(data.data));
      navigate('/');
      toast({
        title: 'Login',
        description: 'Đăng nhập thành công!'
      })
    }, onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast({
          variant: 'destructive',
          title: 'Login',
          description: error.response.data.message
        })
      } else {
        alert('error!')
        console.log(error.message);
      }
    }
  })

  const onSubmit = (data: any) => {
    // console.log("Dữ liệu đăng nhập:", data);
    const item = {
      email: data.email,
      password: data.password
    }
    loginAccount.mutateAsync(item);
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
          Login
        </h2>

        <form
          className="space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              className={`absolute left-3 bg-white px-1 transition-all duration-200 ${emailActive || errors.email
                ? "top-0 text-xs text-emerald-600 -translate-y-1/2"
                : "top-4 text-sm text-gray-500"
                }`}
            >
              Email address
            </label>
            {errors.email?.message &&
              typeof errors.email.message === "string" && (
                <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
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
              className={`absolute left-3 bg-white px-1 transition-all duration-200 ${passwordActive || errors.password
                ? "top-0 text-xs text-emerald-600 -translate-y-1/2"
                : "top-4 text-sm text-gray-500"
                }`}
            >
              Password
            </label>
            {errors.password?.message &&
              typeof errors.password.message === "string" && (
                <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>
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
          Don’t have an account?{" "}
          <a href="signup" className="text-emerald-600 underline">
            Sign up
          </a>
        </p>

        <div className="flex items-center justify-center mt-6">
          <div className="w-full h-px bg-gray-400"></div>
          <span className="px-2 text-gray-600">OR</span>
          <div className="w-full h-px bg-gray-400"></div>
        </div>

        <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 ">
          <img src={logoGG} alt="Google logo" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

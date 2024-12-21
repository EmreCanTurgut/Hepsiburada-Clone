"use client";
import BasicModal from "@/app/components/common/modal";
import registerSlice from "@/store/Slices/registerSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const register = useSelector((state: RootState) => state.register);
  const [emailInput, setEmailInput] = useState("");
  const [paswordInput, setPaswordInput] = useState("");
  const [isPasword, setIsPasword] = useState("password");
  const router = useRouter();
  const GoToUyeOl = () => {
    router.replace("/register");
  };
  const EmailinputChangeHandler = (e: any) => {
    dispatch(
      registerSlice.actions.emailCheckChangeHandler(e.currentTarget.value)
    );
    setEmailInput(e.target.value);
    console.log(emailInput);
  };
  const PaswordinputChangeHandler = (e: any) => {
    dispatch(
      registerSlice.actions.passwordCheckChangeHandler(e.currentTarget.value)
    );
    setPaswordInput(e.target.value);
    console.log(paswordInput);
  };
  const isPaswordChangeHandler = (e: any) => {
    if (isPasword == "password") {
      setIsPasword("text");
    } else {
      setIsPasword("password");
    }
  };
  const sendSigninRequest = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer", {
        method: "post",
        body: JSON.stringify({
          action: "login",
          email: register.emailCheck,
          pasword: register.passwordCheck,
        }),
      });
      const data = await response.json();
      console.log(data);
      router.replace("/products");
    } catch (error) {}
  };
  const isforgetpaswordChangeHandler=(e:any)=>{
    e.preventDefault()
    dispatch(registerSlice.actions.isForgetPasswordModuleOpenChangeHandler(true))
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          hepsiburada
        </h1>
            <BasicModal/>
        <div className="flex border-b mb-4">
          <h2 className="text-align: center">Giriş yap</h2>
        </div>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta adresi
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-orange-500 focus:outline-none focus:border-orange-500"
              placeholder="E-posta adresi"
              value={emailInput}
              onChange={EmailinputChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <div className="relative">
              <input
                type={isPasword}
                id="password"
                className="w-full px-3 py-2 text-sm border rounded-md focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                placeholder="Şifre"
                value={paswordInput}
                onChange={PaswordinputChangeHandler}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                onClick={isPaswordChangeHandler}
              >
                👁️
              </span>
            </div>
          </div>

          <div className="mb-4 text-right">
            <button className="text-sm text-orange-500"
            onClick={isforgetpaswordChangeHandler}
            >
              Şifremi unuttum
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
            onClick={sendSigninRequest}
          >
            Giriş yap
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Henüz bir hesabınız yok mu?
          </p>
          <button
            className="w-full px-4 py-2 text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50"
            onClick={GoToUyeOl}
          >
            Üye Ol
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

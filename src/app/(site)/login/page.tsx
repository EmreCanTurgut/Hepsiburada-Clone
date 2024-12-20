"use client"
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage: React.FC = () => {
    const router=useRouter();
    const GoToUyeOl=()=>{
        router.replace("/register")
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
          hepsiburada
        </h1>

        {/* Tab Menu */}
        <div className="flex border-b mb-4">
         
         <h2
         className="text-align: center"
         >Giriş yap</h2>
          
        </div>

        {/* Form */}
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
                type="password"
                id="password"
                className="w-full px-3 py-2 text-sm border rounded-md focus:ring-orange-500 focus:outline-none focus:border-orange-500"
                placeholder="Şifre"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                👁️
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-orange-500">
              Şifremi unuttum
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Giriş yap
          </button>
        </form>

        {/* Üye Ol Button */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Henüz bir hesabınız yok mu?</p>
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

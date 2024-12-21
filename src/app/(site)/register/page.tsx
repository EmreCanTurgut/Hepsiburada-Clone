"use client";
import registerSlice from "@/store/Slices/registerSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const register = useSelector((state: RootState) => state.register);

  const [PhoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    PhoneNumber: false,
    name: false,
    password: false,
    email: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      PhoneNumber: !PhoneNumber,
      name: !name,
      password: !password,
      email: !email,
    };

    setErrors(newErrors);

    // Eğer herhangi bir alan boşsa form gönderilmesin.
    if (Object.values(newErrors).some((error) => error)) {
      
      return;
    }

    // Tüm alanlar doluysa devam et
    await KayıtOl();
    alert("Form başarıyla gönderildi!");
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerSlice.actions.userNameChangeHander(e.currentTarget.value));
    setName(e.currentTarget.value);
  };

  const PhoneNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerSlice.actions.userPhoneNumberChangeHandler(e.currentTarget.value)
    );
    setPhoneNumber(e.currentTarget.value);
  };

  const PasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerSlice.actions.userPasswordChangeHandler(e.currentTarget.value)
    );
    setPassword(e.currentTarget.value);
  };

  const EmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerSlice.actions.userEmailChangeHandler(e.currentTarget.value)
    );
    setEmail(e.currentTarget.value);
  };

  const KayıtOl = async () => {
    const response = await fetch("http://localhost:3000/api/customer", {
      method: "POST",
      body: JSON.stringify({
        action: "register",
        name: register.userName,
        email: register.userEmail,
        password: register.userPassword,
        phone: register.userPhoneNumber,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white border rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-orange-600">
          hepsiburada
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Telefon */}
          <div className="mb-4">
            <label
              htmlFor="PhoneNumber"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              GSM numarası
            </label>
            <input
              type="text"
              id="PhoneNumber"
              className={`w-full px-4 py-2 border ${
                errors.PhoneNumber
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Telefon numaranızı girin"
              value={PhoneNumber}
              onChange={PhoneNumberChangeHandler}
            />
            {errors.PhoneNumber && (
              <p className="mt-1 text-sm text-red-600">
                Bu alan boş bırakılamaz.
              </p>
            )}
          </div>

          {/* İsim */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              İsim
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="İsminizi girin"
              value={name}
              onChange={nameChangeHandler}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                Bu alan boş bırakılamaz.
              </p>
            )}
          </div>

          {/* Şifre */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="Şifrenizi girin"
              value={password}
              onChange={PasswordChangeHandler}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                Bu alan boş bırakılamaz.
              </p>
            )}
          </div>

          {/* E-posta */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              E-posta
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={EmailChangeHandler}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                Bu alan boş bırakılamaz.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Devam et
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-500">
          Kişisel verileriniz,{" "}
          <a href="#" className="text-orange-500 underline hover:no-underline">
            Aydınlatma Metni
          </a>{" "}
          kapsamında işlenmektedir. “Devam et” butonuna basarak{" "}
          <a href="#" className="text-orange-500 underline hover:no-underline">
            Üyelik Sözleşmesi
          </a>{" "}
          ve{" "}
          <a href="#" className="text-orange-500 underline hover:no-underline">
            Gizlilik Politikası
          </a>
          ’nı okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
        </p>
      </div>
    </div>
  );
};

export default Home;

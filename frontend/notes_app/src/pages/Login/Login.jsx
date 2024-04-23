import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput ";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("올바른 이메일 부탁 드립니다.");
      return;
    }

    if (!password) {
      setError("올바른 비밀번호 부탁 드립니다.");
      return;
    }

    setError("");

    //로그인 API 불러오기
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // 로그인 API 응답

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);

        navigate("/dashboard");
      }
    } catch (error) {
      // 로그인 에러
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An Unexpected Error Occured. Please Try Again.");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input_box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn_primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              아직 가입을 안하셨나요?{" "}
              <Link to="/signUp" className="font-medium text-primary underline">
                계정을 만드시오.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

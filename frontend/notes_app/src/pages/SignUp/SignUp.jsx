import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import PasswordInput from "../../components/Input/PasswordInput ";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("이름을 입력하시오.");
      return;
    }

    if (!validateEmail(email)) {
      setError("올바른 이메일을 입력하시오.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력하시오.");
      return;
    }

    setError("");

    //회원가입 API
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      // 회원가입 API 응답

      if (response.data && response.data.ㄷㄱ객) {
        setError(response.data.message);
        return;
      }

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
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input_box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>

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
              계정 만들기
            </button>

            <p className="text-sm text-center mt-4">
              계정이 있으신가요 ?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

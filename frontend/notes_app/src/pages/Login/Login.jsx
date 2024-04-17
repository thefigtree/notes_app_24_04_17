import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input_box"
            ></input>

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

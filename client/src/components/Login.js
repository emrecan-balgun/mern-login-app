import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { usernameValidate } from "../helper/validate";

import styles from "../styles/Login.module.css";
import profileAvatar from "../assets/profile.png";

function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={profileAvatar}
                className={styles.profile_image}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                type="text"
                className={styles.textbox}
                placeholder="Username"
              />
              <button type="submit" className={styles.btn}>
                Lets' go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-red-500">
                  Register now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

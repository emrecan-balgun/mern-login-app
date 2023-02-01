import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Login.module.css";
import profileAvatar from "../assets/profile.png";

function Login() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more by connecting with us.
            </span>
          </div>
          <form action="" className="py-1">
            <div className="profile flex justify-center py-4">
              <img src={profileAvatar} className={styles.profile_image} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input type="text" className={styles.textbox} placeholder="Username" />
              <button type="submit" className={styles.btn}>Lets' go</button>
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

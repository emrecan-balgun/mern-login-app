import React, { useState } from "react";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import styles from "../styles/Login.module.css";
import extend from "../styles/Profile.module.css"
import profileAvatar from "../assets/profile.png";

function Profile() {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || profileAvatar}
                  className={`${styles.profile_image} ${extend.profile_image}`}
                  alt="avatar"
                />
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={onUpload}
                />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex flex-col w-3/4 gap-10">
                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    className={`${styles.textbox} ${extend.textbox}`}
                    placeholder="First name"
                  />
                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    className={`${styles.textbox} ${extend.textbox}`}
                    placeholder="Last name"
                  />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input
                    {...formik.getFieldProps("mobile")}
                    type="text"
                    className={`${styles.textbox} ${extend.textbox}`}
                    placeholder="Mobile"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    type="text"
                    className={`${styles.textbox} ${extend.textbox}`}
                    placeholder="Email"
                  />
                </div>

                <input
                  {...formik.getFieldProps("address")}
                  type="text"
                  className={`${styles.textbox} ${extend.textbox}`}
                  placeholder="Address"
                />
                <button type="submit" className={styles.btn}>
                  Sign In
                </button>
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{" "}
                <button className="text-red-500">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

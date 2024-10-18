import React, { useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    gender: "",
    branch: "",
    collegeName: "",
    yearOfStudy: "",
    emailId: "",
    password: "",
    city: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="container heading ">
        <h2 className="container text-3xl p-2 mx-auto flex justify-center">
          Sign up
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container p-8 border-2 w-2/4 mx-auto"
      >
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="" className="">
            Name :
          </label>
          <input
            type="text"
            placeholder=""
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className=" border-2 rounded h-8"
          />
          {}
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="" className="">
            Username :
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder=""
            className=" border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">Gender :</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder=""
            className=" border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">branch :</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className=" border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">College name :</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className=" border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">Year of study :</label>
          <input
            type="text"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            className="border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">Email id :</label>
          <input
            type="text"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-col">
          <label htmlFor="">Password : </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 rounded h-8"
          />
        </div>
        <div className="my-3 text-sm flex flex-row justify-around">
          <div className="city flex flex-col">
            <label htmlFor="">city : </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border-2 rounded h-8 "
            />
          </div>
          <div className="mob flex flex-col">
            <label htmlFor="">Mobile number : </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="border-2 rounded h-8 "
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-sky-700 p-2 text-white rounded-3xl flex justify-center w-80 mt-4">
            Signup
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;

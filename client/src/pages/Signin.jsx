import React, { useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="container p-8 border-2 w-2/4 mx-auto"
      >
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
          <label htmlFor="">Password :</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=""
            className=" border-2 rounded h-8"
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-sky-700 p-2 text-white rounded-3xl flex justify-center w-80 mt-4">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;

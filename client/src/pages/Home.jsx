import React from "react";
import Icons from "../component/Icons";
const Home = () => {
  return (
    <div className="flex justify-between h-screen p-4 gap-2">
      <div className="div1 border-2 w-[30%] p-2">
        <div className="profile flex flex-col p-2">
          <img
            src="../public/img.jpg"
            className="w-10 h-10 rounded-full"
            alt=""
          />

          <h3 className="text-xl">Sahil yuvraj kamble</h3>
          <p>College name</p>
        </div>

        <div className="btns flex justify-between gap-2">
          <button className="bg-sky-700 p-2 text-white rounded">Profile</button>
          <button className="bg-sky-700 p-2 text-white rounded">
            Edit profile
          </button>
        </div>
        <button className="bg-sky-700 p-2 text-white rounded mt-4">
          Upload Notes
        </button>
        <button className="bg-sky-700 p-2 text-white rounded ">Logout</button>
      </div>
      <div className="div2 border-2 w-[70%] p-2 flex flex-col">
        <div className="flex gap-2">
          <img
            src="./public/img.jpg"
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <input
            type="text"
            className="border-2 rounded-full p-2 w-[100%]"
            placeholder="You can search here"
          />
        </div>

        <div className="flex flex-row gap-4 p-4">
          <img
            src="../public/img2.jpg"
            className="w-12 h-12 rounded-full "
            alt=""
          />
          <div className="flex flex-col">
            <h3 className="text-xl">Rupanjan de</h3>
            <p>IIT Roorkee</p>
          </div>
        </div>
        <p className="ml-6">Title of the post will be here</p>
        <p className="ml-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem libero
          nostrum aliquam! Eligendi eius ut laboriosam quae consequatur debitis
          minus, accusamus earum et? Pariatur officiis soluta autem sapiente
          velit laudantium provident? Porro incidunt illo eius ipsa veniam
          accusamus alias quidem, harum ipsum reprehenderit dolore ad ab amet
          possimus ullam ut!
        </p>
        <div className="p-4">
          <Icons />
        </div>
      </div>
    </div>
  );
};

export default Home;

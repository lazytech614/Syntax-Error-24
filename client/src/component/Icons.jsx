import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { LuDownload } from "react-icons/lu";
import { BiCommentDetail } from "react-icons/bi";

const Icons = () => {
  return (
    <div>
      <div className="flex justify-evenly gap-6 ">
        <AiOutlineLike className="cursor-pointer " size={30} />
        <AiOutlineDislike className="cursor-pointer" size={30} />
        <LuDownload className="cursor-pointer" size={30} />
        <BiCommentDetail className="cursor-pointer" size={30} />
      </div>
    </div>
  );
};

export default Icons;

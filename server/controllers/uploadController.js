import User from "../models/userModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadFile = async (req, res) => {
  //   const user = await User.findById(req.params.id);
  //   user.profilePic = req.file.filename;
  //   await user.save();
  //   res.status(200).json({ profilePic: req.file.filename });
};

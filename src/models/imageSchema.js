import mongoose from "mongoose";

const ImageDetailSchema = new mongoose.Schema(
  {
    image_url: {
      type: String,
      require: true,
    },
    public_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.model("ImageDetails", ImageDetailSchema);

export default Images;

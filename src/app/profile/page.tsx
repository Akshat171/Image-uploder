"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  //All states
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<
    { image_url: string; public_id: string; _id: string }[]
  >([]);

  //Posting all images
  const postDetails = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  //Fetching all the images
  const FetchAllImages = async () => {
    try {
      const {
        data: { images },
      } = await axios.get("/api/upload-image");
      setImages(images);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //Fetching all images on home whenever there is updating happen on page
  useEffect(() => {
    FetchAllImages();
  }, []);

  //Submission of the form
  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //preventing page to reload whenever submit button is clicked
    try {
      if (!image) {
        return;
      }

      //storing in form format
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("/api/upload-image", formData);
      await FetchAllImages();
    } catch (error) {
      console.log("Error", error);
    }
  };

  //On deleting Image
  const onDeleteImage = async (e: string) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        "/api/upload-image/" + e.replace("nextjs-imagegallery/", "") //we because our path of public_id is nextjs-imagegallery/tyuy34y74g43 so we have to replace nextjs-imagegallery/ from " " to get specific Id
      );
      await FetchAllImages();

      console.log({ data });
    } catch (error: any) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      window.location.href = `/login`;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen  py-2 gap-3 ">
      <form
        onSubmit={onSubmitForm}
        className="grid w-full max-w-xs items-center gap-1.5 flex-row"
      >
        <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Picture
        </label>
        <input
          className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
          type="file"
          accept="image/*"
          onChange={postDetails}
          id="picture"
        />
        <button className="w-20 h-10 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out">
          <span className="font-medium text-[#333] group-hover:text-white">
            Upload
          </span>
        </button>
      </form>

      <div className="px-10 flex flex-wrap gap-x-5">
        {images.map((cur, i) => {
          return (
            <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={cur.image_url}
                />
              </a>
              <div className="mt-4">
                <button
                  disabled={loading}
                  onClick={() => onDeleteImage(cur.public_id)}
                  className="bg-black text-white rounded-sm px-5 py-2 disabled:bg-gray-600"
                >
                  {loading ? "loading..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="w-20 h-10 bg-white cursor-pointer rounded-3xl border-2 border-[#16121a] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
      >
        <span className="font-medium text-[#333] group-hover:text-white">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Home;

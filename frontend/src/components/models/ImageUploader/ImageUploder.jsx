import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

const ImageUploderx = () => {
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);



    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/upload/images",
                    { withCredentials: true }
                );
               console.log(res)
                if (res.data.success) {
                    setImageUrl(res.data.imageUrl);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchImage();
    }, []);


    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8080/api/upload/image",
                formData,
                { withCredentials: true }
            );

            // 👇 upload ke baad fresh image fetch
            const res = await axios.get(
                "http://localhost:8080/api/upload/images",
                { withCredentials: true }
            );

            if (res.data.success) {
                setImageUrl(res.data.imageUrl);
            }

        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setLoading(false);
        }
    };


  const handleFileChange = (e) => {
    if (loading) return;

    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    handleUpload(file);
  };

  return (
    <div className="relative group cursor-pointer">

      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="avatarUpload"
        onChange={handleFileChange}
        disabled={loading}
      />

      {/* Glow */}
      <div className="
        absolute inset-0 rounded-full
        bg-gradient-to-r from-indigo-500 to-pink-500
        blur-lg opacity-70
        group-hover:opacity-100 transition" />

      <label htmlFor="avatarUpload" className="relative block">

        <img
          src={
            preview
              ? preview
              : imageUrl
                ? imageUrl
                : "https://i.pravatar.cc/300"
          }
          className="
            w-40 h-40 rounded-full
            border-4 border-black
            relative z-10
            group-hover:scale-105 transition
          "
        />

        {/* Overlay */}
        <div className={`
          absolute inset-0
          rounded-full
          bg-black/70
          flex items-center justify-center
          transition
          z-20
          ${loading ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}>

          {loading ? (
            <div className="flex flex-col items-center gap-2">

              <div className="relative w-12 h-12">
                <div className="
                  w-full h-full
                  border-4 border-indigo-500 border-t-transparent
                  rounded-full animate-spin
                "></div>

                <div className="
                  absolute inset-0 rounded-full
                  bg-indigo-500 blur-lg opacity-30
                "></div>
              </div>

              <span className="text-xs text-indigo-400">
                Uploading...
              </span>
            </div>
          ) : (
            <div className="
              flex flex-col items-center gap-1
              text-indigo-400
              transition-all duration-300
              hover:scale-110
              hover:text-indigo-300
            ">

              <div className="
                p-3 rounded-full
                bg-indigo-500/10
                shadow-lg
                hover:shadow-indigo-500/50
                transition
              ">
                <FaUpload size={36} />
              </div>

              <span className="
                text-xs font-semibold
                tracking-wide
                opacity-80
              ">
                Upload Photo
              </span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUploderx;

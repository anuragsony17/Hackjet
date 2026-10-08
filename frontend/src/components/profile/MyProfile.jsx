import React, { useEffect, useState } from "react";
import {
    FaEdit,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaStar,
    FaMedal
} from "react-icons/fa";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { selectLoggedInUser } from "../auth/authSlices";
import {  useSelector } from 'react-redux';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TopBar from "../models/topbar/TopBar";
import axios from "axios";
import { toast } from "react-toastify";
import ImageUploderx from "../models/ImageUploader/ImageUploder";

const MyProfilePro = () => {

    const user = useSelector(selectLoggedInUser);
    const solved = user?.solvedProblems?.length || 0;
    const liked = user?.likedProblems?.length || 0;
    const starred = user?.starredProblems?.length || 0;

    const total = solved + liked + starred;
    const percent = total ? Math.round((solved / total) * 100) : 0;
   
    const [reaction, setReaction] = useState({
        liked: 0,
        disliked: 0,
        starred: 0,
        solved: 0,
        percent: 0,
    });

    const userId = user?._id;
    // MODAL STATE
   

    const [profile, setProfile] = useState({
        displayName: "",
        email: "",
        role: "",
        bio: "",
        location: "",
        skills: [],
        socialLinks: { github: "", linkedin: "", twitter: "" },
    });

    const [open, setOpen] = useState(false);
    const [tempProfile, setTempProfile] = useState(profile);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8080/user/profile", { withCredentials: true });
                setProfile(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch profile 😢");
            }
        };

        fetchProfile();
    }, []);
   

    const handleSave = async () => {
        try {
            const payload = {
                displayName: tempProfile.displayName,
                bio: tempProfile.bio,
                location: tempProfile.location,
                skills: tempProfile.skills, // ✅ array
                socialLinks: {
                    github: tempProfile.socialLinks?.github || "",
                    linkedin: tempProfile.socialLinks?.linkedin || "",
                    twitter: tempProfile.socialLinks?.twitter || "",
                },
            };

            const res = await axios.put(
                "http://localhost:8080/user/profile",
                payload,
                { withCredentials: true }
            );

            setProfile(res.data.profile);
            setOpen(false);
            toast.success("Profile updated successfully ✅");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update profile 😢");
        }
    };



  

 

    const TARGET = 50; // total problems goal

    useEffect(() => {
        const fetchReaction = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8080/user/reaction",
                    { withCredentials: true }
                );

                const user = res.data;

                const solved = user.solvedProblems.length;

                // Activity percent
                const percent = Math.min(
                    Math.round((solved / TARGET) * 100),
                    100
                );

                setReaction({
                    liked: user.likedProblems.length,
                    disliked: user.dislikedProblems.length,
                    starred: user.starredProblems.length,
                    solved: solved,
                    percent: percent, // 👈 add
                });

            } catch (err) {
                console.log(err);
            }
        };

        fetchReaction();
    }, []);



    

    console.log(reaction)
    console.log (profile)

    return (
<>

        <TopBar/>
        <div className="min-h-screen bg-[#07070c] text-white">

            {/* COVER */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto -mt-24 px-6">

                <div className="
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        rounded-[32px] p-10
        shadow-[0_0_60px_rgba(99,102,241,0.25)]
        ">

                    {/* TOP */}
                        <div className="flex flex-col md:flex-row items-start gap-10">

                            {/* Avatar */}
                            <ImageUploderx/>

                            {/* Info */}
                            <div className="flex-1">

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h1 className="text-4xl font-extrabold">
                                            {profile.displayName}
                                        </h1>

                                        <p className="text-indigo-400 mt-1 font-medium">
                                            {profile.bio}
                                        </p>

                                        <div className="flex gap-4 mt-3 text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <FaEnvelope /> {profile.email}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt /> {profile.location}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setTempProfile(profile);
                                            setOpen(true);
                                        }}
                                        className="flex items-center gap-2 px-8 py-3 rounded-xl 
        bg-gradient-to-r from-indigo-500 to-purple-500 
        hover:scale-105 transition shadow-lg text-sm font-semibold"
                                    >
                                        <FaEdit />
                                        Edit Profile
                                    </button>
                                </div>

                                {/* SOCIAL */}
                                <div className="flex gap-3 mt-5">
                                    <Social icon={<FaGithub />} link={profile.socialLinks?.github} />
                                    <Social icon={<FaLinkedin />} link={profile.socialLinks?.linkedin} />
                                    <Social icon={<FaTwitter />} link={profile.socialLinks?.twitter} />
                                </div>

                                {/* SKILLS */}
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {profile.skills?.map((s) => (
                                        <span
                                            key={s}
                                            className="px-4 py-1.5 rounded-full 
          bg-indigo-500/10 border border-indigo-500/30"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        </div>


                    {/* STATS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                            <Stat
                                title="Dislike"
                                value={reaction.disliked}
                                icon={<FaRegThumbsDown />}
                                desc="Problems you marked as disliked"
                            />
                            <Stat
                                title="Starred"
                                value={reaction.starred}
                                icon={<FaStar />}
                                desc="Problems you marked as important or starred"
                            />
                            <Stat
                                title="Liked"
                                value={reaction.liked}
                                icon={<FaRegThumbsUp />}
                                desc="Problems you marked as liked or interesting"
                            />
                            <Stat
                                title="Activity"
                                icon={
                                    <CircularProgressbar
                                        value={reaction.percent}
                                        text={`${reaction.percent}%`}
                                        styles={buildStyles({
                                            textColor: "#fff",
                                            pathColor: "#6366f1",
                                            trailColor: "#1f2937"
                                        })}
                                    />
                                }
                                desc={`Solved ${reaction.solved} / ${TARGET} problems`}

                            />



                    </div>

                    {/* LEVEL */}
                    <div className="mt-10">
                        <p className="text-sm text-gray-400 mb-2">
                            Level 7 • XP 780 / 1000
                        </p>

                        <div className="h-3 rounded-full bg-neutral-800">
                            <div
                                className="
                h-full rounded-full
                bg-gradient-to-r from-indigo-500 to-pink-500
                w-[78%]
                shadow-lg"
                            />
                        </div>
                    </div>

                    {/* ACHIEVEMENTS */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold mb-5">
                            🏆 Achievements
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6">

                            <Achievement
                                title="100+ Problems"
                                desc="Consistency unlocked"
                            />

                            <Achievement
                                title="Top 10%"
                                desc="Global ranking"
                            />

                            <Achievement
                                title="Contest Winner"
                                desc="Weekly champion"
                            />
                        </div>

                        <div className="mt-10">
                            <h3 className="text-xl font-semibold mb-4">
                                📊 Recent Activity
                            </h3>

                            <Timeline
                                text="Solved Two Sum Problem"
                                time="2 hours ago"
                            />
                            <Timeline
                                text="Participated in Weekly Contest"
                                time="Yesterday"
                            />
                            <Timeline
                                text="Upgraded to Premium"
                                time="3 days ago"
                            />
                        </div>



                    </div>

                </div>
            </div>
                {open && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-neutral-900 p-8 rounded-2xl w-[420px]">

                            <h2 className="text-xl font-bold mb-5">
                                Edit Profile
                            </h2>

                            {/* NAME */}
                            <input
                                value={tempProfile.displayName}
                                onChange={(e) =>
                                    setTempProfile({ ...tempProfile, displayName: e.target.value })
                                }
                                className="w-full p-3 mb-3 rounded bg-black border"
                                placeholder="Name"
                            />

                            {/* BIO */}
                            <input
                                value={tempProfile.bio}
                                onChange={(e) =>
                                    setTempProfile({ ...tempProfile, bio: e.target.value })
                                }
                                className="w-full p-3 mb-3 rounded bg-black border"
                                placeholder="Bio (Role)"
                            />

                            {/* LOCATION */}
                            <input
                                value={tempProfile.location}
                                onChange={(e) =>
                                    setTempProfile({ ...tempProfile, location: e.target.value })
                                }
                                className="w-full p-3 mb-3 rounded bg-black border"
                                placeholder="Location"
                            />

                            {/* SKILLS */}
                          <input
                                value={tempProfile.skills.join(",")}
                                onChange={(e) =>
                                    setTempProfile({
                                        ...tempProfile,
                                        skills: e.target.value.split(",").map(s => s.trim()),
                                    })
                                }
                                className="w-full p-3 mb-3 rounded bg-black border"
                                placeholder="Skills (comma separated)"
                            />  
                          





                            {/* SOCIAL LINKS */}
                            {["github", "linkedin", "twitter"].map((platform) => (
                                <input
                                    key={platform}
                                    value={tempProfile.socialLinks?.[platform] || ""}
                                    onChange={(e) =>
                                        setTempProfile({
                                            ...tempProfile,
                                            socialLinks: {
                                                ...tempProfile.socialLinks,
                                                [platform]: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full p-3 mb-3 rounded bg-black border"
                                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                />
                            ))}


                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2 rounded bg-gray-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2 rounded bg-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    
                )}

        </div>
        </>
    );
};

/* Components */

const Social = ({ icon, link }) => {
    if (!link) return null; // agar link empty ho to icon bhi hide

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
        p-3 rounded-full
        bg-neutral-900
        hover:bg-indigo-600
        hover:scale-110
        transition cursor-pointer
      "
        >
            {icon}
        </a>
    );
};


const Stat = ({ title, value, icon, desc }) => (
    <div className="
    bg-neutral-900/90
    p-8
    rounded-3xl
    border border-white/10
    shadow-lg
    hover:shadow-indigo-500/50
    hover:scale-105
    transition-all duration-300
    flex flex-col items-center justify-center
    min-h-[160px]
  ">
        <div className="flex flex-col items-center gap-2 mb-4">
            <div className="text-3xl text-indigo-400">{icon}</div>
            <p className="text-gray-400 font-medium text-lg">{title}</p>
        </div>

        <h3 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent mb-2">
            {value}
        </h3>

        {desc && (
            <p className="text-sm text-gray-400 text-center">
                {desc}
            </p>
        )}
    </div>
);

const Achievement = ({ title, desc }) => (
    <div className="
  p-6 rounded-2xl
  bg-neutral-900
  border border-indigo-500/20
  hover:scale-105 hover:border-indigo-500
  transition shadow-xl">

        <FaMedal className="text-indigo-400 text-xl mb-2" />
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);

const Timeline = ({ text, time }) => (
    <div className="flex items-start gap-4 mb-3">
        <span className="w-3 h-3 bg-indigo-500 rounded-full mt-1" />
        <div>
            <p>{text}</p>
            <p className="text-xs text-gray-400">{time}</p>
        </div>
    </div>
);



export default MyProfilePro;




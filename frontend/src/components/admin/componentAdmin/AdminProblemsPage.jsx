import { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";

/* ================= DEFAULT FORM STATE ================= */
const defaultProblem = {
    title: "",
    category: "",
    difficulty: "Easy",
    problemToSend: "", // Problem collection ka ObjectId
    videoId: "",
  
};

const AdminAddProblemPage = ({ problem = null, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(defaultProblem);

    /* ================= EDIT MODE ================= */
    useEffect(() => {
        if (problem) {
            setFormData({
                title: problem.title || "",
                category: problem.category || "",
                difficulty: problem.difficulty || "Easy",
                problemToSend: problem.problemToSend || "",
                videoId: problem.videoId || "",
            });
        }
    }, [problem]);

          
    console.log(formData);



    /* ================= HANDLE CHANGE ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /* ================= HANDLE SUBMIT ================= */
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const payload = {
    //             title: formData.title.trim(),
    //             category: formData.category.trim(),
    //             difficulty: formData.difficulty,
    //             problemToSend: formData.problemToSend, // ObjectId string
    //             videoId: formData.videoId,
    //         };

    //         const token =
    //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWU1MzdmN2I0M2FlNjJkOGU5MmMwOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY3ODA1MTczfQ.iAYJsv_dyQHR_Tn2qBeTa38PCZhOAq7RelwvLrFHC_E";
    // console.log(token);
    //         const res = await fetch("http://localhost:8080/api/problem-table", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`, // ✅ single space
    //             },
    //             body: JSON.stringify(payload),
    //         });

         
     
           
    //         const data = await res.json();
    //         console.log(data);

    //         if (!res.ok) {
    //             console.error("❌ Error creating problem:", data);
    //             alert(data.message || "Something went wrong");
    //             return;
    //         }

    //         console.log("✅ Problem created:", data);
    //         alert("Problem added successfully 🚀");

    //         // reset form
    //         setFormData(defaultProblem);
    //     } catch (error) {
    //         console.error("❌ Network error:", error);
    //         alert("Server error");
    //     }
    // };

    /* ================= HANDLE SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                title: formData.title.trim(),
                category: formData.category.trim(),
                difficulty: formData.difficulty,
                problemToSend: formData.problemToSend, // ObjectId string
                videoId: formData.videoId,
            };

            const res = await fetch("http://localhost:8080/api/problem-table", {
                method: "POST",
                credentials: "include", // 🔥 MOST IMPORTANT (cookie bhejne ke liye)
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                console.error("❌ Error creating problem:", data);
                alert(data.message || "Something went wrong");
                return;
            }

            console.log("✅ Problem created:", data);
            alert("Problem added successfully 🚀");

            // reset form
            setFormData(defaultProblem);
        } catch (error) {
            console.error("❌ Network error:", error);
            alert("Server error");
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex-1 ml-64 bg-gray-100 py-4 px-4">
                <div className="max-w-[95%] mx-auto space-y-8">

                    {/* ================= HEADER ================= */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl px-10 py-8">
                        <h1 className="text-4xl font-extrabold text-white">
                            Admin Panel 👋
                        </h1>
                        <p className="mt-2 text-white/80 text-lg">
                            Add or manage problem listings
                        </p>
                    </div>

                    {/* ================= FORM CARD ================= */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                            <h3 className="text-3xl font-extrabold text-white text-center">
                                {problem ? "Edit" : "Add"} Problem (Listing)
                            </h3>
                            <p className="text-center text-indigo-100 mt-2 text-sm">
                                Only listing-level data is required here
                            </p>
                        </div>

                        <div className="p-8">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-6 bg-white p-8 rounded-3xl shadow-xl border"
                            >
                                {/* ================= HEADER ================= */}
                                <div className="text-center">
                                    <h2 className="text-2xl font-extrabold text-gray-800">
                                        {problem ? "Update Problem" : "Add New Problem"}
                                    </h2>
                                    <p className="text-gray-500 mt-1 text-sm">
                                        Fill all details carefully before submitting
                                    </p>
                                </div>

                                {/* ================= TITLE & CATEGORY ================= */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* TITLE */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Problem Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title ?? ""}
                                            onChange={handleChange}
                                            placeholder="e.g. Merge Two LIST"
                                            className="w-full border border-gray-300 rounded-xl p-3
        placeholder-gray-400 text-gray-800 bg-white
        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition"
                                            required
                                        />
                                    </div>

                                    {/* CATEGORY */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category ?? ""}
                                            onChange={handleChange}
                                            placeholder="Array, DP, Graph..."
                                            className="w-full border border-gray-300 rounded-xl p-3
        placeholder-gray-400 text-gray-800 bg-white
        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* ================= DIFFICULTY ================= */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl p-3
      text-gray-800 bg-white
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      transition"
                                    >
                                        <option value="Easy">🟢 Easy</option>
                                        <option value="Medium">🟡 Medium</option>
                                        <option value="Hard">🔴 Hard</option>
                                    </select>
                                </div>

                                {/* ================= PROBLEM REFERENCE ================= */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Problem Reference (MongoDB ObjectId)
                                    </label>
                                    <input
                                        type="text"
                                        name="problemToSend"
                                        value={formData.problemToSend ?? ""}
                                        onChange={handleChange}
                                        placeholder="e.g. 665c9f1d12ab34567890abcd"
                                        className="w-full border border-gray-300 rounded-xl p-3
      placeholder-gray-400 text-gray-800 bg-white
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      transition"
                                        required
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        This should match the Problem collection `_id`
                                    </p>
                                </div>

                                {/* ================= VIDEO ================= */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        YouTube Video ID <span className="text-gray-400">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="videoId"
                                        value={formData.videoId ?? ""}
                                        onChange={handleChange}
                                        placeholder="e.g. xty7fr-k0TU"
                                        className="w-full border border-gray-300 rounded-xl p-3
      placeholder-gray-400 text-gray-800 bg-white
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      transition"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        Paste only the YouTube video ID (not full link)
                                    </p>
                                </div>

                                {/* ================= BUTTONS ================= */}
                                <div className="flex justify-end gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 rounded-xl bg-gray-200 text-gray-800
      hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-8 py-2 rounded-xl bg-indigo-600 text-white
      hover:bg-indigo-700 transition shadow-lg"
                                    >
                                        {problem ? "Update Problem" : "Add Problem"}
                                    </button>
                                </div>
                            </form> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminAddProblemPage;

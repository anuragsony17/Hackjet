import AdminSidebar from "./AdminSidebar";
import AdminHeroCarousel from "./AdminHeroCarousel";
import { useState } from "react";
import GraphSection from "./componentAdmin/GraphSection";

const dummyProblems = [
    { _id: 1, title: "Two Sum", category: "Array", difficulty: "Easy", likes: 120, dislikes: 5, createdAt: "2025-12-20" },
    { _id: 2, title: "Longest Substring Without Repeating Characters", category: "String", difficulty: "Medium", likes: 90, dislikes: 10, createdAt: "2025-12-18" },
    { _id: 3, title: "Median of Two Sorted Arrays", category: "Array", difficulty: "Hard", likes: 70, dislikes: 15, createdAt: "2025-12-19" },
];

const AdminDashboard = () => {
    const [problems, setProblems] = useState(dummyProblems);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this problem?")) {
            setProblems(prev => prev.filter(p => p._id !== id));
        }
    };

  

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <AdminSidebar />


            {/* Main Content */}
            <div className="flex-1 ml-64 bg-gray-100 py-2 px-1">

                {/* WRAPPER – controls width */}
                <div className="max-w-full mx-auto space-y-8">
                {/* Top Banner */}
                    <div className="bg-gradient-to-r w-[95%] mx-auto from-indigo-600 to-purple-600
                    rounded-3xl shadow-2xl px-10 py-8">
                        <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
                        <p className="mt-2 text-white/90">Manage problems, users, and platform analytics</p>

                    </div>
              
                <div className="px-8 p-6 mt-2 pb-6">
                    <h2 className="text-3xl font-extrabold mb-7 text-gray-800">📊 Problem Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Total Problems */}
                        <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">📚</div>
                            <h3 className="text-sm uppercase tracking-widest opacity-80">Total Problems</h3>
                            <h2 className="text-5xl font-extrabold mt-3">{problems.length}</h2>
                        </div>

                        {/* Most Liked */}
                        <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">👍</div>
                            <h3 className="text-sm uppercase tracking-widest opacity-80">Most Liked</h3>
                            <h2 className="text-5xl font-extrabold mt-3">{Math.max(...problems.map(p => p.likes))}</h2>
                        </div>

                        {/* Hard Problems */}
                        <div className="relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">⚡</div>
                            <h3 className="text-sm uppercase tracking-widest opacity-80">Hard Problems</h3>
                            <h2 className="text-5xl font-extrabold mt-3">{problems.filter(p => p.difficulty === "Hard").length}</h2>
                        </div>
                    </div>
                </div>

                {/* Hero Carousel */}
                <div className="px-8 mt-2">
                    <AdminHeroCarousel />
                </div>

                {/* Problem Overview Cards */}
             

                {/* Graph Section */}
           <GraphSection/>   

                {/* Problems Table */}
                <div className="px-8 mt-12 py-10 pb-12">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-800">📝 Manage Problems</h2>

                    <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Difficulty</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Likes</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Dislikes</th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {problems.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{p.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{p.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${p.difficulty === "Easy"
                                                        ? "bg-green-100 text-green-800"
                                                        : p.difficulty === "Medium"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {p.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">{p.likes}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">{p.dislikes}</td>
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition-all">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
</div>
            </div>
        </div>
    );
};

export default AdminDashboard;



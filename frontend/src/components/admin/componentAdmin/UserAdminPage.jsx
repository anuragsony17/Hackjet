import AdminSidebar from "../AdminSidebar";
import { useState } from "react";

const dummyUsers = [
    { _id: 1, name: "Alice", email: "alice@example.com", solved: 10, liked: 5 },
    { _id: 2, name: "Bob", email: "bob@example.com", solved: 7, liked: 3 },
    { _id: 3, name: "Charlie", email: "charlie@example.com", solved: 15, liked: 12 },
];


const dummyProblems = [
    {
        _id: "p1",
        title: "Two Sum",
        category: "Array",
        difficulty: "Easy",
        likes: 120,
        dislikes: 5,
    },
    {
        _id: "p2",
        title: "Longest Substring Without Repeating Characters",
        category: "String",
        difficulty: "Medium",
        likes: 95,
        dislikes: 12,
    },
    {
        _id: "p3",
        title: "Merge Intervals",
        category: "Array",
        difficulty: "Medium",
        likes: 80,
        dislikes: 10,
    },
    {
        _id: "p4",
        title: "LRU Cache",
        category: "Design",
        difficulty: "Hard",
        likes: 65,
        dislikes: 20,
    },
    {
        _id: "p5",
        title: "Binary Tree Maximum Path Sum",
        category: "Tree",
        difficulty: "Hard",
        likes: 70,
        dislikes: 18,
    },
    {
        _id: "p6",
        title: "Valid Parentheses",
        category: "Stack",
        difficulty: "Easy",
        likes: 140,
        dislikes: 3,
    },
];


const UserAdminPage = () => {
    const [users] = useState(dummyUsers);
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );


    const totalSolved = users.reduce((s, u) => s + u.solved, 0);
    const totalLiked = users.reduce((s, u) => s + u.liked, 0);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-8">
                {/* HEADER */}
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
                    <h1 className="text-4xl font-bold">👤 Manage Users</h1>
                    <p className="mt-2 text-white/80">
                        Track user progress and engagement
                    </p>
                </div>

                {/* STATS */}
                <div className=" mt-2  pb-10 py-2">
                    <h2 className="text-3xl font-extrabold mb-7 text-gray-800">
                        📊 User Overview
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {/* Total Users */}
                        <div className="relative overflow-hidden rounded-3xl p-7
      bg-gradient-to-br from-indigo-600 to-purple-700 text-white
      shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">👤</div>

                            <h3 className="text-sm uppercase tracking-widest opacity-80">
                                Total Users
                            </h3>
                            <h2 className="text-5xl font-extrabold mt-3">
                                {users.length}
                            </h2>
                        </div>

                        {/* Problems Solved */}
                        <div className="relative overflow-hidden rounded-3xl p-7
      bg-gradient-to-br from-green-500 to-emerald-600 text-white
      shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">✅</div>

                            <h3 className="text-sm uppercase tracking-widest opacity-80">
                                Problems Solved
                            </h3>
                            <h2 className="text-5xl font-extrabold mt-3">
                                {totalSolved}
                            </h2>
                        </div>

                        {/* Problems Liked */}
                        <div className="relative overflow-hidden rounded-3xl p-7
      bg-gradient-to-br from-pink-500 to-rose-600 text-white
      shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                            <div className="absolute top-5 right-5 text-5xl opacity-30">❤️</div>

                            <h3 className="text-sm uppercase tracking-widest opacity-80">
                                Problems Liked
                            </h3>
                            <h2 className="text-5xl font-extrabold mt-3">
                                {totalLiked}
                            </h2>
                        </div>

                    </div>
                </div>



                {/* SEARCH */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md p-3 rounded-xl border text-gray-800 border-gray-300 shadow-sm
            focus:ring-2 focus:ring-indigo-400 focus:outline-none
            placeholder-gray-400 bg-white"
                    />
                </div>

                {/* TABLE */}
                {/* TABLE */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                {["User", "Email", "Solved", "Liked", "Actions"].map((h) => (
                                    <th
                                        key={h}
                                        className="px-8 py-5 text-left text-sm font-bold uppercase tracking-wider"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b hover:bg-indigo-50 transition-all"
                                >
                                    <td className="px-8 py-6 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                            {u.name[0]}
                                        </div>
                                        <span className="font-semibold text-gray-800">
                                            {u.name}
                                        </span>
                                    </td>

                                    <td className="px-8 py-6 text-gray-600">{u.email}</td>

                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                                            {u.solved}
                                        </span>
                                    </td>

                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1 rounded-full bg-pink-100 text-pink-700 font-semibold">
                                            {u.liked}
                                        </span>
                                    </td>

                                    <td className="px-8 py-6 flex gap-3">
                                        <ActionBtn color="indigo" label="View" />
                                        <ActionBtn color="red" label="Edit" />
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-10 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

/* ===== SMALL COMPONENT ===== */





const ActionBtn = ({ label, color }) => (
    <button
        className={`px-5 py-2 rounded-full bg-${color}-600 text-white font-semibold
    hover:bg-${color}-700 shadow-md hover:shadow-lg transition-all`}
    >
        {label}
    </button>
);
export default UserAdminPage;

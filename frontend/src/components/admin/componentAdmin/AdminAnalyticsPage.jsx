import AdminSidebar from "../AdminSidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const difficultyData = [
    { name: "Easy", count: 15 },
    { name: "Medium", count: 10 },
    { name: "Hard", count: 5 },
];

const likesData = [
    { name: "Two Sum", likes: 120, dislikes: 5 },
    { name: "Longest Substring", likes: 90, dislikes: 10 },
    { name: "Median Arrays", likes: 70, dislikes: 15 },
];

const AdminAnalyticsPage = () => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1 ml-64 bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-6">📊 Analytics</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Difficulty Chart */}
                    <div className="bg-white p-6 rounded-3xl shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Problems by Difficulty</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={difficultyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Likes/Dislikes Chart */}
                    <div className="bg-white p-6 rounded-3xl shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Likes vs Dislikes</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={likesData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="likes" fill="#22c55e" />
                                <Bar dataKey="dislikes" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;

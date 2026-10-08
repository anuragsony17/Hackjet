import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Prepare chart data


const problems = [
    { _id: 1, title: "Two Sum", category: "Array", difficulty: "Easy", likes: 120, dislikes: 5 },
    { _id: 2, title: "Longest Substring Without Repeating Characters", category: "String", difficulty: "Medium", likes: 90, dislikes: 10 },
    { _id: 3, title: "Median of Two Sorted Arrays", category: "Array", difficulty: "Hard", likes: 70, dislikes: 15 },
    { _id: 4, title: "Valid Parentheses", category: "Stack", difficulty: "Easy", likes: 110, dislikes: 8 },
    { _id: 5, title: "Merge Intervals", category: "Array", difficulty: "Medium", likes: 85, dislikes: 12 },
];


const GraphSection = () => {


    const difficultyData = [
        { name: "Easy", count: problems.filter(p => p.difficulty === "Easy").length },
        { name: "Medium", count: problems.filter(p => p.difficulty === "Medium").length },
        { name: "Hard", count: problems.filter(p => p.difficulty === "Hard").length },
    ];

    const likesDislikesData = problems.map(p => ({
        name: p.title.length > 15 ? p.title.slice(0, 12) + "..." : p.title,
        Likes: p.likes,
        Dislikes: p.dislikes
    }));
    return (
             <div>
{/* Graph Section */ }
<div className="px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* Problems by Difficulty */}
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Problems by Difficulty</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#4b5563" }} />
                <YAxis tick={{ fontSize: 14, fill: "#4b5563" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4f46e5" radius={[5, 5, 0, 0]} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    </div>

    {/* Likes vs Dislikes */}
    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Likes vs Dislikes</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={likesDislikesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#4b5563" }} />
                <YAxis tick={{ fontSize: 14, fill: "#4b5563" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Likes" fill="#10b981" radius={[5, 5, 0, 0]} barSize={30} />
                <Bar dataKey="Dislikes" fill="#ef4444" radius={[5, 5, 0, 0]} barSize={30} />
            </BarChart>
        </ResponsiveContainer>
    </div>
</div>
   </div >

  )
}

export default GraphSection





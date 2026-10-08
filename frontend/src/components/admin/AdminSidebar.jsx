import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-10 text-center">LeetCode Admin</h1>

            <ul className="flex flex-col gap-4">
                <li>
                    <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-indigo-500 hover:text-white transition-colors font-medium"
                    >
                        📊 Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/adminProblem"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-indigo-500 hover:text-white transition-colors font-medium"
                    >
                        📝 Problems
                    </Link>
                </li>
                <li>
                    <Link
                        to="/adminUsers"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-indigo-500 hover:text-white transition-colors font-medium"
                    >
                        👤 Users
                    </Link>
                </li>
              
                <li className="mt-auto">
                    <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors font-medium">
                        🚪 Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;

import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaPalette, FaCreditCard, FaCogs } from "react-icons/fa";

const tabs = [
    { name: "Account", icon: <FaUser /> },
    { name: "Appearance", icon: <FaPalette /> },
    { name: "Security", icon: <FaLock /> },
    { name: "Notifications", icon: <FaBell /> },
    { name: "Billing", icon: <FaCreditCard /> },
    { name: "Advanced", icon: <FaCogs /> },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState("Account");

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex">

            {/* LEFT SIDEBAR */}
            <div className="w-64 border-r border-white/10 p-5 space-y-2">
                <h2 className="text-xl font-bold mb-5">⚙ Settings</h2>

                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg
            ${activeTab === tab.name
                                ? "bg-indigo-600"
                                : "hover:bg-neutral-800"}`}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 p-8">

                {activeTab === "Account" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">👤 Account Settings</h2>

                        <div className="space-y-4 max-w-md">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-3 rounded bg-neutral-800 outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded bg-neutral-800 outline-none"
                            />

                            <button className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "Appearance" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🎨 Appearance</h2>

                        <div className="space-y-4">
                            <button className="px-4 py-2 bg-neutral-800 rounded">
                                🌙 Dark Mode
                            </button>

                            <button className="px-4 py-2 bg-neutral-800 rounded">
                                ☀ Light Mode
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "Security" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔐 Security</h2>

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full max-w-md p-3 rounded bg-neutral-800 outline-none"
                        />

                        <button className="mt-4 px-4 py-2 bg-red-600 rounded">
                            Update Password
                        </button>
                    </div>
                )}

                {activeTab === "Notifications" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔔 Notifications</h2>

                        <div className="space-y-3">
                            <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked />
                                Email Alerts
                            </label>

                            <label className="flex items-center gap-3">
                                <input type="checkbox" />
                                Contest Reminders
                            </label>
                        </div>
                    </div>
                )}

                {activeTab === "Billing" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">💳 Billing</h2>

                        <p>Current Plan: <b>FREE</b></p>

                        <button className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded">
                            Upgrade to Premium
                        </button>
                    </div>
                )}

                {activeTab === "Advanced" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🛠 Advanced</h2>

                        <button className="px-4 py-2 bg-neutral-800 rounded">
                            Clear Cache
                        </button>

                        <button className="ml-4 px-4 py-2 bg-red-600 rounded">
                            Delete Account
                        </button>
                    </div>
                )}

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
    );
};

export default Settings;


const Stat = ({ title, value, icon }) => (
    <div className="bg-neutral-900/80 p-5 rounded-xl border border-white/5">
        <div className="flex justify-between items-center">
            <p className="text-gray-400">{title}</p>
            <span className="text-indigo-400">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
);

const Achievement = ({ title, desc }) => (
    <div className="p-5 bg-neutral-900 rounded-xl border border-indigo-500/20
  hover:scale-105 transition">
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
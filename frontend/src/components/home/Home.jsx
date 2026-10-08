
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopBar from "../models/topbar/TopBar";
import ProbelmTable from "../models/problemTable/ProbelmTable";
import LoadingSkelton from "../models/Loading/LoadingSkelton";
import axios from "axios";
 import { FaFire, FaStar, FaBrain } from "react-icons/fa";

const Home = () => {
	const [problems, setProblem] = useState([]);
	const [loadingProblems, setLoadingProblems] = useState(true);

	useEffect(() => {
		const fetchProblems = async () => {
			try {
				const res = await axios.get("http://localhost:8080/problem-table", {
					withCredentials: true,
				});
				setTimeout(() => {
					setProblem(res.data.data);
					setLoadingProblems(false);
				}, 500);
			} catch (err) {
				console.error("Error fetching problems:", err);
				setTimeout(() => setLoadingProblems(false), 500);
			}
		};
		fetchProblems();
	}, []);

	return (
		<main className="bg-dark-layer-2 min-h-screen">
			<TopBar />

			{/* HERO ANIMATION */}
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="relative max-w-5xl mx-auto mt-10 px-6 py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl text-white text-center overflow-hidden"
			>
				{/* Floating blurred shapes */}
				<motion.div
					animate={{ x: ["0%", "20%", "-20%", "0%"], y: ["0%", "-10%", "10%", "0%"] }}
					transition={{ repeat: Infinity, duration: 15 }}
					className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full opacity-30 filter blur-3xl"
				/>
				<motion.div
					animate={{ x: ["0%", "-20%", "20%", "0%"], y: ["0%", "10%", "-10%", "0%"] }}
					transition={{ repeat: Infinity, duration: 20 }}
					className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500 rounded-full opacity-20 filter blur-3xl"
				/>

				{/* Floating icons */}
				<motion.div
					animate={{ y: [0, -20, 0] }}
					transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
					className="absolute top-10 left-10 text-yellow-400 text-3xl"
				>
					<FaStar />
				</motion.div>
				<motion.div
					animate={{ y: [0, -15, 0] }}
					transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
					className="absolute top-24 right-20 text-red-500 text-3xl"
				>
					<FaFire />
				</motion.div>
				<motion.div
					animate={{ y: [0, -18, 0] }}
					transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-indigo-400 text-3xl"
				>
					<FaBrain />
				</motion.div>

				{/* Heading */}
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2 }}
					className="text-4xl md:text-5xl font-extrabold mb-4 animate-pulse"
				>
					&ldquo;QUALITY OVER QUANTITY&rdquo;
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5 }}
					className="text-lg md:text-xl font-medium opacity-90 mb-6"
				>
					Solve, Learn & Master Competitive Coding
				</motion.p>

				{/* CTA Button */}
				<motion.button
					whileHover={{ scale: 1.05, rotate: 3 }}
					whileTap={{ scale: 0.95 }}
					className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold text-black shadow-lg"
				>
					Explore Problems 🚀
				</motion.button>
			</motion.div>

			{/* TABLE */}
			<div className="relative overflow-x-auto mx-auto px-6 pb-10 mt-10">
				{loadingProblems && (
					<div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
						{Array(10)
							.fill(0)
							.map((_, i) => (
								<LoadingSkelton key={i} />
							))}
					</div>
				)}
		<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>

			  {!loadingProblems && ( 
					  <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
						  <tr>
							  <th scope='col' className='px-1 py-3 w-0 font-medium'>
								  Status
							  </th>
							  <th scope='col' className='px-6 py-3 w-0 font-medium'>
								  Title
							  </th>
							  <th scope='col' className='px-6 py-3 w-0 font-medium'>
								  Difficulty
							  </th>
							  <th scope='col' className='px-6 py-3 w-0 font-medium'>
							  Category
						  </th>
						  <th scope='col' className='px-6 py-3 w-0 font-medium'>
							  Solution
						  </th>
						  </tr>
					  </thead>
				  )}
						
						
				  <ProbelmTable problems={problems} setLoadingProblems={setLoadingProblems}/>					  
					</table>
			</div>
		</main>
	);
};

export default Home;





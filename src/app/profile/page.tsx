"use client";

import Link from "next/link";

export default function ProfilePage() {
  // Example user data
  const user = {
    name: "John Doe",
    avatar: "/avatar.png", // place an image in public/
    gamesPlayed: 12,
    gamesWon: 8,
    highestScore: 100,
  };

  return (
    <main className="min-h-screen text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4 border-2 border-indigo-500"
          />
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-400 mt-1">Flip Game Player</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-center">
          <div className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-medium">Games Played</h2>
            <p className="text-2xl font-bold">{user.gamesPlayed}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-medium">Games Won</h2>
            <p className="text-2xl font-bold">{user.gamesWon}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition col-span-2">
            <h2 className="text-lg font-medium">Highest Score</h2>
            <p className="text-2xl font-bold">{user.highestScore}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const paragraphs = [
  {
    title: "Welcome Back!",
    text: "We're glad to have you here again. Your time and productivity matter, and we're committed to helping you stay on top of both. Whether you're starting your day or checking in on progress, everything you need is right at your fingertips.",
  },
  {
    title: "Manage Your Timesheets with Ease",
    text: "No more hassle or confusion—our streamlined interface lets you track your hours quickly and accurately. Edit entries, review past logs, and stay organized with just a few clicks. It's built to make your workflow smoother, not more complicated.",
  },
  {
    title: "Efficiency at Every Step",
    text: "From clock-in to final approval, every step of the timesheet process is designed for speed and clarity. Focus on your work while we handle the details, so you can spend less time tracking and more time doing what matters most.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password.");
      return;
    }
    localStorage.setItem("username", username);
    router.push("/listview");
  };

  return (
    <div className="min-h-screen flex">
   
      <div className="w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Sign in to your account</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2.5 right-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors hover:bg-indigo-800 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

 
      <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 max-w-lg"
          >
            <h1 className="text-4xl font-bold">{paragraphs[currentIndex].title}</h1>
            <p className="text-lg">{paragraphs[currentIndex].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language"); // ✅ redirect after splash
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400">
      {/* ✅ Use public folder path */}
      <img
        src="/funshiksha-logo-official.jpg"
        alt="Funshiksha Logo"
        className="w-40 h-40 object-contain mb-6"
      />
      <h1 className="text-3xl font-bold text-white">Funshiksha</h1>
      <p className="text-lg text-white opacity-80">Learning Made Fun!</p>
    </div>
  );
};

export default SplashScreen;

import React from "react";
import { Bug, Home, RefreshCw, AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const GITHUB_ISSUES_URL = "https://github.com/ibahars/AtlasAPI/issues/new";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-6 text-gray-800 dark:text-gray-100 transition-colors">
      <div className="relative w-full max-w-md h-48 mb-8 flex justify-center items-center">
        <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute left-4 top-2 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-36 -rotate-12 animate-bounce [animation-duration:3s]">
          <div className="w-8 h-2 bg-yellow-400 rounded-full mb-2" />
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        <div className="absolute right-4 bottom-2 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 w-36 rotate-12 animate-bounce [animation-duration:4s]">
          <div className="w-8 h-2 bg-green-400 rounded-full mb-2" />
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
          <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        <div className="relative z-10 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-700 w-48 text-center transform hover:scale-105 transition-transform">
          <div className="inline-flex p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-2">
            <AlertCircle size={28} />
          </div>
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            404
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
            Görev Kayboldu!
          </p>
        </div>
      </div>

      <div className="text-center max-w-md space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Aradığınız Sayfa Bulunamadı
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici
          olarak erişilemiyor olabilir.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          <Home size={18} />
          Ana Sayfaya Dön
        </button>

        <a
          href={GITHUB_ISSUES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium border border-gray-200 dark:border-gray-700 transition-all active:scale-95"
        >
          <Bug size={18} />
          Sorun Bildir
        </a>
      </div>

      <div className="mt-12 text-xs text-gray-400 dark:text-gray-600 font-semibold tracking-wider uppercase">
        ATLAS KANBAN
      </div>
    </div>
  );
};

export default NotFound;

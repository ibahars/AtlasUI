import { useState } from "react";
import AppButton from "./UI/AppButton";
import UserProfileModal from "./UserProfileModal";
import { Search } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";
import BoardSwitcher from "./BoardSwitcher";

const Navbar = ({
  onAddClick,
  onLogout,
  searchQuery,
  onSearchChange,
  boards,
  selectedBoardId,
  onSelectBoard,
  onCreateBoard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    setIsProfileOpen(true);
  };

  return (
    <nav className="dark:bg-gray-900 sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2 md:gap-4 relative">
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-extrabold text-blue-600 tracking-widest">
            ATLAS
          </h1>

          <BoardSwitcher
            boards={boards}
            selectedBoardId={selectedBoardId}
            onSelectBoard={onSelectBoard}
            onCreateBoard={onCreateBoard}
          />
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4 relative">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-gray-400  absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görev ara..."
            className="pl-9 pr-3 py-2 w-40 md:w-56 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:dark:text-white"
          />
        </div>
        <AppButton
          onClick={onAddClick}
          color={"bg-blue-600  dark:hover:bg-blue-900"}
          children={
            <>
              <span className="hidden sm:inline">+ Yeni Görev</span>
              <span className="sm:hidden">+</span>
            </>
          }
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-100  border border-blue-200 flex items-center justify-center text-blue-600 font-semibold hover:bg-blue-200 transition-colors focus:outline-none"
          >
            {user?.username?.charAt(0).toUpperCase() || "B"}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900  border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100  dark:hover:bg-gray-800  transition-colors"
              >
                Bilgilerim
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-700"
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </nav>
  );
};

export default Navbar;

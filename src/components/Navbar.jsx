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
  onRenameBoard,
  onDeleteBoard,
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
    <nav className="dark:bg-gray-900 sticky top-0 z-50 w-full bg-white border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 md:px-6 py-2.5 md:py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 relative min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <picture className="flex items-center flex-shrink-0">
            <source media="(min-width: 768px)" srcSet="/Logo.png" />

            <img
              src="/Logo-square.png"
              alt="Atlas Logo"
              className="h-6 me-4 md:h-7 w-auto object-contain"
            />
          </picture>

          <div className="min-w-0 max-w-[130px] sm:max-w-none">
            <BoardSwitcher
              boards={boards}
              selectedBoardId={selectedBoardId}
              onSelectBoard={onSelectBoard}
              onCreateBoard={onCreateBoard}
              onDeleteBoard={onDeleteBoard}
              onRenameBoard={onRenameBoard}
            />
          </div>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />
          ) : (
            <Moon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 relative flex-shrink-0">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görev ara..."
            className="pl-9 pr-3 py-2 w-40 md:w-56 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
          />
        </div>

        <AppButton
          onClick={onAddClick}
          color={"bg-blue-600 dark:hover:bg-blue-900"}
          children={
            <>
              <span className="hidden sm:inline">+ Yeni Görev</span>
              <span className="sm:hidden text-base leading-none font-bold">
                +
              </span>
            </>
          }
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs md:text-sm text-blue-600 font-semibold hover:bg-blue-200 transition-colors focus:outline-none"
          >
            {user?.username?.charAt(0).toUpperCase() || "B"}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 md:w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Bilgilerim
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors border-t border-gray-100 dark:border-gray-800"
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

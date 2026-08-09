import { useState } from "react";
import AppButton from "./UI/AppButton";
import UserProfileModal from "./UserProfileModal";
import { Search } from "lucide-react";

const Navbar = ({ onAddClick, onLogout, searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-lg md:text-xl font-extrabold text-blue-600 tracking-widest">
        ATLAS
      </h1>

      <div className="flex items-center gap-2 md:gap-4 relative">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görev ara..."
            className="pl-9 pr-3 py-2 w-40 md:w-56 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <AppButton
          onClick={onAddClick}
          color={"bg-indigo-600"}
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
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-semibold hover:bg-indigo-200 transition-colors focus:outline-none"
          >
            {user?.username?.charAt(0).toUpperCase() || "B"}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Bilgilerim
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
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

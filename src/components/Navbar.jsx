import { useState } from "react";
import AppButton from "./UI/AppButton";

const Navbar = ({ onAddClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    {
      setIsOpen(false);
      onLogout();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-bold text-indigo-600">Atlas</h1>

      <div className="flex items-center gap-4 relative">
        <AppButton
          onClick={onAddClick}
          color={"bg-indigo-600"}
          children={"+ Yeni Görev"}
        />

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-semibold hover:bg-indigo-200 transition-colors focus:outline-none"
          >
            B
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
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
    </nav>
  );
};

export default Navbar;

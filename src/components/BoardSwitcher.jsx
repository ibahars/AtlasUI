import { useState } from "react";
import { ChevronDown, Plus, Check, LayoutGrid } from "lucide-react";

const BoardSwitcher = ({
  boards,
  selectedBoardId,
  onSelectBoard,
  onCreateBoard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const selectedBoard = boards.find((b) => b.id === selectedBoardId);

  const handleSelect = (boardId) => {
    onSelectBoard(boardId);
    setIsOpen(false);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;
    await onCreateBoard(newBoardTitle.trim());
    setNewBoardTitle("");
    setIsCreating(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700  dark:text-gray-200 hover:text-gray-900  bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-lg shadow-sm transition-colors max-w-[120px] sm:max-w-none"
      >
        <LayoutGrid className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
        <span className="truncate">{selectedBoard?.title || "Board seç"}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700  rounded-lg shadow-lg py-1 z-50">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => handleSelect(board.id)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="truncate">{board.title}</span>
              {board.id === selectedBoardId && (
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
              )}
            </button>
          ))}

          <div className="border-t border-gray-100 dark:border-gray-600 mt-1 pt-1">
            {isCreating ? (
              <form onSubmit={handleCreateSubmit} className="px-2 py-1">
                <input
                  autoFocus
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  placeholder="Board adı"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Yeni Board
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardSwitcher;

import { useState } from "react";
import {
  ChevronDown,
  Plus,
  Check,
  LayoutGrid,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

const BoardSwitcher = ({
  boards,
  selectedBoardId,
  onSelectBoard,
  onCreateBoard,
  onRenameBoard,
  onDeleteBoard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [error, setError] = useState("");

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

  const startRename = (board) => {
    setRenamingId(board.id);
    setRenameValue(board.title);
    setMenuOpenFor(null);
  };

  const handleRenameSubmit = async (e, boardId) => {
    e.preventDefault();
    if (!renameValue.trim()) return;
    await onRenameBoard(boardId, renameValue.trim());
    setRenamingId(null);
  };

  const handleDelete = async (boardId) => {
    setError("");
    setMenuOpenFor(null);
    try {
      await onDeleteBoard(boardId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm transition-colors max-w-[120px] sm:max-w-none"
      >
        <LayoutGrid className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="truncate">{selectedBoard?.title || "Board seç"}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {error && (
            <div className="mx-2 mb-1 px-2 py-1.5 bg-red-50 text-red-600 text-xs rounded">
              {error}
            </div>
          )}

          {boards.map((board) => (
            <div key={board.id} className="relative">
              {renamingId === board.id ? (
                <form
                  onSubmit={(e) => handleRenameSubmit(e, board.id)}
                  className="px-2 py-1"
                >
                  <input
                    autoFocus
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => setRenamingId(null)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </form>
              ) : (
                <div className="flex items-center justify-between px-2 hover:bg-gray-100 rounded-lg mx-1">
                  <button
                    onClick={() => handleSelect(board.id)}
                    className="flex-1 flex items-center gap-2 py-2 text-sm text-gray-700 text-left min-w-0"
                  >
                    <span className="truncate">{board.title}</span>
                    {board.id === selectedBoardId && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    )}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpenFor(
                          menuOpenFor === board.id ? null : board.id,
                        )
                      }
                      className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {menuOpenFor === board.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                        <button
                          onClick={() => startRename(board)}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Yeniden Adlandır
                        </button>
                        <button
                          onClick={() => handleDelete(board.id)}
                          disabled={boards.length <= 1}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Sil
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="border-t border-gray-100 mt-1 pt-1">
            {isCreating ? (
              <form onSubmit={handleCreateSubmit} className="px-2 py-1">
                <input
                  autoFocus
                  type="text"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  placeholder="Board adı"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 transition-colors cursor-pointer"
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

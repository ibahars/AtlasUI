import { Bug, CheckSquare, Calendar, GripVertical } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onDelete, onEdit, onOpenDetail }) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-700",
    mid: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  function formatDueDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  }

  function isOverdue(dateString, status) {
    if (!dateString || status === "done") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateString) < today;
  }

  const handleCardClick = (e) => {
    if (e.target.closest(".drag-handle") || e.target.closest("button")) {
      return;
    }
    if (typeof onOpenDetail === "function") {
      onOpenDetail(task);
    }
  };

  const subtasks = task.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const progressPercent =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-pointer select-none relative"
    >
      <div className="flex justify-between items-start mb-3 gap-2">
        <div className="flex items-center gap-2">
          <div
            {...listeners}
            {...attributes}
            className="drag-handle p-1 -ml-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-grab active:cursor-grabbing rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Sürüklemek için tutun"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <span
            className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap ${
              task.type === "bug"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.type === "bug" ? (
              <>
                <Bug className="w-3.5 h-3.5 shrink-0" /> Bug
              </>
            ) : (
              <>
                <CheckSquare className="w-3.5 h-3.5 shrink-0" /> Görev
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {task.dueDate && (
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded ${
                isOverdue(task.dueDate, task.status)
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {formatDueDate(task.dueDate)}
              {isOverdue(task.dueDate, task.status) && " · Gecikti"}
            </div>
          )}

          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1 break-words hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {task.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
        {task.description}
      </p>

      {totalSubtasks > 0 && (
        <div className="mb-3 pt-1">
          <div className="flex justify-between items-center text-[11px] font-medium text-gray-500 dark:text-gray-400 mb-1.5">
            <span>Alt Görevler</span>
            <span>
              {completedSubtasks}/{totalSubtasks} (%{progressPercent})
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent === 100 ? "bg-green-500" : "bg-blue-600"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 border-t dark:border-gray-700 pt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onOpenDetail === "function") {
              onOpenDetail(task);
            }
          }}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

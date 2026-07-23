import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onDelete, onEdit }) => {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, touchAction: "none" }}
      {...listeners}
      {...attributes}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase tracking-wider">
          {task.type === "bug" ? "Bug" : "Görev"}
        </span>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <h3 className="font-bold text-gray-800 mb-1 break-words">{task.title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
        {task.description}
      </p>

      <div className="flex justify-end gap-2 border-t pt-3 transition-opacity">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(task)}
          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

import { useDroppable } from "@dnd-kit/core";
import { Inbox } from "lucide-react";
import TaskCard from "./Taskcard";

const TaskColumn = ({ tasks, title, onDelete, onEdit, status, color }) => {
  const filteredTasks = tasks.filter((t) => t.status === status);

  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`w-full md:w-80 md:flex-1 rounded-xl p-4 flex flex-col border transition-colors ${
        isOver
          ? "bg-indigo-50 border-indigo-300"
          : "bg-gray-100 border-gray-200"
      }`}
    >
      <h2 className="font-semibold text-gray-700 mb-4 flex items-center">
        <span className={`w-2 h-2 ${color} rounded-full mr-2`}></span>
        {title}
      </h2>
      <div className="flex-1 space-y-4">
        <div className="space-y-3 min-h-[60px]">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10 px-4 text-gray-400">
              <Inbox className="w-8 h-8 mb-2" strokeWidth={1.5} />
              <p className="text-sm">Henüz {title.toLowerCase()} yok</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskColumn;

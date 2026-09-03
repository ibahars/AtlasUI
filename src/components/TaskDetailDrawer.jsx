import { useState, useEffect } from "react";
import { X, Plus, CheckSquare, Square, Trash2, Check } from "lucide-react";

const TaskDetailDrawer = ({
  isOpen,
  onClose,
  task,
  onUpdateTask,
  onAddSubTask,
  onToggleSubTask,
  onDeleteSubTask,
}) => {
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [isSubmittingSubTask, setIsSubmittingSubTask] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "task",
    status: "todo",
    priority: "mid",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        type: task.type || "task",
        status: task.status || "todo",
        priority: task.priority || "mid",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateTaskSubmit = async (e) => {
    e.preventDefault();
    await onUpdateTask({
      ...task,
      ...formData,
    });
    onClose();
  };

  const handleAddSubTask = async (e) => {
    e.preventDefault();
    if (!subTaskTitle.trim()) return;

    try {
      setIsSubmittingSubTask(true);
      await onAddSubTask(task.id, subTaskTitle.trim());
      setSubTaskTitle("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingSubTask(false);
    }
  };

  const subtasks = task.subtasks || [];
  const completedCount = subtasks.filter((s) => s.completed).length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full h-full md:h-auto md:max-h-[88vh] md:max-w-2xl bg-white dark:bg-gray-800 md:rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden">
        <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Görev Detayları
          </h2>
          <div className="flex items-center gap-2">
            <button
              form="task-edit-form"
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <form
            id="task-edit-form"
            onSubmit={handleUpdateTaskSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Başlık
              </label>
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tür
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="bug">Bug</option>
                  <option value="task">Görev</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="todo">Yapılacak</option>
                  <option value="progress">Devam Edilen</option>
                  <option value="done">Tamamlandı</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Öncelik
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="low">Düşük</option>
                  <option value="mid">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Son Tarih
              </label>
              <input
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </form>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                Alt Görevler ({completedCount}/{subtasks.length})
              </h3>
            </div>

            <form onSubmit={handleAddSubTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={subTaskTitle}
                onChange={(e) => setSubTaskTitle(e.target.value)}
                placeholder="Yeni alt görev ekle..."
                className="flex-1 px-3.5 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmittingSubTask || !subTaskTitle.trim()}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Ekle
              </button>
            </form>

            <div className="space-y-2">
              {subtasks.length === 0 ? (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic py-2">
                  Henüz bir alt görev eklenmemiş.
                </p>
              ) : (
                subtasks.map((st) => (
                  <div
                    key={st.id}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors group"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleSubTask(st.id, !st.completed)}
                      className="flex items-center gap-2.5 flex-1 text-left"
                    >
                      {st.completed ? (
                        <CheckSquare className="w-4 h-4 text-green-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
                      )}
                      <span
                        className={`text-sm break-all ${
                          st.completed
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {st.title}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteSubTask(st.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 rounded transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailDrawer;

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Taskmodal from "../components/Taskmodal";
import TaskCard from "../components/Taskcard";
import StatsBoard from "../components/StatsBoard";
import TaskColumn from "../components/TaskColumn";
import { logoutUser } from "../services/authService";
import {
  fetchTasks,
  createTask,
  updateTaskApi,
  deleteTaskApi,
} from "../services/taskService";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const Home = ({ onLogoutSuccess }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const addTask = async (newTask) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const updateTask = async (updatedTask) => {
    try {
      const savedTask = await updateTaskApi(updatedTask.id, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === savedTask.id ? savedTask : task)),
      );
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      await updateTaskApi(taskId, { ...task, status: newStatus });
    } catch (err) {
      console.error(err);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: task.status } : t)),
      );
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    }),
  );
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("user");
    onLogoutSuccess();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onLogout={handleLogout} onAddClick={() => setIsModalOpen(true)} />

      <div className="hidden md:block">
        <StatsBoard tasks={tasks} />
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full md:min-w-full md:justify-between">
            <TaskColumn
              tasks={tasks}
              title={"Yapılacaklar"}
              onDelete={deleteTask}
              onEdit={handleEditClick}
              status={"todo"}
              color={"bg-yellow-400"}
            />
            <TaskColumn
              tasks={tasks}
              title={"Devam Edilenler"}
              onDelete={deleteTask}
              onEdit={handleEditClick}
              status={"progress"}
              color={"bg-blue-400"}
            />
            <TaskColumn
              tasks={tasks}
              title={"Tamamlananlar"}
              onDelete={deleteTask}
              onEdit={handleEditClick}
              status={"done"}
              color={"bg-green-400"}
            />
          </div>
        </main>
      </DndContext>

      <Taskmodal
        key={editingTask ? editingTask.id : "new"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Home;

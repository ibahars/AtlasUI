import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Taskmodal from "../components/Taskmodal";
import TaskCard from "../components/Taskcard";
import StatsBoard from "../components/StatsBoard";
import TaskColumn from "../components/TaskColumn";
import {
  fetchTasks,
  createTask,
  updateTaskApi,
  deleteTaskApi,
} from "../services/taskService";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
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
      <StatsBoard tasks={tasks} />

      <main className="flex-1 p-6 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max md:min-w-full justify-between">
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

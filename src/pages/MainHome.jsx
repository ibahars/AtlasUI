import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Taskmodal from "../components/Taskmodal";
import TaskCard from "../components/Taskcard";
import StatsBoard from "../components/StatsBoard";
import TaskColumn from "../components/TaskColumn";

const Home = ({ onLogoutSuccess }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("atlas-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now() };
    setTasks((prev) => [...prev, taskWithId]);
  };
  useEffect(() => {
    localStorage.setItem("atlas-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setEditingTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogoutSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onLogout={handleLogout}
        onAddClick={() => setIsModalOpen(true)}
      ></Navbar>
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

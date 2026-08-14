import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Taskmodal from "../components/Taskmodal";
import TaskCard from "../components/Taskcard";
import StatsBoard from "../components/StatsBoard";
import TaskColumn from "../components/TaskColumn";
import EmailVerificationBanner from "../components/EmailVerificationBanner";
import { logoutUser, getCurrentUser } from "../services/authService";
import FilterBar from "../components/FilterBar";
import { fetchBoards, createBoard } from "../services/boardService";
import { useNavigate } from "react-router-dom";
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

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    getCurrentUser()
      .then((user) => {
        if (!isMounted) return;
        setCurrentUser(user);
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error(err);
        try {
          const stored = localStorage.getItem("user");
          if (stored && isMounted) setCurrentUser(JSON.parse(stored));
        } catch (parseErr) {
          console.error(parseErr);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || task.type === typeFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;

    return matchesPriority && matchesType && matchesSearch;
  });

  useEffect(() => {
    fetchBoards()
      .then((data) => {
        setBoards(data);
        if (data.length > 0) {
          setSelectedBoardId(data[0].id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedBoardId) return;
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTasks(selectedBoardId);
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [selectedBoardId]);

  const addTask = async (newTask) => {
    try {
      const createdTask = await createTask({
        ...newTask,
        boardId: selectedBoardId,
      });
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
    navigate("/login");
  };

  const handleCreateBoard = async (title) => {
    try {
      const newBoard = await createBoard(title);
      setBoards((prev) => [...prev, newBoard]);
      setSelectedBoardId(newBoard.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900">
      {currentUser && !currentUser.emailVerified && (
        <EmailVerificationBanner
          email={currentUser.email}
          onVerifyClick={() => navigate("/verify-email")}
        />
      )}
      <Navbar
        onLogout={handleLogout}
        onAddClick={() => setIsModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={setSelectedBoardId}
        onCreateBoard={handleCreateBoard}
      />

      <div className="hidden md:block">
        <StatsBoard tasks={tasks} />
      </div>

      <FilterBar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full md:min-w-full md:justify-between">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full md:flex-1 bg-gray-100 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded-xl" />
                    <div className="h-20 bg-gray-200 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full md:min-w-full md:justify-between">
              <TaskColumn
                tasks={filteredTasks}
                title={"Yapılacaklar"}
                onDelete={deleteTask}
                onEdit={handleEditClick}
                status={"todo"}
                color={"bg-yellow-400"}
              />
              <TaskColumn
                tasks={filteredTasks}
                title={"Devam Edilenler"}
                onDelete={deleteTask}
                onEdit={handleEditClick}
                status={"progress"}
                color={"bg-blue-400"}
              />
              <TaskColumn
                tasks={filteredTasks}
                title={"Tamamlananlar"}
                onDelete={deleteTask}
                onEdit={handleEditClick}
                status={"done"}
                color={"bg-green-400"}
              />
            </div>
          )}
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

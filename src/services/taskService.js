const API_URL = "http://localhost:3000/api/tasks";



export async function fetchTasks() {
  const response = await fetch(API_URL, { credentials: "include" });
  if (!response.ok) throw new Error("Görevler yüklenemedi.");
  return response.json();
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Görev oluşturulamadı.");
  return response.json();
}

export async function updateTaskApi(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Görev güncellenemedi.");
  return response.json();
}

export async function deleteTaskApi(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Görev silinemedi.");
}
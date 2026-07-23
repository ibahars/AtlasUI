const API_URL = "http://localhost:3000/api/tasks";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
}};

export async function fetchTasks() {
    const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Görevler yüklenemedi.");
    return response.json();

}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Görev oluşturulamadı.");
  return response.json();
}

export async function updateTaskApi(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Görev güncellenemedi.");
  return response.json();
}


export async function deleteTaskApi(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Görev silinemedi.");
}


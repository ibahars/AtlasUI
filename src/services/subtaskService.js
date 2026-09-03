const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api/subtasks`;

export async function createSubTaskApi(taskId, title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ taskId, title }),
  });
  if (!response.ok) throw new Error("Alt görev oluşturulamadı.");
  return response.json();
}

export async function updateSubTaskApi(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Alt görev güncellenemedi.");
  return response.json();
}

export async function deleteSubTaskApi(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Alt görev silinemedi.");
}
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api/boards`;

export async function fetchBoards() {
  const response = await fetch(API_URL, { credentials: "include" });
  if (!response.ok) throw new Error("Boardlar yüklenemedi.");
  return response.json();
}

export async function createBoard(title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Board oluşturulamadı.");
  return response.json();
}

export async function updateBoard(id, title) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Board güncellenemedi.");
  return response.json();
}

export async function deleteBoard(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Board silinemedi.");
  }
}
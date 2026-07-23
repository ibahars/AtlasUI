const API_URL = "http://localhost:3000/api/auth";

export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kayıt sırasında bir hata oluştu.");
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Giriş sırasında bir hata oluştu.");
  }

  return data;
}
export async function changePassword({ oldPassword, newPassword }) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Şifre değiştirilemedi.");
  }

  return data;
}
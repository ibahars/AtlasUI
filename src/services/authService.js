const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = `${BASE_URL}/api/auth`;

export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
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
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Giriş sırasında bir hata oluştu.");
  }

  return data;
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Çıkış sırasında bir hata oluştu.");
  }

  return data;
}

export async function changePassword({ oldPassword, newPassword }) {
  const response = await fetch(`${API_URL}/change-password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Şifre değiştirilemedi.");
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers:{
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kullanıcı bilgisi alınamadı.");
  }

  return data.user;
}
export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }

  return data;
}

export async function resetPassword({ token, newPassword }) {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }

  return data;
}

export async function verifyEmail(token) {
  const response = await fetch(`${API_URL}/verify-email?token=${token}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }

  return data;
}

export async function resendVerificationEmail() {
  const response = await fetch(`${API_URL}/resend-verification`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Doğrulama e-postası gönderilemedi.");
  }

  return data;
}
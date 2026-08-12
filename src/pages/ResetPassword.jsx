import { useState } from "react";
import { resetPassword } from "../services/authService";

function ResetPassword({ token, onNavigateToLogin }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await resetPassword({ token, newPassword });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-50 rounded-2xl shadow-2xl p-8 text-center">
          <p className="text-red-600 text-sm mb-4">
            Geçersiz bağlantı. Lütfen şifre sıfırlama işlemini tekrar başlatın.
          </p>
          <button
            onClick={onNavigateToLogin}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Girişe dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-50 rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-6">
          Yeni Şifre Belirle
        </h2>

        {message ? (
          <div className="space-y-4">
            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {message}
            </div>
            <button
              onClick={onNavigateToLogin}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-md"
            >
              Girişe dön
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Yeni Şifre
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Yeni Şifre (Tekrar)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-md transition-colors focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Kaydediliyor" : "Şifreyi Güncelle"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;

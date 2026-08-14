import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("E-posta adresi girmelisiniz.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-50 rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">
          Şifremi Unuttum
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Kayıtlı e-posta adresinizi girin, size sıfırlama bağlantısı
          gönderelim.
        </p>

        {message && (
          <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                E-posta
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@doe.com"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-md transition-colors focus:outline-none disabled:opacity-50"
            >
              {isLoading ? "Gönderiliyor" : "Sıfırlama Bağlantısı Gönder"}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => {
            navigate("/login");
          }}
          className="mt-6 text-xs text-blue-600 font-semibold hover:underline block mx-auto"
        >
          Girişe dön
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;

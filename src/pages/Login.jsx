import { useState } from "react";
import { loginUser } from "../services/authService";

function Login({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identifier || !formData.password) {
      setError("Tüm alanları doldurmalısınız.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser({
        email: formData.identifier,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full bg-blue-600 flex items-stretch p-4 md:p-8 overflow-hidden select-none">
      <div className="w-full min-h-[calc(100vh-4rem)] bg-transparent flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-1/5 flex flex-col justify-center items-center text-center p-6 text-white z-10">
          <h1 className="text-4xl font-extrabold tracking-widest mb-3">
            ATLAS
          </h1>
          <p className="hidden md:block text-blue-100/90 text-xs max-w-[180px] leading-relaxed font-light mb-8">
            Panonuza erişmek ve görevlerinizi yönetmeye kaldığınız yerden devam
            etmek için giriş yapın.
          </p>

          <button
            type="button"
            onClick={onNavigateToRegister}
            className="hidden md:block px-8 py-2 bg-white text-blue-600 rounded-full text-sm font-medium shadow-md hover:bg-blue-50 transition-colors focus:outline-none"
          >
            Kayıt Ol
          </button>
        </div>

        <div className="w-full md:w-4/5 bg-slate-50 md:rounded-l-[240px] rounded-2xl md:rounded-r-2xl shadow-2xl flex items-center justify-center p-8 sm:p-12 md:p-16 md:pl-48 md:pr-20 transition-all">
          <div className="w-full max-w-5xl">
            <div className="mb-10 text-center md:text-center">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Giriş Yap
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Atlas hesabınızla oturum açın.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    E-posta
                  </label>
                  <input
                    type="text"
                    name="identifier"
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                    placeholder="john@doe.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Şifre
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={onNavigateToForgotPassword}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Şifremi unuttum
                  </button>
                </div>

                <div className="text-right md:hidden"></div>
              </div>

              <div className="text-right md:hidden">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Hesabınız yok mu? Kayıt Olun
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-md transition-colors focus:outline-none"
                >
                  {isLoading ? "Kaydediliyor..." : "Giriş Yap ve Başla"}
                </button>
              </div>
            </form>

            <div className="mt-10 pt-4 border-t border-slate-200/60 text-center">
              <p className="text-xs text-slate-400">
                Giriş yaparak kullanım koşullarını ve gizlilik politikasını
                onaylamış olursunuz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

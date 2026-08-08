import { useState, useEffect } from "react";
import { X, User, Mail, Calendar, Lock } from "lucide-react";
import { changePassword, getCurrentUser } from "../services/authService";

const UserProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getCurrentUser()
        .then(setUser)
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await changePassword(passwordData);
      setSuccess("Şifreniz başarıyla değiştirildi.");
      setPasswordData({ oldPassword: "", newPassword: "" });
      setTimeout(() => {
        setIsChangingPassword(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsChangingPassword(false);
    setError("");
    setSuccess("");
    setPasswordData({ oldPassword: "", newPassword: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl mx-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-2xl mb-3">
            {user?.username?.charAt(0).toUpperCase() || "?"}
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            {user?.username || "Yükleniyor..."}
          </h2>
        </div>

        {!isChangingPassword ? (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Kullanıcı Adı
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {user?.username || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    E-posta
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {user?.email || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Kayıt Tarihi
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsChangingPassword(true)}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Şifre Değiştir
            </button>
          </>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Mevcut Şifre
              </label>
              <input
                type="password"
                name="oldPassword"
                required
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Yeni Şifre
              </label>
              <input
                type="password"
                name="newPassword"
                required
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;

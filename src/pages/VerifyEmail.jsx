import { useState, useEffect, useRef } from "react";
import { verifyEmail, resendVerificationEmail } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function VerifyEmail(token) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(token ? "loading" : "noToken");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;
    hasVerified.current = true;

    verifyEmail(token)
      .then((data) => {
        setStatus("success");
        setMessage(data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [token]);

  const handleResend = async () => {
    setSending(true);
    try {
      const data = await resendVerificationEmail();
      setSent(true);
      setMessage(data.message || "Doğrulama e-postası gönderildi.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-50 rounded-2xl shadow-2xl p-8 text-center">
        {status === "loading" && (
          <p className="text-slate-500 text-sm">Doğrulanıyor</p>
        )}
        {status === "noToken" && (
          <>
            <p className="text-slate-600 text-sm mb-4">
              E-posta adresinizi doğrulamak için size bir bağlantı göndermemiz
              gerekiyor.
            </p>
            {message && (
              <p className="text-sm mb-3 text-green-700">{message}</p>
            )}
            <button
              onClick={handleResend}
              disabled={sending || sent}
              className="cursor-pointer text-xs bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-60 mb-3"
            >
              {sent
                ? "Gönderildi"
                : sending
                  ? "Gönderiliyor..."
                  : "Doğrulama e-postası gönder"}
            </button>
            <br />
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer text-xs text-blue-600 font-semibold hover:underline"
            >
              Girişe dön
            </button>
          </>
        )}
        {status === "success" && (
          <>
            <p className="text-green-700 text-sm mb-4">{message}</p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Girişe dön
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <p className="text-red-600 text-sm mb-4">{message}</p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Girişe dön
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

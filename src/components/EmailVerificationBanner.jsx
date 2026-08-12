import { useState } from "react";

const EmailVerificationBanner = ({ email, onResend, onVerifyClick }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (!onResend) return;
    setSending(true);
    try {
      await onResend();
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-sm text-red-800 flex flex-wrap items-center justify-between gap-2 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200 ">
      <span>
        {email ? `${email} adresi` : "E-posta adresiniz"} henüz doğrulanmadı.
        Bazı özellikler kısıtlı olabilir.
      </span>
      <div className="flex items-center gap-3">
        {onVerifyClick && (
          <button
            onClick={onVerifyClick}
            className="underline font-medium cursor-pointer"
          >
            Doğrula
          </button>
        )}
        {onResend && (
          <button
            onClick={handleResend}
            disabled={sending || sent}
            className="underline font-medium disabled:opacity-60 disabled:no-underline cursor-pointer"
          >
            {sent
              ? "Gönderildi"
              : sending
                ? "Gönderiliyor..."
                : "Doğrulama e-postasını tekrar gönder"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationBanner;

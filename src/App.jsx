import Home from "./pages/MainHome";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";

function getInitialAuthState() {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";

  if (path === "/" || path === "/register") {
    return { view: "register", token: "" };
  }
  if (path === "/login") {
    return { view: "login", token: "" };
  }

  if (path === "/forgot-password") {
    return { view: "forgotPassword", token: "" };
  }
  if (path === "/reset-password") {
    return { view: "resetPassword", token };
  }
  if (path === "/verify-email") {
    return { view: "verifyEmail", token };
  }

  return { view: "notFound", token: "" };
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [authState, setAuthState] = useState(getInitialAuthState);

  const handleLogoutSuccess = () => {
    setIsStarted(false);
    setAuthState({ view: "login", token: "" });
  };

  const navigateTo = (view) => {
    setAuthState({ view, token: "" });
  };

  const handleNavigateToVerifyEmail = () => {
    setIsStarted(false);
    setAuthState({ view: "verifyEmail", token: "" });
  };

  if (isStarted) {
    return (
      <Home
        onLogoutSuccess={handleLogoutSuccess}
        onNavigateToVerifyEmail={handleNavigateToVerifyEmail}
      />
    );
  }

  switch (authState.view) {
    case "login":
      return (
        <Login
          onLoginSuccess={() => setIsStarted(true)}
          onNavigateToRegister={() => navigateTo("register")}
          onNavigateToForgotPassword={() => navigateTo("forgotPassword")}
        />
      );
    case "forgotPassword":
      return <ForgotPassword onNavigateToLogin={() => navigateTo("login")} />;
    case "resetPassword":
      return (
        <ResetPassword
          token={authState.token}
          onNavigateToLogin={() => navigateTo("login")}
        />
      );
    case "verifyEmail":
      return (
        <VerifyEmail
          token={authState.token}
          onNavigateToLogin={() => navigateTo("login")}
        />
      );
    case "register":
      return (
        <Register
          onRegisterSuccess={() => navigateTo("verifyEmail")}
          onNavigateToLogin={() => navigateTo("login")}
        />
      );
    case "notFound":
    default:
      return <NotFound onGoHome={() => navigateTo("login")} />;
  }
}

export default App;

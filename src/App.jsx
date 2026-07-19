import Home from "./pages/MainHome";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [authView, setAuthView] = useState("register");

  const handleLogoutSuccess = () => {
    setIsStarted(false);
    setAuthView("login");
  };

  if (isStarted) {
    return <Home onLogoutSuccess={handleLogoutSuccess} />;
  }

  return (
    <>
      {authView === "register" ? (
        <Register
          onRegisterSuccess={() => setIsStarted(true)}
          onNavigateToLogin={() => setAuthView("login")}
        />
      ) : (
        <Login
          onLoginSuccess={() => setIsStarted(true)}
          onNavigateToRegister={() => setAuthView("register")}
        />
      )}
    </>
  );
}

export default App;

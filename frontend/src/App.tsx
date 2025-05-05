import React, { useState } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { isAuthenticated } from "./api";

const App: React.FC = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      {auth ? <Notes /> : <Login onLogin={() => setAuth(true)} />}
    </div>
  );
};

export default App;

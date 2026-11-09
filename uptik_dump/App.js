import "./App.css";
import { Route, Routes } from "react-router-dom";
import Router from "./Routes/routes";

// Import custom variable CSS
import "./variable.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Router />} />
      </Routes>
    </div>
  );
}

export default App;

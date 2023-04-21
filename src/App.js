import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/utils/auth";
import AppRoutes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { AppProvider } from "./components/contexts/AppContext";
import Router from "./routes";

function App() {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>
    </>
  );
}

export default App;

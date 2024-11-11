import "./App.css";
import { AppProvider } from "./components/contexts/AppContext";
import { Toaster } from "./components/ui/toaster";
import Router from "./routes";

function App() {
  return (
    <>
      <AppProvider>
        <Router />
        <Toaster />
      </AppProvider>
    </>
  );
}

export default App;

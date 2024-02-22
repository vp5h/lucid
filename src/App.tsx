import "./App.css";
import { useQuery } from "@tanstack/react-query";
import UserSelector from "./components/UserSelector";
import DashBoard from "./containers/Dashboard";

function App() {
  const { data: role = "0" } = useQuery({ queryKey: ["ROLE"] });

  switch (role) {
    case "0": {
      return <UserSelector />;
    }
    case "1":
    case "2":
      return <DashBoard />;

    default:
      return <UserSelector />;
  }
}

export default App;

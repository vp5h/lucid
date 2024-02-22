import { useQueryClient } from "@tanstack/react-query";

import viteLogo from "/vite.svg";
import "./index.css";

const UserSelector = () => {
  const queryClient = useQueryClient();

  const setRole = (value: string) => {
    queryClient.setQueryData(["ROLE"], () => {
      return value;
    });
  };

  return (
    <div className="selectorDiv">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Inventory Management</h1>
      <p>Please, Select one of the below roles</p>
      <div className="card">
        <button onClick={() => setRole("1")}>Admin</button>
      </div>
      <div className="card">
        <button onClick={() => setRole("2")}>User</button>
      </div>
    </div>
  );
};

export default UserSelector;

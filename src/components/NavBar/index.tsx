import "./index.css";
import { Switch } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, RotateCcw } from "lucide-react";

const Navbar = () => {
  const onChange = (checked: boolean) => {
    queryClient.setQueryData(["ROLE"], () => {
      return checked ? "2" : "1";
    });
  };
  const queryClient = useQueryClient();

  return (
    <div className="navbar">
      <div className="navbarContent">
        <RotateCcw
          onClick={() => {
            queryClient.refetchQueries({ queryKey: ["STOCK"] });
          }}
        />
        admin
        <Switch
          defaultChecked={queryClient.getQueryData(["ROLE"]) === "2"}
          onChange={onChange}
        />
        user
        <LogOut
          onClick={() => {
            queryClient.setQueryData(["ROLE"], () => {
              return "0";
            });
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;

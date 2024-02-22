import "./index.css";
import { Switch } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);

    queryClient.setQueryData(["ROLE"], () => {
      return checked ? "2" : "1";
    });
  };
  const queryClient = useQueryClient();

  return (
    <div className="navbar">
      <div className="navbarContent">
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

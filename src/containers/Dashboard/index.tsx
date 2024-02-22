import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../../components/NavBar";
import Table from "../../components/Table";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import "./index.css";
import Modal from "../../components/Modal";

const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [tableData, setTableData] = useState([]);
  const queryClient = useQueryClient();
  const { data: role } = useQuery({
    queryKey: ["ROLE"],
    notifyOnChangeProps: "all",
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["STOCK"],
    staleTime: Infinity,
    queryFn: () => {
      return [
        {
          name: "Bluetooth",
          category: "Electronic",
          value: "$150",
          quantity: 5,
          price: "$30",
          isEnabled: true,
        },
        {
          name: "Edifier M43560",
          category: "Electronic",
          value: "0",
          quantity: 0,
          price: "$0",
          isEnabled: true,
        },
        {
          name: "Sony 4k ultra 55 inch TV",
          category: "Electronic",
          value: "$1190",
          quantity: 17,
          price: "$70",
          isEnabled: true,
        },
        {
          name: "Samsumg 55 inch TV",
          category: "Electronic",
          value: "$600",
          quantity: 50,
          price: "$12",
          isEnabled: true,
        },
        {
          name: "samsumg S34 Ultra",
          category: "phone",
          value: "$0",
          quantity: 0,
          price: "$0",
          isEnabled: true,
        },
      ];
      //   setTableData()
    },
    // queryFn: () =>
    //   fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory").then(
    //     (res) => res.json()
    //   ),
  });
  useEffect(() => {
    if (role === "2") {
      setTableData(data?.filter((each) => each?.isEnabled));
    } else if (role === "1") {
      setTableData(data);
    }
  }, [role, data]);
  const renderTableHeading = (name: string) => {
    return (
      <div>
        <span className="tableHeading">{name}</span>
      </div>
    );
  };

  const columns = [
    {
      title: () => renderTableHeading("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: () => renderTableHeading("Category"),

      dataIndex: "category",
      key: "category",
    },
    {
      title: () => renderTableHeading("Value"),

      dataIndex: "value",
      key: "value",
    },
    {
      title: () => renderTableHeading("Quantity"),

      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: () => renderTableHeading("Price"),

      dataIndex: "price",
      key: "price",
    },
    {
      title: () => renderTableHeading("ACTION"),

      dataIndex: "action",
      key: "action",
      render: (text: string, data: object) => {
        return (
          <>
            <Pencil
              className={
                role === "1" && data.isEnabled ? "icons" : "disabled-icons"
              }
              color={role === "1" && data.isEnabled ? "green" : "grey"}
              size={"15px"}
              onClick={() => {
                if (role === "1" && data.isEnabled) {
                  console.log(text, data);
                  setSelectedRow(data);
                  setIsModalOpen(true);
                }
              }}
            />
            {data?.isEnabled ? (
              <Eye
                className={role === "1" ? "icons" : "disabled-icons"}
                color={role === "1" ? "purple" : "grey"}
                size={"15px"}
                onClick={() => {
                  if (role === "1") {
                    queryClient.setQueryData(["STOCK"], (lastdata: any[]) => {
                      return lastdata.map((each: { name: any }) => {
                        if (each.name === data.name) {
                          return { ...each, isEnabled: false };
                        } else {
                          return each;
                        }
                      });
                    });
                  }
                  // setSelectedRow();
                }}
              />
            ) : (
              <EyeOff
                className={role === "1" ? "icons" : "disabled-icons"}
                color={role === "1" ? "white" : "grey"}
                size={"15px"}
                onClick={() => {
                  if (role === "1") {
                    queryClient.setQueryData(["STOCK"], (lastdata: any[]) => {
                      return lastdata.map((each: { name: any }) => {
                        if (each.name === data.name) {
                          return { ...each, isEnabled: true };
                        } else {
                          return each;
                        }
                      });
                    });
                  }
                }}
              />
            )}
            <Trash2
              className={role === "1" ? "icons" : "disabled-icons"}
              color={role === "1" ? "red" : "grey"}
              size={"15px"}
              onClick={() => {
                if (role === "1") {
                  queryClient.setQueryData(["STOCK"], (lastdata: any[]) =>
                    lastdata.filter((each) => each.name !== data.name)
                  );
                }
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="heading">
        <p>Inventory Stats</p>
      </div>
      <Table
        data={tableData}
        isPending={isPending}
        error={error}
        columns={columns}
      />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default DashBoard;

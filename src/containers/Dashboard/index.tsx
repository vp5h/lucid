import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../../components/NavBar";
import Table from "../../components/Table";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import "./index.css";
import Modal from "../../components/Modal";
import { Stats } from "../../components/Stats";
import { StockInterface } from "../../interface";

// TODO add types

const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StockInterface>({
    name: "",
    price: "",
    category: "",
    quantity: "",
    value: "",
  });
  const [tableData, setTableData] = useState([]);
  const queryClient = useQueryClient();
  const { data: role } = useQuery({
    queryKey: ["ROLE"],
    notifyOnChangeProps: "all",
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["STOCK"],
    staleTime: Infinity,
    queryFn: () =>
      fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
        .then((res) => res.json())
        .then((resp) => {
          return resp.map((each: StockInterface) => ({
            ...each,
            isEnabled: true,
          }));
        }),
  });
  useEffect(() => {
    if (role === "2") {
      setTableData(data?.filter((each: StockInterface) => each?.isEnabled));
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, data: StockInterface) => {
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
                    queryClient.setQueryData(
                      ["STOCK"],
                      (lastdata: StockInterface[]) => {
                        return lastdata.map((each: { name: string }) => {
                          if (each.name === data.name) {
                            return { ...each, isEnabled: false };
                          } else {
                            return each;
                          }
                        });
                      }
                    );
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
                    queryClient.setQueryData(
                      ["STOCK"],
                      (lastdata: StockInterface[]) => {
                        return lastdata.map((each: { name: string }) => {
                          if (each.name === data.name) {
                            return { ...each, isEnabled: true };
                          } else {
                            return each;
                          }
                        });
                      }
                    );
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
                  queryClient.setQueryData(
                    ["STOCK"],
                    (lastdata: StockInterface[]) =>
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
      <Stats tableData={tableData} />
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

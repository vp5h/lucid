import { Table as AntTable, ConfigProvider } from "antd";

import "./index.css";

const Table = ({
  data,
  isPending,
  error,
  columns,
}: {
  data: unknown;
  isPending: boolean;
  error: Error | null;
  columns: object[];
}) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(33 33 36)",
              headerColor: "white",
              rowSelectedHoverBg: "red",
            },
          },
        }}
      >
        <AntTable
          rootClassName="table-lucid"
          //   loading={isPending}
          dataSource={data}
          columns={columns}
          pagination={false}
          style={{
            background: "rgb(22 23 24)", // Set your desired background color
          }}
          scroll={{ x: "calc(90vw - 100px)" }}
          rowKey="name"
        />
      </ConfigProvider>
    </div>
  );
};

export default Table;

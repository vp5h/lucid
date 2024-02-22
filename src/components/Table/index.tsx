import { Table as AntTable, ConfigProvider } from "antd";

import "./index.css";

const Table = ({
  data,
  isPending,
  error,
  columns,
  tableStyle,
}: {
  data: unknown;
  isPending: boolean;
  error: Error | null;
  columns: object[];
  tableStyles: unknown;
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
          style={tableStyle}
          scroll={{ x: "calc(100vw - 100px)" }}
          rowKey="name"
        />
      </ConfigProvider>
    </div>
  );
};

export default Table;

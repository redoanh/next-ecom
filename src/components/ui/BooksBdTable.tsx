import { Table } from "antd";

type ExtraContentProps = {
  extraContent?: JSX.Element;
  children?: React.ReactNode;
};

const ExtraContent = ({ extraContent, children }: ExtraContentProps) => {
  return (
    <div>
      {extraContent}
      {children}
    </div>
  );
};

type CustomTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  pageSize?: number;
  pageNo?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  resetFilters?: any;
  onPaginationChange?: (page: number, pageSize: number) => void;
  showPagination?: boolean;
  footer?: () => void;
  header?: () => void;
  extraContent?: JSX.Element; // Allow extra content to be passed as prop
};

const CustomTable = ({
  loading = false,
  columns,
  footer,
  header,
  dataSource,
  onTableChange,
  pageSize = 10,
  resetFilters,
  pageNo,
  totalPages,
  showSizeChanger,
  onPaginationChange,
  showPagination = true,
  extraContent, // Receive extra content as prop
}: CustomTableProps) => {
  const paginationConfig = showPagination
    ? totalPages && totalPages > 0
      ? {
          pageNo: pageNo,
          pageSize: pageSize,
          total: totalPages,
          pageSizeOptions: [5, 10, 20, 50, 100, 500],
          showSizeChanger: showSizeChanger,
          onChange: onPaginationChange,
        }
      : false
    : false;

  return (
    <ExtraContent extraContent={extraContent}>
      <Table
      style={{ backgroundColor: "#fff6f6e6",}}
        scroll={{ x: 300 }}
        loading={loading}
        className="shadow-md"
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        onChange={onTableChange}
        footer={footer}
      />
     </ExtraContent>
  );
};

export default CustomTable;

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import LoadingSpinner from "../common/spinner";

export interface FetchResult<T> {
  list: T[];
  total: number;
}

export interface ActionProps<T> {
  type: "edit" | "delete" | "view" | "submit";
  row: T;
}

export interface renderCellProps<T> {
  row: T;
  columnKey: React.Key;
  ctx: TableWrapperMethods | null;
}
export interface TableWrapperProps<T> {
  columns: { uid: string; name: string }[];
  fetchData: (page: number, size: number) => Promise<FetchResult<T>>;
  renderCell: (props: renderCellProps<T>) => React.ReactNode;
}

export interface TableWrapperMethods {
  loadData: () => Promise<void>;
}

export const TableWrapper = <T,>(
  props: TableWrapperProps<T>,
  ref: React.RefObject<TableWrapperMethods>
) => {
  const { columns, fetchData, renderCell } = props;
  const [data, setData] = React.useState<T[]>([]);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchData(pageIndex, pageSize);
      setData(result.list);
      setTotal(Math.ceil(result.total / pageSize));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, pageIndex, pageSize]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  React.useImperativeHandle(ref, () => ({
    loadData,
  }));

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          total > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                total={total}
                initialPage={1}
                onChange={(page) => {
                  setPageIndex(page);
                }}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data}
          loadingState={isLoading ? "loading" : "idle"}
          loadingContent={<LoadingSpinner />}
          emptyContent={"No rows to display."}
        >
          {(item) => (
            <TableRow>
              {(columnKey) => {
                return (
                  <TableCell>
                    {renderCell({
                      row: item,
                      columnKey,
                      ctx: ref.current,
                    })}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: RefObject<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export const TableWrapperRef = React.forwardRef(TableWrapper);

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
  onClick: ({ row, type }: ActionProps<T>) => void;
  action: ({ row, type }: ActionProps<T>) => void;
}
interface TableWrapperProps<T> {
  columns: { uid: string; name: string }[];
  fetchData: (page: number, size: number) => Promise<FetchResult<T>>;
  renderCell: (props: renderCellProps<T>) => React.ReactNode;
  handleClick?: ({ row, type }: ActionProps<T>) => void;
  handleAction?: ({ row, type }: ActionProps<T>) => Promise<any>;
}

export const TableWrapper = <T,>({
  columns,
  fetchData,
  renderCell,
  handleAction,
  handleClick,
}: TableWrapperProps<T>) => {
  const [data, setData] = React.useState<T[]>([]);
  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const [total, setTotal] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchData(pageIndex, pageSize);
      setData(result.list);
      setTotal(result.total);
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

  return (
    <div className=" w-full flex flex-col gap-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={data}>
              {(item) => (
                <TableRow>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell({
                        row: item,
                        columnKey,
                        onClick: ({ row, type }) => {
                          if (handleClick) {
                            try {
                              handleClick({ row, type });
                            } catch (error) {
                              console.error(error);
                            }
                          }
                        },
                        action: async ({ row, type }) => {
                          if (handleAction) {
                            try {
                              setIsLoading(true);
                              const resp = await handleAction({ row, type });
                              console.log(resp);
                              loadData();
                            } catch (error) {
                              console.error(error);
                            } finally {
                              setIsLoading(false);
                            }
                          }
                        },
                      })}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination
            showControls
            total={total}
            initialPage={pageIndex}
            onChange={(page) => {
              setPageIndex(page);
            }}
          />
        </>
      )}
    </div>
  );
};

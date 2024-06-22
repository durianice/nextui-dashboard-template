import { User, Chip } from "@nextui-org/react";
import React from "react";
import { renderCellProps } from "../table/table";
import { Member } from "@/server/db/members";
import TableActions from "./table-actions";
import { convertTimestampToDate } from "@/util/tools";

export const RenderCell = ({
  row,
  columnKey,
  ctx,
}: renderCellProps<Member>): React.ReactNode => {
  // @ts-ignore
  const cellValue = row[columnKey];
  switch (columnKey) {
    case "username":
      return <User name={cellValue}>{cellValue}</User>;
    case "expires":
      return <span>{convertTimestampToDate(cellValue)}</span>;
    case "isActive":
      return (
        <Chip size="sm" variant="flat" color={cellValue ? "success" : "danger"}>
          <span className="capitalize text-xs">
            {cellValue ? "ACTIVE" : "INACTIVE"}
          </span>
        </Chip>
      );
    case "actions":
      return <TableActions row={row} ctx={ctx} />;
    default:
      return cellValue;
  }
};

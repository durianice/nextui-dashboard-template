import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { renderCellProps } from "../table/table";
import { EditUser } from "./edit-user";
import { Member } from "@/server/db/members";
import { deleteJSON, putJSON } from "@/util/request";

export const renderCell = ({
  row,
  columnKey,
  ctx,
}: renderCellProps<Member>): React.ReactNode => {
  // @ts-ignore
  const cellValue = row[columnKey];
  switch (columnKey) {
    case "username":
      return <User name={cellValue}>{cellValue}</User>;
    case "isActive":
      return (
        <Chip size="sm" variant="flat" color={cellValue ? "success" : "danger"}>
          <span className="capitalize text-xs">
            {cellValue ? "ACTIVE" : "INACTIVE"}
          </span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 justify-center">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.info(row)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <EditUser<Member>
              row={row}
              onSuccess={async () => {
                if (ctx) {
                  await ctx.loadData();
                }
              }}
            />
          </div>
          <div>
            <Tooltip content="Delete user" color="danger">
              <button
                onClick={async () => {
                  await deleteJSON("/api/members", { id: row.id });
                  if (ctx) {
                    await ctx.loadData();
                  }
                }}
              >
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};

import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { Users } from "./data";
import { renderCellProps } from "../table/table";
import { EditUser } from "./edit-user";

export const renderCell = ({
  row,
  columnKey,
  onClick,
  action,
}: renderCellProps<Users>): React.ReactNode => {
  // @ts-ignore
  const cellValue = row[columnKey];
  switch (columnKey) {
    case "name":
      return <User name={cellValue}>{row.email}</User>;
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{row.team}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "active"
              ? "success"
              : cellValue === "paused"
              ? "danger"
              : "warning"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => onClick({ row, type: "view" })}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <EditUser onSubmit={() => action({row, type: "submit"})} />
          </div>
          <div>
            <Tooltip content="Delete user" color="danger">
              <button onClick={() => action({ row, type: "delete" })}>
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

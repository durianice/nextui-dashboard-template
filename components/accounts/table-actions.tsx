import { Member } from "@/server/db/members";
import { deleteJSON } from "@/util/request";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import UserForm from "./user-form";
import { TableWrapperMethods } from "../table/table";
import toast from "react-hot-toast";

function TableActions({
  row,
  ctx,
}: {
  row: Member;
  ctx?: TableWrapperMethods | null;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
        <UserForm<Member>
          mode="edit"
          onSuccess={async () => {
            if (ctx) {
              await ctx.loadData();
            }
          }}
          row={row}
        />
      </div>
      <div>
        <Popover
          placement="bottom"
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger>
            <button>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 flex align-center justify-center">
              <Button
                size="sm"
                color="danger"
                isLoading={isLoading}
                onClick={async () => {
                  if (ctx) {
                    try {
                      setIsLoading(true);
                      await toast.promise(
                        deleteJSON("/api/members", { id: row.id }),
                        {
                          loading: "Deleting...",
                          success: () => "Success",
                          error: (err) =>
                            `${err.toString()}`,
                        }
                      );
                      await ctx.loadData();
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setIsOpen(false);
                      setIsLoading(false);
                    }
                  }
                }}
              >
                Delete
              </Button>
              <Button
                size="sm"
                className="ml-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default TableActions;

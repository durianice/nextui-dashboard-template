"use client";
import { Button, Input, Tooltip } from "@nextui-org/react";
import React from "react";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import {
  FetchResult,
  TableWrapperMethods,
  TableWrapperRef,
} from "@/components/table/table";
import { RenderCell } from "./render-cell";
import { getJSON } from "@/util/request";
import { Member } from "@/server/db/members";
import UserForm from "./form";

const columns = [
  { name: "NAME", uid: "username" },
  { name: "ROLE", uid: "role" },
  { name: "EXP", uid: "expires" },
  { name: "STATUS", uid: "isActive" },
  { name: "ACTIONS", uid: "actions" },
];

const fetchData = async (
  pageIndex: number,
  pageSize: number,
  params?: Partial<Member>
): Promise<FetchResult<Member>> => {
  const res = await getJSON("/api/members", { pageIndex, pageSize, ...params });
  return res;
};

export const Members = () => {
  const [membersFilter, setMembersFilter] = React.useState("");
  const tableRef = React.useRef<TableWrapperMethods<Member>>(null);
  const filterData = (reset: boolean = false) => {
    if (!membersFilter) return;
    if (tableRef.current) {
      const params = reset ? {} : { username: membersFilter };
      tableRef.current.filterData(params);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      filterData();
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    filterData();
  };
  return (
    <>
      <h3 className="text-xl font-semibold">All Members</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Member"
            value={membersFilter}
            onChange={(e) => setMembersFilter(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Tooltip content="Enter to start">
            <button>
              <InfoIcon />
            </button>
          </Tooltip>
          <Button color="secondary" onClick={handleClick}>
            Filter
          </Button>
          <Button
            color="default"
            onClick={() => {
              setMembersFilter("");
              filterData(true);
            }}
          >
            Reset
          </Button>
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <UserForm
            mode="add"
            onSuccess={() => {
              if (tableRef.current) {
                tableRef.current.loadData();
              }
            }}
          />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapperRef<Member>
          ref={tableRef}
          columns={columns}
          renderCell={RenderCell}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

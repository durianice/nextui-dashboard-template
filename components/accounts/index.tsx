"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { FetchResult, TableWrapperMethods, TableWrapperRef } from "@/components/table/table";
import { AddUser } from "./add-user";
import { renderCell } from "./render-cell";
import { getJSON } from "@/util/request";
import { Member } from "@/server/db/members";

const columns = [
  { name: "NAME", uid: "username" },
  { name: "ROLE", uid: "role" },
  { name: "EXP", uid: "expires" },
  { name: "STATUS", uid: "isActive" },
  { name: "ACTIONS", uid: "actions" },
];

export const Accounts = () => {
  const tableRef = React.useRef<TableWrapperMethods>(null);
  const fetchDataMock = async (
    pageIndex: number,
    pageSize: number
  ): Promise<FetchResult<Member>> => {
    const res = await getJSON("/api/members", { pageIndex, pageSize });
    return res;
  };
  return (
    <>
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <InfoIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser
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
          renderCell={renderCell}
          fetchData={fetchDataMock}
        />
      </div>
    </>
  );
};

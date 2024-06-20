"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { FetchResult, TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";
import { columns } from "./data";
import { renderCell } from "./render-cell";
import { getJSON } from "@/util/request";
import { Member } from "@/server/db/members";

export const Accounts = () => {
  const tableRef = React.useRef(null);
  const fetchDataMock = async (
    pageIndex: number,
    pageSize: number
  ): Promise<FetchResult<Member>> => {
    const res = await getJSON("/api/members", { pageIndex, pageSize })
    return res
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
          <AddUser />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper<Member>
          columns={columns}
          renderCell={renderCell}
          fetchData={fetchDataMock}
          handleAction={async ({ row, type }) => {
            switch (type) {
              case "delete":
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("deleted");
                  }, 1000);
                });
              case "submit":
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve("submitted");
                  }, 1000);
                });
              default:
                break;
            }
            
          }}
          handleClick={({ row, type }) => {
            console.log(row, type);
          }}
        />
      </div>
    </>
  );
};

"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { FetchResult, TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";
import { users, columns, Users } from "./data";
import { renderCell } from "./render-cell";

export const Accounts = () => {
  const tableRef = React.useRef(null);
  const fetchDataMock = (
    pageIndex: number,
    pageSize: number
  ): Promise<FetchResult<Users>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = users.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        );
        resolve({ list: data, total: Math.ceil(users.length / pageSize) });
      }, 2000);
    });
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
        <TableWrapper<Users>
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

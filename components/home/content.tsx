"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => (
  <>
    <div className="flex justify-center gap-4 xl:gap-6 px-4 lg:px-0  flex-wrap xl:flex-nowrap max-w-[90rem] mx-auto w-full">
      <div className="gap-6 flex flex-col w-full">
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  </>
);

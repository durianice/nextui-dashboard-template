import {
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Link,
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import React from "react";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { usePathname } from "next/navigation";
import { HomeIcon } from "../icons/breadcrumb/home-icon";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const capitalized = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);
  const displayPathname = capitalized(pathname.split("/").pop() ?? "");
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <SupportIcon />
          </div>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {displayPathname && (
        <div className="flex lg:px-6 mt-6">
          <Breadcrumbs>
            <BreadcrumbItem href="/" startContent={<HomeIcon />}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href={pathname}>{displayPathname}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      )}
      <div className="lg:px-6 py-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

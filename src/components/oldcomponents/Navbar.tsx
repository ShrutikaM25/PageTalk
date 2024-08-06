import React, { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenuToggle,
  Select,
  SelectItem,
  NavbarMenu,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { AcmeLogo } from "../AcmeLogo";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface NavbarProps {
  logoOnly?: boolean;
  ddMenuItems?: string[];
  centered?: boolean;
  isBlurred?: boolean;
}

const Component: React.FC<NavbarProps> = ({
  logoOnly = true,
  ddMenuItems = null,
  centered = true,
  isBlurred = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const menuItems = ddMenuItems || [
    "Contact Lawyers",
    "Fill-a-Form",
    "Take Action",
    "Profile",
    "Dashboard",
    "My Settings",
    "Help & Feedback",
    "Contact Us",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={isBlurred}
      className={`${centered ? "" : "justify-start"} `}
      shouldHideOnScroll={true}
    >
      <NavbarContent justify="start" className="flex-2 w-full">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link href="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">PageTalk</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className={inter.className}>
                    <Link color="foreground" href="#">
                        Action 1
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Action 2
                    </Link>
                </NavbarItem>
                <NavbarItem className={inter.className}>
                    <Link color="foreground" href="#">
                        Action 3
                    </Link>
                </NavbarItem>
                <NavbarItem className={inter.className}>
                    <Link color="foreground" href="#">
                        Action 4
                    </Link>
                </NavbarItem>
            </NavbarContent> */}
      {!logoOnly ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="#"
              variant="flat"
              onClick={(e) => router.push("/login")}
            >
              Log In / Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end" />
      )}

      <NavbarContent as="div" justify="end" className="justify-end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Component;

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useThemeProvider } from "@utils/ThemeContext";
import logo from "@images/sigortamLogo.svg"


import { sidebarItems } from "./SidebarItems";
import SideBarModals from "./SideBarModals";

// SidebarLinkGroup Component
export function SidebarLinkGroup({ children, activecondition, level = 0 }) {
  const [open, setOpen] = useState(activecondition);

  useEffect(() => {
    setOpen(activecondition);
  }, [activecondition]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`${
        level === 0 ? "pl-4 pr-3 py-2 rounded-lg " : ""
      } mb-0.5 last:mb-0 ${
        level === 0 && activecondition
          ? "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-cageCarbonAqua-500/[0.12] dark:from-cageCarbonAqua-500/[0.24] to-cageCarbonAqua-500/[0.04]"
          : ""
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

// NestedMenuItem Component
export const NestedMenuItem = ({
  item,
  pathname,
  level = 0,
  darkMode,
  sidebarExpanded,
  setSidebarExpanded,
  setSideBarModalsOpen = null,
  setOpenModalForThisName = null,
}) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Check if the current menu item is active
  const isActive = item.path
    ? pathname === item.path
    : hasSubItems && checkIfAnySubItemActive(item.subItems, pathname);

  // Helper function to check if any sub-items are active
  function checkIfAnySubItemActive(subItems, currentPath) {
    if (!subItems) return false;

    return subItems.some((subItem) => {
      if (subItem.path && currentPath === subItem.path) {
        return true;
      }
      if (subItem.subItems) {
        return checkIfAnySubItemActive(subItem.subItems, currentPath);
      }
      return false;
    });
  }

  if (hasSubItems) {
    // For menu items with sub-items, use SidebarLinkGroup
    return (
      <SidebarLinkGroup activecondition={isActive} level={level}>
        {(handleClick, open) => (
          <>
            <a
              style={{ cursor: "pointer" }}
              className={`block
                ${
                  level === 0
                    ? "text-gray-800 dark:text-gray-100 truncate transition duration-700"
                    : "transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }
                ${isActive ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
                setSidebarExpanded(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {level === 0 && (
                    <svg
                      className={`shrink-0 fill-current ${
                        isActive
                          ? "text-cageCarbonAqua-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      fill="none"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="m7.14643 7.14648c.29289-.2929.76776-.2929 1.06066 0l8.50001 8.50002c.2929.2929.2929.7677 0 1.0606s-.7678.2929-1.0607 0l-8.49997-8.49996c-.2929-.2929-.2929-.76777 0-1.06066z"></path>
                        <path d="m16.1768 6.42676c.4142 0 .75.33578.75.75v9.00004c0 .4142-.3358.75-.75.75h-9.00004c-.41422 0-.75-.3358-.75-.75 0-.4143.33578-.75.75-.75h8.25004v-8.25004c0-.41422.3357-.75.75-.75z"></path>
                      </g>
                    </svg>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      level === 0 ? "ml-2" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                {true && (
                  <div className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    <svg
                      className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                )}
              </div>
            </a>
            <div>
              <ul
                className={`${
                  level === 0 ? "pl-8" : ""
                } mt-1 transition-all delay-150 duration-300 overflow-hidden bg-gray-50/30 dark:bg-gray-800/30 rounded-md ${
                  open ? "max-h-screen py-2" : "max-h-0"
                }`}
              >
                {item.subItems.map((subItem, idx) => (
                  <li key={idx} className="mb-1 last:mb-0">
                    {subItem.subItems ? (
                      <NestedMenuItem
                        item={subItem}
                        pathname={pathname}
                        level={level + 1}
                        darkMode={darkMode}
                        sidebarExpanded={sidebarExpanded}
                        setSidebarExpanded={setSidebarExpanded}
                        setSideBarModalsOpen={setSideBarModalsOpen}
                        setOpenModalForThisName={setOpenModalForThisName}
                      />
                    ) : subItem.modalShow ? (
                      <span
                        className="block cursor-pointer text-gray-500/90
                         dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
                        transition duration-150 truncate text-sm font-medium lg:opacity-0
                         lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        onClick={() => {
                          setSideBarModalsOpen(true);
                          setOpenModalForThisName(subItem.name);
                        }}
                      >
                        {subItem.name}
                      </span>
                    ) : (
                      <NavLink
                        end
                        to={subItem.path}
                        className={({ isActive }) =>
                          "block transition duration-150 truncate " +
                          (isActive
                            ? "text-cageCarbonAqua-500 font-medium"
                            : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                        }
                      >
                        {subItem.name.length > 21 ? (
                          <Tooltip
                            title={subItem.name}
                            placement="top"
                            arrow
                            followCursor
                            PopperProps={{
                              sx: {
                                "& .MuiTooltip-tooltip": {
                                  backgroundColor: !darkMode ? "#333" : "#fff",
                                  color: !darkMode ? "#fff" : "#000",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                },
                                "& .MuiTooltip-arrow": {
                                  color: !darkMode ? "#000" : "#fff",
                                },
                              },
                            }}
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {subItem.name}
                            </span>
                          </Tooltip>
                        ) : (
                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            {subItem.name}
                          </span>
                        )}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </SidebarLinkGroup>
    );
  } else {
    // For menu items without sub-items
    return (
      <li
        className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 ${
          level === 0 && pathname === item.path
            ? "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-cageCarbonAqua-500/[0.12] dark:from-cageCarbonAqua-500/[0.24] to-cageCarbonAqua-500/[0.04]"
            : ""
        }`}
      >
        <NavLink
          end
          to={item.path}
          className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
            pathname === item.path
              ? ""
              : "hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <div className="flex items-center">
            <svg
              className={`shrink-0 fill-current ${
                pathname === item.path
                  ? "text-cageCarbonAqua-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m7.14643 7.14648c.29289-.2929.76776-.2929 1.06066 0l8.50001 8.50002c.2929.2929.2929.7677 0 1.0606s-.7678.2929-1.0607 0l-8.49997-8.49996c-.2929-.2929-.2929-.76777 0-1.06066z"></path>
                <path d="m16.1768 6.42676c.4142 0 .75.33578.75.75v9.00004c0 .4142-.3358.75-.75.75h-9.00004c-.41422 0-.75-.3358-.75-.75 0-.4143.33578-.75.75-.75h8.25004v-8.25004c0-.41422.3357-.75.75-.75z"></path>
              </g>
            </svg>
            {item.name.length > 21 ? (
              <Tooltip
                title={item.name}
                placement="top"
                arrow
                followCursor
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: !darkMode ? "#333" : "#fff",
                      color: !darkMode ? "#fff" : "#000",
                      borderRadius: "4px",
                      fontSize: "12px",
                    },
                    "& .MuiTooltip-arrow": {
                      color: !darkMode ? "#000" : "#fff",
                    },
                  },
                }}
              >
                <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  {item.name}
                </span>
              </Tooltip>
            ) : (
              <span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                {item.name}
              </span>
            )}
          </div>
        </NavLink>
      </li>
    );
  }
};

// Main Sidebar Component
function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";

  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [sideBarModalsOpen, setSideBarModalsOpen] = useState(false);
  const [openModalForThisName, setOpenModalForThisName] = useState("");

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      <div className="min-w-fit">
        {/* Sidebar background overlay */}
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        ></div>
        <div
          id="sidebar"
          ref={sidebar}
          className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
            sidebarOpen
              ? "translate-x-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh]"
              : "-translate-x-64"
          } ${
            variant === "v2"
              ? "border-r border-gray-200 dark:border-gray-700/60"
              : "rounded-r-2xl shadow-sm"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between mb-10 pr-3 sm:px-2">
            {/* Close Button */}
            <button
              ref={trigger}
              className="lg:hidden text-gray-500 hover:text-gray-400"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>

            {/* Logo */}
            <div className="text-center">
              <div className="inline-flex">
                <NavLink to="/" className="block">
                  <img
                    src={logo}
                    width="280"
                    height="200"
                    maxHeight="100"
                    alt="logo"
                  />
                </NavLink>
              </div>
            </div>
          </div>

          {/* Dynamic Menu */}
          <div className="space-y-8">
            {sidebarItems.map((group, groupIdx) => (
              <div key={groupIdx}>
                <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
                  <span
                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                    aria-hidden="true"
                  >
                    •••
                  </span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    {group.title}
                  </span>
                </h3>
                <ul className="mt-3">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <NestedMenuItem
                        item={item}
                        pathname={pathname}
                        darkMode={darkMode}
                        sidebarExpanded={sidebarExpanded}
                        setSidebarExpanded={setSidebarExpanded}
                        setSideBarModalsOpen={setSideBarModalsOpen}
                        setOpenModalForThisName={setOpenModalForThisName}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4">              
              <div className="text-xs text-center text-gray-600 dark:text-gray-400 space-y-1">
                <p className="font-semibold">Version 1.1.0</p>
                <p>Updated 01.06.2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SideBarModals
        modalName={openModalForThisName}
        isOpen={sideBarModalsOpen}
        onClose={() => setSideBarModalsOpen(false)}
        darkMode={darkMode}
      />
    </>
  );
}

export default Sidebar;

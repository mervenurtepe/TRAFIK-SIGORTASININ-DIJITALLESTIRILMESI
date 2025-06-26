import React, { useState, useEffect } from "react";
import logo from "@images/sigortamLogo.svg";
import logoForDark from "@images/sigortamLogo.svg";

const SideBarModals = ({ modalName, isOpen, onClose, darkMode }) => {
  useEffect(() => {}, [isOpen, modalName]);

  // Handle modal close
  const handleClose = () => {
    onClose();
  };

  // If no modal is open, return null
  if (!isOpen) return null;

  // Render the appropriate modal based on the modalName
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full">
        {/* Modal Header - Common for all modals */}
        <div className="mb-2 text-center">
          <div className="inline-flex mb-2">
            <img
              src={darkMode ? logoForDark : logo}
              width="200"
              height="200"
              alt="logo"
            />
          </div>
        </div>

        {/* Modal Content - Changes based on modalName */}
        <div className="text-center">
          {modalName === "work-in-progress-modal" && (
            <>
              {/* Work in Progress Modal */}
              <div className="mb-5 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  width="64"
                  height="64"
                  x="0"
                  y="0"
                  viewBox="0 0 64 64"
                  style={{ enableBackground: "new 0 0 64 64" }}
                >
                  <g>
                    <path fill="#b3b3f3" d="M10 49h4v11h-4z" opacity="1" />
                    <path fill="#a0a0f0" d="M12 49h2v11h-2z" opacity="1" />
                    <path
                      fill="#505069"
                      d="M9 60h6a2 2 0 0 1 2 2v1H7v-1a2 2 0 0 1 2-2z"
                      opacity="1"
                    />
                    <path fill="#b3b3f3" d="M50 49h4v11h-4z" opacity="1" />
                    <path fill="#a0a0f0" d="M52 49h2v11h-2z" opacity="1" />
                    <path
                      fill="#505069"
                      d="M49 60h6a2 2 0 0 1 2 2v1H47v-1a2 2 0 0 1 2-2z"
                      opacity="1"
                    />
                    <rect
                      width="62"
                      height="31"
                      x="1"
                      y="18"
                      fill="#f9f9f9"
                      rx="4"
                      opacity="1"
                    />
                    <rect
                      width="59"
                      height="28"
                      x="4"
                      y="21"
                      fill="#f0f0f0"
                      rx="4"
                      opacity="1"
                    />
                    <rect
                      width="32"
                      height="4"
                      x="16"
                      y="15"
                      fill="#fff0a0"
                      rx="2"
                      opacity="1"
                    />
                    <path
                      fill="#fae16e"
                      d="M48 17H21a2 2 0 0 0-2 2h27a2 2 0 0 0 2-2zM30 3h4a12 12 0 0 1 12 12H18A12 12 0 0 1 30 3z"
                      opacity="1"
                    />
                    <path
                      fill="#f6d24c"
                      d="M34 3h-1a12 12 0 0 0-12 12h25A12 12 0 0 0 34 3z"
                      opacity="1"
                    />
                    <path
                      fill="#fae16e"
                      d="M40.528 23H23.472a4 4 0 0 1-3.578-2.211L19 19h26l-.894 1.789A4 4 0 0 1 40.528 23z"
                      opacity="1"
                    />
                    <path
                      fill="#f6d24c"
                      d="M44.106 20.789 45 19H22l.894 1.789A4 4 0 0 0 26.472 23h14.056a4 4 0 0 0 3.578-2.211z"
                      opacity="1"
                    />
                    <path
                      fill="#fff0a0"
                      d="M34.526 1h-5.052a2 2 0 0 0-1.956 2.419L30 15h4l2.482-11.581A2 2 0 0 0 34.526 1z"
                      opacity="1"
                    />
                    <path
                      fill="#fae16e"
                      d="M36.488 2.668a1.976 1.976 0 0 0-.783-.168H31.3a2 2 0 0 0-1.96 2.419L31.5 15H34l2.482-11.581a1.979 1.979 0 0 0 .006-.751z"
                      opacity="1"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-xl mb-5"></div>
              <div className="text-sm mb-5"></div>
            </>
          )}

          {modalName === "chain-modal" && (
            <>
              {/* Chain Modal */}
              <div className="mb-5 flex justify-center">
                <svg
                  id="fi_7596657"
                  enableBackground="new 0 0 64 64"
                  height="64"
                  viewBox="0 0 64 64"
                  width="64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m54.6 9.4c-6-6.1-14.1-9.4-22.6-9.4s-16.6 3.3-22.6 9.4-9.4 14.1-9.4 22.6 3.3 16.6 9.4 22.6c6 6 14.1 9.4 22.6 9.4s16.6-3.3 22.6-9.4c6-6 9.4-14.1 9.4-22.6s-3.3-16.6-9.4-22.6zm-38.5 6.7c4.2-4.3 9.9-6.6 15.9-6.6 4.4 0 8.6 1.3 12.2 3.6l-31.1 31.1c-2.3-3.6-3.6-7.8-3.6-12.2 0-6 2.3-11.7 6.6-15.9zm31.8 31.8c-4.3 4.2-9.9 6.6-15.9 6.6-4.4 0-8.6-1.3-12.2-3.6l31.1-31.1c2.3 3.6 3.6 7.8 3.6 12.2 0 6-2.3 11.7-6.6 15.9z"
                    fill="#f74354"
                  ></path>
                </svg>
              </div>
              <div className="text-sm mb-5"></div>
            </>
          )}

          {modalName === "Energy and Fuel Related Activities" && (
            <>
              {/* Energy and Fuel Modal */}
              <div className="text-sm mb-5"></div>
            </>
          )}

          {/* CTAs - Common for all modals */}
          <div className="space-y-3 mt-6">
            <div>
              <a
                style={{ cursor: "pointer" }}
                className="text-white bg-cageCarbonCyan-700 hover:bg-cageCarbonCyan-800 focus:ring-4 focus:outline-none focus:ring-cageCarbonCyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cageCarbonCyan-600 dark:hover:bg-cageCarbonCyan-700 dark:focus:ring-cageCarbonCyan-800"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarModals;

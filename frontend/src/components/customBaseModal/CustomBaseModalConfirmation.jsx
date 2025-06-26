import React from "react";
import CustomBaseModalButton from "./CustomBaseModalButton";

const CustomBaseModalConfirmation = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onCancel}
      />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-w-sm w-full max-h-full relative">
        <div className="p-5">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="mb-3">
              <svg
                className="w-12 h-12 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Proceeding will result in the loss of all form data.
            </div>
          </div>
          <div className="flex flex-wrap w-full justify-between space-x-3">
            <CustomBaseModalButton onClick={onCancel}>
              Cancel
            </CustomBaseModalButton>
            <CustomBaseModalButton onClick={onConfirm} variant="primary">
              Close
            </CustomBaseModalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBaseModalConfirmation;

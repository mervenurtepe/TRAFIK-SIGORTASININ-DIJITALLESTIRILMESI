// BaseModal.jsx
import React from "react";
import CustomBaseModalButton from "./CustomBaseModalButton";
// import CustomBaseModalConfirmation from "./CustomBaseModalConfirmation";
import CustomBaseModalButtonSpinner from "./CustomBaseModalButtonSpinner";
import { defaultCustomShine } from "../shineEffects/defaultCustomShine";

const CustomBaseModal = ({
  isOpen,
  children,
  handleClose,
  handleSubmit,
  isLoading,
  title,
  closeButtonLabel = "Close",
  submitButtonLabel = "Submit",
  handleExit = handleClose,
  size = "default",
  // showConfirmation,
  // setShowConfirmation,
  // openConfirmation,
}) => {
  // const handleOnConfirm = () => {
  //   setShowConfirmation(false);
  //   handleClose();
  // };

  // Define width classes based on size
  const sizeClasses = {
    default: "max-w-lg",
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-2xl",
    xlarge: "max-w-4xl",
    xxlarge: "max-w-6xl",
    full: "max-w-full mx-5"
  };

  const widthClass = sizeClasses[size] || sizeClasses.default;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 ease-out duration-300"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black opacity-40"
          onClick={isLoading ? null : handleExit}
          disabled={isLoading}
        />
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto ${widthClass} w-full relative max-h-[86vh] custom-scrollbar`}>
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </div>
              <button
                className={`relative overflow-hidden group text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-300 ${
                  isLoading ? "cursor-not-allowed" : ""
                } `}
                onClick={isLoading ? null : handleExit}
                disabled={isLoading}
                aria-label="Close"
              >
                {/* Shine Effect */}
                <span className={defaultCustomShine}></span>
                <svg
                  className="fill-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="px-5 py-4">{children}</div>

          <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60">
            <div className="flex flex-wrap w-full justify-between space-x-2">
              <CustomBaseModalButton onClick={handleClose} disabled={isLoading}>
                {closeButtonLabel}
              </CustomBaseModalButton>
              {submitButtonLabel && (
                <CustomBaseModalButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  variant="primary"
                >
                  {isLoading ? (
                    <CustomBaseModalButtonSpinner />
                  ) : (
                    submitButtonLabel
                  )}
                </CustomBaseModalButton>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <CustomBaseModalConfirmation
        isOpen={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleOnConfirm}
      /> */}
    </>
  );
};

export default CustomBaseModal;

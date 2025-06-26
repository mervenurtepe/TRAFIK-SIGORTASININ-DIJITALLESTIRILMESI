import React, { useState, useEffect, useRef } from "react";

const toastTypes = {
  success: {
    icon: (
      <svg
        className="h-5 w-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-100",
  },
  error: {
    icon: (
      <svg
        className="h-5 w-5 text-red-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-100",
  },
  warning: {
    icon: (
      <svg
        className="h-5 w-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-800 dark:text-yellow-100",
  },
  info: {
    icon: (
      <svg
        className="h-5 w-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.93 9.412l-1 4.705c-.07.34.029.534.385.534h.397c.356 0 .454-.194.384-.534l-1-4.705zM10 5.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-100",
  },
};

export const CustomToast = ({ message, type = "success", onClose }) => {
  const [show, setShow] = useState(true);
  const [transitionState, setTransitionState] = useState("entering"); // "entering", "entered", "leaving", "left"
  const { icon: Icon, bgColor, textColor } = toastTypes[type];
  const timerRef = useRef(null);

  useEffect(() => {
    // Giriş animasyonu
    const enterTimeout = setTimeout(() => {
      setTransitionState("entered");
    }, 100); // CSS geçiş süresine yakın bir değer

    // Kalma süresi
    timerRef.current = setTimeout(() => {
      setTransitionState("leaving");
    }, 2500);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (transitionState === "leaving") {
      const leaveTimeout = setTimeout(() => {
        setShow(false);
      }, 300); // CSS geçiş süresine yakın bir değer
      return () => clearTimeout(leaveTimeout);
    }
  }, [transitionState]);

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);

  const transitionClasses = {
    entering: "translate-x-full opacity-0",
    entered: "translate-x-0 opacity-100",
    leaving: "translate-x-full opacity-0",
  };

  return show ? (
    <div
      className={`fixed top-4 right-4 z-[70] max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden transition-all duration-300 transform ${transitionClasses[transitionState]}`}
    >
      <div className={`p-4 flex items-center justify-between ${bgColor} `}>
        <div className="flex items-center w-0 flex-1">
          <div className="flex-shrink-0">{Icon}</div>
          <p className={`ml-3 font-medium ${textColor} truncate`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            className={`bg-transparent rounded-md p-1 inline-flex ${textColor} hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${
              bgColor.split("-")[1]
            }-500 focus:ring-${textColor}`}
            onClick={() => setTransitionState("leaving")}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { createRoot } from "react-dom/client";
import CustomBaseModalButton from "../customBaseModal/CustomBaseModalButton";
import { CustomToast } from "./CustomToast";

const AlertContext = createContext(null);

const CustomAlert = ({
  isOpen = false,
  onClose,
  title = "",
  message = "",
  type = "info",
  showConfirmButton = true,
  showCancelButton = false,
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  input = false,
  inputType = "text",
  inputPlaceholder = "",
  inputValue = "",
  inputValidator = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [inputState, setInputState] = useState(inputValue);
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [isOpen]);

  const handleClose = useCallback(
    (callback) => {
      setIsClosing(true);
      setIsVisible(false);

      setTimeout(() => {
        if (callback) {
          callback();
        }
        setIsMounted(false);
        setIsClosing(false);
        onClose?.();
      }, 300);
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setInputState(inputValue);
      setError("");
    }
  }, [isOpen, inputValue]);

  const handleConfirm = async () => {
    if (input && inputValidator) {
      const validationResult = await inputValidator(inputState);
      if (validationResult) {
        setError(validationResult);
        return;
      }
    }
    // First trigger animation, then call onConfirm after animation
    handleClose(() => onConfirm(input ? inputState : true));
  };

  const handleCancel = () => {
    // First trigger animation, then call onCancel after animation
    handleClose(() => onCancel());
  };

  // Enhanced icons with animations
  const icons = {
    success: (
      <div className="relative flex justify-center items-center w-12 h-12">
        <svg
          className="w-12 h-12 text-green-500 transition-all duration-300 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
      </div>
    ),
    error: (
      <div className="flex justify-center items-center w-12 h-12">
        <svg
          className="w-12 h-12 text-red-500 transition-all duration-300 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    ),
    warning: (
      <div className="flex justify-center items-center w-12 h-12">
        <svg
          className="w-12 h-12 text-yellow-500 transition-all duration-300 animate-bounce"
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
    ),
    info: (
      <div className="flex justify-center items-center w-12 h-12">
        <svg
          className="w-12 h-12 text-blue-500 transition-all duration-300 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    ),
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden flex items-center justify-center px-4 sm:px-6">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 
          ${isVisible ? "bg-opacity-40" : "bg-opacity-0"}
          ${isClosing ? "opacity-0" : "opacity-100"}`}
        onClick={() => handleClose()}
      />

      <div
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md 
          transform transition-all duration-300 ease-out
          ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }
          ${
            isClosing
              ? "scale-95 opacity-0 -translate-y-4"
              : "scale-100 opacity-100 translate-y-0"
          }`}
      >
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transform transition-all duration-300 ease-out hover:scale-110"
          onClick={() => handleClose()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <div className="mx-auto flex items-center justify-center mb-4">
            {icons[type]}
          </div>

          {title && (
            <h3 className="text-lg font-medium text-center text-gray-900 dark:text-gray-100 mb-2 transition-all duration-300 ease-out">
              {title}
            </h3>
          )}

          {message && (
            <div className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4 transition-all duration-300 ease-out">
              {message}
            </div>
          )}

          {input && (
            <div className="mb-4 transition-all duration-300 ease-out">
              <input
                type={inputType}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-out
                  ${
                    error ? "border-red-500 animate-bounce" : "border-gray-300"
                  }`}
                placeholder={inputPlaceholder}
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
              />
              {error && (
                <p className="mt-1 text-sm text-red-500 animate-pulse">
                  {error}
                </p>
              )}
            </div>
          )}

          <div className="px-4 pt-3 border-t border-gray-200 dark:border-gray-700/60">
            <div
              className={`flex flex-wrap w-full space-x-2 ${
                showConfirmButton && showCancelButton
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              {showCancelButton && (
                <CustomBaseModalButton
                  onClick={handleCancel}
                  className="transform transition-all duration-300 ease-out hover:scale-105"
                >
                  {cancelButtonText}
                </CustomBaseModalButton>
              )}
              {showConfirmButton && (
                <CustomBaseModalButton
                  onClick={handleConfirm}
                  variant="primary"
                  className="transform transition-all duration-300 ease-out hover:scale-105"
                >
                  {confirmButtonText}
                </CustomBaseModalButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((props) => {
    return new Promise((resolve) => {
      const alertProps = {
        ...props,
        onConfirm: (value) => {
          resolve(value);
        },
        onCancel: () => {
          resolve(false);
        },
        onClose: () => {
          setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        },
      };
      const id = Date.now();
      setAlerts((prev) => [...prev, { ...alertProps, id }]);
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alerts.map((alert) => (
        <CustomAlert key={alert.id} {...alert} isOpen={true} />
      ))}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

const createAlertContainer = () => {
  const containerElement = document.createElement("div");
  document.body.appendChild(containerElement);
  return { root: createRoot(containerElement), container: containerElement };
};

export const Alert = {
  fire: (props) => {
    const { root, container } = createAlertContainer();
    let isClosed = false;

    return new Promise((resolve) => {
      const handleClose = () => {
        if (isClosed) return;
        isClosed = true;

        root.unmount();
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };

      root.render(
        <CustomAlert
          {...props}
          isOpen={true}
          onConfirm={(value) => {
            resolve(value);
            handleClose();
          }}
          onCancel={() => {
            resolve(false);
            handleClose();
          }}
          onClose={handleClose}
        />
      );
    });
  },
  fireToast: (props) => {
    const { root, container } = createAlertContainer();
    let isClosed = false;

    const handleClose = () => {
      if (isClosed) return;
      isClosed = true;

      root.unmount();
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };

    root.render(
      <CustomToast
        message={props.message}
        type={props.type || "success"}
        onClose={handleClose}
      />
    );
  },
};

export default CustomAlert;

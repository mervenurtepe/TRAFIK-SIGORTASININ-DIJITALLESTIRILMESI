import { defaultCustomShine } from "../shineEffects/defaultCustomShine";

const CustomBaseModalButton = ({
  children,
  onClick,
  disabled,
  variant = "secondary",
}) => {
  const baseClasses =
    "btn-sm disabled:cursor-not-allowed  relative overflow-hidden group"; // Added "relative", "overflow-hidden", and "group"
  const variants = {
    primary:
      "bg-cageCarbonBlue-400 text-white hover:bg-cageCarbonBlue-500 dark:bg-cageCarbonBlue-500 dark:text-gray-200 dark:hover:bg-cageCarbonBlue-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-600",

    secondary:
      "bg-gray-400 text-white hover:bg-gray-500  dark:bg-gray-500  dark:text-gray-200 dark:hover:text-gray-200 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-600",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Shine Effect */}
      <span className={defaultCustomShine}></span>
      {/* Button Content */}
      {children}
    </button>
  );
};

export default CustomBaseModalButton;

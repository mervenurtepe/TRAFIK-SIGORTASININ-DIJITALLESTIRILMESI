//main kod.
import React, { useState, useEffect } from "react";

function SidebarLinkGroup({ children, activecondition, level = 0 }) {
  // activecondition değiştiğinde open durumunu güncelle
  const [open, setOpen] = useState(activecondition);

  // activecondition değiştiğinde menüyü otomatik aç/kapat
  useEffect(() => {
    setOpen(activecondition);
  }, [activecondition]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`${
        level === 0 ? "pl-4 pr-3 py-2 " : ""
      } rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
        activecondition &&
        "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;

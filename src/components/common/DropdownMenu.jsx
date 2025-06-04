import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ trigger, options = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={menuRef}
    >
      <div onClick={() => setOpen((o) => !o)} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "auto",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "8px 0",
            minWidth: "150px",
            zIndex: 1000,
          }}
        >
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                opt.onClick();
                setOpen(false);
              }}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";

interface MacWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  variant?: "profile" | "finder" | "terminal" | "timeline" | "cards" | "contact";
  defaultPosition?: { x: number; y: number };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  zIndex,
  variant = "cards",
  defaultPosition,
  onClose,
  onMinimize,
  onFocus,
  onPositionChange,
  children,
}) => {
  const [position, setPosition] = useState(defaultPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync position when defaultPosition changes
  const handleDrag = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      setPosition({ x: data.x, y: data.y });
    },
    []
  );

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    onFocus();
  }, [onFocus]);

  const handleDragStop = useCallback(
    (_: DraggableEvent, data: DraggableData) => {
      setIsDragging(false);
      setPosition({ x: data.x, y: data.y });
      onPositionChange?.({ x: data.x, y: data.y });
    },
    [onPositionChange]
  );

  if (!isOpen || isMinimized) return null;

  const containerClass = `${
    isMobile ? "fixed inset-0 m-0 w-screen h-screen rounded-none" : "rounded-[28px]"
  } bg-white/70 backdrop-blur-2xl border overflow-hidden flex flex-col transition-all duration-300 ${
    isDragging
      ? "border-white/80 shadow-2xl shadow-violet-950/15 scale-[1.01] ring-1 ring-white/30"
      : "border-white/60 shadow-2xl shadow-violet-950/10 hover:shadow-2xl hover:border-white/70"
  }`;

  const getVariantContentClass = () => {
    switch (variant) {
      case "terminal":
        return "p-0";
      default:
        return "p-5 md:p-6";
    }
  };

  const getVariantWidth = () => {
    if (isMobile) return "100%";
    switch (variant) {
      case "profile":
        return "680px";
      case "finder":
        return "860px";
      case "terminal":
        return "720px";
      case "timeline":
        return "720px";
      case "cards":
        return "720px";
      case "contact":
        return "520px";
      default:
        return "680px";
    }
  };

  const getVariantMinHeight = () => {
    if (isMobile) return "100%";
    switch (variant) {
      case "finder":
        return "520px";
      case "terminal":
        return "460px";
      default:
        return "auto";
    }
  };

  const getVariantMaxHeight = () => {
    if (isMobile) return "100%";
    return "calc(100vh - 150px)";
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 28,
          stiffness: 300,
          mass: 0.85,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.94,
        y: 10,
        transition: {
          duration: 0.18,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className={containerClass}
      id={id}
      style={{
        zIndex,
        width: getVariantWidth(),
        minHeight: getVariantMinHeight(),
        maxHeight: getVariantMaxHeight(),
        transformStyle: "preserve-3d",
      }}
      onClick={onFocus}
    >
      {/* Inner border highlight */}
      <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/20 pointer-events-none" />

      {/* Title Bar - Draggable Handle */}
      <div
        className="h-[44px] bg-gradient-to-b from-white/80 to-white/30 border-b border-white/40 flex items-center justify-between px-4 select-none shrink-0 relative window-title-bar"
        onMouseDown={onFocus}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-rose-400 hover:bg-rose-500 active:bg-rose-600 transition-all duration-150 shadow-sm hover:scale-125 hover:shadow-rose-300/40 group"
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[7px] text-rose-800 font-bold flex items-center justify-center">×</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-3 h-3 rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 transition-all duration-150 shadow-sm hover:scale-125 hover:shadow-amber-300/40 group"
            title="Minimize"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[7px] text-amber-800 font-bold flex items-center justify-center">−</span>
          </button>
          <button
            className="w-3 h-3 rounded-full bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 transition-all duration-150 shadow-sm hover:scale-125 hover:shadow-emerald-300/40"
            title="Maximize"
          />
        </div>

        {/* Window Title */}
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-sm font-semibold text-zinc-800/80 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-16" />
      </div>

      {/* Content */}
      <div
        className={`flex-1 overflow-y-auto ${
          variant === "terminal" ? "p-0" : getVariantContentClass()
        } bg-white/20 backdrop-blur-sm`}
      >
        {children}
      </div>
    </motion.div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragStop}
      handle=".window-title-bar"
      bounds="#desktop-area"
    >
      <div
        ref={nodeRef}
        className="absolute"
        style={{ zIndex }}
      >
        {content}
      </div>
    </Draggable>
  );
};

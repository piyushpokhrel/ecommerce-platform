import React from "react";
import { useInView } from "../hooks/useInView";

export const ScrollReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
  delay?: number; // ms
}> = ({ children, className = "", delay = 0 }) => {
    const { ref, inView } = useInView<HTMLDivElement>();
    return (
    <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`transform opacity-0 translate-y-12 transition-all duration-1000 ease-out ${className} ${inView ? "opacity-100 translate-y-0" : ""}`}
        aria-hidden={!inView}
    >
        {children}
    </div>
    );
};
import React, { useEffect, useRef } from "react";

export const ParallaxBlob: React.FC<{ className?: string }> = ({ className = "" }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
        const y = window.scrollY;
      el.style.transform = `translateY(${y * -0.03}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
    <div
    ref={ref}
        className={`pointer-events-none absolute rounded-full blur-3xl opacity-60 ${className}`}
        aria-hidden
    />
    );
};
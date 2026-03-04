import React from "react";

export const LazyImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    fetchPriority?: "high" | "low" | "auto";
}> = ({ src, alt, className = "", width, height, fetchPriority = "low" }) => {
    return (
    <img
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        className={`object-cover ${className}`}
        decoding="async"
        fetchPriority={fetchPriority}
    />
    );
};
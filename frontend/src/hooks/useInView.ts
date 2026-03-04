import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setInView(true);
        });
        },
        { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
    }, [ref, options]);

    return { ref, inView };
}
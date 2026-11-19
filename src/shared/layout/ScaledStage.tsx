import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScaledStageProps {
    width: number;
    height: number;
    className?: string;
    innerClassName?: string;
    children: ReactNode;
}

export function ScaledStage({ width, height, className = '', innerClassName = '', children }: ScaledStageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            const { clientWidth, clientHeight } = el;
            if (!clientWidth || !clientHeight) return;
            setScale(Math.min(clientWidth / width, clientHeight / height));
        };

        const observer = new ResizeObserver(update);
        observer.observe(el);
        update();
        return () => observer.disconnect();
    }, [width, height]);

    return (
        <div ref={containerRef} className={`flex items-center justify-center overflow-hidden ${className}`}>
            <div
                style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'center center' }}
                className={`shrink-0 ${innerClassName}`}
            >
                {children}
            </div>
        </div>
    );
}

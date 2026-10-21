import { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';

export const PixiCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let app: Application | null = null;
        let isMounted = true;

        const initPixi = async () => {
            const instance = new Application();

            await instance.init({
                resizeTo: containerRef.current!,
                backgroundColor: 0x1099bb,
            });

            if (!isMounted) {
                instance.destroy(true, { children: true });
                return;
            }

            app = instance;
            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            }
        };

        initPixi();

        return () => {
            isMounted = false;
            if (app) {
                app.destroy(true, { children: true });
            }
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
};

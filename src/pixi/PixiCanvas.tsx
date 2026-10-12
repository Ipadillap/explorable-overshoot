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
                resizeTo: window, // O las opciones que estés usando
                backgroundColor: 0x1099bb,
            });

            // Si el componente se desmontó mientras init() resolvía, destruimos la instancia de forma segura
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
            // Solo destruimos si la app terminó de inicializarse
            if (app) {
                app.destroy(true, { children: true });
            }
        };
    }, []);

    return <div ref={containerRef} />;
};
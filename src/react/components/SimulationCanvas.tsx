// src/simulation/components/SimulationCanvas.tsx
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as PIXI from 'pixi.js';
import type { EcosystemMetrics } from '../../simulation/models/EcosystemMetrics.ts';
import { Island } from '../../simulation/pixi/Island.ts';
import { IslandShapeBuilder } from '../../simulation/pixi/IslandShapeBuilder.ts';

const CANVAS_WIDTH = 804;
const CANVAS_HEIGHT = 540;

export interface SimulationCanvasRef {
    startCycle: (regeneratingUnits: number) => void;
    endCycle: (consumedGrassUnits: number) => void;
    setInitialGrass: () => void;
}

interface SimulationCanvasProps {
    ecosystemMetrics: EcosystemMetrics;
}

export const SimulationCanvas = forwardRef<SimulationCanvasRef, SimulationCanvasProps>(
    ({ ecosystemMetrics }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const appRef = useRef<PIXI.Application | null>(null);
        const islandRef = useRef<Island | null>(null);

        // Exponer los métodos de la Isla al componente padre
        useImperativeHandle(ref, () => ({
            startCycle: (regeneratingUnits: number) => {
                islandRef.current?.startCycle(regeneratingUnits);
            },
            endCycle: (consumedGrassUnits: number) => {
                islandRef.current?.endCycle(consumedGrassUnits);
            },
            setInitialGrass: () => {
                islandRef.current?.setInitialGrass();
            }
        }));

        useEffect(() => {
            if (!containerRef.current) return;

            let isMounted = true;
            const app = new PIXI.Application();

            async function initPixi() {
                await app.init({
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    backgroundAlpha: 0,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1,
                });

                if (!isMounted || !containerRef.current) {
                    app.destroy(true);
                    return;
                }

                containerRef.current.appendChild(app.canvas);
                appRef.current = app;

                // Instanciar la isla con las métricas actuales
                const island = new Island({
                    cellGap: 0.5,
                    metrics: ecosystemMetrics
                });
                islandRef.current = island;

                // Estado inicial del pasto
                island.setInitialGrass();

                // Escalado proporcional dinámico para el espacio 804x540
                const gridData = IslandShapeBuilder.buildGrid(0.5);
                const paddingFactor = 0.9;

                const scaleX = (CANVAS_WIDTH * paddingFactor) / gridData.totalWidth;
                const scaleY = (CANVAS_HEIGHT * paddingFactor) / gridData.totalHeight;
                const fitScale = Math.min(scaleX, scaleY);

                island.scale.set(fitScale);

                // Centrado exacto en el canvas
                island.x = CANVAS_WIDTH / 2;
                island.y = CANVAS_HEIGHT / 2;

                app.stage.addChild(island);
            }

            initPixi();

            return () => {
                isMounted = false;
                if (appRef.current) {
                    appRef.current.destroy(true, { children: true });
                    appRef.current = null;
                    islandRef.current = null;
                }
            };
        }, []);

        return (
            <div
                ref={containerRef}
                className="w-[804px] h-[540px] flex flex-col justify-center items-center overflow-hidden"
            />
        );
    }
);

SimulationCanvas.displayName = "SimulationCanvas";
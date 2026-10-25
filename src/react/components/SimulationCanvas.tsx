import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as PIXI from 'pixi.js';
import type { EcosystemMetrics } from '../../simulation/models/EcosystemMetrics.ts';
import { Island } from '../../simulation/pixi/Island.ts';
import { IslandShapeBuilder } from '../../simulation/pixi/IslandShapeBuilder.ts';

const CANVAS_WIDTH = 804;
const CANVAS_HEIGHT = 540;

interface SimulationCanvasProps {
    onReady?: () => void;
}

export interface SimulationCanvasRef {
    createIsland: (metrics: EcosystemMetrics) => void;
    getCapacity: () => number | undefined;
    setInitialGrass: () => void;
    endCycle: (consumedGrassUnits: number) => void;
    startCycle: (regeneratingUnits: number) => void;
    destroyIsland: () => void;
}

export const SimulationCanvas = forwardRef<SimulationCanvasRef, SimulationCanvasProps>(
    ({ onReady }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const appRef = useRef<PIXI.Application | null>(null);
        const islandRef = useRef<Island | null>(null);

        useImperativeHandle(ref, () => ({
            createIsland: (metrics: EcosystemMetrics) => {
                const app = appRef.current;
                if (!app) return;

                // Si ya existe una isla previa, se remueve y destruye
                if (islandRef.current) {
                    app.stage.removeChild(islandRef.current);
                    islandRef.current.destroy({ children: true });
                    islandRef.current = null;
                }

                const island = new Island({
                    cellGap: 1,
                    metrics
                });
                islandRef.current = island;

                // Escalado y centrado proporcional
                const gridData = IslandShapeBuilder.buildGrid(0.5);
                const paddingFactor = 0.9;

                const scaleX = (CANVAS_WIDTH * paddingFactor) / gridData.totalWidth;
                const scaleY = (CANVAS_HEIGHT * paddingFactor) / gridData.totalHeight;
                const fitScale = Math.min(scaleX, scaleY);

                island.scale.set(fitScale);
                island.x = CANVAS_WIDTH / 2;
                island.y = CANVAS_HEIGHT / 2;

                app.stage.addChild(island);
            },

            getCapacity: () => {
                return islandRef.current?.getCapacity();
            },

            setInitialGrass: () => {
                islandRef.current?.setInitialGrass();
            },

            endCycle: (consumedGrassUnits: number) => {
                islandRef.current?.endCycle(consumedGrassUnits);
            },

            startCycle: (regeneratingUnits: number) => {
                islandRef.current?.startCycle(regeneratingUnits);
            },

            destroyIsland: () => {
                if (islandRef.current && appRef.current) {
                    appRef.current.stage.removeChild(islandRef.current);
                    islandRef.current.destroy({ children: true });
                    islandRef.current = null;
                }
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

                onReady?.();
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
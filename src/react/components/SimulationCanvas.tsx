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
    initialSpawn: (count: number) => void;
    spawnRabbits: (count: number) => void;
    setInitialGrass: () => void;
    getCapacity: () => number | undefined;
    destroyIsland: () => void;
    initializeCycleAnimations: (regeneratingUnits: number) => Promise<void>;
    processCycleAnimations: (consumptionRate: number) => Promise<void>;
    finalizeCycleAnimations: (
        totalDeaths: number,
        totalBorn: number
    ) => Promise<void>;
}

export const SimulationCanvas = forwardRef<SimulationCanvasRef, SimulationCanvasProps>(
    ({ onReady }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const appRef = useRef<PIXI.Application | null>(null);
        const islandRef = useRef<Island | null>(null);

        // Guardamos las referencias a las texturas precargadas
        const texturesRef = useRef<{
            rabbit: PIXI.Texture;
            tombstone: PIXI.Texture;
        } | null>(null);

        useImperativeHandle(ref, () => ({
            createIsland: (metrics: EcosystemMetrics) => {
                const app = appRef.current;
                if (!app) return;

                if (islandRef.current) {
                    app.stage.removeChild(islandRef.current);
                    islandRef.current.destroy({ children: true });
                    islandRef.current = null;
                }

                const island = new Island({
                    cellGap: 1,
                    metrics,
                    textures: texturesRef.current ?? undefined
                });
                islandRef.current = island;

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

            spawnRabbits: (count: number) => {
                islandRef.current?.spawnRabbits(count);
            },

            setInitialGrass: () => {
                islandRef.current?.setInitialGrass();
            },

            getCapacity: () => {
                return islandRef.current?.getCapacity();
            },

            destroyIsland: () => {
                if (islandRef.current && appRef.current) {
                    appRef.current.stage.removeChild(islandRef.current);
                    islandRef.current.destroy({ children: true });
                    islandRef.current = null;
                }
            },

            initializeCycleAnimations: async (regeneratingUnits: number) => {
                await islandRef.current?.initializeCycleAnimations(regeneratingUnits);
            },

            processCycleAnimations: async (consumptionRate: number) => {
                await islandRef.current?.processCycleAnimations(consumptionRate);
            },

            finalizeCycleAnimations: async (
                totalDeaths: number,
                totalBorn: number
            ) => {
                await islandRef.current?.finalizeCycleAnimations(
                    totalDeaths,
                    totalBorn
                );
            },

            initialSpawn: (count: number) => {
                islandRef.current?.initialSpawn(count);
            },
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

                // -------------------------------------------------------------
                // PRECARGA DE ASSETS PNG (Optimizada en GPU + Pixel-Perfect)
                // -------------------------------------------------------------
                const [rabbitTexture, tombstoneTexture] = await Promise.all([
                    PIXI.Assets.load('/assets/rabbit.png'),
                    PIXI.Assets.load('/assets/tombstone.png')
                ]);

                // Configurar escalado nítido para Pixel Art
                rabbitTexture.source.scaleMode = 'nearest';
                tombstoneTexture.source.scaleMode = 'nearest';

                texturesRef.current = {
                    rabbit: rabbitTexture,
                    tombstone: tombstoneTexture,
                };
                // -------------------------------------------------------------

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
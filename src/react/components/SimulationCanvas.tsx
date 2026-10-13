import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import {useSimulation} from "../../hooks/useSimulation.ts";

const TOTAL_SLOTS = 268;
const SQUARE_SIZE = 18;
const GAP = 3;
const COLS = 20; // 20 columnas

// Colores de los cuadrados
const COLOR_GRASS = 0x94B98A;        // Verde
const COLOR_BIOCAPACITY = 0xEAC976;  // Amarillo
const COLOR_DEPLETED = 0xE88B88;     // Rojo
const STROKE_COLOR = 0xDFE8E2;

// Cálculo exacto del tamaño que ocupará la cuadrícula
const ROWS = Math.ceil(TOTAL_SLOTS / COLS);
const GRID_WIDTH = COLS * (SQUARE_SIZE + GAP) - GAP;
const GRID_HEIGHT = ROWS * (SQUARE_SIZE + GAP) - GAP;

export function SimulationCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);
    const { ecosystemMetrics } = useSimulation();

    useEffect(() => {
        if (!containerRef.current) return;

        let isMounted = true;
        const app = new PIXI.Application();

        async function initPixi() {
            await app.init({
                width: GRID_WIDTH,
                height: GRID_HEIGHT,
                backgroundAlpha: 0, // Fondo 100% transparente
                antialias: true,
                resolution: window.devicePixelRatio || 1,
            });

            if (!isMounted || !containerRef.current) {
                app.destroy(true);
                return;
            }

            containerRef.current.appendChild(app.canvas);
            appRef.current = app;

            renderGrid(
                app,
                ecosystemMetrics.totalGrass,
                ecosystemMetrics.biocapacity
            );
        }

        initPixi();

        return () => {
            isMounted = false;
            if (appRef.current) {
                appRef.current.destroy(true, { children: true });
                appRef.current = null;
            }
        };
    }, []);

    // Re-dibujar los cuadrados cuando cambian las métricas
    useEffect(() => {
        if (appRef.current) {
            renderGrid(
                appRef.current,
                ecosystemMetrics.totalGrass,
                ecosystemMetrics.biocapacity
            );
        }
    }, [ecosystemMetrics.totalGrass, ecosystemMetrics.biocapacity]);

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center p-2"
        />
    );
}

function renderGrid(app: PIXI.Application, totalGrass: number, biocapacity: number) {
    app.stage.removeChildren();

    const gridContainer = new PIXI.Container();

    const grassCount = Math.min(TOTAL_SLOTS, Math.max(0, totalGrass));
    const bioCount = Math.min(TOTAL_SLOTS - grassCount, Math.max(0, biocapacity));

    for (let i = 0; i < TOTAL_SLOTS; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);

        const x = col * (SQUARE_SIZE + GAP);
        const y = row * (SQUARE_SIZE + GAP);

        const square = new PIXI.Graphics();
        let fillColor: number;

        if (i < grassCount) {
            fillColor = COLOR_GRASS;        // Verde
        } else if (i < grassCount + bioCount) {
            fillColor = COLOR_BIOCAPACITY;  // Amarillo
        } else {
            fillColor = COLOR_DEPLETED;     // Rojo
        }

        square.rect(x, y, SQUARE_SIZE, SQUARE_SIZE);
        square.fill({ color: fillColor });
        square.stroke({ width: 1, color: STROKE_COLOR, alpha: 0.8 });

        gridContainer.addChild(square);
    }

    app.stage.addChild(gridContainer);
}

import React from "react";
import {CycleIndicator} from "./CycleIndicatorProps.tsx";
import {SimulationCanvas, type SimulationCanvasRef} from "../../simulation/react/SimulationCanvas.tsx";

interface SimulationStageProps {
    canvasRef: React.RefObject<SimulationCanvasRef | null>;
    createIsland: () => void;
    cycle?: number;
    showCycleIndicator?: boolean;
}

export const SimulationStage: React.FC<SimulationStageProps> = ({
                                                                    canvasRef,
                                                                    createIsland,
                                                                    cycle = 1,
                                                                    showCycleIndicator = true,
                                                                }) => {
    return (
        <div className="relative h-full w-full flex flex-col justify-center items-center">
            {/* Ahora canvasRef encaja perfectamente con el forwardRef de SimulationCanvas */}
            <SimulationCanvas ref={canvasRef} onReady={createIsland} />
            {showCycleIndicator && (
                <div className="absolute bottom-4 right-4 z-10">
                    <CycleIndicator cycle={cycle} />
                </div>
            )}
        </div>
    );
};
import React from "react";
import {RabbitBlock} from "./RabbitBlock.tsx";
import {HexagonBlock} from "./HexagonBlock.tsx";


interface SimulationSummaryBarProps {
    totalRabbits?: number;
    totalGrass?: number;
    totalGrassToBeRenewed?: number;
    totalGrassToNotBeRenewed?: number;
    showRabbits?: boolean;
    showGrass?: boolean;
    showRenewed?: boolean;
    showNotRenewed?: boolean;
}

export const SimulationSummaryBar: React.FC<SimulationSummaryBarProps> = ({
                                                                              totalRabbits = 0,
                                                                              totalGrass = 0,
                                                                              totalGrassToBeRenewed = 0,
                                                                              totalGrassToNotBeRenewed = 0,
                                                                              showRabbits = true,
                                                                              showGrass = true,
                                                                              showRenewed = true,
                                                                              showNotRenewed = true,
                                                                          }) => {
    return (
        <div className="w-full h-[102px] flex flex-row justify-center items-center border border-[#DFE8E2] rounded-lg bg-[#fafafa] gap-4 px-4">
            {showRabbits && (
                <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                    <RabbitBlock color="#e6f3f1" />
                    <p className="font-bold">{totalRabbits}</p>
                </div>
            )}

            {showGrass && (
                <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                    <HexagonBlock color="#e9f0e6" />
                    <p className="font-bold">{totalGrass}</p>
                </div>
            )}

            {showRenewed && (
                <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                    <HexagonBlock color="#f8edc9" />
                    <p className="font-bold">{totalGrassToBeRenewed}</p>
                </div>
            )}

            {showNotRenewed && (
                <div className="w-[174px] h-[42px] flex flex-row items-center gap-3 justify-center">
                    <HexagonBlock color="#f5e3de" />
                    <p className="font-bold">{totalGrassToNotBeRenewed}</p>
                </div>
            )}
        </div>
    );
};
